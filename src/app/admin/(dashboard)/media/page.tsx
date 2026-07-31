import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { requireRead } from "@/lib/admin/session";
import { deleteMedia, uploadMedia, updateMediaAlt } from "@/app/admin/(dashboard)/media/actions";
import { findMediaUsages } from "@/lib/admin/media-usage";
import { PageHeader } from "@/components/admin/page-header";
import { FormField, inputClassName } from "@/components/admin/form-field";
import { AdminButton } from "@/components/admin/page-header";
import { ConfirmDeleteForm } from "@/components/admin/confirm-delete-form";

export default async function MediaAdminPage() {
  await requireRead();
  const media = await prisma.media.findMany({
    orderBy: { created_at: "desc" },
  });

  const usagesById = Object.fromEntries(
    await Promise.all(
      media.map(async (item) => [item.id, await findMediaUsages(item.url)] as const)
    )
  );

  return (
    <div className="space-y-8">
      <PageHeader title="Media library" description="Uploaded images" />
      <form action={uploadMedia} className="rounded-xl border border-outline-variant bg-white p-6 shadow-industrial">
        <FormField label="Upload images" name="file">
          <input id="file" name="file" type="file" accept="image/*" multiple required className={inputClassName} />
        </FormField>
        <p className="mt-2 text-xs text-secondary">Select one or more images. Files are optimised to WebP.</p>
        <div className="mt-4">
          <AdminButton type="submit">Upload</AdminButton>
        </div>
      </form>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {media.map((item) => {
          const usages = usagesById[item.id] ?? [];
          const canDelete = usages.length === 0;

          return (
            <div key={item.id} className="rounded-xl border border-outline-variant bg-white p-4 shadow-industrial">
              <div className="relative aspect-video bg-surface-container rounded-lg overflow-hidden">
                <Image src={item.url} alt={item.alt_text ?? item.filename} fill className="object-cover" unoptimized />
              </div>
              <p className="mt-2 text-xs text-secondary truncate">{item.filename}</p>
              {usages.length > 0 && (
                <div className="mt-2 text-xs text-secondary">
                  <p className="font-medium text-on-surface">Used in:</p>
                  <ul className="mt-1 list-disc pl-4">
                    {usages.slice(0, 4).map((usage) => (
                      <li key={usage}>{usage}</li>
                    ))}
                    {usages.length > 4 && <li>+{usages.length - 4} more</li>}
                  </ul>
                </div>
              )}
              <form action={updateMediaAlt.bind(null, item.id)} className="mt-3 space-y-2">
                <input name="alt_text" defaultValue={item.alt_text ?? ""} placeholder="Alt text" className={inputClassName} />
                <AdminButton type="submit" variant="secondary">Update alt</AdminButton>
              </form>
              {canDelete ? (
                <div className="mt-2">
                  <ConfirmDeleteForm action={deleteMedia.bind(null, item.id)} />
                </div>
              ) : (
                <p className="mt-2 text-xs text-primary">Remove references before deleting.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
