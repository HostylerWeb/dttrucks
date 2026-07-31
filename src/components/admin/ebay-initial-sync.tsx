"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { syncEbayListingsAction } from "@/app/admin/(dashboard)/ebay/actions";

/** Runs first-time eBay import via server action (revalidation must not happen during RSC render). */
export function EbayInitialSync() {
  const router = useRouter();
  const started = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    syncEbayListingsAction()
      .then(() => router.refresh())
      .catch((err) => {
        setError(
          err instanceof Error ? err.message : "Initial eBay sync failed."
        );
      });
  }, [router]);

  if (error) {
    return (
      <p className="mb-4 text-sm text-primary">
        {error} Use the update button to retry, or set the seller username in Settings.
      </p>
    );
  }

  return <p className="mb-4 text-sm text-secondary">Importing listings from eBay…</p>;
}
