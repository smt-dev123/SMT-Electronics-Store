import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBulkPriceDto } from './dto/create-bulk_price.dto';
import { UpdateBulkPriceDto } from './dto/update-bulk_price.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { DRIZZLE_PROVIDER } from 'src/core/database/database.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { Cache } from 'cache-manager';
import * as schema from 'src/core/database/schema';
import { eq } from 'drizzle-orm';
import { isValidUUIDv7 } from 'src/utils/uuid7';

@Injectable()
export class BulkPriceService {
  private readonly CACHE_KEY_LIST = 'categories:all';
  private readonly CACHE_TIME = 3600000;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(DRIZZLE_PROVIDER)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createBulkPriceDto: CreateBulkPriceDto, tx?: any) {
    try {
      const dbClient = tx || this.db;
      const existing = await dbClient.query.bulkPrice.findFirst({
        where: (bulkPrice, { and, eq }) => {
          and(
            eq(bulkPrice.productId, createBulkPriceDto.productId),
            eq(bulkPrice.qty, createBulkPriceDto.qty),
          );
        },
      });
      if (existing) return existing;

      const data = await dbClient
        .insert(schema.bulkPrice)
        .values(createBulkPriceDto)
        .returning();

      if (!tx) await this.cacheManager.del(this.CACHE_KEY_LIST);
      return data[0];
    } catch (error) {
      console.error('Error creating bulk price:', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const cachedCategories = await this.cacheManager.get(this.CACHE_KEY_LIST);
      if (cachedCategories) {
        console.log('Cache Hit: Cached data found for categories');
        return cachedCategories;
      }

      const data = await this.db.select().from(schema.bulkPrice);

      await this.cacheManager.set(this.CACHE_KEY_LIST, data, this.CACHE_TIME);

      return data;
    } catch (error) {
      console.error('Error finding categories:', error);
      throw error;
    }
  }

  async findOne(id: string) {
    if (!isValidUUIDv7(id)) {
      throw new BadRequestException('Invalid UUIDv7 format for category ID');
    }
    try {
      const data = await this.db
        .select()
        .from(schema.bulkPrice)
        .where(eq(schema.bulkPrice.id, id));

      await this.cacheManager.set(
        `${this.CACHE_KEY_LIST}:${id}`,
        data,
        this.CACHE_TIME,
      );
      return data[0];
    } catch (error) {
      console.error('Error finding category:', error);
      throw error;
    }
  }

  async update(id: string, updateBulkPriceDto: UpdateBulkPriceDto) {
    if (!isValidUUIDv7(id)) {
      throw new BadRequestException('Invalid UUIDv7 format for category ID');
    }
    try {
      const data = await this.db
        .update(schema.bulkPrice)
        .set(updateBulkPriceDto)
        .where(eq(schema.bulkPrice.id, id))
        .returning();

      await this.cacheManager.del(this.CACHE_KEY_LIST);
      await this.cacheManager.del(`${this.CACHE_KEY_LIST}:${id}`);
      return data[0];
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  async remove(id: string) {
    if (!isValidUUIDv7(id)) {
      throw new BadRequestException('Invalid UUIDv7 format for category ID');
    }
    try {
      const data = await this.db
        .delete(schema.bulkPrice)
        .where(eq(schema.bulkPrice.id, id))
        .returning();

      if (!data || data.length === 0) {
        throw new BadRequestException(`Category with ID ${id} not found`);
      }

      await this.cacheManager.del(this.CACHE_KEY_LIST);
      await this.cacheManager.del(`${this.CACHE_KEY_LIST}:${id}`);

      return { message: 'Category removed successfully' };
    } catch (error) {
      console.error('Error removing category:', error);
      throw error;
    }
  }
}
