"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog } from "@/components/ui/dialog";

export type GalleryImage = {
  url: string;
  alt?: string;
};

export function ImageGallery({ images }: { images: GalleryImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const active = lightboxIndex !== null ? images[lightboxIndex] : null;

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image.url}
            type="button"
            className="relative aspect-[4/3] overflow-hidden rounded-xl border border-outline-variant bg-surface-container group"
            onClick={() => setLightboxIndex(index)}
            aria-label={image.alt ? `View image: ${image.alt}` : `View image ${index + 1}`}
          >
            <Image
              src={image.url}
              alt={image.alt ?? ""}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>
      <Dialog
        open={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        className="max-w-4xl p-0 bg-transparent border-0 shadow-none"
      >
        {active && (
          <div className="relative aspect-video w-full max-h-[80vh] rounded-xl overflow-hidden bg-black">
            <Image
              src={active.url}
              alt={active.alt ?? ""}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        )}
      </Dialog>
    </>
  );
}
