import { DEALER_HEADING, DEALER_INSIGHTS, DEALER_STATS } from "@/content/home-dealer";

export function DealerStats() {
  return (
    <section className="page-section bg-inverse-surface overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(200,16,46,0.15),_transparent_55%)]" />
      <div className="absolute top-0 right-0 opacity-[0.05] pointer-events-none translate-x-1/4">
        <span className="material-symbols-outlined text-[280px] lg:text-[400px] text-white">
          local_shipping
        </span>
      </div>

      <div className="page-container relative z-10">
        <div className="text-center mb-8 sm:mb-12 lg:mb-14">
          <p className="text-primary-fixed-dim text-xs sm:text-sm font-bold uppercase tracking-widest mb-2 sm:mb-3">
            Why DT Trucks
          </p>
          <p className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 max-w-3xl mx-auto leading-tight">
            {DEALER_HEADING}
          </p>
          <div className="h-1 w-20 bg-primary-container mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-14 lg:mb-16">
          {DEALER_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 sm:p-5 lg:p-6 text-center hover:bg-white/10 transition-colors"
            >
              <p className="text-primary-fixed-dim font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-1">
                {stat.value}
              </p>
              <p className="text-inverse-on-surface/75 text-[11px] sm:text-xs lg:text-sm font-medium leading-snug uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {DEALER_INSIGHTS.map((insight) => (
            <article
              key={insight.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 lg:p-7 hover:border-primary-container/40 hover:bg-white/[0.07] transition-all duration-300"
            >
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center shrink-0 shadow-industrial group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-white text-2xl">{insight.icon}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-headline font-bold text-lg text-white mb-2">{insight.title}</p>
                  <p className="text-inverse-on-surface/80 text-sm leading-relaxed mb-4">
                    {insight.summary}
                  </p>
                  <ul className="space-y-2">
                    {insight.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-sm text-inverse-on-surface/70"
                      >
                        <span
                          className="material-symbols-outlined text-primary-fixed-dim text-base shrink-0"
                          aria-hidden
                        >
                          check_circle
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
