'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { COOKIE_CONSENT_STORAGE_KEY as STORAGE_KEY } from '@/lib/cookieConsent';

export default function CookieConsent() {
  const t = useTranslations('Cookies');
  const [choice, setChoice] = useState<'accepted' | 'declined' | null>('accepted');
  // Start "hidden" (treated as already-decided) until the effect below reads
  // localStorage, to avoid a flash of the banner during hydration.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setChoice(stored === 'accepted' || stored === 'declined' ? stored : null);
    setReady(true);
  }, []);

  function decide(value: 'accepted' | 'declined') {
    window.localStorage.setItem(STORAGE_KEY, value);
    setChoice(value);
    window.dispatchEvent(new Event('cookie-consent-changed'));
  }

  if (!ready || choice !== null) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[200] border-t-hair bg-[var(--wh)] px-6 py-5 sm:px-11"
      style={{ borderColor: 'var(--b)' }}
    >
      <div className="mx-auto flex max-w-[1100px] flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12.5px] leading-[1.7] text-[var(--ink2)]">
          {t('message')}{' '}
          <Link href="/privacy" className="underline decoration-[color:var(--b)] underline-offset-2 hover:text-[var(--ink)]">
            {t('learnMore')}
          </Link>
        </p>
        <div className="flex flex-shrink-0 gap-3">
          <button
            onClick={() => decide('declined')}
            className="rounded-sm border-hair px-5 py-2.5 text-[11px] uppercase tracking-[0.08em] text-[var(--ink2)] transition-colors hover:border-[color:var(--s3)]"
            style={{ borderColor: 'var(--b)' }}
          >
            {t('decline')}
          </button>
          <button
            onClick={() => decide('accepted')}
            className="rounded-sm bg-[var(--ink)] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--wh)] transition-colors hover:bg-[#333]"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
