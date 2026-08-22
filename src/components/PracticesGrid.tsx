import type { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { topLevelPracticeSlugs } from '@/data/practices';
import { PRACTICE_ICONS } from './PracticeIcons';

// Themed "3D still life" card per practice — a thin title strip over a
// full-bleed photo of objects associated with that field of law (e.g. the
// Criminal Procedural Code, an evidence bag, a case file for Criminal
// Defense). Added one practice at a time as real renders come in; slugs
// without an entry here keep the plain icon-card layout below.
const PRACTICE_CARD_IMAGES: Partial<Record<(typeof topLevelPracticeSlugs)[number], string>> = {
  'criminal-defense': '/practice-card-criminal-defense.jpg',
};

// This section runs light-on-dark, independent of the site's light theme —
// same approach as Hero.tsx — so the moody corridor photo and the card grid
// read as one continuous scene instead of a light card block dropped onto a
// dark photo. Every var(--ink)/(--s3)/etc. reference below cascades through
// this override automatically.
const practicesLocalVars = {
  '--ink': '#f7f4ee',
  '--ink2': 'rgba(247,244,238,0.72)',
  '--ink3': 'rgba(247,244,238,0.58)',
  '--bgc': 'rgba(24,19,14,0.5)',
  '--wh': 'rgba(36,29,21,0.7)',
  '--b': 'rgba(247,244,238,0.16)',
  '--s3': '#d9c9a8',
} as CSSProperties;

export default function PracticesGrid() {
  const t = useTranslations('Practices');
  // Only the 5 top-level "fields of law" show as cards here. Criminal
  // Defense's own specializations (crypto-fraud, AML, etc.) are Practices.list
  // items 5-9 — intentionally excluded so they aren't listed twice (once as a
  // field of law, once as a Criminal Defense sub-topic). They're still fully
  // reachable at their own URLs, linked from the Criminal Defense page.
  const list = (
    t.raw('list') as Array<{
      num: string;
      title: string;
      desc: string;
    }>
  ).slice(0, topLevelPracticeSlugs.length);

  return (
    <section
      id="practices"
      className="relative overflow-hidden px-6 py-24 sm:px-11"
      style={practicesLocalVars}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/practices-corridor-bg-v2.jpg')" }}
      />
      {/* moody marble/bronze corridor render, kept dark and atmospheric the
          whole way down — deeper toward the bottom where the cards sit —
          so the photo and the frosted-glass cards read as one continuous
          scene instead of a light card block dropped onto a dark photo. */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,8,6,0.5)] via-[rgba(10,8,6,0.68)] to-[rgba(10,8,6,0.86)]" />

      <div className="relative z-10">
        <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.4em] text-[var(--s3)]">
          {t('lbl')}
        </div>
        <h2 className="mb-5 font-serif text-[clamp(26px,3.2vw,44px)] font-light leading-[1.1] text-[var(--ink)]">
          {t('title')}
        </h2>
        <div className="divider" />
        <p className="max-w-[460px] text-[14.5px] leading-[1.8] text-[var(--ink3)]">
          {t('sub')}
        </p>

        <div
          className="mt-20 grid grid-cols-1 overflow-hidden rounded-lg border-hair sm:grid-cols-2 lg:grid-cols-3"
          style={{ borderColor: 'var(--b)' }}
        >
          {list.map((p, i) => {
            const slug = topLevelPracticeSlugs[i];
            const Icon = PRACTICE_ICONS[slug];
            const cardImage = PRACTICE_CARD_IMAGES[slug];

            if (cardImage) {
              return (
                <Link
                  key={slug}
                  href={`/practices/${slug}`}
                  className="group relative flex min-h-[340px] flex-col overflow-hidden border-hair transition-transform"
                  style={{ borderColor: 'var(--b)' }}
                >
                  {/* thin title strip — the practice name, not baked into the
                      photo, so it stays crisp and locale-independent */}
                  <div className="relative z-10 flex items-center justify-between gap-3 bg-black px-5 py-3">
                    <span className="text-[9.5px] font-semibold tracking-[0.24em] text-[var(--s3)]">
                      {p.num}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                      {p.title}
                    </span>
                  </div>

                  <div className="relative flex-1">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${cardImage}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.75)] via-[rgba(0,0,0,0.05)] to-transparent" />
                    <span className="relative z-10 flex h-full items-end px-5 pb-5">
                      <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--ink)] transition-all group-hover:gap-3 group-hover:text-[var(--s3)]">
                        {t('cardLink')} →
                      </span>
                    </span>
                  </div>
                </Link>
              );
            }

            return (
              <Link
                key={slug}
                href={`/practices/${slug}`}
                className="group relative min-h-[340px] overflow-hidden border-hair bg-[var(--bgc)] p-9 backdrop-blur-sm transition-colors hover:bg-[var(--wh)]"
                style={{ borderColor: 'var(--b)' }}
              >
                <span className="pointer-events-none absolute bottom-0 left-0 h-[1.5px] w-0 bg-[var(--s3)] transition-all duration-300 group-hover:w-full" />
                <Icon className="pointer-events-none absolute -bottom-4 -right-4 h-[130px] w-[130px] opacity-[0.08] transition-opacity duration-300 group-hover:opacity-[0.14]" />
                <div className="relative mb-5 flex items-start justify-between">
                  <span className="text-[9.5px] font-semibold tracking-[0.24em] text-[var(--s3)]">
                    {p.num}
                  </span>
                  <Icon className="h-7 w-7 text-[var(--ink3)]" />
                </div>
                <div className="relative mb-3 font-serif text-[18px] font-semibold leading-[1.3] text-[var(--ink)]">
                  {p.title}
                </div>
                <div className="relative mb-6 text-[12.5px] leading-[1.75] text-[var(--ink3)]">
                  {p.desc}
                </div>
                <span className="relative flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--ink2)] transition-all group-hover:gap-3 group-hover:text-[var(--s3)]">
                  {t('cardLink')} →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
