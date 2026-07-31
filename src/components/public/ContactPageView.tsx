import Link from "next/link";
import { BreadcrumbsBar } from "@/components/layout/BreadcrumbsBar";
import { ContactActionButtons } from "@/components/public/ContactInfoCards";
import { ContactForm } from "@/components/public/ContactForm";
import { CTABanner } from "@/components/public/CTABanner";
import { HeroSection } from "@/components/public/HeroSection";
import { MapEmbed } from "@/components/public/MapEmbed";
import { TrackedEmailLink } from "@/components/public/TrackedEmailLink";
import {
  CONTACT_DEPARTMENTS,
  CONTACT_INTRO,
  CONTACT_RESPONSE_NOTE,
} from "@/content/contact";
import type { OpeningHoursRow } from "@/lib/format-opening-hours";

export function ContactPageView({
  companyName,
  phone,
  salesPhone,
  salesContactName,
  email,
  address,
  what3words,
  mapsEmbedUrl,
  openingHours,
}: {
  companyName: string;
  phone: string;
  salesPhone?: string | null;
  salesContactName?: string | null;
  email?: string | null;
  address?: string | null;
  what3words?: string | null;
  mapsEmbedUrl?: string | null;
  openingHours: OpeningHoursRow[];
}) {
  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;
  const salesPhoneHref = salesPhone ? `tel:${salesPhone.replace(/\s/g, "")}` : phoneHref;
  const what3wordsUrl = what3words
    ? `https://what3words.com/${what3words.replace(/^\/\/\//, "").toLowerCase()}`
    : null;

  return (
    <>
      <BreadcrumbsBar items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <HeroSection
        eyebrow="Castle Works, Barking"
        title="Get In Touch"
        subtitle="Your issue is ours!"
        subtitleTag="h2"
        minHeight="min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]"
        ctas={[
          { label: phone, href: phoneHref, variant: "primary" },
          { label: "Send a message", href: "#contact-form", variant: "secondary" },
        ]}
      />

      <section className="page-section page-container">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-20 items-start">
          <div className="lg:col-span-7 space-y-8 sm:space-y-10">
            <div className="space-y-4 sm:space-y-5">
              {CONTACT_INTRO.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-base sm:text-lg text-secondary leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <p className="text-secondary leading-relaxed">{CONTACT_RESPONSE_NOTE}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href={phoneHref}
                className="rounded-xl border border-outline-variant bg-white p-5 shadow-industrial hover:border-primary-container/30 transition-colors"
              >
                <span className="material-symbols-outlined text-primary-container text-2xl">call</span>
                <p className="mt-3 font-headline font-semibold text-sm">Phone</p>
                <p className="mt-1 text-sm font-semibold text-primary-container">{phone}</p>
              </a>
              {email && (
                <div className="rounded-xl border border-outline-variant bg-white p-5 shadow-industrial">
                  <span className="material-symbols-outlined text-primary-container text-2xl">mail</span>
                  <p className="mt-3 font-headline font-semibold text-sm">Email</p>
                  <TrackedEmailLink
                    email={email}
                    trackingContext="contact_page"
                    className="mt-1 text-sm font-semibold text-primary-container hover:underline block"
                  >
                    {email}
                  </TrackedEmailLink>
                </div>
              )}
              {address && (
                <div className="rounded-xl border border-outline-variant bg-white p-5 shadow-industrial">
                  <span className="material-symbols-outlined text-primary-container text-2xl">
                    location_on
                  </span>
                  <p className="mt-3 font-headline font-semibold text-sm">Address</p>
                  <p className="mt-1 text-sm text-secondary leading-relaxed">{address}</p>
                </div>
              )}
            </div>

            <div>
              <h2 className="font-headline text-xl sm:text-2xl font-bold mb-4 sm:mb-6">How can we help?</h2>
              <ul className="space-y-4">
                {CONTACT_DEPARTMENTS.map((dept) => (
                  <li
                    key={dept.id}
                    className="flex gap-4 rounded-xl border border-outline-variant bg-white p-5 shadow-industrial"
                  >
                    <span
                      className="material-symbols-outlined text-primary-container text-2xl shrink-0 mt-0.5"
                      aria-hidden
                    >
                      {dept.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="font-headline font-semibold">{dept.label}</h3>
                        <a
                          href={dept.id === "sales" && salesPhone ? salesPhoneHref : phoneHref}
                          className="text-sm font-semibold text-primary-container hover:underline"
                        >
                          {dept.id === "sales" && salesPhone ? salesPhone : phone}
                        </a>
                      </div>
                      {dept.id === "sales" && salesContactName && (
                        <p className="mt-1 text-sm text-secondary">{salesContactName}</p>
                      )}
                      <p className="mt-2 text-sm text-secondary leading-relaxed">{dept.description}</p>
                      <Link
                        href={dept.href}
                        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-container hover:underline"
                      >
                        Learn more
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <ContactActionButtons phone={phone} salesPhone={salesPhone} />
          </div>

          <aside id="contact-form" className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-outline-variant bg-white p-5 sm:p-6 lg:p-8 shadow-industrial">
              <ContactForm sourcePage="/contact" defaultType="general" title="Contact Form" />
            </div>
          </aside>
        </div>
      </section>

      <section className="page-section border-y border-outline-variant bg-surface-container-low">
        <div className="page-container">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <div className="lg:col-span-4">
              <h2 className="font-headline text-xl sm:text-2xl font-bold mb-2">Visit us</h2>
              <p className="text-secondary text-sm leading-relaxed mb-6">
                {companyName} — authorised Isuzu dealer for London and Essex.
              </p>

              <address className="not-italic text-secondary space-y-3 text-sm leading-relaxed mb-6">
                {address && <p className="font-medium text-on-surface">{address}</p>}
                {what3words && what3wordsUrl && (
                  <p>
                    What3Words:{" "}
                    <a
                      href={what3wordsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-primary-container hover:underline"
                    >
                      ///{what3words}
                    </a>
                  </p>
                )}
                <p>
                  <a href={phoneHref} className="font-semibold text-primary-container hover:underline">
                    {phone}
                  </a>
                </p>
                {email && (
                  <p>
                    <TrackedEmailLink
                      email={email}
                      trackingContext="contact_visit"
                      className="font-semibold text-primary-container hover:underline"
                    >
                      {email}
                    </TrackedEmailLink>
                  </p>
                )}
              </address>

              <h3 className="font-headline font-bold text-lg mb-4">Opening hours</h3>
              <ul className="rounded-xl border border-outline-variant bg-white divide-y divide-outline-variant shadow-industrial">
                {openingHours.map((row) => (
                  <li key={row.day} className="flex justify-between gap-4 px-4 py-3 text-sm">
                    <span className="font-medium text-on-surface">{row.day}</span>
                    <span className="text-secondary text-right">{row.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-8">
              <h3 className="font-headline font-bold text-lg mb-4">DT Trucks Location</h3>
              <MapEmbed
                embedUrl={mapsEmbedUrl}
                address={address}
                title="DT Trucks location map"
                className="aspect-[4/3] lg:aspect-auto lg:min-h-[420px] rounded-xl overflow-hidden border border-outline-variant shadow-industrial"
              />
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Looking for truck sales or fleet support?"
        description="Browse our Isuzu range or speak to our workshop team in Barking."
        buttonLabel="Isuzu Truck Sales"
        buttonHref="/sales"
        variant="dark"
      />
    </>
  );
}
