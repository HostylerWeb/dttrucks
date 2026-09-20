import { DEALER_HEADING, DEALER_INSIGHTS, DEALER_STATS } from "@/content/home-dealer";

export function DealerStats() {
  return (
    <section className="page-section bg-white border-y border-outline-variant overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(200,16,46,0.06),_transparent_55%)]" />
      <div className="absolute top-0 right-0 opacity-[0.04] pointer-events-none translate-x-1/4 text-primary-container" aria-hidden>
        <svg className="w-[280px] lg:w-[400px] h-auto" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h4.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        </svg>
      </div>

      <div className="page-container relative z-10">
        <div className="text-center mb-8 sm:mb-12 lg:mb-14">
          <p className="text-primary-container text-xs sm:text-sm font-bold uppercase tracking-widest mb-2 sm:mb-3">
            Why DT Trucks
          </p>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-on-background mb-4 max-w-3xl mx-auto leading-tight">
            {DEALER_HEADING}
          </h2>
          <div className="h-1 w-20 bg-primary-container mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-14 lg:mb-16">
          {DEALER_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-outline-variant bg-surface-container-low p-4 sm:p-5 lg:p-6 text-center hover:border-primary-container/25 transition-colors shadow-industrial"
            >
              <p className="text-primary-container font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-1">
                {stat.value}
              </p>
              <p className="text-secondary text-[11px] sm:text-xs lg:text-sm font-medium leading-snug uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {DEALER_INSIGHTS.map((insight) => (
            <article
              key={insight.title}
              className="group rounded-2xl border border-outline-variant bg-white p-6 lg:p-7 hover:border-primary-container/30 transition-all duration-300 shadow-industrial"
            >
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center shrink-0 shadow-industrial group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-white text-2xl">{insight.icon}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-headline font-bold text-lg text-on-background mb-2">{insight.title}</p>
                  <p className="text-secondary text-sm leading-relaxed mb-4">
                    {insight.summary}
                  </p>
                  <ul className="space-y-2">
                    {insight.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-sm text-secondary"
                      >
                        <span
                          className="material-symbols-outlined text-primary-container text-base shrink-0"
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
