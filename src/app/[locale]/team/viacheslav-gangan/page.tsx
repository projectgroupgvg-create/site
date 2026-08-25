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
import { getAllPosts, type FallbackPost } from '@/lib/blog';
import { getTranslations } from 'next-intl/server';

import BannerWatermark from '@/components/BannerWatermark';

export function generateStaticParams() {
  return [{ locale: routing.defaultLocale }];
}
export const dynamicParams = false;

const PATH = '/team/viacheslav-gangan';
const NAME = "В'ячеслав Ганган";
// Exact strings per TZ_Rozshyreni_profili_komandy_Gangan_i_Partnery §6.1
// (the layout's title template already appends " — Gangan & Partners", so
// the TZ's own "| Ганган і Партнери" suffix is dropped here to avoid
// doubling the firm name).
const TITLE = `${NAME} — адвокат, керуючий партнер`;
const DESCRIPTION =
  "В'ячеслав Ганган — адвокат і керуючий партнер АО «Ганган і Партнери» з понад 15-річним досвідом. Кримінальний захист, господарські спори, віртуальні активи та транскордонні провадження.";

const externalProfiles = [
  { label: 'OBOZ.UA', url: 'https://www.obozrevatel.com/ukr/person/gangan-vyacheslav-georgievich.htm' },
  { label: 'ResearchGate', url: 'https://www.researchgate.net/profile/Vyacheslav-Gangan' },
  { label: 'Google Scholar', url: 'https://scholar.google.com/citations?hl=uk&user=diaIF6MAAAAJ' },
];

// Links each headline practice to its real page on the site (TZ §4:
// "Профіль → практики: кожна спеціалізація веде на релевантну сторінку
// послуги"), rather than static unlinked text.
const keyPractices = [
  { label: 'Кримінальний захист', slug: 'criminal-defense' },
  { label: 'Корпоративні та господарські спори', slug: 'commercial-law' },
  { label: 'Адміністративні спори', slug: 'administrative-law' },
  { label: 'Цивільні та майнові спори', slug: 'civil-law' },
  { label: 'Віртуальні активи та AML', slug: 'crypto-fraud' },
  { label: 'Транскордонні провадження', slug: 'transnational-investigations' },
];

const knowsAbout = ['Кримінальне право', 'Корпоративне право', 'Віртуальні активи', 'AML', 'Транскордонні провадження'];

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

  // TZ §4 "Профіль → статті: автоматична добірка 3-6 останніх матеріалів" —
  // pulled from the same source as the blog index, not hand-maintained, so
  // it never drifts out of date as new posts are added.
  const blogT = await getTranslations('Blog');
  const fallbackPosts = blogT.raw('fallbackPosts') as FallbackPost[];
  const latestArticles = (await getAllPosts(locale, fallbackPosts)).slice(0, 5);

  return (
    <main>
      <JsonLd
        data={buildProfilePageSchema({
          locale,
          path: PATH,
          name: NAME,
          alternateNames: ['Vyacheslav Gangan', 'Viacheslav Gangan'],
          jobTitle: 'Адвокат, керуючий партнер',
          description: 'Адвокат із понад 15-річним досвідом юридичної практики.',
          knowsAbout,
          sameAs: externalProfiles.map((p) => p.url),
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
          style={{ backgroundImage: "url('/team-gangan-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.85)] via-[rgba(10,8,6,0.62)] to-[rgba(10,8,6,0.68)]" />
        <BannerWatermark />
        <div className="relative z-10">
          <Breadcrumbs items={[{ name: 'Головна', href: '/' }, { name: 'Команда', href: '/team' }, { name: NAME }]} />
          <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.4em] text-[var(--s3)]">
            Адвокат · Керуючий партнер
          </div>
          <h1 className="mb-3 font-serif text-[clamp(28px,3.4vw,44px)] font-light leading-[1.1] text-[var(--ink)]">
            {NAME}
          </h1>
          <p className="max-w-[560px] text-[14px] text-[var(--ink3)]">
            Viacheslav Gangan
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-[960px] grid-cols-1 gap-12 px-6 py-16 sm:px-11 lg:grid-cols-[320px_1fr]">
        <aside className="h-fit">
          <div className="mb-6 overflow-hidden rounded-lg border-hair" style={{ borderColor: 'var(--b)' }}>
            <div className="relative aspect-square">
              <Image
                src="/gangan-portrait.jpg"
                alt={NAME}
                fill
                sizes="(max-width: 1024px) 100vw, 320px"
                className="object-cover"
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
              В&apos;ячеслав Ганган — адвокат і керуючий партнер адвокатського об&apos;єднання
              «Ганган і Партнери» з понад 15-річним досвідом юридичної практики. Очолює практики
              кримінального захисту, корпоративних та господарських спорів, віртуальних активів,
              AML і транскордонних розслідувань, поєднуючи представництво в судах з побудовою
              комплексної правової стратегії для клієнта.
            </p>
            <p className="mb-4 text-justify text-[14px] leading-[1.85] text-[var(--ink2)]">
              Основний фокус практики — кримінальний захист у справах, пов&apos;язаних із
              криптоактивами, легалізацією (відмиванням) доходів, фінансовими розслідуваннями та
              міжнародним співробітництвом у кримінальних провадженнях: екстрадиція, міжнародний
              розшук, запити про правову допомогу та координація захисту в декількох юрисдикціях
              одночасно. Окремий напрям — комплаєнс і превентивна робота: аналіз ризиків для
              криптопроєктів і фінтех-бізнесу, класифікація продуктів та побудова процедур AML і
              санкційного скринінгу до виникнення спору чи розслідування.
            </p>
            <p className="mb-4 text-justify text-[14px] leading-[1.85] text-[var(--ink2)]">
              У господарській та адміністративній практиці супроводжує корпоративні спори,
              оскарження рішень державних органів та митні спори, а в цивільній — майнові спори й
              захист права власності. Транскордонний характер багатьох справ вимагає одночасної
              роботи з іноземними юрисдикціями, банками, криптобіржами та правоохоронними органами
              декількох країн — така координація є наскрізною темою практики.
            </p>
            <p className="text-justify text-[14px] leading-[1.85] text-[var(--ink2)]">
              Регулярно виступає як експертний коментатор із питань криптозлочинів, AML та
              регуляторної політики — див. розділ «Останні статті» нижче.
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

          <section className="mb-10 border-t-hair pt-8" style={{ borderColor: 'var(--b)' }}>
            <h2 className="mb-3 font-serif text-[18px] font-semibold text-[var(--ink)]">Останні статті</h2>
            <ul className="space-y-2.5">
              {latestArticles.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[13.5px] text-[var(--ink2)] underline decoration-[var(--b)] underline-offset-2 hover:text-[var(--ink)]"
                  >
                    {post.title}
                  </Link>
                  <span className="ml-2 text-[11px] text-[var(--ink3)]">{post.date}</span>
                </li>
              ))}
            </ul>
            <Link href="/blog" className="mt-3 inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--ink)] hover:text-[var(--s3)]">
              Усі статті →
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
      </div>
    </main>
  );
}
