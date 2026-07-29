// Top-level "fields of law" (galuzi prava) — shown as the 5 cards in the main
// Practices grid on the homepage and used for the site's primary numbering
// (01-05). Criminal Defense's own specializations (crypto-fraud, AML, etc.)
// are intentionally NOT listed here — they live only inside the Criminal
// Defense page as its own sub-structure, to avoid the same specialization
// being listed twice (once as a "field of law" and once as a sub-topic).
export const topLevelPracticeSlugs = [
  'criminal-defense',
  'civil-law',
  'commercial-law',
  'antitrust-law',
  'administrative-law',
  'land-law',
  'regulatory-law',
] as const;

// Criminal Defense's own specializations. Each still has a fully independent
// page at its existing URL (/practices/<slug>) — they're just not part of the
// top-level "fields of law" list anymore. Numbered 01.1-01.5 (sub-items of
// "01 Criminal Defense") in messages/*.json rather than 06-10.
export const criminalSubPracticeSlugs = [
  'transnational-investigations',
  'crypto-fraud',
  'aml-compliance',
  'cybercrime',
  'blockchain-investigations',
] as const;

// Canonical practice slugs — order matches the "list" array index in messages/*.json
// (Practices.list[0] = criminal-defense, etc). Keep slugs locale-independent so URLs
// stay stable across UA/EN/DE/FR.
export const practiceSlugs = [
  ...topLevelPracticeSlugs,
  ...criminalSubPracticeSlugs,
] as const;

export type PracticeSlug = (typeof practiceSlugs)[number];

// Optional real photo per practice area — deliberately empty by default.
// To add a photo: drop a real file into /public/practices/<slug>.jpg and add
// an entry here, e.g. 'criminal-defense': '/practices/criminal-defense.jpg'.
// Nothing renders until a real image is added — no placeholder/stock photos.
export const practiceImages: Partial<Record<PracticeSlug, string>> = {};
