import { prisma } from "@/lib/prisma";

export type CreateMediaInput = {
  filename: string;
  url: string;
  alt_text?: string;
  mime_type: string;
  size_bytes: number;
  width?: number;
  height?: number;
};

export async function uploadMedia(input: CreateMediaInput) {
  return prisma.media.create({ data: input });
}

export async function getMedia() {
  return prisma.media.findMany({
    orderBy: { created_at: "desc" },
  });
}

export async function getMediaById(id: string) {
  return prisma.media.findUnique({ where: { id } });
}
