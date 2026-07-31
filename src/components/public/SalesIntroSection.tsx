import Image from "next/image";
import Link from "next/link";
import { PhoneButton } from "@/components/public/PhoneButton";
import { TrackedEmailLink } from "@/components/public/TrackedEmailLink";
import { salesIntro } from "@/content/sales";

export function SalesIntroSection({
  name,
  phone,
  email,
  photoUrl,
}: {
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  photoUrl?: string | null;
}) {
  const displayName = name ?? "George Smith";

  return (
    <section className="relative overflow-hidden bg-white border-t border-outline-variant">
      <div
        className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"
        aria-hidden
      />
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-primary-container/5 blur-3xl pointer-events-none" aria-hidden />

      <div className="relative page-container page-section lg:!py-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary-container mb-2 sm:mb-3">
                {salesIntro.eyebrow}
              </p>
              <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-background tracking-tight leading-tight">
                {salesIntro.title}
              </h1>
            </div>

            <div className="space-y-3 sm:space-y-4 text-secondary leading-relaxed">
              {salesIntro.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-sm sm:text-base lg:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="rounded-xl border border-outline-variant bg-surface-container-low p-4 sm:p-5 lg:p-6">
              <p className="font-headline text-lg font-bold text-on-background">
                {salesIntro.specialistTitle}
              </p>
              <p className="mt-2 text-sm text-secondary leading-relaxed">
                {salesIntro.specialistNote}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-outline-variant bg-white shadow-industrial overflow-hidden">
              <div className="relative aspect-[4/3] bg-surface-container">
                {photoUrl ? (
                  <Image
                    src={photoUrl}
                    alt={displayName}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 400px"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-secondary text-sm">
                    Sales contact
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-inverse-surface/90 to-transparent p-5 pt-16">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary-fixed-dim">
                    Sales specialist
                  </p>
                  <p className="font-headline text-2xl font-bold text-white">{displayName}</p>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary-container/10 px-3 py-1 text-xs font-semibold text-primary-container">
                    30+ years experience
                  </span>
                  <span className="rounded-full bg-surface-container px-3 py-1 text-xs font-semibold text-secondary">
                    London, Essex & Hertfordshire
                  </span>
                </div>

                <p className="text-sm text-secondary">
                  Isuzu truck sales — new, used and driveaway vehicles.
                </p>

                <div className="flex flex-col gap-3">
                  {phone && (
                    <PhoneButton
                      phone={phone}
                      trackingContext="sales_intro"
                      className="inline-flex items-center justify-center gap-2 bg-primary-container text-white px-4 py-3 rounded-lg font-semibold text-sm shadow-industrial hover:bg-primary transition-all w-full min-h-11"
                    />
                  )}
                  {email && (
                    <TrackedEmailLink
                      email={email}
                      trackingContext="sales_intro"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-outline-variant px-4 py-3 text-sm font-semibold hover:bg-surface-container transition-colors w-full min-h-11"
                    >
                      <span className="material-symbols-outlined text-[20px]" aria-hidden>
                        mail
                      </span>
                      Email {displayName.split(" ")[0]}
                    </TrackedEmailLink>
                  )}
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary-container hover:underline"
                >
                  Send truck requirements via contact form
                  <span className="material-symbols-outlined text-base" aria-hidden>
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
