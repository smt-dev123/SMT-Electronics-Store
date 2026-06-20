ALTER TABLE "electronics_feature" RENAME COLUMN "electronic_type_id" TO "electronic_id";--> statement-breakpoint
ALTER TABLE "electronics" DROP CONSTRAINT "electronics_feature_id_features_id_fk";
--> statement-breakpoint
ALTER TABLE "electronics_feature" DROP CONSTRAINT "electronics_feature_electronic_type_id_electronic_types_id_fk";
--> statement-breakpoint
ALTER TABLE "electronics_feature" ADD CONSTRAINT "electronics_feature_electronic_id_electronics_id_fk" FOREIGN KEY ("electronic_id") REFERENCES "public"."electronics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "electronics" DROP COLUMN "feature_id";