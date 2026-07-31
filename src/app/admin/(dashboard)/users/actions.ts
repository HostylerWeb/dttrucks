"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireManageUsers } from "@/lib/admin/session";
import { checkboxValue, parseFormData } from "@/lib/admin/forms";

const userSchema = z.object({
  email: z.email(),
  name: z.string().min(1),
  role: z.enum(["admin", "editor", "viewer"]),
  password: z.string().optional(),
});

export async function createUser(formData: FormData) {
  await requireManageUsers();
  const parsed = parseFormData(userSchema, formData);
  if (!parsed.success) return { error: "Invalid form data" };

  const password = parsed.data.password;
  if (!password || password.length < 8) {
    return { error: "Password must be at least 8 characters" };
  }

  const existing = await prisma.users.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
  });
  if (existing) return { error: "Email already in use" };

  await prisma.users.create({
    data: {
      email: parsed.data.email.toLowerCase(),
      name: parsed.data.name,
      role: parsed.data.role,
      password_hash: await bcrypt.hash(password, 12),
      is_active: checkboxValue(formData.get("is_active")),
    },
  });

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function updateUser(id: string, formData: FormData) {
  const session = await requireManageUsers();
  if (session.user.id === id && formData.get("is_active") !== "on") {
    return { error: "You cannot deactivate your own account" };
  }

  const parsed = parseFormData(userSchema, formData);
  if (!parsed.success) return { error: "Invalid form data" };

  const data: {
    email: string;
    name: string;
    role: "admin" | "editor" | "viewer";
    is_active: boolean;
    password_hash?: string;
  } = {
    email: parsed.data.email.toLowerCase(),
    name: parsed.data.name,
    role: parsed.data.role,
    is_active: checkboxValue(formData.get("is_active")),
  };

  if (parsed.data.password && parsed.data.password.length >= 8) {
    data.password_hash = await bcrypt.hash(parsed.data.password, 12);
  }

  await prisma.users.update({ where: { id }, data });
  revalidatePath("/admin/users");
  return { success: true };
}

export async function deactivateUser(id: string): Promise<void> {
  const session = await requireManageUsers();
  if (session.user.id === id) return;

  await prisma.users.update({
    where: { id },
    data: { is_active: false },
  });

  revalidatePath("/admin/users");
  redirect("/admin/users");
}
