const LEGAL_SLUGS = new Set(["terms-conditions", "conditions-of-sale", "gdpr"]);

export function pagePathFromSlug(slug: string) {
  if (slug === "home") return "/";
  if (LEGAL_SLUGS.has(slug)) return `/legal/${slug}`;
  return `/${slug}`;
}
