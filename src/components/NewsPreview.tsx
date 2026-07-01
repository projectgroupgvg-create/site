import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllNews, type FallbackNewsItem } from '@/lib/news';

// Deliberately a compact list (not cards, unlike BlogPreview) — news items
// are short firm announcements, so a text-forward feed reads faster and
// visually differentiates "News" from "Blog" on the homepage.
export default async function NewsPreview() {
  const locale = await getLocale();
  const t = await getTranslations('News');
  const fallbackNews = t.raw('fallbackNews') as FallbackNewsItem[];
  const types = t.raw('types') as { slug: string; label: string }[];
  const news = (await getAllNews(locale, fallbackNews)).slice(0, 4);

  const typeLabel = (slug: string) =>
    types.find((tItem) => tItem.slug === slug)?.label ?? slug;

  return (
    <section id="news" className="bg-[var(--bg3)] px-6 py-24 sm:px-11">
      <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.4em] text-[var(--s3)]">
        {t('lbl')}
      </div>
      <h2 className="mb-5 font-serif text-[clamp(26px,3.2vw,44px)] font-bold leading-[1.1] text-[var(--ink)]">
        {t('title')}
      </h2>
      <div className="divider" />

      <div className="mt-12 max-w-[820px] border-hair" style={{ borderColor: 'var(--b)' }}>
        {news.map((item) => (
          <Link
            key={item.slug}
            href={`/news/${item.slug}`}
            className="flex flex-col gap-2 border-b-hair px-6 py-6 transition-colors last:border-b-0 hover:bg-[var(--bgc)] sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            style={{ borderColor: 'var(--b)' }}
          >
            <div>
              <div className="mb-1.5 flex items-center gap-3 text-[9px] uppercase tracking-[0.18em] text-[var(--s3)]">
                <span>{typeLabel(item.newsType)}</span>
                <span className="text-[var(--ink3)]">{item.date}</span>
              </div>
              <div className="font-serif text-[15px] font-semibold leading-[1.4] text-[var(--ink)]">
                {item.title}
              </div>
            </div>
            <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.1em] text-[var(--ink3)] sm:flex-shrink-0">
              {t('readMore')} →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/news"
          className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--ink2)] transition-colors hover:text-[var(--ink)]"
        >
          {t('viewAll')} →
        </Link>
      </div>
    </section>
  );
}
