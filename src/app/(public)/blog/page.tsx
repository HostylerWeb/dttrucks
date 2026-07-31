import type { Metadata } from "next";
import { getCategories, getPostsPaginated } from "@/lib/db/blog";
import { buildStaticPageMetadata, staticMetadata } from "@/lib/metadata";
import { BreadcrumbsBar } from "@/components/layout/BreadcrumbsBar";
import { BlogCard } from "@/components/public/BlogCard";
import { BlogCategoryFilter, BlogPagination } from "@/components/public/BlogFilters";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata(
    staticMetadata.blog.title,
    staticMetadata.blog.description,
    "/blog"
  );
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { page: pageParam, category: categorySlug } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const [categories, { posts, totalPages }] = await Promise.all([
    getCategories(),
    getPostsPaginated(page, categorySlug),
  ]);

  const categoryFilters = categories
    .filter((c) => c.posts.length > 0)
    .map((c) => ({ slug: c.slug, name: c.name, count: c.posts.length }));

  return (
    <>
      <BreadcrumbsBar items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <section className="page-section page-container">
        <h1 className="font-headline text-3xl sm:text-4xl font-bold text-on-background mb-6 sm:mb-8">
          Blog
        </h1>
        <BlogCategoryFilter categories={categoryFilters} activeSlug={categorySlug} />
        {posts.length === 0 ? (
          <p className="text-secondary text-center py-12">No blog posts found.</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.id}>
                <BlogCard
                  title={post.title}
                  excerpt={post.excerpt}
                  href={`/blog/${post.slug}`}
                  publishedAt={post.published_at}
                  featuredImage={post.featured_image}
                  category={post.category?.name}
                />
              </li>
            ))}
          </ul>
        )}
        <BlogPagination page={page} totalPages={totalPages} categorySlug={categorySlug} />
      </section>
    </>
  );
}
