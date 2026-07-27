import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { topLevelPracticeSlugs } from '@/data/practices';
import { PRACTICE_ICONS } from './PracticeIcons';

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
    <section id="practices" className="relative overflow-hidden bg-[var(--bg2)] px-6 py-24 sm:px-11">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/practices-section-bg.jpg')" }}
      />
      {/* the photo is a very light, low-contrast abstract marble/glass render —
          a soft scrim back to --bg2 keeps card text readable while still
          letting the texture show through above/around the grid */}
      <div className="absolute inset-0 bg-[var(--bg2)]/75" />

      <div className="relative z-10">
        <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.4em] text-[var(--s3)]">
          {t('lbl')}
        </div>
        <h2 className="mb-5 font-serif text-[clamp(26px,3.2vw,44px)] font-bold leading-[1.1] text-[var(--ink)]">
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
            const Icon = PRACTICE_ICONS[topLevelPracticeSlugs[i]];
            return (
              <Link
                key={topLevelPracticeSlugs[i]}
                href={`/practices/${topLevelPracticeSlugs[i]}`}
                className="group relative overflow-hidden border-hair bg-[var(--bgc)] p-9 transition-colors hover:bg-[var(--wh)]"
                style={{ borderColor: 'var(--b)' }}
              >
                <span className="pointer-events-none absolute bottom-0 left-0 h-[1.5px] w-0 bg-[var(--ink)] transition-all duration-300 group-hover:w-full" />
                <Icon className="pointer-events-none absolute -bottom-4 -right-4 h-[130px] w-[130px] opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.1]" />
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
                <span className="relative flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--ink2)] transition-all group-hover:gap-3 group-hover:text-[var(--ink)]">
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
