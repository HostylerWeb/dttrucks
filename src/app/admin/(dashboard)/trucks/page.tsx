import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireRead } from "@/lib/admin/session";
import { reorderTruckCategoryItem } from "@/app/admin/(dashboard)/trucks/actions";
import { PageHeader, AdminLinkButton } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { ReorderButtons } from "@/components/admin/reorder-buttons";

export default async function TrucksAdminPage() {
  await requireRead();

  const categories = await prisma.truck_categories.findMany({
    orderBy: { sort_order: "asc" },
    include: {
      truck_models: {
        where: { deleted_at: null },
        orderBy: { sort_order: "asc" },
      },
    },
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Trucks"
        description="Categories and truck models"
        actions={
          <AdminLinkButton href="/admin/trucks/models/new">
            New model
          </AdminLinkButton>
        }
      />

      {categories.map((category) => (
        <section
          key={category.id}
          className="rounded-xl border border-outline-variant bg-white p-6 shadow-industrial"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="font-headline text-lg font-semibold">{category.name}</h2>
              <p className="text-sm text-secondary">{category.slug}</p>
            </div>
            <div className="flex items-center gap-2">
              <ReorderButtons
                moveUpAction={reorderTruckCategoryItem.bind(null, category.id, "up")}
                moveDownAction={reorderTruckCategoryItem.bind(null, category.id, "down")}
              />
              <Link
                href={`/admin/trucks/categories/${category.id}`}
                className="text-sm font-medium text-primary-container hover:underline"
              >
                Edit category
              </Link>
            </div>
          </div>

          <ul className="mt-4 divide-y divide-outline-variant">
            {category.truck_models.length === 0 ? (
              <li className="py-3 text-sm text-secondary">No models in this category</li>
            ) : (
              category.truck_models.map((model) => (
                <li
                  key={model.id}
                  className="flex flex-wrap items-center justify-between gap-2 py-3"
                >
                  <Link
                    href={`/admin/trucks/models/${model.id}`}
                    className="font-medium text-on-surface hover:text-primary-container"
                  >
                    {model.name}
                  </Link>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={model.status} />
                    {model.is_driveaway && (
                      <span className="text-xs text-secondary">Driveaway</span>
                    )}
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>
      ))}
    </div>
  );
}
