import { useTranslations } from 'next-intl';

type Stat = { value: string; label: string };

// Sits directly under the Hero — a compact, credibility-signaling strip of
// real operational numbers (reuses About.stats so the figures stay in sync
// with the /about page rather than duplicating data).
export default function CredibilityBar() {
  const t = useTranslations('About');
  const stats = t.raw('stats') as Stat[];

  return (
    <section
      className="border-b-hair bg-[var(--bg3)]"
      style={{ borderColor: 'var(--b)' }}
    >
      <div className="mx-auto grid max-w-[1100px] grid-cols-2 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center gap-1 px-4 py-8 text-center sm:py-10 ${
              i > 0 ? 'sm:border-l-hair' : ''
            }`}
            style={{ borderColor: 'var(--b)' }}
          >
            <div className="font-serif text-[26px] font-bold text-[var(--ink)] sm:text-[32px]">
              {stat.value}
            </div>
            <div className="text-[9.5px] uppercase tracking-[0.1em] text-[var(--ink3)] sm:text-[10px]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
