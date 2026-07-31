import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRead } from "@/lib/admin/session";
import { PageForm } from "@/components/admin/page-form";

export default async function EditPagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireRead();
  const { id } = await params;
  const page = await prisma.pages.findFirst({
    where: { id, deleted_at: null },
    include: {
      sections: { orderBy: { sort_order: "asc" } },
    },
  });

  if (!page) notFound();

  return (
    <PageForm
      mode="edit"
      page={page}
      sections={page.sections}
    />
  );
}
