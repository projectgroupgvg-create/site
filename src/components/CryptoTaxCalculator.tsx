'use client';

import { useMemo, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { TaxJurisdiction } from '@/data/taxJurisdictions';
import { calculateTax, pickText, type OperationType, type Locale } from '@/lib/taxCalc';

const OPERATIONS: OperationType[] = ['capitalGains', 'stakingMining', 'defi'];

function formatNumber(n: number, locale: string) {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(n);
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
  const [heldOver, setHeldOver] = useState(false);

  const jurisdiction = jurisdictions.find((j) => j.countryCode === countryCode) ?? jurisdictions[0];

  const result = useMemo(() => {
    if (!jurisdiction) return null;
    const amt = parseFloat(amount.replace(',', '.')) || 0;
    return calculateTax({ jurisdiction, operation, amount: amt, heldOverExemption: heldOver });
  }, [jurisdiction, operation, amount, heldOver]);

  if (!jurisdiction) return null;

  const currency =
    operation === 'capitalGains'
      ? jurisdiction.capitalGainsAllowanceCurrency ?? 'EUR'
      : jurisdiction.stakingMiningAllowanceCurrency ?? 'EUR';

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

  const showHeldOver =
    operation === 'capitalGains' && !!jurisdiction.capitalGainsHoldingExemptionMonths;

  return (
    <div>
      {/* Jurisdiction picker */}
      <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--s3)]">
        {t('jurisdictionLabel')}
      </div>
      <div className="mb-8 flex flex-wrap gap-2">
        {jurisdictions.map((j) => (
          <button
            key={j.countryCode}
            onClick={() => setCountryCode(j.countryCode)}
            className={`flex items-center gap-2 border-hair px-4 py-2.5 text-[12.5px] transition-colors ${
              j.countryCode === countryCode
                ? 'bg-[var(--ink)] text-[var(--wh)]'
                : 'bg-[var(--wh)] text-[var(--ink2)] hover:border-[color:var(--s3)]'
            }`}
            style={{ borderColor: j.countryCode === countryCode ? 'var(--ink)' : 'var(--b)' }}
          >
            <span className="text-[15px]">{j.flagEmoji}</span>
            {pickText(j.countryName, locale)}
          </button>
        ))}
      </div>

      {/* Status badge */}
      {jurisdiction.status !== 'stable' && (
        <div
          className="mb-8 border-hair bg-[var(--bgc)] px-5 py-4 text-[12px] leading-[1.7] text-[var(--ink2)]"
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
            className={`border-hair px-4 py-2.5 text-[12px] uppercase tracking-[0.06em] transition-colors ${
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
              {t('amountLabel')} ({currency})
            </div>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full border-hair bg-[var(--wh)] px-4 py-3 text-[15px] text-[var(--ink)] outline-none"
              style={{ borderColor: 'var(--b)' }}
            />
          </div>
          {showHeldOver && (
            <div className="flex items-end">
              <label className="flex cursor-pointer items-center gap-2.5 text-[12.5px] text-[var(--ink2)]">
                <input
                  type="checkbox"
                  checked={heldOver}
                  onChange={(e) => setHeldOver(e.target.checked)}
                  className="h-4 w-4 accent-[var(--ink)]"
                />
                {t('heldOverLabel', { months: jurisdiction.capitalGainsHoldingExemptionMonths ?? 12 })}
              </label>
            </div>
          )}
        </div>
      )}

      {/* Result */}
      <div className="border-hair bg-[var(--bgc)] p-7" style={{ borderColor: 'var(--b)' }}>
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

      {/* Source + last reviewed */}
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

      {/* Disclaimer */}
      <div
        className="mt-8 border-hair bg-[var(--bg2)] p-6 text-[12px] leading-[1.75] text-[var(--ink3)]"
        style={{ borderColor: 'var(--b)' }}
      >
        <p className="mb-4">{t('disclaimer')}</p>
        <Link
          href="/#ai"
          className="inline-block bg-[var(--ink)] px-7 py-3 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[var(--wh)] transition-colors hover:bg-[#333]"
        >
          {t('ctaConsult')}
        </Link>
      </div>
    </div>
  );
}
