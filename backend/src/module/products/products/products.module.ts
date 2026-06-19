import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ImagesModule } from 'src/module/products/images/images.module';
import { BrandsModule } from 'src/module/products/brands/brands.module';
import { CategoriesModule } from 'src/module/products/categories/categories.module';
import { BulkPriceModule } from 'src/module/electronics/bulk_price/bulk_price.module';
import { ElectronicsModule } from 'src/module/electronics/electronics/electronics.module';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [
    ImagesModule,
    BrandsModule,
    CategoriesModule,
    BulkPriceModule,
    ElectronicsModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
