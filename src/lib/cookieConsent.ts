// Shared between CookieConsent.tsx (which writes this key) and
// QuickContactWidget.tsx (which reads it to avoid overlapping the banner
// while it's still visible).
export const COOKIE_CONSENT_STORAGE_KEY = 'gp-cookie-consent';

export function hasCookieConsentDecision(): boolean {
  if (typeof window === 'undefined') return true;
  const stored = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  return stored === 'accepted' || stored === 'declined';
}
