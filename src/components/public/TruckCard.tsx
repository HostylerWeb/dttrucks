import Link from "next/link";
import Image from "next/image";

export function TruckCard({
  name,
  description,
  href,
  imageUrl,
  badge,
}: {
  name: string;
  description?: string | null;
  href: string;
  imageUrl?: string | null;
  badge?: string | null;
}) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-xl border border-outline-variant bg-white shadow-industrial"
    >
      <div className="aspect-[4/3] bg-surface-container relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-secondary text-sm">
            Truck image
          </div>
        )}
        {badge && (
          <span className="absolute top-3 left-3 rounded-full bg-primary-container px-3 py-1 text-xs font-semibold text-white">
            {badge}
          </span>
        )}
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="font-headline font-semibold text-base sm:text-lg group-hover:text-primary-container leading-snug">
          {name}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-secondary line-clamp-2">{description}</p>
        )}
      </div>
    </Link>
  );
}
