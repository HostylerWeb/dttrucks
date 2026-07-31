import { prisma } from "@/lib/prisma";
import { requireManageUsers } from "@/lib/admin/session";
import { DataTable } from "@/components/admin/data-table";
import { PageHeader, AdminLinkButton } from "@/components/admin/page-header";

export default async function UsersAdminPage() {
  await requireManageUsers();
  const users = await prisma.users.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <PageHeader
        title="Users"
        description="Admin accounts"
        actions={<AdminLinkButton href="/admin/users/new">New user</AdminLinkButton>}
      />
      <DataTable
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "role", label: "Role" },
          { key: "active", label: "Active" },
        ]}
        rows={users.map((u) => ({
          id: u.id,
          href: `/admin/users/${u.id}`,
          cells: {
            name: u.name,
            email: u.email,
            role: u.role,
            active: u.is_active ? "Yes" : "No",
          },
        }))}
      />
    </div>
  );
}
