'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

// Instagram has no public web "share this URL" intent (unlike Facebook/
// LinkedIn) — it's a mobile-app-first platform with no arbitrary-link
// sharing endpoint. The standard workaround is a "copy link" action so the
// user can paste it into an Instagram bio, story, or DM themselves.
export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const t = useTranslations('Share');
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  async function handleCopyForInstagram() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard API can be unavailable (older browsers, insecure context);
      // fail silently rather than throwing in the UI.
    }
  }

  return (
    <div
      className="mt-10 flex flex-wrap items-center gap-3 border-t-hair pt-8"
      style={{ borderColor: 'var(--b)' }}
    >
      <span className="mr-1 text-[9px] font-semibold uppercase tracking-[0.3em] text-[var(--s3)]">
        {t('label')}
      </span>

      <a
        href={facebookHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        title={`Facebook — ${title}`}
        className="flex h-8 w-8 items-center justify-center rounded-sm border-hair text-[var(--ink2)] transition-colors hover:border-[color:var(--s3)] hover:text-[var(--ink)]"
        style={{ borderColor: 'var(--b)' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
        </svg>
      </a>

      <a
        href={linkedinHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        title={`LinkedIn — ${title}`}
        className="flex h-8 w-8 items-center justify-center rounded-sm border-hair text-[var(--ink2)] transition-colors hover:border-[color:var(--s3)] hover:text-[var(--ink)]"
        style={{ borderColor: 'var(--b)' }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
        </svg>
      </a>

      <button
        type="button"
        onClick={handleCopyForInstagram}
        aria-label={t('instagramHint')}
        title={t('instagramHint')}
        className="flex h-8 w-8 items-center justify-center rounded-sm border-hair text-[var(--ink2)] transition-colors hover:border-[color:var(--s3)] hover:text-[var(--ink)]"
        style={{ borderColor: 'var(--b)' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" />
        </svg>
      </button>

      {copied && (
        <span className="text-[11px] text-[var(--s3)]">{t('copied')}</span>
      )}
    </div>
  );
}
