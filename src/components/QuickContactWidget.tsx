'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { hasCookieConsentDecision } from '@/lib/cookieConsent';

const phoneRaw = '+380965549847';
const email = 'gangan.partners@gmail.com';
const telegramHandle = 'gangan_law';

// Glossy "onyx + gold" 3D button, built with layered gradients/shadows
// rather than a rendered image — matches the site's dark-ink/gold accent
// palette (same --ink/--s3 tokens used across Hero, Team, banners) while
// giving each icon its own separate, always-visible tile instead of the
// previous single-button dropdown.
function IconTile({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={label}
      title={label}
      className="group relative flex flex-shrink-0 items-center justify-center rounded-2xl transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105 active:scale-95"
      style={{
        height: 52,
        width: 52,
        background: 'linear-gradient(150deg, #3a3530 0%, var(--ink) 45%, #0a0806 100%)',
        boxShadow:
          '0 10px 22px rgba(0,0,0,0.45), 0 2px 4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.18), inset 0 -3px 6px rgba(0,0,0,0.55)',
      }}
    >
      {/* Glassy top-left sheen, purely decorative */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-70"
        style={{
          background: 'radial-gradient(circle at 30% 22%, rgba(255,255,255,0.35), rgba(255,255,255,0) 55%)',
        }}
      />
      <span className="relative z-10 text-[var(--s3)] transition-colors group-hover:text-[var(--wh)]">
        {children}
      </span>
    </a>
  );
}

export default function QuickContactWidget() {
  const t = useTranslations('QuickContact');
  // The cookie banner is full-width and sits at the very bottom (z-[200]) —
  // nudge this widget up while the banner is still showing so the two never
  // overlap, then drop back down once a decision has been made.
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    const sync = () => setBannerVisible(!hasCookieConsentDecision());
    sync();
    window.addEventListener('cookie-consent-changed', sync);
    return () => window.removeEventListener('cookie-consent-changed', sync);
  }, []);

  return (
    <div
      className={`fixed right-5 z-[150] flex flex-col items-center gap-3.5 transition-[bottom] duration-200 sm:right-6 ${
        bannerVisible ? 'bottom-[9rem] sm:bottom-24' : 'bottom-6'
      }`}
    >
      <IconTile href={`https://t.me/${telegramHandle}`} label="Telegram">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.05 3.79 2.6 10.94c-1.28.5-1.27 1.2-.23 1.52l4.71 1.47 1.82 5.6c.22.6.4.85.9.85.42 0 .6-.19.83-.42l1.98-1.92 4.12 3.04c.76.42 1.3.2 1.5-.7l2.72-12.83c.28-1.15-.4-1.68-1.34-1.32-.03.01-.03.01-.06.02Zm-3.5 3.15L9.7 13.12l-.32 3.4-1.6-4.94 9.5-5.94c.45-.27.86-.12.53.18Z"/>
        </svg>
      </IconTile>
      <IconTile href={`https://wa.me/${phoneRaw.replace('+', '')}`} label="WhatsApp">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.26.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23Zm-4.52 4.7c-.16 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.13.17 1.73 2.76 4.28 3.76 2.12.83 2.55.67 3.01.62.46-.04 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.1-.23-.17-.48-.29-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.56.13-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43-.14-.01-.31-.01-.47-.01Z"/>
        </svg>
      </IconTile>
      <IconTile href={`https://signal.me/#p/${phoneRaw}`} label="Signal">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
      </IconTile>
      <IconTile href={`mailto:${email}`} label={t('email')}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
          <path d="M3 6.5 12 13l9-6.5" />
        </svg>
      </IconTile>
    </div>
  );
}
