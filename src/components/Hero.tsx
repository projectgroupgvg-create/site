import type { CSSProperties } from 'react';
import { getTranslations, getLocale } from 'next-intl/server';
import HeroCarousel from './HeroCarousel';
import { getAllNews, type FallbackNewsItem } from '@/lib/news';

// Hero runs light-on-dark locally, independent of the site's light theme —
// standard treatment for a photo hero. These CSS custom properties are
// scoped to this section only (they cascade to every var(--ink) etc. used
// by the children below) so no other page is affected.
const heroLocalVars = {
  '--ink': '#f7f4ee',
  '--ink-hover': '#e3dcc9',
  '--wh': '#1c1510',
  '--s3': '#d9c9a8',
  '--b': 'rgba(247,244,238,0.22)',
  '--bs': 'rgba(247,244,238,0.4)',
} as CSSProperties;

export default async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations('Hero');
  const newsT = await getTranslations('News');
  const fallbackNews = newsT.raw('fallbackNews') as FallbackNewsItem[];
  const latestNews = (await getAllNews(locale, fallbackNews))
    .slice(0, 3)
    .map((n) => ({ slug: n.slug, title: n.title }));

  return (
    <section className="relative min-h-screen overflow-hidden" style={heroLocalVars}>
      {/* First-visit reveal: brand identity slide (photo + firm name +
          tagline + CTAs) shown first, then after a few seconds the whole
          slide — image included — slides fully left and is replaced by an
          announcement-style slide (photo + news headline + link), cycling
          through the firm's latest news. See HeroCarousel for the timing
          and transition mechanics. */}
      <HeroCarousel
        brandBg="/hero-bg-v2.jpg"
        newsBg="/hero-bg.jpg"
        newsItems={latestNews}
        eyebrow={t('eyebrow')}
        btn1Label={t('btn1')}
        btn2Label={t('btn2')}
        scrollLabel={t('scroll')}
        readMoreLabel={t('readMore')}
      />
    </section>
  );
}
