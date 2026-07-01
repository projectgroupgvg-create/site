import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PortableText } from '@portabletext/react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getPostBySlug, type FallbackPost } from '@/lib/blog';
import { routing } from '@/i18n/routing';
import { blogFallbackSlugs as fallbackSlugs } from '@/data/blogSlugs';
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
  const t = await getTranslations({ locale, namespace: 'Blog' });
  const fallbackPosts = t.raw('fallbackPosts') as FallbackPost[];
  const post = await getPostBySlug(slug, locale, fallbackPosts);
  if (!post) return {};
  const path = `/blog/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: buildAlternates(locale, path),
    openGraph: buildOpenGraph({
      locale,
      path,
      title: post.title,
      description: post.excerpt,
      type: 'article',
    }),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Blog');
  const fallbackPosts = t.raw('fallbackPosts') as FallbackPost[];
  const categories = t.raw('categories') as { slug: string; label: string }[];
  const post = await getPostBySlug(slug, locale, fallbackPosts);

  if (!post) notFound();

  const categoryLabel =
    categories.find((c) => c.slug === post.category)?.label ?? post.category;

  return (
    <main>
      <JsonLd
        data={buildArticleSchema({
          locale,
          path: `/blog/${slug}`,
          title: post.title,
          description: post.excerpt,
          image: post.mainImage,
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema(locale, [
          { name: 'Gangan & Partners', path: '/' },
          { name: t('title'), path: '/blog' },
          { name: post.title, path: `/blog/${slug}` },
        ])}
      />
      <div className="border-b-hair bg-[var(--bg2)] px-6 py-14 sm:px-11" style={{ borderColor: 'var(--b)' }}>
        <Link
          href="/blog"
          className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[var(--ink3)] transition-colors hover:text-[var(--ink)]"
        >
          ← {t('backToBlog')}
        </Link>
        <div className="mb-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-[var(--s3)]">
          {categoryLabel} · {post.date}
        </div>
        <h1 className="max-w-[720px] font-serif text-[clamp(24px,3vw,38px)] font-bold leading-[1.2] text-[var(--ink)]">
          {post.title}
        </h1>
      </div>

      <article className="mx-auto max-w-[680px] px-6 py-16 sm:px-11">
        {post.source === 'fallback' && Array.isArray(post.body) ? (
          (post.body as string[]).map((p, i) => (
            <p key={i} className="mb-5 text-[14.5px] leading-[1.9] text-[var(--ink2)]">
              {p}
            </p>
          ))
        ) : post.body ? (
          <div className="prose-blog text-[14.5px] leading-[1.9] text-[var(--ink2)]">
            <PortableText value={post.body as Parameters<typeof PortableText>[0]['value']} />
          </div>
        ) : null}
      </article>
    </main>
  );
}
