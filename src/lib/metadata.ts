import { routing } from '@/i18n/routing';
import { siteUrl, siteName } from './site';

// Builds a locale-prefixed path matching next-intl's `localePrefix: 'as-needed'`
// routing (default locale has no prefix, others do). Mirrors app/sitemap.ts.
export function localizedPath(locale: string, path: string): string {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${prefix}${path}` || '/';
}

export function localizedUrl(locale: string, path: string): string {
  return `${siteUrl}${localizedPath(locale, path)}`;
}

/**
 * Canonical + hreflang alternates for a given page, to spread into a
 * page's `Metadata.alternates`.
 */
export function buildAlternates(locale: string, path: string) {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = localizedUrl(l, path);
  }
  languages['x-default'] = localizedUrl(routing.defaultLocale, path);

  return {
    canonical: localizedUrl(locale, path),
    languages,
  };
}

const ogLocaleMap: Record<string, string> = {
  uk: 'uk_UA',
  en: 'en_US',
  de: 'de_DE',
  fr: 'fr_FR',
};

/**
 * Default OpenGraph block for a page, to spread into `Metadata.openGraph`.
 */
export function buildOpenGraph({
  locale,
  path,
  title,
  description,
  type = 'website',
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  type?: 'website' | 'article';
}) {
  return {
    title,
    description,
    url: localizedUrl(locale, path),
    siteName,
    locale: ogLocaleMap[locale] ?? 'en_US',
    type,
    images: [
      {
        url: `${siteUrl}/logo.jpg`,
        width: 1000,
        height: 1000,
        alt: siteName,
      },
    ],
  };
}
