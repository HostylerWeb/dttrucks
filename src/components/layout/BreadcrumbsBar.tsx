import { Breadcrumbs } from "@/components/public/Breadcrumbs";

export function BreadcrumbsBar({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <div className="bg-surface border-b border-outline-variant">
      <div className="page-container py-3 sm:py-4">
        <Breadcrumbs items={items} />
      </div>
    </div>
  );
}
