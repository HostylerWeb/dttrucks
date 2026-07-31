"use cache";

import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { content_status } from "@/generated/prisma/client";

import { pagePathFromSlug } from "@/lib/page-path";
import { getServiceSlugs } from "@/content/services";

export async function getSitemapPaths() {
  cacheTag("sitemap");
  cacheLife("hours");

  const staticPaths = [
    "/",
    "/about",
    "/contact",
    "/sales",
    "/service",
    "/specialist-applications",
    "/ebay",
    "/blog",
    "/careers",
  ];

  const [pages, trucks, posts, jobs] = await Promise.all([
    prisma.pages.findMany({
      where: { status: content_status.published, deleted_at: null },
      select: { slug: true, updated_at: true },
    }),
    prisma.truck_models.findMany({
      where: { status: content_status.published, deleted_at: null },
      select: { slug: true, updated_at: true },
    }),
    prisma.blog_posts.findMany({
      where: { status: content_status.published, deleted_at: null },
      select: { slug: true, updated_at: true },
    }),
    prisma.job_listings.findMany({
      where: { status: content_status.published, deleted_at: null },
      select: { slug: true, updated_at: true },
    }),
  ]);

  const entries: { path: string; lastModified: Date }[] = staticPaths.map((path) => ({
    path,
    lastModified: new Date(),
  }));

  for (const page of pages) {
    const path = pagePathFromSlug(page.slug);
    if (!staticPaths.includes(path)) {
      entries.push({ path, lastModified: page.updated_at });
    }
  }

  for (const slug of getServiceSlugs()) {
    entries.push({ path: `/service/${slug}`, lastModified: new Date() });
  }

  for (const truck of trucks) {
    entries.push({ path: `/sales/${truck.slug}`, lastModified: truck.updated_at });
  }

  for (const post of posts) {
    entries.push({ path: `/blog/${post.slug}`, lastModified: post.updated_at });
  }

  for (const job of jobs) {
    entries.push({ path: `/careers/${job.slug}`, lastModified: job.updated_at });
  }

  return entries;
}
