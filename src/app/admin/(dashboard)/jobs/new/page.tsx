import { requireRead } from "@/lib/admin/session";
import { JobForm } from "@/components/admin/job-form";

export default async function NewJobPage() {
  await requireRead();
  return <JobForm mode="create" />;
}
