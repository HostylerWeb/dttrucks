"use client";

import { useState } from "react";
import Link from "next/link";
import { createPost, deletePost, updatePost } from "@/app/admin/(dashboard)/blog/actions";
import { slugFromTitle } from "@/lib/admin/slug";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { ImageUrlField } from "@/components/admin/image-url-field";
import { ConfirmDeleteForm } from "@/components/admin/confirm-delete-form";
import {
  FormField,
  inputClassName,
  selectClassName,
  textareaClassName,
} from "@/components/admin/form-field";
import { AdminButton, PageHeader } from "@/components/admin/page-header";
import type { blog_categories, blog_posts, users } from "@/generated/prisma/client";

type MediaItem = {
  id: string;
  url: string;
  alt_text: string | null;
  filename: string;
};

function formatDateTimeLocal(value: Date | null | undefined) {
  if (!value) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}T${pad(value.getHours())}:${pad(value.getMinutes())}`;
}

export function BlogPostForm({
  mode,
  post,
  categories,
  authors,
  media,
}: {
  mode: "create" | "edit";
  post?: blog_posts;
  categories: blog_categories[];
  authors: users[];
  media: MediaItem[];
}) {
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState(post?.slug ?? "");

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result =
      mode === "create"
        ? await createPost(formData)
        : await updatePost(post!.id, formData);
    if (result?.error) setError(result.error);
  }

  return (
    <div>
      <PageHeader
        title={mode === "create" ? "New post" : "Edit post"}
        description={post?.title}
        actions={
          mode === "edit" && (
            <div className="flex gap-2">
              <Link
                href={`/preview/blog/${post!.slug}`}
                target="_blank"
                className="inline-flex items-center rounded-lg border border-outline-variant px-4 py-2 text-sm font-semibold"
              >
                Preview
              </Link>
              <ConfirmDeleteForm action={deletePost.bind(null, post!.id)} />
            </div>
          )
        }
      />
      {error && <p className="mb-4 text-sm text-primary">{error}</p>}
      <form action={handleSubmit} className="max-w-3xl space-y-4">
        <FormField label="Title" name="title">
          <input
            id="title"
            name="title"
            required
            defaultValue={post?.title}
            className={inputClassName}
            onChange={(e) => {
              if (mode === "create" && !slug) setSlug(slugFromTitle(e.target.value));
            }}
          />
        </FormField>
        <FormField label="Slug" name="slug">
          <input
            id="slug"
            name="slug"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className={inputClassName}
          />
        </FormField>
        <FormField label="Category" name="category_id">
          <select id="category_id" name="category_id" defaultValue={post?.category_id ?? ""} className={selectClassName}>
            <option value="">None</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Author" name="author_id">
          <select id="author_id" name="author_id" defaultValue={post?.author_id ?? ""} className={selectClassName}>
            <option value="">Unassigned</option>
            {authors.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Excerpt" name="excerpt">
          <textarea id="excerpt" name="excerpt" defaultValue={post?.excerpt ?? ""} className={textareaClassName} rows={2} />
        </FormField>
        <FormField label="Content" name="content">
          <RichTextEditor name="content" defaultValue={post?.content ?? ""} />
        </FormField>
        <ImageUrlField
          name="featured_image"
          label="Featured image"
          defaultValue={post?.featured_image ?? ""}
          media={media}
        />
        <FormField label="Status" name="status">
          <select id="status" name="status" defaultValue={post?.status ?? "draft"} className={selectClassName}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </FormField>
        <FormField label="Publish date" name="published_at">
          <input
            id="published_at"
            name="published_at"
            type="datetime-local"
            defaultValue={formatDateTimeLocal(post?.published_at)}
            className={inputClassName}
          />
        </FormField>
        <FormField label="Meta title" name="meta_title">
          <input id="meta_title" name="meta_title" defaultValue={post?.meta_title ?? ""} className={inputClassName} />
        </FormField>
        <FormField label="Meta description" name="meta_description">
          <textarea id="meta_description" name="meta_description" defaultValue={post?.meta_description ?? ""} className={textareaClassName} rows={2} />
        </FormField>
        <div className="flex gap-3">
          <AdminButton type="submit">Save</AdminButton>
          <Link href="/admin/blog" className="rounded-lg border border-outline-variant px-4 py-2 text-sm font-semibold">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
