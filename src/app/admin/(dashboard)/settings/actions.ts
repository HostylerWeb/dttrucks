"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireWrite } from "@/lib/admin/session";
import { cacheTags } from "@/lib/admin/revalidate";

const settingKeys = [
  "company_name",
  "company_phone",
  "company_email",
  "company_address",
  "company_registration",
  "sales_phone",
  "sales_email",
  "sales_contact_name",
  "opening_hours",
  "social_facebook",
  "social_linkedin",
  "social_instagram",
  "what3words",
  "google_maps_embed_url",
  "ebay_store_url",
  "ebay_seller_username",
  "live_chat_enabled",
  "live_chat_id",
  "default_meta_title",
  "default_meta_description",
] as const;

export async function updateSettings(formData: FormData): Promise<void> {
  await requireWrite();

  for (const key of settingKeys) {
    const value = formData.get(key);
    if (value === null) continue;

    await prisma.site_settings.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) },
    });
  }

  await cacheTags.settings();
  revalidatePath("/admin/settings");
}
