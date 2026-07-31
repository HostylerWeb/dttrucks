import { prisma } from "@/lib/prisma";
import { requireRead } from "@/lib/admin/session";
import { DataTable } from "@/components/admin/data-table";
import { PageHeader } from "@/components/admin/page-header";
import { ListFilters } from "@/components/admin/list-filters";
import { format } from "date-fns";
import type { enquiry_status, enquiry_type } from "@/generated/prisma/client";

export default async function EnquiriesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{
    type?: string;
    status?: string;
    from?: string;
    to?: string;
  }>;
}) {
  await requireRead();
  const params = await searchParams;

  const where: {
    type?: enquiry_type;
    status?: enquiry_status;
    created_at?: { gte?: Date; lte?: Date };
  } = {};

  if (params.type) where.type = params.type as enquiry_type;
  if (params.status) where.status = params.status as enquiry_status;
  if (params.from || params.to) {
    where.created_at = {};
    if (params.from) where.created_at.gte = new Date(params.from);
    if (params.to) {
      const end = new Date(params.to);
      end.setHours(23, 59, 59, 999);
      where.created_at.lte = end;
    }
  }

  const enquiries = await prisma.enquiries.findMany({
    where,
    orderBy: { created_at: "desc" },
    include: { assigned_to: { select: { name: true } } },
  });

  return (
    <div>
      <PageHeader
        title="Enquiries"
        description="Contact form submissions"
      />
      <ListFilters
        basePath="/admin/enquiries"
        values={params}
        fields={[
          {
            name: "type",
            label: "Type",
            type: "select",
            options: [
              { value: "general", label: "General" },
              { value: "sales", label: "Sales" },
              { value: "service", label: "Service" },
              { value: "parts", label: "Parts" },
              { value: "tachograph", label: "Tachograph" },
              { value: "specialist", label: "Specialist" },
              { value: "careers", label: "Careers" },
            ],
          },
          {
            name: "status",
            label: "Status",
            type: "select",
            options: [
              { value: "new", label: "New" },
              { value: "in_progress", label: "In progress" },
              { value: "resolved", label: "Resolved" },
              { value: "spam", label: "Spam" },
            ],
          },
          { name: "from", label: "From", type: "date" },
          { name: "to", label: "To", type: "date" },
        ]}
      />
      <DataTable
        columns={[
          { key: "name", label: "Name" },
          { key: "type", label: "Type" },
          { key: "status", label: "Status" },
          { key: "date", label: "Received" },
        ]}
        rows={enquiries.map((e) => ({
          id: e.id,
          href: `/admin/enquiries/${e.id}`,
          cells: {
            name: e.name,
            type: e.type.replace("_", " "),
            status: e.status.replace("_", " "),
            date: format(e.created_at, "dd MMM yyyy HH:mm"),
          },
        }))}
      />
    </div>
  );
}
