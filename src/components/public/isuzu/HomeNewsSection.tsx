import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

type Post = {
  slug: string;
  title: string;
  excerpt: string | null;
  published_at: Date | null;
  featured_image: string | null;
};

export function HomeNewsSection({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="page-section bg-white">
      <div className="page-container">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="font-headline text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
            Keeping you in the know
          </h2>
          <p className="text-sm font-semibold uppercase tracking-wide text-secondary mt-2">
            Company and customer news
          </p>
        </div>

        <ul className="grid gap-8 md:grid-cols-3">
          {posts.map((post) => {
            const date = post.published_at
              ? format(post.published_at, "dd/MM/yyyy | h:mma")
              : null;
            return (
              <li key={post.slug} className="flex flex-col border border-outline-variant bg-surface">
                {post.featured_image && (
                  <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-surface-container">
                    <Image
                      src={post.featured_image}
                      alt=""
                      fill
                      className="object-cover hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </Link>
                )}
                <div className="p-5 flex flex-col flex-1">
                  {date && (
                    <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-2">
                      {date}
                    </p>
                  )}
                  <h3 className="font-headline text-lg font-bold leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-corporate-dark transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  {post.excerpt && (
                    <p className="mt-2 text-sm text-secondary line-clamp-3 flex-1">{post.excerpt}</p>
                  )}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 text-sm font-bold uppercase tracking-wide text-corporate-dark hover:underline w-fit"
                  >
                    Read more
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="text-center mt-10">
          <Link href="/blog" className="btn-isuzu-dark inline-flex">
            View all news
          </Link>
        </p>
      </div>
    </section>
  );
}
