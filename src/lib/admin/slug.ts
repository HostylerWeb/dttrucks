import slugify from "slugify";

export function slugFromTitle(title: string) {
  return slugify(title, { lower: true, strict: true });
}
