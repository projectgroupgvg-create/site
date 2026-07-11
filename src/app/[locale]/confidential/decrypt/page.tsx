import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildAlternates } from '@/lib/metadata';
import DecryptTool from '@/components/DecryptTool';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Decrypt' });
  return {
    title: t('title'),
    alternates: buildAlternates(locale, '/confidential/decrypt'),
    robots: { index: false, follow: false },
  };
}

export default async function DecryptPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Decrypt');

  return (
    <main>
      <div className="border-b-hair bg-[var(--bg2)] px-6 py-16 sm:px-11" style={{ borderColor: 'var(--b)' }}>
        <h1 className="mb-3 font-serif text-[clamp(24px,3vw,38px)] font-bold leading-[1.1] text-[var(--ink)]">
          {t('title')}
        </h1>
        <p className="max-w-[520px] text-[13px] leading-[1.7] text-[var(--ink3)]">{t('sub')}</p>
      </div>

      <div className="mx-auto max-w-[620px] px-6 py-16 sm:px-11">
        <DecryptTool />
      </div>
    </main>
  );
}
