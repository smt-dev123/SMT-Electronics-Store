import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { ilike, or } from 'drizzle-orm';
import * as schema from 'src/core/database/schema';
import { DRIZZLE_PROVIDER } from 'src/core/database/database.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import truncated from 'src/utils/truncated';
import slugAuto from 'src/utils/slug';

import { ProductsRepository } from './products.repository';
import { ImagesService } from 'src/module/products/images/images.service';
import { BrandsService } from 'src/module/products/brands/brands.service';
import { CategoriesService } from 'src/module/products/categories/categories.service';
import { BulkPriceService } from 'src/module/electronics/bulk_price/bulk_price.service';
import { ElectronicsService } from 'src/module/electronics/electronics/electronics.service';
import { DatasheetsService } from 'src/module/electronics/datasheets/datasheets.service';

@Injectable()
export class ProductsService {
  private readonly CACHE_TRACKER_KEY = 'products:all_cache_keys';
  private readonly CACHE_PREFIX = 'products:all';
  private readonly CACHE_TIME = 60 * 60 * 1000;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(DRIZZLE_PROVIDER) private db: NodePgDatabase<typeof schema>,

    private readonly productsRepo: ProductsRepository,
    private readonly imagesService: ImagesService,
    private readonly brandsService: BrandsService,
    private readonly categoriesService: CategoriesService,
    private readonly datasheetsService: DatasheetsService,
    private readonly bulksPriceService: BulkPriceService,
    private readonly electronicsService: ElectronicsService,
  ) {}

  private async trackCacheKey(key: string) {
    const trackedKeys: string[] =
      (await this.cacheManager.get(this.CACHE_TRACKER_KEY)) || [];
    if (!trackedKeys.includes(key)) {
      trackedKeys.push(key);
      await this.cacheManager.set(
        this.CACHE_TRACKER_KEY,
        trackedKeys,
        24 * 60 * 60 * 1000,
      );
    }
  }

  async create(
    createProductDto: CreateProductDto,
    thumbnailFile: Express.Multer.File,
    galleryFiles: Express.Multer.File[],
  ) {
    const uploadedUrls: string[] = [];

    try {
      // ១. Upload Images
      const thumbnailUrl =
        await this.imagesService.uploadToR2Only(thumbnailFile);
      uploadedUrls.push(thumbnailUrl);

      let galleryUrls: string[] = [];
      if (galleryFiles?.length > 0) {
        const uploadPromises = galleryFiles.map((file) =>
          this.imagesService.uploadToR2Only(file),
        );
        galleryUrls = await Promise.all(uploadPromises);
        uploadedUrls.push(...galleryUrls);
      }

      const truncatedName = truncated(createProductDto.name);
      const {
        brandName,
        categoryName,
        datasheet,
        electronics,
        bulkPrice,
        ...productData
      } = createProductDto;

      // ប្រើប្រាស់ DB Transaction
      const result = await this.db.transaction(async (tx) => {
        let finalBrandId = createProductDto.brandId;
        let finalCategoryId = createProductDto.categoryId;
        let finalDatasheetId = createProductDto.datasheetId;

        //

        if (brandName?.trim()) {
          const brand = await this.brandsService.create(
            { name: brandName.trim() },
            tx,
          );
          finalBrandId = brand.id;
        }

        if (categoryName?.trim()) {
          const category = await this.categoriesService.create(
            { name: categoryName.trim() },
            tx,
          );
          finalCategoryId = category.id;
        }

        if (datasheet && datasheet.name && datasheet.name.trim() !== '') {
          const newDatasheet = await this.datasheetsService.create(
            datasheet,
            tx,
          );
          finalDatasheetId = newDatasheet.id;
        }

        // ២. បញ្ចូល Product ទៅ DB តាមរយៈ Repository
        const newProduct = await this.productsRepo.createProduct(
          {
            ...productData,
            name: truncatedName,
            slug: slugAuto(truncatedName),
            thumbnailUrl,
            brandId: finalBrandId,
            categoryId: finalCategoryId,
            datasheetId: finalDatasheetId,
            price: createProductDto.price.toString(),
            discount: createProductDto.discount?.toString(),
            specifications: createProductDto.specifications || {},
            stockQty: Number(createProductDto.stockQty),
          },
          tx,
        );

        // ៣. បញ្ចូលទិន្នន័យរងៗ
        if (electronics && electronics.sku) {
          await this.electronicsService.create(
            { ...electronics, productId: newProduct.id },
            tx,
          );
        }

        if (bulkPrice?.length > 0) {
          const bulkPriceRecords = bulkPrice.map((item) =>
            this.bulksPriceService.create(
              { ...item, productId: newProduct.id },
              tx,
            ),
          );
          await Promise.all(bulkPriceRecords);
        }

        if (galleryUrls.length > 0) {
          const imageRecords = galleryUrls.map((url) => ({
            imageUrl: url,
            productId: newProduct.id,
          }));
          await this.productsRepo.insertGalleryImages(imageRecords, tx);
        }

        return newProduct;
      });

      await this.clearProductsCache();
      return result;
    } catch (error) {
      console.error('Error creating product, starting cleanup:', error);
      if (uploadedUrls.length > 0) {
        try {
          await Promise.all(
            uploadedUrls.map((url) => this.imagesService.deleteFromR2(url)),
          );
          console.log('Cleanup successful: Deleted orphaned images.');
        } catch (cleanupError) {
          console.error('Failed to cleanup images from R2:', cleanupError);
        }
      }
      throw error;
    }
  }

  async findAll(search: string = '', limit: number = 10, page: number = 1) {
    try {
      const offset = (page - 1) * limit;
      let cleanSearch = String(search || '').trim();
      if (cleanSearch === 'undefined' || cleanSearch === 'null')
        cleanSearch = '';

      const cacheKey = `products:all:search=${cleanSearch}:limit=${limit}:page=${page}`;
      const cachedProducts = await this.cacheManager.get(cacheKey);
      if (cachedProducts) return cachedProducts;

      // បង្កើត Where Clause រួចហុចទៅឱ្យ Repo
      const whereClause = cleanSearch
        ? or(
            ilike(schema.products.name, `%${cleanSearch}%`),
            ilike(schema.products.description, `%${cleanSearch}%`),
          )
        : undefined;

      const { productsList, totalItems } =
        await this.productsRepo.findAndCountAll(whereClause, limit, offset);
      const totalPages = Math.ceil(totalItems / limit);

      const response = {
        data: productsList,
        meta: {
          totalItems,
          itemCount: productsList.length,
          itemsPerPage: limit,
          totalPages,
          currentPage: page,
          isPreviousPage: page > 1,
          isNextPage: page < totalPages,
        },
      };

      await this.cacheManager.set(cacheKey, response, 5 * 60 * 1000);
      await this.trackCacheKey(cacheKey);

      return response;
    } catch (error) {
      console.error('Error finding products:', error);
      throw error;
    }
  }

  async findAllProducts(
    search: string = '',
    limit: number = 10,
    page: number = 1,
  ) {
    try {
      const offset = (page - 1) * limit;
      let cleanSearch = String(search || '').trim();
      if (cleanSearch === 'undefined' || cleanSearch === 'null')
        cleanSearch = '';

      const cacheKey = `products:non-electronics:search=${cleanSearch}:limit=${limit}:page=${page}`;
      const cachedProducts = await this.cacheManager.get(cacheKey);
      if (cachedProducts) return cachedProducts;

      // បង្កើត Where Clause រួចហុចទៅឱ្យ Repo
      const whereClause = cleanSearch
        ? or(
            ilike(schema.products.name, `%${cleanSearch}%`),
            ilike(schema.products.description, `%${cleanSearch}%`),
          )
        : undefined;

      const { productsList, totalItems } =
        await this.productsRepo.findAllProducts(whereClause, limit, offset);
      const totalPages = Math.ceil(totalItems / limit);

      const response = {
        data: productsList,
        meta: {
          totalItems,
          itemCount: productsList.length,
          itemsPerPage: limit,
          totalPages,
          currentPage: page,
          isPreviousPage: page > 1,
          isNextPage: page < totalPages,
        },
      };

      await this.cacheManager.set(cacheKey, response, 5 * 60 * 1000);
      await this.trackCacheKey(cacheKey);

      return response;
    } catch (error) {
      console.error('Error finding products:', error);
      throw error;
    }
  }

  async findOne(slug: string) {
    try {
      const cacheKey = `${this.CACHE_PREFIX}:${slug}`;
      const cachedProduct = await this.cacheManager.get(cacheKey);
      if (cachedProduct) return cachedProduct;

      const data = await this.productsRepo.findBySlug(slug);
      if (!data) return null;

      await this.cacheManager.set(cacheKey, data, this.CACHE_TIME);
      await this.trackCacheKey(cacheKey);

      return data;
    } catch (error) {
      console.error('Error finding product:', error);
      throw error;
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const oldProduct = await this.productsRepo.findById(id);
      if (!oldProduct) throw new Error(`Product with ID ${id} not found`);

      const { brandName, categoryName, ...restDto } = updateProductDto as any;
      const updateData: any = { ...restDto };

      if (updateProductDto.price !== undefined)
        updateData.price = updateProductDto.price.toString();
      if (updateProductDto.discount !== undefined)
        updateData.discount = updateProductDto.discount.toString();
      if (updateProductDto.name) {
        updateData.name = truncated(updateProductDto.name);
        updateData.slug = slugAuto(updateData.name);
      }

      const updatedProduct = await this.productsRepo.updateProduct(
        id,
        updateData,
      );

      // សម្អាត Cache
      await this.clearProductsCache();
      await this.cacheManager.del(`${this.CACHE_PREFIX}:${oldProduct.slug}`);
      if (updateData.slug)
        await this.cacheManager.del(`${this.CACHE_PREFIX}:${updateData.slug}`);

      return updatedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const product = await this.productsRepo.findById(id);
      if (!product) throw new Error(`Product with ID ${id} not found`);

      await this.productsRepo.deleteProduct(id);

      await this.clearProductsCache();
      await this.cacheManager.del(`${this.CACHE_PREFIX}:${product.slug}`);

      return { message: 'Product removed successfully' };
    } catch (error) {
      console.error('Error removing product:', error);
      throw error;
    }
  }

  async clearProductsCache() {
    try {
      const trackedKeys: string[] =
        (await this.cacheManager.get(this.CACHE_TRACKER_KEY)) || [];
      await Promise.all(trackedKeys.map((key) => this.cacheManager.del(key)));
      await this.cacheManager.del(this.CACHE_TRACKER_KEY);
      console.log('Successfully cleared all products cache.');
    } catch (error) {
      console.error('Failed to clear products cache:', error);
    }
  }
}
