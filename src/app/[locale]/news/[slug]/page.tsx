import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PortableText } from '@portabletext/react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getNewsBySlug, type FallbackNewsItem } from '@/lib/news';
import { routing } from '@/i18n/routing';
import { newsFallbackSlugs as fallbackSlugs } from '@/data/newsSlugs';
import { buildAlternates, buildOpenGraph } from '@/lib/metadata';
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/jsonld';
import JsonLd from '@/components/JsonLd';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    fallbackSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'News' });
  const fallbackNews = t.raw('fallbackNews') as FallbackNewsItem[];
  const item = await getNewsBySlug(slug, locale, fallbackNews);
  if (!item) return {};
  const path = `/news/${slug}`;
  return {
    title: item.title,
    description: item.excerpt,
    alternates: buildAlternates(locale, path),
    openGraph: buildOpenGraph({
      locale,
      path,
      title: item.title,
      description: item.excerpt,
      type: 'article',
    }),
  };
}

export default async function NewsItemPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('News');
  const fallbackNews = t.raw('fallbackNews') as FallbackNewsItem[];
  const types = t.raw('types') as { slug: string; label: string }[];
  const item = await getNewsBySlug(slug, locale, fallbackNews);

  if (!item) notFound();

  const typeLabel =
    types.find((tItem) => tItem.slug === item.newsType)?.label ?? item.newsType;

  return (
    <main>
      <JsonLd
        data={buildArticleSchema({
          locale,
          path: `/news/${slug}`,
          title: item.title,
          description: item.excerpt,
          image: item.mainImage,
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema(locale, [
          { name: 'Gangan & Partners', path: '/' },
          { name: t('title'), path: '/news' },
          { name: item.title, path: `/news/${slug}` },
        ])}
      />
      <div className="border-b-hair bg-[var(--bg2)] px-6 py-14 sm:px-11" style={{ borderColor: 'var(--b)' }}>
        <Link
          href="/news"
          className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[var(--ink3)] transition-colors hover:text-[var(--ink)]"
        >
          ← {t('backToNews')}
        </Link>
        <div className="mb-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-[var(--s3)]">
          {typeLabel} · {item.date}
        </div>
        <h1 className="max-w-[720px] font-serif text-[clamp(24px,3vw,38px)] font-bold leading-[1.2] text-[var(--ink)]">
          {item.title}
        </h1>
      </div>

      <article className="mx-auto max-w-[680px] px-6 py-16 sm:px-11">
        {item.source === 'fallback' && Array.isArray(item.body) ? (
          (item.body as string[]).map((p, i) => (
            <p key={i} className="mb-5 text-[14.5px] leading-[1.9] text-[var(--ink2)]">
              {p}
            </p>
          ))
        ) : item.body ? (
          <div className="prose-blog text-[14.5px] leading-[1.9] text-[var(--ink2)]">
            <PortableText value={item.body as Parameters<typeof PortableText>[0]['value']} />
          </div>
        ) : null}
      </article>
    </main>
  );
}
