'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';

export type HeroNewsItem = {
  slug: string;
  title: string;
};

/**
 * Rotates the hero's background photo through a small set of images, each
 * paired with one of the firm's latest news items (shown as a small link
 * near the bottom of the hero, changing in sync with the background).
 * Purely decorative/informational — falls back gracefully to a single
 * static background if only one image or no news items are available.
 */
export default function HeroRotator({
  images,
  newsItems,
  label,
}: {
  images: string[];
  newsItems: HeroNewsItem[];
  label: string;
}) {
  const [index, setIndex] = useState(0);
  const count = Math.max(images.length, 1);

  useEffect(() => {
    if (count <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 6500);
    return () => window.clearInterval(id);
  }, [count]);

  const currentNews = newsItems[index % Math.max(newsItems.length, 1)];

  return (
    <>
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out"
          style={{ backgroundImage: `url('${src}')`, opacity: i === index ? 1 : 0 }}
        />
      ))}

      {currentNews && (
        <Link
          href={`/news/${currentNews.slug}`}
          className="group absolute bottom-20 left-1/2 z-10 flex max-w-[92vw] -translate-x-1/2 items-center gap-3 rounded-sm border-hair bg-[rgba(10,8,6,0.35)] px-5 py-2.5 text-[11px] text-[var(--ink)] backdrop-blur-sm transition-colors hover:bg-[rgba(10,8,6,0.55)] sm:max-w-none"
          style={{ borderColor: 'var(--b)' }}
        >
          <span className="whitespace-nowrap font-semibold uppercase tracking-[0.16em] text-[var(--s3)]">
            {label}
          </span>
          <span className="truncate text-[var(--ink)] group-hover:text-[var(--s3)]">
            {currentNews.title}
          </span>
        </Link>
      )}
    </>
  );
}
