// Slugs of the seed/fallback blog posts (messages/*.json -> Blog.fallbackPosts).
// Shared between generateStaticParams (blog/[slug]) and sitemap.ts. Posts
// added later in Sanity are still reachable/indexed once Sanity is the
// active source — see src/lib/blog.ts.
export const blogFallbackSlugs = [
  'fatf-vymohy-2025',
  'defi-shakhraystvo-povernennya-koshtiv',
  'st-209-praktyka-zahystu',
  'kiberpolitsiya-fishyng-2025',
] as const;
