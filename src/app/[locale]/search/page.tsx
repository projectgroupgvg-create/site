import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildAlternates } from '@/lib/metadata';
import { practiceSlugs } from '@/data/practices';
import { getAllPosts, type FallbackPost } from '@/lib/blog';
import { getAllNews, type FallbackNewsItem } from '@/lib/news';
import SearchClient, { type SearchItem } from '@/components/SearchClient';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Search' });
  return {
    title: t('title'),
    alternates: buildAlternates(locale, '/search'),
    robots: { index: false, follow: true },
  };
}

type PracticeContent = { title: string; desc: string };

export default async function SearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Search');
  const tPractices = await getTranslations('Practices');
  const tBlog = await getTranslations('Blog');
  const tNews = await getTranslations('News');

  const practiceList = tPractices.raw('list') as PracticeContent[];
  const practiceItems: SearchItem[] = practiceList.map((p, i) => ({
    type: 'practice',
    title: p.title,
    excerpt: p.desc,
    href: `/practices/${practiceSlugs[i]}`,
  }));

  const fallbackPosts = tBlog.raw('fallbackPosts') as FallbackPost[];
  const posts = await getAllPosts(locale, fallbackPosts);
  const blogItems: SearchItem[] = posts.map((p) => ({
    type: 'blog',
    title: p.title,
    excerpt: p.excerpt,
    href: `/blog/${p.slug}`,
  }));

  const fallbackNews = tNews.raw('fallbackNews') as FallbackNewsItem[];
  const news = await getAllNews(locale, fallbackNews);
  const newsItems: SearchItem[] = news.map((n) => ({
    type: 'news',
    title: n.title,
    excerpt: n.excerpt,
    href: `/news/${n.slug}`,
  }));

  const items = [...practiceItems, ...blogItems, ...newsItems];

  return (
    <main>
      <div className="border-b-hair bg-[var(--bg2)] px-6 py-16 sm:px-11" style={{ borderColor: 'var(--b)' }}>
        <h1 className="mb-3 font-serif text-[clamp(24px,3vw,38px)] font-bold leading-[1.1] text-[var(--ink)]">
          {t('title')}
        </h1>
      </div>
      <div className="mx-auto max-w-[680px] px-6 py-16 sm:px-11">
        <SearchClient items={items} />
      </div>
    </main>
  );
}
