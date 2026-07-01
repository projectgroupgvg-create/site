import { sanityClient, isSanityConfigured } from '@/lib/sanity/client';
import { taxJurisdictionsQuery } from '@/lib/sanity/queries';
import { fallbackTaxJurisdictions, type TaxJurisdiction } from '@/data/taxJurisdictions';

export type { TaxJurisdiction, LocalizedText } from '@/data/taxJurisdictions';

export async function getTaxJurisdictions(): Promise<TaxJurisdiction[]> {
  if (isSanityConfigured && sanityClient) {
    try {
      const jurisdictions = await sanityClient.fetch<TaxJurisdiction[]>(
        taxJurisdictionsQuery,
      );
      if (jurisdictions && jurisdictions.length > 0) return jurisdictions;
    } catch (err) {
      console.error(
        'Sanity fetch failed, falling back to seed tax jurisdictions',
        err,
      );
    }
  }
  return fallbackTaxJurisdictions;
}
