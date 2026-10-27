"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { homePromoPanels } from "@/content/home-carousel";
import { cn } from "@/lib/utils";

export function HomePromoPanels() {
  const [index, setIndex] = useState(0);
  const panels = homePromoPanels;
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
    <section className="relative bg-corporate-dark text-white overflow-hidden">
      <div className="absolute inset-0 opacity-40" aria-hidden>
        <Image
          src={panel?.image ?? panels[0].image}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-corporate-dark via-corporate-dark/95 to-corporate-dark/70" />

      <div className="relative page-container min-h-[380px] sm:min-h-[420px] flex flex-col justify-center py-12 sm:py-16">
        {panels.map((p, i) => (
          <div
            key={p.title}
            className={cn(
              "transition-opacity duration-700 max-w-xl",
              i === index ? "opacity-100" : "opacity-0 absolute pointer-events-none"
            )}
            aria-hidden={i !== index}
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">{p.eyebrow}</p>
            <h2 className="mt-3 font-headline text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
              {p.title}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">{p.body}</p>
            <Link
              href={p.href}
              className="mt-8 inline-flex items-center gap-2 border border-white/80 px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-corporate-dark transition-colors"
            >
              {p.cta}
              <span aria-hidden>→</span>
            </Link>
          </div>
        ))}

        {count > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {panels.map((p, i) => (
              <button
                key={p.title}
                type="button"
                className={cn(
                  "h-2 w-2 rounded-full",
                  i === index ? "bg-white" : "bg-white/40 hover:bg-white/60"
                )}
                aria-label={`Promo: ${p.title}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
