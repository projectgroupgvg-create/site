import createImageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { projectId, dataset } from './client';

const builder = projectId
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) return null;
  return builder.image(source);
}
