/** Official Isuzu UK spec sheet PDFs (dealer reference). Update when Isuzu publish new sheets. */
export const ISUZU_SPEC_BASE = "https://www.isuzutruck.co.uk/wp-content/uploads";

export const defaultSpecSheetsByModelCode: Record<
  string,
  { label: string; url: string }
> = {
  "N35.125": {
    label: "N35.125 Grafter Chassis Spec Sheet",
    url: `${ISUZU_SPEC_BASE}/Isuzu-Spec-Sheet-Grafter-N35_125-OBD-E-09-2023.pdf`,
  },
  "N35.150": {
    label: "N35.150 Grafter Chassis Spec Sheet",
    url: `${ISUZU_SPEC_BASE}/Isuzu-Spec-Sheet-Grafter-N35_150-OBD-E-09-2023.pdf`,
  },
  "N55.150": {
    label: "N55.150N Manual Chassis Spec Sheet",
    url: `${ISUZU_SPEC_BASE}/Isuzu-Spec-Sheet-Forward-N55_150N-OBD-E-09-2023.pdf`,
  },
  "N65.150": {
    label: "N65.150 Manual Chassis Spec Sheet",
    url: `${ISUZU_SPEC_BASE}/Isuzu-Spec-Sheet-Forward-N65_150-OBD-E-09-2023.pdf`,
  },
  "N75.150": {
    label: "N75.150 Manual Chassis Spec Sheet",
    url: `${ISUZU_SPEC_BASE}/Isuzu-Spec-Sheet-Forward-N75_150-OBD-E-09-2023.pdf`,
  },
  "N75.190": {
    label: "N75.190 Manual Chassis Spec Sheet",
    url: `${ISUZU_SPEC_BASE}/Isuzu-Spec-Sheet-Forward-N75_190-OBD-E-09-2023.pdf`,
  },
  "F110.240": {
    label: "F110.240 Manual Chassis Spec Sheet",
    url: `${ISUZU_SPEC_BASE}/Isuzu-Spec-Sheet-F110_240_Chassis-Cab-2025.pdf`,
  },
  "F135.240": {
    label: "F135.240 Easy Shift AMT Chassis Spec Sheet",
    url: `${ISUZU_SPEC_BASE}/Isuzu-Spec-Sheet-F135_240-Easy-Shift-AMT-OBD-E-09-2023.pdf`,
  },
};

export const isuzuBrochureLinks = [
  {
    label: "Isuzu N-Series Brochure 2026",
    url: `${ISUZU_SPEC_BASE}/Isuzu-Truck-N-Series-Brochure-2026.pdf`,
  },
  {
    label: "Isuzu F-Series Brochure 2026",
    url: `${ISUZU_SPEC_BASE}/Isuzu-Truck-F-Series-Brochure-2026.pdf`,
  },
  {
    label: "Isuzu Truck UK range brochures (downloads page)",
    url: "https://www.isuzutruck.co.uk/downloads/",
  },
] as const;
