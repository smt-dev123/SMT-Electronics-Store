import { Inject, Injectable } from '@nestjs/common';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { DRIZZLE_PROVIDER } from 'src/core/database/database.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { Cache } from 'cache-manager';
import * as schema from 'src/core/database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class FeaturesService {
  private readonly CACHE_KEY_LIST = 'features:all';
  private readonly CACHE_TIME = 3600000;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(DRIZZLE_PROVIDER)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createFeatureDto: CreateFeatureDto) {
    try {
      const data = await this.db
        .insert(schema.features)
        .values(createFeatureDto)
        .returning();

      await this.cacheManager.del(this.CACHE_KEY_LIST);
      return data;
    } catch (error) {
      console.error('Error creating feature:', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const cachedData = await this.cacheManager.get(this.CACHE_KEY_LIST);
      if (cachedData) {
        return cachedData;
      }

      const data = await this.db.select().from(schema.features);
      await this.cacheManager.set(this.CACHE_KEY_LIST, data, this.CACHE_TIME);
      return data;
    } catch (error) {
      console.error('Error fetching all features:', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.db
        .select()
        .from(schema.features)
        .where(eq(schema.features.id, id));

      await this.cacheManager.set(
        `${this.CACHE_KEY_LIST}:${id}`,
        data[0],
        this.CACHE_TIME,
      );
      return data[0];
    } catch (error) {
      console.error('Error fetching feature:', error);
      throw error;
    }
  }

  async update(id: string, updateFeatureDto: UpdateFeatureDto) {
    try {
      const data = await this.db
        .update(schema.features)
        .set(updateFeatureDto)
        .where(eq(schema.features.id, id))
        .returning();

      await this.cacheManager.del(this.CACHE_KEY_LIST);
      await this.cacheManager.del(`${this.CACHE_KEY_LIST}:${id}`);
      return data[0];
    } catch (error) {
      console.error('Error updating feature:', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const data = await this.db
        .delete(schema.features)
        .where(eq(schema.features.id, id))
        .returning();

      await this.cacheManager.del(this.CACHE_KEY_LIST);
      await this.cacheManager.del(`${this.CACHE_KEY_LIST}:${id}`);
      return data[0];
    } catch (error) {
      console.error('Error removing feature:', error);
      throw error;
    }
  }
}
