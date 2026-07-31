import Link from "next/link";
import type { employment_type } from "@/generated/prisma/client";

function formatEmploymentType(type: employment_type) {
  const labels: Record<employment_type, string> = {
    full_time: "Full time",
    part_time: "Part time",
    contract: "Contract",
    apprenticeship: "Apprenticeship",
  };
  return labels[type];
}

export function JobCard({
  title,
  slug,
  location,
  employmentType,
  excerpt,
}: {
  title: string;
  slug: string;
  location: string;
  employmentType: employment_type;
  excerpt?: string | null;
}) {
  return (
    <article className="rounded-xl border border-outline-variant bg-white p-5 sm:p-6 shadow-industrial hover:border-primary-container/40 transition-colors">
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wide rounded-full bg-surface-container px-2.5 py-0.5 text-secondary">
          {formatEmploymentType(employmentType)}
        </span>
        <span className="text-xs font-semibold text-secondary flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">location_on</span>
          {location}
        </span>
      </div>
      <h3 className="font-headline text-lg sm:text-xl font-bold leading-snug">
        <Link href={`/careers/${slug}`} className="hover:text-primary-container">{title}</Link>
      </h3>
      {excerpt && (
        <p className="mt-3 text-sm text-secondary line-clamp-3">{excerpt}</p>
      )}
      <Link
        href={`/careers/${slug}`}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-container hover:underline"
      >
        View role
        <span className="material-symbols-outlined text-base">arrow_forward</span>
      </Link>
    </article>
  );
}

export { formatEmploymentType };
