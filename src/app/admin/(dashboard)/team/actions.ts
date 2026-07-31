"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireDelete, requireWrite } from "@/lib/admin/session";
import { checkboxValue, parseFormData } from "@/lib/admin/forms";
import { cacheTags } from "@/lib/admin/revalidate";
import { reorderTeamMembers } from "@/lib/admin/reorder";

const memberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().optional(),
  photo_url: z.string().optional(),
  sort_order: z.coerce.number().int().default(0),
});

export async function createTeamMember(formData: FormData) {
  await requireWrite();
  const parsed = parseFormData(memberSchema, formData);
  if (!parsed.success) return { error: "Invalid form data" };

  const member = await prisma.team_members.create({
    data: {
      ...parsed.data,
      bio: parsed.data.bio || null,
      photo_url: parsed.data.photo_url || null,
      is_visible: checkboxValue(formData.get("is_visible")),
    },
  });

  await cacheTags.team();
  revalidatePath("/admin/team");
  redirect(`/admin/team/${member.id}`);
}

export async function updateTeamMember(id: string, formData: FormData) {
  await requireWrite();
  const parsed = parseFormData(memberSchema, formData);
  if (!parsed.success) return { error: "Invalid form data" };

  await prisma.team_members.update({
    where: { id },
    data: {
      name: parsed.data.name,
      role: parsed.data.role,
      bio: parsed.data.bio || null,
      photo_url: parsed.data.photo_url || null,
      sort_order: parsed.data.sort_order,
      is_visible: checkboxValue(formData.get("is_visible")),
    },
  });

  await cacheTags.team();
  revalidatePath("/admin/team");
  return { success: true };
}

export async function deleteTeamMember(id: string): Promise<void> {
  await requireDelete();
  await prisma.team_members.delete({ where: { id } });
  await cacheTags.team();
  revalidatePath("/admin/team");
  redirect("/admin/team");
}

export async function reorderTeamMemberItem(
  id: string,
  direction: "up" | "down"
): Promise<void> {
  await requireWrite();
  await reorderTeamMembers(id, direction);
  await cacheTags.team();
  revalidatePath("/admin/team");
}
