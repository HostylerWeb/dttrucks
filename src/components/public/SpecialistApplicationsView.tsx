import Image from "next/image";
import Link from "next/link";
import { BreadcrumbsBar } from "@/components/layout/BreadcrumbsBar";
import { ContactForm } from "@/components/public/ContactForm";
import { CTABanner } from "@/components/public/CTABanner";
import { HeroSection } from "@/components/public/HeroSection";
import { ShareButtons } from "@/components/public/ShareButtons";
import {
  SPECIALIST_CLOSING,
  SPECIALIST_GALLERY,
  SPECIALIST_HERO,
  SPECIALIST_INTRO_PARAGRAPHS,
  SPECIALIST_INTRO_TITLE,
  SPECIALIST_SECTIONS,
} from "@/content/specialist-applications";
import { absoluteUrl } from "@/lib/site";

export function SpecialistApplicationsView({
  phone,
  companyName,
  companyAddress,
}: {
  phone: string;
  companyName: string;
  companyAddress: string;
}) {
  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;
  const shareUrl = absoluteUrl("/specialist-applications");
  const featuredGallery = SPECIALIST_GALLERY.filter((item) => item.featured);
  const galleryRest = SPECIALIST_GALLERY.filter((item) => !item.featured);

  return (
    <>
      <BreadcrumbsBar items={[{ label: "Home", href: "/" }, { label: "Specialist Applications" }]} />

      <HeroSection
        backgroundImage={SPECIALIST_HERO.image}
        imageAlt={SPECIALIST_HERO.alt}
        eyebrow="Nationwide specialist support"
        title="Specialist Applications"
        subtitle="Specialised maintenance and repair for Isuzu Trucks and niche equipment"
        minHeight="min-h-[280px] sm:min-h-[340px] lg:min-h-[400px]"
        ctas={[
          { label: phone, href: phoneHref, variant: "primary" },
          { label: "Send enquiry", href: "#specialist-enquiry", variant: "secondary" },
        ]}
      />

      <section className="page-section page-container">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-20 items-start">
          <article className="lg:col-span-7 space-y-8 lg:space-y-12">
            <div className="space-y-4 sm:space-y-5">
              <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
                Specialist Applications
              </h2>
              <p className="font-headline text-lg sm:text-xl font-semibold text-on-surface">
                {SPECIALIST_INTRO_TITLE}
              </p>
              {SPECIALIST_INTRO_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-base sm:text-lg text-secondary leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {SPECIALIST_SECTIONS.map((section) => (
              <div key={section.title} className="space-y-5">
                <h3 className="font-headline text-xl sm:text-2xl font-bold">{section.title}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="text-secondary leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                {section.items && section.items.length > 0 && (
                  <ul className="space-y-3 pt-1">
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
                )}
              </div>
            ))}

            <p className="text-secondary leading-relaxed border-t border-outline-variant pt-8">
              {SPECIALIST_CLOSING}
            </p>

            <ShareButtons url={shareUrl} title="Specialist Applications" />
          </article>

          <aside
            id="specialist-enquiry"
            className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start space-y-8"
          >
            <div className="relative overflow-hidden rounded-xl border border-outline-variant bg-white shadow-industrial">
              <div className="relative aspect-[4/3]">
                <Image
                  src={SPECIALIST_HERO.image}
                  alt={SPECIALIST_HERO.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>
              <div className="p-5 sm:p-6 lg:p-7">
                <h2 className="font-headline text-xl font-bold mb-2">Specialist enquiry</h2>
                <p className="text-sm text-secondary mb-5 leading-relaxed">
                  UXO rigs, aviation ground equipment, plant and niche commercial vehicles  -  tell us
                  about your equipment.
                </p>
                <a
                  href={phoneHref}
                  className="inline-flex items-center gap-2 font-headline text-xl font-bold text-primary-container hover:underline mb-6"
                >
                  <span className="material-symbols-outlined">call</span>
                  {phone}
                </a>
                <ContactForm
                  sourcePage="/specialist-applications"
                  defaultType="specialist"
                  defaultSubject="Specialist Applications enquiry"
                  showTypeSelect={false}
                  title="Send an enquiry"
                />
              </div>
            </div>

            <div className="rounded-xl border border-outline-variant bg-surface-container-low p-5 sm:p-6 lg:p-7">
              <h3 className="font-headline font-bold text-lg mb-3">Workshop location</h3>
              <address className="not-italic text-sm text-secondary space-y-2 leading-relaxed">
                <p className="font-semibold text-on-surface">{companyName}</p>
                <p>{companyAddress}</p>
                <p>Mon–Fri 07:00–17:00 · Sat 07:00–12:00</p>
              </address>
              <Link
                href="/service/specialist-vehicles"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-container hover:underline"
              >
                Specialist vehicles service
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="page-section border-y border-outline-variant bg-surface-container-low">
        <div className="page-container">
          <div className="max-w-2xl mb-8 sm:mb-10">
            <h2 className="font-headline text-2xl sm:text-3xl font-bold mb-3">Equipment in the field</h2>
            <p className="text-secondary leading-relaxed">
              From aviation ground winches to UXO survey and disposal rigs  -  our team maintains
              specialist equipment that demands precision, safety and reliability.
            </p>
          </div>

          <div className="grid gap-4 lg:gap-5 lg:grid-cols-12">
            {featuredGallery.map((image) => (
              <figure
                key={image.src}
                className="relative overflow-hidden rounded-xl border border-outline-variant bg-white shadow-industrial lg:col-span-7 lg:row-span-2"
              >
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[420px]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                </div>
                <figcaption className="px-4 py-3 text-sm text-secondary border-t border-outline-variant bg-white">
                  {image.alt}
                </figcaption>
              </figure>
            ))}

            <div className="grid gap-4 lg:gap-5 grid-cols-1 sm:grid-cols-2 lg:col-span-5">
              {galleryRest.map((image) => (
                <figure
                  key={image.src}
                  className="overflow-hidden rounded-xl border border-outline-variant bg-white shadow-industrial"
                >
                  <div
                    className={`relative ${image.portrait ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <figcaption className="px-3 py-2.5 text-xs text-secondary border-t border-outline-variant">
                    {image.alt}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Need workshop support?"
        description="Our Barking workshop services commercial fleets across London and Essex."
        buttonLabel="Service & Parts"
        buttonHref="/service"
        variant="dark"
      />
    </>
  );
}
