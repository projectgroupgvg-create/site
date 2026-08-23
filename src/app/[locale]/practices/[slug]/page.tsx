import type { CSSProperties } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import {
  practiceSlugs,
  practiceImages,
  topLevelPracticeSlugs,
  subPracticesByParent,
  getParentSlug,
} from '@/data/practices';
import { routing } from '@/i18n/routing';
import { buildAlternates, buildOpenGraph } from '@/lib/metadata';
import { buildServiceSchema, buildBreadcrumbSchema } from '@/lib/jsonld';
import JsonLd from '@/components/JsonLd';

type PracticeContent = {
  num: string;
  title: string;
  desc: string;
  intro: string[];
  services: string[];
  // Optional richer content, supplied for some practices via SEO-authored
  // copy. `pageH1`/`seoTitle` let the on-page heading and <title> tag differ
  // from the short `title` used everywhere else (grid cards, breadcrumbs,
  // cross-link pills) without changing those existing labels.
  pageH1?: string;
  seoTitle?: string;
  scenariosLabel?: string;
  sections?: { title: string; body: string[] }[];
  faq?: { q: string; a: string }[];
};

// Practices with a supplied atmospheric photo get it as a header background
// instead of the plain text block. Not every practice has one yet.
const practiceHeaderPhotos: Partial<Record<(typeof practiceSlugs)[number], string>> = {
  'criminal-defense': '/practice-criminal-bg.jpg',
  'transnational-investigations': '/practice-transnational-bg.jpg',
  'crypto-fraud': '/practice-tech-bg.jpg',
  'aml-compliance': '/practice-aml-bg.jpg',
  cybercrime: '/practice-cyber-bg.jpg',
  'blockchain-investigations': '/practice-blockchain-investigations-bg.jpg',
  'civil-law': '/practice-civil-law-bg.jpg',
  'commercial-law': '/practice-commercial-law-bg.jpg',
  'administrative-law': '/practice-administrative-law-bg.jpg',
  'it-law': '/practice-it-law-bg.jpg',
};

// These 4 sub-practices only have content in messages/uk.json so far (added
// via client-supplied SEO copy that hasn't been translated yet — English is
// an explicit "stage 2" for this project, same precedent as the /reports,
// /media pages). Statically generating their /en/, /de/, /fr/
// variants would index into an array position that doesn't exist in those
// locale files and crash the whole build, so they're skipped for now and
// the page component below defensively 404s if content is ever missing.
const ukOnlySlugs = new Set([
  'property-rights-protection',
  'marital-property-division',
  'corporate-disputes',
  'customs-disputes',
  'land-allocation-registration',
]);

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    practiceSlugs
      .filter((slug) => locale === routing.defaultLocale || !ukOnlySlugs.has(slug))
      .map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const index = practiceSlugs.indexOf(slug as (typeof practiceSlugs)[number]);
  if (index === -1) return {};
  const t = await getTranslations({ locale, namespace: 'Practices' });
  const list = t.raw('list') as PracticeContent[];
  const practice = list[index];
  if (!practice) return {};
  const path = `/practices/${slug}`;
  const metaTitle = practice.seoTitle ?? practice.pageH1 ?? practice.title;
  return {
    title: metaTitle,
    description: practice.desc,
    alternates: buildAlternates(locale, path),
    openGraph: buildOpenGraph({
      locale,
      path,
      title: metaTitle,
      description: practice.desc,
    }),
  };
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const index = practiceSlugs.indexOf(slug as (typeof practiceSlugs)[number]);
  if (index === -1) notFound();

  const t = await getTranslations('Practices');
  const list = t.raw('list') as PracticeContent[];
  const practice = list[index];
  if (!practice) notFound();

  // Scoped "other practices" links, generalized across every top-level field
  // of law (not just Criminal Defense): a top-level page links to its own
  // sub-practices if it has any, otherwise falls back to the other
  // top-level fields; a sub-practice page links back to its parent plus its
  // siblings. This keeps a specialization from ever being listed twice
  // (once as a field of law, once as a sub-topic of its parent) and keeps
  // unrelated top-level fields from cross-linking to each other's subs.
  const currentSlug = slug as (typeof practiceSlugs)[number];
  const isTopLevel = (topLevelPracticeSlugs as readonly string[]).includes(currentSlug);
  const parentSlug = isTopLevel ? null : getParentSlug(currentSlug);

  let othersSlugs: (typeof practiceSlugs)[number][];
  if (isTopLevel) {
    const subs = subPracticesByParent[currentSlug as (typeof topLevelPracticeSlugs)[number]];
    othersSlugs = subs.length > 0
      ? [...subs] as (typeof practiceSlugs)[number][]
      : topLevelPracticeSlugs.filter((s) => s !== currentSlug);
  } else if (parentSlug) {
    // Parent is deliberately excluded here — it's already the target of the
    // "← Back" link above, so listing it again as a pill would duplicate
    // that link. Only true siblings show up in this row.
    othersSlugs = subPracticesByParent[parentSlug].filter(
      (s) => s !== currentSlug,
    ) as (typeof practiceSlugs)[number][];
  } else {
    othersSlugs = topLevelPracticeSlugs.filter((s) => s !== currentSlug);
  }

  // Uk-only sub-practices (see ukOnlySlugs above) don't have content in
  // other locales — drop them from the cross-link pills rather than
  // pointing non-uk visitors at a 404.
  if (locale !== routing.defaultLocale) {
    othersSlugs = othersSlugs.filter((s) => !ukOnlySlugs.has(s));
  }

  const others = othersSlugs
    .map((s) => ({ slug: s, ...list[practiceSlugs.indexOf(s)] }))
    .filter((o) => o.title !== undefined);
  const h1 = practice.pageH1 ?? practice.title;

  // Sub-practice pages return to their immediate parent instead of jumping
  // all the way back to the homepage grid — a proper "one level up" back
  // link instead of always resetting to the top.
  const parentPractice = parentSlug ? list[practiceSlugs.indexOf(parentSlug)] : null;
  const backHref = parentSlug ? `/practices/${parentSlug}` : '/#practices';
  const backLabel = parentPractice ? parentPractice.title : t('backLink');

  return (
    <main>
      <JsonLd
        data={buildServiceSchema({
          locale,
          path: `/practices/${slug}`,
          name: h1,
          description: practice.desc,
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema(locale, [
          { name: 'Gangan & Partners', path: '/' },
          { name: t('lbl'), path: '/#practices' },
          ...(parentPractice && parentSlug
            ? [{ name: parentPractice.title, path: `/practices/${parentSlug}` }]
            : []),
          { name: h1, path: `/practices/${slug}` },
        ])}
      />
      {(() => {
        const headerPhoto = practiceHeaderPhotos[slug as (typeof practiceSlugs)[number]];
        return headerPhoto ? (
          <div
            className="relative flex min-h-[52vh] items-center overflow-hidden px-6 py-16 sm:px-11 sm:min-h-[58vh]"
            style={{
              '--ink': '#f7f4ee',
              '--ink3': '#d9cfbd',
              '--s3': '#d9c9a8',
            } as CSSProperties}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${headerPhoto}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,8,6,0.78)] via-[rgba(10,8,6,0.42)] to-[rgba(10,8,6,0.5)]" />
            <div className="relative z-10">
              <Link
                href={backHref}
                className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[var(--ink3)] transition-colors hover:text-[var(--ink)]"
              >
                ← {backLabel}
              </Link>
              <div className="mb-2 text-[9px] font-semibold uppercase tracking-[0.4em] text-[var(--s3)]">
                {practice.num} / {t('lbl')}
              </div>
              <h1 className="font-serif text-[clamp(26px,3.2vw,44px)] font-light leading-[1.1] text-[var(--ink)]">
                {h1}
              </h1>
            </div>
          </div>
        ) : (
          <div className="border-b-hair bg-[var(--bg2)] px-6 py-12 sm:px-11" style={{ borderColor: 'var(--b)' }}>
            <Link
              href={backHref}
              className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[var(--ink3)] transition-colors hover:text-[var(--ink)]"
            >
              ← {backLabel}
            </Link>
            <div className="mb-2 text-[9px] font-semibold uppercase tracking-[0.4em] text-[var(--s3)]">
              {practice.num} / {t('lbl')}
            </div>
            <h1 className="font-serif text-[clamp(26px,3.2vw,44px)] font-light leading-[1.1] text-[var(--ink)]">
              {h1}
            </h1>
          </div>
        );
      })()}

      <div className="border-b-hair bg-[var(--bg2)] px-6 py-5 sm:px-11" style={{ borderColor: 'var(--b)' }}>
        <div className="flex flex-wrap items-center gap-2.5">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/practices/${o.slug}`}
              className="whitespace-nowrap rounded-full border-hair px-4 py-2 text-[12px] text-[var(--ink2)] transition-colors hover:bg-[var(--bgc)] hover:text-[var(--ink)]"
              style={{ borderColor: 'var(--b)' }}
            >
              <span className="mr-1.5 text-[var(--s3)]">{o.num}</span>
              {o.title}
            </Link>
          ))}
        </div>
      </div>

      {practiceImages[slug as (typeof practiceSlugs)[number]] && (
        <div className="mx-auto max-w-[880px] px-6 pt-12 sm:px-11">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg border-hair" style={{ borderColor: 'var(--b)' }}>
            <Image
              src={practiceImages[slug as (typeof practiceSlugs)[number]]!}
              alt={practice.title}
              fill
              sizes="(max-width: 900px) 100vw, 880px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <div className="py-16" style={{ paddingLeft: '2cm', paddingRight: '2cm' }}>
        {practice.intro.map((p, i) => (
          <p key={i} className="mb-5 text-justify text-[16.5px] leading-[1.85] text-[var(--ink2)]">
            {p}
          </p>
        ))}

        <h2 className="mb-4 mt-10 font-serif text-[24px] font-normal text-[var(--ink)]">
          {practice.scenariosLabel ?? t('servicesTitle')}
        </h2>
        <ul className="mb-2">
          {practice.services.map((s) => (
            <li
              key={s}
              className="relative border-b-hair py-3 pl-5 text-[15px] text-[var(--ink3)]"
              style={{ borderColor: 'var(--b)' }}
            >
              <span className="absolute left-0 text-[var(--s3)]">—</span>
              {s}
            </li>
          ))}
        </ul>

        {practice.sections && practice.sections.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 font-serif text-[24px] font-normal text-[var(--ink)]">
              {t('servicesTitle')}
            </h2>
            <div className="space-y-8">
              {practice.sections.map((s) => (
                <div key={s.title}>
                  <h3 className="mb-2 font-serif text-[18.5px] font-semibold text-[var(--ink)]">{s.title}</h3>
                  {s.body.map((p, i) => (
                    <p key={i} className="mb-2 text-justify text-[16px] leading-[1.8] text-[var(--ink2)]">
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {practice.faq && practice.faq.length > 0 && (
          <div className="mt-14 border-t-hair pt-10" style={{ borderColor: 'var(--b)' }}>
            <h2 className="mb-6 font-serif text-[22px] font-normal text-[var(--ink)]">
              Поширені запитання
            </h2>
            <div className="space-y-5">
              {practice.faq.map((item) => (
                <div key={item.q}>
                  <div className="mb-1.5 text-[15.5px] font-semibold text-[var(--ink)]">{item.q}</div>
                  <p className="text-justify text-[15px] leading-[1.75] text-[var(--ink3)]">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 rounded-lg border-hair p-7" style={{ borderColor: 'var(--b)', background: 'var(--bgc)' }}>
          <div className="mb-4 font-serif text-[18px] font-semibold text-[var(--ink)]">
            {t('ctaTitle')}
          </div>
          <Link
            href="/#ai"
            className="inline-block rounded-sm bg-[var(--ink)] px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--wh)] transition-colors hover:bg-[var(--ink-hover)]"
          >
            {t('ctaBtn')}
          </Link>
        </div>
      </div>
    </main>
  );
}
