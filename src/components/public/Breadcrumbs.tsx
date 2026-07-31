import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { cn } from "@/lib/utils";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav aria-label="Breadcrumb" className="text-xs sm:text-sm text-secondary">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li
                key={`${item.label}-${index}`}
                className={cn("flex items-center gap-2 min-w-0", isLast && "max-w-full")}
              >
                {index > 0 && <span className="text-outline shrink-0" aria-hidden>/</span>}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-primary-container font-medium truncate"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="text-on-surface font-medium truncate"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
