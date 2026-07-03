import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg3)] py-28">
      <div className="absolute bottom-0 top-0 left-12 hidden w-px bg-[color:var(--b)] sm:block" />
      <div className="absolute bottom-0 top-0 right-12 hidden w-px bg-[color:var(--b)] sm:block" />

      {/* a single quiet mark in the far corner — texture, not decoration
          competing with the type */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-[480px] w-[480px] rounded-full border-hair"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      />

      <div className="relative z-10 w-full max-w-[980px] px-6 text-center">
        {/* identity: the firm's name gets the chrome/industrial treatment
            from the reference mark, the descriptor sits under it */}
        <div className="mb-6 font-display text-[clamp(19px,3.2vw,38px)] tracking-[0.04em] text-metal">
          GANGAN &amp; PARTNERS
        </div>
        <div className="mb-10 text-[15px] font-medium uppercase tracking-[0.32em] text-[var(--s3)]">
          {t('eyebrow')}
        </div>

        {/* the logo doubles as the frame for the slogan — the mark itself
            carries the motto, like a seal */}
        <div className="relative mx-auto mb-10 h-[440px] w-[440px] sm:h-[620px] sm:w-[620px]">
          <Image
            src="/logo-transparent.png"
            alt="Gangan & Partners"
            fill
            sizes="(min-width: 640px) 620px, 440px"
            className="pointer-events-none select-none object-contain opacity-[0.14]"
          />
          <div className="absolute inset-0 flex items-center justify-center px-[9%]">
            <h1 className="whitespace-nowrap font-serif text-[clamp(9px,1.7vw,14px)] font-bold leading-none tracking-[-0.005em] text-[var(--ink)]">
              {t('titlePre')} <em className="italic font-normal text-[var(--ink3)]">{t('titleEm')}</em> {t('titlePost')}
            </h1>
          </div>
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
