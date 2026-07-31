import { prisma } from "@/lib/prisma";
import { requireRead } from "@/lib/admin/session";
import { DataTable } from "@/components/admin/data-table";
import { PageHeader, AdminLinkButton } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { ListFilters } from "@/components/admin/list-filters";
import { format } from "date-fns";
import type { content_status } from "@/generated/prisma/client";

export default async function BlogAdminPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    category?: string;
    from?: string;
    to?: string;
  }>;
}) {
  await requireRead();
  const params = await searchParams;

  const categories = await prisma.blog_categories.findMany({
    orderBy: { name: "asc" },
  });

  const where: {
    deleted_at: null;
    status?: content_status;
    category_id?: string;
    published_at?: { gte?: Date; lte?: Date };
  } = { deleted_at: null };

  if (params.status) {
    where.status = params.status as content_status;
  }
  if (params.category) {
    where.category_id = params.category;
  }
  if (params.from || params.to) {
    where.published_at = {};
    if (params.from) where.published_at.gte = new Date(params.from);
    if (params.to) {
      const end = new Date(params.to);
      end.setHours(23, 59, 59, 999);
      where.published_at.lte = end;
    }
  }

  const posts = await prisma.blog_posts.findMany({
    where,
    orderBy: { updated_at: "desc" },
    include: { category: true, author: { select: { name: true } } },
  });

  return (
    <div>
      <PageHeader
        title="Blog"
        description="News and articles"
        actions={
          <div className="flex gap-2">
            <AdminLinkButton href="/admin/blog/categories" variant="secondary">
              Categories
            </AdminLinkButton>
            <AdminLinkButton href="/admin/blog/new">New post</AdminLinkButton>
          </div>
        }
      />
      <ListFilters
        basePath="/admin/blog"
        values={params}
        fields={[
          {
            name: "status",
            label: "Status",
            type: "select",
            options: [
              { value: "draft", label: "Draft" },
              { value: "published", label: "Published" },
              { value: "archived", label: "Archived" },
            ],
          },
          {
            name: "category",
            label: "Category",
            type: "select",
            options: categories.map((c) => ({ value: c.id, label: c.name })),
          },
          { name: "from", label: "Published from", type: "date" },
          { name: "to", label: "Published to", type: "date" },
        ]}
      />
      <DataTable
        columns={[
          { key: "title", label: "Title" },
          { key: "category", label: "Category" },
          { key: "author", label: "Author" },
          { key: "status", label: "Status" },
          { key: "date", label: "Published" },
        ]}
        rows={posts.map((post) => ({
          id: post.id,
          href: `/admin/blog/${post.id}`,
          cells: {
            title: post.title,
            category: post.category?.name ?? "-",
            author: post.author?.name ?? "-",
            status: <StatusBadge status={post.status} />,
            date: post.published_at
              ? format(post.published_at, "dd MMM yyyy")
              : "-",
          },
        }))}
      />
    </div>
  );
}
