'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, localeLabels } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-0.5 rounded-sm border-hair border-[color:var(--b)] bg-[var(--bg)]/90 p-1">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => router.replace(pathname, { locale: l })}
          className={`rounded-sm px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors ${
            l === locale
              ? 'bg-[var(--ink)] text-[var(--wh)]'
              : 'text-[var(--ink3)] hover:text-[var(--ink)]'
          }`}
        >
          {localeLabels[l]}
        </button>
      ))}
    </div>
  );
}
