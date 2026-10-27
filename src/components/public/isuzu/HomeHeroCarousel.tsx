"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { HomeHeroSlide } from "@/content/home-carousel";
import { cn } from "@/lib/utils";

const AUTO_MS = 7000;

function IconChevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      {direction === "left" ? (
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
      ) : (
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
      )}
    </svg>
  );
}

export function HomeHeroCarousel({ slides }: { slides: HomeHeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (count <= 1) return;
    const id = window.setInterval(() => go(1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [count, go]);

  const slide = slides[index];
  if (!slide) return null;

  return (
    <section
      className="relative bg-isuzu-hero text-on-background overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Isuzu truck range"
    >
      <div className="absolute inset-0 bg-isuzu-grid-floor opacity-90 pointer-events-none" aria-hidden />

      <div
        className="relative page-container py-8 sm:py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-14 items-center lg:min-h-[min(640px,calc(100vh-9rem))]"
      >
        <div className="relative z-10 order-1 flex flex-col justify-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-2">Range</p>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold uppercase tracking-tight text-on-background">
            {slide.rangeLabel}
          </h2>
          {slide.subline && (
            <p className="mt-2 text-sm sm:text-base font-semibold text-secondary uppercase tracking-wide">
              {slide.subline}
            </p>
          )}
          <h1 className="mt-5 sm:mt-6 font-headline text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase leading-tight tracking-tight max-w-md">
            {slide.headline}
          </h1>
          <div className="mt-6 sm:mt-8">
            <Link href={slide.ctaHref} className="btn-isuzu-dark inline-flex items-center gap-2">
              {slide.ctaLabel}
              <span aria-hidden>→</span>
            </Link>
          </div>

          {count > 1 && (
            <div className="mt-8 flex gap-2 lg:hidden" aria-label="Slide pagination">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-colors",
                    i === index ? "bg-corporate-dark" : "bg-outline-variant hover:bg-secondary/50"
                  )}
                  aria-label={`Slide ${i + 1}: ${s.rangeLabel}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="relative order-2 w-full z-0">
          <div className="relative mx-auto w-full max-w-[640px] lg:max-w-none aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] lg:max-h-[min(72vh,560px)]">
            {slides.map((s, i) => (
              <div
                key={s.id}
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-700",
                  i === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                )}
                aria-hidden={i !== index}
              >
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  width={960}
                  height={540}
                  priority={i === 0}
                  className="max-h-full max-w-full w-auto h-auto object-contain object-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                  sizes="(max-width: 1024px) 90vw, 45vw"
                />
              </div>
            ))}

            {count > 1 && (
              <>
                <button
                  type="button"
                  className="isuzu-carousel-control isuzu-carousel-control--in-stage left-1 sm:left-2"
                  onClick={() => go(-1)}
                  aria-label="Previous slide"
                >
                  <IconChevron direction="left" />
                </button>
                <button
                  type="button"
                  className="isuzu-carousel-control isuzu-carousel-control--in-stage right-1 sm:right-2"
                  onClick={() => go(1)}
                  aria-label="Next slide"
                >
                  <IconChevron direction="right" />
                </button>
              </>
            )}
          </div>

          {count > 1 && (
            <div className="hidden lg:flex justify-center gap-2 mt-6" aria-label="Slide pagination">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-colors",
                    i === index ? "bg-corporate-dark" : "bg-outline-variant hover:bg-secondary/50"
                  )}
                  aria-label={`Slide ${i + 1}: ${s.rangeLabel}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
