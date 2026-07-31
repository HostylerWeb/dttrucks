import { prisma } from "@/lib/prisma";
import { requireRead } from "@/lib/admin/session";
import {
  createVideo,
  deleteVideo,
  reorderVideoItem,
  updateVideo,
} from "@/app/admin/(dashboard)/videos/actions";
import { PageHeader } from "@/components/admin/page-header";
import { FormField, inputClassName } from "@/components/admin/form-field";
import { AdminButton } from "@/components/admin/page-header";
import { ReorderButtons } from "@/components/admin/reorder-buttons";
import { ConfirmDeleteForm } from "@/components/admin/confirm-delete-form";

export default async function VideosAdminPage() {
  await requireRead();
  const videos = await prisma.videos.findMany({
    orderBy: { sort_order: "asc" },
  });

  return (
    <div className="space-y-8">
      <PageHeader title="Videos" description="YouTube embeds" />
      <form action={createVideo} className="rounded-xl border border-outline-variant bg-white p-6 shadow-industrial grid gap-4 sm:grid-cols-2">
        <FormField label="Title" name="title">
          <input id="title" name="title" required className={inputClassName} />
        </FormField>
        <FormField label="YouTube ID" name="youtube_id">
          <input id="youtube_id" name="youtube_id" required className={inputClassName} />
        </FormField>
        <FormField label="Page slug (empty = homepage)" name="page_slug">
          <input id="page_slug" name="page_slug" className={inputClassName} />
        </FormField>
        <FormField label="Sort order" name="sort_order">
          <input id="sort_order" name="sort_order" type="number" defaultValue={0} className={inputClassName} />
        </FormField>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input type="checkbox" name="is_visible" defaultChecked />
          Visible
        </label>
        <AdminButton type="submit">Add video</AdminButton>
      </form>
      <ul className="divide-y divide-outline-variant rounded-xl border border-outline-variant bg-white">
        {videos.map((video) => (
          <li key={video.id} className="p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-secondary">Order: {video.sort_order}</span>
              <ReorderButtons
                moveUpAction={reorderVideoItem.bind(null, video.id, "up")}
                moveDownAction={reorderVideoItem.bind(null, video.id, "down")}
              />
            </div>
            <form action={updateVideo.bind(null, video.id)} className="grid gap-3 sm:grid-cols-2">
              <FormField label="Title" name="title">
                <input name="title" defaultValue={video.title} required className={inputClassName} />
              </FormField>
              <FormField label="YouTube ID" name="youtube_id">
                <input name="youtube_id" defaultValue={video.youtube_id} required className={inputClassName} />
              </FormField>
              <FormField label="Page slug" name="page_slug">
                <input name="page_slug" defaultValue={video.page_slug ?? ""} className={inputClassName} />
              </FormField>
              <FormField label="Sort order" name="sort_order">
                <input name="sort_order" type="number" defaultValue={video.sort_order} className={inputClassName} />
              </FormField>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="is_visible" defaultChecked={video.is_visible} />
                Visible
              </label>
              <div className="sm:col-span-2">
                <AdminButton type="submit">Save</AdminButton>
              </div>
            </form>
            <ConfirmDeleteForm action={deleteVideo.bind(null, video.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
