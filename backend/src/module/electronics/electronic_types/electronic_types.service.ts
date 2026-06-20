import { Inject, Injectable } from '@nestjs/common';
import { CreateElectronicTypeDto } from './dto/create-electronic_type.dto';
import { UpdateElectronicTypeDto } from './dto/update-electronic_type.dto';
import * as schema from 'src/core/database/schema';
import type { Cache } from 'cache-manager';
import { eq } from 'drizzle-orm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { DRIZZLE_PROVIDER } from 'src/core/database/database.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class ElectronicTypesService {
  private readonly CACHE_KEY_LIST = 'ElectronicTypes:all';
  private readonly CACHE_TIME = 3600000;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(DRIZZLE_PROVIDER)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createElectronicTypeDto: CreateElectronicTypeDto, tx?: any) {
    try {
      const dbClient = tx || this.db;
      const [data] = await dbClient
        .insert(schema.electronicTypes)
        .values(createElectronicTypeDto)
        .returning();

      if (!tx) await this.cacheManager.del(this.CACHE_KEY_LIST);
      return data;
    } catch (error) {
      console.error('Error creating ElectronicType:', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const cachedData = await this.cacheManager.get(this.CACHE_KEY_LIST);
      if (cachedData) {
        return cachedData;
      }

      const data = await this.db.select().from(schema.electronicTypes);
      await this.cacheManager.set(this.CACHE_KEY_LIST, data, this.CACHE_TIME);
      return data;
    } catch (error) {
      console.error('Error fetching all ElectronicTypes:', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.db
        .select()
        .from(schema.electronicTypes)
        .where(eq(schema.electronicTypes.id, id));

      await this.cacheManager.del(this.CACHE_KEY_LIST);
      return data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error(`Error fetching ElectronicType with id ${id}:`, error);
      throw error;
    }
  }

  async update(id: string, updateElectronicTypeDto: UpdateElectronicTypeDto) {
    try {
      const data = await this.db
        .update(schema.electronicTypes)
        .set(updateElectronicTypeDto)
        .where(eq(schema.electronicTypes.id, id))
        .returning();

      await this.cacheManager.del(this.CACHE_KEY_LIST);
      await this.cacheManager.del(`${this.CACHE_KEY_LIST}:${id}`);
      return data;
    } catch (error) {
      console.error('Error updating ElectronicType:', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const data = await this.db
        .delete(schema.electronicTypes)
        .where(eq(schema.electronicTypes.id, id))
        .returning();

      await this.cacheManager.del(this.CACHE_KEY_LIST);
      await this.cacheManager.del(`${this.CACHE_KEY_LIST}:${id}`);
      return data;
    } catch (error) {
      console.error('Error removing ElectronicType:', error);
      throw error;
    }
  }
}
