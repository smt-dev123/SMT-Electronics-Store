import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { electronics } from '../../electronics/entities/electronic.entity';

export const electronicTypes = pgTable('electronic_types', {
  id: uuid('id')
    .default(sql`uuidv7()`)
    .primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const electronicTypeRelationship = relations(
  electronicTypes,
  ({ many }) => ({
    electronics: many(electronics),
  }),
);
