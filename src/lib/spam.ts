export function isHoneypotFilled(value: string | null | undefined): boolean {
  return Boolean(value && value.trim().length > 0);
}
