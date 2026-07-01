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
});
