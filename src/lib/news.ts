import { sanityClient, isSanityConfigured } from '@/lib/sanity/client';
import { newsByLocaleQuery, newsBySlugQuery } from '@/lib/sanity/queries';

export type FallbackNewsItem = {
  slug: string;
  newsType: string;
  date: string;
  title: string;
  excerpt: string;
  body: string[];
};

export type SanityNewsItem = {
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  newsType?: string;
  mainImage?: string;
  body?: unknown;
};

export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  newsType: string;
  mainImage?: string | null;
  source: 'sanity' | 'fallback';
  body?: unknown;
};

function fromFallback(n: FallbackNewsItem): NewsItem {
  return {
    slug: n.slug,
    title: n.title,
    excerpt: n.excerpt,
    date: n.date,
    newsType: n.newsType,
    source: 'fallback',
    body: n.body,
  };
}

function fromSanity(n: SanityNewsItem): NewsItem {
  return {
    slug: n.slug,
    title: n.title,
    excerpt: n.excerpt ?? '',
    date: n.publishedAt
      ? new Date(n.publishedAt).toLocaleDateString('uk-UA', {
          month: 'long',
          year: 'numeric',
        })
      : '',
    newsType: n.newsType ?? 'firm-news',
    mainImage: n.mainImage ?? null,
    source: 'sanity',
    body: n.body,
  };
}

export async function getAllNews(
  locale: string,
  fallbackNews: FallbackNewsItem[],
): Promise<NewsItem[]> {
  if (isSanityConfigured && sanityClient) {
    try {
      const news = await sanityClient.fetch<SanityNewsItem[]>(
        newsByLocaleQuery,
        { locale },
      );
      if (news && news.length > 0) return news.map(fromSanity);
    } catch (err) {
      console.error('Sanity fetch failed, falling back to seed news', err);
    }
  }
  return fallbackNews.map(fromFallback);
}

export async function getNewsBySlug(
  slug: string,
  locale: string,
  fallbackNews: FallbackNewsItem[],
): Promise<NewsItem | null> {
  if (isSanityConfigured && sanityClient) {
    try {
      const item = await sanityClient.fetch<SanityNewsItem | null>(
        newsBySlugQuery,
        { slug, locale },
      );
      if (item) return fromSanity(item);
    } catch (err) {
      console.error('Sanity fetch failed, falling back to seed news', err);
    }
  }
  const fallback = fallbackNews.find((n) => n.slug === slug);
  return fallback ? fromFallback(fallback) : null;
}
