import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildAlternates, buildOpenGraph } from '@/lib/metadata';
import { buildServiceSchema, buildBreadcrumbSchema } from '@/lib/jsonld';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Link } from '@/i18n/navigation';

export function generateStaticParams() {
  return [{ locale: routing.defaultLocale }];
}
export const dynamicParams = false;

const PATH = '/virtual-assets/eu-market-entry-mica';
const H1 = 'MiCA та вихід українських проєктів на ринок ЄС';
const DESCRIPTION =
  'Класифікація токена за MiCA, CASP-авторизація, межі reverse solicitation та узгодження продукту з вимогами ЄС для українських Web3-команд.';

const points = [
  'Класифікація токена/сервісу: crypto-asset, EMT, ART, фінансовий інструмент чи інший регульований продукт',
  'Аналіз потреби у CASP-авторизації та виборі держави ліцензування',
  'Оцінка меж reverse solicitation (ст. 61 MiCA) для команд, що працюють з клієнтами з ЄС без ліцензії',
  'Узгодження White Paper, Terms of Use, Privacy Notice та AML/KYC Policy з фактичною моделлю продукту',
  'AML/Travel Rule, DAC8 та санкційний комплаєнс для виходу на ринок ЄС',
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${H1} | Ганган і Партнери`,
    description: DESCRIPTION,
    alternates: buildAlternates(routing.defaultLocale, PATH),
    openGraph: buildOpenGraph({ locale: routing.defaultLocale, path: PATH, title: H1, description: DESCRIPTION }),
  };
}

export default async function EuMarketEntryPage() {
  const locale = routing.defaultLocale;
  setRequestLocale(locale);

  return (
    <main>
      <JsonLd data={buildServiceSchema({ locale, path: PATH, name: H1, description: DESCRIPTION })} />
      <JsonLd
        data={buildBreadcrumbSchema(locale, [
          { name: 'Ганган і Партнери', path: '/' },
          { name: 'Віртуальні активи', path: '/virtual-assets' },
          { name: H1, path: PATH },
        ])}
      />

      <div
        className="relative overflow-hidden px-6 py-14 sm:px-11"
        style={{
          '--ink': '#f7f4ee',
          '--ink2': '#e3dcc9',
          '--ink3': '#d9cfbd',
          '--s3': '#d9c9a8',
        } as CSSProperties}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/virtual-assets-mica-eu-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.85)] via-[rgba(10,8,6,0.62)] to-[rgba(10,8,6,0.68)]" />
        <div className="relative z-10">
          <Breadcrumbs items={[{ name: 'Головна', href: '/' }, { name: 'Віртуальні активи', href: '/virtual-assets' }, { name: 'MiCA та вихід до ЄС' }]} />
          <h1 className="mb-5 max-w-[720px] font-serif text-[clamp(26px,3.2vw,44px)] font-light leading-[1.15] text-[var(--ink)]">
            {H1}
          </h1>
          <div className="divider" />
          <p className="max-w-[600px] text-[14.5px] leading-[1.8] text-[var(--ink3)]">{DESCRIPTION}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[720px] px-6 py-16 sm:px-11">
        <ul className="mb-10">
          {points.map((p) => (
            <li key={p} className="relative border-b-hair py-3 pl-5 text-[13.5px] leading-[1.7] text-[var(--ink2)]" style={{ borderColor: 'var(--b)' }}>
              <span className="absolute left-0 text-[var(--s3)]">—</span>
              {p}
            </li>
          ))}
        </ul>

        <div className="mb-10 rounded-lg border-hair p-6" style={{ borderColor: 'var(--b)', backgroundColor: 'var(--bgc)' }}>
          <p className="text-[13.5px] leading-[1.75] text-[var(--ink2)]">
            Детальний огляд регуляторних вимог MiCA, Travel Rule, DAC8 та санкційного комплаєнсу — у
            нашому звіті{' '}
            <Link href="/reports/digital-assets-cross-border-2026" className="underline decoration-[var(--b)] underline-offset-2 hover:text-[var(--ink)]">
              Digital Assets &amp; Cross-Border Legal Risk Outlook 2026
            </Link>
            .
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          <Link href="/virtual-assets" className="rounded-sm border-hair px-5 py-2.5 text-[12px] text-[var(--ink2)] hover:text-[var(--ink)]" style={{ borderColor: 'var(--b)' }}>
            ← Віртуальні активи
          </Link>
          <Link href="/virtual-assets/criminal-defence" className="rounded-sm border-hair px-5 py-2.5 text-[12px] text-[var(--ink2)] hover:text-[var(--ink)]" style={{ borderColor: 'var(--b)' }}>
            Кримінальний захист →
          </Link>
        </div>

        <div className="rounded-lg border-hair p-7" style={{ borderColor: 'var(--b)', backgroundColor: 'var(--bgc)' }}>
          <div className="mb-4 font-serif text-[18px] font-semibold text-[var(--ink)]">
            Плануєте вихід на ринок ЄС?
          </div>
          <a
            href="/#ai"
            className="inline-block rounded-sm bg-[var(--ink)] px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--wh)] transition-colors hover:bg-[var(--ink-hover)]"
          >
            Отримати консультацію
          </a>
        </div>
      </div>
    </main>
  );
}
