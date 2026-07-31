"use server";

import { revalidatePath } from "next/cache";
import { requireWrite } from "@/lib/admin/session";
import { cacheTags } from "@/lib/admin/revalidate";
import { syncEbayListingsFromProfile, type EbaySyncResult } from "@/lib/ebay/sync";

export async function syncEbayListingsAction(): Promise<EbaySyncResult> {
  await requireWrite();

  const result = await syncEbayListingsFromProfile();

  cacheTags.ebayListings();
  revalidatePath("/admin/ebay");
  revalidatePath("/ebay");

  return result;
}
