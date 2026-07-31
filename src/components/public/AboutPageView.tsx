import Image from "next/image";
import Link from "next/link";
import { BreadcrumbsBar } from "@/components/layout/BreadcrumbsBar";
import { HeroSection } from "@/components/public/HeroSection";
import { ShareButtons } from "@/components/public/ShareButtons";
import { CTABanner } from "@/components/public/CTABanner";
import { buttonClassName } from "@/components/ui/button";
import {
  ABOUT_FOUNDED_PARAGRAPHS,
  ABOUT_HIGHLIGHTS,
  ABOUT_IMAGES,
  ABOUT_INTRO,
  ABOUT_STATS,
  ABOUT_TEAM,
  ABOUT_TIMELINE,
  type AboutTeamMember,
} from "@/content/about";
import { absoluteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  headingLevel = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  headingLevel?: "h2" | "h3";
}) {
  const HeadingTag = headingLevel;
  return (
    <div className={align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-2xl"}>
      {eyebrow && (
        <p className="text-primary-container text-sm font-bold uppercase tracking-widest mb-3">
          {eyebrow}
        </p>
      )}
      <HeadingTag className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-on-background tracking-tight">
        {title}
      </HeadingTag>
      <div
        className={`h-1 w-16 bg-primary-container mt-4 mb-5 ${align === "center" ? "mx-auto" : ""}`}
      />
      {description && (
        <p className="text-secondary leading-relaxed text-base sm:text-lg">{description}</p>
      )}
    </div>
  );
}

function TeamMemberCard({ member, featured }: { member: AboutTeamMember; featured?: boolean }) {
  const initials = member.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article
      className={`group relative rounded-2xl border border-outline-variant bg-white shadow-industrial overflow-hidden transition-all duration-300 hover:shadow-[0_12px_32px_rgba(17,24,39,0.12)] hover:-translate-y-0.5 ${
        featured ? "p-5 sm:p-6 lg:p-9" : "p-5 sm:p-6 lg:p-7"
      }`}
    >
      <div
        className="absolute inset-x-0 top-0 h-1 bg-primary-container origin-left scale-x-[0.15] group-hover:scale-x-100 transition-transform duration-500"
        aria-hidden
      />
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
        <div
          className={`shrink-0 rounded-xl bg-gradient-to-br from-primary-container to-primary text-white font-headline font-extrabold flex items-center justify-center shadow-industrial ${
            featured ? "w-16 h-16 text-lg" : "w-14 h-14 text-base"
          }`}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <h3 className="font-headline font-bold text-lg lg:text-xl text-on-background">
            {member.name}
          </h3>
          {member.qualifications && (
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-primary-container">
              {member.qualifications}
            </p>
          )}
          <p className="mt-1 text-sm font-semibold text-secondary">{member.role}</p>
          <p className="mt-4 text-secondary leading-relaxed text-sm lg:text-[15px]">{member.bio}</p>
        </div>
      </div>
    </article>
  );
}

export function AboutPageView() {
  const shareUrl = absoluteUrl("/about");

  return (
    <>
      <BreadcrumbsBar items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />

      <HeroSection
        backgroundImage={ABOUT_IMAGES.team.src}
        imageAlt={ABOUT_IMAGES.team.alt}
        backgroundPosition="center top"
        eyebrow="About us"
        title="About us"
        subtitle="Get to know us!"
        subtitleTag="h2"
        minHeight="min-h-[280px] sm:min-h-[380px] lg:min-h-[520px]"
        ctas={[
          { label: "Meet the team", href: "#our-team", variant: "primary" },
          { label: "Our story", href: "#our-story", variant: "secondary" },
          { label: "Contact us", href: "/contact", variant: "link" },
        ]}
      />

      {/* Intro */}
      <section className="page-section bg-surface">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Who we are"
                title="Built on reliability, run by people who care"
                headingLevel="h3"
              />
              <div className="mt-8 space-y-5 text-secondary leading-relaxed">
                {ABOUT_INTRO.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-base lg:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-6 sm:mt-8 space-y-4">
                {ABOUT_HIGHLIGHTS.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-xl border border-outline-variant/80 bg-white p-4 shadow-industrial"
                  >
                    <div className="mt-0.5 bg-primary-container/10 p-2 rounded-xl shrink-0">
                      <span className="material-symbols-outlined text-primary-container text-xl">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-on-background">{item.title}</p>
                      <p className="text-sm text-secondary mt-0.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 bg-primary-container/5 rounded-2xl -rotate-1" aria-hidden />
              <div className="relative rounded-2xl overflow-hidden shadow-industrial border border-outline-variant">
                <Image
                  src={ABOUT_IMAGES.eastley.src}
                  alt={ABOUT_IMAGES.eastley.alt}
                  width={ABOUT_IMAGES.eastley.width}
                  height={ABOUT_IMAGES.eastley.height}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 left-0 sm:-bottom-6 sm:-left-6 bg-white p-4 sm:p-5 rounded-xl shadow-industrial border border-outline-variant">
                <p className="text-primary-container font-headline text-2xl sm:text-3xl font-extrabold leading-none">
                  1995
                </p>
                <p className="text-secondary text-xs font-semibold uppercase tracking-wide mt-1">
                  Established
                </p>
              </div>
              <div className="absolute -top-3 right-2 sm:-top-4 sm:-right-4 md:-top-5 md:-right-5 bg-inverse-surface text-white px-3 py-2 sm:px-4 sm:py-3 rounded-xl shadow-industrial border border-white/10 max-w-[180px] sm:max-w-[200px]">
                <p className="text-xs uppercase tracking-wide text-white/70 font-semibold">
                  London & Essex
                </p>
                <p className="font-headline font-bold text-sm mt-0.5">Isuzu dealership</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-inverse-surface py-10 sm:py-14 lg:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-[0.05] pointer-events-none translate-x-1/4">
          <span className="material-symbols-outlined text-[240px] text-white">history_edu</span>
        </div>
        <div className="page-container relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {ABOUT_STATS.map((stat) => (
              <div key={stat.label} className="text-center p-2">
                <p className="text-primary-fixed-dim font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-1">
                  {stat.value}
                </p>
                <p className="text-inverse-on-surface/75 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founded story */}
      <section
        id="our-story"
        className="page-section bg-surface-container-low border-y border-outline-variant bg-grid-pattern"
      >
        <div className="page-container">
          <SectionHeading
            eyebrow="Our heritage"
            title="How were we founded?"
            description="From Eastley Commercials in 1995 to today's DT Trucks - a partnership built on Isuzu expertise and customer care."
            headingLevel="h3"
          />

          <div className="mt-10 sm:mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <ol className="space-y-0">
                {ABOUT_TIMELINE.map((item, index) => (
                  <li key={item.year} className="relative flex gap-5 pb-8 last:pb-0">
                    {index < ABOUT_TIMELINE.length - 1 && (
                      <span
                        className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-outline-variant"
                        aria-hidden
                      />
                    )}
                    <span
                      className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-container text-white text-xs font-bold shadow-industrial"
                      aria-hidden
                    >
                      {item.year === "Today" ? "•" : item.year.slice(2)}
                    </span>
                    <div className="rounded-xl border border-outline-variant bg-white p-5 shadow-industrial flex-1 min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wide text-primary-container">
                        {item.year}
                      </p>
                      <h3 className="mt-1 font-headline font-semibold text-lg">{item.title}</h3>
                      <p className="mt-2 text-sm text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div className="rounded-2xl border border-outline-variant bg-white p-5 sm:p-8 lg:p-10 shadow-industrial text-center">
                <Image
                  src={ABOUT_IMAGES.logo.src}
                  alt={ABOUT_IMAGES.logo.alt}
                  width={ABOUT_IMAGES.logo.width}
                  height={ABOUT_IMAGES.logo.height}
                  className="h-auto w-full max-w-[320px] mx-auto"
                />
              </div>
              <div className="rounded-2xl border border-outline-variant bg-white p-5 sm:p-8 lg:p-10 shadow-industrial space-y-4 sm:space-y-5 text-secondary leading-relaxed text-sm sm:text-base">
                {ABOUT_FOUNDED_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="our-team" className="page-section bg-surface">
        <div className="page-container">
          <SectionHeading
            eyebrow="The people behind DT Trucks"
            title="Get to know a little about our team!"
            description="Leadership, workshop and office - the team that keeps London and Essex moving."
            headingLevel="h3"
          />

          {/* Editorial photo collage */}
          <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-stretch">
            <figure className="lg:col-span-7 relative group">
              <div className="absolute -inset-2 bg-primary-container/5 rounded-2xl rotate-1 transition-transform group-hover:rotate-0" />
              <div className="relative rounded-2xl overflow-hidden border border-outline-variant shadow-industrial h-full min-h-[240px] lg:min-h-[320px]">
                <Image
                  src={ABOUT_IMAGES.eastley.src}
                  alt={ABOUT_IMAGES.eastley.alt}
                  width={ABOUT_IMAGES.eastley.width}
                  height={ABOUT_IMAGES.eastley.height}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary-fixed-dim">
                    Where it began
                  </p>
                  <p className="font-headline font-bold text-lg mt-1">Eastley Commercials, 1995</p>
                </figcaption>
              </div>
            </figure>
            <figure className="lg:col-span-5 relative group">
              <div className="absolute -inset-2 bg-tertiary/10 rounded-2xl -rotate-1 transition-transform group-hover:rotate-0" />
              <div className="relative rounded-2xl overflow-hidden border border-outline-variant shadow-industrial h-full min-h-[240px] lg:min-h-[320px]">
                <Image
                  src={ABOUT_IMAGES.team.src}
                  alt={ABOUT_IMAGES.team.alt}
                  width={ABOUT_IMAGES.team.width}
                  height={ABOUT_IMAGES.team.height}
                  className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary-fixed-dim">
                    Today
                  </p>
                  <p className="font-headline font-bold text-lg mt-1">DT Trucks, Barking</p>
                </figcaption>
              </div>
            </figure>
          </div>

          {/* Leadership row */}
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {ABOUT_TEAM.slice(0, 2).map((member) => (
              <li key={member.name}>
                <TeamMemberCard member={member} featured />
              </li>
            ))}
          </ul>

          {/* Rest of team */}
          <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ABOUT_TEAM.slice(2).map((member) => (
              <li key={member.name}>
                <TeamMemberCard member={member} />
              </li>
            ))}
          </ul>

          <div className="mt-10 sm:mt-14 rounded-2xl border border-outline-variant bg-surface-container-low p-5 sm:p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
            <div>
              <p className="font-headline font-bold text-base sm:text-lg text-on-background">
                Questions about sales, service or parts?
              </p>
              <p className="text-secondary text-sm mt-1">
                Our team responds on business days - or use live chat for instant help.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link href="/contact" className={cn(buttonClassName("primary", "md"), "w-full sm:w-auto justify-center")}>
                Contact us
              </Link>
              <ShareButtons url={shareUrl} title="About Us - DT Trucks" />
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Speak to our sales team"
        description="New and used Isuzu trucks, driveaways and fleet support from Barking, Essex."
        buttonLabel="View truck sales"
        buttonHref="/sales"
        variant="dark"
      />
    </>
  );
}
