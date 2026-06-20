import { Inject, Injectable } from '@nestjs/common';
import { CreateElectronicDto } from './dto/create-electronic.dto';
import { UpdateElectronicDto } from './dto/update-electronic.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { DRIZZLE_PROVIDER } from 'src/core/database/database.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { Cache } from 'cache-manager';
import * as schema from 'src/core/database/schema';
import { and, desc, eq, exists, ilike, sql } from 'drizzle-orm';
import { ElectronicTypesService } from '../electronic_types/electronic_types.service';

@Injectable()
export class ElectronicsService {
  private readonly CACHE_TRACKER_KEY = 'products:all_cache_keys';
  private readonly CACHE_KEY_LIST = 'ElectronicTypes:all';
  private readonly CACHE_TIME = 5 * 60 * 1000;

  private async trackCacheKey(key: string) {
    const trackedKeys: string[] =
      (await this.cacheManager.get(this.CACHE_TRACKER_KEY)) || [];
    if (!trackedKeys.includes(key)) {
      trackedKeys.push(key);
      await this.cacheManager.set(
        this.CACHE_TRACKER_KEY,
        trackedKeys,
        24 * 60 * 60 * 1000,
      );
    }
  }

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(DRIZZLE_PROVIDER)
    private db: NodePgDatabase<typeof schema>,
    private readonly electronicTyps: ElectronicTypesService,
  ) {}

  async create(createElectronicDto: CreateElectronicDto, tx?: any) {
    try {
      const dbClient = tx || this.db;

      // ១. បំបែកអថេរចេញដើម្បីកុំឱ្យមានបញ្ហាពេល Insert ចូលតារាង electronics មេ
      const { electronicType, features, ...electronicData } =
        createElectronicDto;

      let finalElectronicTypeId = createElectronicDto.electronicTypeId;

      // ២. ពិនិត្យ និងបង្កើត Electronic Type ថ្មី (បើសិនជាមានផ្ញើមក)
      if (
        electronicType &&
        electronicType.name &&
        electronicType.name.trim() !== ''
      ) {
        const newType = await this.electronicTyps.create(electronicType, tx);
        finalElectronicTypeId = newType.id;
      }

      // ៣. Insert ចូលតារាង electronics មេ រួចទាញយក ID របស់វាមកប្រើ
      const [data] = await dbClient
        .insert(schema.electronics)
        .values({
          ...electronicData,
          electronicTypeId: finalElectronicTypeId,
        })
        .returning();

      // ៤. ចាត់ចែងផ្នែក Features (Many-to-Many Junction Table)
      if (features && Array.isArray(features) && features.length > 0) {
        const junctionRecords: any[] = [];

        for (const item of features) {
          let featureId = (item as any).featureId; // បើ client ហុច featureId ដែលមានស្រាប់មក

          // ករណី User ចង់បង្កើត Feature ថ្មីភ្លាមៗ (ផ្ញើតែ name មក គ្មាន featureId)
          if (!featureId && item.name && item.name.trim() !== '') {
            // ឆែកមើលក្នុង DB សិនថាមាន Feature ឈ្មោះហ្នឹងហើយឬនៅ ដើម្បីការពារកុំឱ្យទិន្នន័យស្ទួន (Unique)
            let existingFeature = await dbClient.query.features.findFirst({
              where: eq(schema.features.name, item.name.trim()),
            });

            // បើមិនទាន់មាន គឺ Insert បង្កើតថ្មី
            if (!existingFeature) {
              const [newFeature] = await dbClient
                .insert(schema.features)
                .values({ name: item.name.trim() })
                .returning();
              existingFeature = newFeature;
            }
            featureId = existingFeature.id;
          }

          // បើមាន featureId ពិតប្រាកដ ទើបរុញចូលទៅក្នុងបញ្ជីត្រៀម Insert ចូលតារាងកណ្តាល
          if (featureId) {
            junctionRecords.push({
              electronicId: data.id, // ID របស់ Electronic ដែលទើបបង្កើតខាងលើ
              featureId: featureId, // ID របស់ Feature (ចាស់ ឬ ទើបបង្កើតថ្មី)
              value: (item as any).value || '', // បើមានប្រកាស column 'value' ក្នុងតារាងកណ្តាលសម្រាប់កំណត់ទំហំផ្សេងៗ
            });
          }
        }

        // Insert ចូលតារាងកណ្តាលព្រមគ្នាតែម្តង (Bulk Insert)
        if (junctionRecords.length > 0) {
          // ផ្ទៀងផ្ទាត់ឈ្មោះតារាងកណ្តាលរបស់អ្នកក្នុង schema (ឧទាហរណ៍៖ electronics_feature ឬ electronic_features)
          await dbClient
            .insert(schema.electronics_feature)
            .values(junctionRecords);
        }
      }

      // ៥. សម្អាត Cache តែពេលណាដែលរត់ standalone (មិនមែនក្នុង transaction ធំ)
      if (!tx) {
        await this.cacheManager.del(this.CACHE_KEY_LIST);
      }

      return data;
    } catch (error) {
      console.error('Error creating electronic with M-M features:', error);
      throw error;
    }
  }

  async findAll(search: string = '', limit: number = 10, page: number = 1) {
    const offset = (page - 1) * limit;
    const cacheKey = `electronics_products_page_${page}_limit_${limit}_search_${search}`;

    const searchClause = search
      ? ilike(schema.products.name, `%${search}%`)
      : undefined;

    // 2. បង្កើត Condition ធានាថា Product នោះត្រូវតែមានទិន្នន័យនៅក្នុង Table electronics (ដូច innerJoin ដែរ)
    const hasElectronicsClause = exists(
      this.db
        .select()
        .from(schema.electronics)
        .where(eq(schema.electronics.productId, schema.products.id)),
    );

    // បញ្ចូល Condition ទាំងពីរចូលគ្នា
    const finalWhereClause = searchClause
      ? and(searchClause, hasElectronicsClause)
      : hasElectronicsClause;

    // 3. ទាញយកទិន្នន័យដោយប្រើ findMany ដើម្បីបាន Relationship ស្អាត និងមិនមាន Product ជាន់គ្នាក្នុង electronics
    const [productsList, totalItemsResult] = await Promise.all([
      this.db.query.products.findMany({
        where: finalWhereClause,
        limit: limit,
        offset: offset,
        with: {
          brand: true,
          category: true,
          datasheet: true,
          electronics: {
            with: {
              electronicTypes: true,
            },
          },
        },
        orderBy: (products, { desc }) => [desc(products.createdAt)],
      }),

      this.db
        .select({ count: sql<number>`count(*)` })
        .from(schema.products)
        .where(finalWhereClause),
    ]);

    const totalItems = Number(totalItemsResult[0]?.count || 0);
    const totalPages = Math.ceil(totalItems / limit);

    const response = {
      data: productsList,
      meta: {
        totalItems,
        itemCount: productsList.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
        isPreviousPage: page > 1,
        isNextPage: page < totalPages,
      },
    };

    await this.cacheManager.set(cacheKey, response, this.CACHE_TIME);
    await this.trackCacheKey(cacheKey);

    return response;
  }

  async findOne(id: string) {
    return `This action returns a #${id} electronic`;
  }

  async update(id: string, updateElectronicDto: UpdateElectronicDto) {
    return `This action updates a #${id} electronic`;
  }

  async remove(id: string) {
    return `This action removes a #${id} electronic`;
  }

  async clearProductsCache() {
    try {
      const trackedKeys: string[] =
        (await this.cacheManager.get(this.CACHE_TRACKER_KEY)) || [];
      await Promise.all(trackedKeys.map((key) => this.cacheManager.del(key)));
      await this.cacheManager.del(this.CACHE_TRACKER_KEY);
      console.log('Successfully cleared all products cache.');
    } catch (error) {
      console.error('Failed to clear products cache:', error);
    }
  }
}
