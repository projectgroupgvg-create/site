// GROQ queries. Posts are expected to have a `language` field (uk/en/de/fr)
// set via the `language` document-level field from @sanity/document-internationalization,
// or simply a string field — see sanity/schemaTypes/post.ts.

export const postsByLocaleQuery = /* groq */ `
*[_type == "post" && language == $locale] | order(publishedAt desc) {
  "slug": slug.current,
  title,
  excerpt,
  publishedAt,
  "category": category->slug.current,
  "categoryLabel": category->title,
  "mainImage": mainImage.asset->url
}`;

export const postBySlugQuery = /* groq */ `
*[_type == "post" && slug.current == $slug && language == $locale][0] {
  "slug": slug.current,
  title,
  excerpt,
  body,
  publishedAt,
  "category": category->slug.current,
  "categoryLabel": category->title,
  "mainImage": mainImage.asset->url,
  "author": author->name
}`;

export const allPostSlugsQuery = /* groq */ `
*[_type == "post"]{ "slug": slug.current, language }`;

export const newsByLocaleQuery = /* groq */ `
*[_type == "newsItem" && language == $locale] | order(publishedAt desc) {
  "slug": slug.current,
  title,
  excerpt,
  publishedAt,
  newsType,
  "mainImage": mainImage.asset->url
}`;

export const newsBySlugQuery = /* groq */ `
*[_type == "newsItem" && slug.current == $slug && language == $locale][0] {
  "slug": slug.current,
  title,
  excerpt,
  body,
  publishedAt,
  newsType,
  "mainImage": mainImage.asset->url
}`;

// taxJurisdiction is NOT locale-forked (one doc per country, not per UI
// language) — the numeric rates are the single source of truth, while text
// fields are localized objects ({uk,en,de,fr}) inside the document. See
// sanity/schemaTypes/taxJurisdiction.ts.
export const taxJurisdictionsQuery = /* groq */ `
*[_type == "taxJurisdiction"] | order(countryCode asc)`;
