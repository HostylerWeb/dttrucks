import type { Metadata } from "next";
import { getModels } from "@/lib/db/trucks";
import { BreadcrumbsBar } from "@/components/layout/BreadcrumbsBar";
import { BodyQuoteForm } from "@/components/public/BodyQuoteForm";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Body specification quote - DT Trucks" },
  description:
    "Build a body specification and request a quote from DT Trucks — Isuzu authorised dealer in Barking, London and Essex. No online pricing.",
  alternates: { canonical: absoluteUrl("/sales/body-quote") },
};

export default async function BodyQuotePage({
  searchParams,
}: {
  searchParams: Promise<{ model?: string }>;
}) {
  const { model: modelParam } = await searchParams;
  const models = await getModels();
  const chassisModels = models
    .filter((m) => !m.is_driveaway)
    .map((m) => ({ slug: m.slug, name: m.name, model_code: m.model_code }));

  return (
    <>
      <BreadcrumbsBar
        items={[
          { label: "Home", href: "/" },
          { label: "Truck Sales", href: "/sales" },
          { label: "Body quote" },
        ]}
      />

      <section className="page-section page-container max-w-2xl">
        <h1 className="font-headline text-2xl sm:text-3xl font-extrabold">Body specification quote</h1>
        <p className="mt-4 text-secondary leading-relaxed">
          Tell us the body type, dimensions and options you need. George and the sales team will
          reply with specification advice and pricing — this tool does not show prices online.
        </p>
        <div className="mt-8">
          <BodyQuoteForm chassisModels={chassisModels} initialModelSlug={modelParam} />
        </div>
      </section>
    </>
  );
}
