"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireDelete, requireWrite } from "@/lib/admin/session";
import { checkboxValue, parseFormData } from "@/lib/admin/forms";
import { cacheTags } from "@/lib/admin/revalidate";
import { reorderVideos } from "@/lib/admin/reorder";

const videoSchema = z.object({
  title: z.string().min(1),
  youtube_id: z.string().min(1),
  page_slug: z.string().optional(),
  sort_order: z.coerce.number().int().default(0),
});

export async function createVideo(formData: FormData): Promise<void> {
  await requireWrite();
  const parsed = parseFormData(videoSchema, formData);
  if (!parsed.success) return;

  await prisma.videos.create({
    data: {
      title: parsed.data.title,
      youtube_id: parsed.data.youtube_id,
      page_slug: parsed.data.page_slug || null,
      sort_order: parsed.data.sort_order,
      is_visible: checkboxValue(formData.get("is_visible")),
    },
  });

  await cacheTags.videos();
  revalidatePath("/admin/videos");
}

export async function updateVideo(id: string, formData: FormData): Promise<void> {
  await requireWrite();
  const parsed = parseFormData(videoSchema, formData);
  if (!parsed.success) return;

  await prisma.videos.update({
    where: { id },
    data: {
      title: parsed.data.title,
      youtube_id: parsed.data.youtube_id,
      page_slug: parsed.data.page_slug || null,
      sort_order: parsed.data.sort_order,
      is_visible: checkboxValue(formData.get("is_visible")),
    },
  });

  await cacheTags.videos();
  revalidatePath("/admin/videos");
}

export async function deleteVideo(id: string): Promise<void> {
  await requireDelete();
  await prisma.videos.delete({ where: { id } });
  await cacheTags.videos();
  revalidatePath("/admin/videos");
  redirect("/admin/videos");
}

export async function reorderVideoItem(
  id: string,
  direction: "up" | "down"
): Promise<void> {
  await requireWrite();
  await reorderVideos(id, direction);
  await cacheTags.videos();
  revalidatePath("/admin/videos");
}
