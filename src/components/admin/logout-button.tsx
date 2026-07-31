import { signOut } from "@/lib/auth";

export function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/admin/login" });
      }}
    >
      <button
        type="submit"
        className="rounded-lg border border-outline-variant px-3 py-1.5 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container"
      >
        Sign out
      </button>
    </form>
  );
}
