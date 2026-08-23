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

const PATH = '/virtual-assets';
const TITLE = 'Віртуальні активи — адвокатська допомога | Ганган і Партнери';
const H1 = 'Юридичний супровід у сфері віртуальних активів і криптозлочинів';
const DESCRIPTION =
  'Кримінальний захист, asset recovery, AML, санкції, MiCA та транскордонні розслідування у справах, пов’язаних із віртуальними активами.';

const services = [
  {
    title: 'Кримінальний захист у справах із цифровими активами',
    desc: 'Захист за ст. 209 КК та суміжними складами, робота з електронними доказами, арешт і спеціальна конфіскація.',
    href: '/virtual-assets/criminal-defence',
  },
  {
    title: 'MiCA та вихід на ринок ЄС',
    desc: 'Класифікація токена, CASP-авторизація, межі reverse solicitation, узгодження продукту з вимогами ЄС.',
    href: '/virtual-assets/eu-market-entry-mica',
  },
  {
    title: 'AML, Travel Rule та блокування активів',
    desc: 'Комплаєнс-аудит, взаємодія з біржами при блокуванні коштів, зняття арештів.',
    href: '/practices/aml-compliance',
  },
  {
    title: 'Blockchain-розслідування та asset recovery',
    desc: 'Трасування криптотранзакцій, підготовка доказової бази, міжнародні запити про повернення активів.',
    href: '/practices/blockchain-investigations',
  },
];

const scenarios = [
  'Викрадення USDT або іншого криптоактиву — потрібен алгоритм дій і freezing запит',
  'Блокування рахунку або гаманця біржею',
  'Запит правоохоронного органу щодо клієнта чи транзакцій',
  'Кримінальне провадження за ст. 209 КК (легалізація доходів)',
  'Вихід криптопроєкту на ринок ЄС і питання MiCA-класифікації',
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: buildAlternates(routing.defaultLocale, PATH),
    openGraph: buildOpenGraph({ locale: routing.defaultLocale, path: PATH, title: TITLE, description: DESCRIPTION }),
  };
}

export default async function VirtualAssetsPage() {
  const locale = routing.defaultLocale;
  setRequestLocale(locale);

  return (
    <main>
      <JsonLd
        data={buildServiceSchema({ locale, path: PATH, name: H1, description: DESCRIPTION })}
      />
      <JsonLd
        data={buildBreadcrumbSchema(locale, [
          { name: 'Gangan & Partners', path: '/' },
          { name: 'Практики', path: '/#practices' },
          { name: 'Віртуальні активи', path: PATH },
        ])}
      />

      <div
        className="relative flex min-h-[52vh] items-center overflow-hidden px-6 py-14 sm:min-h-[58vh] sm:px-11"
        style={{
          '--ink': '#f7f4ee',
          '--ink2': '#e3dcc9',
          '--ink3': '#d9cfbd',
          '--s3': '#d9c9a8',
        } as CSSProperties}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/virtual-assets-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.85)] via-[rgba(10,8,6,0.62)] to-[rgba(10,8,6,0.68)]" />
        <div className="relative z-10">
          <Breadcrumbs items={[{ name: 'Головна', href: '/' }, { name: 'Практики', href: '/#practices' }, { name: 'Віртуальні активи' }]} />
          <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.4em] text-[var(--s3)]">Практика</div>
          <h1 className="mb-5 max-w-[760px] font-serif text-[clamp(26px,3.2vw,44px)] font-light leading-[1.15] text-[var(--ink)]">
            {H1}
          </h1>
          <div className="divider" />
          <p className="max-w-[620px] text-[14.5px] leading-[1.8] text-[var(--ink3)]">{DESCRIPTION}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[960px] px-6 py-16 sm:px-11">
        {/* services */}
        <section className="mb-14">
          <h2 className="mb-6 font-serif text-[20px] font-semibold text-[var(--ink)]">Послуги</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {services.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group rounded-lg border-hair p-6 transition-colors hover:bg-[var(--bgc)]"
                style={{ borderColor: 'var(--b)' }}
              >
                <h3 className="mb-2 font-serif text-[16px] font-semibold text-[var(--ink)]">{s.title}</h3>
                <p className="mb-3 text-[13px] leading-[1.7] text-[var(--ink3)]">{s.desc}</p>
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition-colors group-hover:text-[var(--s3)]">
                  Детальніше →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* scenarios */}
        <section className="mb-14 border-t-hair pt-10" style={{ borderColor: 'var(--b)' }}>
          <h2 className="mb-4 font-serif text-[20px] font-semibold text-[var(--ink)]">Типові ситуації звернення</h2>
          <ul className="space-y-2">
            {scenarios.map((s) => (
              <li key={s} className="relative border-b-hair py-3 pl-5 text-[13.5px] text-[var(--ink2)]" style={{ borderColor: 'var(--b)' }}>
                <span className="absolute left-0 text-[var(--s3)]">—</span>
                {s}
              </li>
            ))}
          </ul>
        </section>

        {/* first 48 hours */}
        <section
          id="first-48-hours"
          className="mb-14 rounded-lg border-hair p-8"
          style={{ borderColor: 'var(--b)', backgroundColor: 'var(--ink)' }}
        >
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d9c9a8]">Терміново</div>
          <h2 className="mb-3 font-serif text-[22px] font-semibold text-[#f7f4ee]">Перші 48 годин після криптоінциденту</h2>
          <p className="mb-5 max-w-[620px] text-[13.5px] leading-[1.8] text-[#d9cfbd]">
            Швидкість дій у перші години визначає шанс зберегти докази і домогтися заморожування активів.
            Детальний покроковий алгоритм — у нашому аналітичному звіті.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/#ai"
              className="rounded-sm bg-[#f7f4ee] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1c1510] transition-colors hover:bg-[#e3dcc9]"
            >
              Термінове звернення
            </a>
            <Link
              href="/reports/digital-assets-cross-border-2026#first-48-hours"
              className="rounded-sm border-hair px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#f7f4ee] transition-colors hover:bg-[rgba(247,244,238,0.1)]"
              style={{ borderColor: 'rgba(247,244,238,0.3)' }}
            >
              Алгоритм дій →
            </Link>
          </div>
        </section>

        {/* related materials */}
        <section className="mb-14 border-t-hair pt-10" style={{ borderColor: 'var(--b)' }}>
          <h2 className="mb-4 font-serif text-[20px] font-semibold text-[var(--ink)]">Аналітика та джерела</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/reports/digital-assets-cross-border-2026" className="rounded-sm border-hair px-5 py-2.5 text-[12.5px] text-[var(--ink2)] transition-colors hover:border-[color:var(--s3)] hover:text-[var(--ink)]" style={{ borderColor: 'var(--b)' }}>
              Звіт: Digital Assets &amp; Cross-Border Legal Risk Outlook 2026
            </Link>
            <Link href="/blog" className="rounded-sm border-hair px-5 py-2.5 text-[12.5px] text-[var(--ink2)] transition-colors hover:border-[color:var(--s3)] hover:text-[var(--ink)]" style={{ borderColor: 'var(--b)' }}>
              Статті у блозі
            </Link>
            <Link href="/media" className="rounded-sm border-hair px-5 py-2.5 text-[12.5px] text-[var(--ink2)] transition-colors hover:border-[color:var(--s3)] hover:text-[var(--ink)]" style={{ borderColor: 'var(--b)' }}>
              Публікації у медіа
            </Link>
          </div>
        </section>

        {/* author */}
        <section className="mb-10 flex flex-col gap-6 border-t-hair pt-10 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'var(--b)' }}>
          <div>
            <div className="mb-1 text-[11px] uppercase tracking-[0.1em] text-[var(--s3)]">Відповідальний адвокат</div>
            <Link href="/team/viacheslav-gangan" className="font-serif text-[18px] font-semibold text-[var(--ink)] hover:text-[var(--s3)]">
              В&apos;ячеслав Ганган
            </Link>
          </div>
          <a
            href="/#ai"
            className="inline-block rounded-sm bg-[var(--ink)] px-8 py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--wh)] transition-colors hover:bg-[var(--ink-hover)]"
          >
            Отримати консультацію
          </a>
        </section>

        <p className="text-[11.5px] leading-[1.7] text-[var(--ink3)]">
          Матеріали цієї сторінки мають інформаційний характер і не є індивідуальною юридичною
          консультацією. Для оцінки конкретної ситуації необхідне окреме звернення з урахуванням
          фактичних обставин справи.
        </p>
      </div>
    </main>
  );
}
