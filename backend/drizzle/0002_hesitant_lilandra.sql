CREATE TABLE "electronics" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"sku" varchar(255) NOT NULL,
	"package" varchar(255) NOT NULL,
	"feature_id" uuid,
	"electronic_type_id" uuid,
	"product_id" uuid
);
--> statement-breakpoint
ALTER TABLE "electronics" ADD CONSTRAINT "electronics_feature_id_features_id_fk" FOREIGN KEY ("feature_id") REFERENCES "public"."features"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "electronics" ADD CONSTRAINT "electronics_electronic_type_id_electronic_types_id_fk" FOREIGN KEY ("electronic_type_id") REFERENCES "public"."electronic_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "electronics" ADD CONSTRAINT "electronics_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;