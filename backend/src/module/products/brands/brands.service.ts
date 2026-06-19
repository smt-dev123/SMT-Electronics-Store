import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { DRIZZLE_PROVIDER } from 'src/core/database/database.provider';
import * as schema from 'src/core/database/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres/driver';
import { eq } from 'drizzle-orm';
import { isValidUUIDv7 } from 'src/utils/uuid7';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class BrandsService {
  private readonly CACHE_KEY_LIST = 'brands:all';
  private readonly CACHE_TIME = 3600000;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(DRIZZLE_PROVIDER)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createBrandDto: CreateBrandDto, tx?: any) {
    try {
      const dbClient = tx || this.db;

      const existing = await dbClient.query.brands.findFirst({
        where: eq(schema.brands.name, createBrandDto.name),
      });
      if (existing) return existing;

      const newBrand = await dbClient
        .insert(schema.brands)
        .values(createBrandDto)
        .returning();

      if (!tx) await this.cacheManager.del(this.CACHE_KEY_LIST);
      return newBrand[0];
    } catch (error) {
      console.error('Error creating brand:', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const cachedBrands = await this.cacheManager.get(this.CACHE_KEY_LIST);
      if (cachedBrands) {
        console.log('Cache Hit: Cached data found for brands');
        return cachedBrands;
      }

      console.log('Cache Miss: Querying database for brands');
      const data = await this.db.select().from(schema.brands);

      await this.cacheManager.set(this.CACHE_KEY_LIST, data, this.CACHE_TIME);

      return data;
    } catch (error) {
      console.error('Error finding brands:', error);
      throw error;
    }
  }

  async findOne(id: string) {
    if (!isValidUUIDv7(id)) {
      throw new BadRequestException('Invalid UUIDv7 format for brand ID');
    }

    try {
      const data = await this.db
        .select()
        .from(schema.brands)
        .where(eq(schema.brands.id, id));

      await this.cacheManager.set(
        `${this.CACHE_KEY_LIST}:${id}`,
        data,
        this.CACHE_TIME,
      );
      return data[0];
    } catch (error) {
      console.error('Error finding brand:', error);
      throw error;
    }
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    if (!isValidUUIDv7(id)) {
      throw new BadRequestException('Invalid UUIDv7 format for brand ID');
    }

    try {
      const data = await this.db
        .update(schema.brands)
        .set(updateBrandDto)
        .where(eq(schema.brands.id, id))
        .returning();
      if (!data || data.length === 0) {
        throw new NotFoundException(`Brand with ID ${id} not found`);
      }

      await this.cacheManager.del(this.CACHE_KEY_LIST);
      await this.cacheManager.del(`${this.CACHE_KEY_LIST}:${id}`);
      return data[0];
    } catch (error) {
      console.error('Error updating brand:', error);
      throw error;
    }
  }

  async remove(id: string) {
    if (!isValidUUIDv7(id)) {
      throw new BadRequestException('Invalid UUIDv7 format for brand ID');
    }

    try {
      const data = await this.db
        .delete(schema.brands)
        .where(eq(schema.brands.id, id))
        .returning();
      if (!data || data.length === 0) {
        throw new NotFoundException(`Brand with ID ${id} not found`);
      }

      await this.cacheManager.del(this.CACHE_KEY_LIST);
      await this.cacheManager.del(`${this.CACHE_KEY_LIST}:${id}`);

      return { message: 'Brand removed successfully' };
    } catch (error) {
      console.error('Error removing brand:', error);
      if (error instanceof NotFoundException) throw error;
      throw error;
    }
  }
}
