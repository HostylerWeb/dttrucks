export const COOKIE_CONSENT_KEY = "dttrucks-cookie-consent";
export const COOKIE_CONSENT_EVENT = "dttrucks-cookie-consent";

export function hasCookieConsent(): boolean {
  if (typeof window === "undefined") return true;
  return Boolean(localStorage.getItem(COOKIE_CONSENT_KEY));
}
