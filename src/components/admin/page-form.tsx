"use client";

import { useState } from "react";
import Link from "next/link";
import { slugFromTitle } from "@/lib/admin/slug";
import {
  createPage,
  publishPage,
  updatePage,
} from "@/app/admin/(dashboard)/pages/actions";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import {
  FormField,
  inputClassName,
  selectClassName,
  textareaClassName,
} from "@/components/admin/form-field";
import { AdminButton, PageHeader } from "@/components/admin/page-header";
import { ConfirmDeleteForm } from "@/components/admin/confirm-delete-form";
import { PageSectionsEditor } from "@/components/admin/page-sections-editor";
import { deletePage } from "@/app/admin/(dashboard)/pages/actions";
import type { page_sections, pages } from "@/generated/prisma/client";

type PageFormProps =
  | { mode: "create" }
  | { mode: "edit"; page: pages; sections: page_sections[] };

export function PageForm(props: PageFormProps) {
  const page = props.mode === "edit" ? props.page : undefined;
  const sections = props.mode === "edit" ? props.sections : [];
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState(page?.slug ?? "");

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result =
      props.mode === "create"
        ? await createPage(formData)
        : await updatePage(page!.id, formData);

    if (result?.error) setError(result.error);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={props.mode === "create" ? "New page" : "Edit page"}
        description={page?.title}
        actions={
          props.mode === "edit" && (
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/preview/pages/${page!.slug}`}
                target="_blank"
                className="inline-flex items-center rounded-lg border border-outline-variant px-4 py-2 text-sm font-semibold hover:bg-surface-container"
              >
                Preview
              </Link>
              <form action={publishPage.bind(null, page!.id)}>
                <AdminButton type="submit">Publish</AdminButton>
              </form>
              <ConfirmDeleteForm action={deletePage.bind(null, page!.id)} />
            </div>
          )
        }
      />

      {error && (
        <p className="mb-4 rounded-lg border border-primary-fixed-dim bg-primary-fixed-dim/10 px-3 py-2 text-sm text-primary">
          {error}
        </p>
      )}

      <form action={handleSubmit} className="space-y-6 max-w-3xl">
        <FormField label="Title" name="title">
          <input
            id="title"
            name="title"
            required
            defaultValue={page?.title}
            className={inputClassName}
            onChange={(e) => {
              if (props.mode === "create" && !slug) {
                setSlug(slugFromTitle(e.target.value));
              }
            }}
          />
        </FormField>

        <FormField label="Slug" name="slug" hint="Lowercase, hyphens only">
          <input
            id="slug"
            name="slug"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className={inputClassName}
          />
        </FormField>

        <FormField label="Subtitle" name="subtitle">
          <input
            id="subtitle"
            name="subtitle"
            defaultValue={page?.subtitle ?? ""}
            className={inputClassName}
          />
        </FormField>

        <FormField label="Content" name="content">
          <RichTextEditor name="content" defaultValue={page?.content ?? ""} />
        </FormField>

        <FormField label="Meta title" name="meta_title">
          <input
            id="meta_title"
            name="meta_title"
            defaultValue={page?.meta_title ?? ""}
            className={inputClassName}
          />
        </FormField>

        <FormField label="Meta description" name="meta_description">
          <textarea
            id="meta_description"
            name="meta_description"
            defaultValue={page?.meta_description ?? ""}
            className={textareaClassName}
            rows={3}
          />
        </FormField>

        <FormField label="Status" name="status">
          <select
            id="status"
            name="status"
            defaultValue={page?.status ?? "draft"}
            className={selectClassName}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </FormField>

        <div className="flex flex-wrap gap-3">
          <AdminButton type="submit">Save</AdminButton>
          <Link
            href="/admin/pages"
            className="inline-flex items-center rounded-lg border border-outline-variant px-4 py-2 text-sm font-semibold hover:bg-surface-container"
          >
            Cancel
          </Link>
        </div>
      </form>

      {props.mode === "edit" && (
        <PageSectionsEditor pageId={page!.id} sections={sections} />
      )}
    </div>
  );
}
