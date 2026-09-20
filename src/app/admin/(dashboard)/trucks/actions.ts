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
import { cacheTags, revalidateTruck } from "@/lib/admin/revalidate";
import { reorderTruckCategories } from "@/lib/admin/reorder";

const categorySchema = z.object({
  name: z.string().min(1),
  slug: slugSchema,
  description: z.string().optional(),
  image_url: z.string().optional(),
  cab_colours: z.string().optional(),
  sort_order: z.coerce.number().int().default(0),
});

const modelSchema = z.object({
  category_id: z.string().min(1),
  name: z.string().min(1),
  slug: slugSchema,
  model_code: z.string().optional(),
  description: z.string().min(1),
  specifications: z.string().optional(),
  spec_sheet_url: z.string().optional(),
  spec_sheet_label: z.string().optional(),
  image_url: z.string().optional(),
  is_driveaway: z.string().optional(),
  driveaway_type: z.string().optional(),
  status: contentStatusSchema,
  sort_order: z.coerce.number().int().default(0),
});

export async function updateCategory(id: string, formData: FormData): Promise<void> {
  await requireWrite();
  const parsed = parseFormData(categorySchema, formData);
  if (!parsed.success) return;

  await prisma.truck_categories.update({
    where: { id },
    data: {
      name: parsed.data.name,
      slug: parsed.data.slug,
      description: parsed.data.description || null,
      image_url: parsed.data.image_url || null,
      cab_colours: parsed.data.cab_colours?.trim() || null,
      sort_order: parsed.data.sort_order,
    },
  });

  await cacheTags.truckCategories();
  await cacheTags.trucks();
  revalidatePath("/admin/trucks");
  revalidatePath("/sales");
}

export async function createModel(formData: FormData) {
  await requireWrite();
  const parsed = parseFormData(modelSchema, formData);
  if (!parsed.success) return { error: "Invalid form data" };

  const data = parsed.data;
  const model = await prisma.truck_models.create({
    data: {
      category_id: data.category_id,
      name: data.name,
      slug: data.slug,
      model_code: data.model_code || null,
      description: data.description,
      specifications: data.specifications || null,
      spec_sheet_url: data.spec_sheet_url?.trim() || null,
      spec_sheet_label: data.spec_sheet_label?.trim() || null,
      image_url: data.image_url || null,
      is_driveaway: checkboxValue(formData.get("is_driveaway")),
      driveaway_type: data.driveaway_type || null,
      status: data.status,
      sort_order: data.sort_order,
      published_at: data.status === "published" ? new Date() : null,
    },
  });

  await revalidateTruck(model.slug);
  revalidatePath("/admin/trucks");
  redirect(`/admin/trucks/models/${model.id}`);
}

export async function updateModel(id: string, formData: FormData) {
  await requireWrite();
  const parsed = parseFormData(modelSchema, formData);
  if (!parsed.success) return { error: "Invalid form data" };

  const existing = await prisma.truck_models.findUnique({ where: { id } });
  if (!existing) return { error: "Model not found" };

  const data = parsed.data;
  const model = await prisma.truck_models.update({
    where: { id },
    data: {
      category_id: data.category_id,
      name: data.name,
      slug: data.slug,
      model_code: data.model_code || null,
      description: data.description,
      specifications: data.specifications || null,
      spec_sheet_url: data.spec_sheet_url?.trim() || null,
      spec_sheet_label: data.spec_sheet_label?.trim() || null,
      image_url: data.image_url || null,
      is_driveaway: checkboxValue(formData.get("is_driveaway")),
      driveaway_type: data.driveaway_type || null,
      status: data.status,
      sort_order: data.sort_order,
      published_at:
        data.status === "published"
          ? existing.published_at ?? new Date()
          : data.status === "draft"
            ? null
            : existing.published_at,
    },
  });

  await revalidateTruck(existing.slug);
  if (existing.slug !== model.slug) await revalidateTruck(model.slug);
  revalidatePath("/admin/trucks");
  revalidatePath(`/admin/trucks/models/${id}`);
  return { success: true };
}

export async function deleteModel(id: string): Promise<void> {
  await requireDelete();
  const model = await prisma.truck_models.findUnique({ where: { id } });
  if (!model) return;

  await prisma.truck_models.update({
    where: { id },
    data: { deleted_at: new Date(), status: "archived" },
  });

  await revalidateTruck(model.slug);
  revalidatePath("/admin/trucks");
  redirect("/admin/trucks");
}

export async function addTruckImage(truckId: string, formData: FormData): Promise<void> {
  await requireWrite();
  const url = String(formData.get("url") ?? "").trim();
  if (!url) return;

  const truck = await prisma.truck_models.findUnique({ where: { id: truckId } });
  if (!truck) return;

  const count = await prisma.truck_images.count({ where: { truck_id: truckId } });
  await prisma.truck_images.create({
    data: {
      truck_id: truckId,
      url,
      alt_text: String(formData.get("alt_text") ?? "") || null,
      sort_order: count,
    },
  });

  await revalidateTruck(truck.slug);
  revalidatePath(`/admin/trucks/models/${truckId}`);
}

export async function deleteTruckImage(imageId: string, truckId: string): Promise<void> {
  await requireDelete();
  const truck = await prisma.truck_models.findUnique({ where: { id: truckId } });
  await prisma.truck_images.delete({ where: { id: imageId } });
  if (truck) await revalidateTruck(truck.slug);
  revalidatePath(`/admin/trucks/models/${truckId}`);
}

export async function reorderTruckCategoryItem(
  id: string,
  direction: "up" | "down"
): Promise<void> {
  await requireWrite();
  await reorderTruckCategories(id, direction);
  await cacheTags.truckCategories();
  await cacheTags.trucks();
  revalidatePath("/admin/trucks");
}
