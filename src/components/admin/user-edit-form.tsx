"use client";

import Link from "next/link";
import { useState } from "react";
import { deactivateUser, updateUser } from "@/app/admin/(dashboard)/users/actions";
import {
  FormField,
  inputClassName,
  selectClassName,
} from "@/components/admin/form-field";
import { AdminButton, PageHeader } from "@/components/admin/page-header";
import type { users } from "@/generated/prisma/client";

export function UserEditForm({ user }: { user: users }) {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await updateUser(user.id, formData);
    if (result?.error) setError(result.error);
  }

  return (
    <div>
      <PageHeader
        title="Edit user"
        description={user.email}
        actions={
          <form action={deactivateUser.bind(null, user.id)}>
            <AdminButton type="submit" variant="danger">Deactivate</AdminButton>
          </form>
        }
      />
      {error && <p className="mb-4 text-sm text-primary">{error}</p>}
      <form action={handleSubmit} className="max-w-xl space-y-4">
        <FormField label="Name" name="name">
          <input id="name" name="name" required defaultValue={user.name} className={inputClassName} />
        </FormField>
        <FormField label="Email" name="email">
          <input id="email" name="email" type="email" required defaultValue={user.email} className={inputClassName} />
        </FormField>
        <FormField label="New password" name="password" hint="Leave blank to keep current password">
          <input id="password" name="password" type="password" minLength={8} className={inputClassName} />
        </FormField>
        <FormField label="Role" name="role">
          <select id="role" name="role" defaultValue={user.role} className={selectClassName}>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
        </FormField>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="is_active" defaultChecked={user.is_active} />
          Active
        </label>
        <div className="flex gap-3">
          <AdminButton type="submit">Save</AdminButton>
          <Link href="/admin/users" className="rounded-lg border border-outline-variant px-4 py-2 text-sm font-semibold">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
