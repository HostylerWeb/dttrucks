import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getModelBySlug } from "@/lib/db/trucks";
import { buildTruckMetadata } from "@/lib/metadata";
import { BreadcrumbsBar } from "@/components/layout/BreadcrumbsBar";
import { ImageGallery } from "@/components/public/ImageGallery";
import { SpecificationsTable, parseSpecifications } from "@/components/public/SpecificationsTable";
import { ContactForm } from "@/components/public/ContactForm";
import { TruckCard } from "@/components/public/TruckCard";
import { ShareButtons } from "@/components/public/ShareButtons";
import { SpecSheetDownloadLink } from "@/components/public/SpecSheetDownloadLink";
import { CabColoursFromJson } from "@/components/public/CabColoursBand";
import Link from "next/link";
import { ProductJsonLd } from "@/components/seo/ProductJsonLd";
import { absoluteUrl } from "@/lib/site";
import { prisma } from "@/lib/prisma";
import { content_status } from "@/generated/prisma/client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildTruckMetadata(slug);
}

export default async function TruckDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const model = await getModelBySlug(slug);
  if (!model) notFound();

  const related = await prisma.truck_models.findMany({
    where: {
      category_id: model.category_id,
      status: content_status.published,
      deleted_at: null,
      id: { not: model.id },
    },
    orderBy: { sort_order: "asc" },
    take: 3,
  });

  const galleryImages =
    model.images.length > 0
      ? model.images.map((img) => ({ url: img.url, alt: img.alt_text ?? model.name }))
      : model.image_url
        ? [{ url: model.image_url, alt: model.name }]
        : [];

  const specs = parseSpecifications(model.specifications);
  const siteUrl = absoluteUrl(`/sales/${model.slug}`);

  return (
    <>
      <ProductJsonLd
        name={model.name}
        description={model.description}
        slug={model.slug}
        imageUrl={model.image_url}
        modelCode={model.model_code}
      />
      <BreadcrumbsBar
        items={[
          { label: "Home", href: "/" },
          { label: "Truck Sales", href: "/sales" },
          { label: model.name },
        ]}
      />

      <section className="page-section page-container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            {galleryImages.length > 0 ? (
              <ImageGallery images={galleryImages} />
            ) : (
              <div className="aspect-[4/3] rounded-xl bg-surface-container border border-outline-variant" />
            )}
          </div>
          <div className="space-y-6">
            <div>
              {model.model_code && (
                <p className="text-sm font-semibold uppercase tracking-wide text-primary-container">
                  {model.model_code}
                </p>
              )}
              <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold mt-2 leading-tight">
                {model.name}
              </h1>
              <p className="mt-1 text-sm text-secondary">{model.category.name}</p>
            </div>
            <p className="text-secondary leading-relaxed">{model.description}</p>
            <div className="flex flex-wrap gap-3">
              <SpecSheetDownloadLink model={model} />
              <Link
                href={`/sales/body-quote?model=${encodeURIComponent(model.slug)}`}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-outline-variant bg-white px-5 py-2.5 text-sm font-semibold hover:border-primary-container/40 transition-colors"
              >
                Request body quote
              </Link>
            </div>
            <CabColoursFromJson cabColoursJson={model.category.cab_colours} />
            {Object.keys(specs).length > 0 && (
              <div>
                <h2 className="font-headline text-lg font-semibold mb-4">Specifications</h2>
                <SpecificationsTable specifications={specs} />
              </div>
            )}
          <ShareButtons url={siteUrl} title={model.name} />
          </div>
        </div>

        <div className="mt-10 sm:mt-16 grid lg:grid-cols-2 gap-8 lg:gap-12 border-t border-outline-variant pt-10 sm:pt-12">
          <div>
            <h2 className="font-headline text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Enquire about this truck
            </h2>
            <p className="text-secondary">
              Our sales team will respond with availability, pricing and specification options.
            </p>
          </div>
          <div className="rounded-xl border border-outline-variant bg-white p-5 sm:p-6 shadow-industrial">
            <ContactForm
              sourcePage={`/sales/${model.slug}`}
              defaultType="sales"
              defaultSubject={`Enquiry: ${model.name}`}
              showTypeSelect={false}
              metadata={{ truck_slug: model.slug, truck_name: model.name }}
              title="Sales enquiry"
            />
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-10 sm:mt-16 border-t border-outline-variant pt-10 sm:pt-12">
            <h2 className="font-headline text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
              More in {model.category.name}
            </h2>
            <ul className="grid gap-4 sm:grid-cols-3">
              {related.map((item) => (
                <li key={item.id}>
                  <TruckCard
                    name={item.name}
                    description={item.description}
                    href={`/sales/${item.slug}`}
                    imageUrl={item.image_url}
                    badge={item.model_code}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
