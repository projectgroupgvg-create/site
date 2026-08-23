import type { CSSProperties, ComponentType } from 'react';
import { useTranslations, useLocale } from 'next-intl';
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
  'civil-law': '/practice-card-civil-law.jpg',
  'commercial-law': '/practice-card-commercial-law.jpg',
  'administrative-law': '/practice-card-administrative-law.jpg',
};

// The background photo is a light cream marble panel, so — unlike the
// previous dark corridor render — the section itself stays on the site's
// normal light theme (dark ink text directly on the marble, same pattern
// as the /news archive header). Only the card grid is scoped to this
// dark-glass override, so each card still reads as a dark module sitting
// on top of the light marble, the way it did against the old dark photo.
const practicesLocalVars = {
  '--ink': '#f7f4ee',
  '--ink2': 'rgba(247,244,238,0.72)',
  '--ink3': 'rgba(247,244,238,0.58)',
  '--bgc': 'rgba(24,19,14,0.5)',
  '--wh': 'rgba(36,29,21,0.7)',
  '--b': 'rgba(247,244,238,0.16)',
  '--s3': '#d9c9a8',
} as CSSProperties;

type GridCard = {
  key: string;
  href: string;
  num: string;
  title: string;
  desc: string;
  Icon?: ComponentType<{ className?: string }>;
  cardImage?: string;
};

export default function PracticesGrid() {
  const t = useTranslations('Practices');
  const locale = useLocale();
  // Only the 6 top-level "fields of law" show as cards here. Criminal
  // Defense's own specializations (crypto-fraud, AML, etc.) are further down
  // Practices.list — intentionally excluded so they aren't listed twice (once
  // as a field of law, once as a Criminal Defense sub-topic). They're still
  // fully reachable at their own URLs, linked from the Criminal Defense page.
  const list = (
    t.raw('list') as Array<{
      num: string;
      title: string;
      desc: string;
    }>
  ).slice(0, topLevelPracticeSlugs.length);

  const cards: GridCard[] = topLevelPracticeSlugs.map((slug, i) => ({
    key: slug,
    href: `/practices/${slug}`,
    num: list[i].num,
    title: list[i].title,
    desc: list[i].desc,
    Icon: PRACTICE_ICONS[slug],
    cardImage: PRACTICE_CARD_IMAGES[slug],
  }));

  // Ukrainian-only swap: the client wants the homepage grid to foreground
  // virtual-currency work instead of Land Law, linking out to the existing
  // /virtual-assets hub (a separate uk-only SEO pillar page, not a
  // /practices/[slug] page — see project memory on uk-only pillar pages).
  // Land Law's own page is untouched and still reachable directly; it's
  // just no longer advertised in this grid. Other locales keep the original
  // Land Law card since /virtual-assets has no en/de/fr translation.
  if (locale === 'uk') {
    const vc = t.raw('virtualCurrencies') as { num: string; title: string; desc: string };
    const landIndex = cards.findIndex((c) => c.key === 'land-law');
    if (landIndex !== -1) {
      cards[landIndex] = {
        key: 'virtual-currencies',
        href: '/virtual-assets',
        num: vc.num,
        title: vc.title,
        desc: vc.desc,
        cardImage: '/practice-card-virtual-currencies.jpg',
      };
    }
  }

  return (
    <section
      id="practices"
      className="relative overflow-hidden px-6 py-24 sm:px-11"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/practices-bg-marble.jpg')" }}
      />
      {/* cream marble-panel render — a light warm scrim (not a dark one,
          since the photo itself is already light) keeps heading/body text
          readable while the marble texture still clearly shows through,
          same approach as the /news archive page header. */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(250,247,242,0.55)] via-[rgba(250,247,242,0.7)] to-[rgba(250,247,242,0.85)]" />

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

        <div className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" style={practicesLocalVars}>
          {cards.map((card) => {
            const Icon = card.Icon;

            if (card.cardImage) {
              return (
                <Link
                  key={card.key}
                  href={card.href}
                  className="group relative flex min-h-[380px] flex-col overflow-hidden rounded-lg border-hair transition-transform"
                  style={{ borderColor: 'var(--b)' }}
                >
                  {/* thin title strip — the practice name, not baked into the
                      photo, so it stays crisp and locale-independent */}
                  <div className="relative z-10 flex items-center justify-between gap-3 bg-black px-6 py-4">
                    <span className="text-[10px] font-semibold tracking-[0.24em] text-[var(--s3)]">
                      {card.num}
                    </span>
                    <span className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                      {card.title}
                    </span>
                  </div>

                  <div className="relative flex-1">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${card.cardImage}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.75)] via-[rgba(0,0,0,0.05)] to-transparent" />
                    <span className="relative z-10 flex h-full items-end px-6 pb-6">
                      <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--ink)] transition-all group-hover:gap-3 group-hover:text-[var(--s3)]">
                        {t('cardLink')} →
                      </span>
                    </span>
                  </div>
                </Link>
              );
            }

            return (
              <Link
                key={card.key}
                href={card.href}
                className="group relative flex min-h-[380px] flex-col justify-center overflow-hidden rounded-lg border-hair bg-[var(--bgc)] p-10 backdrop-blur-sm transition-colors hover:bg-[var(--wh)]"
                style={{ borderColor: 'var(--b)' }}
              >
                <span className="pointer-events-none absolute bottom-0 left-0 h-[1.5px] w-0 bg-[var(--s3)] transition-all duration-300 group-hover:w-full" />
                {Icon && (
                  <Icon className="pointer-events-none absolute -bottom-6 -right-6 h-[170px] w-[170px] opacity-[0.08] transition-opacity duration-300 group-hover:opacity-[0.14]" />
                )}
                <div className="relative mb-6 flex items-start justify-between">
                  <span className="text-[10px] font-semibold tracking-[0.24em] text-[var(--s3)]">
                    {card.num}
                  </span>
                  {Icon && <Icon className="h-9 w-9 text-[var(--ink3)]" />}
                </div>
                <div className="relative mb-4 font-serif text-[22px] font-semibold leading-[1.3] text-[var(--ink)]">
                  {card.title}
                </div>
                <div className="relative mb-7 max-w-[380px] text-[13.5px] leading-[1.8] text-[var(--ink3)]">
                  {card.desc}
                </div>
                <span className="relative flex items-center gap-2 text-[10.5px] font-medium uppercase tracking-[0.12em] text-[var(--ink2)] transition-all group-hover:gap-3 group-hover:text-[var(--s3)]">
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
