import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildAlternates, buildOpenGraph } from '@/lib/metadata';
import WalletScreener from '@/components/WalletScreener';
import BlockchainDnaBanner from '@/components/BlockchainDnaBanner';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'WalletScreen' });
  const title = t('title');
  const description = t('sub');
  return {
    title,
    description,
    alternates: buildAlternates(locale, '/wallet-check'),
    openGraph: buildOpenGraph({ locale, path: '/wallet-check', title, description }),
  };
}

export default async function WalletCheckPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('WalletScreen');

  return (
    <main>
      <BlockchainDnaBanner
        eyebrow={t('bannerEyebrow')}
        headline={t('bannerHeadline')}
        subtext={t('bannerSub')}
        cta1Label={t('bannerCta1')}
        cta1Href="#wallet-form"
        cta2Label={t('bannerCta2')}
        cta2Href="/#ai"
      />

      <div className="border-b-hair bg-[var(--bg2)] px-6 py-12 sm:px-11" style={{ borderColor: 'var(--b)' }}>
        <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.4em] text-[var(--s3)]">
          {t('lbl')}
        </div>
        <h1 className="mb-5 font-serif text-[clamp(26px,3.2vw,44px)] font-bold leading-[1.1] text-[var(--ink)]">
          {t('title')}
        </h1>
        <div className="divider" />
        <p className="max-w-[520px] text-[14.5px] leading-[1.8] text-[var(--ink3)]">
          {t('sub')}
        </p>
      </div>

      <div id="wallet-form" className="mx-auto max-w-[680px] scroll-mt-20 px-6 py-16 sm:px-11">
        <WalletScreener />
      </div>
    </main>
  );
}
