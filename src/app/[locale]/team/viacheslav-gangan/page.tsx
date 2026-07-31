import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildAlternates, buildOpenGraph } from '@/lib/metadata';
import { buildProfilePageSchema, buildBreadcrumbSchema } from '@/lib/jsonld';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Link } from '@/i18n/navigation';

export function generateStaticParams() {
  return [{ locale: routing.defaultLocale }];
}
export const dynamicParams = false;

const PATH = '/team/viacheslav-gangan';
const NAME = "В'ячеслав Ганган";
const TITLE = `${NAME} — адвокат і дослідник віртуальних активів`;
const DESCRIPTION =
  "В'ячеслав Ганган — керуючий партнер Ганган і Партнери, адвокат у справах про віртуальні активи, кримінальний захист, AML та транскордонні розслідування, дослідник правового регулювання цифрових активів.";

const externalProfiles = [
  { label: 'OBOZ.UA', url: 'https://www.obozrevatel.com/ukr/person/gangan-vyacheslav-georgievich.htm' },
  { label: 'ResearchGate', url: 'https://www.researchgate.net/profile/Vyacheslav-Gangan' },
  { label: 'Google Scholar', url: 'https://scholar.google.com/citations?hl=uk&user=diaIF6MAAAAJ' },
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: buildAlternates(routing.defaultLocale, PATH),
    openGraph: buildOpenGraph({ locale: routing.defaultLocale, path: PATH, title: TITLE, description: DESCRIPTION }),
  };
}

export default async function GanganProfilePage() {
  const locale = routing.defaultLocale;
  setRequestLocale(locale);

  return (
    <main>
      <JsonLd
        data={buildProfilePageSchema({
          locale,
          path: PATH,
          name: NAME,
          alternateNames: ['Vyacheslav Gangan', 'Viacheslav Gangan'],
          jobTitle: 'Адвокат, керуючий партнер',
          sameAs: externalProfiles.map((p) => p.url),
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema(locale, [
          { name: 'Gangan & Partners', path: '/' },
          { name: 'Команда', path: '/team' },
          { name: NAME, path: PATH },
        ])}
      />

      <div className="border-b-hair bg-[var(--bg2)] px-6 py-14 sm:px-11" style={{ borderColor: 'var(--b)' }}>
        <Breadcrumbs items={[{ name: 'Головна', href: '/' }, { name: 'Команда', href: '/team' }, { name: NAME }]} />
        <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.4em] text-[var(--s3)]">
          Адвокат · Керуючий партнер
        </div>
        <h1 className="mb-3 font-serif text-[clamp(28px,3.4vw,44px)] font-light leading-[1.1] text-[var(--ink)]">
          {NAME}
        </h1>
        <p className="max-w-[560px] text-[14px] text-[var(--ink3)]">
          Vyacheslav Gangan / Viacheslav Gangan
        </p>
      </div>

      <div className="mx-auto grid max-w-[960px] grid-cols-1 gap-12 px-6 py-16 sm:px-11 lg:grid-cols-[1fr_320px]">
        <div>
          <section className="mb-10">
            <h2 className="mb-3 font-serif text-[18px] font-semibold text-[var(--ink)]">Про адвоката</h2>
            <p className="mb-4 text-[14px] leading-[1.85] text-[var(--ink2)]">
              Керуючий партнер адвокатського об&apos;єднання «Ганган і Партнери». Очолює практики
              кримінального захисту, віртуальних активів, AML та транскордонних розслідувань. Понад 15
              років практики у кримінальному праві, з фокусом на справах, повʼязаних із криптоактивами,
              легалізацією доходів та міжнародним співробітництвом у кримінальних провадженнях.
            </p>
            <p className="text-[14px] leading-[1.85] text-[var(--ink2)]">
              Поєднує адвокатську практику з науковим дослідженням правового регулювання віртуальних
              активів, регулярно виступає як експертний коментатор із питань криптозлочинів, AML та
              регуляторної політики.
            </p>
          </section>

          <section className="mb-10 border-t-hair pt-8" style={{ borderColor: 'var(--b)' }}>
            <h2 className="mb-3 font-serif text-[18px] font-semibold text-[var(--ink)]">Практики</h2>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {['Кримінальний захист', 'Віртуальні активи', 'AML та санкції', 'Транскордонні справи'].map((p) => (
                <li key={p} className="rounded-sm border-hair px-4 py-2.5 text-[13px] text-[var(--ink2)]" style={{ borderColor: 'var(--b)' }}>
                  {p}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10 border-t-hair pt-8" style={{ borderColor: 'var(--b)' }}>
            <h2 className="mb-3 font-serif text-[18px] font-semibold text-[var(--ink)]">Наукова діяльність</h2>
            <p className="mb-2 text-[14px] leading-[1.8] text-[var(--ink2)]">
              Здобувач наукового ступеня, дослідження у сфері правового регулювання віртуальних активів.
            </p>
            <p className="text-[12.5px] italic leading-[1.7] text-[var(--ink3)]">
              Тема дисертаційного дослідження та статус здобувача будуть уточнені після підтвердження
              актуальних відомостей.
            </p>
            <Link href="/research" className="mt-3 inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--ink)] hover:text-[var(--s3)]">
              Наукові публікації →
            </Link>
          </section>

          <section className="mb-10 border-t-hair pt-8" style={{ borderColor: 'var(--b)' }}>
            <h2 className="mb-3 font-serif text-[18px] font-semibold text-[var(--ink)]">Вибрані матеріали</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/reports/digital-assets-cross-border-2026" className="text-[13.5px] text-[var(--ink2)] underline decoration-[var(--b)] underline-offset-2 hover:text-[var(--ink)]">
                  Digital Assets &amp; Cross-Border Legal Risk Outlook 2026
                </Link>
              </li>
              <li>
                <Link href="/media" className="text-[13.5px] text-[var(--ink2)] underline decoration-[var(--b)] underline-offset-2 hover:text-[var(--ink)]">
                  Публікації та коментарі у медіа
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[13.5px] text-[var(--ink2)] underline decoration-[var(--b)] underline-offset-2 hover:text-[var(--ink)]">
                  Статті у блозі
                </Link>
              </li>
            </ul>
          </section>

          <section className="border-t-hair pt-8" style={{ borderColor: 'var(--b)' }}>
            <h2 className="mb-3 font-serif text-[18px] font-semibold text-[var(--ink)]">Зовнішні профілі</h2>
            <div className="flex flex-wrap gap-3">
              {externalProfiles.map((p) => (
                <a
                  key={p.label}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm border-hair px-4 py-2 text-[12px] text-[var(--ink2)] transition-colors hover:border-[color:var(--s3)] hover:text-[var(--ink)]"
                  style={{ borderColor: 'var(--b)' }}
                >
                  {p.label} ↗
                </a>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-lg border-hair p-6" style={{ borderColor: 'var(--b)', backgroundColor: 'var(--bgc)' }}>
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
        </aside>
      </div>
    </main>
  );
}
