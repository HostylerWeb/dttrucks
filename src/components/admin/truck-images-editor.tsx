"use client";

import { useState } from "react";
import {
  addTruckImage,
  deleteTruckImage,
} from "@/app/admin/(dashboard)/trucks/actions";
import { FormField, inputClassName } from "@/components/admin/form-field";
import { AdminButton } from "@/components/admin/page-header";
import { ConfirmDeleteForm } from "@/components/admin/confirm-delete-form";
import { ImageUrlField } from "@/components/admin/image-url-field";
import type { truck_images } from "@/generated/prisma/client";

type MediaItem = { id: string; url: string; alt_text: string | null; filename: string };

export function TruckImagesEditor({
  truckId,
  images,
  media,
}: {
  truckId: string;
  images: truck_images[];
  media: MediaItem[];
}) {
  const [url, setUrl] = useState("");

  return (
    <section className="rounded-xl border border-outline-variant bg-white p-6 shadow-industrial space-y-4">
      <h2 className="font-headline text-lg font-semibold">Gallery images</h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {images.map((img) => (
          <li key={img.id} className="flex items-center justify-between gap-2 rounded border p-2">
            <span className="text-sm truncate">{img.url}</span>
            <ConfirmDeleteForm
              action={deleteTruckImage.bind(null, img.id, truckId)}
              label="Remove"
            />
          </li>
        ))}
      </ul>
      <form
        action={async (formData) => {
          await addTruckImage(truckId, formData);
          setUrl("");
        }}
        className="space-y-3 border-t pt-4"
      >
        <ImageUrlField
          name="url"
          label="Gallery image"
          defaultValue={url}
          media={media}
        />
        <FormField label="Alt text" name="alt_text">
          <input name="alt_text" className={inputClassName} />
        </FormField>
        <AdminButton type="submit">Add image</AdminButton>
      </form>
    </section>
  );
}
