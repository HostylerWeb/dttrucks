const AUCTION_NUDGE_BASE = "https://www.auctionnudge.com";
const EBAY_UK_SITE_ID = "3";
const DEFAULT_SELLER = "dt-trucks-isuzu";

export type ScrapedEbayListing = {
  ebayItemId: string;
  title: string;
  priceDisplay: string | null;
  imageUrl: string | null;
  ebayUrl: string;
  itemHash: string;
};

type ParsedFeedItem = {
  titleRaw: string;
  imageUrl: string | null;
  itemHash: string;
  redirectUrl: string;
};

function siteReferer(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dttrucks.com";
  return siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`;
}

function parseTitle(titleRaw: string): { priceDisplay: string | null; title: string } {
  const match = titleRaw.match(/^((?:£[\d,.]+(?:\.\d{2})?\s*(?:\+\s*VAT)?))\s+(.*)$/i);
  if (match?.[1] && match[2]) {
    return { priceDisplay: match[1].trim(), title: match[2].trim() };
  }
  return { priceDisplay: null, title: titleRaw.trim() };
}

export function parseAuctionNudgeFeed(js: string): ParsedFeedItem[] {
  const titles = [...js.matchAll(/<strong><a[^>]+>([^<]+)<\/a><\/strong>/g)].map(
    (match) => match[1]
  );
  const images = [
    ...js.matchAll(/img src=\\"(https:\/\/i\.ebayimg\.com[^\\]+)\\"/g),
    ...js.matchAll(/img src="(https:\/\/i\.ebayimg\.com[^"]+)"/g),
  ].map((match) => match[1]);

  const hashMatches = [...js.matchAll(/item_hash\/([^\/\\]+)/g)]
    .map((match) => match[1])
    .filter((hash): hash is string => Boolean(hash));
  const uniqueHashes = [...new Set(hashMatches)];

  const userIdMatch = js.match(/user_id\/(\d+)/);
  const userId = userIdMatch?.[1] ?? "";

  return uniqueHashes.map((itemHash, index) => {
    const redirectUrl = userId
      ? `${AUCTION_NUDGE_BASE}/to_ebay/item/site_id/${EBAY_UK_SITE_ID}/user_id/${userId}/tool_name/item/item_hash/${itemHash}/lang/english`
      : `${AUCTION_NUDGE_BASE}/to_ebay/item/site_id/${EBAY_UK_SITE_ID}/tool_name/item/item_hash/${itemHash}/lang/english`;

    return {
      titleRaw: titles[index] ?? "eBay listing",
      imageUrl: images[index] ?? null,
      itemHash,
      redirectUrl,
    };
  });
}

async function fetchAuctionNudgeFeed(sellerId: string, maxEntries = 50): Promise<string> {
  const path = [
    "theme/grid",
    `SellerID/${encodeURIComponent(sellerId)}`,
    `siteid/${EBAY_UK_SITE_ID}`,
    `MaxEntries/${maxEntries}`,
    "add_details/1",
    "img_size/120",
    "show_logo/0",
    "lang/english",
    "sortOrder/PricePlusShippingLowest",
  ].join("/");

  const url = `${AUCTION_NUDGE_BASE}/feed/item/js/${path}`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; DTTrucksBot/1.0)",
      Referer: siteReferer(),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Auction Nudge feed failed (${response.status})`);
  }

  return response.text();
}

async function resolveEbayItemId(redirectUrl: string): Promise<string | null> {
  const response = await fetch(redirectUrl, {
    method: "HEAD",
    redirect: "manual",
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; DTTrucksBot/1.0)",
      Referer: siteReferer(),
    },
    cache: "no-store",
  });

  const location = response.headers.get("location");
  if (!location) return null;

  const match = location.match(/\/itm\/(\d+)/);
  return match?.[1] ?? null;
}

export async function scrapeEbayListings(
  sellerId = DEFAULT_SELLER
): Promise<ScrapedEbayListing[]> {
  const feed = await fetchAuctionNudgeFeed(sellerId);
  const parsed = parseAuctionNudgeFeed(feed);

  if (parsed.length === 0) {
    throw new Error("No listings found in eBay feed. Check the seller username in settings.");
  }

  const listings: ScrapedEbayListing[] = [];

  for (const item of parsed) {
    const ebayItemId = await resolveEbayItemId(item.redirectUrl);
    if (!ebayItemId) continue;

    const { priceDisplay, title } = parseTitle(item.titleRaw);

    listings.push({
      ebayItemId,
      title,
      priceDisplay,
      imageUrl: item.imageUrl,
      ebayUrl: `https://www.ebay.co.uk/itm/${ebayItemId}`,
      itemHash: item.itemHash,
    });
  }

  if (listings.length === 0) {
    throw new Error("Could not resolve any eBay item IDs from the feed.");
  }

  return listings;
}

export function defaultEbayStoreUrl(sellerId: string): string {
  return `https://www.ebay.co.uk/usr/${sellerId}`;
}
