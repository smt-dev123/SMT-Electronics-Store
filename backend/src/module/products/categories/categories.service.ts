import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DRIZZLE_PROVIDER } from 'src/core/database/database.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from 'src/core/database/schema';
import { eq } from 'drizzle-orm';
import { isValidUUIDv7 } from 'src/utils/uuid7';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class CategoriesService {
  private readonly CACHE_KEY_LIST = 'categories:all';
  private readonly CACHE_TIME = 3600000;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(DRIZZLE_PROVIDER)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, tx?: any) {
    try {
      const dbClient = tx || this.db;

      const existing = await dbClient.query.categories.findFirst({
        where: eq(schema.categories.name, createCategoryDto.name),
      });
      if (existing) return existing;

      const data = await this.db
        .insert(schema.categories)
        .values(createCategoryDto)
        .returning();

      if (!tx) await this.cacheManager.del(this.CACHE_KEY_LIST);
      return data[0];
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const cachedCategories = await this.cacheManager.get(this.CACHE_KEY_LIST);
      if (cachedCategories) {
        return cachedCategories;
      }

      const data = await this.db.select().from(schema.categories);

      await this.cacheManager.set(this.CACHE_KEY_LIST, data, this.CACHE_TIME);

      return data;
    } catch (error) {
      console.error('Error finding categories:', error);
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
        .from(schema.categories)
        .where(eq(schema.categories.id, id));

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

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    if (!isValidUUIDv7(id)) {
      throw new BadRequestException('Invalid UUIDv7 format for brand ID');
    }

    try {
      const data = await this.db
        .update(schema.categories)
        .set(updateCategoryDto)
        .where(eq(schema.categories.id, id))
        .returning();

      if (!data || data.length === 0) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }

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
      throw new BadRequestException('Invalid UUIDv7 format for brand ID');
    }

    try {
      const data = await this.db
        .delete(schema.categories)
        .where(eq(schema.categories.id, id))
        .returning();
      if (!data || data.length === 0) {
        throw new NotFoundException(`Category with ID ${id} not found`);
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
