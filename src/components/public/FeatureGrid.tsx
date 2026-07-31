import Link from "next/link";
import { FeatureIcon } from "@/components/public/FeatureIcon";

export type FeatureItem = {
  icon: string;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
};

export function FeatureGrid({
  items,
  columns = 3,
  variant = "cards",
  useSvgIcons = false,
}: {
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
  variant?: "cards" | "glass";
  useSvgIcons?: boolean;
}) {
  const gridCols =
    columns === 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : columns === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3";

  return (
    <div className={cnGrid(gridCols)}>
      {items.map((item) => (
        <article
          key={item.title}
          className={
            variant === "glass"
              ? "glass-card p-5 sm:p-7 lg:p-8 rounded-xl border border-outline-variant hover:border-primary-container transition-all group"
              : "rounded-xl border border-outline-variant bg-white p-5 sm:p-6 shadow-industrial hover:border-primary-container/40 transition-colors"
          }
        >
          <div
            className={
              variant === "glass"
                ? "w-14 h-14 bg-primary-container text-white rounded-lg flex items-center justify-center mb-5 group-hover:scale-105 transition-transform"
                : "w-12 h-12 bg-primary-container/10 text-primary-container rounded-lg flex items-center justify-center mb-4"
            }
          >
            {useSvgIcons ? (
              <FeatureIcon name={item.icon} />
            ) : (
              <span
                className="material-symbols-outlined text-3xl"
                style={variant === "glass" ? { fontVariationSettings: '"FILL" 1' } : undefined}
              >
                {item.icon}
              </span>
            )}
          </div>
          <p className="font-headline text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-on-background">
            {item.title}
          </p>
          <p className="text-secondary text-sm leading-relaxed mb-5">{item.description}</p>
          {item.href && (
            <Link
              href={item.href}
              prefetch={false}
              className="text-primary-container font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
              aria-label={`${item.linkLabel ?? "Learn more"} — ${item.title}`}
            >
              {item.linkLabel ?? "Learn more"}
              {useSvgIcons ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              ) : (
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              )}
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}

function cnGrid(cols: string) {
  return `grid grid-cols-1 ${cols} gap-6 lg:gap-8`;
}
