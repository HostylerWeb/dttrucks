"use cache";

import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getEbayListings() {
  cacheTag("ebay-listings");
  cacheLife("hours");

  return prisma.ebay_listings.findMany({
    where: { is_visible: true },
    orderBy: [{ sort_order: "asc" }, { updated_at: "desc" }],
  });
}

export async function getEbayListingsForAdmin() {
  return prisma.ebay_listings.findMany({
    orderBy: [{ sort_order: "asc" }, { updated_at: "desc" }],
  });
}

export async function getEbayListingCount() {
  return prisma.ebay_listings.count();
}
