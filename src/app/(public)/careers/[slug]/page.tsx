import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJobBySlug } from "@/lib/db/jobs";
import { buildJobMetadata } from "@/lib/metadata";
import { BreadcrumbsBar } from "@/components/layout/BreadcrumbsBar";
import { formatEmploymentType } from "@/components/public/JobCard";
import { JobApplicationForm } from "@/components/public/JobApplicationForm";
import { JobPostingJsonLd } from "@/components/seo/JobPostingJsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildJobMetadata(slug);
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  const requirements = job.requirements
    ? job.requirements
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

  return (
    <>
      <JobPostingJsonLd
        title={job.title}
        description={job.description}
        slug={job.slug}
        location={job.location}
        employmentType={job.employment_type}
        datePosted={job.created_at}
      />
      <BreadcrumbsBar
        items={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
          { label: job.title },
        ]}
      />

      <section className="page-section page-container">
        <header className="max-w-3xl mb-8 sm:mb-10">
          <div className="flex flex-wrap gap-3 text-sm text-secondary mb-4">
            <span className="rounded-full bg-surface-container px-3 py-1 font-semibold">
              {formatEmploymentType(job.employment_type)}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-base">location_on</span>
              {job.location}
            </span>
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold">{job.title}</h1>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-8 lg:space-y-10">
            <div>
              <h2 className="font-headline text-xl font-bold mb-4">About the role</h2>
              <div
                className="prose prose-lg max-w-none prose-headings:font-headline"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </div>
            {requirements.length > 0 && (
              <div>
                <h2 className="font-headline text-xl font-bold mb-4">Requirements</h2>
                <ul className="space-y-2 text-secondary">
                  {requirements.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary-container text-sm mt-0.5 shrink-0">
                        check
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="rounded-xl border border-outline-variant bg-white p-5 sm:p-6 shadow-industrial">
            <JobApplicationForm jobId={job.id} jobTitle={job.title} />
          </div>
        </div>
      </section>
    </>
  );
}
