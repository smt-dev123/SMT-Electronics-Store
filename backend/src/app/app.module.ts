import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { BrandsModule } from 'src/brands/brands.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsModule } from 'src/products/products.module';
import { DatasheetsModule } from 'src/datasheets/datasheets.module';
import { ElectronicsModule } from 'src/electronics/electronics.module';
import { TypesModule } from 'src/types/types.module';
import { ProductImagesModule } from 'src/product-images/product-images.module';
import { BulkPriceModule } from 'src/bulk-price/bulk-price.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, BrandsModule, CategoriesModule, ProductsModule,
    DatasheetsModule, ElectronicsModule, TypesModule, BulkPriceModule,
    ProductImagesModule, UsersModule, AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
