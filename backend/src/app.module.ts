import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import { Keyv } from 'keyv';
import { KeyvCacheableMemory } from 'cacheable';
import { BrandsModule } from 'src/module/products/brands/brands.module';
import { DatabaseModule } from 'src/core/database/database.module';
import { CategoriesModule } from 'src/module/products/categories/categories.module';
import { DatasheetsModule } from 'src/module/electronics/datasheets/datasheets.module';
import { FeaturesModule } from 'src/module/electronics/features/features.module';
import { ElectronicTypesModule } from 'src/module/electronics/electronic_types/electronic_types.module';
import { ProductsModule } from 'src/module/products/products/products.module';
import { ImagesModule } from 'src/module/products/images/images.module';
import { BulkPriceModule } from 'src/module/electronics/bulk_price/bulk_price.module';
import { ElectronicsModule } from 'src/module/electronics/electronics/electronics.module';
import { ElectronicsFeatureModule } from 'src/module/electronics/electronics_feature/electronics_feature.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          stores: [
            new Keyv({
              store: new KeyvCacheableMemory({ lruSize: 5000 }),
            }),
            new KeyvRedis(configService.get<string>('REDIS_URL')),
          ],
        };
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    BrandsModule,
    CategoriesModule,
    DatasheetsModule,
    FeaturesModule,
    ElectronicTypesModule,
    ProductsModule,
    ImagesModule,
    BulkPriceModule,
    ElectronicsModule,
    ElectronicsFeatureModule,
  ],
})
export class AppModule {}
