import { prisma } from "@/lib/prisma";
import { requireRead } from "@/lib/admin/session";
import { DataTable } from "@/components/admin/data-table";
import { PageHeader, AdminLinkButton } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { format } from "date-fns";

export default async function AdminPagesListPage() {
  await requireRead();

  const pages = await prisma.pages.findMany({
    where: { deleted_at: null },
    orderBy: { updated_at: "desc" },
  });

  return (
    <div>
      <PageHeader
        title="Pages"
        description="CMS-managed static pages"
        actions={<AdminLinkButton href="/admin/pages/new">New page</AdminLinkButton>}
      />
      <DataTable
        columns={[
          { key: "title", label: "Title" },
          { key: "slug", label: "Slug" },
          { key: "status", label: "Status" },
          { key: "updated", label: "Updated" },
        ]}
        rows={pages.map((page) => ({
          id: page.id,
          href: `/admin/pages/${page.id}`,
          cells: {
            title: page.title,
            slug: page.slug,
            status: <StatusBadge status={page.status} />,
            updated: format(page.updated_at, "dd MMM yyyy"),
          },
        }))}
      />
    </div>
  );
}
