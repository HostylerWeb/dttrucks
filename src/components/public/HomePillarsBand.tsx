import Link from "next/link";
import { homeDealerSection, homePillarConfig } from "@/content/home";
import { cn } from "@/lib/utils";

export function HomePillarsBand() {
  return (
    <section className="page-section bg-surface-container-low">
      <div className="page-container">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto">
          <h2 className="font-headline text-2xl sm:text-3xl font-bold text-on-background">
            Parts, Sales & Workshop
          </h2>
          <p className="text-secondary mt-3 leading-relaxed">
            Your complete commercial vehicle partner at one authorised Isuzu dealership in London
            & Essex.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 rounded-2xl overflow-hidden shadow-industrial border border-outline-variant">
          {homeDealerSection.pillars.map((pillar, index) => {
            const config = homePillarConfig[index];
            if (!config) return null;
            const isMiddle = index === 1;

            return (
              <div
                key={pillar.title}
                className={cn(
                  "p-6 sm:p-8 lg:p-10 flex flex-col items-center text-center border-outline-variant",
                  isMiddle ? "bg-surface-container-highest" : "bg-white",
                  index < homeDealerSection.pillars.length - 1 && "border-b lg:border-b-0 lg:border-r"
                )}
              >
                <span
                  className="material-symbols-outlined text-4xl sm:text-5xl text-primary-container mb-4 sm:mb-5"
                  aria-hidden
                >
                  {config.icon}
                </span>
                {config.badge && (
                  <span className="text-xs font-bold uppercase tracking-wide text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-3 sm:mb-4">
                    {config.badge}
                  </span>
                )}
                <h3 className="font-headline text-lg sm:text-xl font-bold mb-3">{pillar.title}</h3>
                <p className="text-secondary text-sm leading-relaxed mb-4 flex-1">{pillar.body}</p>
                {pillar.note && (
                  <p className="text-sm font-semibold text-primary-container mb-4 leading-relaxed">
                    {pillar.note}
                  </p>
                )}
                <Link
                  href={config.href}
                  prefetch={false}
                  className="w-full py-3 rounded-lg font-semibold text-sm transition-colors text-center min-h-11 flex items-center justify-center bg-primary-container text-white hover:bg-primary"
                >
                  {config.ctaLabel}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
