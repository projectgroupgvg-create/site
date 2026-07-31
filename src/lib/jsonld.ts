import { siteUrl, siteName, contact } from './site';
import { localizedUrl } from './metadata';
import { routing } from '@/i18n/routing';

export function buildLegalServiceSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${siteUrl}/#organization`,
    name: siteName,
    url: localizedUrl(locale, '/'),
    logo: `${siteUrl}/logo.jpg`,
    image: `${siteUrl}/logo.jpg`,
    telephone: contact.phone,
    email: contact.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.addressLine,
      addressLocality: contact.city,
      postalCode: contact.postalCode,
      addressCountry: contact.country,
    },
    areaServed: 'UA',
  };
}

export function buildArticleSchema({
  locale,
  path,
  title,
  description,
  datePublished,
  image,
  author,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  datePublished?: string;
  image?: string | null;
  // Links the article to its author's own profile page (ProfilePage/Person)
  // for Google's Article author signals — see TZ_Rozshyreni_profili_komandy.
  author?: { name: string; path: string } | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: localizedUrl(locale, path),
    inLanguage: locale,
    ...(datePublished ? { datePublished } : {}),
    image: image ?? `${siteUrl}/logo.jpg`,
    ...(author
      ? {
          author: {
            '@type': 'Person',
            name: author.name,
            url: localizedUrl(routing.defaultLocale, author.path),
          },
        }
      : {}),
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.jpg`,
      },
    },
  };
}

export function buildServiceSchema({
  locale,
  path,
  name,
  description,
}: {
  locale: string;
  path: string;
  name: string;
  description: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    name,
    description,
    url: localizedUrl(locale, path),
    provider: {
      '@type': 'LegalService',
      name: siteName,
      url: localizedUrl(locale, '/'),
    },
    areaServed: 'UA',
  };
}

export function buildProfilePageSchema({
  locale,
  path,
  name,
  alternateNames,
  jobTitle,
  sameAs,
  description,
  image,
  knowsAbout,
  dateModified,
}: {
  locale: string;
  path: string;
  name: string;
  alternateNames: string[];
  jobTitle: string;
  sameAs: string[];
  description?: string;
  image?: string | null;
  knowsAbout?: string[];
  dateModified?: string;
}) {
  const url = localizedUrl(locale, path);
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url,
    ...(dateModified ? { dateModified } : {}),
    mainEntity: {
      '@type': 'Person',
      '@id': `${url}#person`,
      name,
      alternateName: alternateNames,
      jobTitle,
      ...(description ? { description } : {}),
      ...(image ? { image } : {}),
      url,
      worksFor: {
        '@type': 'LegalService',
        name: siteName,
        url: localizedUrl(locale, '/'),
      },
      ...(knowsAbout && knowsAbout.length > 0 ? { knowsAbout } : {}),
      sameAs,
    },
  };
}

export function buildBreadcrumbSchema(
  locale: string,
  items: { name: string; path: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: localizedUrl(locale, item.path),
    })),
  };
}
