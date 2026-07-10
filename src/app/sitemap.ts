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

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['/', '/about', '/team', '/blog', '/news', '/calculator', '/intake', '/faq'];
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

  return entries;
}
