import { prisma } from "@/lib/prisma";
import { requireRead } from "@/lib/admin/session";
import { BlogPostForm } from "@/components/admin/blog-post-form";

export default async function NewBlogPostPage() {
  await requireRead();
  const [categories, authors, media] = await Promise.all([
    prisma.blog_categories.findMany({ orderBy: { name: "asc" } }),
    prisma.users.findMany({
      where: { is_active: true },
      orderBy: { name: "asc" },
    }),
    prisma.media.findMany({ orderBy: { created_at: "desc" } }),
  ]);

  return (
    <BlogPostForm
      mode="create"
      categories={categories}
      authors={authors}
      media={media}
    />
  );
}
