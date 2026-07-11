import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { practiceSlugs } from '@/data/practices';
import { PRACTICE_ICONS } from './PracticeIcons';

export default function PracticesGrid() {
  const t = useTranslations('Practices');
  const list = t.raw('list') as Array<{
    num: string;
    title: string;
    desc: string;
  }>;

  return (
    <section id="practices" className="bg-[var(--bg2)] px-6 py-24 sm:px-11">
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
          const Icon = PRACTICE_ICONS[practiceSlugs[i]];
          return (
            <Link
              key={practiceSlugs[i]}
              href={`/practices/${practiceSlugs[i]}`}
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
    </section>
  );
}
