import { resolveSpecSheet } from "@/lib/trucks/spec-sheet";

export function SpecSheetDownloadLink({
  model,
  className = "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary-container px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary transition-colors",
}: {
  model: {
    spec_sheet_url?: string | null;
    spec_sheet_label?: string | null;
    model_code?: string | null;
  };
  className?: string;
}) {
  const sheet = resolveSpecSheet(model);
  if (!sheet) return null;

  const external = sheet.url.startsWith("http");

  return (
    <a
      href={sheet.url}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      download={!external ? true : undefined}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
      </svg>
      {sheet.label}
    </a>
  );
}
