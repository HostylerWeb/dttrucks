import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireRead } from "@/lib/admin/session";
import { deleteEnquiry, updateEnquiry } from "../actions";
import { PageHeader, AdminButton } from "@/components/admin/page-header";
import {
  FormField,
  selectClassName,
  textareaClassName,
} from "@/components/admin/form-field";
import { format } from "date-fns";

export default async function EnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireRead();
  const { id } = await params;
  const enquiry = await prisma.enquiries.findUnique({
    where: { id },
    include: { assigned_to: true },
  });
  if (!enquiry) notFound();

  const users = await prisma.users.findMany({
    where: { is_active: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader
        title={enquiry.subject ?? enquiry.type.replace("_", " ")}
        description={`Received ${format(enquiry.created_at, "dd MMM yyyy HH:mm")}`}
        actions={
          <div className="flex gap-2">
            <a
              href={`mailto:${enquiry.email}?subject=Re: ${encodeURIComponent(enquiry.subject ?? enquiry.type.replace("_", " "))}`}
              className="inline-flex items-center rounded-lg border border-outline-variant px-4 py-2 text-sm font-semibold hover:bg-surface-container"
            >
              Reply via email
            </a>
            <form action={deleteEnquiry.bind(null, id)}>
              <AdminButton type="submit" variant="danger">Delete</AdminButton>
            </form>
          </div>
        }
      />

      <div className="rounded-xl border border-outline-variant bg-white p-6 shadow-industrial space-y-3 text-sm">
        <p><strong>Name:</strong> {enquiry.name}</p>
        <p>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${enquiry.email}`} className="text-primary-container hover:underline">
            {enquiry.email}
          </a>
        </p>
        {enquiry.phone && <p><strong>Phone:</strong> {enquiry.phone}</p>}
        {enquiry.source_page && <p><strong>Source:</strong> {enquiry.source_page}</p>}
        <div>
          <strong>Message</strong>
          <p className="mt-2 whitespace-pre-wrap text-on-surface">{enquiry.message}</p>
        </div>
        {enquiry.metadata && (
          <div>
            <strong>Metadata</strong>
            <pre className="mt-2 rounded bg-surface-container p-3 text-xs overflow-auto">{enquiry.metadata}</pre>
          </div>
        )}
      </div>

      <form action={updateEnquiry.bind(null, id)} className="rounded-xl border border-outline-variant bg-white p-6 shadow-industrial space-y-4">
        <h2 className="font-headline font-semibold">Update enquiry</h2>
        <FormField label="Status" name="status">
          <select id="status" name="status" defaultValue={enquiry.status} className={selectClassName}>
            <option value="new">New</option>
            <option value="in_progress">In progress</option>
            <option value="resolved">Resolved</option>
            <option value="spam">Spam</option>
          </select>
        </FormField>
        <FormField label="Assigned to" name="assigned_to_id">
          <select id="assigned_to_id" name="assigned_to_id" defaultValue={enquiry.assigned_to_id ?? ""} className={selectClassName}>
            <option value="">Unassigned</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Internal notes" name="notes">
          <textarea id="notes" name="notes" defaultValue={enquiry.notes ?? ""} className={textareaClassName} rows={4} />
        </FormField>
        <AdminButton type="submit">Save changes</AdminButton>
      </form>

      <Link href="/admin/enquiries" className="text-sm text-primary-container hover:underline">
        ← Back to enquiries
      </Link>
    </div>
  );
}
