import Link from "next/link";
import { homeHeroSlides } from "@/content/home-carousel";
import { oemHeroMedia } from "@/content/oem-hero-assets";

/**
 * Server-rendered first paint for the homepage hero (avoids blank client-only images).
 * Hidden once the client carousel hydrates.
 */
export function HomeHeroCarouselStatic() {
  const slide = homeHeroSlides[0];
  if (!slide) return null;

  const srTitle = [slide.title, slide.subtitle].filter(Boolean).join(" — ");

  return (
    <section
      id="home-hero-static"
      className="relative bg-isuzu-hero text-on-background overflow-hidden"
    >
      <h1 className="sr-only">{srTitle}</h1>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${oemHeroMedia.gridBackground})` }}
      />
      <div className="absolute inset-0 bg-isuzu-grid-floor opacity-40 pointer-events-none" />
      <div className="relative page-container pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-14 lg:pb-16 min-h-[min(640px,92vh)] sm:min-h-[min(560px,85vh)] flex flex-col">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          <div className="lg:col-span-7 flex flex-col order-2 lg:order-1">
            <div className="relative w-full min-h-[220px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[360px] flex items-end justify-center lg:justify-start">
              <img
                src={slide.truckImage}
                alt={slide.truckImageAlt}
                width={1200}
                height={800}
                decoding="async"
                fetchPriority="high"
                className="w-full max-w-[min(100%,720px)] h-auto max-h-[min(58vw,400px)] sm:max-h-[min(50vw,440px)] lg:max-h-[min(54vh,500px)] object-contain object-bottom"
              />
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col order-1 lg:order-2">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-1">
              {slide.rangeEyebrow}
            </p>
            <p className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
              {slide.title}
            </p>
            {slide.subtitle && (
              <p className="mt-2 text-sm sm:text-base font-semibold text-secondary uppercase tracking-wide">
                {slide.subtitle}
              </p>
            )}
            <Link href={slide.ctaHref} className="mt-6 sm:mt-8 btn-isuzu-dark inline-flex w-fit items-center gap-2">
              {slide.ctaLabel}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
