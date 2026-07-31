import { prisma } from "@/lib/prisma";
import { requireRead } from "@/lib/admin/session";
import { updateApplicationStatus } from "../actions";
import { PageHeader } from "@/components/admin/page-header";
import { DataTable } from "@/components/admin/data-table";
import { format } from "date-fns";
import { selectClassName } from "@/components/admin/form-field";

export default async function JobApplicationsPage() {
  await requireRead();
  const applications = await prisma.job_applications.findMany({
    orderBy: { created_at: "desc" },
    include: { job: true },
  });

  return (
    <div>
      <PageHeader title="Job applications" description="Review candidate applications" />
      <DataTable
        columns={[
          { key: "name", label: "Name" },
          { key: "job", label: "Job" },
          { key: "status", label: "Status" },
          { key: "date", label: "Applied" },
          { key: "resume", label: "Resume" },
          { key: "actions", label: "" },
        ]}
        rows={applications.map((app) => ({
          id: app.id,
          cells: {
            name: app.name,
            job: app.job.title,
            status: app.status.replace("_", " "),
            date: format(app.created_at, "dd MMM yyyy"),
            resume: app.resume_url ? (
              <a
                href={app.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary-container hover:underline"
              >
                Download
              </a>
            ) : (
              "-"
            ),
            actions: (
              <form action={updateApplicationStatus.bind(null, app.id)} className="flex gap-2">
                <select name="status" defaultValue={app.status} className={selectClassName + " !py-1"}>
                  <option value="new">New</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                  <option value="hired">Hired</option>
                </select>
                <button type="submit" className="text-sm text-primary-container font-medium">Update</button>
              </form>
            ),
          },
        }))}
      />
    </div>
  );
}
