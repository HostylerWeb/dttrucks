import { prisma } from "@/lib/prisma";
import { requireRead } from "@/lib/admin/session";
import { reorderTeamMemberItem } from "@/app/admin/(dashboard)/team/actions";
import { PageHeader, AdminLinkButton } from "@/components/admin/page-header";
import { DataTable } from "@/components/admin/data-table";
import { ReorderButtons } from "@/components/admin/reorder-buttons";

export default async function TeamAdminPage() {
  await requireRead();
  const members = await prisma.team_members.findMany({
    orderBy: { sort_order: "asc" },
  });

  return (
    <div>
      <PageHeader
        title="Team"
        description="Staff profiles for the About page"
        actions={<AdminLinkButton href="/admin/team/new">Add member</AdminLinkButton>}
      />
      <DataTable
        columns={[
          { key: "name", label: "Name" },
          { key: "role", label: "Role" },
          { key: "visible", label: "Visible" },
          { key: "order", label: "Order" },
          { key: "reorder", label: "" },
        ]}
        rows={members.map((m) => ({
          id: m.id,
          href: `/admin/team/${m.id}`,
          cells: {
            name: m.name,
            role: m.role,
            visible: m.is_visible ? "Yes" : "No",
            order: m.sort_order,
            reorder: (
              <ReorderButtons
                moveUpAction={reorderTeamMemberItem.bind(null, m.id, "up")}
                moveDownAction={reorderTeamMemberItem.bind(null, m.id, "down")}
              />
            ),
          },
        }))}
      />
    </div>
  );
}
