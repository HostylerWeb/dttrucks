"use client";

import { useState } from "react";
import Link from "next/link";
import { createModel, deleteModel, updateModel } from "@/app/admin/(dashboard)/trucks/actions";
import { slugFromTitle } from "@/lib/admin/slug";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import {
  FormField,
  inputClassName,
  selectClassName,
} from "@/components/admin/form-field";
import { AdminButton, PageHeader } from "@/components/admin/page-header";
import { ConfirmDeleteForm } from "@/components/admin/confirm-delete-form";
import type { MediaPickerItem } from "@/components/admin/image-url-field";
import { ImageUrlField } from "@/components/admin/image-url-field";
import { SpecificationsEditor } from "@/components/admin/specifications-editor";
import { TruckImagesEditor } from "@/components/admin/truck-images-editor";
import type { truck_categories, truck_images, truck_models } from "@/generated/prisma/client";

type MediaItem = MediaPickerItem;

export function TruckModelForm({
  mode,
  model,
  categories,
  images = [],
  media,
  defaultCategoryId,
}: {
  mode: "create" | "edit";
  model?: truck_models;
  categories: truck_categories[];
  images?: truck_images[];
  media: MediaItem[];
  defaultCategoryId?: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState(model?.slug ?? "");

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result =
      mode === "create"
        ? await createModel(formData)
        : await updateModel(model!.id, formData);
    if (result?.error) setError(result.error);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={mode === "create" ? "New truck model" : "Edit truck model"}
        description={model?.name}
        actions={
          mode === "edit" && (
            <ConfirmDeleteForm action={deleteModel.bind(null, model!.id)} />
          )
        }
      />
      {error && <p className="text-sm text-primary">{error}</p>}
      <form action={handleSubmit} className="max-w-3xl space-y-4">
        <FormField
          label="Category"
          name="category_id"
          hint="Weight-class categories (3.5t, 5.5/6.5t, etc.) appear under “Truck range by GVW”. Use “Isuzu Driveaway Trucks” for ready-bodied driveaway stock."
        >
          <select
            id="category_id"
            name="category_id"
            required
            defaultValue={model?.category_id ?? defaultCategoryId}
            className={selectClassName}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Name" name="name">
          <input
            id="name"
            name="name"
            required
            defaultValue={model?.name}
            className={inputClassName}
            onChange={(e) => {
              if (mode === "create" && !slug) setSlug(slugFromTitle(e.target.value));
            }}
          />
        </FormField>
        <FormField label="Slug" name="slug">
          <input id="slug" name="slug" required value={slug} onChange={(e) => setSlug(e.target.value)} className={inputClassName} />
        </FormField>
        <FormField label="Model code" name="model_code">
          <input id="model_code" name="model_code" defaultValue={model?.model_code ?? ""} className={inputClassName} />
        </FormField>
        <FormField label="Description" name="description">
          <RichTextEditor name="description" defaultValue={model?.description ?? ""} />
        </FormField>
        <FormField label="Specifications" name="specifications">
          <SpecificationsEditor name="specifications" defaultValue={model?.specifications ?? ""} />
        </FormField>
        <ImageUrlField
          name="image_url"
          label="Primary image"
          defaultValue={model?.image_url ?? ""}
          media={media}
          hint="Main photo on the truck detail page and sales listings."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Status" name="status">
            <select id="status" name="status" defaultValue={model?.status ?? "draft"} className={selectClassName}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </FormField>
          <FormField label="Sort order" name="sort_order">
            <input id="sort_order" name="sort_order" type="number" defaultValue={model?.sort_order ?? 0} className={inputClassName} />
          </FormField>
        </div>
        <div className="rounded-lg border border-outline-variant bg-surface-container-low p-4 space-y-3">
          <p className="text-sm font-semibold text-on-background">Where this truck appears on /sales</p>
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              name="is_driveaway"
              className="mt-1"
              defaultChecked={model?.is_driveaway ?? false}
            />
            <span>
              <span className="font-medium">Driveaway vehicle</span>
              <span className="block text-secondary mt-0.5">
                Tick this to list it under “Driveaway vehicles” (ready-bodied tipper, dropside, box,
                etc.). Leave unticked for chassis models shown only in the GVW weight-class tabs.
              </span>
            </span>
          </label>
          <FormField
            label="Driveaway body type"
            name="driveaway_type"
            hint="e.g. tipper, dropside, utilitruck, box, curtainsider - only needed for driveaways."
          >
            <input
              id="driveaway_type"
              name="driveaway_type"
              defaultValue={model?.driveaway_type ?? ""}
              className={inputClassName}
              placeholder="tipper"
            />
          </FormField>
        </div>
        <div className="flex gap-3">
          <AdminButton type="submit">Save</AdminButton>
          <Link href="/admin/trucks" className="rounded-lg border border-outline-variant px-4 py-2 text-sm font-semibold">Cancel</Link>
        </div>
      </form>
      {mode === "edit" && (
        <TruckImagesEditor truckId={model!.id} images={images} media={media} />
      )}
    </div>
  );
}
