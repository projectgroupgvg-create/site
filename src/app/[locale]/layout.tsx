import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { siteUrl, siteName } from '@/lib/site';
import { buildAlternates, buildOpenGraph } from '@/lib/metadata';
import '../globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import QuickContactWidget from '@/components/QuickContactWidget';
import UkOnlyNotice from '@/components/UkOnlyNotice';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';

// Fonts are loaded via plain <link> tags (not next/font) so the build
// doesn't require network access at build time. Switzer (Fontshare) is the
// site-wide typeface — a free, open-license alternative to Suisse Int'l
// (same weight names: Light/Regular/Medium/etc., very close letterforms) —
// used for everything except the homepage brand wordmark, which keeps
// Michroma so "GANGAN & PARTNERS" stays untouched per the client's request.
// --font-switzer / --font-michroma are defined in globals.css and consumed
// by tailwind.config.ts (both `font-sans` and `font-serif` now resolve to
// Switzer; only `font-display` still resolves to Michroma).

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const title = t('title');
  const description = t('description');

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s — ${siteName}`,
    },
    description,
    alternates: buildAlternates(locale, '/'),
    openGraph: buildOpenGraph({ locale, path: '/', title, description }),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Michroma&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="theme-color" content="#faf8f4" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Gangan & Partners" />
      </head>
      <body className="font-sans">
        <GoogleAnalytics />
        <ServiceWorkerRegistration />
        <NextIntlClientProvider messages={messages}>
          <Nav />
          {children}
          <Footer />
          <CookieConsent />
          <QuickContactWidget />
          <UkOnlyNotice />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
