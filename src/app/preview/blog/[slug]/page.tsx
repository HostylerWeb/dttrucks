import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function BlogPostPreview({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blog_posts.findFirst({
    where: { slug, deleted_at: null },
    include: { category: true, author: { select: { name: true } } },
  });

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-surface p-8 max-w-3xl mx-auto">
      <p className="text-xs text-secondary mb-4">Preview — {post.status}</p>
      {post.category && (
        <p className="text-sm text-secondary">{post.category.name}</p>
      )}
      <h1 className="font-headline text-3xl font-bold">{post.title}</h1>
      {post.author && (
        <p className="mt-2 text-sm text-secondary">By {post.author.name}</p>
      )}
      {post.excerpt && (
        <p className="mt-4 text-lg text-secondary">{post.excerpt}</p>
      )}
      <div
        className="prose prose-sm mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
