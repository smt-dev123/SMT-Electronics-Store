import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { products } from 'src/core/database/schema';

export const images = pgTable('images', {
  id: uuid('id')
    .default(sql`uuidv7()`)
    .primaryKey(),
  imageUrl: varchar('image_url', { length: 255 }).notNull(),
  productId: uuid('product_id').references(() => products.id),
});

export const imageRelationship = relations(images, ({ one }) => ({
  product: one(products, {
    fields: [images.productId],
    references: [products.id],
  }),
}));
