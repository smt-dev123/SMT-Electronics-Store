import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { products } from 'src/module/products/products/entities/product.entity';

export const brands = pgTable('brands', {
  id: uuid('id')
    .default(sql`uuidv7()`)
    .primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  icon: varchar('icon', { length: 255 }),
});

export const brandRelations = relations(brands, ({ many }) => ({
  products: many(products),
}));
