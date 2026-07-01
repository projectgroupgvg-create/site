import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildAlternates, buildOpenGraph } from '@/lib/metadata';

type Value = { title: string; desc: string };
type Stat = { value: string; label: string };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });
  const title = t('title');
  const description = t('sub');
  return {
    title,
    description,
    alternates: buildAlternates(locale, '/about'),
    openGraph: buildOpenGraph({ locale, path: '/about', title, description }),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('About');
  const history = t.raw('history') as string[];
  const values = t.raw('values') as Value[];
  const stats = t.raw('stats') as Stat[];

  return (
    <main>
      <div className="border-b-hair bg-[var(--bg2)] px-6 py-16 sm:px-11" style={{ borderColor: 'var(--b)' }}>
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

      <div className="mx-auto max-w-[720px] px-6 py-16 sm:px-11">
        <h2 className="mb-5 font-serif text-[22px] font-semibold text-[var(--ink)]">
          {t('historyTitle')}
        </h2>
        {history.map((p, i) => (
          <p key={i} className="mb-5 text-[14px] leading-[1.9] text-[var(--ink2)]">
            {p}
          </p>
        ))}

        <div className="mt-12 border-hair p-7" style={{ borderColor: 'var(--b)', background: 'var(--bgc)' }}>
          <h2 className="mb-3 font-serif text-[18px] font-semibold text-[var(--ink)]">
            {t('missionTitle')}
          </h2>
          <p className="text-[14px] leading-[1.8] text-[var(--ink2)]">{t('mission')}</p>
        </div>

        <h2 className="mb-6 mt-14 font-serif text-[22px] font-semibold text-[var(--ink)]">
          {t('valuesTitle')}
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {values.map((v) => (
            <div
              key={v.title}
              className="border-hair p-5"
              style={{ borderColor: 'var(--b)' }}
            >
              <div className="mb-2 font-serif text-[15px] font-semibold text-[var(--ink)]">
                {v.title}
              </div>
              <div className="text-[12.5px] leading-[1.7] text-[var(--ink3)]">{v.desc}</div>
            </div>
          ))}
        </div>

        <h2 className="mb-6 mt-14 font-serif text-[22px] font-semibold text-[var(--ink)]">
          {t('statsTitle')}
        </h2>
        <div className="grid grid-cols-2 gap-5 border-hair p-7 sm:grid-cols-4" style={{ borderColor: 'var(--b)' }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-[28px] font-bold text-[var(--ink)]">{s.value}</div>
              <div className="mt-1 text-[10.5px] uppercase tracking-[0.08em] text-[var(--ink3)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
