import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { buildAlternates, buildOpenGraph } from '@/lib/metadata';

type FaqItem = { q: string; a: string };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'FAQ' });
  const title = t('title');
  const description = t('sub');
  return {
    title,
    description,
    alternates: buildAlternates(locale, '/faq'),
    openGraph: buildOpenGraph({ locale, path: '/faq', title, description }),
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('FAQ');
  const items = t.raw('list') as FaqItem[];

  return (
    <main>
      <div className="border-b-hair bg-[var(--bg2)] px-6 py-16 sm:px-11" style={{ borderColor: 'var(--b)' }}>
        <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.4em] text-[var(--s3)]">
          {t('lbl')}
        </div>
        <h1 className="mb-5 font-serif text-[clamp(26px,3.2vw,44px)] font-bold leading-[1.1] text-[var(--ink)]">
          {t('title')}
        </h1>
        <div className="divider" />
        <p className="max-w-[520px] text-[14.5px] leading-[1.8] text-[var(--ink3)]">
          {t('sub')}
        </p>
      </div>

      <div className="mx-auto max-w-[760px] px-6 py-16 sm:px-11">
        <p
          className="mb-10 rounded-lg border-hair bg-[var(--bgc)] p-5 text-[12.5px] leading-[1.75] text-[var(--ink2)]"
          style={{ borderColor: 'var(--b)' }}
        >
          {t('disclaimer')}
        </p>

        <div className="flex flex-col overflow-hidden rounded-lg border-hair" style={{ borderColor: 'var(--b)' }}>
          {items.map((item, i) => (
            <details
              key={i}
              className="group border-b-hair px-6 py-5 transition-colors last:border-b-0 open:bg-[var(--bgc)]"
              style={{ borderColor: 'var(--b)' }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-[15.5px] font-semibold leading-[1.4] text-[var(--ink)] marker:content-none">
                {item.q}
                <span
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-hair text-[13px] text-[var(--s3)] transition-transform group-open:rotate-45"
                  style={{ borderColor: 'var(--b)' }}
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3.5 text-[13px] leading-[1.85] text-[var(--ink3)]">{item.a}</p>
            </details>
          ))}
        </div>

        <div
          className="mt-10 flex flex-col items-start gap-4 rounded-lg border-hair p-7 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: 'var(--b)', background: 'var(--bg2)' }}
        >
          <p className="text-[14px] leading-[1.7] text-[var(--ink2)]">{t('moreQuestions')}</p>
          <Link
            href="/#ai"
            className="flex-shrink-0 whitespace-nowrap rounded-sm bg-[var(--ink)] px-7 py-3 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[var(--wh)] transition-colors hover:bg-[var(--ink-hover)]"
          >
            {t('moreQuestionsBtn')}
          </Link>
        </div>
      </div>
    </main>
  );
}
