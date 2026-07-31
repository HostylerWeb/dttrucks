-- CreateTable
CREATE TABLE "ebay_listings" (
    "id" TEXT NOT NULL,
    "ebay_item_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price_display" TEXT,
    "image_url" TEXT,
    "ebay_url" TEXT NOT NULL,
    "item_hash" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_visible" BOOLEAN NOT NULL DEFAULT true,
    "last_synced_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ebay_listings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ebay_listings_ebay_item_id_key" ON "ebay_listings"("ebay_item_id");
