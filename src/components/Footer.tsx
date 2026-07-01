import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 bg-[var(--ink)] px-6 py-9 sm:px-11">
      <div className="text-[11px] font-light text-[rgba(245,245,245,0.3)]">
        © {year} Gangan &amp; Partners. {t('rights')}
      </div>
      <div className="font-serif text-[13px] tracking-wide text-[rgba(245,245,245,0.5)]">
        Gangan &amp; Partners
      </div>
      <div className="flex gap-6">
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
    </footer>
  );
}
