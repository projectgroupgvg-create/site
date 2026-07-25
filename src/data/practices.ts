// Canonical practice slugs — order matches the "list" array index in messages/*.json
// (Practices.list[0] = criminal-defense, etc). Keep slugs locale-independent so URLs
// stay stable across UA/EN/DE/FR.
export const practiceSlugs = [
  'criminal-defense',
  'transnational-investigations',
  'crypto-fraud',
  'aml-compliance',
  'cybercrime',
  'blockchain-investigations',
] as const;

export type PracticeSlug = (typeof practiceSlugs)[number];

// Optional real photo per practice area — deliberately empty by default.
// To add a photo: drop a real file into /public/practices/<slug>.jpg and add
// an entry here, e.g. 'criminal-defense': '/practices/criminal-defense.jpg'.
// Nothing renders until a real image is added — no placeholder/stock photos.
export const practiceImages: Partial<Record<PracticeSlug, string>> = {};
