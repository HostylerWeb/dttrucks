"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function BlogPagination({
  page,
  totalPages,
  categorySlug,
}: {
  page: number;
  totalPages: number;
  categorySlug?: string;
}) {
  if (totalPages <= 1) return null;

  function hrefFor(targetPage: number) {
    const params = new URLSearchParams();
    if (categorySlug) params.set("category", categorySlug);
    if (targetPage > 1) params.set("page", String(targetPage));
    const query = params.toString();
    return query ? `/blog?${query}` : "/blog";
  }

  const linkClass =
    "inline-flex items-center justify-center gap-1 rounded-lg border border-outline-variant px-4 py-2.5 text-sm font-semibold hover:bg-surface-container min-h-11 min-w-[7.5rem]";

  return (
    <nav
      className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mt-10 sm:mt-12"
      aria-label="Blog pagination"
    >
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className={linkClass}>
          <span className="material-symbols-outlined text-base" aria-hidden>chevron_left</span>
          Previous
        </Link>
      ) : (
        <span className={cn(linkClass, "opacity-40 pointer-events-none")}>Previous</span>
      )}
      <span className="text-sm text-secondary text-center py-1">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} className={linkClass}>
          Next
          <span className="material-symbols-outlined text-base" aria-hidden>chevron_right</span>
        </Link>
      ) : (
        <span className={cn(linkClass, "opacity-40 pointer-events-none")}>Next</span>
      )}
    </nav>
  );
}

export function BlogCategoryFilter({
  categories,
  activeSlug,
}: {
  categories: { slug: string; name: string; count: number }[];
  activeSlug?: string;
}) {
  const linkBase =
    "shrink-0 px-3 sm:px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors min-h-11 inline-flex items-center";

  return (
    <div className="mobile-bleed-x sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none border-b border-outline-variant pb-4 mb-6 sm:mb-8">
      <div className="flex flex-wrap sm:flex-wrap gap-2 min-w-max sm:min-w-0">
        <Link
          href="/blog"
          className={cn(
            linkBase,
            !activeSlug
              ? "bg-primary-container text-white"
              : "text-secondary hover:bg-surface-container border border-transparent"
          )}
        >
          All posts
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog?category=${category.slug}`}
            className={cn(
              linkBase,
              activeSlug === category.slug
                ? "bg-primary-container text-white"
                : "text-secondary hover:bg-surface-container border border-outline-variant sm:border-transparent"
            )}
          >
            {category.name}
            <span className="ml-1 opacity-70">({category.count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
