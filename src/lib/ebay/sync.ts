import { prisma } from "@/lib/prisma";
import { scrapeEbayListings } from "@/lib/ebay/scrape";

const DEFAULT_SELLER = "dt-trucks-isuzu";

export type EbaySyncResult = {
  added: number;
  updated: number;
  removed: number;
  total: number;
};

async function resolveSellerId(sellerIdOverride?: string): Promise<string> {
  if (sellerIdOverride?.trim()) return sellerIdOverride.trim();

  const setting = await prisma.site_settings.findUnique({
    where: { key: "ebay_seller_username" },
  });

  return (
    setting?.value?.trim() ||
    process.env.EBAY_SELLER_USERNAME?.trim() ||
    DEFAULT_SELLER
  );
}

export async function syncEbayListingsFromProfile(
  sellerIdOverride?: string
): Promise<EbaySyncResult> {
  const sellerId = await resolveSellerId(sellerIdOverride);

  const scraped = await scrapeEbayListings(sellerId);
  const scrapedIds = new Set(scraped.map((item) => item.ebayItemId));
  const existing = await prisma.ebay_listings.findMany();
  const existingByItemId = new Map(existing.map((item) => [item.ebay_item_id, item]));

  let added = 0;
  let updated = 0;

  const now = new Date();

  for (const [index, item] of scraped.entries()) {
    const current = existingByItemId.get(item.ebayItemId);

    if (current) {
      await prisma.ebay_listings.update({
        where: { id: current.id },
        data: {
          title: item.title,
          price_display: item.priceDisplay,
          image_url: item.imageUrl,
          ebay_url: item.ebayUrl,
          item_hash: item.itemHash,
          sort_order: index,
          is_visible: true,
          last_synced_at: now,
        },
      });
      updated += 1;
    } else {
      await prisma.ebay_listings.create({
        data: {
          ebay_item_id: item.ebayItemId,
          title: item.title,
          price_display: item.priceDisplay,
          image_url: item.imageUrl,
          ebay_url: item.ebayUrl,
          item_hash: item.itemHash,
          sort_order: index,
          is_visible: true,
          last_synced_at: now,
        },
      });
      added += 1;
    }
  }

  const toRemove = existing.filter((item) => !scrapedIds.has(item.ebay_item_id));
  if (toRemove.length > 0) {
    await prisma.ebay_listings.deleteMany({
      where: { id: { in: toRemove.map((item) => item.id) } },
    });
  }

  return {
    added,
    updated,
    removed: toRemove.length,
    total: scraped.length,
  };
}
