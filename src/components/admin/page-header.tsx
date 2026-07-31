import Link from "next/link";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="font-headline text-2xl font-bold text-on-surface">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-secondary">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      )}
    </div>
  );
}

export function AdminButton({
  children,
  variant = "primary",
  className,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "danger";
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-60",
        variant === "primary" &&
          "bg-primary-container text-white hover:bg-primary",
        variant === "secondary" &&
          "border border-outline-variant bg-white text-on-surface hover:bg-surface-container",
        variant === "danger" &&
          "border border-primary-fixed-dim bg-white text-primary hover:bg-primary-fixed-dim/10",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function AdminLinkButton({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
        variant === "primary" &&
          "bg-primary-container text-white hover:bg-primary",
        variant === "secondary" &&
          "border border-outline-variant bg-white text-on-surface hover:bg-surface-container",
        className
      )}
    >
      {children}
    </Link>
  );
}
