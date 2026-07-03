import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildAlternates, buildOpenGraph } from '@/lib/metadata';

type Member = { name: string; role: string; bio: string };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Team' });
  const title = t('title');
  const description = t('sub');
  return {
    title,
    description,
    alternates: buildAlternates(locale, '/team'),
    openGraph: buildOpenGraph({ locale, path: '/team', title, description }),
  };
}

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Team');
  const tContact = await getTranslations('Contact');
  const members = t.raw('members') as Member[];
  const firmEmail = 'gangan.partners@gmail.com';
  const firmPhone = tContact('phoneValue');

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
        <p className="max-w-[460px] text-[14.5px] leading-[1.8] text-[var(--ink3)]">
          {t('sub')}
        </p>
      </div>

      <div
        className="grid grid-cols-1 overflow-hidden rounded-lg border-hair sm:grid-cols-2 lg:grid-cols-3"
        style={{ borderColor: 'var(--b)' }}
      >
        {members.map((m) => (
          <div
            key={m.name}
            className="group border-hair bg-[var(--bgc)] p-8 transition-colors hover:bg-[var(--wh)]"
            style={{ borderColor: 'var(--b)' }}
          >
            <div
              className="mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-full border-hair bg-[var(--wh)] font-serif text-xl font-bold text-[var(--ink)] transition-colors group-hover:border-[color:var(--s3)]"
              style={{ borderColor: 'var(--b)' }}
            >
              {initials(m.name)}
            </div>
            <div className="mb-1 font-serif text-[17px] font-semibold text-[var(--ink)]">
              {m.name}
            </div>
            <div className="mb-4 text-[11px] uppercase tracking-[0.08em] text-[var(--s3)]">
              {m.role}
            </div>
            <p className="mb-5 text-[12.5px] leading-[1.75] text-[var(--ink3)]">{m.bio}</p>

            <div className="flex flex-col gap-1.5 border-t-hair pt-4" style={{ borderColor: 'var(--b)' }}>
              <a
                href={`mailto:${firmEmail}`}
                className="flex items-center gap-2 text-[11.5px] text-[var(--ink2)] transition-colors hover:text-[var(--ink)]"
              >
                <span className="text-[var(--s3)]">✉</span> {firmEmail}
              </a>
              <a
                href={`tel:${firmPhone.replace(/[^+\d]/g, '')}`}
                className="flex items-center gap-2 text-[11.5px] text-[var(--ink2)] transition-colors hover:text-[var(--ink)]"
              >
                <span className="text-[var(--s3)]">✆</span> {firmPhone}
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
