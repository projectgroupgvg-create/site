'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';

export type HeroNewsItem = {
  slug: string;
  title: string;
  excerpt?: string;
  eyebrow?: string;
};

/**
 * Hero background photos crossfade slowly through a small set of real
 * images, in sync with a caption cycling through the firm's latest news
 * items — styled like a law-firm carousel slide (small eyebrow/category
 * label, large multi-line headline, short excerpt, separate "read more"
 * link), bottom-left aligned, similar to lw.com's homepage slider. Both the
 * photo crossfade and the caption fade are deliberately slow and soft (long
 * hold, gentle ease) rather than snappy. All stacked items share the same
 * CSS grid cell so the caption block's height can vary per item (headlines
 * wrap to different numbers of lines) without an explicit fixed height.
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
        <div className="absolute bottom-10 left-6 z-10 grid max-w-[560px] text-left sm:bottom-14 sm:left-12">
          {newsItems.map((item, i) => (
            <Link
              key={item.slug}
              href={`/news/${item.slug}`}
              aria-hidden={i !== index}
              tabIndex={i === index ? 0 : -1}
              className="group transition-opacity duration-[1800ms] ease-in-out"
              style={{
                gridArea: '1 / 1',
                opacity: i === index ? 1 : 0,
                pointerEvents: i === index ? 'auto' : 'none',
              }}
            >
              <span className="mb-2 block text-[9.5px] font-semibold uppercase tracking-[0.32em] text-[var(--s3)]">
                {item.eyebrow ?? label}
              </span>
              <span className="line-clamp-2 mb-2.5 block font-serif text-[clamp(17px,2.2vw,24px)] font-semibold leading-[1.25] text-[var(--ink)]">
                {item.title}
              </span>
              {item.excerpt && (
                <span className="line-clamp-1 mb-3 hidden max-w-[480px] text-[13px] leading-[1.5] text-[var(--ink3)] sm:block">
                  {item.excerpt}
                </span>
              )}
              <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--ink)] transition-colors group-hover:text-[var(--s3)]">
                {readMoreLabel} →
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
