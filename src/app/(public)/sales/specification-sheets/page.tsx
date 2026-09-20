import type { Metadata } from "next";
import Link from "next/link";
import { getCategories } from "@/lib/db/trucks";
import { resolveSpecSheet } from "@/lib/trucks/spec-sheet";
import { isuzuBrochureLinks } from "@/content/isuzu-spec-links";
import { BreadcrumbsBar } from "@/components/layout/BreadcrumbsBar";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Isuzu specification sheets - DT Trucks" },
  description:
    "Download Isuzu chassis specification sheets by gross vehicle weight — 3.5t through to 13.5t. Authorised dealer serving London and Essex from Barking.",
  alternates: { canonical: absoluteUrl("/sales/specification-sheets") },
};

export default async function SpecificationSheetsPage() {
  const categories = await getCategories();
  const groups = categories.filter((c) => c.slug !== "driveaway");

  return (
    <>
      <BreadcrumbsBar
        items={[
          { label: "Home", href: "/" },
          { label: "Truck Sales", href: "/sales" },
          { label: "Specification sheets" },
        ]}
      />

      <section className="page-section page-container">
        <div className="max-w-3xl mb-10">
          <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold">
            Specification sheets
          </h1>
          <p className="mt-4 text-secondary leading-relaxed">
            Official Isuzu chassis specification PDFs grouped by gross vehicle weight. For pricing,
            availability and body options,{" "}
            <Link href="/contact" className="font-semibold text-primary-container hover:underline">
              contact our sales team
            </Link>{" "}
            or use the{" "}
            <Link href="/sales/body-quote" className="font-semibold text-primary-container hover:underline">
              body quote request
            </Link>
            .
          </p>
        </div>

        <div className="space-y-12">
          {groups.map((category) => {
            const sheets = category.truck_models
              .map((model) => ({ model, sheet: resolveSpecSheet(model) }))
              .filter((row) => row.sheet !== null);

            if (sheets.length === 0) return null;

            return (
              <div key={category.id}>
                <h2 className="font-headline text-xl font-bold border-b border-outline-variant pb-3 mb-4">
                  {category.name}
                </h2>
                <ul className="space-y-3">
                  {sheets.map(({ model, sheet }) => (
                    <li key={model.id}>
                      <a
                        href={sheet!.url}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border border-outline-variant bg-white px-4 py-3 hover:border-primary-container/30 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>
                          <span className="font-semibold text-on-background">{model.name}</span>
                          {model.model_code && (
                            <span className="ml-2 text-sm text-secondary">{model.model_code}</span>
                          )}
                        </span>
                        <span className="text-sm font-semibold text-primary-container shrink-0">
                          {sheet!.label} →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <footer className="mt-16 pt-10 border-t border-outline-variant">
          <h2 className="font-headline text-lg font-bold mb-4">Brochures &amp; downloads</h2>
          <ul className="space-y-2">
            {isuzuBrochureLinks.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  className="text-sm font-semibold text-primary-container hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </section>
    </>
  );
}
