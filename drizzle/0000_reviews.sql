CREATE TABLE "reviews" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"nombre" varchar(80) NOT NULL,
	"comentario" text NOT NULL,
	"rating" integer NOT NULL,
	"productId" varchar(120),
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "reviews_status_idx" ON "reviews" USING btree ("status");--> statement-breakpoint
CREATE INDEX "reviews_product_idx" ON "reviews" USING btree ("productId");--> statement-breakpoint
CREATE INDEX "reviews_created_at_idx" ON "reviews" USING btree ("created_at");