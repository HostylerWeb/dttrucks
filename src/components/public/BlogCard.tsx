import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

export function BlogCard({
  title,
  excerpt,
  href,
  publishedAt,
  featuredImage,
  category,
}: {
  title: string;
  excerpt?: string | null;
  href: string;
  publishedAt?: Date | null;
  featuredImage?: string | null;
  category?: string | null;
}) {
  return (
    <article className="rounded-xl border border-outline-variant bg-white shadow-industrial overflow-hidden flex flex-col">
      {featuredImage ? (
        <Link href={href} className="block aspect-[16/9] overflow-hidden bg-surface-container relative">
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>
      ) : (
        <Link
          href={href}
          className="block aspect-[16/9] bg-surface-container flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-4xl text-outline-variant" aria-hidden>
            article
          </span>
        </Link>
      )}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-secondary">
          {category && (
            <span className="rounded-full bg-primary-container/10 px-2.5 py-0.5 text-primary-container normal-case">
              {category}
            </span>
          )}
          {publishedAt && <time dateTime={publishedAt.toISOString()}>{format(publishedAt, "dd MMM yyyy")}</time>}
        </div>
        <h3 className="mt-2 font-headline text-base sm:text-lg font-semibold leading-snug">
          <Link href={href} className="hover:text-primary-container">{title}</Link>
        </h3>
        {excerpt && (
          <p className="mt-2 text-sm text-secondary line-clamp-3 flex-1">{excerpt}</p>
        )}
        <Link href={href} className="mt-4 text-sm font-semibold text-primary-container hover:underline">
          Read more →
        </Link>
      </div>
    </article>
  );
}
