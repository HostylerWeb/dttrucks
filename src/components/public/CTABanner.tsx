import Link from "next/link";
import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CTABanner({
  title,
  description,
  buttonLabel,
  buttonHref,
  variant = "primary",
  className,
}: {
  title: string;
  description?: string;
  buttonLabel: string;
  buttonHref: string;
  variant?: "primary" | "dark";
  className?: string;
}) {
  return (
    <section
      className={cn(
        "page-section",
        variant === "dark" ? "bg-inverse-surface text-white" : "bg-primary-container text-white",
        className
      )}
    >
      <div className="page-container flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
        <div className="max-w-2xl">
          <h2 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold leading-snug">
            {title}
          </h2>
          {description && (
            <p className="mt-2 sm:mt-3 text-sm md:text-base opacity-90 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        <Link
          href={buttonHref}
          className={cn(
            variant === "dark"
              ? buttonClassName("primary", "lg")
              : "inline-flex items-center justify-center rounded-lg bg-white text-primary-container px-6 sm:px-8 py-3.5 font-bold shadow-industrial hover:bg-surface-container transition-all active:scale-[0.98] min-h-12 w-full md:w-auto shrink-0"
          )}
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
