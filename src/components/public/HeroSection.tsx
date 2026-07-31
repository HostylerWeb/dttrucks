import Link from "next/link";
import Image from "next/image";
import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Cta = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "link";
};

export function HeroSection({
  backgroundImage,
  backgroundImageMobile,
  imageAlt = "Hero background",
  backgroundPosition = "center",
  badge,
  eyebrow,
  title,
  subtitle,
  tagline,
  titleTag = "h1",
  subtitleTag = "p",
  ctas = [],
  className,
  minHeight = "min-h-[min(440px,78vh)] sm:min-h-[480px] lg:min-h-[560px] lg:h-[650px]",
  priorityImage,
}: {
  backgroundImage?: string;
  backgroundImageMobile?: string;
  imageAlt?: string;
  backgroundPosition?: string;
  badge?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string | null;
  tagline?: string;
  titleTag?: "h1" | "h2" | "p";
  subtitleTag?: "p" | "h2";
  ctas?: Cta[];
  className?: string;
  minHeight?: string;
  priorityImage?: boolean;
}) {
  const prioritizeImage = priorityImage ?? Boolean(backgroundImage);

  return (
    <section
      className={cn(
        "relative flex items-center overflow-hidden bg-inverse-surface text-white",
        minHeight,
        className
      )}
    >
      <div className="absolute inset-0 z-0">
        {backgroundImage ? (
          backgroundImageMobile ? (
            <picture>
              <source
                type="image/webp"
                srcSet={`${backgroundImageMobile} 640w, ${backgroundImage} 1024w`}
                sizes="100vw"
              />
              <img
                src={backgroundImage}
                alt={imageAlt}
                decoding="async"
                fetchPriority={prioritizeImage ? "high" : "auto"}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: backgroundPosition }}
              />
            </picture>
          ) : (
            <Image
              src={backgroundImage}
              alt={imageAlt}
              fill
              priority={prioritizeImage}
              unoptimized={prioritizeImage && backgroundImage.startsWith("/")}
              className="object-cover"
              style={{ objectPosition: backgroundPosition }}
              sizes="100vw"
            />
          )
        ) : (
          <div className="w-full h-full bg-inverse-surface" />
        )}
        <div className="absolute inset-0 hero-gradient" />
      </div>
      <div className="relative z-10 w-full page-container py-10 sm:py-12 lg:py-16">
        <div className="max-w-2xl">
          {badge && (
            <span className="bg-primary-container text-white px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-widest rounded mb-4 sm:mb-5 inline-block">
              {badge}
            </span>
          )}
          {eyebrow && (
            <p className="text-primary-fixed-dim text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2">
              {eyebrow}
            </p>
          )}
          {titleTag === "h1" ? (
            <h1 className="font-headline text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[48px] font-extrabold leading-[1.15] mb-3 sm:mb-4 tracking-tight">
              {title}
            </h1>
          ) : titleTag === "h2" ? (
            <h2 className="font-headline text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[48px] font-extrabold leading-[1.15] mb-3 sm:mb-4 tracking-tight">
              {title}
            </h2>
          ) : (
            <p className="font-headline text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[48px] font-extrabold leading-[1.15] mb-3 sm:mb-4 tracking-tight">
              {title}
            </p>
          )}
          {subtitle &&
            (subtitleTag === "h2" ? (
              <h2 className="text-base sm:text-lg md:text-xl text-white/90 mb-2 leading-relaxed font-semibold">
                {subtitle}
              </h2>
            ) : (
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-2 leading-relaxed">
                {subtitle}
              </p>
            ))}
          {tagline && (
            <p className="text-primary-fixed-dim font-headline text-lg sm:text-xl md:text-2xl font-bold mb-6 sm:mb-8 leading-snug">
              {tagline}
            </p>
          )}
          {ctas.length > 0 && (
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full sm:w-auto">
              {ctas.map((cta) => {
                if (cta.variant === "link") {
                  return (
                    <Link
                      key={cta.href}
                      href={cta.href}
                      className="inline-flex items-center justify-center sm:justify-start text-white/90 hover:text-white px-4 py-3 font-semibold text-sm underline-offset-4 hover:underline min-h-11"
                    >
                      {cta.label}
                    </Link>
                  );
                }
                if (cta.variant === "secondary") {
                  return (
                    <Link
                      key={cta.href}
                      href={cta.href}
                      className="inline-flex items-center justify-center w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white px-6 sm:px-8 py-3.5 rounded-lg font-bold transition-all active:scale-[0.98] min-h-11"
                    >
                      {cta.label}
                    </Link>
                  );
                }
                return (
                  <Link
                    key={cta.href}
                    href={cta.href}
                    className={cn(buttonClassName("primary", "lg"), "w-full sm:w-auto justify-center min-h-11")}
                  >
                    {cta.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
