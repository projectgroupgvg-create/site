import type { CSSProperties } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import HeroVideo from './HeroVideo';

// Hero runs light-on-dark locally, independent of the site's light theme —
// standard treatment for a photo hero. These CSS custom properties are
// scoped to this section only (they cascade to every var(--ink) etc. used
// by the children below) so no other page is affected.
const heroLocalVars = {
  '--ink': '#f7f4ee',
  '--ink-hover': '#e3dcc9',
  '--wh': '#1c1510',
  '--s3': '#d9c9a8',
  '--b': 'rgba(247,244,238,0.22)',
  '--bs': 'rgba(247,244,238,0.4)',
} as CSSProperties;

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-28"
      style={heroLocalVars}
    >
      {/* photo hero: office at dusk overlooking the city. HeroVideo layers on
          top and fades in automatically if a real video is later added at
          /public/videos/hero.(webm|mp4) — otherwise this photo is the whole
          background. */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.75)] via-[rgba(10,8,6,0.45)] to-[rgba(10,8,6,0.55)]" />
      <HeroVideo />

      <div className="absolute bottom-0 top-0 left-12 hidden w-px bg-[color:var(--b)] sm:block" />
      <div className="absolute bottom-0 top-0 right-12 hidden w-px bg-[color:var(--b)] sm:block" />

      {/* a single quiet mark in the far corner — texture, not decoration
          competing with the type */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-[480px] w-[480px] rounded-full border-hair"
        style={{ borderColor: 'var(--b)' }}
      />

      {/* small transparent monogram watermark, centered behind the type */}
      <Image
        src="/logo-transparent.png"
        alt=""
        width={800}
        height={800}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.1] sm:h-[560px] sm:w-[560px]"
      />

      <div className="relative z-10 w-full max-w-[980px] px-6 text-center">
        {/* identity: the firm's name gets the chrome/industrial treatment
            from the reference mark, the descriptor sits under it */}
        <h1 className="mb-8 whitespace-nowrap font-display text-[clamp(22px,4.4vw,48px)] tracking-[0.03em] text-metal-photo">
          GANGAN &amp; PARTNERS
        </h1>
        <div className="mb-16 text-[clamp(16px,1.8vw,21px)] font-medium uppercase tracking-[0.32em] text-[var(--s3)]">
          {t('eyebrow')}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#ai"
            className="rounded-sm bg-[var(--ink)] px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--wh)] transition-colors hover:bg-[var(--ink-hover)]"
          >
            {t('btn1')}
          </a>
          <a
            href="#practices"
            className="rounded-sm border-hair px-9 py-3.5 text-[11px] tracking-wide text-[var(--ink)] transition-colors hover:text-[var(--s3)]"
            style={{ borderColor: 'var(--bs)' }}
          >
            {t('btn2')}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-[var(--s3)]">
        <span
          className="h-[38px] w-px"
          style={{ background: 'linear-gradient(to bottom, var(--s3), transparent)' }}
        />
        {t('scroll')}
      </div>
    </section>
  );
}
