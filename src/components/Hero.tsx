import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg3)]">
      {/* warm radial glow, ties the accent color into the base gray */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, var(--accent-soft) 0%, transparent 70%)' }}
      />

      {/* abstract node/network graphic — a quiet nod to the firm's blockchain
          & crypto-investigations practice, kept to the outer edges so it
          never competes with the centered copy */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g stroke="var(--accent-line)" strokeWidth="1" fill="none">
          <line x1="120" y1="140" x2="280" y2="220" />
          <line x1="280" y1="220" x2="200" y2="380" />
          <line x1="120" y1="140" x2="60" y2="320" />
          <line x1="60" y1="320" x2="200" y2="380" />
          <line x1="200" y1="380" x2="140" y2="600" />
          <line x1="1480" y1="160" x2="1340" y2="260" />
          <line x1="1340" y1="260" x2="1420" y2="420" />
          <line x1="1480" y1="160" x2="1540" y2="340" />
          <line x1="1540" y1="340" x2="1420" y2="420" />
          <line x1="1420" y1="420" x2="1480" y2="640" />
        </g>
        <g fill="var(--accent)">
          <circle cx="120" cy="140" r="3" opacity="0.55" />
          <circle cx="280" cy="220" r="2.5" opacity="0.45" />
          <circle cx="60" cy="320" r="2" opacity="0.4" />
          <circle cx="200" cy="380" r="3" opacity="0.5" />
          <circle cx="140" cy="600" r="2" opacity="0.35" />
          <circle cx="1480" cy="160" r="3" opacity="0.55" />
          <circle cx="1340" cy="260" r="2.5" opacity="0.45" />
          <circle cx="1540" cy="340" r="2" opacity="0.4" />
          <circle cx="1420" cy="420" r="3" opacity="0.5" />
          <circle cx="1480" cy="640" r="2" opacity="0.35" />
        </g>
      </svg>

      <div className="absolute bottom-0 top-0 left-12 hidden w-px bg-[color:var(--b)] sm:block" />
      <div className="absolute bottom-0 top-0 right-12 hidden w-px bg-[color:var(--b)] sm:block" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border-hair"
        style={{ borderColor: 'var(--accent-line)' }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border-hair border-dashed"
        style={{ borderColor: 'rgba(0,0,0,0.06)' }}
      />

      <div className="relative max-w-[840px] px-6 text-center">
        <div className="mb-7 flex items-center justify-center gap-4 text-[9.5px] font-medium uppercase tracking-[0.38em] text-[var(--s3)]">
          <span className="hidden h-px max-w-[56px] flex-1 bg-[color:var(--accent-line)] sm:block" />
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
            {t('eyebrow')}
          </span>
          <span className="hidden h-px max-w-[56px] flex-1 bg-[color:var(--accent-line)] sm:block" />
        </div>

        <Image
          src="/logo.jpg"
          alt="Gangan & Partners"
          width={72}
          height={72}
          className="mx-auto mb-8 h-[72px] w-[72px] rounded-full object-cover"
          style={{ filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.15))' }}
          priority
        />

        <h1 className="mb-6 font-serif text-[clamp(34px,4.8vw,64px)] font-bold leading-[1.07] text-[var(--ink)]">
          {t('titlePre')} <em className="italic text-[color:var(--accent-ink)]">{t('titleEm')}</em>
          <br />
          {t('titlePost')}
        </h1>

        <p className="mx-auto mb-14 max-w-[540px] text-[15px] font-light leading-[1.8] text-[var(--ink3)]">
          {t('sub')}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#ai"
            className="bg-[var(--ink)] px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--wh)] transition-all hover:bg-[#333] hover:shadow-[0_4px_24px_rgba(164,130,58,0.28)]"
          >
            {t('btn1')}
          </a>
          <a
            href="#practices"
            className="border-hair px-9 py-3.5 text-[11px] tracking-wide text-[var(--ink)] transition-colors hover:border-[color:var(--accent-line)] hover:text-[color:var(--accent-ink)]"
            style={{ borderColor: 'var(--bs)' }}
          >
            {t('btn2')}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-[var(--s3)]">
        <span
          className="h-[38px] w-px"
          style={{ background: 'linear-gradient(to bottom, var(--s3), transparent)' }}
        />
        {t('scroll')}
      </div>
    </section>
  );
}
