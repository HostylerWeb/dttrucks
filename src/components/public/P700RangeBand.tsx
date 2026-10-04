import Link from "next/link";

const P700_BLOG_SLUG = "p700-isuzu-range-at-dt-trucks";

const P700_LEAD =
  "The P700 generation brings updated N-Series and F-Series cabs, advanced safety equipment and air conditioning as standard. The Isuzu 7.5 tonne 3.0 Litre range has an additional 175 PS option. Both 150 and 175 have the option of the new Isim 9 speed transmission system which is a 9-speed dual clutch, automated transmission system. — spec the right truck from our Barking dealership.";

export function P700RangeBand({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className={
        compact
          ? "border-y border-outline-variant bg-white page-section !py-10"
          : "border-y border-outline-variant bg-surface-container-low page-section"
      }
    >
      <div className="page-container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">
              Commercial Vehicle News · 20 March 2026
            </p>
            <h2 className="font-headline text-xl sm:text-2xl font-bold text-on-background">
              P700 Isuzu range — what&apos;s new at DT Trucks
            </h2>
            <p className="mt-3 text-secondary text-sm sm:text-base leading-relaxed">{P700_LEAD}</p>
          </div>
          <ul className="flex flex-col sm:flex-row flex-wrap gap-3 shrink-0">
            <li>
              <Link
                href="/sales/specification-sheets"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary-container px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary transition-colors"
              >
                Specification sheets
              </Link>
            </li>
            <li>
              <Link
                href="/sales/body-quote"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-outline-variant bg-white px-5 py-2.5 text-sm font-semibold text-on-background hover:border-primary-container/40 transition-colors"
              >
                Body quote request
              </Link>
            </li>
            <li>
              <Link
                href={`/blog/${P700_BLOG_SLUG}`}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-transparent px-5 py-2.5 text-sm font-semibold text-primary-container hover:underline"
              >
                Read the full article
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
