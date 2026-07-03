import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { practiceSlugs } from '@/data/practices';
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

        <h3 className="mb-5 mt-16 text-[9px] font-semibold uppercase tracking-[0.3em] text-[var(--s3)]">
          {t('moreTitle')}
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/practices/${o.slug}`}
              className="rounded-sm border-hair px-5 py-4 text-[13px] text-[var(--ink2)] transition-colors hover:bg-[var(--bgc)]"
              style={{ borderColor: 'var(--b)' }}
            >
              <span className="mr-2 text-[var(--s3)]">{o.num}</span>
              {o.title}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
