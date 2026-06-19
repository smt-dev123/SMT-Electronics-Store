import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_PROVIDER } from 'src/core/database/database.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from 'src/core/database/schema';
import { eq, ilike, or, sql } from 'drizzle-orm';

@Injectable()
export class ProductsRepository {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  // Transaction បើមាន tx មក គឺប្រើ tx បើអត់ទេប្រើ db ធម្មតា
  private getDB(tx?: any) {
    return tx || this.db;
  }

  async createProduct(productData: any, tx?: any) {
    const [newProduct] = await this.getDB(tx)
      .insert(schema.products)
      .values(productData)
      .returning();
    return newProduct;
  }

  async insertGalleryImages(
    images: { imageUrl: string; productId: string }[],
    tx?: any,
  ) {
    return await this.getDB(tx).insert(schema.images).values(images);
  }

  async findAndCountAll(whereClause: any, limit: number, offset: number) {
    const [productsList, totalItemsResult] = await Promise.all([
      this.db.query.products.findMany({
        where: whereClause,
        limit: limit,
        offset: offset,
        with: {
          brand: true,
          category: true,
          datasheet: true,
        },
        orderBy: (products, { desc }) => [desc(products.createdAt)],
      }),
      this.db
        .select({ count: sql<number>`count(*)` })
        .from(schema.products)
        .where(whereClause),
    ]);

    return {
      productsList,
      totalItems: Number(totalItemsResult[0]?.count || 0),
    };
  }

  async findBySlug(slug: string) {
    return await this.db.query.products.findFirst({
      where: eq(schema.products.slug, slug),
      with: {
        brand: true,
        category: true,
        datasheet: true,
        images: {
          columns: {
            id: true,
            imageUrl: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    return await this.db.query.products.findFirst({
      where: eq(schema.products.id, id),
      columns: { slug: true },
    });
  }

  async updateProduct(id: string, updateData: any, tx?: any) {
    const data = await this.getDB(tx)
      .update(schema.products)
      .set(updateData)
      .where(eq(schema.products.id, id))
      .returning();
    return data[0];
  }

  async deleteProduct(id: string, tx?: any) {
    const data = await this.getDB(tx)
      .delete(schema.products)
      .where(eq(schema.products.id, id))
      .returning();
    return data[0];
  }
}
