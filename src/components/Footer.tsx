import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import NewsletterSignup from './NewsletterSignup';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('Footer');
  const tNewsletter = useTranslations('Newsletter');
  const tContact = useTranslations('Contact');
  const tPrivacy = useTranslations('Privacy');
  const tLegalInfo = useTranslations('LegalInfo');
  const tCookiePolicy = useTranslations('CookiePolicy');
  const tTerms = useTranslations('Terms');
  const tAiTerms = useTranslations('AiTerms');
  const tPaymentsRefunds = useTranslations('PaymentsRefunds');
  const tProfessionalConfidentiality = useTranslations('ProfessionalConfidentiality');
  const year = new Date().getFullYear();

  const legalLinks = [
    { href: '/legal-information', label: tLegalInfo('title') },
    { href: '/privacy', label: tPrivacy('title') },
    { href: '/cookies', label: tCookiePolicy('title') },
    { href: '/terms', label: tTerms('title') },
    { href: '/ai-terms', label: tAiTerms('title') },
    { href: '/payments-refunds', label: tPaymentsRefunds('title') },
    { href: '/professional-confidentiality', label: tProfessionalConfidentiality('title') },
    // Editorial-policy content only exists in uk (generateStaticParams
    // limited to defaultLocale, dynamicParams: false — see audit notes),
    // so only surface the link on the uk site rather than 404 for en/de/fr
    // visitors. It was previously an orphan page reachable only via
    // sitemap.ts, unreachable by any click path from the site itself.
    ...(locale === 'uk' ? [{ href: '/editorial-policy', label: 'Редакційна політика' }] : []),
  ];

  return (
    <footer className="bg-[var(--ink)] px-6 py-9 sm:px-11">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6 border-b-hair border-[rgba(245,245,245,0.1)] pb-8">
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgba(245,245,245,0.55)]">
            {tNewsletter('title')}
          </div>
          <NewsletterSignup />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-[11px] font-light text-[rgba(245,245,245,0.3)]">
          © {year} Gangan &amp; Partners. {t('rights')}
        </div>
        <div className="font-display text-[13px] uppercase tracking-[0.07em] text-metal-photo">
          Gangan &amp; Partners
        </div>
        <div className="flex flex-wrap gap-6">
          <Link href="/#practices" className="text-[10.5px] tracking-wide text-[rgba(245,245,245,0.28)] transition-colors hover:text-[rgba(245,245,245,0.65)]">
            {t('practices')}
          </Link>
          <Link href="/#ai" className="text-[10.5px] tracking-wide text-[rgba(245,245,245,0.28)] transition-colors hover:text-[rgba(245,245,245,0.65)]">
            {t('consult')}
          </Link>
          <Link href="/news" className="text-[10.5px] tracking-wide text-[rgba(245,245,245,0.28)] transition-colors hover:text-[rgba(245,245,245,0.65)]">
            {t('news')}
          </Link>
          <Link href="/#contacts" className="text-[10.5px] tracking-wide text-[rgba(245,245,245,0.28)] transition-colors hover:text-[rgba(245,245,245,0.65)]">
            {t('contacts')}
          </Link>
        </div>
      </div>

      {/* Full 7-document legal package — legal information, privacy, cookies,
          terms, AI terms, payments/refunds, professional confidentiality.
          Kept as its own row (smaller, muted) so it doesn't compete visually
          with the primary site navigation above. */}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t-hair border-[rgba(245,245,245,0.1)] pt-4">
        {legalLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-[9.5px] tracking-wide text-[rgba(245,245,245,0.22)] transition-colors hover:text-[rgba(245,245,245,0.55)]"
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* Legal identification block — required on every page under Art. 7 of
          the E-Commerce Law (name, EDRPOU, address, contacts, complaints
          channel). `edrpou` still carries a bracketed placeholder pending
          the firm supplying the real code — see project audit notes. */}
      <div className="mt-6 border-t-hair border-[rgba(245,245,245,0.1)] pt-6 text-[10px] leading-[1.8] text-[rgba(245,245,245,0.25)]">
        <p>
          {t('legalName')} · {t('edrpou')} · {tContact('addrValue')}
        </p>
        <p>
          {tContact('emailLabel')}: gangan.partners@gmail.com · {tContact('phoneLabel')}: {tContact('phoneValue')} · {t('registryNote')}
        </p>
        <p>
          {t('complaintsLabel')} gangan.partners@gmail.com
        </p>
      </div>
    </footer>
  );
}
