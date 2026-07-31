import Link from "next/link";
import { ContactForm } from "@/components/public/ContactForm";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { ShareButtons } from "@/components/public/ShareButtons";
import type { ServiceDefinition } from "@/content/services";
import { absoluteUrl } from "@/lib/site";

export function ServiceDetailView({
  service,
  related,
  phone,
}: {
  service: ServiceDefinition;
  related: ServiceDefinition[];
  phone: string;
}) {
  const siteUrl = absoluteUrl(`/service/${service.slug}`);
  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <>
      <section className="page-section page-container">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-20">
          <article className="lg:col-span-7 space-y-8 lg:space-y-12">
            {service.badge && (
              <p className="text-sm font-semibold text-primary-container">{service.badge}</p>
            )}

            <div className="space-y-5">
              {service.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-base sm:text-lg text-secondary leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {service.highlights && service.highlights.length > 0 && (
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 sm:gap-y-6 border-y border-outline-variant py-6 sm:py-8">
                {service.highlights.map((item) => (
                  <div key={item.label}>
                    <dt className="text-sm text-secondary">{item.label}</dt>
                    <dd className="mt-1 font-headline text-xl sm:text-2xl font-bold text-on-background">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {service.bullets && service.bullets.length > 0 && (
              <div>
                <h2 className="font-headline text-xl sm:text-2xl font-bold mb-4 sm:mb-5">At a glance</h2>
                <ul className="space-y-3">
                  {service.bullets.map((item) => (
                    <li key={item} className="flex gap-3 text-secondary leading-relaxed">
                      <span
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-container"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.sections?.map((section) => (
              <div key={section.title}>
                <h2 className="font-headline text-xl sm:text-2xl font-bold mb-3">{section.title}</h2>
                {section.intro && (
                  <p className="text-secondary leading-relaxed mb-5">{section.intro}</p>
                )}
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 text-secondary leading-relaxed">
                      <span
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-container"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {service.faqs && service.faqs.length > 0 && (
              <div>
                <h2 className="font-headline text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
                  Frequently asked questions
                </h2>
                <FAQAccordion items={service.faqs} />
              </div>
            )}

            <ShareButtons url={siteUrl} title={service.title} />
          </article>

          <aside
            id="service-enquiry"
            className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start space-y-8"
          >
            <div className="border border-outline-variant rounded-xl p-5 sm:p-6 lg:p-7 bg-white">
              <h2 className="font-headline text-xl font-bold mb-2">Book this service</h2>
              <p className="text-sm text-secondary mb-5 leading-relaxed">
                Castle Works, Barking  -  Mon–Fri 07:00–17:00 · Sat 07:00–12:00
              </p>
              <a
                href={phoneHref}
                className="inline-flex items-center gap-2 font-headline text-xl font-bold text-primary-container hover:underline mb-6"
              >
                <span className="material-symbols-outlined">call</span>
                {phone}
              </a>
              <ContactForm
                sourcePage={`/service/${service.slug}`}
                defaultType={service.enquiryType}
                defaultSubject={service.title}
                showTypeSelect={false}
                title="Send an enquiry"
              />
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="page-section border-t border-outline-variant">
          <div className="page-container">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6 sm:mb-8">
              <h2 className="font-headline text-xl sm:text-2xl font-bold">Related services</h2>
              <Link
                href="/service"
                className="text-sm font-semibold text-primary-container hover:underline"
              >
                All services
              </Link>
            </div>
            <ul className="grid gap-8 sm:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/service/${item.slug}`} className="group block">
                    <h3 className="font-headline font-semibold text-lg group-hover:text-primary-container transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-secondary leading-relaxed">
                      {item.shortDescription}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
