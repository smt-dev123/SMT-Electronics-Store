import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { electronics } from '../../electronics/entities/electronic.entity';
import { features } from 'src/core/database/schema';

export const electronics_feature = pgTable('electronics_feature', {
  id: uuid('id')
    .default(sql`uuidv7()`)
    .primaryKey(),

  featureId: uuid('feature_id').references(() => features.id),
  electronicId: uuid('electronic_id').references(() => electronics.id),
  value: varchar('value', { length: 255 }).notNull(),
});

export const electronicsFeatureRelationship = relations(
  electronics_feature,
  ({ one }) => ({
    features: one(features, {
      fields: [electronics_feature.featureId],
      references: [features.id],
    }),
    electronics: one(electronics, {
      fields: [electronics_feature.electronicId],
      references: [electronics.id],
    }),
  }),
);
