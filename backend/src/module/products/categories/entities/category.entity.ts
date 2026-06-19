import { relations } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import { uuid } from 'drizzle-orm/pg-core';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { products } from 'src/module/products/products/entities/product.entity';

export const categories = pgTable('categories', {
  id: uuid('id')
    .default(sql`uuidv7()`)
    .primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const categoryRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));
