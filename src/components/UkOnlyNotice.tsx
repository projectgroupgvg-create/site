'use client';

import { Suspense, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

// Some pages (uk-only pillar content, individual team profiles, untranslated
// news/practice sub-pages — see LanguageSwitcher.tsx) send the visitor to a
// fallback route when they switch away from uk, since the actual page they
// were on doesn't exist in that locale. Previously this fallback was a
// silent redirect with no explanation, which reads as "the language switch
// did nothing" (see project notes: user reported "звіт не перекладається"
// after being bounced from the report page to the homepage). This banner
// surfaces a short, dismissible explanation for that one redirect, then
// strips the `notice` query param so refreshing doesn't re-show it.
function NoticeInner() {
  const t = useTranslations('UkOnlyNotice');
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (searchParams.get('notice') !== 'uk-only') return;
    setShow(true);
    const params = new URLSearchParams(searchParams.toString());
    params.delete('notice');
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-4 z-[200] mx-auto flex w-fit max-w-[calc(100vw-2rem)] items-center gap-4 rounded-lg border-hair bg-[var(--ink)] px-5 py-3.5 text-[12.5px] leading-[1.6] text-[var(--wh)] shadow-lg"
      style={{ borderColor: 'var(--b)', left: 0, right: 0 }}
    >
      <span>{t('message')}</span>
      <button
        type="button"
        onClick={() => setShow(false)}
        aria-label={t('dismiss')}
        className="shrink-0 text-[var(--wh)]/70 transition-colors hover:text-[var(--wh)]"
      >
        ✕
      </button>
    </div>
  );
}

export default function UkOnlyNotice() {
  return (
    <Suspense fallback={null}>
      <NoticeInner />
    </Suspense>
  );
}
