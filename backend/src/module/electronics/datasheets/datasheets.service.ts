import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDatasheetDto } from './dto/create-datasheet.dto';
import { UpdateDatasheetDto } from './dto/update-datasheet.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { DRIZZLE_PROVIDER } from 'src/core/database/database.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from 'src/core/database/schema';
import type { Cache } from 'cache-manager';
import { eq } from 'drizzle-orm';

@Injectable()
export class DatasheetsService {
  private readonly CACHE_KEY_LIST = 'datasheets:all';
  private readonly CACHE_TIME = 3600000;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(DRIZZLE_PROVIDER)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createDatasheetDto: CreateDatasheetDto, tx?: any) {
    try {
      const dbClient = tx || this.db;
      const existing = await dbClient.query.datasheets.findFirst({
        where: (datasheets, { eq, and }) =>
          and(
            eq(datasheets.name, createDatasheetDto.name),
            eq(datasheets.size, createDatasheetDto.size),
            eq(datasheets.file, createDatasheetDto.file),
          ),
      });
      if (existing) return existing;

      const [data] = await dbClient
        .insert(schema.datasheets)
        .values(createDatasheetDto)
        .returning();

      if (!tx) await this.cacheManager.del(this.CACHE_KEY_LIST);
      return data;
    } catch (error) {
      console.error('Error creating datasheet:', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const cachedDatasheets = await this.cacheManager.get(this.CACHE_KEY_LIST);
      if (cachedDatasheets) {
        console.log('Cache Hit: Cached data found for datasheets');
        return cachedDatasheets;
      }

      console.log('Cache Miss: Querying database for datasheets');
      const data = await this.db.select().from(schema.datasheets);

      await this.cacheManager.set(this.CACHE_KEY_LIST, data, this.CACHE_TIME);

      return data;
    } catch (error) {
      console.error('Error finding datasheets:', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.db
        .select()
        .from(schema.datasheets)
        .where(eq(schema.datasheets.id, id));

      await this.cacheManager.set(
        `${this.CACHE_KEY_LIST}:${id}`,
        data,
        this.CACHE_TIME,
      );
      return data[0];
    } catch (error) {
      console.error('Error finding datasheet:', error);
      throw error;
    }
  }

  async update(id: string, updateDatasheetDto: UpdateDatasheetDto) {
    try {
      const data = await this.db
        .update(schema.datasheets)
        .set(updateDatasheetDto)
        .where(eq(schema.datasheets.id, id))
        .returning();
      if (!data || data.length === 0) {
        throw new NotFoundException(`Datasheet with ID ${id} not found`);
      }

      await this.cacheManager.del(this.CACHE_KEY_LIST);
      await this.cacheManager.del(`${this.CACHE_KEY_LIST}:${id}`);
      return data[0];
    } catch (error) {
      console.error('Error updating datasheet:', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const data = await this.db
        .delete(schema.datasheets)
        .where(eq(schema.datasheets.id, id))
        .returning();
      if (!data) {
        throw new NotFoundException(`Datasheet with ID ${id} not found`);
      }

      await this.cacheManager.del(this.CACHE_KEY_LIST);
      await this.cacheManager.del(`${this.CACHE_KEY_LIST}:${id}`);
      return { message: 'Datasheet removed successfully' };
    } catch (error) {
      console.error('Error removing datasheet:', error);
      throw error;
    }
  }
}
