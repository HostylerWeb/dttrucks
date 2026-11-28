"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog } from "@/components/ui/dialog";

export type GalleryImage = {
  url: string;
  alt?: string;
};

export function ImageGallery({
  images,
  single = "grid",
}: {
  images: GalleryImage[];
  /** One photo on a product page should fill the column, not sit in a 3-up thumbnail. */
  single?: "grid" | "feature";
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const active = lightboxIndex !== null ? images[lightboxIndex] : null;

  if (images.length === 0) return null;

  return (
    <>
      <div
        className={
          images.length === 1 && single === "feature"
            ? "grid"
            : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {images.map((image, index) => {
          const featured = images.length === 1 && single === "feature";
          return (
            <button
              key={image.url}
              type="button"
              className="relative aspect-[4/3] overflow-hidden rounded-xl border border-outline-variant bg-surface-container group"
              onClick={() => setLightboxIndex(index)}
              aria-label={image.alt ? `View image: ${image.alt}` : `View image ${index + 1}`}
            >
              <div className={featured ? "absolute inset-4" : "absolute inset-0"}>
                <Image
                  src={image.url}
                  alt={image.alt ?? ""}
                  fill
                  className={
                    featured
                      ? "object-contain object-center"
                      : "object-cover transition-transform group-hover:scale-105"
                  }
                  sizes={
                    featured
                      ? "(max-width: 1024px) 100vw, 50vw"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  }
                />
              </div>
            </button>
          );
        })}
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
