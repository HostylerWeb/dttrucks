"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireDelete, requireWrite } from "@/lib/admin/session";
import { parseFormData } from "@/lib/admin/forms";
import { cacheTags } from "@/lib/admin/revalidate";
import { findMediaUsages } from "@/lib/admin/media-usage";
import { storeOptimizedImage } from "@/lib/storage";
import { z } from "zod";

const altSchema = z.object({
  alt_text: z.string().optional(),
});

async function processUpload(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const stored = await storeOptimizedImage(buffer, file.name);

  return prisma.media.create({
    data: {
      filename: stored.filename,
      url: stored.url,
      alt_text: file.name,
      mime_type: "image/webp",
      size_bytes: stored.sizeBytes,
      width: stored.width,
      height: stored.height,
    },
  });
}

export async function uploadMedia(formData: FormData): Promise<void> {
  await requireWrite();
  const files = formData.getAll("file").filter(
    (entry): entry is File => entry instanceof File && entry.size > 0
  );

  if (files.length === 0) {
    const single = formData.get("file");
    if (single instanceof File && single.size > 0) {
      files.push(single);
    }
  }

  if (files.length === 0) return;

  for (const file of files) {
    await processUpload(file);
  }

  await cacheTags.media();
  revalidatePath("/admin/media");
}

export async function updateMediaAlt(id: string, formData: FormData): Promise<void> {
  await requireWrite();
  const parsed = parseFormData(altSchema, formData);
  if (!parsed.success) return;

  await prisma.media.update({
    where: { id },
    data: { alt_text: parsed.data.alt_text || null },
  });

  await cacheTags.media();
  revalidatePath("/admin/media");
}

export async function deleteMedia(id: string): Promise<void> {
  await requireDelete();
  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) return;

  const usages = await findMediaUsages(media.url);
  if (usages.length > 0) {
    return;
  }

  await prisma.media.delete({ where: { id } });
  await cacheTags.media();
  revalidatePath("/admin/media");
}

export async function getMediaUsageLabels(url: string) {
  return findMediaUsages(url);
}
