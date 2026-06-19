CREATE TABLE "electronics_feature" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"feature_id" uuid,
	"electronic_type_id" uuid,
	"value" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "electronics_feature" ADD CONSTRAINT "electronics_feature_feature_id_features_id_fk" FOREIGN KEY ("feature_id") REFERENCES "public"."features"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "electronics_feature" ADD CONSTRAINT "electronics_feature_electronic_type_id_electronic_types_id_fk" FOREIGN KEY ("electronic_type_id") REFERENCES "public"."electronic_types"("id") ON DELETE no action ON UPDATE no action;