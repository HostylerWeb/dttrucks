"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireWrite } from "@/lib/admin/session";
import { parseFormData } from "@/lib/admin/forms";
import { cacheTags } from "@/lib/admin/revalidate";

const enquiryUpdateSchema = z.object({
  status: z.enum(["new", "in_progress", "resolved", "spam"]),
  notes: z.string().optional(),
  assigned_to_id: z.string().optional(),
});

export async function updateEnquiry(id: string, formData: FormData): Promise<void> {
  await requireWrite();
  const parsed = parseFormData(enquiryUpdateSchema, formData);
  if (!parsed.success) return;

  await prisma.enquiries.update({
    where: { id },
    data: {
      status: parsed.data.status,
      notes: parsed.data.notes || null,
      assigned_to_id: parsed.data.assigned_to_id || null,
    },
  });

  await cacheTags.enquiries();
  revalidatePath("/admin/enquiries");
  revalidatePath(`/admin/enquiries/${id}`);
}

export async function deleteEnquiry(id: string): Promise<void> {
  await requireWrite();
  await prisma.enquiries.delete({ where: { id } });
  await cacheTags.enquiries();
  revalidatePath("/admin/enquiries");
  redirect("/admin/enquiries");
}
