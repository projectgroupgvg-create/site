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

// Fonts are loaded via a standard Google Fonts <link> (like the original
// landing page) rather than next/font/google, so the build doesn't require
// network access to fonts.googleapis.com at build time. --font-playfair /
// --font-inter are defined in globals.css and consumed by tailwind.config.ts.

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
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&family=Michroma&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <NextIntlClientProvider messages={messages}>
          <Nav />
          {children}
          <Footer />
          <CookieConsent />
          <QuickContactWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
