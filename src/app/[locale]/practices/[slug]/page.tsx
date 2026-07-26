import type { CSSProperties } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { practiceSlugs, practiceImages } from '@/data/practices';
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
};

// Practices with a supplied atmospheric photo get it as a header background
// instead of the plain text block. Not every practice has one yet.
const practiceHeaderPhotos: Partial<Record<(typeof practiceSlugs)[number], string>> = {
  'criminal-defense': '/practice-criminal-bg.jpg',
  'transnational-investigations': '/practice-transnational-bg.jpg',
  'crypto-fraud': '/practice-tech-bg.jpg',
  'aml-compliance': '/practice-aml-bg.jpg',
  cybercrime: '/practice-cyber-bg.jpg',
  'blockchain-investigations': '/practice-tech-bg.jpg',
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
  return {
    title: practice.title,
    description: practice.desc,
    alternates: buildAlternates(locale, path),
    openGraph: buildOpenGraph({
      locale,
      path,
      title: practice.title,
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

  const others = practiceSlugs
    .map((s, i) => ({ slug: s, ...list[i] }))
    .filter((_, i) => i !== index);

  return (
    <main>
      <JsonLd
        data={buildServiceSchema({
          locale,
          path: `/practices/${slug}`,
          name: practice.title,
          description: practice.desc,
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema(locale, [
          { name: 'Gangan & Partners', path: '/' },
          { name: t('lbl'), path: '/#practices' },
          { name: practice.title, path: `/practices/${slug}` },
        ])}
      />
      {(() => {
        const headerPhoto = practiceHeaderPhotos[slug as (typeof practiceSlugs)[number]];
        return headerPhoto ? (
          <div
            className="relative flex min-h-[52vh] items-end overflow-hidden px-6 py-16 sm:px-11 sm:min-h-[58vh]"
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
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.82)] via-[rgba(10,8,6,0.4)] to-[rgba(10,8,6,0.5)]" />
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
              <h1 className="font-serif text-[clamp(26px,3.2vw,44px)] font-bold leading-[1.1] text-[var(--ink)]">
                {practice.title}
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
            <h1 className="font-serif text-[clamp(26px,3.2vw,44px)] font-bold leading-[1.1] text-[var(--ink)]">
              {practice.title}
            </h1>
          </div>
        );
      })()}

      <div className="border-b-hair bg-[var(--bg2)] px-6 py-5 sm:px-11" style={{ borderColor: 'var(--b)' }}>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="mr-1 shrink-0 text-[9px] font-semibold uppercase tracking-[0.3em] text-[var(--s3)]">
            {t('moreTitle')}
          </span>
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

        <h2 className="mb-4 mt-10 font-serif text-[22px] font-semibold text-[var(--ink)]">
          {t('servicesTitle')}
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
