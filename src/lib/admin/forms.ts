import { z } from "zod";

export const contentStatusSchema = z.enum(["draft", "published", "archived"]);

export const slugSchema = z
  .string()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens");

export function parseFormData<T extends z.ZodType>(schema: T, formData: FormData) {
  const data: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (key in data) {
      const existing = data[key];
      if (Array.isArray(existing)) {
        existing.push(value);
      } else {
        data[key] = [existing, value];
      }
    } else {
      data[key] = value;
    }
  }
  return schema.safeParse(data);
}

export function checkboxValue(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1";
}
