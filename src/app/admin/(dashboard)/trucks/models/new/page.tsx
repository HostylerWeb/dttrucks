import { prisma } from "@/lib/prisma";
import { requireRead } from "@/lib/admin/session";
import { getMediaForPicker } from "@/lib/admin/media-picker";
import { TruckModelForm } from "@/components/admin/truck-model-form";

export default async function NewTruckModelPage() {
  await requireRead();
  const [categories, media] = await Promise.all([
    prisma.truck_categories.findMany({ orderBy: { sort_order: "asc" } }),
    getMediaForPicker(),
  ]);

  return <TruckModelForm mode="create" categories={categories} media={media} />;
}
