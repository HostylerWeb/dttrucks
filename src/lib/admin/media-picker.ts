import { prisma } from "@/lib/prisma";

export type MediaPickerItem = {
  id: string;
  url: string;
  alt_text: string | null;
  filename: string;
};

export async function getMediaForPicker(limit = 200): Promise<MediaPickerItem[]> {
  return prisma.media.findMany({
    orderBy: { created_at: "desc" },
    take: limit,
    select: { id: true, url: true, alt_text: true, filename: true },
  });
}
