import { createClient, type SanityClient } from '@sanity/client';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01';

export const isSanityConfigured = Boolean(projectId);

// `sanityClient` is null when no project id is configured (e.g. before the
// user has set up their Sanity project). Every call site must check
// `isSanityConfigured` / handle a null client and fall back to the seed
// content shipped in messages/*.json (Blog.fallbackPosts).
export const sanityClient: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
      perspective: 'published',
    })
  : null;
