"use client";

import Link from "next/link";
import { useState } from "react";
import { createUser } from "@/app/admin/(dashboard)/users/actions";
import {
  FormField,
  inputClassName,
  selectClassName,
} from "@/components/admin/form-field";
import { AdminButton, PageHeader } from "@/components/admin/page-header";

export default function NewUserPage() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await createUser(formData);
    if (result?.error) setError(result.error);
  }

  return (
    <div>
      <PageHeader title="New user" />
      {error && <p className="mb-4 text-sm text-primary">{error}</p>}
      <form action={handleSubmit} className="max-w-xl space-y-4">
        <FormField label="Name" name="name">
          <input id="name" name="name" required className={inputClassName} />
        </FormField>
        <FormField label="Email" name="email">
          <input id="email" name="email" type="email" required className={inputClassName} />
        </FormField>
        <FormField label="Password" name="password" hint="Minimum 8 characters">
          <input id="password" name="password" type="password" required minLength={8} className={inputClassName} />
        </FormField>
        <FormField label="Role" name="role">
          <select id="role" name="role" defaultValue="editor" className={selectClassName}>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
        </FormField>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="is_active" defaultChecked />
          Active
        </label>
        <div className="flex gap-3">
          <AdminButton type="submit">Create user</AdminButton>
          <Link href="/admin/users" className="rounded-lg border border-outline-variant px-4 py-2 text-sm font-semibold">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
