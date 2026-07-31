import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRead } from "@/lib/admin/session";
import { JobForm } from "@/components/admin/job-form";

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireRead();
  const { id } = await params;
  const job = await prisma.job_listings.findFirst({
    where: { id, deleted_at: null },
  });
  if (!job) notFound();
  return <JobForm mode="edit" job={job} />;
}
