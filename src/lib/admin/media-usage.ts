import { prisma } from "@/lib/prisma";

export async function findMediaUsages(url: string): Promise<string[]> {
  const usages: string[] = [];

  const [
    services,
    posts,
    members,
    models,
    truckImages,
    categories,
    pagesWithContent,
    sectionsWithContent,
  ] = await Promise.all([
    prisma.services.findMany({
      where: { image_url: url, deleted_at: null },
      select: { title: true },
    }),
    prisma.blog_posts.findMany({
      where: { featured_image: url, deleted_at: null },
      select: { title: true },
    }),
    prisma.team_members.findMany({
      where: { photo_url: url },
      select: { name: true },
    }),
    prisma.truck_models.findMany({
      where: { image_url: url, deleted_at: null },
      select: { name: true },
    }),
    prisma.truck_images.findMany({
      where: { url },
      select: { truck: { select: { name: true } } },
    }),
    prisma.truck_categories.findMany({
      where: { image_url: url },
      select: { name: true },
    }),
    prisma.pages.findMany({
      where: { content: { contains: url }, deleted_at: null },
      select: { title: true },
    }),
    prisma.page_sections.findMany({
      where: { content: { contains: url } },
      select: { title: true, page: { select: { title: true } } },
    }),
  ]);

  services.forEach((s) => usages.push(`Service: ${s.title}`));
  posts.forEach((p) => usages.push(`Blog: ${p.title}`));
  members.forEach((m) => usages.push(`Team: ${m.name}`));
  models.forEach((m) => usages.push(`Truck: ${m.name}`));
  truckImages.forEach((img) => usages.push(`Truck gallery: ${img.truck.name}`));
  categories.forEach((c) => usages.push(`Category: ${c.name}`));
  pagesWithContent.forEach((p) => usages.push(`Page content: ${p.title}`));
  sectionsWithContent.forEach((s) =>
    usages.push(`Section: ${s.title ?? s.page.title}`)
  );

  return usages;
}
