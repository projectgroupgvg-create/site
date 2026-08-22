import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildAlternates, buildOpenGraph } from '@/lib/metadata';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export function generateStaticParams() {
  return [{ locale: routing.defaultLocale }];
}
export const dynamicParams = false;

const PATH = '/media';
const TITLE = 'Публікації та коментарі у медіа | Ганган і Партнери';
const DESCRIPTION = "Публікації, авторські колонки та експертні коментарі В'ячеслава Гангана у медіа.";
const SOURCE_PROFILE = 'https://www.obozrevatel.com/ukr/person/gangan-vyacheslav-georgievich.htm';

type MediaItem = { title: string; type: string; topic: string; annotation: string };

// Initial archive per the client's brief (TZ 5.3) — bibliographic entries
// pointing back to the OBOZ.UA profile as the primary source. Do not copy
// full article text or editorial photos — link out instead.
const items: MediaItem[] = [
  {
    title: 'Кожен хворий на коронавірус переплачує за ліки через неефективність АМКУ',
    type: 'Авторська публікація',
    topic: "Пов'язаний матеріал",
    annotation: 'Колонка про вплив слабкого антимонопольного контролю на ціни фармацевтичного ринку під час пандемії.',
  },
  {
    title: 'Тест на совість',
    type: 'Авторська колонка',
    topic: 'Ділова етика та регулювання',
    annotation: 'Авторська колонка на тему ділової етики та відповідальності бізнесу.',
  },
  {
    title: 'Через зростання тарифів УЗ вантажовідправники втратять мільярди',
    type: 'Експертний коментар',
    topic: 'Регулювання природних монополій',
    annotation: 'Коментар щодо економічних наслідків підвищення тарифів Укрзалізниці для вантажовідправників.',
  },
  {
    title: 'Відповідальність за діяльність держкомпаній зобов’язані нести їхні керівники',
    type: 'Експертний коментар',
    topic: 'Корпоративне управління',
    annotation: 'Коментар про персональну відповідальність керівників державних компаній за результати діяльності.',
  },
  {
    title: 'Українському агроринку необхідна здорова конкуренція',
    type: 'Авторська / експертна публікація',
    topic: 'Конкурентне право',
    annotation: 'Публікація про стан конкуренції на аграрному ринку України та необхідні регуляторні зміни.',
  },
  {
    title: 'Антимонопольна реформа може врятувати економіку України',
    type: 'Експертний коментар',
    topic: 'Антимонопольна політика',
    annotation: 'Коментар щодо значення антимонопольної реформи для економічного розвитку.',
  },
  {
    title: 'АМКУ буде крутіше НАБУ',
    type: 'Авторська / експертна публікація',
    topic: 'Антимонопольна політика',
    annotation: 'Публікація про потенційне посилення повноважень Антимонопольного комітету.',
  },
  {
    title: 'Причальний фронт: бізнес добивається рівних умов',
    type: 'Авторська публікація',
    topic: 'Портова інфраструктура',
    annotation: 'Матеріал про боротьбу бізнесу за рівні умови доступу до портової інфраструктури.',
  },
  {
    title: 'Бізнесу необхідний уніфікований підхід до податку на землю',
    type: 'Авторська публікація',
    topic: 'Податкове право',
    annotation: 'Публікація про потребу в уніфікованому підході до оподаткування землі для бізнесу.',
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: buildAlternates(routing.defaultLocale, PATH),
    openGraph: buildOpenGraph({ locale: routing.defaultLocale, path: PATH, title: TITLE, description: DESCRIPTION }),
  };
}

export default async function MediaPage() {
  const locale = routing.defaultLocale;
  setRequestLocale(locale);

  return (
    <main>
      <JsonLd
        data={buildBreadcrumbSchema(locale, [
          { name: 'Gangan & Partners', path: '/' },
          { name: 'Медіа', path: PATH },
        ])}
      />
      <div
        className="relative overflow-hidden px-6 py-16 sm:px-11"
        style={{
          '--ink': '#f7f4ee',
          '--ink2': '#e3dcc9',
          '--ink3': '#d9cfbd',
          '--s3': '#d9c9a8',
        } as CSSProperties}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/media-header-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.82)] via-[rgba(10,8,6,0.58)] to-[rgba(10,8,6,0.62)]" />
        <div className="relative z-10">
          <Breadcrumbs items={[{ name: 'Головна', href: '/' }, { name: 'Медіа' }]} />
          <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.4em] text-[var(--s3)]">Аналітика</div>
          <h1 className="mb-5 font-serif text-[clamp(26px,3.2vw,44px)] font-light leading-[1.1] text-[var(--ink)]">
            Публікації та коментарі у медіа
          </h1>
          <div className="divider" />
          <p className="max-w-[560px] text-[14.5px] leading-[1.8] text-[var(--ink3)]">{DESCRIPTION}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[880px] px-6 py-16 sm:px-11">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.title} className="rounded-lg border-hair p-6" style={{ borderColor: 'var(--b)' }}>
              <div className="mb-2 flex flex-wrap items-center gap-2 text-[9.5px] uppercase tracking-[0.12em] text-[var(--s3)]">
                <span>{item.type}</span>
                <span className="text-[var(--ink3)]">·</span>
                <span>OBOZ.UA</span>
              </div>
              <h2 className="mb-2 font-serif text-[15px] font-semibold leading-[1.4] text-[var(--ink)]">{item.title}</h2>
              <p className="mb-1 text-[11px] uppercase tracking-[0.08em] text-[var(--ink3)]">{item.topic}</p>
              <p className="mb-4 text-[12.5px] leading-[1.7] text-[var(--ink2)]">{item.annotation}</p>
              <a
                href={SOURCE_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink)] hover:text-[var(--s3)]"
              >
                Читати оригінал ↗
              </a>
            </div>
          ))}
        </div>

        <p className="mt-10 text-[11.5px] leading-[1.7] text-[var(--ink3)]">
          Першоджерело: {' '}
          <a href={SOURCE_PROFILE} target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--ink)]">
            профіль В&apos;ячеслава Гангана на OBOZ.UA
          </a>
          . Повні тексти, редакційні фото та оформлення видання не копіюються — на сторінці розміщено
          бібліографічні відомості, власну анотацію та пряме посилання на першоджерело.
        </p>
      </div>
    </main>
  );
}
