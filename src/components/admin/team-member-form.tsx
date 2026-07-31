"use client";

import Link from "next/link";
import { useState } from "react";
import {
  createTeamMember,
  deleteTeamMember,
  updateTeamMember,
} from "@/app/admin/(dashboard)/team/actions";
import {
  FormField,
  inputClassName,
  textareaClassName,
} from "@/components/admin/form-field";
import { AdminButton, PageHeader } from "@/components/admin/page-header";
import { ImageUrlField, type MediaPickerItem } from "@/components/admin/image-url-field";
import type { team_members } from "@/generated/prisma/client";

export function TeamMemberForm({
  mode,
  member,
  media,
}: {
  mode: "create" | "edit";
  member?: team_members;
  media: MediaPickerItem[];
}) {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result =
      mode === "create"
        ? await createTeamMember(formData)
        : await updateTeamMember(member!.id, formData);
    if (result?.error) setError(result.error);
  }

  return (
    <div>
      <PageHeader
        title={mode === "create" ? "Add team member" : "Edit team member"}
        description={member?.name}
        actions={
          mode === "edit" && (
            <form action={deleteTeamMember.bind(null, member!.id)}>
              <AdminButton type="submit" variant="danger">Delete</AdminButton>
            </form>
          )
        }
      />
      {error && <p className="mb-4 text-sm text-primary">{error}</p>}
      <form action={handleSubmit} className="max-w-2xl space-y-4">
        <FormField label="Name" name="name">
          <input id="name" name="name" required defaultValue={member?.name} className={inputClassName} />
        </FormField>
        <FormField label="Role" name="role">
          <input id="role" name="role" required defaultValue={member?.role} className={inputClassName} />
        </FormField>
        <FormField label="Bio" name="bio">
          <textarea id="bio" name="bio" defaultValue={member?.bio ?? ""} className={textareaClassName} rows={4} />
        </FormField>
        <ImageUrlField
          name="photo_url"
          label="Team photo"
          defaultValue={member?.photo_url ?? ""}
          media={media}
          hint="Portrait photo for the About page team section."
        />
        <FormField label="Sort order" name="sort_order">
          <input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={member?.sort_order ?? 0}
            className={inputClassName}
          />
        </FormField>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="is_visible" defaultChecked={member?.is_visible ?? true} />
          Visible on site
        </label>
        <div className="flex gap-3">
          <AdminButton type="submit">Save</AdminButton>
          <Link href="/admin/team" className="rounded-lg border border-outline-variant px-4 py-2 text-sm font-semibold">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
