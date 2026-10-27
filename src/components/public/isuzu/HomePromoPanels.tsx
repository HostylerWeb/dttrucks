"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { homePromoBanners } from "@/content/home-carousel";
import { cn } from "@/lib/utils";

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

export function HomePromoPanels() {
  const [index, setIndex] = useState(0);
  const panels = homePromoBanners;
  const count = panels.length;

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count]
  );

  useEffect(() => {
    const id = window.setInterval(() => go(1), 9000);
    return () => window.clearInterval(id);
  }, [go]);

  const panel = panels[index] ?? panels[0];

  return (
    <section className="relative bg-isuzu-hero border-y border-outline-variant" aria-label="Promotions">
      <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/9] min-h-[min(70vw,480px)] sm:min-h-[360px] max-h-[720px]">
        {panels.map((p, i) => (
          <Link
            key={p.id}
            href={p.href}
            className={cn(
              "absolute inset-0 block transition-opacity duration-700",
              i === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            )}
            aria-hidden={i !== index}
          >
            <Image
              src={p.image}
              alt={p.alt}
              fill
              className="object-cover object-[left_center] lg:object-center"
              sizes="100vw"
              unoptimized
            />
            <span className="sr-only">{p.cta}</span>
          </Link>
        ))}

        {count > 1 && (
          <>
            <button
              type="button"
              className="isuzu-carousel-control isuzu-carousel-control--in-stage left-2 sm:left-4 z-20"
              onClick={() => go(-1)}
              aria-label="Previous promotion"
            >
              <IconChevron direction="left" />
            </button>
            <button
              type="button"
              className="isuzu-carousel-control isuzu-carousel-control--in-stage right-2 sm:right-4 z-20"
              onClick={() => go(1)}
              aria-label="Next promotion"
            >
              <IconChevron direction="right" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {panels.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  className={cn(
                    "h-2 w-2 rounded-full border border-white/50",
                    i === index ? "bg-white" : "bg-white/35"
                  )}
                  aria-label={p.cta}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </>
        )}

        {panel && (
          <div className="absolute bottom-4 left-4 z-20 hidden sm:block">
            <Link href={panel.href} className="btn-isuzu-dark text-xs sm:text-sm shadow-lg">
              {panel.cta} →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
