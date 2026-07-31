"use cache";

import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getHomepageVideos() {
  cacheTag("videos");
  cacheLife("hours");

  return prisma.videos.findMany({
    where: { page_slug: null, is_visible: true },
    orderBy: { sort_order: "asc" },
  });
}

export async function getVideosByPageSlug(pageSlug: string) {
  cacheTag(`videos-${pageSlug}`);
  cacheLife("hours");

  return prisma.videos.findMany({
    where: { page_slug: pageSlug, is_visible: true },
    orderBy: { sort_order: "asc" },
  });
}
