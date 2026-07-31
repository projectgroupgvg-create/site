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
  criminalSubPracticeSlugs,
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
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    practiceSlugs.map((slug) => ({ locale, slug })),
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

  // Scoped "other practices" links: Criminal Defense links to its own
  // specializations as an independent sub-structure; each specialization
  // links back to Criminal Defense plus its siblings; each of the other
  // top-level fields of law links only to the other top-level fields — so a
  // specialization never gets listed twice (as a field of law AND as a
  // Criminal Defense sub-topic) and unrelated top-level fields don't cross-link.
  const currentSlug = slug as (typeof practiceSlugs)[number];
  const isCriminalMain = currentSlug === 'criminal-defense';
  const isCriminalSub = (criminalSubPracticeSlugs as readonly string[]).includes(currentSlug);

  let othersSlugs: (typeof practiceSlugs)[number][];
  if (isCriminalMain) {
    othersSlugs = [...criminalSubPracticeSlugs];
  } else if (isCriminalSub) {
    othersSlugs = [
      'criminal-defense',
      ...criminalSubPracticeSlugs.filter((s) => s !== currentSlug),
    ];
  } else {
    othersSlugs = topLevelPracticeSlugs.filter((s) => s !== currentSlug);
  }

  const others = othersSlugs.map((s) => ({ slug: s, ...list[practiceSlugs.indexOf(s)] }));
  const h1 = practice.pageH1 ?? practice.title;

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
                href="/#practices"
                className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[var(--ink3)] transition-colors hover:text-[var(--ink)]"
              >
                ← {t('backLink')}
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
              href="/#practices"
              className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[var(--ink3)] transition-colors hover:text-[var(--ink)]"
            >
              ← {t('backLink')}
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

      <div className="mx-auto max-w-[720px] px-6 py-16 sm:px-11">
        {practice.intro.map((p, i) => (
          <p key={i} className="mb-5 text-[14px] leading-[1.9] text-[var(--ink2)]">
            {p}
          </p>
        ))}

        <h2 className="mb-4 mt-10 font-serif text-[22px] font-normal text-[var(--ink)]">
          {practice.scenariosLabel ?? t('servicesTitle')}
        </h2>
        <ul className="mb-2">
          {practice.services.map((s) => (
            <li
              key={s}
              className="relative border-b-hair py-2.5 pl-5 text-[13px] text-[var(--ink3)]"
              style={{ borderColor: 'var(--b)' }}
            >
              <span className="absolute left-0 text-[var(--s3)]">—</span>
              {s}
            </li>
          ))}
        </ul>

        {practice.sections && practice.sections.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 font-serif text-[22px] font-normal text-[var(--ink)]">
              {t('servicesTitle')}
            </h2>
            <div className="space-y-8">
              {practice.sections.map((s) => (
                <div key={s.title}>
                  <h3 className="mb-2 font-serif text-[16px] font-semibold text-[var(--ink)]">{s.title}</h3>
                  {s.body.map((p, i) => (
                    <p key={i} className="mb-2 text-[13.5px] leading-[1.85] text-[var(--ink2)]">
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
            <h2 className="mb-6 font-serif text-[20px] font-normal text-[var(--ink)]">
              Поширені запитання
            </h2>
            <div className="space-y-5">
              {practice.faq.map((item) => (
                <div key={item.q}>
                  <div className="mb-1.5 text-[13.5px] font-semibold text-[var(--ink)]">{item.q}</div>
                  <p className="text-[13.5px] leading-[1.8] text-[var(--ink3)]">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-14 rounded-lg border-hair p-7" style={{ borderColor: 'var(--b)', background: 'var(--bgc)' }}>
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
