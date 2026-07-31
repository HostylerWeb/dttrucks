"use cache";

import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { content_status } from "@/generated/prisma/client";

export async function getJobListings() {
  cacheTag("jobs");
  cacheLife("hours");

  return prisma.job_listings.findMany({
    where: {
      status: content_status.published,
      deleted_at: null,
    },
    orderBy: { published_at: "desc" },
  });
}

export async function getJobBySlug(slug: string) {
  cacheTag(`job-${slug}`);
  cacheLife("hours");

  return prisma.job_listings.findFirst({
    where: {
      slug,
      status: content_status.published,
      deleted_at: null,
    },
  });
}

export async function getJobApplications(jobId?: string) {
  return prisma.job_applications.findMany({
    where: jobId ? { job_id: jobId } : undefined,
    orderBy: { created_at: "desc" },
    include: { job: true },
  });
}
