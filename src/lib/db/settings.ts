"use cache";

import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getSetting(key: string) {
  cacheTag("settings");
  cacheLife("days");

  const setting = await prisma.site_settings.findUnique({
    where: { key },
  });

  return setting?.value ?? null;
}

export async function getAllSettings() {
  cacheTag("settings");
  cacheLife("days");

  const settings = await prisma.site_settings.findMany();
  return Object.fromEntries(settings.map((s) => [s.key, s.value]));
}
