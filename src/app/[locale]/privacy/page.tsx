import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildAlternates } from '@/lib/metadata';

// Bespoke layout for the Privacy Policy specifically (unlike the other six
// legal pages, which share `makeLegalPage`'s narrow single-column layout).
// The Ukrainian version is the lawyer-drafted 2026 edition: 20 numbered
// sections with numbered sub-clauses and one tabular section (§7, retention
// schedule). Rendered wide with a sticky section index, each sub-clause as
// its own justified, first-line-indented paragraph (the classic Ukrainian
// legal-document "абзацний відступ"), and §7 as a real table.
// EN/DE/FR still use the older short-stub schema ({heading, body} + a
// placeholderNote pointing back to the Ukrainian original) — the component
// below renders whichever shape a given locale's messages provide.

type Block = { type: 'p'; text: string } | { type: 'table'; headers: string[]; rows: string[][] };
type RichSection = { heading: string; blocks: Block[] };
type StubSection = { heading: string; body: string };
type Section = RichSection | StubSection;

function isRich(s: Section): s is RichSection {
  return Array.isArray((s as RichSection).blocks);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Privacy' });
  return {
    title: t('title'),
    alternates: buildAlternates(locale, '/privacy'),
    robots: { index: false, follow: true },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Privacy');
  const sections = t.raw('sections') as Section[];

  let orgLine: string | null = null;
  try {
    orgLine = t('orgLine');
  } catch {
    orgLine = null;
  }
  let placeholderNote: string | null = null;
  try {
    placeholderNote = t('placeholderNote');
  } catch {
    placeholderNote = null;
  }

  return (
    <main>
      <div className="border-b-hair bg-[var(--bg2)] px-6 py-16 sm:px-11" style={{ borderColor: 'var(--b)' }}>
        <div className="mx-auto max-w-[1320px]">
          <h1 className="mb-3 font-serif text-[clamp(24px,3vw,38px)] font-light leading-[1.1] text-[var(--ink)]">
            {t('title')}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] uppercase tracking-[0.1em] text-[var(--ink3)]">
            <span>{t('lastUpdated')}</span>
            {orgLine && (
              <>
                <span aria-hidden="true">·</span>
                <span className="normal-case tracking-normal">{orgLine}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] px-6 py-16 sm:px-11">
        {placeholderNote && (
          <p
            className="mb-10 rounded-lg border-hair bg-[var(--bgc)] p-5 text-[12.5px] leading-[1.75] text-[var(--ink2)]"
            style={{ borderColor: 'var(--b)' }}
          >
            {placeholderNote}
          </p>
        )}

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[240px_1fr]">
          <nav aria-label="Contents" className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ink3)]">
                {locale === 'uk' ? 'Зміст' : 'Contents'}
              </p>
              <ol className="space-y-1.5 border-l-hair pl-4" style={{ borderColor: 'var(--b)' }}>
                {sections.map((s) => (
                  <li key={s.heading}>
                    <a
                      href={`#${slug(s.heading)}`}
                      className="block text-[12.5px] leading-[1.5] text-[var(--ink3)] transition hover:text-[var(--s3)]"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="min-w-0">
            {sections.map((s) => (
              <section key={s.heading} id={slug(s.heading)} className="mb-12 scroll-mt-24">
                <h2 className="mb-4 font-serif text-[18px] font-semibold text-[var(--ink)]">{s.heading}</h2>
                {isRich(s) ? (
                  <div className="space-y-3">
                    {s.blocks.map((b, i) =>
                      b.type === 'table' ? (
                        <div key={i} className="my-5 overflow-x-auto rounded-lg border-hair" style={{ borderColor: 'var(--b)' }}>
                          <table className="w-full min-w-[640px] border-collapse text-[12.5px] leading-[1.6]">
                            <thead>
                              <tr className="bg-[var(--bg2)]">
                                {b.headers.map((h, hi) => (
                                  <th
                                    key={hi}
                                    className="border-b-hair px-4 py-3 text-left font-semibold text-[var(--ink)]"
                                    style={{ borderColor: 'var(--b)' }}
                                  >
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {b.rows.map((row, ri) => (
                                <tr key={ri} className={ri % 2 === 1 ? 'bg-[var(--bgc)]' : undefined}>
                                  {row.map((cell, ci) => (
                                    <td
                                      key={ci}
                                      className={`border-b-hair px-4 py-3 align-top text-[var(--ink2)] ${
                                        ci === 0 ? 'font-medium text-[var(--ink)]' : ''
                                      }`}
                                      style={{ borderColor: 'var(--b)' }}
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p key={i} className="indent-[1.75em] text-justify text-[13.5px] leading-[1.85] text-[var(--ink2)]">
                          {b.text}
                        </p>
                      ),
                    )}
                  </div>
                ) : (
                  <p className="whitespace-pre-line text-justify text-[13.5px] leading-[1.85] text-[var(--ink2)]">
                    {(s as StubSection).body}
                  </p>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function slug(heading: string): string {
  const num = heading.match(/^\d+/)?.[0] ?? heading;
  return `s-${num}`;
}
