"use client";

import Link from "next/link";
import { useState } from "react";
import { createJob, deleteJob, updateJob } from "@/app/admin/(dashboard)/jobs/actions";
import { slugFromTitle } from "@/lib/admin/slug";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import {
  FormField,
  inputClassName,
  selectClassName,
  textareaClassName,
} from "@/components/admin/form-field";
import { AdminButton, PageHeader } from "@/components/admin/page-header";
import type { job_listings } from "@/generated/prisma/client";

export function JobForm({
  mode,
  job,
}: {
  mode: "create" | "edit";
  job?: job_listings;
}) {
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState(job?.slug ?? "");

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result =
      mode === "create" ? await createJob(formData) : await updateJob(job!.id, formData);
    if (result?.error) setError(result.error);
  }

  return (
    <div>
      <PageHeader
        title={mode === "create" ? "New job" : "Edit job"}
        description={job?.title}
        actions={
          mode === "edit" && (
            <form action={deleteJob.bind(null, job!.id)}>
              <AdminButton type="submit" variant="danger">Delete</AdminButton>
            </form>
          )
        }
      />
      {error && <p className="mb-4 text-sm text-primary">{error}</p>}
      <form action={handleSubmit} className="max-w-3xl space-y-4">
        <FormField label="Title" name="title">
          <input id="title" name="title" required defaultValue={job?.title} className={inputClassName}
            onChange={(e) => { if (mode === "create" && !slug) setSlug(slugFromTitle(e.target.value)); }} />
        </FormField>
        <FormField label="Slug" name="slug">
          <input id="slug" name="slug" required value={slug} onChange={(e) => setSlug(e.target.value)} className={inputClassName} />
        </FormField>
        <FormField label="Description" name="description">
          <RichTextEditor name="description" defaultValue={job?.description ?? ""} />
        </FormField>
        <FormField label="Requirements" name="requirements">
          <textarea id="requirements" name="requirements" defaultValue={job?.requirements ?? ""} className={textareaClassName} />
        </FormField>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Location" name="location">
            <input id="location" name="location" defaultValue={job?.location ?? "Barking, Essex"} className={inputClassName} />
          </FormField>
          <FormField label="Employment type" name="employment_type">
            <select id="employment_type" name="employment_type" defaultValue={job?.employment_type ?? "full_time"} className={selectClassName}>
              <option value="full_time">Full time</option>
              <option value="part_time">Part time</option>
              <option value="contract">Contract</option>
              <option value="apprenticeship">Apprenticeship</option>
            </select>
          </FormField>
        </div>
        <FormField label="Status" name="status">
          <select id="status" name="status" defaultValue={job?.status ?? "draft"} className={selectClassName}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </FormField>
        <div className="flex gap-3">
          <AdminButton type="submit">Save</AdminButton>
          <Link href="/admin/jobs" className="rounded-lg border border-outline-variant px-4 py-2 text-sm font-semibold">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
