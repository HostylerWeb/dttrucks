export type CabColour = {
  name: string;
  hex?: string;
  image_url?: string;
  notes?: string;
};

export function parseCabColours(json: string | null | undefined): CabColour[] {
  if (!json?.trim()) return [];
  try {
    const parsed = JSON.parse(json) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CabColour =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as CabColour).name === "string"
    );
  } catch {
    return [];
  }
}
