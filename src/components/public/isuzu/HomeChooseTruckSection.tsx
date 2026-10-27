"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export type ChooseTruckCard = {
  slug: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  href: string;
};

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

export function HomeChooseTruckSection({ cards }: { cards: ChooseTruckCard[] }) {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (delta: number) => {
    scroller.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="page-section bg-white border-b border-outline-variant">
      <div className="page-container">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="font-headline text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
              Choose your truck
            </h2>
            <p className="text-sm text-secondary mt-1 uppercase tracking-wide font-semibold">
              Filter by weight
            </p>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              type="button"
              className="isuzu-carousel-control shrink-0"
              onClick={() => scroll(-320)}
              aria-label="Scroll truck cards left"
            >
              <IconChevron direction="left" />
            </button>
            <button
              type="button"
              className="isuzu-carousel-control shrink-0"
              onClick={() => scroll(320)}
              aria-label="Scroll truck cards right"
            >
              <IconChevron direction="right" />
            </button>
          </div>
        </div>

        <div
          ref={scroller}
          className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-2 -mx-1 px-1"
        >
          {cards.map((card) => (
            <Link
              key={card.slug}
              href={card.href}
              className="group snap-start shrink-0 w-[min(100%,300px)] sm:w-[320px] border border-outline-variant bg-surface hover:border-corporate-dark/25 transition-colors"
            >
              {card.imageUrl && (
                <div className="relative aspect-[16/10] bg-isuzu-hero overflow-hidden">
                  <Image
                    src={card.imageUrl}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    sizes="320px"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-headline text-lg font-extrabold uppercase tracking-tight group-hover:text-corporate-dark transition-colors">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-secondary leading-relaxed line-clamp-4">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
