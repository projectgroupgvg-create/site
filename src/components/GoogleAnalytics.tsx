'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { hasCookieConsentAccepted } from '@/lib/cookieConsent';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

// Only loads gtag.js once the visitor has explicitly accepted cookies via
// the CookieConsent banner — never fires on page load by default, and
// stops being relevant retroactively if the user later declines (we simply
// never injected the script in that case).
export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    const sync = () => setEnabled(hasCookieConsentAccepted());
    sync();
    window.addEventListener('cookie-consent-changed', sync);
    return () => window.removeEventListener('cookie-consent-changed', sync);
  }, []);

  if (!GA_ID || !enabled) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
