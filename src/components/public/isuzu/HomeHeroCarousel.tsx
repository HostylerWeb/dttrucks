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
      aria-label="Isuzu P700 truck range"
    >
      <h1 className="sr-only">{slide.imageAlt}</h1>

      <div className="relative w-full">
        <div
          className="relative w-full aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/9] min-h-[min(72vw,520px)] sm:min-h-[min(50vw,480px)] lg:min-h-[min(56vh,620px)] max-h-[min(90vh,820px)]"
        >
          {slides.map((s, i) => (
            <div
              key={s.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-700",
                i === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              )}
              aria-hidden={i !== index}
            >
              <Image
                src={s.image}
                alt={s.imageAlt}
                fill
                priority={i === 0}
                className="object-cover object-[left_center] sm:object-[left_center] lg:object-center"
                sizes="100vw"
                unoptimized
              />
            </div>
          ))}

          {count > 1 && (
            <>
              <button
                type="button"
                className="isuzu-carousel-control isuzu-carousel-control--in-stage left-2 sm:left-4"
                onClick={() => go(-1)}
                aria-label="Previous slide"
              >
                <IconChevron direction="left" />
              </button>
              <button
                type="button"
                className="isuzu-carousel-control isuzu-carousel-control--in-stage right-2 sm:right-4"
                onClick={() => go(1)}
                aria-label="Next slide"
              >
                <IconChevron direction="right" />
              </button>
            </>
          )}

          <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none bg-gradient-to-t from-black/35 via-black/10 to-transparent pt-16 pb-4 sm:pb-5">
            <div className="page-container flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pointer-events-auto">
              <Link href={slide.ctaHref} className="btn-isuzu-dark inline-flex w-fit items-center gap-2 shadow-lg">
                {slide.ctaLabel}
                <span aria-hidden>→</span>
              </Link>
              {count > 1 && (
                <div className="flex gap-2" aria-label="Slide pagination">
                  {slides.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      className={cn(
                        "h-2.5 w-2.5 rounded-full transition-colors border border-white/40",
                        i === index ? "bg-white" : "bg-white/30 hover:bg-white/50"
                      )}
                      aria-label={`Slide ${i + 1}`}
                      aria-current={i === index}
                      onClick={() => setIndex(i)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
