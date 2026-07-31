import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { PageHeader, AdminLinkButton } from "@/components/admin/page-header";
import { format } from "date-fns";

async function DashboardContent() {
  await connection();
  const session = await auth();

  const [
    newEnquiries,
    recentEnquiries,
    publishedPages,
    publishedPosts,
    activeJobs,
    homePage,
  ] = await Promise.all([
    prisma.enquiries.count({ where: { status: "new" } }),
    prisma.enquiries.findMany({
      orderBy: { created_at: "desc" },
      take: 10,
    }),
    prisma.pages.count({
      where: { status: "published", deleted_at: null },
    }),
    prisma.blog_posts.count({
      where: { status: "published", deleted_at: null },
    }),
    prisma.job_listings.count({
      where: { status: "published", deleted_at: null },
    }),
    prisma.pages.findFirst({
      where: { slug: "home", deleted_at: null },
      select: { id: true },
    }),
  ]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description={`Welcome back, ${session?.user?.name ?? "Admin"}`}
        actions={
          <div className="flex flex-wrap gap-2">
            {homePage && (
              <AdminLinkButton href={`/admin/pages/${homePage.id}`} variant="secondary">
                Edit homepage
              </AdminLinkButton>
            )}
            <AdminLinkButton href="/admin/blog/new" variant="secondary">
              New post
            </AdminLinkButton>
            <AdminLinkButton href="/admin/enquiries">View enquiries</AdminLinkButton>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="New enquiries" value={newEnquiries} href="/admin/enquiries" />
        <StatCard label="Published pages" value={publishedPages} href="/admin/pages" />
        <StatCard label="Blog posts" value={publishedPosts} href="/admin/blog" />
        <StatCard label="Active jobs" value={activeJobs} href="/admin/jobs" />
      </div>

      <section className="rounded-xl border border-outline-variant bg-white p-6 shadow-industrial">
        <h2 className="font-headline text-lg font-semibold">Recent enquiries</h2>
        <ul className="mt-4 divide-y divide-outline-variant">
          {recentEnquiries.length === 0 ? (
            <li className="py-3 text-sm text-secondary">No enquiries yet</li>
          ) : (
            recentEnquiries.map((e) => (
              <li key={e.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <Link
                  href={`/admin/enquiries/${e.id}`}
                  className="font-medium text-on-surface hover:text-primary-container"
                >
                  {e.name}  -  {e.type.replace("_", " ")}
                </Link>
                <span className="text-xs text-secondary">
                  {format(e.created_at, "dd MMM yyyy")}
                </span>
              </li>
            ))
          )}
        </ul>
      </section>

      <p className="text-sm text-secondary">
        Service pages are built into the site  -  edit pages, blog, trucks and jobs in the CMS.
      </p>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-outline-variant bg-white p-5 shadow-industrial transition-colors hover:border-primary-container/40"
    >
      <p className="text-sm font-medium text-secondary">{label}</p>
      <p className="mt-2 font-headline text-3xl font-bold text-on-surface">{value}</p>
    </Link>
  );
}

function DashboardFallback() {
  return <div className="h-64 rounded-xl bg-surface-container animate-pulse" />;
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<DashboardFallback />}>
      <DashboardContent />
    </Suspense>
  );
}
