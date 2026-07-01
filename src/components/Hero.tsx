import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg3)]">
      <div className="absolute bottom-0 top-0 left-12 hidden w-px bg-[color:var(--b)] sm:block" />
      <div className="absolute bottom-0 top-0 right-12 hidden w-px bg-[color:var(--b)] sm:block" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border-hair"
        style={{ borderColor: 'rgba(0,0,0,0.06)' }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border-hair border-dashed"
        style={{ borderColor: 'rgba(0,0,0,0.06)' }}
      />

      <div className="relative max-w-[840px] px-6 text-center">
        <div className="mb-7 flex items-center justify-center gap-4 text-[9.5px] font-medium uppercase tracking-[0.38em] text-[var(--s3)]">
          <span className="hidden h-px max-w-[56px] flex-1 bg-[color:var(--bs)] sm:block" />
          {t('eyebrow')}
          <span className="hidden h-px max-w-[56px] flex-1 bg-[color:var(--bs)] sm:block" />
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
          {t('titlePre')} <em className="italic text-[#3a3a3a]">{t('titleEm')}</em>
          <br />
          {t('titlePost')}
        </h1>

        <p className="mx-auto mb-14 max-w-[540px] text-[15px] font-light leading-[1.8] text-[var(--ink3)]">
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
