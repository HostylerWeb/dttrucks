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
        className={
          className ??
          "flex aspect-video items-center justify-center rounded-xl border border-outline-variant bg-surface-container text-secondary text-sm"
        }
      >
        Map embed URL not configured
      </div>
    );
  }

  return (
    <div className={className ?? "aspect-video rounded-xl overflow-hidden border border-outline-variant shadow-industrial"}>
      <iframe
        src={resolvedUrl}
        title={title}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
