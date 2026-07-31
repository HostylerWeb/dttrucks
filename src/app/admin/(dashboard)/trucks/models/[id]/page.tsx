import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRead } from "@/lib/admin/session";
import { getMediaForPicker } from "@/lib/admin/media-picker";
import { TruckModelForm } from "@/components/admin/truck-model-form";

export default async function EditTruckModelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireRead();
  const { id } = await params;
  const model = await prisma.truck_models.findFirst({
    where: { id, deleted_at: null },
    include: { images: { orderBy: { sort_order: "asc" } } },
  });
  if (!model) notFound();

  const [categories, media] = await Promise.all([
    prisma.truck_categories.findMany({ orderBy: { sort_order: "asc" } }),
    getMediaForPicker(),
  ]);

  return (
    <TruckModelForm
      mode="edit"
      model={model}
      categories={categories}
      images={model.images}
      media={media}
    />
  );
}
