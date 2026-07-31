import Link from "next/link";
import { ContactForm } from "@/components/public/ContactForm";
import { PhoneButton } from "@/components/public/PhoneButton";
import { WhatsAppButton } from "@/components/public/WhatsAppButton";

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

export function CompanyTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <section className="page-section bg-surface-container-low border-y border-outline-variant">
      <div className="page-container">
        <h2 className="font-headline text-2xl lg:text-3xl font-bold mb-10 text-center">
          How we were founded
        </h2>
        <ol className="relative max-w-3xl mx-auto">
          {items.map((item, index) => (
            <li key={item.year} className="relative pl-10 pb-10 last:pb-0">
              {index < items.length - 1 && (
                <span
                  className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-outline-variant"
                  aria-hidden
                />
              )}
              <span
                className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary-container text-white text-xs font-bold"
                aria-hidden
              >
                {item.year.slice(2)}
              </span>
              <div className="rounded-xl border border-outline-variant bg-white p-5 shadow-industrial">
                <p className="text-xs font-bold uppercase tracking-wide text-primary-container">
                  {item.year}
                </p>
                <h3 className="mt-1 font-headline text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-secondary leading-relaxed">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function HomeIntroSection({
  title,
  body,
  highlights,
  image,
  imageAlt,
  statBadge,
}: {
  title: string;
  body: string;
  highlights: { icon: string; title: string; description: string }[];
  image: string;
  imageAlt: string;
  statBadge?: { value: string; label: string };
}) {
  return (
    <section className="page-section bg-surface">
      <div className="page-container grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div>
          <p className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-on-background mb-4 sm:mb-5 tracking-tight">
            {title}
          </p>
          <p className="text-secondary leading-relaxed mb-8">{body}</p>
          <div className="space-y-4">
            {highlights.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="mt-0.5 bg-primary-container/10 p-1.5 rounded-full">
                  <span className="material-symbols-outlined text-primary-container text-xl">
                    {item.icon}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-on-background">{item.title}</p>
                  <p className="text-sm text-secondary">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative group">
          <div className="absolute -inset-3 bg-primary-container/5 rounded-xl -rotate-1" />
          <div className="relative h-[380px] lg:h-[450px] rounded-xl overflow-hidden shadow-industrial border border-outline-variant">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${image}')` }}
              role="img"
              aria-label={imageAlt}
            />
          </div>
          {statBadge && (
            <div className="absolute -bottom-5 -left-4 md:-bottom-6 md:-left-6 bg-white p-5 rounded-lg shadow-industrial border border-outline-variant">
              <p className="text-primary-container font-headline text-3xl font-extrabold leading-none">
                {statBadge.value}
              </p>
              <p className="text-secondary text-xs font-semibold uppercase tracking-wide mt-1">
                {statBadge.label}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function HomeContactSection({
  phone,
  salesPhone,
  salesName,
  salesEmail,
  companyAddress,
  what3words,
}: {
  phone: string;
  salesPhone: string;
  salesName: string;
  salesEmail?: string | null;
  companyAddress?: string | null;
  what3words?: string | null;
}) {
  return (
    <section id="contact" className="page-section bg-inverse-surface text-white">
      <div className="page-container grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div>
          <p className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5">
            Contact Us Today
          </p>
          <p className="text-inverse-on-surface/80 text-base sm:text-lg mb-8 sm:mb-10">
            Service, parts, sales  -  speak directly with our experienced team in Barking.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-primary-container rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">phone_in_talk</span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide opacity-70 font-semibold">Service & Parts</p>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="font-headline text-xl sm:text-2xl font-bold hover:text-primary-fixed-dim transition-colors"
                >
                  {phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-primary-container rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">person</span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide opacity-70 font-semibold">
                  Sales  -  {salesName}
                </p>
                <a
                  href={`tel:${salesPhone.replace(/\s/g, "")}`}
                  className="font-headline text-xl sm:text-2xl font-bold hover:text-primary-fixed-dim transition-colors"
                >
                  {salesPhone}
                </a>
                {salesEmail && (
                  <a
                    href={`mailto:${salesEmail}`}
                    className="text-sm text-primary-fixed-dim hover:underline block mt-1"
                  >
                    {salesEmail}
                  </a>
                )}
              </div>
            </div>
            {companyAddress && (
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-primary-container rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">location_on</span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide opacity-70 font-semibold">Address</p>
                  <p className="text-sm leading-relaxed mt-1 whitespace-pre-line">{companyAddress}</p>
                  {what3words && (
                    <p className="text-xs opacity-60 mt-2">What3Words: ///{what3words}</p>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
            <PhoneButton phone={phone} />
            <WhatsAppButton phone={salesPhone} message="Hello DT Trucks, I'd like to enquire about..." />
          </div>
        </div>
        <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-xl text-on-background shadow-industrial">
          <ContactForm sourcePage="/" title="Send a message" />
        </div>
      </div>
    </section>
  );
}

export function HomeTeamPreview({
  team,
}: {
  team: { id: string; name: string; role: string }[];
}) {
  if (team.length === 0) return null;

  return (
    <section className="page-section bg-surface border-t border-outline-variant">
      <div className="page-container">
        <h2 className="font-headline text-2xl font-bold mb-8 text-center">Meet the team</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.slice(0, 3).map((member) => (
            <li
              key={member.id}
              className="rounded-xl border border-outline-variant bg-white p-5 shadow-industrial text-center"
            >
              <h3 className="font-headline font-semibold">{member.name}</h3>
              <p className="text-sm text-primary-container font-medium">{member.role}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-center">
          <Link href="/about" className="text-sm font-semibold text-primary-container hover:underline">
            View full team
          </Link>
        </div>
      </div>
    </section>
  );
}
