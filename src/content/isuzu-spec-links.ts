/**
 * Official Isuzu Truck UK specification PDFs for the current P700 chassis range.
 * Files are mirrored locally from the manufacturer's current specification sheets so
 * customers are not sent through a third-party flip-book viewer.
 */
export const defaultSpecSheetsByModelCode: Record<
  string,
  { label: string; url: string }
> = {
  "N35.120(S)": {
    label: "N35.120 single manual chassis specification sheet",
    url: "/media/specs/n35-120-s.pdf",
  },
  "N35.120(T)": {
    label: "N35.120 twin manual chassis specification sheet",
    url: "/media/specs/n35-120-t.pdf",
  },
  "N35.120(SA)": {
    label: "N35.120 single automatic chassis specification sheet",
    url: "/media/specs/n35-120-sa.pdf",
  },
  "N35.120(TA)": {
    label: "N35.120 twin automatic chassis specification sheet",
    url: "/media/specs/n35-120-ta.pdf",
  },
  "N55.150": {
    label: "N55.150 manual chassis specification sheet",
    url: "/media/specs/n55-150.pdf",
  },
  "N55.150 AMT": {
    label: "N55.150 ISIM AMT chassis specification sheet",
    url: "/media/specs/n55-150-amt.pdf",
  },
  "N75.150": {
    label: "N75.150 manual chassis specification sheet",
    url: "/media/specs/n75-150.pdf",
  },
  "N75.150 AMT": {
    label: "N75.150 ISIM AMT chassis specification sheet",
    url: "/media/specs/n75-150-amt.pdf",
  },
  "N75.175 AMT": {
    label: "N75.175 ISIM AMT chassis specification sheet",
    url: "/media/specs/n75-175-amt.pdf",
  },
  "N75.190": {
    label: "N75.190 manual chassis specification sheet",
    url: "/media/specs/n75-190.pdf",
  },
  "N75.190 AMT": {
    label: "N75.190 Easy Shift AMT chassis specification sheet",
    url: "/media/specs/n75-190-amt.pdf",
  },
  "F110.240": {
    label: "F110.240 manual chassis specification sheet",
    url: "/media/specs/f110-240.pdf",
  },
  "F110.240 AMT": {
    label: "F110.240 Easy Shift AMT chassis specification sheet",
    url: "/media/specs/f110-240-amt.pdf",
  },
  "F135.240 AMT": {
    label: "F135.240 Easy Shift AMT chassis specification sheet",
    url: "/media/specs/f135-240-amt.pdf",
  },
};

/** Additional factory chassis options that are available but outside the core day-cab list. */
export const isuzuAdditionalSpecSheets = [
  {
    label: "N75.190 Crew Cab manual chassis specification sheet",
    url: "/media/specs/n75-190-crew.pdf",
    gvw: "7.5t",
  },
  {
    label: "N75.190 Crew Cab Easy Shift AMT chassis specification sheet",
    url: "/media/specs/n75-190-crew-amt.pdf",
    gvw: "7.5t",
  },
  {
    label: "F135.240 Easy Shift AMT air suspension chassis specification sheet",
    url: "/media/specs/f135-240-amt-air.pdf",
    gvw: "13.5t",
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
