import Link from "next/link";
import { SPECIALIST_SERVICES } from "@/content/home-dealer";

export function SpecialistServicesGrid() {
  const featured = SPECIALIST_SERVICES.filter((s) => s.featured);
  const standard = SPECIALIST_SERVICES.filter((s) => !s.featured);

  return (
    <section className="page-section bg-white">
      <div className="page-container">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10 lg:mb-12">
          <div>
            <p className="text-primary-container text-sm font-bold uppercase tracking-widest mb-3">
              Specialist support
            </p>
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-on-background mb-3">
              Specialist Vehicle & Workshop Services
            </h2>
            <p className="text-secondary max-w-xl leading-relaxed">
              Compliance, emergency fleets, and advanced workshop capabilities - we help keep your
              fleet roadworthy and ready for service.
            </p>
          </div>
          <Link
            href="/service"
            className="inline-flex border-2 border-outline text-on-background px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-surface-container transition-all self-start shrink-0"
          >
            All services
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 mb-5 lg:mb-6">
          {featured.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group relative rounded-2xl border border-outline-variant bg-surface-container-low p-6 lg:p-8 hover:border-primary-container/50 hover:shadow-industrial transition-all overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 w-full h-1 bg-primary-container scale-x-[0.2] group-hover:scale-x-100 origin-left transition-transform duration-500"
                aria-hidden
              />
              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-xl bg-primary-container text-white flex items-center justify-center shrink-0 shadow-industrial group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-headline font-bold text-lg lg:text-xl text-on-background mb-2 group-hover:text-primary-container transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed mb-4">{service.summary}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-container">
                    Learn more
                    <span className="material-symbols-outlined text-base group-hover:translate-x-0.5 transition-transform">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {standard.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group rounded-xl border border-outline-variant bg-white p-5 hover:border-primary-container/40 hover:shadow-industrial transition-all flex flex-col"
            >
              <span className="material-symbols-outlined text-3xl text-primary-container mb-3 group-hover:scale-110 transition-transform">
                {service.icon}
              </span>
              <h4 className="font-semibold text-on-background mb-2 text-sm leading-snug">
                {service.title}
              </h4>
              <p className="text-xs text-secondary leading-relaxed flex-1">{service.summary}</p>
              <span className="mt-4 text-xs font-semibold text-primary-container inline-flex items-center gap-1">
                View
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
