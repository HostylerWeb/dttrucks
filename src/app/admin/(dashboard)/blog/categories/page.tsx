import { prisma } from "@/lib/prisma";
import { requireRead } from "@/lib/admin/session";
import { createBlogCategory, deleteBlogCategory } from "../actions";
import { PageHeader } from "@/components/admin/page-header";
import { FormField, inputClassName } from "@/components/admin/form-field";
import { AdminButton } from "@/components/admin/page-header";

export default async function BlogCategoriesPage() {
  await requireRead();
  const categories = await prisma.blog_categories.findMany({
    orderBy: { name: "asc" },
    include: { posts: { where: { deleted_at: null } } },
  });

  return (
    <div className="space-y-8">
      <PageHeader title="Blog categories" description="Manage post categories" />
      <form action={createBlogCategory} className="flex flex-wrap gap-3 max-w-xl">
        <FormField label="Name" name="name" className="flex-1 min-w-[200px]">
          <input id="name" name="name" required className={inputClassName} />
        </FormField>
        <FormField label="Slug" name="slug" className="flex-1 min-w-[200px]">
          <input id="slug" name="slug" required className={inputClassName} />
        </FormField>
        <div className="flex items-end">
          <AdminButton type="submit">Add</AdminButton>
        </div>
      </form>
      <ul className="divide-y divide-outline-variant rounded-xl border border-outline-variant bg-white">
        {categories.map((cat) => (
          <li key={cat.id} className="flex items-center justify-between gap-4 px-4 py-3">
            <div>
              <p className="font-medium">{cat.name}</p>
              <p className="text-sm text-secondary">{cat.slug} · {cat.posts.length} posts</p>
            </div>
            <form action={deleteBlogCategory.bind(null, cat.id)}>
              <AdminButton type="submit" variant="danger">Delete</AdminButton>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
