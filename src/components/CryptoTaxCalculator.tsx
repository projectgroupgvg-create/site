'use client';

import { useMemo, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { TaxJurisdiction } from '@/data/taxJurisdictions';
import { calculateTax, pickText, type OperationType, type Locale, type CalcResult } from '@/lib/taxCalc';

const OPERATIONS: OperationType[] = ['capitalGains', 'stakingMining', 'defi'];

function formatNumber(n: number, locale: string) {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(n);
}

// Whole calendar months between two ISO date strings, floored (e.g. 11
// months + 20 days counts as 11, not 12) — matches how "held over N months"
// exemptions are usually applied.
function monthsBetween(from: string, to: string): number | null {
  if (!from || !to) return null;
  const a = new Date(from);
  const b = new Date(to);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null;
  let months = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
  if (b.getDate() < a.getDate()) months -= 1;
  return Math.max(0, months);
}

export default function CryptoTaxCalculator({
  jurisdictions,
}: {
  jurisdictions: TaxJurisdiction[];
}) {
  const t = useTranslations('Calculator');
  const locale = useLocale() as Locale;
  const intlLocale = useLocale();

  const [countryCode, setCountryCode] = useState(jurisdictions[0]?.countryCode ?? '');
  const [operation, setOperation] = useState<OperationType>('capitalGains');
  const [amount, setAmount] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [saleDate, setSaleDate] = useState('');

  const [compareMode, setCompareMode] = useState(false);
  const [compareSelection, setCompareSelection] = useState<string[]>(
    jurisdictions.slice(0, 3).map((j) => j.countryCode),
  );

  const jurisdiction = jurisdictions.find((j) => j.countryCode === countryCode) ?? jurisdictions[0];

  const heldMonths = useMemo(() => monthsBetween(purchaseDate, saleDate), [purchaseDate, saleDate]);

  function isHeldOverExemption(j: TaxJurisdiction): boolean {
    if (!j.capitalGainsHoldingExemptionMonths || heldMonths == null) return false;
    return heldMonths >= j.capitalGainsHoldingExemptionMonths;
  }

  const amt = parseFloat(amount.replace(',', '.')) || 0;

  const result = useMemo(() => {
    if (!jurisdiction) return null;
    return calculateTax({
      jurisdiction,
      operation,
      amount: amt,
      heldOverExemption: isHeldOverExemption(jurisdiction),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jurisdiction, operation, amt, heldMonths]);

  if (!jurisdiction) return null;

  const currency = jurisdiction.primaryCurrency;

  const rateNote =
    operation === 'capitalGains'
      ? jurisdiction.capitalGainsRateNote
      : operation === 'stakingMining'
        ? jurisdiction.stakingMiningRateNote
        : undefined;

  const detailNotes =
    operation === 'capitalGains'
      ? jurisdiction.capitalGainsNotes
      : operation === 'stakingMining'
        ? jurisdiction.stakingMiningNotes
        : jurisdiction.defiNotes;

  const showHoldingDates =
    operation === 'capitalGains' && !!jurisdiction.capitalGainsHoldingExemptionMonths;

  function toggleCompareCountry(code: string) {
    setCompareSelection((prev) =>
      prev.includes(code)
        ? prev.length > 1
          ? prev.filter((c) => c !== code)
          : prev
        : [...prev, code],
    );
  }

  function compareCellLabel(j: TaxJurisdiction): { text: string; note?: string } {
    const r: CalcResult = calculateTax({
      jurisdiction: j,
      operation,
      amount: amt,
      heldOverExemption: isHeldOverExemption(j),
    });
    if (r.kind === 'exempt-holding' || r.kind === 'exempt-allowance') {
      return { text: `0 ${j.primaryCurrency}`, note: t('compareExempt') };
    }
    if (r.kind === 'taxable-exact') {
      return { text: `≈ ${formatNumber(r.taxAmount, intlLocale)} ${j.primaryCurrency}`, note: `${r.rate}%` };
    }
    if (r.kind === 'descriptive') {
      return { text: t('compareDescriptive') };
    }
    return { text: t('compareNotApplicable') };
  }

  return (
    <div>
      {/* Mode toggle */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setCompareMode((v) => !v)}
          className="rounded-sm border-hair px-4 py-2 text-[11px] uppercase tracking-[0.08em] text-[var(--ink2)] transition-colors hover:border-[color:var(--s3)] hover:text-[var(--ink)]"
          style={{ borderColor: 'var(--bs)' }}
        >
          {compareMode ? t('compareToggleOff') : t('compareToggleOn')}
        </button>
      </div>

      {/* Jurisdiction picker */}
      <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--s3)]">
        {t('jurisdictionLabel')}
      </div>
      {compareMode && (
        <p className="mb-3 text-[11.5px] text-[var(--ink3)]">{t('compareHint')}</p>
      )}
      <div className="mb-8 flex flex-wrap gap-2">
        {jurisdictions.map((j) => {
          const selected = compareMode
            ? compareSelection.includes(j.countryCode)
            : j.countryCode === countryCode;
          return (
            <button
              key={j.countryCode}
              onClick={() =>
                compareMode ? toggleCompareCountry(j.countryCode) : setCountryCode(j.countryCode)
              }
              className={`flex items-center gap-2 rounded-sm border-hair px-4 py-2.5 text-[12.5px] transition-colors ${
                selected
                  ? 'bg-[var(--ink)] text-[var(--wh)]'
                  : 'bg-[var(--wh)] text-[var(--ink2)] hover:border-[color:var(--s3)]'
              }`}
              style={{ borderColor: selected ? 'var(--ink)' : 'var(--b)' }}
            >
              <span className="text-[15px]">{j.flagEmoji}</span>
              {pickText(j.countryName, locale)}
            </button>
          );
        })}
      </div>

      {/* Status badge (single-jurisdiction mode only) */}
      {!compareMode && jurisdiction.status !== 'stable' && (
        <div
          className="mb-8 rounded-sm border-hair bg-[var(--bgc)] px-5 py-4 text-[12px] leading-[1.7] text-[var(--ink2)]"
          style={{ borderColor: 'var(--bs)' }}
        >
          <span className="mr-2 font-semibold uppercase tracking-[0.08em] text-[var(--s3)]">
            {jurisdiction.status === 'draft' ? t('statusDraft') : t('statusPending')}
          </span>
          {pickText(jurisdiction.statusNote, locale)}
        </div>
      )}

      {/* Operation type */}
      <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--s3)]">
        {t('operationLabel')}
      </div>
      <div className="mb-8 flex flex-wrap gap-2">
        {OPERATIONS.map((op) => (
          <button
            key={op}
            onClick={() => setOperation(op)}
            className={`rounded-sm border-hair px-4 py-2.5 text-[12px] uppercase tracking-[0.06em] transition-colors ${
              op === operation
                ? 'bg-[var(--ink)] text-[var(--wh)]'
                : 'bg-[var(--wh)] text-[var(--ink2)] hover:border-[color:var(--s3)]'
            }`}
            style={{ borderColor: op === operation ? 'var(--ink)' : 'var(--b)' }}
          >
            {t(`op_${op}`)}
          </button>
        ))}
      </div>

      {operation !== 'defi' && (
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--s3)]">
              {t('amountLabel')} {!compareMode && `(${currency})`}
            </div>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full rounded-sm border-hair bg-[var(--wh)] px-4 py-3 text-[15px] text-[var(--ink)] outline-none"
              style={{ borderColor: 'var(--b)' }}
            />
          </div>
          {showHoldingDates && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--s3)]">
                  {t('purchaseDateLabel')}
                </div>
                <input
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  className="w-full rounded-sm border-hair bg-[var(--wh)] px-3 py-3 text-[13px] text-[var(--ink)] outline-none"
                  style={{ borderColor: 'var(--b)' }}
                />
              </div>
              <div>
                <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--s3)]">
                  {t('saleDateLabel')}
                </div>
                <input
                  type="date"
                  value={saleDate}
                  onChange={(e) => setSaleDate(e.target.value)}
                  className="w-full rounded-sm border-hair bg-[var(--wh)] px-3 py-3 text-[13px] text-[var(--ink)] outline-none"
                  style={{ borderColor: 'var(--b)' }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {showHoldingDates && heldMonths != null && (
        <p className="mb-8 -mt-4 text-[12px] text-[var(--ink3)]">
          {t('heldMonthsResult', { months: heldMonths })} —{' '}
          {isHeldOverExemption(jurisdiction) ? t('heldExemptNote') : t('heldNotExemptNote')}
        </p>
      )}

      {compareMode ? (
        /* Comparison table */
        <div className="overflow-hidden rounded-lg border-hair" style={{ borderColor: 'var(--b)' }}>
          <table className="w-full border-collapse text-left text-[12.5px]">
            <thead>
              <tr className="bg-[var(--bg2)]">
                <th className="border-b-hair px-5 py-3 font-semibold uppercase tracking-[0.06em] text-[var(--s3)]" style={{ borderColor: 'var(--b)', fontSize: '10px' }}>
                  {t('compareCountryCol')}
                </th>
                <th className="border-b-hair px-5 py-3 font-semibold uppercase tracking-[0.06em] text-[var(--s3)]" style={{ borderColor: 'var(--b)', fontSize: '10px' }}>
                  {t('compareResultCol')}
                </th>
              </tr>
            </thead>
            <tbody>
              {jurisdictions
                .filter((j) => compareSelection.includes(j.countryCode))
                .map((j) => {
                  const cell = compareCellLabel(j);
                  return (
                    <tr key={j.countryCode} className="bg-[var(--bgc)]">
                      <td className="border-b-hair px-5 py-4 text-[var(--ink)] last:border-b-0" style={{ borderColor: 'var(--b)' }}>
                        <span className="mr-2">{j.flagEmoji}</span>
                        {pickText(j.countryName, locale)}
                      </td>
                      <td className="border-b-hair px-5 py-4 last:border-b-0" style={{ borderColor: 'var(--b)' }}>
                        <span className="font-serif font-semibold text-[var(--ink)]">{cell.text}</span>
                        {cell.note && <span className="ml-2 text-[11px] text-[var(--ink3)]">{cell.note}</span>}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Single-jurisdiction result */
        <div className="rounded-lg border-hair bg-[var(--bgc)] p-7" style={{ borderColor: 'var(--b)' }}>
          {result?.kind === 'exempt-holding' || result?.kind === 'exempt-allowance' ? (
            <>
              <div className="mb-2 font-serif text-[32px] font-bold text-[var(--ink)]">0 {currency}</div>
              <p className="text-[12.5px] leading-[1.7] text-[var(--ink3)]">
                {result.kind === 'exempt-holding' ? t('resultExemptHolding') : t('resultExemptAllowance')}
              </p>
            </>
          ) : result?.kind === 'taxable-exact' ? (
            <>
              <div className="mb-2 font-serif text-[32px] font-bold text-[var(--ink)]">
                ≈ {formatNumber(result.taxAmount, intlLocale)} {currency}
              </div>
              <p className="text-[12.5px] leading-[1.7] text-[var(--ink3)]">
                {t('resultTaxable', { rate: result.rate })}
              </p>
            </>
          ) : (
            <>
              <div className="mb-3 font-serif text-[18px] font-semibold text-[var(--ink)]">
                {t('resultDescriptiveTitle')}
              </div>
              {rateNote && (
                <p className="mb-3 text-[13px] leading-[1.75] text-[var(--ink2)]">
                  {pickText(rateNote, locale)}
                </p>
              )}
            </>
          )}

          {detailNotes && (
            <p className="mt-4 border-t-hair pt-4 text-[12px] leading-[1.7] text-[var(--ink3)]" style={{ borderColor: 'var(--b)' }}>
              {pickText(detailNotes, locale)}
            </p>
          )}
        </div>
      )}

      {/* Source + last reviewed */}
      {!compareMode && (
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-[var(--ink3)]">
          <span>
            {t('lastReviewedLabel')}: {jurisdiction.lastReviewed}
          </span>
          {jurisdiction.sourceUrl && (
            <a
              href={jurisdiction.sourceUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="underline decoration-[color:var(--b)] underline-offset-2 transition-colors hover:text-[var(--ink)]"
            >
              {t('sourceLabel')}: {jurisdiction.sourceLabel}
            </a>
          )}
        </div>
      )}

      {/* Disclaimer */}
      <div
        className="mt-8 rounded-lg border-hair bg-[var(--bg2)] p-6 text-[12px] leading-[1.75] text-[var(--ink3)]"
        style={{ borderColor: 'var(--b)' }}
      >
        <p className="mb-4">{t('disclaimer')}</p>
        <Link
          href="/#ai"
          className="inline-block rounded-sm bg-[var(--ink)] px-7 py-3 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[var(--wh)] transition-colors hover:bg-[var(--ink-hover)]"
        >
          {t('ctaConsult')}
        </Link>
      </div>
    </div>
  );
}
