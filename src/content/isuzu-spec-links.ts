/**
 * Official Isuzu UK spec sheet PDFs — sync from
 * https://www.isuzutruck.co.uk/specification-sheets/ when links break.
 */
/** Closest current Isuzu sheet per DT model code (Isuzu may list N35.120 etc.). */
export const defaultSpecSheetsByModelCode: Record<
  string,
  { label: string; url: string }
> = {
  "N35.125": {
    label: "N35.120 Single Manual Grafter Chassis Spec Sheet",
    url: "https://www.isuzutruck.co.uk/media/nsef2o33/ituk-n35120-single-manual-grafter-chassis-spec-sheet_010926.pdf",
  },
  "N35.150": {
    label: "N35.120 Twin Manual Grafter Chassis Spec Sheet",
    url: "https://www.isuzutruck.co.uk/media/l3ahzhzh/ituk-n35120-twin-manual-grafter-chassis-spec-sheet_010926.pdf",
  },
  "N55.150": {
    label: "N55.150N Manual Chassis Spec Sheet",
    url: "https://www.isuzutruck.co.uk/media/taqdgrux/ituk-n55150n-manual-chassis-spec-sheet_010926.pdf",
  },
  "N65.150": {
    label: "N65.150 Manual Chassis Spec Sheet",
    url: "https://www.isuzutruck.co.uk/media/vjihlwlq/ituk-n65150-manual-chassis-spec-sheet_010926.pdf",
  },
  "N75.150": {
    label: "N75.150 Manual Chassis Spec Sheet",
    url: "https://www.isuzutruck.co.uk/media/kc0pwjlj/ituk-n75150-manual-chassis-spec-sheet_010926.pdf",
  },
  "N75.190": {
    label: "N75.190 Manual Chassis Spec Sheet",
    url: "https://www.isuzutruck.co.uk/media/4zia2x33/ituk-n75190-manual-chassis-spec-sheet_010926.pdf",
  },
  "F110.240": {
    label: "F110.240 Manual Chassis Spec Sheet",
    url: "https://www.isuzutruck.co.uk/media/x4okc0zj/ituk-f110240-manual-chassis-spec-sheet_010926.pdf",
  },
  "F135.240": {
    label: "F135.240 Easy Shift AMT Chassis Spec Sheet",
    url: "https://www.isuzutruck.co.uk/media/jhhjz5ce/ituk-f135240-easy-shift-amt-chassis-spec-sheet_010926.pdf",
  },
};

/** Extra sheets on Isuzu UK hub (shown on our spec page footer section). */
export const isuzuAdditionalSpecSheets = [
  {
    label: "N75.175 ISIM AMT Chassis Spec Sheet",
    url: "https://www.isuzutruck.co.uk/media/q5sj44zo/ituk-n75175-isim-amt-chassis-spec-sheet_010926.pdf",
    gvw: "7.5t",
  },
  {
    label: "N75.190 Easy Shift AMT Chassis Spec Sheet",
    url: "https://www.isuzutruck.co.uk/media/gsufwc51/ituk-n75190-easy-shift-amt-chassis-spec-sheet_010926.pdf",
    gvw: "7.5t",
  },
  {
    label: "F110.240 Easy Shift AMT Chassis Spec Sheet",
    url: "https://www.isuzutruck.co.uk/media/5nrb1gt3/ituk-f110240-easy-shift-amt-chassis-spec-sheet_010926.pdf",
    gvw: "11t",
  },
] as const;

export const isuzuBrochureLinks = [
  {
    label: "Isuzu N-Series range brochure 2026",
    url: "https://www.isuzutruck.co.uk/media/500h2w1p/isuzu_nseries-range_ituk2026.pdf",
  },
  {
    label: "Isuzu F-Series range brochure 2026",
    url: "https://www.isuzutruck.co.uk/media/t4nahrtm/isuzu_fseries-range_ituk2026.pdf",
  },
] as const;
