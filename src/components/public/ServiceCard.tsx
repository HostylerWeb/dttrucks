import Link from "next/link";

export function ServiceCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description?: string | null;
  href: string;
  icon?: string | null;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-outline-variant bg-white p-5 shadow-industrial hover:border-primary-container/40 transition-colors"
    >
      {icon && (
        <span className="material-symbols-outlined text-primary-container mb-3">
          {icon}
        </span>
      )}
      <h3 className="font-headline font-semibold text-lg group-hover:text-primary-container">
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-sm text-secondary line-clamp-3">{description}</p>
      )}
    </Link>
  );
}
