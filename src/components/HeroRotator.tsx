'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';

export type HeroNewsItem = {
  slug: string;
  title: string;
  eyebrow?: string;
};

/**
 * Hero background photo (static — pass a single image) plus a slow, soft
 * crossfading caption cycling through the firm's latest news items, styled
 * like a law-firm carousel slide: small eyebrow label, headline-style link,
 * separate "read more" line. The caption fade is deliberately gentle and
 * unhurried (long hold, slow ease crossfade) rather than snappy. Falls back
 * gracefully to nothing shown if no news items are available.
 */
export default function HeroRotator({
  images,
  newsItems,
  label,
  readMoreLabel,
}: {
  images: string[];
  newsItems: HeroNewsItem[];
  label: string;
  readMoreLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const newsCount = Math.max(newsItems.length, 1);
  const imgCount = Math.max(images.length, 1);

  useEffect(() => {
    if (newsCount <= 1) return;
    // slow, deliberate hold between changes — softer pacing than a typical
    // UI carousel, closer to an editorial slideshow.
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % newsCount);
    }, 9000);
    return () => window.clearInterval(id);
  }, [newsCount]);

  return (
    <>
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[2200ms] ease-in-out"
          style={{ backgroundImage: `url('${src}')`, opacity: i === index % imgCount ? 1 : 0 }}
        />
      ))}

      {newsItems.length > 0 && (
        <div className="absolute bottom-24 left-1/2 z-10 w-full max-w-[860px] -translate-x-1/2 px-6 text-center sm:bottom-28">
          <div className="relative h-[68px] sm:h-[60px]">
            {newsItems.map((item, i) => (
              <Link
                key={item.slug}
                href={`/news/${item.slug}`}
                aria-hidden={i !== index}
                tabIndex={i === index ? 0 : -1}
                className="group absolute inset-x-0 top-0 flex flex-col items-center gap-1.5 transition-opacity duration-[1800ms] ease-in-out"
                style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? 'auto' : 'none' }}
              >
                <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[var(--s3)]">
                  {item.eyebrow ?? label}
                </span>
                <span className="line-clamp-1 max-w-full font-serif text-[14px] font-semibold leading-tight text-[var(--ink)] sm:text-[17px]">
                  {item.title}
                </span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--ink3)] transition-colors group-hover:text-[var(--s3)]">
                  {readMoreLabel} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
