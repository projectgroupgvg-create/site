import Image from 'next/image';
import { useTranslations } from 'next-intl';
import HeroCanvas from './HeroCanvas';
import HeroVideo from './HeroVideo';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg3)] py-28">
      <HeroCanvas />
      <HeroVideo />
      <div className="absolute bottom-0 top-0 left-12 hidden w-px bg-[color:var(--b)] sm:block" />
      <div className="absolute bottom-0 top-0 right-12 hidden w-px bg-[color:var(--b)] sm:block" />

      {/* a single quiet mark in the far corner — texture, not decoration
          competing with the type */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-[480px] w-[480px] rounded-full border-hair"
        style={{ borderColor: 'rgba(0,0,0,0.05)' }}
      />

      <div className="relative w-full max-w-[980px] px-6 text-center">
        {/* identity: small, quiet, secondary — logo + name share one line */}
        <div className="mb-16 flex items-center justify-center gap-3">
          <Image
            src="/logo.jpg"
            alt="Gangan & Partners"
            width={22}
            height={22}
            className="h-[22px] w-[22px] flex-shrink-0 rounded-full object-cover"
            priority
          />
          <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-[var(--s3)]">
            {t('eyebrow')}
          </span>
        </div>

        {/* the slogan: the one thing on this screen that's allowed to be big */}
        <h1 className="mx-auto mb-12 max-w-[760px] font-serif text-[clamp(28px,4.4vw,60px)] font-bold leading-[1.12] tracking-[-0.01em] text-[var(--ink)]">
          {t('titlePre')} <em className="italic font-normal text-[var(--ink3)]">{t('titleEm')}</em> {t('titlePost')}
        </h1>

        <p className="mx-auto mb-14 max-w-[480px] text-[14.5px] font-light leading-[1.85] text-[var(--ink3)]">
          {t('sub')}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#ai"
            className="bg-[var(--ink)] px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--wh)] transition-colors hover:bg-[#333]"
          >
            {t('btn1')}
          </a>
          <a
            href="#practices"
            className="border-hair px-9 py-3.5 text-[11px] tracking-wide text-[var(--ink)] transition-colors hover:text-[var(--s3)]"
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
