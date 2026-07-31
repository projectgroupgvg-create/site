import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildAlternates, buildOpenGraph } from '@/lib/metadata';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Link } from '@/i18n/navigation';

export function generateStaticParams() {
  return [{ locale: routing.defaultLocale }];
}
export const dynamicParams = false;

const PATH = '/research';
const TITLE = "Наукові публікації про віртуальні активи | В'ячеслав Ганган";
const DESCRIPTION =
  "Наукові публікації В'ячеслава Гангана у сфері правового регулювання віртуальних активів.";

type ResearchEntry = {
  title: string;
  year: string;
  type: string;
  venue: string;
  doi?: string;
  publisherUrl?: string;
  abstract: string;
  significance: string;
};

// Placeholder entries per the client's request — structure matches TZ 6.2
// (title, year, venue, DOI, publisher link, annotation, practical
// significance). Replace with real bibliographic data before launch.
const entries: ResearchEntry[] = [
  {
    title: '[Назва наукової роботи — заповнити]',
    year: '20__',
    type: 'Наукова стаття',
    venue: '[Видання або конференція — заповнити]',
    doi: undefined,
    publisherUrl: undefined,
    abstract: '[Коротка анотація роботи — 2-4 речення, заповнити]',
    significance: '[Практичне значення для клієнтів і практики — заповнити]',
  },
];

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

export default async function ResearchPage() {
  const locale = routing.defaultLocale;
  setRequestLocale(locale);

  return (
    <main>
      <JsonLd
        data={buildBreadcrumbSchema(locale, [
          { name: 'Gangan & Partners', path: '/' },
          { name: 'Наукова діяльність', path: PATH },
        ])}
      />
      <div className="border-b-hair bg-[var(--bg2)] px-6 py-12 sm:px-11" style={{ borderColor: 'var(--b)' }}>
        <Breadcrumbs items={[{ name: 'Головна', href: '/' }, { name: 'Наукова діяльність' }]} />
        <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.4em] text-[var(--s3)]">Аналітика</div>
        <h1 className="mb-5 font-serif text-[clamp(26px,3.2vw,44px)] font-light leading-[1.1] text-[var(--ink)]">
          Наукові публікації
        </h1>
        <div className="divider" />
        <p className="max-w-[560px] text-[14.5px] leading-[1.8] text-[var(--ink3)]">{DESCRIPTION}</p>
      </div>

      <div className="mx-auto max-w-[880px] px-6 py-16 sm:px-11">
        <div className="mb-10 rounded-lg border-hair p-6" style={{ borderColor: 'var(--b)', backgroundColor: 'var(--bgc)' }}>
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--s3)]">
            Дисертаційне дослідження
          </div>
          <p className="mb-1 text-[13.5px] leading-[1.7] text-[var(--ink2)]">
            [Тема дисертаційного дослідження — заповнити]
          </p>
          <p className="text-[12px] italic text-[var(--ink3)]">
            [Статус здобувача PhD — заповнити]
          </p>
        </div>

        <div className="space-y-6">
          {entries.map((e, i) => (
            <div key={i} className="rounded-lg border-hair p-6" style={{ borderColor: 'var(--b)' }}>
              <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[var(--s3)]">
                <span>{e.type}</span>
                <span className="text-[var(--ink3)]">·</span>
                <span>{e.year}</span>
              </div>
              <h2 className="mb-1.5 font-serif text-[18px] font-semibold leading-[1.3] text-[var(--ink)]">{e.title}</h2>
              <p className="mb-3 text-[12.5px] text-[var(--ink3)]">{e.venue}</p>
              <p className="mb-3 text-[13.5px] leading-[1.7] text-[var(--ink2)]">{e.abstract}</p>
              <div className="mb-3 rounded-sm border-hair p-3 text-[12.5px] leading-[1.6] text-[var(--ink2)]" style={{ borderColor: 'var(--b)' }}>
                <strong className="text-[var(--ink)]">Практичне значення: </strong>
                {e.significance}
              </div>
              <div className="flex flex-wrap gap-3 text-[11px] text-[var(--ink3)]">
                {e.doi && <span>DOI: {e.doi}</span>}
                {e.publisherUrl && (
                  <a href={e.publisherUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--ink2)] underline hover:text-[var(--ink)]">
                    Офіційне видання ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg border-hair p-6" style={{ borderColor: 'var(--b)', backgroundColor: 'var(--bgc)' }}>
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--s3)]">Профілі</div>
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
        </div>

        <div className="mt-10">
          <Link href="/team/viacheslav-gangan" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--ink)] hover:text-[var(--s3)]">
            ← Профіль автора
          </Link>
        </div>
      </div>
    </main>
  );
}
