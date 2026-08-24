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

const PATH = '/virtual-assets/criminal-defence';
const H1 = 'Кримінальний захист у справах із цифровими активами';
const DESCRIPTION =
  'Захист у кримінальних провадженнях за ст. 209 КК та суміжними складами, повʼязаними з віртуальними активами: докази, арешт, конфіскація.';

const points = [
  'Захист на стадії досудового розслідування та в суді у справах за ст. 209 КК України (легалізація доходів)',
  'Робота з електронними доказами: wallet-адреси, transaction hashes, логи доступу, forensic-експертиза',
  'Оскарження арешту майна та коштів, повʼязаних із криптоактивами',
  'Взаємодія з НАБУ, САП, Кіберполіцією та іншими правоохоронними органами у справах про віртуальні активи',
  'Транскордонний елемент: MLAT-запити, екстрадиція, координація з іноземними захисниками',
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${H1} | Ганган і Партнери`,
    description: DESCRIPTION,
    alternates: buildAlternates(routing.defaultLocale, PATH),
    openGraph: buildOpenGraph({ locale: routing.defaultLocale, path: PATH, title: H1, description: DESCRIPTION }),
  };
}

export default async function CriminalDefencePage() {
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
          style={{ backgroundImage: "url('/virtual-assets-criminal-defence-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.85)] via-[rgba(10,8,6,0.62)] to-[rgba(10,8,6,0.68)]" />
        <div className="relative z-10">
          <Breadcrumbs items={[{ name: 'Головна', href: '/' }, { name: 'Віртуальні активи', href: '/virtual-assets' }, { name: 'Кримінальний захист' }]} />
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

        <div className="mb-10 flex flex-wrap gap-3">
          <Link href="/virtual-assets" className="rounded-sm border-hair px-5 py-2.5 text-[12px] text-[var(--ink2)] hover:text-[var(--ink)]" style={{ borderColor: 'var(--b)' }}>
            ← Віртуальні активи
          </Link>
          <Link href="/virtual-assets/eu-market-entry-mica" className="rounded-sm border-hair px-5 py-2.5 text-[12px] text-[var(--ink2)] hover:text-[var(--ink)]" style={{ borderColor: 'var(--b)' }}>
            MiCA та вихід на ринок ЄС →
          </Link>
        </div>

        <div className="rounded-lg border-hair p-7" style={{ borderColor: 'var(--b)', backgroundColor: 'var(--bgc)' }}>
          <div className="mb-4 font-serif text-[18px] font-semibold text-[var(--ink)]">
            Потрібна консультація захисника?
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
