import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { practiceSlugs } from '@/data/practices';
import { blogFallbackSlugs } from '@/data/blogSlugs';
import { newsFallbackSlugs } from '@/data/newsSlugs';
import { siteUrl } from '@/lib/site';

// Builds a locale-prefixed path matching next-intl's `localePrefix: 'as-needed'`
// routing (default locale "uk" has no prefix, others do).
function localizedPath(locale: string, path: string): string {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${prefix}${path}` || '/';
}

// Ukrainian-only pages added per the SEO brief (new /virtual-assets/,
// /team/viacheslav-gangan/, /research/, /media/, /reports/ pillar pages —
// English/German/French are an explicit "stage 2" there, so these only
// exist for the default locale and get a single sitemap entry each, not one
// per locale like the rest of the site).
const ukOnlyPaths = [
  '/virtual-assets',
  '/virtual-assets/criminal-defence',
  '/virtual-assets/eu-market-entry-mica',
  '/team/viacheslav-gangan',
  '/research',
  '/media',
  '/reports',
  '/reports/digital-assets-cross-border-2026',
  '/editorial-policy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['/', '/about', '/team', '/blog', '/news', '/calculator', '/intake', '/faq', '/wallet-check', '/document-notary', '/confidential'];
  const practicePaths = practiceSlugs.map((slug) => `/practices/${slug}`);
  const blogPostPaths = blogFallbackSlugs.map((slug) => `/blog/${slug}`);
  const newsItemPaths = newsFallbackSlugs.map((slug) => `/news/${slug}`);
  const allPaths = [...staticPaths, ...practicePaths, ...blogPostPaths, ...newsItemPaths];

  const entries: MetadataRoute.Sitemap = [];

  for (const path of allPaths) {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] = `${siteUrl}${localizedPath(locale, path)}`;
    }

    for (const locale of routing.locales) {
      entries.push({
        url: `${siteUrl}${localizedPath(locale, path)}`,
        lastModified: new Date(),
        changeFrequency: path === '/' ? 'weekly' : 'monthly',
        priority:
          path === '/'
            ? 1
            : path.startsWith('/blog/') || path.startsWith('/practices/') || path.startsWith('/news/')
              ? 0.7
              : 0.5,
        alternates: { languages },
      });
    }
  }

  for (const path of ukOnlyPaths) {
    entries.push({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: path === '/virtual-assets' || path.startsWith('/reports/') ? 0.8 : 0.6,
    });
  }

  return entries;
}
