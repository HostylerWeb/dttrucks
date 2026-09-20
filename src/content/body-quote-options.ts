export const bodyTypes = [
  { value: "box", label: "Box body" },
  { value: "curtainsider", label: "Curtainsider" },
  { value: "tipper", label: "Tipper" },
  { value: "beavertail", label: "Beavertail" },
  { value: "arb_tipper", label: "Arb tipper" },
  { value: "dropside", label: "Dropside" },
  { value: "fridge", label: "Fridge body" },
  { value: "freezer", label: "Freezer body" },
  { value: "dual_temp", label: "Dual temperature" },
  { value: "utilitruck", label: "Utilitruck / platform" },
  { value: "recovery", label: "Recovery / plant" },
  { value: "other", label: "Other (describe in message)" },
] as const;

export const bodyQuoteOptions = [
  { value: "tail_lift", label: "Tail lift" },
  { value: "crane", label: "Crane / hiab" },
  { value: "toolbox", label: "Toolboxes / storage" },
  { value: "beacon", label: "Beacon / chapter 8 kit" },
  { value: "fridge_unit", label: "Fridge unit (stand-alone)" },
  { value: "crew_seats", label: "Additional crew seats" },
  { value: "towbar", label: "Towbar / towing equipment" },
  { value: "graphics", label: "Signwriting / graphics" },
] as const;

export type BodyTypeValue = (typeof bodyTypes)[number]["value"];
export type BodyQuoteOptionValue = (typeof bodyQuoteOptions)[number]["value"];
