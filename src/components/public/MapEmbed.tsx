import { cn } from "@/lib/utils";

const defaultShellClass =
  "relative w-full overflow-hidden rounded-xl border border-outline-variant shadow-industrial";

export function MapEmbed({
  embedUrl,
  address,
  title = "DT Trucks location",
  className,
}: {
  embedUrl?: string | null;
  address?: string | null;
  title?: string;
  className?: string;
}) {
  const resolvedUrl =
    embedUrl ||
    (address
      ? `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`
      : null);

  if (!resolvedUrl) {
    return (
      <div
        className={cn(
          defaultShellClass,
          "flex aspect-[4/3] lg:aspect-auto lg:h-[480px] items-center justify-center bg-surface-container text-secondary text-sm",
          className
        )}
      >
        Map embed URL not configured
      </div>
    );
  }

  return (
    <div
      className={cn(
        defaultShellClass,
        "aspect-[4/3] lg:aspect-auto lg:h-[480px] min-h-[240px]",
        className
      )}
    >
      <iframe
        src={resolvedUrl}
        title={title}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
