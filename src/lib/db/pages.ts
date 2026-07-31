"use cache";

import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { content_status } from "@/generated/prisma/client";

export async function getPageBySlug(slug: string) {
  cacheTag(`page-${slug}`);
  cacheLife("hours");

  return prisma.pages.findFirst({
    where: {
      slug,
      status: content_status.published,
      deleted_at: null,
    },
    include: {
      sections: {
        where: { is_visible: true },
        orderBy: { sort_order: "asc" },
      },
    },
  });
}

export async function getAllPublishedPages() {
  cacheTag("pages");
  cacheLife("hours");

  return prisma.pages.findMany({
    where: {
      status: content_status.published,
      deleted_at: null,
    },
    orderBy: { title: "asc" },
    select: {
      id: true,
      slug: true,
      title: true,
      subtitle: true,
      meta_title: true,
      meta_description: true,
    },
  });
}
