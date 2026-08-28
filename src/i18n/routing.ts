import { defineRouting } from 'next-intl/routing';

export const locales = ['uk', 'en', 'de', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  uk: 'UA',
  en: 'EN',
  de: 'DE',
  fr: 'FR',
};

export const routing = defineRouting({
  locales,
  defaultLocale: 'uk',
  localePrefix: 'as-needed',
  // Ukrainian must load by default for visitors in Ukraine regardless of
  // browser/Accept-Language settings (Law "On ensuring the functioning of
  // Ukrainian as the state language", Art. 27(6) — the Ukrainian version
  // must be the default users land on, not just "a" version). next-intl's
  // default browser-based `localeDetection` was silently redirecting
  // English/German/French-browser visitors to /en, /de, /fr on their very
  // first visit, before they ever touched the language switcher — verified
  // live via Accept-Language-header fetches during the 2026-08-28 audit.
  // Disabling it means every fresh visit renders Ukrainian; switching
  // locale remains fully available via LanguageSwitcher, which sets its own
  // cookie through next-intl's router.
  localeDetection: false,
});
