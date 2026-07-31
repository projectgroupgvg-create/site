'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import HeroVideo from './HeroVideo';

export type HeroNewsSlide = {
  slug: string;
  title: string;
};

// First-visit reveal, exactly as requested: the visitor sees the full brand
// identity slide first (photo + firm name + tagline + CTAs). After a short
// beat it slides fully out to the left — image and all — and is replaced by
// an announcement-style slide: just the photo, the news headline, and a
// link into that section of the site. Subsequent slides keep cycling
// through the firm's latest news the same way, holding longer between each
// change than the initial reveal.
const INITIAL_HOLD_MS = 4000;
const NEWS_HOLD_MS = 8500;
const SLIDE_TRANSITION_MS = 1300;

export default function HeroCarousel({
  brandBg,
  newsBg,
  newsItems,
  eyebrow,
  btn1Label,
  btn2Label,
  scrollLabel,
  readMoreLabel,
}: {
  brandBg: string;
  newsBg: string;
  newsItems: HeroNewsSlide[];
  eyebrow: string;
  btn1Label: string;
  btn2Label: string;
  scrollLabel: string;
  readMoreLabel: string;
}) {
  const newsCount = newsItems.length;
  const slideCount = 1 + newsCount;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slideCount <= 1) return;
    const delay = index === 0 ? INITIAL_HOLD_MS : NEWS_HOLD_MS;
    const id = window.setTimeout(() => {
      // slide 0 is the one-time brand intro; once we've left it, keep
      // cycling only through the news slides (1..slideCount-1).
      setIndex((i) => (i === 0 ? 1 : (i % (slideCount - 1)) + 1));
    }, delay);
    return () => window.clearTimeout(id);
  }, [index, slideCount]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="flex h-full"
        style={{
          width: `${slideCount * 100}%`,
          transform: `translateX(-${(100 / slideCount) * index}%)`,
          transition: `transform ${SLIDE_TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
        }}
      >
        {/* slide 0 — brand identity, shown first on every fresh page load */}
        <div className="relative h-full shrink-0" style={{ width: `${100 / slideCount}%` }}>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${brandBg}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.82)] via-[rgba(10,8,6,0.58)] to-[rgba(10,8,6,0.65)]" />
          <HeroVideo />

          <div className="absolute bottom-0 top-0 left-12 hidden w-px bg-[color:var(--b)] sm:block" />
          <div className="absolute bottom-0 top-0 right-12 hidden w-px bg-[color:var(--b)] sm:block" />

          <div
            className="pointer-events-none absolute -right-24 -top-24 h-[480px] w-[480px] rounded-full border-hair"
            style={{ borderColor: 'var(--b)' }}
          />

          <Image
            src="/logo-transparent.png"
            alt=""
            width={800}
            height={800}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.1] sm:h-[560px] sm:w-[560px]"
          />

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <h1 className="mb-8 whitespace-nowrap font-display text-[clamp(22px,4.4vw,48px)] tracking-[0.03em] text-metal-photo">
              GANGAN &amp; PARTNERS
            </h1>
            <div className="mb-10 text-[clamp(16px,1.8vw,21px)] font-medium uppercase tracking-[0.32em] text-[var(--s3)]">
              {eyebrow}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#ai"
                className="rounded-sm bg-[var(--ink)] px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--wh)] transition-colors hover:bg-[var(--ink-hover)]"
              >
                {btn1Label}
              </a>
              <a
                href="#practices"
                className="rounded-sm border-hair px-9 py-3.5 text-[11px] tracking-wide text-[var(--ink)] transition-colors hover:text-[var(--s3)]"
                style={{ borderColor: 'var(--bs)' }}
              >
                {btn2Label}
              </a>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-[var(--s3)]">
            <span
              className="h-[38px] w-px"
              style={{ background: 'linear-gradient(to bottom, var(--s3), transparent)' }}
            />
            {scrollLabel}
          </div>
        </div>

        {/* news slides — deliberately minimal: just the photo, the
            headline, and a link into that news item's own page. No brand
            name, no CTAs, no decorative elements. */}
        {newsItems.map((item) => (
          <div key={item.slug} className="relative h-full shrink-0" style={{ width: `${100 / slideCount}%` }}>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${newsBg}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.72)] via-[rgba(10,8,6,0.48)] to-[rgba(10,8,6,0.52)]" />

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
              <Link href={`/news/${item.slug}`} className="group max-w-[860px]">
                <span className="block font-serif text-[clamp(24px,4vw,44px)] font-bold leading-[1.2] text-[var(--ink)]">
                  {item.title}
                </span>
                <span className="mt-7 inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--s3)] transition-colors group-hover:text-[var(--ink)]">
                  {readMoreLabel} →
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
