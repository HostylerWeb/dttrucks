"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireDelete, requireWrite } from "@/lib/admin/session";
import {
  checkboxValue,
  contentStatusSchema,
  parseFormData,
  slugSchema,
} from "@/lib/admin/forms";
import { revalidatePage } from "@/lib/admin/revalidate";
import type { section_type } from "@/generated/prisma/client";

const pageSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: slugSchema,
  subtitle: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  status: contentStatusSchema,
});

export async function createPage(formData: FormData) {
  await requireWrite();
  const parsed = parseFormData(pageSchema, formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  const data = parsed.data;
  const published_at =
    data.status === "published" ? new Date() : null;

  const page = await prisma.pages.create({
    data: {
      title: data.title,
      slug: data.slug,
      subtitle: data.subtitle || null,
      content: data.content,
      meta_title: data.meta_title || null,
      meta_description: data.meta_description || null,
      status: data.status,
      published_at,
    },
  });

  await revalidatePage(page.slug);
  revalidatePath("/admin/pages");
  redirect(`/admin/pages/${page.id}`);
}

export async function updatePage(id: string, formData: FormData) {
  await requireWrite();
  const parsed = parseFormData(pageSchema, formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  const existing = await prisma.pages.findUnique({ where: { id } });
  if (!existing) return { error: "Page not found" };

  const data = parsed.data;
  const published_at =
    data.status === "published"
      ? existing.published_at ?? new Date()
      : data.status === "draft"
        ? null
        : existing.published_at;

  const page = await prisma.pages.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      subtitle: data.subtitle || null,
      content: data.content,
      meta_title: data.meta_title || null,
      meta_description: data.meta_description || null,
      status: data.status,
      published_at,
    },
  });

  await revalidatePage(existing.slug);
  if (existing.slug !== page.slug) {
    await revalidatePage(page.slug);
  }
  revalidatePath("/admin/pages");
  revalidatePath(`/admin/pages/${id}`);
  return { success: true };
}

export async function deletePage(id: string): Promise<void> {
  await requireDelete();
  const page = await prisma.pages.findUnique({ where: { id } });
  if (!page) return;

  await prisma.pages.update({
    where: { id },
    data: { deleted_at: new Date(), status: "archived" },
  });

  await revalidatePage(page.slug);
  revalidatePath("/admin/pages");
  redirect("/admin/pages");
}

export async function publishPage(id: string): Promise<void> {
  await requireWrite();
  const page = await prisma.pages.update({
    where: { id },
    data: { status: "published", published_at: new Date() },
  });
  await revalidatePage(page.slug);
  revalidatePath(`/admin/pages/${id}`);
  revalidatePath("/admin/pages");
}

const sectionSchema = z.object({
  section_type: z.enum([
    "hero",
    "text_block",
    "feature_grid",
    "image_gallery",
    "video_embed",
    "cta_banner",
    "team_members",
    "faq",
    "contact_info",
  ]),
  title: z.string().optional(),
  content: z.string().optional(),
  sort_order: z.coerce.number().int().default(0),
});

export async function createPageSection(pageId: string, formData: FormData): Promise<void> {
  await requireWrite();
  const parsed = parseFormData(sectionSchema, formData);
  if (!parsed.success) return;

  const page = await prisma.pages.findUnique({ where: { id: pageId } });
  if (!page) return;

  await prisma.page_sections.create({
    data: {
      page_id: pageId,
      section_type: parsed.data.section_type as section_type,
      title: parsed.data.title || null,
      content: parsed.data.content || null,
      sort_order: parsed.data.sort_order,
      is_visible: checkboxValue(formData.get("is_visible")),
    },
  });

  await revalidatePage(page.slug);
  revalidatePath(`/admin/pages/${pageId}`);
}

export async function deletePageSection(sectionId: string, pageId: string): Promise<void> {
  await requireDelete();
  const page = await prisma.pages.findUnique({ where: { id: pageId } });
  await prisma.page_sections.delete({ where: { id: sectionId } });
  if (page) await revalidatePage(page.slug);
  revalidatePath(`/admin/pages/${pageId}`);
}

export async function reorderPageSection(
  sectionId: string,
  pageId: string,
  direction: "up" | "down"
): Promise<void> {
  await requireWrite();
  const sections = await prisma.page_sections.findMany({
    where: { page_id: pageId },
    orderBy: { sort_order: "asc" },
  });
  const index = sections.findIndex((s) => s.id === sectionId);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= sections.length) return;

  const current = sections[index]!;
  const swap = sections[swapIndex]!;
  await prisma.page_sections.update({ where: { id: current.id }, data: { sort_order: swap.sort_order } });
  await prisma.page_sections.update({ where: { id: swap.id }, data: { sort_order: current.sort_order } });

  const page = await prisma.pages.findUnique({ where: { id: pageId } });
  if (page) await revalidatePage(page.slug);
  revalidatePath(`/admin/pages/${pageId}`);
}
