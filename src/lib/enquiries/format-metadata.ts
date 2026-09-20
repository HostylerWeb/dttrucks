export function formatEnquiryMetadataLines(
  metadata: Record<string, unknown> | null | undefined
): string[] {
  if (!metadata || Object.keys(metadata).length === 0) return [];

  if (metadata.enquiry_kind === "body_quote") {
    const lines: string[] = ["Body specification quote"];
    if (metadata.chassis_model) lines.push(`Chassis: ${metadata.chassis_model}`);
    if (metadata.body_type) lines.push(`Body type: ${metadata.body_type}`);
    const dimensions = metadata.dimensions;
    if (dimensions && typeof dimensions === "object") {
      const d = dimensions as Record<string, unknown>;
      const parts = [
        d.length_m ? `length ${d.length_m}m` : null,
        d.width_m ? `width ${d.width_m}m` : null,
        d.height_m ? `height ${d.height_m}m` : null,
      ].filter(Boolean);
      if (parts.length) lines.push(`Dimensions: ${parts.join(", ")}`);
    }
    if (metadata.payload_notes) lines.push(`Payload / load: ${metadata.payload_notes}`);
    const options = metadata.options;
    if (Array.isArray(options) && options.length) {
      lines.push(`Options: ${options.join(", ")}`);
    }
    return lines;
  }

  return Object.entries(metadata)
    .filter(([, value]) => value !== null && value !== undefined && value !== "")
    .map(([key, value]) => `${key}: ${typeof value === "object" ? JSON.stringify(value) : String(value)}`);
}

export function parseEnquiryMetadata(raw: string | null): Record<string, unknown> | null {
  if (!raw?.trim()) return null;
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}
