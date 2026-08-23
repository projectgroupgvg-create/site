import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildAlternates, buildOpenGraph } from '@/lib/metadata';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Link } from '@/i18n/navigation';
import { reportMeta } from '@/data/reportDigitalAssets2026';

export function generateStaticParams() {
  return [{ locale: routing.defaultLocale }];
}
export const dynamicParams = false;

const PATH = '/reports';
const TITLE = 'Аналітичні звіти';
const DESCRIPTION = 'Аналітичні звіти адвокатського об’єднання Ганган і Партнери про правове регулювання віртуальних активів, AML та транскордонні ризики.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: buildAlternates(routing.defaultLocale, PATH),
    openGraph: buildOpenGraph({ locale: routing.defaultLocale, path: PATH, title: TITLE, description: DESCRIPTION }),
  };
}

export default async function ReportsPage() {
  const locale = routing.defaultLocale;
  setRequestLocale(locale);

  return (
    <main>
      <JsonLd
        data={buildBreadcrumbSchema(locale, [
          { name: 'Gangan & Partners', path: '/' },
          { name: TITLE, path: PATH },
        ])}
      />
      <div
        className="relative overflow-hidden px-6 py-12 sm:px-11"
        style={{
          '--ink': '#f7f4ee',
          '--ink2': '#e3dcc9',
          '--ink3': '#d9cfbd',
          '--s3': '#d9c9a8',
        } as CSSProperties}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/reports-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.85)] via-[rgba(10,8,6,0.62)] to-[rgba(10,8,6,0.68)]" />
        <div className="relative z-10">
          <Breadcrumbs items={[{ name: 'Головна', href: '/' }, { name: TITLE }]} />
          <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.4em] text-[var(--s3)]">Аналітика</div>
          <h1 className="mb-5 font-serif text-[clamp(26px,3.2vw,44px)] font-light leading-[1.1] text-[var(--ink)]">
            {TITLE}
          </h1>
          <div className="divider" />
          <p className="max-w-[560px] text-[14.5px] leading-[1.8] text-[var(--ink3)]">{DESCRIPTION}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[880px] px-6 py-16 sm:px-11">
        <Link
          href="/reports/digital-assets-cross-border-2026"
          className="group block overflow-hidden rounded-lg border-hair p-7 transition-colors hover:bg-[var(--bgc)]"
          style={{ borderColor: 'var(--b)' }}
        >
          <div className="mb-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-[var(--s3)]">
            {reportMeta.date}
          </div>
          <h2 className="mb-3 font-serif text-[22px] font-semibold leading-[1.3] text-[var(--ink)]">
            {reportMeta.title}
          </h2>
          <p className="mb-4 max-w-[640px] text-[13.5px] leading-[1.7] text-[var(--ink3)]">{reportMeta.subtitle}</p>
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink)] transition-colors group-hover:text-[var(--s3)]">
            Читати звіт →
          </span>
        </Link>
      </div>
    </main>
  );
}
