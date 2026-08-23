import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildAlternates, buildOpenGraph } from '@/lib/metadata';
import { getTaxJurisdictions } from '@/lib/taxJurisdictions';
import CryptoTaxCalculator from '@/components/CryptoTaxCalculator';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Calculator' });
  const title = t('title');
  const description = t('sub');
  return {
    title,
    description,
    alternates: buildAlternates(locale, '/calculator'),
    openGraph: buildOpenGraph({ locale, path: '/calculator', title, description }),
  };
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Calculator');
  const jurisdictions = await getTaxJurisdictions();

  return (
    <main>
      <div
        className="relative overflow-hidden px-6 py-16 sm:px-11"
        style={{
          '--ink': '#f7f4ee',
          '--ink2': '#e3dcc9',
          '--ink3': '#d9cfbd',
          '--s3': '#d9c9a8',
        } as CSSProperties}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/calculator-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.85)] via-[rgba(10,8,6,0.62)] to-[rgba(10,8,6,0.68)]" />
        <div className="relative z-10">
          <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.4em] text-[var(--s3)]">
            {t('lbl')}
          </div>
          <h1 className="mb-5 font-serif text-[clamp(26px,3.2vw,44px)] font-light leading-[1.1] text-[var(--ink)]">
            {t('title')}
          </h1>
          <div className="divider" />
          <p className="max-w-[520px] text-[14.5px] leading-[1.8] text-[var(--ink3)]">
            {t('sub')}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[820px] px-6 py-16 sm:px-11">
        <CryptoTaxCalculator jurisdictions={jurisdictions} />
      </div>
    </main>
  );
}
