"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { inputClassName } from "@/components/admin/form-field";

export type MediaPickerItem = {
  id: string;
  url: string;
  alt_text: string | null;
  filename: string;
};

export function ImageUrlField({
  name,
  label = "Image",
  defaultValue = "",
  media,
  hint,
}: {
  name: string;
  label?: string;
  defaultValue?: string;
  media: MediaPickerItem[];
  hint?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [showUrlField, setShowUrlField] = useState(false);

  const selected = media.find((item) => item.url === url);

  return (
    <div className="space-y-3 rounded-xl border border-outline-variant bg-surface-container-low p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="text-sm font-medium text-on-surface">{label}</label>
        <Link
          href="/admin/media"
          className="text-xs font-semibold text-primary-container hover:underline"
          target="_blank"
        >
          Upload in Media library →
        </Link>
      </div>

      {url ? (
        <div className="flex gap-4 items-start rounded-lg border border-outline-variant bg-white p-3">
          <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-surface-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={selected?.alt_text ?? ""} className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-on-surface truncate">
              {selected?.filename ?? "Custom image URL"}
            </p>
            <p className="mt-1 text-xs text-secondary break-all">{url}</p>
            <button
              type="button"
              onClick={() => setUrl("")}
              className="mt-2 text-xs font-semibold text-primary-container hover:underline"
            >
              Remove image
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-secondary">No image selected - choose from the library below.</p>
      )}

      <input type="hidden" name={name} value={url} />

      {media.length === 0 ? (
        <div className="rounded-lg border border-dashed border-outline-variant bg-white p-6 text-center text-sm text-secondary">
          No images in the library yet.{" "}
          <Link href="/admin/media" className="font-semibold text-primary-container hover:underline">
            Upload images
          </Link>
          first, then pick them here.
        </div>
      ) : (
        <div className="grid max-h-72 grid-cols-2 gap-2 overflow-y-auto rounded-lg border border-outline-variant bg-white p-2 sm:grid-cols-3 md:grid-cols-4">
          {media.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setUrl(item.url)}
              className={cn(
                "rounded-lg border p-1.5 text-left transition-colors hover:border-primary-container",
                url === item.url && "border-primary-container ring-2 ring-primary-container/30"
              )}
            >
              <div className="aspect-video overflow-hidden rounded-md bg-surface-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt="" className="h-full w-full object-cover" />
              </div>
              <span className="mt-1 block truncate text-[11px] text-secondary">{item.filename}</span>
            </button>
          ))}
        </div>
      )}

      <div>
        <button
          type="button"
          onClick={() => setShowUrlField(!showUrlField)}
          className="text-xs font-semibold text-secondary hover:text-primary-container"
        >
          {showUrlField ? "Hide URL field" : "Paste external image URL instead"}
        </button>
        {showUrlField && (
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={cn(inputClassName, "mt-2")}
            placeholder="https://… or /uploads/…"
            aria-label={`${label} URL`}
          />
        )}
      </div>

      {hint && <p className="text-xs text-secondary">{hint}</p>}
    </div>
  );
}
