import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRead } from "@/lib/admin/session";
import { BlogPostForm } from "@/components/admin/blog-post-form";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireRead();
  const { id } = await params;
  const post = await prisma.blog_posts.findFirst({
    where: { id, deleted_at: null },
  });
  if (!post) notFound();

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
      mode="edit"
      post={post}
      categories={categories}
      authors={authors}
      media={media}
    />
  );
}
