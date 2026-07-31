import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireManageUsers } from "@/lib/admin/session";
import { UserEditForm } from "@/components/admin/user-edit-form";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireManageUsers();
  const { id } = await params;
  const user = await prisma.users.findUnique({ where: { id } });
  if (!user) notFound();
  return <UserEditForm user={user} />;
}
