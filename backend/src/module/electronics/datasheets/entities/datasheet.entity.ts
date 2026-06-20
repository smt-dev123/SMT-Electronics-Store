import { relations } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import { uuid } from 'drizzle-orm/pg-core';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { products } from 'src/module/products/products/entities/product.entity';

export const datasheets = pgTable('datasheets', {
  id: uuid('id')
    .default(sql`uuidv7()`)
    .primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  size: varchar('size', { length: 20 }),
  file: varchar('file', { length: 255 }),
});

export const datasheetRelations = relations(datasheets, ({ many }) => ({
  products: many(products),
}));
