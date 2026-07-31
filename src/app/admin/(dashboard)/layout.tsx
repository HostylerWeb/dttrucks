import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { LogoutButton } from "@/components/admin/logout-button";

async function AdminShellHeader() {
  await connection();
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
  <header className="flex items-center justify-between border-b border-outline-variant bg-white px-6 py-4">
    <p className="text-sm text-secondary">
      Signed in as{" "}
      <span className="font-medium text-on-surface">{session.user.name}</span>
      <span className="capitalize"> · {session.user.role}</span>
    </p>
    <LogoutButton />
  </header>
  );
}

function HeaderFallback() {
  return (
    <header className="border-b border-outline-variant bg-white px-6 py-4">
      <div className="h-5 w-48 rounded bg-surface-container animate-pulse" />
    </header>
  );
}

async function AdminShellSidebar() {
  await connection();
  const session = await auth();
  const canManageUsers = hasPermission(
    session?.user?.role ?? "viewer",
    "manage_users"
  );

  return <AdminSidebar canManageUsers={canManageUsers} />;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-surface">
      <Suspense
        fallback={
          <aside className="w-64 shrink-0 border-r border-outline-variant bg-white" />
        }
      >
        <AdminShellSidebar />
      </Suspense>
      <div className="flex min-w-0 flex-1 flex-col">
        <Suspense fallback={<HeaderFallback />}>
          <AdminShellHeader />
        </Suspense>
        <main className="flex-1 p-6 lg:p-8">
          <Suspense
            fallback={
              <div className="h-64 rounded-xl bg-surface-container animate-pulse" />
            }
          >
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
