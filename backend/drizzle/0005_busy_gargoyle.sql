ALTER TABLE "datasheets" DROP CONSTRAINT "datasheets_product_id_unique";--> statement-breakpoint
ALTER TABLE "datasheets" DROP CONSTRAINT "datasheets_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "datasheet_id" uuid;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_datasheet_id_datasheets_id_fk" FOREIGN KEY ("datasheet_id") REFERENCES "public"."datasheets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "datasheets" DROP COLUMN "product_id";