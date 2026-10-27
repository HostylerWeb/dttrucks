"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { HomeHeroSlide } from "@/content/home-carousel";
import { oemHeroMedia } from "@/content/oem-hero-assets";
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

function SlideHeadline({ slide }: { slide: HomeHeroSlide }) {
  const className =
    "font-headline font-extrabold uppercase tracking-tight text-on-background text-xl sm:text-2xl lg:text-3xl leading-tight";
  if (slide.headlineTag === "h1") {
    return <h1 className={className}>{slide.tagline}</h1>;
  }
  return <h2 className={className}>{slide.tagline}</h2>;
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
      <div
        className="absolute inset-0 bg-cover bg-center opacity-100"
        style={{ backgroundImage: `url(${oemHeroMedia.gridBackground})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-isuzu-grid-floor opacity-40 pointer-events-none" aria-hidden />

      <div className="relative page-container pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-14 lg:pb-16 min-h-[min(640px,92vh)] sm:min-h-[min(560px,85vh)] flex flex-col">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          <div className="lg:col-span-7 flex flex-col order-2 lg:order-1">
            <SlideHeadline slide={slide} />
            <div className="relative mt-4 sm:mt-6 w-full min-h-[200px] sm:min-h-[260px] md:min-h-[300px] lg:min-h-[340px] flex items-end justify-center lg:justify-start">
              {slides.map((s, i) => (
                <div
                  key={s.id}
                  className={cn(
                    "absolute inset-0 flex items-end justify-center lg:justify-start transition-opacity duration-700",
                    i === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  )}
                  aria-hidden={i !== index}
                >
                  <Image
                    src={s.truckImage}
                    alt={s.truckImageAlt}
                    width={1200}
                    height={800}
                    priority={i === 0}
                    className="w-full max-w-[min(100%,720px)] h-auto max-h-[min(55vw,380px)] sm:max-h-[min(48vw,420px)] lg:max-h-[min(52vh,480px)] object-contain object-bottom drop-shadow-[0_24px_48px_rgba(0,0,0,0.12)]"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col order-1 lg:order-2 lg:items-start lg:text-left">
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
            <Link
              href={slide.ctaHref}
              className="mt-6 sm:mt-8 btn-isuzu-dark inline-flex w-fit items-center gap-2 border-2 border-corporate-dark bg-transparent !text-corporate-dark hover:!bg-corporate-dark hover:!text-white"
            >
              {slide.ctaLabel}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              className="isuzu-carousel-control isuzu-carousel-control--in-stage left-2 sm:left-4 top-[58%] lg:top-1/2"
              onClick={() => go(-1)}
              aria-label="Previous slide"
            >
              <IconChevron direction="left" />
            </button>
            <button
              type="button"
              className="isuzu-carousel-control isuzu-carousel-control--in-stage right-2 sm:right-4 top-[58%] lg:top-1/2"
              onClick={() => go(1)}
              aria-label="Next slide"
            >
              <IconChevron direction="right" />
            </button>
            <div
              className="flex justify-center gap-2 mt-6 lg:mt-8"
              aria-label="Slide pagination"
            >
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-colors",
                    i === index ? "bg-corporate-dark" : "bg-outline-variant hover:bg-secondary/50"
                  )}
                  aria-label={`Slide ${i + 1}: ${s.title}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
