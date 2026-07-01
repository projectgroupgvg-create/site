import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllPosts, type FallbackPost } from '@/lib/blog';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Blog' });
  return { title: `${t('title')} — Gangan & Partners` };
}

export default async function BlogArchivePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category } = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations('Blog');
  const fallbackPosts = t.raw('fallbackPosts') as FallbackPost[];
  const categories = t.raw('categories') as { slug: string; label: string }[];
  const allPosts = await getAllPosts(locale, fallbackPosts);

  const posts = category
    ? allPosts.filter((p) => p.category === category)
    : allPosts;

  const categoryLabel = (slug: string) =>
    categories.find((c) => c.slug === slug)?.label ?? slug;

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
        <p className="max-w-[460px] text-[14.5px] leading-[1.8] text-[var(--ink3)]">
          {t('sub')}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={`border-hair px-3.5 py-2 text-[11px] uppercase tracking-[0.08em] transition-colors ${
              !category
                ? 'bg-[var(--ink)] text-[var(--wh)]'
                : 'text-[var(--ink3)] hover:text-[var(--ink)]'
            }`}
            style={{ borderColor: !category ? 'var(--ink)' : 'var(--b)' }}
          >
            {t('filterAll')}
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/blog?category=${c.slug}`}
              className={`border-hair px-3.5 py-2 text-[11px] uppercase tracking-[0.08em] transition-colors ${
                category === c.slug
                  ? 'bg-[var(--ink)] text-[var(--wh)]'
                  : 'text-[var(--ink3)] hover:text-[var(--ink)]'
              }`}
              style={{ borderColor: category === c.slug ? 'var(--ink)' : 'var(--b)' }}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="px-6 py-16 sm:px-11">
        {posts.length === 0 ? (
          <p className="text-[13px] text-[var(--ink3)]">{t('noPosts')}</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="border-hair bg-[var(--bgc)] transition-colors hover:bg-[var(--wh)]"
                style={{ borderColor: 'var(--b)' }}
              >
                <div
                  className="relative flex h-40 items-center justify-center border-b-hair bg-[var(--bg3)]"
                  style={{ borderColor: 'var(--b)' }}
                >
                  <span className="select-none font-serif text-[44px] font-bold text-[rgba(0,0,0,0.06)]">
                    {post.mono ?? post.category.slice(0, 3).toUpperCase()}
                  </span>
                  <span
                    className="absolute left-3.5 top-3.5 border-hair bg-[var(--wh)] px-2.5 py-1 text-[8.5px] uppercase tracking-[0.22em] text-[var(--s3)]"
                    style={{ borderColor: 'var(--b)' }}
                  >
                    {categoryLabel(post.category)}
                  </span>
                </div>
                <div className="p-5">
                  <div className="mb-2 text-[9.5px] uppercase tracking-[0.1em] text-[var(--ink3)]">
                    {post.date}
                  </div>
                  <div className="mb-3 font-serif text-[16px] font-semibold leading-[1.45] text-[var(--ink)]">
                    {post.title}
                  </div>
                  <div className="text-[12px] leading-[1.7] text-[var(--ink3)]">
                    {post.excerpt}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
