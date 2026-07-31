import type { Metadata } from "next";
import Link from "next/link";
import { getAllSettings } from "@/lib/db/settings";
import { buildPageMetadata } from "@/lib/metadata";
import { HeroSection } from "@/components/public/HeroSection";
import { BreadcrumbsBar } from "@/components/layout/BreadcrumbsBar";
import { ContactForm } from "@/components/public/ContactForm";
import { CTABanner } from "@/components/public/CTABanner";
import {
  getAllServices,
  SERVICE_INDEX_PARAGRAPHS,
} from "@/content/services";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("service");
}

export default async function ServiceIndexPage() {
  const [settings, services] = await Promise.all([getAllSettings(), getAllServices()]);
  const phone = settings.company_phone ?? "020 8595 4400";
  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <>
      <BreadcrumbsBar items={[{ label: "Home", href: "/" }, { label: "Service & Parts" }]} />

      <HeroSection
        eyebrow="Authorised Isuzu Dealer · Barking"
        title="Service & Parts"
        titleTag="p"
        subtitle="Castle Works, 721 Ripple Road, Barking IG11 0SN"
        tagline="THE ONE-STOP REPAIR SHOP"
        minHeight="min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]"
        ctas={[
          { label: phone, href: phoneHref, variant: "primary" },
          { label: "Workshop enquiry", href: "#workshop-enquiry", variant: "secondary" },
        ]}
      />

      <section className="page-section page-container">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
              DT Trucks: Barking
            </h2>
            {SERVICE_INDEX_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-base sm:text-lg text-secondary leading-relaxed">
                {paragraph}
              </p>
            ))}
            <p className="text-secondary leading-relaxed">
              Have a look at our{" "}
              <Link href="/about" className="font-semibold text-primary-container hover:underline">
                company history
              </Link>{" "}
              to learn more about how we were founded.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="font-headline text-lg font-bold mb-3">Workshop location</h3>
              <address className="not-italic text-secondary space-y-2 text-sm leading-relaxed">
                <p className="font-semibold text-on-surface">
                  {settings.company_name ?? "DT Trucks Limited"}
                </p>
                <p>
                  {settings.company_address ??
                    "Castle Works, 721 Ripple Road, Barking, Essex IG11 0SN"}
                </p>
                <p>Mon-Fri 07:00-17:00 · Sat 07:00-12:00</p>
                <p>
                  <a
                    href={phoneHref}
                    className="font-semibold text-primary-container hover:underline"
                  >
                    {phone}
                  </a>
                </p>
              </address>
              <Link
                href="/contact"
                className="mt-4 inline-flex text-sm font-semibold text-primary-container hover:underline"
              >
                Directions & contact
              </Link>
            </div>

            <dl className="grid grid-cols-2 gap-6 border-t border-outline-variant pt-8">
              <div>
                <dt className="text-sm text-secondary">Service bays</dt>
                <dd className="mt-1 font-headline text-2xl font-bold">10</dd>
              </div>
              <div>
                <dt className="text-sm text-secondary">Employees</dt>
                <dd className="mt-1 font-headline text-2xl font-bold">30</dd>
              </div>
              <div>
                <dt className="text-sm text-secondary">Master technicians</dt>
                <dd className="mt-1 font-headline text-2xl font-bold">4</dd>
              </div>
              <div>
                <dt className="text-sm text-secondary">Tachograph techs</dt>
                <dd className="mt-1 font-headline text-2xl font-bold">5</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="page-section border-y border-outline-variant bg-surface-container-low">
        <div className="page-container">
              <h2 className="font-headline text-xl sm:text-2xl lg:text-3xl font-bold mb-3">Isuzu Barking Services</h2>
          <p className="text-secondary max-w-2xl mb-10 leading-relaxed">
            From routine workshop servicing and tachograph calibrations to 24/7 roadside cover and
            specialist vehicle support - all from one authorised Isuzu dealership.
          </p>

          <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-0">
            {services.map((service) => (
              <li key={service.slug} className="border-t border-outline-variant">
                <Link
                  href={`/service/${service.slug}`}
                  className="group flex gap-4 py-6 hover:opacity-90 transition-opacity"
                >
                  <span
                    className="material-symbols-outlined text-primary-container text-2xl shrink-0 mt-0.5"
                    aria-hidden
                  >
                    {service.icon}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-headline font-semibold text-lg group-hover:text-primary-container transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-secondary leading-relaxed">
                      {service.shortDescription}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-container">
                      View details
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page-section page-container">
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          <div>
            <h3 className="font-headline font-bold text-lg mb-2">Genuine Isuzu parts</h3>
            <p className="text-sm text-secondary leading-relaxed">
              Authorised main dealer stock with a strong first-time pick rate and Isuzu Care
              2-year warranty on genuine parts.
            </p>
          </div>
          <div>
            <h3 className="font-headline font-bold text-lg mb-2">Any make welcome</h3>
            <p className="text-sm text-secondary leading-relaxed">
              We specialise in Isuzu but service and repair commercial vehicles of any make - from car-derived vans to 18m 44-tonne.
            </p>
          </div>
          <div>
            <h3 className="font-headline font-bold text-lg mb-2">Fleet packages</h3>
            <p className="text-sm text-secondary leading-relaxed">
              Tailor-made support whether you run one van or hundreds of LGVs - inspections,
              servicing, calibrations and breakdown cover.
            </p>
          </div>
        </div>
      </section>

      <section
        id="workshop-enquiry"
        className="page-section border-t border-outline-variant bg-surface-container-low"
      >
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div>
              <h2 className="font-headline text-2xl lg:text-3xl font-bold mb-4">
                Contact Barking workshop
              </h2>
              <p className="text-secondary leading-relaxed mb-4">
                Book servicing, tachograph calibrations, roller brake testing or discuss fleet
                support with our workshop team.
              </p>
              <p className="text-secondary leading-relaxed mb-6">
                Call{" "}
                <a
                  href={phoneHref}
                  className="font-semibold text-primary-container hover:underline"
                >
                  {phone}
                </a>{" "}
                or send an enquiry - we respond on business days.
              </p>
              <ul className="space-y-2 text-sm text-secondary">
                <li>Mon-Fri 07:00-17:00 · Sat 07:00-12:00</li>
                <li>Castle Works, 721 Ripple Road, Barking IG11 0SN</li>
              </ul>
            </div>
            <div className="bg-white border border-outline-variant rounded-xl p-5 sm:p-6 lg:p-8">
              <ContactForm sourcePage="/service" defaultType="service" title="Workshop enquiry" />
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Need tachograph calibration?"
        description="DVSA-approved smart, digital and analogue calibration at our Barking workshop."
        buttonLabel="Tachograph services"
        buttonHref="/service/tachograph-calibrations"
        variant="dark"
      />
    </>
  );
}
