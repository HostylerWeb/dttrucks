/** E.164-style digits for wa.me (UK numbers starting with 0 → 44…). */
export function phoneToWhatsAppDigits(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("44")) return digits;
  if (digits.startsWith("0")) return `44${digits.slice(1)}`;
  return digits;
}

export function buildTelHref(phone: string): string {
  const normalized = phone.replace(/[^\d+]/g, "");
  return `tel:${normalized}`;
}

export function buildWhatsAppHref(phone: string, message?: string): string {
  const digits = phoneToWhatsAppDigits(phone);
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function buildMailtoHref(
  email: string,
  options?: { subject?: string; body?: string }
): string {
  const trimmed = email.trim();
  if (!trimmed) return "mailto:";

  const parts: string[] = [];
  if (options?.subject) {
    parts.push(`subject=${encodeURIComponent(options.subject)}`);
  }
  if (options?.body) {
    parts.push(`body=${encodeURIComponent(options.body)}`);
  }
  return parts.length > 0 ? `mailto:${trimmed}?${parts.join("&")}` : `mailto:${trimmed}`;
}
