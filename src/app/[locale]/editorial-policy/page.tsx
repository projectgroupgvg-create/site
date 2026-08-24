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

const PATH = '/editorial-policy';
const TITLE = 'Редакційна політика | Ганган і Партнери';
const DESCRIPTION = 'Редакційна політика адвокатського об’єднання Ганган і Партнери: авторство, перевірка джерел, оновлення матеріалів і використання AI.';

const sections = [
  {
    title: 'Авторство та перевірка',
    body: [
      'Кожен юридичний матеріал на сайті має видимого автора з посиланням на персональну сторінку. Якщо матеріал перевіряв інший адвокат об’єднання, це позначається окремо як рецензування.',
      'Факти, правові норми та цитати перевіряються за першоджерелами: офіційними текстами законів, реєстрами, роз’ясненнями регуляторів і рішеннями судів.',
    ],
  },
  {
    title: 'Оновлення та виправлення',
    body: [
      'Дата першої публікації та дата суттєвого оновлення матеріалу вказуються окремо. Матеріал оновлюється, якщо змінилося законодавство, судова практика або з’явилася істотна нова інформація.',
      'Якщо ви помітили помилку або застарілу інформацію — напишіть на gangan.partners@gmail.com із посиланням на конкретний матеріал. Виправлення вносяться після перевірки.',
    ],
  },
  {
    title: 'Використання AI',
    body: [
      'Інструменти штучного інтелекту можуть використовуватися як допоміжний засіб — для дослідження джерел, структурування чи первинного перекладу тексту. Кожен юридичний матеріал перед публікацією проходить обов’язковий людський юридичний контроль адвоката об’єднання.',
      'AI не приймає юридичних висновків самостійно і не замінює професійну відповідальність автора чи рецензента за зміст матеріалу.',
    ],
  },
  {
    title: 'Розмежування факту, висновку та оцінки',
    body: [
      'Матеріали чітко розділяють: (1) факт або норму права; (2) правовий висновок на основі цієї норми; (3) авторську оцінку чи прогноз. Це розмежування допомагає читачу зрозуміти межу між чинним правом і думкою автора.',
    ],
  },
  {
    title: 'Дисклеймер',
    body: [
      'Матеріали сайту мають інформаційний характер і не є індивідуальною юридичною консультацією. Вони не створюють відносин адвокат–клієнт. Для оцінки конкретної ситуації необхідна окрема консультація з урахуванням фактичних обставин.',
      'Об’єднання не гарантує результат судової справи та не гарантує позицій у пошукових системах для власних публікацій.',
    ],
  },
  {
    title: 'Джерела та цитування',
    body: [
      'Пріоритет надається офіційним джерелам: текстам законів, реєстрам державних органів, роз’ясненням регуляторів і рішенням судів. Матеріали медіа-архіву посилаються на першоджерело і не відтворюють повні тексти чи редакційні фотографії без дозволу видання.',
    ],
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

export default async function EditorialPolicyPage() {
  const locale = routing.defaultLocale;
  setRequestLocale(locale);

  return (
    <main>
      <JsonLd
        data={buildBreadcrumbSchema(locale, [
          { name: 'Ганган і Партнери', path: '/' },
          { name: 'Редакційна політика', path: PATH },
        ])}
      />
      <div className="border-b-hair bg-[var(--bg2)] px-6 py-12 sm:px-11" style={{ borderColor: 'var(--b)' }}>
        <Breadcrumbs items={[{ name: 'Головна', href: '/' }, { name: 'Редакційна політика' }]} />
        <h1 className="mb-5 font-serif text-[clamp(26px,3.2vw,44px)] font-light leading-[1.1] text-[var(--ink)]">
          Редакційна політика
        </h1>
        <div className="divider" />
        <p className="max-w-[560px] text-[14.5px] leading-[1.8] text-[var(--ink3)]">{DESCRIPTION}</p>
      </div>

      <div className="mx-auto max-w-[720px] px-6 py-16 sm:px-11">
        {sections.map((s) => (
          <section key={s.title} className="mb-10">
            <h2 className="mb-3 font-serif text-[18px] font-semibold text-[var(--ink)]">{s.title}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="mb-3 text-[14px] leading-[1.85] text-[var(--ink2)]">{p}</p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
