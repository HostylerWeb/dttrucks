import { defaultSpecSheetsByModelCode } from "@/content/isuzu-spec-links";

type SpecSheetModel = {
  spec_sheet_url?: string | null;
  spec_sheet_label?: string | null;
  model_code?: string | null;
};

/** Isuzu UK retired many wp-content/uploads PDFs; ignore stored URLs that still point there. */
export function isLegacyIsuzuSpecSheetUrl(url: string): boolean {
  try {
    const { hostname, pathname } = new URL(url);
    return (
      hostname.endsWith("isuzutruck.co.uk") &&
      pathname.includes("/wp-content/uploads/")
    );
  } catch {
    return false;
  }
}

export function resolveSpecSheet(
  model: SpecSheetModel
): { url: string; label: string } | null {
  const code = model.model_code?.trim();
  const defaultSheet =
    code && defaultSpecSheetsByModelCode[code]
      ? defaultSpecSheetsByModelCode[code]
      : null;

  const storedUrl = model.spec_sheet_url?.trim();
  if (storedUrl && !isLegacyIsuzuSpecSheetUrl(storedUrl)) {
    return {
      url: storedUrl,
      label: model.spec_sheet_label?.trim() || defaultSheet?.label || "Download specification sheet",
    };
  }

  if (defaultSheet) {
    return defaultSheet;
  }

  return null;
}
