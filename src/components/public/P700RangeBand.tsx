import Link from "next/link";

const P700_BLOG_SLUG = "p700-isuzu-range-at-dt-trucks";

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
            <p className="text-xs font-bold uppercase tracking-widest text-primary-container mb-2">
              P700 generation
            </p>
            <h2 className="font-headline text-xl sm:text-2xl font-bold text-on-background">
              The latest Isuzu N-Series and F-Series range
            </h2>
            <p className="mt-3 text-secondary text-sm sm:text-base leading-relaxed">
              Updated cabs, advanced safety kit, 175&nbsp;PS with ISIM on 7.5t, crew cab options and
              clearer 11t and 13.5t F-Series choices — spec the right chassis for London, Essex and
              beyond from our Barking dealership.
            </p>
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
                Read the P700 overview
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
