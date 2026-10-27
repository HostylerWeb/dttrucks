"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { HomeHeroSlide } from "@/content/home-carousel";
import { cn } from "@/lib/utils";

const AUTO_MS = 7000;

function IconChevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
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
      <div className="absolute inset-0 bg-isuzu-grid-floor opacity-90" aria-hidden />

      <div className="relative page-container min-h-[min(520px,78vh)] sm:min-h-[560px] lg:min-h-[calc(100vh-8.5rem)] lg:max-h-[820px] flex flex-col lg:flex-row items-stretch">
        <div className="relative z-10 flex flex-col justify-center py-10 lg:py-16 lg:w-[42%] xl:w-[38%] shrink-0">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-2">
            Range
          </p>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-on-background">
            {slide.rangeLabel}
          </h2>
          {slide.subline && (
            <p className="mt-2 text-sm sm:text-base font-semibold text-secondary uppercase tracking-wide">
              {slide.subline}
            </p>
          )}
          <h1 className="mt-6 sm:mt-8 font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase leading-tight tracking-tight max-w-md">
            {slide.headline}
          </h1>
          <div className="mt-8 lg:mt-10">
            <Link href={slide.ctaHref} className="btn-isuzu-dark inline-flex items-center gap-2">
              {slide.ctaLabel}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="relative flex-1 min-h-[240px] sm:min-h-[300px] lg:min-h-0 flex items-end justify-center lg:justify-end pb-6 lg:pb-10">
          {slides.map((s, i) => (
            <div
              key={s.id}
              className={cn(
                "absolute inset-0 flex items-end justify-center lg:justify-end transition-opacity duration-700",
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
                className="w-full max-w-[min(100%,920px)] h-auto max-h-[min(52vh,480px)] lg:max-h-[min(70vh,620px)] object-contain object-bottom drop-shadow-[0_24px_48px_rgba(0,0,0,0.12)]"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            className="isuzu-carousel-control left-3 lg:left-6"
            onClick={() => go(-1)}
            aria-label="Previous slide"
          >
            <IconChevron direction="left" />
          </button>
          <button
            type="button"
            className="isuzu-carousel-control right-3 lg:right-6"
            onClick={() => go(1)}
            aria-label="Next slide"
          >
            <IconChevron direction="right" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-colors",
                  i === index ? "bg-primary-container" : "bg-outline-variant hover:bg-secondary/40"
                )}
                aria-label={`Slide ${i + 1}: ${s.rangeLabel}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
