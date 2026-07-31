import type { Metadata } from "next";
import { getAllSettings } from "@/lib/db/settings";
import { getEbayListings } from "@/lib/db/ebay";
import { defaultEbayStoreUrl } from "@/lib/ebay/scrape";
import { buildStaticPageMetadata, staticMetadata } from "@/lib/metadata";
import { HeroSection } from "@/components/public/HeroSection";
import { BreadcrumbsBar } from "@/components/layout/BreadcrumbsBar";
import { EbayListingCard } from "@/components/public/EbayListingCard";
import { CTABanner } from "@/components/public/CTABanner";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata(
    staticMetadata.ebay.title,
    staticMetadata.ebay.description,
    "/ebay"
  );
}

export default async function EbayPage() {
  const [settings, listings] = await Promise.all([getAllSettings(), getEbayListings()]);

  const sellerId = settings.ebay_seller_username ?? "dt-trucks-isuzu";
  const storeUrl =
    settings.ebay_store_url?.trim() ||
    process.env.EBAY_STORE_URL?.trim() ||
    defaultEbayStoreUrl(sellerId);

  return (
    <>
      <BreadcrumbsBar items={[{ label: "Home", href: "/" }, { label: "eBay Listings" }]} />

      <HeroSection
        title="eBay Listings"
        subtitle="Isuzu Trucks & Parts for sale!"
        subtitleTag="h2"
        minHeight="min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]"
        ctas={[
          { label: "Visit eBay store", href: storeUrl, variant: "primary" },
          { label: "Contact sales", href: "/contact", variant: "secondary" },
        ]}
      />

      <section className="page-section page-container">
        {listings.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <li key={listing.id}>
                <EbayListingCard
                  title={listing.title}
                  priceDisplay={listing.price_display}
                  imageUrl={listing.image_url}
                  ebayUrl={listing.ebay_url}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border border-outline-variant bg-white p-8 text-center shadow-industrial max-w-2xl mx-auto">
            <p className="text-secondary">
              Listings are being prepared. Browse our eBay store directly or contact us for parts
              availability.
            </p>
            <a
              href={storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-semibold text-primary-container hover:underline"
            >
              Open eBay store →
            </a>
          </div>
        )}

        <p className="mt-10 text-sm text-secondary max-w-3xl">
          Listings are synced from our eBay seller profile (
          <a
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary-container hover:underline"
          >
            {sellerId}
          </a>
          ). For sales enquiries,{" "}
          <a href="/contact" className="font-semibold text-primary-container hover:underline">
            contact our team
          </a>
          .
        </p>
      </section>

      <CTABanner
        title="Interested in a new Isuzu truck?"
        description="Browse our sales range or speak to George Smith about fleet and driveaway options."
        buttonLabel="Isuzu Truck Sales"
        buttonHref="/sales"
        variant="dark"
      />
    </>
  );
}
