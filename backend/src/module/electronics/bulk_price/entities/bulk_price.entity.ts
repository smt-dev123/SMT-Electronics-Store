import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import pgDecimalAsNumber from 'src/utils/pg_decimal_number';
import { products } from 'src/core/database/schema';
import { relations } from 'drizzle-orm';

export const bulkPrice = pgTable('bulk_price', {
  id: uuid('id')
    .default(sql`uuidv7()`)
    .primaryKey(),
  qty: pgDecimalAsNumber('qty').notNull(),
  price: pgDecimalAsNumber('price').notNull(),

  productId: uuid('product_id').references(() => products.id),
});

export const bulk_priceRelations = relations(bulkPrice, ({ one }) => ({
  products: one(products, {
    fields: [bulkPrice.productId],
    references: [products.id],
  }),
}));
