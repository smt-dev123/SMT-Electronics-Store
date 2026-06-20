import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { electronics } from '../../electronics/entities/electronic.entity';
import { electronics_feature } from 'src/core/database/schema';

export const features = pgTable('features', {
  id: uuid('id')
    .default(sql`uuidv7()`)
    .primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const featureRelationship = relations(features, ({ many }) => ({
  electronics_feature: many(electronics_feature),
}));
