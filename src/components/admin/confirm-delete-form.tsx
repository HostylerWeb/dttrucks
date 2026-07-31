"use client";

import { AdminButton } from "@/components/admin/page-header";

export function ConfirmDeleteForm({
  action,
  label = "Delete",
}: {
  action: () => Promise<void>;
  label?: string;
}) {
  return (
    <form
      action={async () => {
        if (!window.confirm("Are you sure you want to delete this? This cannot be undone.")) {
          return;
        }
        await action();
      }}
    >
      <AdminButton type="submit" variant="danger">{label}</AdminButton>
    </form>
  );
}
