import { sanityClient, isSanityConfigured } from '@/lib/sanity/client';
import { postsByLocaleQuery, postBySlugQuery } from '@/lib/sanity/queries';

export type FallbackPost = {
  slug: string;
  category: string;
  mono: string;
  date: string;
  title: string;
  excerpt: string;
  body: string[];
};

export type SanityPost = {
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  category?: string;
  categoryLabel?: string;
  mainImage?: string;
  author?: string;
  body?: unknown;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  mono?: string;
  mainImage?: string | null;
  source: 'sanity' | 'fallback';
  body?: unknown;
};

function fromFallback(p: FallbackPost): BlogPost {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    category: p.category,
    mono: p.mono,
    source: 'fallback',
    body: p.body,
  };
}

function fromSanity(p: SanityPost): BlogPost {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? '',
    date: p.publishedAt
      ? new Date(p.publishedAt).toLocaleDateString('uk-UA', {
          month: 'long',
          year: 'numeric',
        })
      : '',
    category: p.category ?? '',
    mainImage: p.mainImage ?? null,
    source: 'sanity',
    body: p.body,
  };
}

export async function getAllPosts(
  locale: string,
  fallbackPosts: FallbackPost[],
): Promise<BlogPost[]> {
  if (isSanityConfigured && sanityClient) {
    try {
      const posts = await sanityClient.fetch<SanityPost[]>(
        postsByLocaleQuery,
        { locale },
      );
      if (posts && posts.length > 0) return posts.map(fromSanity);
    } catch (err) {
      console.error('Sanity fetch failed, falling back to seed posts', err);
    }
  }
  return fallbackPosts.map(fromFallback);
}

export async function getPostBySlug(
  slug: string,
  locale: string,
  fallbackPosts: FallbackPost[],
): Promise<BlogPost | null> {
  if (isSanityConfigured && sanityClient) {
    try {
      const post = await sanityClient.fetch<SanityPost | null>(
        postBySlugQuery,
        { slug, locale },
      );
      if (post) return fromSanity(post);
    } catch (err) {
      console.error('Sanity fetch failed, falling back to seed posts', err);
    }
  }
  const fallback = fallbackPosts.find((p) => p.slug === slug);
  return fallback ? fromFallback(fallback) : null;
}
