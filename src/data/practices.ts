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
  'administrative-law',
  'land-law',
  'it-law',
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

// Same pattern as Criminal Defense's sub-practices, generalized to the other
// top-level fields of law: each of these has its own full page at
// /practices/<slug>, nested under a parent in the "other practices" pill
// navigation (see getParentSlug in the [slug] page), but not listed a
// second time as its own top-level grid card.
export const civilSubPracticeSlugs = ['property-rights-protection', 'marital-property-division'] as const;
export const commercialSubPracticeSlugs = ['corporate-disputes'] as const;
export const administrativeSubPracticeSlugs = ['customs-disputes'] as const;
export const landSubPracticeSlugs = ['land-allocation-registration'] as const;

// Canonical practice slugs — order matches the "list" array index in messages/*.json
// (Practices.list[0] = criminal-defense, etc). Keep slugs locale-independent so URLs
// stay stable across UA/EN/DE/FR. New sub-practice groups are appended at the
// end (not interleaved) so existing indices never shift.
export const practiceSlugs = [
  ...topLevelPracticeSlugs,
  ...criminalSubPracticeSlugs,
  ...civilSubPracticeSlugs,
  ...commercialSubPracticeSlugs,
  ...administrativeSubPracticeSlugs,
  ...landSubPracticeSlugs,
] as const;

export type PracticeSlug = (typeof practiceSlugs)[number];

// Maps every top-level practice to its own sub-practices (empty array if it
// has none, e.g. land-law). Used by the [slug] page to build the "other
// practices" pill navigation generically instead of hardcoding just the
// Criminal Defense case.
export const subPracticesByParent: Record<(typeof topLevelPracticeSlugs)[number], readonly string[]> = {
  'criminal-defense': criminalSubPracticeSlugs,
  'civil-law': civilSubPracticeSlugs,
  'commercial-law': commercialSubPracticeSlugs,
  'administrative-law': administrativeSubPracticeSlugs,
  'land-law': landSubPracticeSlugs,
  'it-law': [],
};

export function getParentSlug(slug: string): (typeof topLevelPracticeSlugs)[number] | null {
  for (const parent of topLevelPracticeSlugs) {
    if (subPracticesByParent[parent].includes(slug)) return parent;
  }
  return null;
}

// Optional real photo per practice area — deliberately empty by default.
// To add a photo: drop a real file into /public/practices/<slug>.jpg and add
// an entry here, e.g. 'criminal-defense': '/practices/criminal-defense.jpg'.
// Nothing renders until a real image is added — no placeholder/stock photos.
export const practiceImages: Partial<Record<PracticeSlug, string>> = {};
