"use cache";

import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { content_status } from "@/generated/prisma/client";

export async function getPosts(limit?: number) {
  cacheTag("blog");
  cacheLife("hours");

  return prisma.blog_posts.findMany({
    where: {
      status: content_status.published,
      deleted_at: null,
    },
    orderBy: { published_at: "desc" },
    take: limit,
    include: { category: true },
  });
}

export async function getPostBySlug(slug: string) {
  cacheTag(`blog-${slug}`);
  cacheLife("hours");

  return prisma.blog_posts.findFirst({
    where: {
      slug,
      status: content_status.published,
      deleted_at: null,
    },
    include: {
      category: true,
      author: { select: { id: true, name: true } },
    },
  });
}

export async function getCategories() {
  cacheTag("blog-categories");
  cacheLife("hours");

  return prisma.blog_categories.findMany({
    orderBy: { name: "asc" },
    include: {
      posts: {
        where: {
          status: content_status.published,
          deleted_at: null,
        },
        orderBy: { published_at: "desc" },
      },
    },
  });
}

const POSTS_PER_PAGE = 12;

export async function getPostsPaginated(page = 1, categorySlug?: string) {
  cacheTag("blog");
  cacheLife("hours");

  const where = {
    status: content_status.published,
    deleted_at: null,
    ...(categorySlug ? { category: { slug: categorySlug } } : {}),
  };

  const skip = (page - 1) * POSTS_PER_PAGE;

  const [posts, total] = await Promise.all([
    prisma.blog_posts.findMany({
      where,
      orderBy: { published_at: "desc" },
      take: POSTS_PER_PAGE,
      skip,
      include: { category: true },
    }),
    prisma.blog_posts.count({ where }),
  ]);

  return {
    posts,
    total,
    page,
    perPage: POSTS_PER_PAGE,
    totalPages: Math.max(1, Math.ceil(total / POSTS_PER_PAGE)),
  };
}

export async function getRelatedPosts(
  categoryId: string | null | undefined,
  excludeSlug: string,
  limit = 3
) {
  cacheTag("blog");
  cacheLife("hours");

  return prisma.blog_posts.findMany({
    where: {
      status: content_status.published,
      deleted_at: null,
      slug: { not: excludeSlug },
      ...(categoryId ? { category_id: categoryId } : {}),
    },
    orderBy: { published_at: "desc" },
    take: limit,
    include: { category: true },
  });
}
