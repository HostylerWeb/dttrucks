import type { Metadata } from "next";
import Link from "next/link";
import { getJobListings } from "@/lib/db/jobs";
import { buildStaticPageMetadata, staticMetadata } from "@/lib/metadata";
import { HeroSection } from "@/components/public/HeroSection";
import { BreadcrumbsBar } from "@/components/layout/BreadcrumbsBar";
import { JobCard } from "@/components/public/JobCard";
import { CTABanner } from "@/components/public/CTABanner";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata(
    staticMetadata.careers.title,
    staticMetadata.careers.description,
    "/careers"
  );
}

function excerptFromHtml(html: string) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > 160 ? `${text.slice(0, 157)}…` : text;
}

export default async function CareersPage() {
  const jobs = await getJobListings();

  return (
    <>
      <BreadcrumbsBar items={[{ label: "Home", href: "/" }, { label: "Careers" }]} />
      <HeroSection
        title="Careers"
        subtitle="Join our workshop, sales and fleet support teams in Barking, Essex"
        minHeight="min-h-[200px] sm:min-h-[240px]"
        ctas={[{ label: "Contact us", href: "/contact", variant: "secondary" }]}
      />
      <section className="page-section page-container">
        {jobs.length === 0 ? (
          <div className="rounded-xl border border-outline-variant bg-white p-10 text-center shadow-industrial">
            <span className="material-symbols-outlined text-5xl text-outline-variant">work</span>
            <h2 className="mt-4 font-headline text-xl font-bold">No current openings</h2>
            <p className="mt-2 text-secondary max-w-md mx-auto">
              We don&apos;t have any active vacancies right now. Check back soon or send us your details
              for future opportunities.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex text-sm font-semibold text-primary-container hover:underline"
            >
              Get in touch →
            </Link>
          </div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2">
            {jobs.map((job) => (
              <li key={job.id}>
                <JobCard
                  title={job.title}
                  slug={job.slug}
                  location={job.location}
                  employmentType={job.employment_type}
                  excerpt={excerptFromHtml(job.description)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
      <CTABanner
        title="Can't find the right role?"
        description="We're always interested in skilled commercial vehicle technicians and sales professionals."
        buttonLabel="Send a general enquiry"
        buttonHref="/contact"
      />
    </>
  );
}
