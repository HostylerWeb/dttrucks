"use client";

import { useState } from "react";
import { AdminButton } from "@/components/admin/page-header";
import { syncEbayListingsAction } from "@/app/admin/(dashboard)/ebay/actions";

export function EbaySyncButton() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSync() {
    setPending(true);
    setMessage(null);
    setError(null);

    try {
      const result = await syncEbayListingsAction();
      setMessage(
        `Synced ${result.total} listings (${result.added} new, ${result.updated} updated, ${result.removed} removed).`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sync eBay listings.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-2">
      <AdminButton type="button" onClick={handleSync} disabled={pending}>
        {pending ? "Updating from eBay…" : "Update listings from eBay"}
      </AdminButton>
      {message && <p className="text-sm text-green-700">{message}</p>}
      {error && <p className="text-sm text-primary">{error}</p>}
    </div>
  );
}
