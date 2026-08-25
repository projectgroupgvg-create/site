import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildAlternates, buildOpenGraph } from '@/lib/metadata';
import { buildProfilePageSchema, buildBreadcrumbSchema } from '@/lib/jsonld';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Link } from '@/i18n/navigation';

import BannerWatermark from '@/components/BannerWatermark';

export function generateStaticParams() {
  return [{ locale: routing.defaultLocale }];
}
export const dynamicParams = false;

const PATH = '/team/ivanna-gangan';
const NAME = 'Іванна Ганган';
const TITLE = `${NAME} — старший партнер, адвокат`;
const DESCRIPTION =
  'Іванна Ганган — адвокат АО «Ганган і Партнери». Сімейні спори: поділ майна подружжя, аліменти, визначення місця проживання дітей, розірвання шлюбу. Земельні спори: право власності, оренда, паювання, відведення ділянок.';

const keyPractices = [
  { label: 'Цивільне право', slug: 'civil-law' },
  { label: 'Поділ спільного майна подружжя', slug: 'marital-property-division' },
  { label: 'Земельне право', slug: 'land-law' },
  { label: 'Оформлення та відведення земельних ділянок', slug: 'land-allocation-registration' },
];

const knowsAbout = [
  'Сімейне право',
  'Поділ майна подружжя',
  'Земельне право',
  'Спори про право власності на землю',
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: buildAlternates(routing.defaultLocale, PATH),
    openGraph: buildOpenGraph({ locale: routing.defaultLocale, path: PATH, title: TITLE, description: DESCRIPTION }),
  };
}

export default async function IvannaGanganProfilePage() {
  const locale = routing.defaultLocale;
  setRequestLocale(locale);

  return (
    <main>
      <JsonLd
        data={buildProfilePageSchema({
          locale,
          path: PATH,
          name: NAME,
          alternateNames: ['Ivanna Gangan'],
          jobTitle: 'Старший партнер, адвокат',
          description: 'Адвокат, що спеціалізується на сімейних і земельних спорах.',
          knowsAbout,
          sameAs: [],
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema(locale, [
          { name: 'Ганган і Партнери', path: '/' },
          { name: 'Команда', path: '/team' },
          { name: NAME, path: PATH },
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
          style={{ backgroundImage: "url('/team-section-bg-v2.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.85)] via-[rgba(10,8,6,0.62)] to-[rgba(10,8,6,0.68)]" />
        <BannerWatermark />
        <div className="relative z-10">
          <Breadcrumbs items={[{ name: 'Головна', href: '/' }, { name: 'Команда', href: '/team' }, { name: NAME }]} />
          <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.4em] text-[var(--s3)]">
            Старший партнер · Сімейні та земельні спори
          </div>
          <h1 className="mb-3 font-serif text-[clamp(28px,3.4vw,44px)] font-light leading-[1.1] text-[var(--ink)]">
            {NAME}
          </h1>
          <p className="max-w-[560px] text-[14px] text-[var(--ink3)]">Ivanna Gangan</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-[960px] grid-cols-1 gap-12 px-6 py-16 sm:px-11 lg:grid-cols-[320px_1fr]">
        <aside className="h-fit">
          <div className="mb-6 overflow-hidden rounded-lg border-hair" style={{ borderColor: 'var(--b)' }}>
            <div className="relative aspect-square">
              <Image
                src="/ivanna-gangan-portrait.jpg"
                alt={NAME}
                fill
                sizes="(max-width: 1024px) 100vw, 320px"
                className="object-cover"
                style={{ objectPosition: '50% 15%' }}
                priority
              />
            </div>
          </div>

          <div className="rounded-lg border-hair p-6" style={{ borderColor: 'var(--b)', backgroundColor: 'var(--bgc)' }}>
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--s3)]">Звернутись</div>
            <Link
              href="/#ai"
              className="mb-3 block w-full rounded-sm bg-[var(--ink)] px-6 py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--wh)] transition-colors hover:bg-[var(--ink-hover)]"
            >
              Записатись на консультацію
            </Link>
            <Link href="/#contacts" className="block text-center text-[12px] text-[var(--ink2)] hover:text-[var(--ink)]">
              Контакти об&apos;єднання →
            </Link>
          </div>
        </aside>

        <div>
          <section className="mb-10">
            <h2 className="mb-3 font-serif text-[18px] font-semibold text-[var(--ink)]">Про адвоката</h2>
            <p className="mb-4 text-justify text-[14px] leading-[1.85] text-[var(--ink2)]">
              Іванна Ганган — адвокат адвокатського об&apos;єднання «Ганган і Партнери», що
              спеціалізується на сімейних і земельних спорах. У сімейній практиці веде справи про
              поділ спільного майна подружжя, стягнення аліментів, визначення місця проживання
              дітей та розірвання шлюбу — від досудового врегулювання й медіації між подружжям до
              представництва інтересів клієнта в суді, коли досягти згоди мирним шляхом не вдається.
            </p>
            <p className="mb-4 text-justify text-[14px] leading-[1.85] text-[var(--ink2)]">
              У земельній практиці супроводжує спори щодо права власності на землю, оренди
              земельних ділянок, паювання та відведення (виділення) ділянок, включно з оскарженням
              рішень органів місцевого самоврядування та земельних відомств, а також перевіркою
              юридичної чистоти ділянки перед її придбанням чи оформленням права власності.
            </p>
            <p className="text-justify text-[14px] leading-[1.85] text-[var(--ink2)]">
              Поєднання цих двох напрямів особливо актуальне у справах про поділ майна подружжя,
              коли до спільного майна входить земельна ділянка чи нерухомість на ній — такі справи
              вимагають одночасного розуміння і сімейного, і земельного законодавства.
            </p>
          </section>

          <section className="mb-10 border-t-hair pt-8" style={{ borderColor: 'var(--b)' }}>
            <h2 className="mb-3 font-serif text-[18px] font-semibold text-[var(--ink)]">Практики</h2>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {keyPractices.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/practices/${p.slug}`}
                    className="block rounded-sm border-hair px-4 py-2.5 text-[13px] text-[var(--ink2)] transition-colors hover:border-[color:var(--s3)] hover:text-[var(--ink)]"
                    style={{ borderColor: 'var(--b)' }}
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
