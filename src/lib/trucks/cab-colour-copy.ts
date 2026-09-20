/** George-aligned cab colour notes per GVW tab (until photo gallery exists). */
export function cabColourNoteForCategory(slug: string): string | undefined {
  if (slug === "3-5t-gvw") {
    return "Silver, blue, flint grey and metallic blue are available on Grafter cabs (white is standard). Flint grey has long been offered on the N35 range — confirm current options with sales.";
  }
  if (slug === "11t-gvw" || slug === "13-5t-gvw") {
    return "F-Series adds red cab option on 11t and 13.5t models, alongside silver, blue, flint grey and metallic blue. Confirm availability with sales.";
  }
  if (slug.endsWith("-gvw")) {
    return "Silver, blue, flint grey and metallic blue are available on N-Series cabs in this weight class (white is standard). Confirm with sales.";
  }
  return undefined;
}
