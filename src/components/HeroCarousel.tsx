'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import HeroVideo from './HeroVideo';
import BannerWatermark from './BannerWatermark';

export type HeroNewsSlide = {
  slug: string;
  title: string;
  // Optional per-item photo (matched to that specific news story, e.g. the
  // building where a hearing took place). Falls back to the shared newsBg
  // for any item that doesn't have one yet.
  bg?: string;
};

// First-visit reveal: the visitor sees the full brand identity slide first
// (photo + firm name + tagline + CTAs). After a short beat it fades out and
// an announcement-style slide slowly fades in — just the photo, a small
// "news" label, the headline, and a "read more" link, left-aligned. Slides
// crossfade (no sliding/page-turn motion) and hold longer between changes
// than the initial reveal.
const INITIAL_HOLD_MS = 4000;
const NEWS_HOLD_MS = 8500;
const FADE_MS = 2000;

const TIMES_FONT = "'Times New Roman', Times, serif";

export default function HeroCarousel({
  brandBg,
  newsBg,
  newsItems,
  eyebrow,
  btn1Label,
  btn2Label,
  scrollLabel,
  newsLabel,
  readMoreLabel,
}: {
  brandBg: string;
  newsBg: string;
  newsItems: HeroNewsSlide[];
  eyebrow: string;
  btn1Label: string;
  btn2Label: string;
  scrollLabel: string;
  newsLabel: string;
  readMoreLabel: string;
}) {
  const newsCount = newsItems.length;
  const slideCount = 1 + newsCount;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slideCount <= 1) return;
    const delay = index === 0 ? INITIAL_HOLD_MS : NEWS_HOLD_MS;
    const id = window.setTimeout(() => {
      // full loop: brand slide -> each news slide in turn -> back to the
      // brand slide again, repeating for as long as the page stays open.
      setIndex((i) => (i + 1) % slideCount);
    }, delay);
    return () => window.clearTimeout(id);
  }, [index, slideCount]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* slide 0 — brand identity, shown first on every fresh page load */}
      <div
        className="absolute inset-0 transition-opacity ease-in-out"
        style={{ opacity: index === 0 ? 1 : 0, transitionDuration: `${FADE_MS}ms`, zIndex: index === 0 ? 1 : 0 }}
      >
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

      {/* news slides — deliberately minimal: just the photo, a small "news"
          label, the headline, and a link into that news item's own page.
          No brand name, no CTAs, no decorative elements. Left-aligned,
          Times New Roman, stacked on the same layer so they crossfade with
          each other and with the brand slide above. */}
      {newsItems.map((item, i) => (
        <div
          key={item.slug}
          className="absolute inset-0 transition-opacity ease-in-out"
          style={{
            opacity: index === i + 1 ? 1 : 0,
            transitionDuration: `${FADE_MS}ms`,
            zIndex: index === i + 1 ? 1 : 0,
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${item.bg ?? newsBg}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.72)] via-[rgba(10,8,6,0.48)] to-[rgba(10,8,6,0.52)]" />
          <BannerWatermark />

          <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-16">
            <Link
              href={`/news/${item.slug}`}
              className="group max-w-[760px] text-left"
              style={{ fontFamily: TIMES_FONT }}
            >
              <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--s3)]">
                {newsLabel}
              </span>
              <div className="my-1">
                <span className="box-decoration-clone inline bg-[rgba(10,8,6,0.55)] px-2.5 py-1 text-[clamp(26px,4.2vw,48px)] font-normal leading-[1.45] text-[var(--ink)]">
                  {item.title}
                </span>
              </div>
              <span className="mt-6 inline-block text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--ink)] transition-colors group-hover:text-[var(--s3)]">
                {readMoreLabel} →
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
