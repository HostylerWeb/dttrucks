import Image from "next/image";

export function EbayListingCard({
  title,
  priceDisplay,
  imageUrl,
  ebayUrl,
}: {
  title: string;
  priceDisplay?: string | null;
  imageUrl?: string | null;
  ebayUrl: string;
}) {
  return (
    <article className="rounded-xl border border-outline-variant bg-white shadow-industrial overflow-hidden flex flex-col">
      <a
        href={ebayUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block aspect-[16/9] overflow-hidden bg-surface-container relative"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-outline-variant" aria-hidden>
              sell
            </span>
          </div>
        )}
      </a>
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {priceDisplay && (
          <p className="text-sm font-bold text-primary-container">{priceDisplay}</p>
        )}
        <h3 className="mt-1 font-headline text-base sm:text-lg font-semibold leading-snug">
          <a
            href={ebayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-container"
          >
            {title}
          </a>
        </h3>
        <a
          href={ebayUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-sm font-semibold text-primary-container hover:underline"
        >
          View on eBay →
        </a>
      </div>
    </article>
  );
}
