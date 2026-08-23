'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

const navItems = [
  { href: '/#practices', key: 'practices' },
  { href: '/team', key: 'team' },
  { href: '/about', key: 'about' },
  { href: '/news', key: 'news' },
  { href: '/calculator', key: 'calculator' },
  { href: '/wallet-check', key: 'walletCheck' },
  { href: '/faq', key: 'faq' },
  { href: '/#contacts', key: 'contacts' },
] as const;

// "Аналітика" dropdown per the SEO brief (section 3.1). Blog is fully
// translated (all 4 locales); Reports/Media are Ukrainian-only for now
// (see reportDigitalAssets2026.ts and friends), so those force
// locale="uk" to avoid 404s when a non-uk visitor clicks them.
const insightsItems = [
  { href: '/blog', key: 'blog', forceUk: false },
  { href: '/reports', key: 'reports', forceUk: true },
  { href: '/media', key: 'media', forceUk: true },
] as const;

export default function Nav() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes, and lock page scroll
  // while it's open (it renders as a full-screen overlay below md).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <>
    <nav className="sticky top-0 z-[100] flex h-16 items-center justify-between border-b-hair border-b border-b-[color:var(--b)] bg-[var(--bg)]/95 px-5 backdrop-blur-xl sm:px-8 lg:px-11">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo.jpg"
          alt="Gangan & Partners"
          width={38}
          height={38}
          className="h-[38px] w-[38px] rounded-full object-cover"
        />

        <span>
          <span className="block font-display text-[13.5px] uppercase tracking-[0.07em] leading-tight text-metal">
            Gangan &amp; Partners
          </span>
          <span className="mt-0.5 block text-[8.5px] uppercase tracking-[0.24em] text-[var(--ink3)]">
            {t('sub')}
          </span>
        </span>
      </Link>

      <ul className="hidden items-center gap-8 md:flex">
        {navItems.slice(0, 3).map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              className="text-xs tracking-wide text-[var(--ink3)] transition-colors hover:text-[var(--ink)]"
            >
              {t(item.key)}
            </Link>
          </li>
        ))}

        {/* "Аналітика" dropdown: Блог + Звіти + Медіа */}
        <li className="group relative">
          <button type="button" className="flex items-center gap-1 text-xs tracking-wide text-[var(--ink3)] transition-colors hover:text-[var(--ink)]">
            {t('insights')}
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <ul
            className="invisible absolute left-0 top-full z-10 w-56 rounded-sm border-hair bg-[var(--bg)] py-2 opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all group-hover:visible group-hover:opacity-100"
            style={{ borderColor: 'var(--b)' }}
          >
            {insightsItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  {...(item.forceUk ? { locale: 'uk' as const } : {})}
                  className="block px-4 py-2.5 text-xs text-[var(--ink3)] transition-colors hover:bg-[var(--bgc)] hover:text-[var(--ink)]"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </li>

        {navItems.slice(3).map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              className="text-xs tracking-wide text-[var(--ink3)] transition-colors hover:text-[var(--ink)]"
            >
              {t(item.key)}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <Link
          href="/search"
          aria-label={t('search')}
          className="hidden h-8 w-8 items-center justify-center text-[var(--ink3)] transition-colors hover:text-[var(--ink)] sm:flex"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </Link>
        <div className="hidden sm:block">
          <LanguageSwitcher />
        </div>
        <Link
          href="/#ai"
          className="hidden whitespace-nowrap rounded-sm bg-[var(--ink)] px-5 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[var(--wh)] transition-colors hover:bg-[var(--ink-hover)] sm:inline-block"
        >
          {t('cta')}
        </Link>

        {/* mobile menu toggle — only the piece that changes below md, since
            the full nav list + CTA are hidden there with no other way in */}
        <button
          type="button"
          aria-label={open ? t('closeMenu') : t('openMenu')}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center text-[var(--ink2)] transition-colors hover:text-[var(--ink)] md:hidden"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <line x1="3.5" y1="6.5" x2="20.5" y2="6.5" />
              <line x1="3.5" y1="12" x2="20.5" y2="12" />
              <line x1="3.5" y1="17.5" x2="20.5" y2="17.5" />
            </svg>
          )}
        </button>
      </div>
    </nav>

    {/* mobile menu overlay panel — rendered as a sibling of <nav>, not a
        child: <nav> has backdrop-blur (a CSS filter), and any ancestor with
        a filter establishes a new containing block for position:fixed
        descendants, which was clipping this panel to the navbar's own
        64px-tall box instead of the viewport. Also needs a solid opaque
        background — the shared --bg/--bg2/--bg3 tokens are all translucent
        overlay tints (meant to sit over a photo), not real page backgrounds. */}
    {open && (
        <div
          className="fixed inset-x-0 bottom-0 top-16 z-[99] overflow-y-auto bg-[#faf8f4] px-6 py-8 md:hidden"
          style={{ borderTop: '1px solid var(--b)' }}
        >
          <ul className="flex flex-col gap-1">
            {navItems.slice(0, 3).map((item) => (
              <li key={item.key} className="border-b-hair" style={{ borderColor: 'var(--b)' }}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-[15px] tracking-wide text-[var(--ink2)] transition-colors hover:text-[var(--ink)]"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}

            <li className="border-b-hair pt-3" style={{ borderColor: 'var(--b)' }}>
              <div className="mb-1 text-[11px] uppercase tracking-[0.14em] text-[var(--s3)]">{t('insights')}</div>
              <ul className="pb-2">
                {insightsItems.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      {...(item.forceUk ? { locale: 'uk' as const } : {})}
                      onClick={() => setOpen(false)}
                      className="block py-2.5 pl-3 text-[14px] tracking-wide text-[var(--ink2)] transition-colors hover:text-[var(--ink)]"
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {navItems.slice(3).map((item) => (
              <li key={item.key} className="border-b-hair" style={{ borderColor: 'var(--b)' }}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-[15px] tracking-wide text-[var(--ink2)] transition-colors hover:text-[var(--ink)]"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center justify-between gap-4">
            <LanguageSwitcher />
            <Link
              href="/search"
              onClick={() => setOpen(false)}
              aria-label={t('search')}
              className="flex h-9 w-9 items-center justify-center text-[var(--ink3)] transition-colors hover:text-[var(--ink)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </Link>
          </div>

          <Link
            href="/#ai"
            onClick={() => setOpen(false)}
            className="mt-6 block w-full rounded-sm bg-[var(--ink)] px-5 py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--wh)] transition-colors hover:bg-[var(--ink-hover)]"
          >
            {t('cta')}
          </Link>
        </div>
    )}
    </>
  );
}
