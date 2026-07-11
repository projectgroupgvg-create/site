'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { screenWallet, type WalletScreenResult } from '@/lib/walletScreen';
import { SANCTIONED_LAST_UPDATED } from '@/data/sanctionedAddresses';

export default function WalletScreener() {
  const t = useTranslations('WalletScreen');
  const [address, setAddress] = useState('');
  const [result, setResult] = useState<WalletScreenResult | null>(null);

  function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    if (!address.trim()) return;
    setResult(screenWallet(address));
  }

  return (
    <div>
      <form onSubmit={handleCheck} className="mb-8">
        <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--s3)]">
          {t('inputLabel')}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={t('placeholder')}
            spellCheck={false}
            className="flex-1 rounded-sm border-hair bg-[var(--wh)] px-4 py-3.5 text-[14px] text-[var(--ink)] outline-none"
            style={{ borderColor: 'var(--b)' }}
          />
          <button
            type="submit"
            className="rounded-sm bg-[var(--ink)] px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--wh)] transition-colors hover:bg-[var(--ink-hover)]"
          >
            {t('checkBtn')}
          </button>
        </div>
      </form>

      {result && (
        <div
          className="rounded-lg border-hair p-7"
          style={{
            borderColor: result.kind === 'flagged' ? 'var(--bs)' : 'var(--b)',
            background: result.kind === 'flagged' ? 'var(--bgc)' : 'var(--bg2)',
          }}
        >
          {result.kind === 'invalid' ? (
            <p className="text-[13px] leading-[1.75] text-[var(--ink2)]">{t('resultInvalid')}</p>
          ) : result.kind === 'flagged' ? (
            <>
              <div className="mb-2 flex items-center gap-2.5">
                <span className="text-[18px] text-[var(--s3)]">⚠</span>
                <div className="font-serif text-[19px] font-bold text-[var(--ink)]">
                  {t('resultFlaggedTitle')}
                </div>
              </div>
              <p className="text-[13px] leading-[1.75] text-[var(--ink2)]">
                {t('resultFlaggedNote', { date: SANCTIONED_LAST_UPDATED })}
              </p>
            </>
          ) : (
            <>
              <div className="mb-2 font-serif text-[19px] font-bold text-[var(--ink)]">
                {t('resultClearTitle')}
              </div>
              <p className="text-[13px] leading-[1.75] text-[var(--ink2)]">
                {t('resultClearNote', { date: SANCTIONED_LAST_UPDATED })}
              </p>
            </>
          )}
        </div>
      )}

      <p className="mt-5 text-[11px] text-[var(--ink3)]">
        {t('lastUpdatedLabel')}: {SANCTIONED_LAST_UPDATED}
      </p>

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
