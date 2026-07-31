import { prisma } from "@/lib/prisma";
import { requireRead } from "@/lib/admin/session";
import { DataTable } from "@/components/admin/data-table";
import { PageHeader, AdminLinkButton } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/status-badge";

export default async function JobsAdminPage() {
  await requireRead();
  const jobs = await prisma.job_listings.findMany({
    where: { deleted_at: null },
    orderBy: { updated_at: "desc" },
    include: { applications: true },
  });

  return (
    <div>
      <PageHeader
        title="Jobs"
        description="Careers and job listings"
        actions={
          <div className="flex gap-2">
            <AdminLinkButton href="/admin/jobs/applications" variant="secondary">
              Applications
            </AdminLinkButton>
            <AdminLinkButton href="/admin/jobs/new">New job</AdminLinkButton>
          </div>
        }
      />
      <DataTable
        columns={[
          { key: "title", label: "Title" },
          { key: "status", label: "Status" },
          { key: "type", label: "Type" },
          { key: "apps", label: "Applications" },
        ]}
        rows={jobs.map((job) => ({
          id: job.id,
          href: `/admin/jobs/${job.id}`,
          cells: {
            title: job.title,
            status: <StatusBadge status={job.status} />,
            type: job.employment_type.replace("_", " "),
            apps: job.applications.length,
          },
        }))}
      />
    </div>
  );
}
