import Link from "next/link";
import { homeSpecialistIcons, homeSpecialistSections } from "@/content/home";

export function HomeSpecialistGrid() {
  return (
    <section className="page-section bg-white">
      <div className="page-container">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <p className="text-primary-container text-xs sm:text-sm font-bold uppercase tracking-widest mb-2 sm:mb-3">
              Specialist support
            </p>
            <p className="font-headline text-2xl sm:text-3xl font-bold text-on-background mb-2 sm:mb-3">
              Specialist Vehicle & Workshop Services
            </p>
            <p className="text-secondary leading-relaxed">
              A&E, PTS, air conditioning, and VOSA compliance  -  expertise for niche commercial
              fleets across London and Essex.
            </p>
          </div>
          <Link
            href="/service"
            className="inline-flex items-center justify-center border-2 border-outline text-on-background px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-surface-container transition-all self-start shrink-0 min-h-11"
          >
            All services
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {homeSpecialistSections.map((section, index) => (
            <article
              key={section.title}
              className="p-5 sm:p-6 border border-outline-variant rounded-xl flex gap-4 hover:shadow-industrial transition-all group bg-white"
            >
              <span
                className="material-symbols-outlined text-3xl sm:text-4xl text-primary-container group-hover:scale-110 transition-transform shrink-0"
                aria-hidden
              >
                {homeSpecialistIcons[index] ?? "build"}
              </span>
              <div className="min-w-0">
                <p className="font-headline font-semibold text-base sm:text-lg mb-2 leading-snug">
                  {section.title}
                </p>
                <p className="text-sm text-secondary leading-relaxed">{section.body}</p>
                {section.bullets && (
                  <ul className="mt-3 space-y-1.5 text-sm text-secondary">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span
                          className="material-symbols-outlined text-primary-container text-sm shrink-0 mt-0.5"
                          aria-hidden
                        >
                          check
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.footer && (
                  <p className="mt-3 text-sm text-secondary leading-relaxed">{section.footer}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
