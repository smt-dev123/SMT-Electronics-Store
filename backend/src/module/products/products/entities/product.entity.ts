import {
  pgTable,
  uuid,
  varchar,
  boolean,
  text,
  integer,
  timestamp,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import {
  brands,
  categories,
  datasheets,
  images,
} from 'src/core/database/schema';
import { jsonb } from 'drizzle-orm/pg-core';
import pgDecimalAsNumber from 'src/utils/pg_decimal_number';
import { bulkPrice } from 'src/module/electronics/bulk_price/entities/bulk_price.entity';
import { electronics } from 'src/module/electronics/electronics/entities/electronic.entity';

export const products = pgTable('products', {
  id: uuid('id')
    .default(sql`uuidv7()`)
    .primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  thumbnailUrl: varchar('thumbnail_url', { length: 255 }).notNull(),
  description: text('description'),
  stockQty: integer('stock_qty').notNull(),
  price: pgDecimalAsNumber('price').notNull(),
  specifications: jsonb('specifications').notNull(),
  discount: pgDecimalAsNumber('discount').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  isUsed: boolean('is_used').default(false).notNull(),
  brandId: uuid('brand_id').references(() => brands.id),
  categoryId: uuid('category_id').references(() => categories.id),

  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  })
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: 'string',
  }),
});

export const productRelations = relations(products, ({ one, many }) => ({
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),

  datasheet: one(datasheets),
  images: many(images),
  bulk_price: many(bulkPrice),
  electronics: one(electronics),
}));
