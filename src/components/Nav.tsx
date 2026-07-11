'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Nav() {
  const t = useTranslations('Nav');

  return (
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
          <span className="block font-serif text-[13.5px] font-bold uppercase tracking-[0.07em] text-[var(--ink)] leading-tight">
            Gangan &amp; Partners
          </span>
          <span className="mt-0.5 block text-[8.5px] uppercase tracking-[0.24em] text-[var(--ink3)]">
            {t('sub')}
          </span>
        </span>
      </Link>

      <ul className="hidden items-center gap-8 md:flex">
        <li>
          <Link href="/#practices" className="text-xs tracking-wide text-[var(--ink3)] transition-colors hover:text-[var(--ink)]">
            {t('practices')}
          </Link>
        </li>
        <li>
          <Link href="/team" className="text-xs tracking-wide text-[var(--ink3)] transition-colors hover:text-[var(--ink)]">
            {t('team')}
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-xs tracking-wide text-[var(--ink3)] transition-colors hover:text-[var(--ink)]">
            {t('about')}
          </Link>
        </li>
        <li>
          <Link href="/blog" className="text-xs tracking-wide text-[var(--ink3)] transition-colors hover:text-[var(--ink)]">
            {t('blog')}
          </Link>
        </li>
        <li>
          <Link href="/news" className="text-xs tracking-wide text-[var(--ink3)] transition-colors hover:text-[var(--ink)]">
            {t('news')}
          </Link>
        </li>
        <li>
          <Link href="/calculator" className="text-xs tracking-wide text-[var(--ink3)] transition-colors hover:text-[var(--ink)]">
            {t('calculator')}
          </Link>
        </li>
        <li>
          <Link href="/wallet-check" className="text-xs tracking-wide text-[var(--ink3)] transition-colors hover:text-[var(--ink)]">
            {t('walletCheck')}
          </Link>
        </li>
        <li>
          <Link href="/faq" className="text-xs tracking-wide text-[var(--ink3)] transition-colors hover:text-[var(--ink)]">
            {t('faq')}
          </Link>
        </li>
        <li>
          <Link href="/#contacts" className="text-xs tracking-wide text-[var(--ink3)] transition-colors hover:text-[var(--ink)]">
            {t('contacts')}
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-3">
        <Link
          href="/search"
          aria-label={t('search')}
          className="flex h-8 w-8 items-center justify-center text-[var(--ink3)] transition-colors hover:text-[var(--ink)]"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </Link>
        <LanguageSwitcher />
        <Link
          href="/#ai"
          className="hidden whitespace-nowrap rounded-sm bg-[var(--ink)] px-5 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[var(--wh)] transition-colors hover:bg-[var(--ink-hover)] sm:inline-block"
        >
          {t('cta')}
        </Link>
      </div>
    </nav>
  );
}
