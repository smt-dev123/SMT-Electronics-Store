import { Inject, Injectable } from '@nestjs/common';
import { CreateElectronicDto } from './dto/create-electronic.dto';
import { UpdateElectronicDto } from './dto/update-electronic.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { DRIZZLE_PROVIDER } from 'src/core/database/database.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { Cache } from 'cache-manager';
import * as schema from 'src/core/database/schema';

@Injectable()
export class ElectronicsService {
  private readonly CACHE_KEY_LIST = 'ElectronicTypes:all';
  private readonly CACHE_TIME = 3600000;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(DRIZZLE_PROVIDER)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createElectronicDto: CreateElectronicDto, tx?: any) {
    try {
      const dbClient = tx || this.db;
      const [data] = await dbClient
        .insert(schema.electronics)
        .values(createElectronicDto)
        .returning();

      if (!tx) {
        await this.cacheManager.del(this.CACHE_KEY_LIST);
      }
      return data;
    } catch (error) {
      console.error('Error creating electronic:', error);
      throw error;
    }
  }

  async findAll() {
    return `This action returns all electronics`;
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
}
