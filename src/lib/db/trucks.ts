"use cache";

import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { content_status } from "@/generated/prisma/client";

export async function getCategories() {
  cacheTag("truck-categories");
  cacheLife("hours");

  return prisma.truck_categories.findMany({
    orderBy: { sort_order: "asc" },
    include: {
      truck_models: {
        where: {
          status: content_status.published,
          deleted_at: null,
        },
        orderBy: { sort_order: "asc" },
      },
    },
  });
}

export async function getModels(categorySlug?: string) {
  cacheTag("trucks");
  cacheLife("hours");

  return prisma.truck_models.findMany({
    where: {
      status: content_status.published,
      deleted_at: null,
      ...(categorySlug
        ? { category: { slug: categorySlug } }
        : undefined),
    },
    orderBy: { sort_order: "asc" },
    include: {
      category: true,
      images: { orderBy: { sort_order: "asc" } },
    },
  });
}

export async function getModelBySlug(slug: string) {
  cacheTag(`truck-${slug}`);
  cacheLife("hours");

  return prisma.truck_models.findFirst({
    where: {
      slug,
      status: content_status.published,
      deleted_at: null,
    },
    include: {
      category: true,
      images: { orderBy: { sort_order: "asc" } },
    },
  });
}

export async function getDriveawayModels() {
  cacheTag("trucks");
  cacheLife("hours");

  return prisma.truck_models.findMany({
    where: {
      is_driveaway: true,
      status: content_status.published,
      deleted_at: null,
    },
    orderBy: { sort_order: "asc" },
    include: {
      category: true,
      images: { orderBy: { sort_order: "asc" } },
    },
  });
}
