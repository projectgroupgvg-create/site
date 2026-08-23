import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { siteUrl } from '@/lib/site';
import { buildAlternates, buildOpenGraph, localizedUrl } from '@/lib/metadata';
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/jsonld';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import {
  reportMeta,
  executiveBrief,
  keyFindings,
  sections,
  boardChecklist,
  ninetyDayProgramme,
  outlook2027,
  sourceRegister,
  methodology,
} from '@/data/reportDigitalAssets2026';

// This report page is intentionally Ukrainian-only for now (see the SEO
// brief's own "stage 2" note on English) — only pre-render for the default
// locale and let other locales 404 rather than show a broken/empty page.
export function generateStaticParams() {
  return [{ locale: routing.defaultLocale }];
}
export const dynamicParams = false;

const PATH = '/reports/digital-assets-cross-border-2026';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: reportMeta.title,
    description: reportMeta.subtitle,
    alternates: buildAlternates(routing.defaultLocale, PATH),
    openGraph: buildOpenGraph({
      locale: routing.defaultLocale,
      path: PATH,
      title: reportMeta.title,
      description: reportMeta.subtitle,
      type: 'article',
      image: '/report-og-digital-assets-2026.jpg',
    }),
  };
}

function DataTable({ headers, rows }: { headers: string[]; rows: Record<string, string>[] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border-hair" style={{ borderColor: 'var(--b)' }}>
      <table className="w-full min-w-[560px] border-collapse text-left text-[13px]">
        <thead>
          <tr style={{ backgroundColor: 'var(--bgc)' }}>
            {headers.map((h) => (
              <th key={h} className="border-b-hair px-4 py-3 font-semibold text-[var(--ink)]" style={{ borderColor: 'var(--b)' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b-hair last:border-b-0" style={{ borderColor: 'var(--b)' }}>
              {headers.map((h) => (
                <td key={h} className="px-4 py-3 align-top leading-[1.6] text-[var(--ink2)]">
                  {row[h]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function ReportPage() {
  const locale = routing.defaultLocale;
  setRequestLocale(locale);

  const toc = [
    { id: 'executive-brief', label: 'Executive Brief' },
    { id: 'key-findings', label: 'Ключові висновки' },
    ...sections.map((s) => ({ id: s.id, label: s.title })),
    { id: 'checklist', label: boardChecklist.title },
    { id: 'programme', label: ninetyDayProgramme.title },
    { id: 'outlook', label: outlook2027.title },
    { id: 'sources', label: 'Джерела' },
    { id: 'methodology', label: 'Методологія та застереження' },
  ];

  return (
    <main className="bg-white">
      <JsonLd
        data={buildArticleSchema({
          locale,
          path: PATH,
          title: reportMeta.title,
          description: reportMeta.subtitle,
          datePublished: reportMeta.dateIso,
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema(locale, [
          { name: 'Gangan & Partners', path: '/' },
          { name: 'Звіти', path: '/reports' },
          { name: reportMeta.title, path: PATH },
        ])}
      />

      <div
        className="relative overflow-hidden border-b-hair px-6 py-16 sm:px-11"
        style={{ borderColor: 'var(--b)', backgroundColor: 'var(--bgc)' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/report-digital-assets-bg.jpg')" }}
        />
        {/* light isometric glass-panel render — a soft light scrim keeps the
            dark ink text readable while the texture still shows through,
            same treatment as the Practices grid marble background. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(250,247,242,0.92)] via-[rgba(250,247,242,0.8)] to-[rgba(250,247,242,0.55)]" />
        <div className="relative z-10 mx-auto max-w-[860px]">
          <Breadcrumbs
            items={[
              { name: 'Головна', href: '/' },
              { name: 'Звіти', href: '/reports' },
              { name: reportMeta.title },
            ]}
          />
          <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.4em] text-[var(--s3)]">
            {reportMeta.org} · Legal Outlook 2026
          </div>
          <h1 className="mb-3 font-serif text-[clamp(28px,3.6vw,48px)] font-light leading-[1.15] text-[var(--ink)]">
            {reportMeta.title}
          </h1>
          <p className="mb-6 max-w-[640px] text-[15px] leading-[1.7] text-[var(--ink3)]">{reportMeta.subtitle}</p>
          <div className="mb-6 flex flex-wrap gap-2">
            {reportMeta.focusTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border-hair px-3 py-1 text-[11px] text-[var(--ink2)]"
                style={{ borderColor: 'var(--b)' }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="text-[12px] text-[var(--ink3)]">
            {reportMeta.author}, {reportMeta.org} · {reportMeta.location} · {reportMeta.date}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={reportMeta.pdfUrl}
              download
              className="rounded-sm bg-[var(--ink)] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--wh)] transition-colors hover:bg-[var(--ink-hover)]"
            >
              Завантажити PDF
            </a>
            <a
              href="#contact-cta"
              className="rounded-sm border-hair px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ink)] transition-colors hover:bg-white"
              style={{ borderColor: 'var(--b)' }}
            >
              Обговорити свій кейс
            </a>
          </div>
          <div className="mt-6">
            <ShareButtons url={localizedUrl(locale, PATH)} title={reportMeta.title} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[860px] px-6 py-14 sm:px-11">
        {/* TOC */}
        <div className="mb-14 rounded-lg border-hair p-6" style={{ borderColor: 'var(--b)', backgroundColor: 'var(--bgc)' }}>
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--s3)]">Зміст</div>
          <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-[13px] text-[var(--ink2)] transition-colors hover:text-[var(--ink)]">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Executive brief */}
        <section id="executive-brief" className="mb-14 scroll-mt-20">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--s3)]">Executive Brief</div>
          <h2 className="mb-4 font-serif text-[26px] font-light text-[var(--ink)]">Головне у 2026 році</h2>
          <div className="mb-5 rounded-lg border-hair p-5" style={{ borderColor: 'var(--b)' }}>
            <div className="mb-1.5 text-[12px] font-semibold text-[var(--ink)]">Одна теза</div>
            <p className="text-[14px] leading-[1.8] text-[var(--ink2)]">{executiveBrief.thesis}</p>
          </div>
          <DataTable headers={executiveBrief.table.headers} rows={executiveBrief.table.rows} />
          <h3 className="mb-2 mt-6 font-serif text-[16px] font-semibold text-[var(--ink)]">Кому адресовано</h3>
          <p className="text-[14px] leading-[1.8] text-[var(--ink2)]">{executiveBrief.audience}</p>
        </section>

        {/* Key findings */}
        <section id="key-findings" className="mb-14 scroll-mt-20">
          <h2 className="mb-5 font-serif text-[26px] font-light text-[var(--ink)]">Ключові висновки</h2>
          <ol className="space-y-3">
            {keyFindings.map((f, i) => (
              <li key={i} className="flex gap-3 text-[14px] leading-[1.7] text-[var(--ink2)]">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-[var(--wh)]" style={{ backgroundColor: 'var(--ink)' }}>
                  {i + 1}
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Main sections */}
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="mb-14 scroll-mt-20 border-t-hair pt-10" style={{ borderColor: 'var(--b)' }}>
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--s3)]">{s.tag}</div>
            <h2 className="mb-4 font-serif text-[24px] font-light leading-[1.25] text-[var(--ink)]">{s.title}</h2>
            {s.intro && <p className="mb-4 text-[14px] leading-[1.8] text-[var(--ink2)]">{s.intro}</p>}
            {s.callout && (
              <div className="my-5 rounded-lg border-hair p-5" style={{ borderColor: 'var(--b)', backgroundColor: 'var(--bgc)' }}>
                <div className="mb-1.5 text-[12px] font-semibold text-[var(--ink)]">{s.callout.title}</div>
                <p className="text-[13.5px] leading-[1.75] text-[var(--ink2)]">{s.callout.text}</p>
              </div>
            )}
            {s.table && <DataTable headers={s.table.headers} rows={s.table.rows} />}
            {s.bullets && (
              <>
                {s.bulletsTitle && <h3 className="mb-2 mt-6 font-serif text-[15px] font-semibold text-[var(--ink)]">{s.bulletsTitle}</h3>}
                <ul className="space-y-2">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="relative pl-5 text-[13.5px] leading-[1.75] text-[var(--ink2)]">
                      <span className="absolute left-0 text-[var(--s3)]">—</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {s.conclusion && (
              <div className="my-5 rounded-lg border-hair p-5" style={{ borderColor: 'var(--b)' }}>
                <div className="mb-1.5 text-[12px] font-semibold text-[var(--ink)]">{s.conclusion.title}</div>
                <p className="text-[13.5px] leading-[1.75] text-[var(--ink2)]">{s.conclusion.text}</p>
              </div>
            )}
            {s.sources && (
              <p className="mt-4 text-[11px] leading-[1.6] text-[var(--ink3)]">
                <strong className="text-[var(--ink2)]">Офіційні джерела: </strong>
                {s.sources}
              </p>
            )}
          </section>
        ))}

        {/* Checklist */}
        <section id="checklist" className="mb-14 scroll-mt-20 border-t-hair pt-10" style={{ borderColor: 'var(--b)' }}>
          <h2 className="mb-4 font-serif text-[24px] font-light text-[var(--ink)]">{boardChecklist.title}</h2>
          <DataTable headers={boardChecklist.headers} rows={boardChecklist.rows} />
        </section>

        {/* 90-day programme */}
        <section id="programme" className="mb-14 scroll-mt-20 border-t-hair pt-10" style={{ borderColor: 'var(--b)' }}>
          <h2 className="mb-4 font-serif text-[24px] font-light text-[var(--ink)]">{ninetyDayProgramme.title}</h2>
          <DataTable headers={ninetyDayProgramme.headers} rows={ninetyDayProgramme.rows} />
        </section>

        {/* Outlook 2027 */}
        <section id="outlook" className="mb-14 scroll-mt-20 border-t-hair pt-10" style={{ borderColor: 'var(--b)' }}>
          <h2 className="mb-4 font-serif text-[24px] font-light text-[var(--ink)]">{outlook2027.title}</h2>
          <DataTable headers={outlook2027.headers} rows={outlook2027.rows} />
          <div className="my-5 rounded-lg border-hair p-5" style={{ borderColor: 'var(--b)', backgroundColor: 'var(--bgc)' }}>
            <div className="mb-1.5 text-[12px] font-semibold text-[var(--ink)]">Фінальний висновок</div>
            <p className="text-[13.5px] leading-[1.75] text-[var(--ink2)]">{outlook2027.conclusion}</p>
          </div>
        </section>

        {/* Sources */}
        <section id="sources" className="mb-14 scroll-mt-20 border-t-hair pt-10" style={{ borderColor: 'var(--b)' }}>
          <h2 className="mb-2 font-serif text-[24px] font-light text-[var(--ink)]">Офіційні джерела</h2>
          <p className="mb-5 text-[13px] leading-[1.7] text-[var(--ink3)]">
            У звіті використані лише офіційні нормативні акти, реєстри, роз&apos;яснення та аналітичні матеріали державних органів і міжнародних організацій. Стан джерел перевірено станом на 30 липня 2026 року.
          </p>
          <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {sourceRegister.map((src) => (
              <li key={src.n} className="text-[12px] leading-[1.6] text-[var(--ink3)]">
                {src.n}.{' '}
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-[var(--ink2)] underline decoration-[var(--b)] underline-offset-2 hover:text-[var(--ink)]">
                  {src.name}
                </a>
              </li>
            ))}
          </ol>
        </section>

        {/* Methodology */}
        <section id="methodology" className="mb-14 scroll-mt-20 border-t-hair pt-10" style={{ borderColor: 'var(--b)' }}>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--s3)]">About this report</div>
          <h2 className="mb-4 font-serif text-[24px] font-light text-[var(--ink)]">Методологія та застереження</h2>
          <h3 className="mb-2 font-serif text-[15px] font-semibold text-[var(--ink)]">Метод</h3>
          <p className="mb-4 text-[13.5px] leading-[1.75] text-[var(--ink2)]">{methodology.method}</p>
          <h3 className="mb-2 font-serif text-[15px] font-semibold text-[var(--ink)]">Межі</h3>
          <p className="mb-4 text-[13.5px] leading-[1.75] text-[var(--ink2)]">{methodology.limits}</p>
          <h3 className="mb-2 font-serif text-[15px] font-semibold text-[var(--ink)]">Про адвокатське об&apos;єднання</h3>
          <p className="mb-3 text-[13.5px] leading-[1.75] text-[var(--ink2)]">{methodology.about}</p>
          <div className="rounded-lg border-hair p-4 text-[12.5px] text-[var(--ink3)]" style={{ borderColor: 'var(--b)' }}>
            <strong className="text-[var(--ink2)]">Можливі формати роботи: </strong>
            {methodology.formats.join(' • ')}
          </div>
        </section>

        {/* CTA */}
        <section id="contact-cta" className="scroll-mt-20 rounded-lg border-hair p-8 text-center" style={{ borderColor: 'var(--b)', backgroundColor: 'var(--bgc)' }}>
          <h2 className="mb-3 font-serif text-[22px] font-light text-[var(--ink)]">Потрібна оцінка вашого кейсу?</h2>
          <p className="mx-auto mb-6 max-w-[480px] text-[13.5px] leading-[1.7] text-[var(--ink2)]">
            Класифікація продукту, аналіз ризиків виходу на ринок ЄС, AML/Travel Rule gap assessment або реагування на криптоінцидент протягом перших 48 годин.
          </p>
          <a
            href="/#ai"
            className="inline-block rounded-sm bg-[var(--ink)] px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--wh)] transition-colors hover:bg-[var(--ink-hover)]"
          >
            Отримати консультацію
          </a>
        </section>
      </div>
    </main>
  );
}
