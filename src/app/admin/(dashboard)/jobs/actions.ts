"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireDelete, requireWrite } from "@/lib/admin/session";
import { contentStatusSchema, parseFormData, slugSchema } from "@/lib/admin/forms";
import { revalidateJob } from "@/lib/admin/revalidate";

const jobSchema = z.object({
  title: z.string().min(1),
  slug: slugSchema,
  description: z.string().min(1),
  requirements: z.string().optional(),
  location: z.string().default("Barking, Essex"),
  employment_type: z.enum([
    "full_time",
    "part_time",
    "contract",
    "apprenticeship",
  ]),
  status: contentStatusSchema,
});

export async function createJob(formData: FormData) {
  await requireWrite();
  const parsed = parseFormData(jobSchema, formData);
  if (!parsed.success) return { error: "Invalid form data" };

  const job = await prisma.job_listings.create({
    data: {
      ...parsed.data,
      requirements: parsed.data.requirements || null,
      published_at: parsed.data.status === "published" ? new Date() : null,
    },
  });

  await revalidateJob(job.slug);
  revalidatePath("/admin/jobs");
  redirect(`/admin/jobs/${job.id}`);
}

export async function updateJob(id: string, formData: FormData) {
  await requireWrite();
  const parsed = parseFormData(jobSchema, formData);
  if (!parsed.success) return { error: "Invalid form data" };

  const existing = await prisma.job_listings.findUnique({ where: { id } });
  if (!existing) return { error: "Not found" };

  const job = await prisma.job_listings.update({
    where: { id },
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      description: parsed.data.description,
      requirements: parsed.data.requirements || null,
      location: parsed.data.location,
      employment_type: parsed.data.employment_type,
      status: parsed.data.status,
      published_at:
        parsed.data.status === "published"
          ? existing.published_at ?? new Date()
          : parsed.data.status === "draft"
            ? null
            : existing.published_at,
    },
  });

  await revalidateJob(existing.slug);
  if (existing.slug !== job.slug) await revalidateJob(job.slug);
  revalidatePath("/admin/jobs");
  revalidatePath(`/admin/jobs/${id}`);
  return { success: true };
}

export async function deleteJob(id: string): Promise<void> {
  await requireDelete();
  const job = await prisma.job_listings.findUnique({ where: { id } });
  if (!job) return;

  await prisma.job_listings.update({
    where: { id },
    data: { deleted_at: new Date(), status: "archived" },
  });

  await revalidateJob(job.slug);
  revalidatePath("/admin/jobs");
  redirect("/admin/jobs");
}

export async function updateApplicationStatus(id: string, formData: FormData): Promise<void> {
  await requireWrite();
  const status = formData.get("status") as string;
  await prisma.job_applications.update({
    where: { id },
    data: { status: status as "new" | "reviewing" | "shortlisted" | "rejected" | "hired" },
  });
  revalidatePath("/admin/jobs/applications");
}
