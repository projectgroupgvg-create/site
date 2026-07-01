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
