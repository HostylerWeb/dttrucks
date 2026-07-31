import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function PagePreview({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await prisma.pages.findFirst({
    where: { slug, deleted_at: null },
    include: {
      sections: {
        where: { is_visible: true },
        orderBy: { sort_order: "asc" },
      },
    },
  });

  if (!page) notFound();

  return (
    <div className="min-h-screen bg-surface p-8 max-w-3xl mx-auto">
      <p className="text-xs text-secondary mb-4">Preview — {page.status}</p>
      <h1 className="font-headline text-3xl font-bold">{page.title}</h1>
      {page.subtitle && (
        <p className="mt-2 text-lg text-secondary">{page.subtitle}</p>
      )}
      <div
        className="prose prose-sm mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
      {page.sections.length > 0 && (
        <div className="mt-12 space-y-8 border-t border-outline-variant pt-8">
          {page.sections.map((section) => (
            <div key={section.id}>
              {section.title && (
                <h2 className="font-headline text-xl font-semibold mb-2">
                  {section.title}
                </h2>
              )}
              {section.content && (
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
