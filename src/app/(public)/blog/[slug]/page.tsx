import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { getPostBySlug, getRelatedPosts } from "@/lib/db/blog";
import { buildBlogMetadata } from "@/lib/metadata";
import { BreadcrumbsBar } from "@/components/layout/BreadcrumbsBar";
import { ShareButtons } from "@/components/public/ShareButtons";
import { BlogCard } from "@/components/public/BlogCard";
import { CTABanner } from "@/components/public/CTABanner";
import { BlogPostingJsonLd } from "@/components/seo/BlogPostingJsonLd";
import { absoluteUrl } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildBlogMetadata(slug);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post.category_id, post.slug);
  const siteUrl = absoluteUrl(`/blog/${post.slug}`);

  return (
    <>
      <BlogPostingJsonLd
        title={post.title}
        description={post.excerpt}
        slug={post.slug}
        publishedAt={post.published_at}
        authorName={post.author?.name}
        imageUrl={post.featured_image}
      />
      <BreadcrumbsBar
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      {post.featured_image && (
        <div
          className="h-[200px] sm:h-[280px] lg:h-[400px] bg-cover bg-center"
          style={{ backgroundImage: `url('${post.featured_image}')` }}
          role="img"
          aria-label={post.title}
        />
      )}

      <article className="page-section page-container">
        <header className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-sm text-secondary mb-4">
            {post.category && (
              <Link
                href={`/blog?category=${post.category.slug}`}
                className="rounded-full bg-primary-container/10 px-3 py-1 font-semibold text-primary-container hover:bg-primary-container/20"
              >
                {post.category.name}
              </Link>
            )}
            {post.published_at && (
              <time dateTime={post.published_at.toISOString()}>
                {format(post.published_at, "dd MMMM yyyy")}
              </time>
            )}
            {post.author?.name && <span>By {post.author.name}</span>}
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">{post.title}</h1>
          {post.excerpt && (
            <p className="mt-4 text-lg text-secondary leading-relaxed">{post.excerpt}</p>
          )}
        </header>

        <div
          className="prose max-w-3xl mt-8 sm:mt-10 prose-headings:font-headline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="max-w-3xl mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-outline-variant">
          <ShareButtons url={siteUrl} title={post.title} />
        </div>

        {related.length > 0 && (
          <div className="mt-10 sm:mt-16 border-t border-outline-variant pt-10 sm:pt-12">
            <h2 className="font-headline text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Related posts</h2>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.id}>
                  <BlogCard
                    title={item.title}
                    excerpt={item.excerpt}
                    href={`/blog/${item.slug}`}
                    publishedAt={item.published_at}
                    featuredImage={item.featured_image}
                    category={item.category?.name}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>

      <CTABanner
        title="Interested in Isuzu trucks or fleet support?"
        description="Speak to our sales and service teams in Barking, Essex."
        buttonLabel="Contact us"
        buttonHref="/contact"
        variant="dark"
      />
    </>
  );
}
