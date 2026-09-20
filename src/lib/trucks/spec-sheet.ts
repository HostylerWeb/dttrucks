import { defaultSpecSheetsByModelCode } from "@/content/isuzu-spec-links";

type SpecSheetModel = {
  spec_sheet_url?: string | null;
  spec_sheet_label?: string | null;
  model_code?: string | null;
};

export function resolveSpecSheet(
  model: SpecSheetModel
): { url: string; label: string } | null {
  if (model.spec_sheet_url) {
    return {
      url: model.spec_sheet_url,
      label: model.spec_sheet_label?.trim() || "Download specification sheet",
    };
  }

  const code = model.model_code?.trim();
  if (code && defaultSpecSheetsByModelCode[code]) {
    return defaultSpecSheetsByModelCode[code];
  }

  return null;
}
