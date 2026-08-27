import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildAlternates, buildOpenGraph } from '@/lib/metadata';
import { Link } from '@/i18n/navigation';

import BannerWatermark from '@/components/BannerWatermark';

type Member = { name: string; role: string; bio: string; facebook?: string; linkedin?: string; erauLink?: string };

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

// Profile pages are Ukrainian-only for now (same as viacheslav-gangan) — map
// each member with a dedicated page to its slug and force locale="uk" so the
// link works regardless of which locale the visitor is currently browsing.
const memberProfileSlugs: Record<string, string> = {
  "В'ячеслав Ганган": 'viacheslav-gangan',
  'Vyacheslav Gangan': 'viacheslav-gangan',
  'Іванна Ганган': 'ivanna-gangan',
  'Ivanna Gangan': 'ivanna-gangan',
  'Микита Сипало': 'mykyta-sypalo',
  'Mykyta Sypalo': 'mykyta-sypalo',
};

// Real face photos for the team-grid avatar circles (replacing the
// initials fallback below for members a real photo exists for).
const memberPhotos: Record<string, { src: string; position?: string }> = {
  "В'ячеслав Ганган": { src: '/gangan-portrait.jpg' },
  'Vyacheslav Gangan': { src: '/gangan-portrait.jpg' },
  'Іванна Ганган': { src: '/ivanna-gangan-portrait.jpg', position: '50% 15%' },
  'Ivanna Gangan': { src: '/ivanna-gangan-portrait.jpg', position: '50% 15%' },
  'Микита Сипало': { src: '/mykyta-sypalo-portrait-v2.jpg', position: '50% 20%' },
  'Mykyta Sypalo': { src: '/mykyta-sypalo-portrait-v2.jpg', position: '50% 20%' },
};

// The shared firm phone number reads oddly under an assistant/junior team
// member's card — only show it for members it's explicitly meant for.
const hidePhoneFor = new Set(['Іванна Ганган', 'Ivanna Gangan', 'Микита Сипало', 'Mykyta Sypalo']);

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
      <div
        className="relative overflow-hidden px-6 py-16 sm:px-11"
        style={{
          '--ink': '#f7f4ee',
          '--ink2': 'rgba(247,244,238,0.72)',
          '--ink3': '#d9cfbd',
          '--s3': '#d9c9a8',
        } as CSSProperties}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/team-section-bg-v2.jpg')" }}
        />
        {/* Round conference table overlooking the Dnipro at dusk, kept dark
            and atmospheric so light heading text stays readable. */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.85)] via-[rgba(10,8,6,0.62)] to-[rgba(10,8,6,0.68)]" />

        <BannerWatermark />
        <div className="relative z-10">
          {/* visually hidden — keeps a real page heading for SEO/accessibility
              without showing "Юристи Gangan & Partners" on the page */}
          <h1 className="sr-only">{t('title')}</h1>
          <div className="mb-5 text-[9px] font-semibold uppercase tracking-[0.4em] text-[var(--s3)]">
            {t('lbl')}
          </div>
          <div className="divider" />
          <p className="mt-5 max-w-[460px] text-[14.5px] leading-[1.8] text-[var(--ink3)]">
            {t('sub')}
          </p>
        </div>
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
              className="relative mb-5 flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full border-hair bg-[var(--wh)] font-serif text-xl font-bold text-[var(--ink)] transition-colors group-hover:border-[color:var(--s3)]"
              style={{ borderColor: 'var(--b)' }}
            >
              {memberPhotos[m.name] ? (
                <Image
                  src={memberPhotos[m.name].src}
                  alt={m.name}
                  fill
                  sizes="72px"
                  className="object-cover"
                  style={memberPhotos[m.name].position ? { objectPosition: memberPhotos[m.name].position } : undefined}
                />
              ) : (
                initials(m.name)
              )}
            </div>
            <div className="mb-1 font-serif text-[17px] font-semibold text-[var(--ink)]">
              {memberProfileSlugs[m.name] ? (
                <Link
                  href={`/team/${memberProfileSlugs[m.name]}`}
                  locale="uk"
                  className="transition-colors hover:text-[var(--s3)]"
                >
                  {m.name}
                </Link>
              ) : (
                m.name
              )}
            </div>
            <div className="mb-1 text-[11px] uppercase tracking-[0.08em] text-[var(--s3)]">
              {m.role}
            </div>
            {m.erauLink && (
              <a
                href={m.erauLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-4 inline-flex items-center gap-1 text-[10.5px] text-[var(--ink3)] underline decoration-[color:var(--b)] underline-offset-2 transition-colors hover:text-[var(--ink)]"
              >
                {t('erauLabel')} ↗
              </a>
            )}
            {!m.erauLink && <div className="mb-4" />}
            {/* When a member has a dedicated profile page, its own "Про
                адвоката" section already spells out the practice
                description in full — repeating it here would just be
                redundant, so the card bio is only shown as a fallback for
                members without one. */}
            {!memberProfileSlugs[m.name] && (
              <p className="mb-5 text-[12.5px] leading-[1.75] text-[var(--ink3)]">{m.bio}</p>
            )}

            <div className="flex flex-col gap-1.5 border-t-hair pt-4" style={{ borderColor: 'var(--b)' }}>
              <a
                href={`mailto:${firmEmail}`}
                className="flex items-center gap-2 text-[11.5px] text-[var(--ink2)] transition-colors hover:text-[var(--ink)]"
              >
                <span className="text-[var(--s3)]">✉</span> {firmEmail}
              </a>
              {!hidePhoneFor.has(m.name) && (
                <a
                  href={`tel:${firmPhone.replace(/[^+\d]/g, '')}`}
                  className="flex items-center gap-2 text-[11.5px] text-[var(--ink2)] transition-colors hover:text-[var(--ink)]"
                >
                  <span className="text-[var(--s3)]">✆</span> {firmPhone}
                </a>
              )}

              {(m.facebook || m.linkedin) && (
                <div className="mt-1 flex items-center gap-2.5">
                  {m.facebook && (
                    <a
                      href={m.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="flex h-7 w-7 items-center justify-center rounded-sm border-hair text-[var(--ink2)] transition-colors hover:border-[color:var(--s3)] hover:text-[var(--ink)]"
                      style={{ borderColor: 'var(--b)' }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
                      </svg>
                    </a>
                  )}
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="flex h-7 w-7 items-center justify-center rounded-sm border-hair text-[var(--ink2)] transition-colors hover:border-[color:var(--s3)] hover:text-[var(--ink)]"
                      style={{ borderColor: 'var(--b)' }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
