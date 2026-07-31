import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRead } from "@/lib/admin/session";
import { updateCategory } from "@/app/admin/(dashboard)/trucks/actions";
import { getMediaForPicker } from "@/lib/admin/media-picker";
import {
  FormField,
  inputClassName,
  textareaClassName,
} from "@/components/admin/form-field";
import { AdminButton, PageHeader } from "@/components/admin/page-header";
import { ImageUrlField } from "@/components/admin/image-url-field";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireRead();
  const { id } = await params;
  const [category, media] = await Promise.all([
    prisma.truck_categories.findUnique({ where: { id } }),
    getMediaForPicker(),
  ]);
  if (!category) notFound();

  return (
    <div>
      <PageHeader title="Edit category" description={category.name} />
      <form action={updateCategory.bind(null, id)} className="max-w-2xl space-y-4">
        <FormField label="Name" name="name">
          <input id="name" name="name" required defaultValue={category.name} className={inputClassName} />
        </FormField>
        <FormField label="Slug" name="slug">
          <input id="slug" name="slug" required defaultValue={category.slug} className={inputClassName} />
        </FormField>
        <FormField label="Description" name="description">
          <textarea
            id="description"
            name="description"
            defaultValue={category.description ?? ""}
            className={textareaClassName}
          />
        </FormField>
        <ImageUrlField
          name="image_url"
          label="Category image"
          defaultValue={category.image_url ?? ""}
          media={media}
          hint="Shown on the truck sales page. Pick from uploads or paste a URL."
        />
        <FormField label="Sort order" name="sort_order">
          <input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={category.sort_order}
            className={inputClassName}
          />
        </FormField>
        <AdminButton type="submit">Save category</AdminButton>
      </form>
    </div>
  );
}
