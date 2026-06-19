CREATE TABLE "bulk_price" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"qty" numeric(10, 2) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"product_id" uuid
);
--> statement-breakpoint
ALTER TABLE "bulk_price" ADD CONSTRAINT "bulk_price_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;