"use client";

import Link from "next/link";
import { useState } from "react";
import { buttonClassName } from "@/components/ui/button";
import { HOME_PILLARS } from "@/content/home-dealer";
import { cn } from "@/lib/utils";

const DEFAULT_PILLAR_ID = HOME_PILLARS[0]?.id ?? "parts";

export function ThreePillarsSection() {
  const [activeId, setActiveId] = useState(DEFAULT_PILLAR_ID);
  const active = HOME_PILLARS.find((p) => p.id === activeId);
  if (!active) return null;

  return (
    <section className="page-section bg-surface-container-low bg-grid-pattern">
      <div className="page-container">
        <div className="text-center mb-10 lg:mb-12">
          <p className="text-primary-container text-sm font-bold uppercase tracking-widest mb-3">
            One dealership
          </p>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-on-background">
            Parts, sales & workshop
          </h2>
          <p className="text-secondary max-w-xl mx-auto mt-4 leading-relaxed">
            Everything your commercial fleet needs  -  genuine parts, new trucks and IRTEC-accredited
            workshop support.
          </p>
        </div>

        <div className="rounded-2xl border border-outline-variant bg-white shadow-industrial overflow-hidden">
          {/* Tab list */}
          <div className="flex flex-col sm:flex-row border-b border-outline-variant bg-surface-container-low/80">
            {HOME_PILLARS.map((pillar) => {
              const isActive = pillar.id === activeId;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setActiveId(pillar.id)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 px-5 py-4 lg:py-5 text-sm lg:text-base font-semibold transition-all border-b sm:border-b-0 sm:border-r border-outline-variant last:border-r-0 last:border-b-0",
                    isActive
                      ? "bg-white text-primary-container shadow-[inset_0_-3px_0_0_var(--color-primary-container)] sm:shadow-[inset_3px_0_0_0_var(--color-primary-container)]"
                      : "text-secondary hover:text-on-background hover:bg-white/60"
                  )}
                >
                  <span className="material-symbols-outlined text-xl">{pillar.icon}</span>
                  {pillar.title}
                </button>
              );
            })}
          </div>

          {/* Active panel */}
          <div className="p-5 sm:p-8 lg:p-10 xl:p-12">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-5">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary-container text-white flex items-center justify-center shrink-0 shadow-industrial">
                    <span className="material-symbols-outlined text-4xl">{active.icon}</span>
                  </div>
                  <div>
                    {active.badge && (
                      <span className="inline-block text-xs font-bold uppercase tracking-wide text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-2">
                        {active.badge}
                      </span>
                    )}
                    <h3 className="font-headline text-xl sm:text-2xl lg:text-3xl font-bold text-on-background">
                      {active.title}
                    </h3>
                  </div>
                </div>
                <p className="text-secondary text-base lg:text-lg leading-relaxed">{active.lead}</p>
                <Link
                  href={active.cta.href}
                  className={
                    active.darkCta
                      ? "mt-8 inline-flex items-center justify-center rounded-lg bg-inverse-surface text-white px-8 py-3.5 font-semibold hover:bg-black transition-colors shadow-industrial"
                      : buttonClassName("primary", "lg") + " mt-8"
                  }
                >
                  {active.cta.label}
                </Link>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-xl border border-outline-variant bg-surface-container-low/50 p-5 sm:p-6 lg:p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary-container mb-5">
                    Key capabilities
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {active.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 rounded-lg bg-white border border-outline-variant/80 px-4 py-3.5 text-sm text-secondary leading-relaxed"
                      >
                        <span
                          className="material-symbols-outlined text-primary-container text-lg shrink-0 mt-0.5"
                          aria-hidden
                        >
                          done
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
