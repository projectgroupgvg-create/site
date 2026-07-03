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

      {/* big transparent monogram watermark, centered behind everything */}
      <Image
        src="/logo-transparent.png"
        alt=""
        width={800}
        height={800}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.14] sm:h-[680px] sm:w-[680px]"
      />

      <div className="relative z-10 w-full max-w-[980px] px-6 text-center">
        {/* identity: the firm's name gets the chrome/industrial treatment
            from the reference mark, the descriptor sits under it, larger
            than before but still clearly secondary to the slogan */}
        <div className="mb-6 font-display text-[clamp(19px,3.2vw,38px)] tracking-[0.04em] text-metal">
          GANGAN &amp; PARTNERS
        </div>
        <div className="mb-16 text-[13px] font-medium uppercase tracking-[0.32em] text-[var(--s3)]">
          {t('eyebrow')}
        </div>

        {/* the slogan */}
        <h1 className="mx-auto mb-12 max-w-[720px] font-serif text-[clamp(24px,3.8vw,50px)] font-bold leading-[1.14] tracking-[-0.01em] text-[var(--ink)]">
          {t('titlePre')} <em className="italic font-normal text-[var(--ink3)]">{t('titleEm')}</em> {t('titlePost')}
        </h1>

        <p className="mx-auto mb-14 max-w-[480px] text-[14.5px] font-light leading-[1.85] text-[var(--ink3)]">
          {t('sub')}
        </p>

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
