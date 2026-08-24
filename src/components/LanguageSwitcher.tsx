'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, localeLabels, routing } from '@/i18n/routing';
import { getParentSlug } from '@/data/practices';

// A handful of pages only have content in the default locale ("uk") so far
// — new client-supplied pillar pages, individual team profiles, and news
// articles that haven't been translated yet (an explicit "stage 2" scope
// decision, see project notes). Naively swapping the locale while keeping
// the exact same pathname (the old behavior) sends visitors straight into a
// 404 on any of these, in any of the 3 other locales. Instead, land on the
// closest ancestor that *does* exist for every locale.
const UK_ONLY_EXACT_PATHS = new Set([
  '/virtual-assets',
  '/virtual-assets/criminal-defence',
  '/virtual-assets/eu-market-entry-mica',
  '/reports',
  '/reports/digital-assets-cross-border-2026',
  '/media',
  '/editorial-policy',
]);

const UK_ONLY_TEAM_PROFILE_SLUGS = new Set(['viacheslav-gangan', 'ivanna-gangan', 'mykyta-sypalo']);

// Mirrors ukOnlySlugs in practices/[slug]/page.tsx and sitemap.ts — practice
// sub-pages whose rich content only exists in messages/uk.json today.
const UK_ONLY_PRACTICE_SLUGS = new Set([
  'property-rights-protection',
  'marital-property-division',
  'corporate-disputes',
  'international-corporate-law',
  'customs-disputes',
  'land-allocation-registration',
]);

// Returns a path guaranteed to exist in every locale, or null if `pathname`
// already exists everywhere and needs no adjustment.
function localizableFallback(pathname: string): string | null {
  if (UK_ONLY_EXACT_PATHS.has(pathname)) return '/';

  const teamMatch = pathname.match(/^\/team\/([^/]+)$/);
  if (teamMatch && UK_ONLY_TEAM_PROFILE_SLUGS.has(teamMatch[1])) return '/team';

  const practiceMatch = pathname.match(/^\/practices\/([^/]+)$/);
  if (practiceMatch && UK_ONLY_PRACTICE_SLUGS.has(practiceMatch[1])) {
    const parent = getParentSlug(practiceMatch[1]);
    return parent ? `/practices/${parent}` : '/';
  }

  // News.fallbackNews isn't translated at all outside uk — every individual
  // article page 404s in en/de/fr regardless of slug. The /news list itself
  // renders fine (shows an empty state), so fall back there.
  if (/^\/news\/[^/]+$/.test(pathname)) return '/news';

  return null;
}

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-0.5 rounded-sm border-hair border-[color:var(--b)] bg-[var(--bg)]/90 p-1">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => {
            // The uk-only pages above are, by definition, only missing in
            // the *other* 3 locales — switching back to uk always keeps the
            // current path.
            const destination =
              l === routing.defaultLocale ? pathname : (localizableFallback(pathname) ?? pathname);
            router.replace(destination, { locale: l });
          }}
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
