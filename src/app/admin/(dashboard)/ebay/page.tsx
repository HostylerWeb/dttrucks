import { format } from "date-fns";
import { getAllSettings } from "@/lib/db/settings";
import {
  getEbayListingCount,
  getEbayListingsForAdmin,
} from "@/lib/db/ebay";
import { defaultEbayStoreUrl } from "@/lib/ebay/scrape";
import { syncEbayListingsFromProfile } from "@/lib/ebay/sync";
import { requireRead } from "@/lib/admin/session";
import { hasPermission } from "@/lib/permissions";
import { cacheTags } from "@/lib/admin/revalidate";
import { PageHeader } from "@/components/admin/page-header";
import { DataTable } from "@/components/admin/data-table";
import { EbaySyncButton } from "@/components/admin/ebay-sync-button";

export default async function EbayAdminPage() {
  const session = await requireRead();
  const canWrite = hasPermission(session.user.role, "write");

  let count = await getEbayListingCount();
  let autoSynced = false;
  let autoSyncError: string | null = null;

  if (count === 0 && canWrite) {
    try {
      await syncEbayListingsFromProfile();
      cacheTags.ebayListings();
      autoSynced = true;
      count = await getEbayListingCount();
    } catch (error) {
      autoSyncError =
        error instanceof Error ? error.message : "Initial eBay sync failed.";
    }
  }

  const listings = await getEbayListingsForAdmin();
  const settings = await getAllSettings();
  const sellerId = settings.ebay_seller_username ?? "dt-trucks-isuzu";
  const storeUrl =
    settings.ebay_store_url?.trim() || defaultEbayStoreUrl(sellerId);

  const lastSynced = listings.reduce<Date | null>((latest, listing) => {
    if (!listing.last_synced_at) return latest;
    if (!latest || listing.last_synced_at > latest) return listing.last_synced_at;
    return latest;
  }, null);

  return (
    <div>
      <PageHeader
        title="eBay Listings"
        description="Listings synced from the DT Trucks eBay seller profile (via Auction Nudge feed)."
        actions={canWrite ? <EbaySyncButton /> : undefined}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-outline-variant bg-white p-4">
          <p className="text-sm text-secondary">Active listings</p>
          <p className="mt-1 font-headline text-2xl font-bold">{listings.length}</p>
        </div>
        <div className="rounded-xl border border-outline-variant bg-white p-4">
          <p className="text-sm text-secondary">eBay seller</p>
          <p className="mt-1 font-semibold">{sellerId}</p>
        </div>
        <div className="rounded-xl border border-outline-variant bg-white p-4">
          <p className="text-sm text-secondary">Store profile</p>
          <a
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-sm font-semibold text-primary-container hover:underline"
          >
            View on eBay
          </a>
        </div>
        <div className="rounded-xl border border-outline-variant bg-white p-4">
          <p className="text-sm text-secondary">Last synced</p>
          <p className="mt-1 font-semibold">
            {lastSynced ? format(lastSynced, "dd MMM yyyy HH:mm") : "Not yet synced"}
          </p>
        </div>
      </div>

      {autoSynced && (
        <p className="mb-4 text-sm text-green-700">
          Initial sync completed — {count} listings imported from eBay.
        </p>
      )}
      {autoSyncError && (
        <p className="mb-4 text-sm text-primary">
          {autoSyncError} Use the update button to retry, or set the seller username in Settings.
        </p>
      )}

      <p className="mb-6 text-sm text-secondary max-w-3xl">
        The live website uses Auction Nudge with seller{" "}
        <strong className="text-on-surface">dt-trucks-isuzu</strong>. This dashboard pulls the same
        active listings and stores them for the public eBay page. Change the seller username or store
        URL under Settings if needed.
      </p>

      <DataTable
        columns={[
          { key: "image", label: "Image" },
          { key: "title", label: "Title" },
          { key: "price", label: "Price" },
          { key: "ebay", label: "eBay ID" },
          { key: "synced", label: "Last synced" },
        ]}
        rows={listings.map((listing) => ({
          id: listing.id,
          cells: {
            image: listing.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={listing.image_url}
                alt=""
                className="h-12 w-12 rounded object-cover border border-outline-variant"
              />
            ) : (
              "—"
            ),
            title: (
              <a
                href={listing.ebay_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary-container hover:underline"
              >
                {listing.title}
              </a>
            ),
            price: listing.price_display ?? "—",
            ebay: listing.ebay_item_id,
            synced: listing.last_synced_at
              ? format(listing.last_synced_at, "dd MMM yyyy HH:mm")
              : "—",
          },
        }))}
      />
    </div>
  );
}
