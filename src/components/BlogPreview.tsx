import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllPosts, type FallbackPost } from '@/lib/blog';

export default async function BlogPreview() {
  const locale = await getLocale();
  const t = await getTranslations('Blog');
  const fallbackPosts = t.raw('fallbackPosts') as FallbackPost[];
  const posts = (await getAllPosts(locale, fallbackPosts)).slice(0, 3);

  return (
    <section id="blog" className="bg-[var(--bg2)] px-6 py-24 sm:px-11">
      <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.4em] text-[var(--s3)]">
        {t('lbl')}
      </div>
      <h2 className="mb-5 font-serif text-[clamp(26px,3.2vw,44px)] font-bold leading-[1.1] text-[var(--ink)]">
        {t('title')}
      </h2>
      <div className="divider" />

      <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                {post.category}
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

      <div className="mt-10">
        <Link
          href="/blog"
          className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--ink2)] transition-colors hover:text-[var(--ink)]"
        >
          {t('viewAll')} →
        </Link>
      </div>
    </section>
  );
}
