import { parseCabColours, type CabColour } from "@/lib/trucks/cab-colours";

export function CabColoursBand({
  colours,
  title = "Available cab colours",
  note,
}: {
  colours: CabColour[];
  title?: string;
  note?: string;
}) {
  if (colours.length === 0) return null;

  return (
    <div className="rounded-xl border border-outline-variant bg-surface-container-low p-5 sm:p-6">
      <h2 className="font-headline text-lg font-semibold mb-2">{title}</h2>
      {note && <p className="text-sm text-secondary mb-4 leading-relaxed">{note}</p>}
      <ul className="flex flex-wrap gap-3">
        {colours.map((colour) => (
          <li
            key={colour.name}
            className="flex items-center gap-2 rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm"
          >
            <span
              className="h-6 w-6 shrink-0 rounded-full border border-black/10"
              style={{ backgroundColor: colour.hex ?? "#e5e7eb" }}
              aria-hidden
            />
            <span className="font-medium">{colour.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CabColoursFromJson({
  cabColoursJson,
  ...props
}: {
  cabColoursJson?: string | null;
  title?: string;
  note?: string;
}) {
  return <CabColoursBand colours={parseCabColours(cabColoursJson)} {...props} />;
}
