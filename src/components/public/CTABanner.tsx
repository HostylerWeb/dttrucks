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
  /** @deprecated Both variants use the light band; red accent is the button only. */
  variant?: "primary" | "dark";
  className?: string;
}) {
  return (
    <section
      className={cn(
        "page-section border-y border-outline-variant text-on-background",
        variant === "primary"
          ? "bg-primary-container/[0.06]"
          : "bg-surface-container-low",
        className
      )}
    >
      <div className="page-container flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
        <div className="max-w-2xl">
          <h2 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold leading-snug">
            {title}
          </h2>
          {description && (
            <p className="mt-2 sm:mt-3 text-sm md:text-base text-secondary leading-relaxed">
              {description}
            </p>
          )}
        </div>
        <Link href={buttonHref} className={cn(buttonClassName("primary", "lg"), "w-full md:w-auto shrink-0 justify-center")}>
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
