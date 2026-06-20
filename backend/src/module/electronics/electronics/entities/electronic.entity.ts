import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import {
  electronics_feature,
  electronicTypes,
  features,
  products,
} from 'src/core/database/schema';
import { relations } from 'drizzle-orm';

export const electronics = pgTable('electronics', {
  id: uuid('id')
    .default(sql`uuidv7()`)
    .primaryKey(),
  sku: varchar('sku', { length: 255 }).notNull(),
  package: varchar('package', { length: 255 }).notNull(),
  electronicTypeId: uuid('electronic_type_id').references(
    () => electronicTypes.id,
  ),
  productId: uuid('product_id')
    .references(() => products.id)
    .unique(),
});

export const electronicsRelations = relations(electronics, ({ one, many }) => ({
  electronicTypes: one(electronicTypes, {
    fields: [electronics.electronicTypeId],
    references: [electronicTypes.id],
  }),
  products: one(products, {
    fields: [electronics.productId],
    references: [products.id],
  }),

  electronics_feature: many(electronics_feature),
}));
