import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildAlternates } from '@/lib/metadata';

// Shared factory for the site's static legal/compliance pages (Privacy,
// Cookie Policy, Terms of Use, AI Terms, Payments & Refunds, Professional
// Confidentiality, Legal Information). They all render identically — a
// title, a "last updated" line, an optional highlighted callout, and a list
// of {heading, body} sections pulled straight from translations — so one
// factory avoids maintaining six near-identical page.tsx files.
//
// Content for all seven currently lives only in messages/uk.json (see
// project notes: the 7-document legal package was supplied in Ukrainian by
// the firm's counsel). EN/DE/FR fall back to a short "authoritative version
// is Ukrainian" notice via the same `placeholderNote`/`sections` keys rather
// than a freehand translation of dense legal text.
export function generateStaticParamsForLocales() {
  return routing.locales.map((locale) => ({ locale }));
}

export function makeLegalPage(namespace: string, path: string) {
  async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace });
    return {
      title: t('title'),
      alternates: buildAlternates(locale, path),
      robots: { index: false, follow: true },
    };
  }

  async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations(namespace);
    const sections = t.raw('sections') as { heading: string; body: string }[];

    return (
      <main>
        <div className="border-b-hair bg-[var(--bg2)] px-6 py-16 sm:px-11" style={{ borderColor: 'var(--b)' }}>
          <h1 className="mb-3 font-serif text-[clamp(24px,3vw,38px)] font-light leading-[1.1] text-[var(--ink)]">
            {t('title')}
          </h1>
          <p className="text-[12px] uppercase tracking-[0.1em] text-[var(--ink3)]">{t('lastUpdated')}</p>
        </div>

        <div className="mx-auto max-w-[680px] px-6 py-16 sm:px-11">
          <p className="mb-10 rounded-lg border-hair bg-[var(--bgc)] p-5 text-[12.5px] leading-[1.75] text-[var(--ink2)]" style={{ borderColor: 'var(--b)' }}>
            {t('placeholderNote')}
          </p>
          {sections.map((s) => (
            <div key={s.heading} className="mb-8">
              <h2 className="mb-3 font-serif text-[17px] font-semibold text-[var(--ink)]">{s.heading}</h2>
              <p className="whitespace-pre-line text-justify text-[13.5px] leading-[1.85] text-[var(--ink2)]">{s.body}</p>
            </div>
          ))}
        </div>
      </main>
    );
  }

  return {
    generateStaticParams: generateStaticParamsForLocales,
    generateMetadata,
    default: LegalPage,
  };
}
