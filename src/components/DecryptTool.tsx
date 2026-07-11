'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { decryptMessage } from '@/lib/confidentialCrypto';

export default function DecryptTool() {
  const t = useTranslations('Decrypt');
  const [privateKey, setPrivateKey] = useState('');
  const [payload, setPayload] = useState('');
  const [result, setResult] = useState<{ contact?: string; message: string } | null>(null);
  const [error, setError] = useState('');

  async function handleDecrypt(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setResult(null);
    try {
      const plaintext = await decryptMessage(privateKey.trim(), payload.trim());
      try {
        const parsed = JSON.parse(plaintext);
        setResult({ contact: parsed.contact, message: parsed.message });
      } catch {
        setResult({ message: plaintext });
      }
    } catch {
      setError(t('decryptError'));
    }
  }

  return (
    <form onSubmit={handleDecrypt} className="flex flex-col gap-4">
      <div>
        <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--s3)]">
          {t('privateKeyLabel')}
        </label>
        <textarea
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          placeholder="-----BEGIN PRIVATE KEY-----..."
          rows={6}
          className="w-full resize-y rounded-sm border-hair bg-[var(--wh)] px-3.5 py-3 font-mono text-[11px] text-[var(--ink)] outline-none placeholder:text-[var(--ink3)]"
          style={{ borderColor: 'var(--b)' }}
        />
      </div>

      <div>
        <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--s3)]">
          {t('payloadLabel')}
        </label>
        <textarea
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          placeholder="GPENC1...."
          rows={6}
          className="w-full resize-y rounded-sm border-hair bg-[var(--wh)] px-3.5 py-3 font-mono text-[11px] text-[var(--ink)] outline-none placeholder:text-[var(--ink3)]"
          style={{ borderColor: 'var(--b)' }}
        />
      </div>

      <button
        type="submit"
        className="mt-1 rounded-sm bg-[var(--ink)] px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--wh)] transition-colors hover:bg-[var(--ink-hover)]"
      >
        {t('decryptBtn')}
      </button>

      {error && <p className="text-[12px] text-[var(--ink3)]">{error}</p>}

      {result && (
        <div className="mt-2 rounded-lg border-hair bg-[var(--bgc)] p-6" style={{ borderColor: 'var(--b)' }}>
          {result.contact && (
            <div className="mb-3 border-b-hair pb-3" style={{ borderColor: 'var(--b)' }}>
              <div className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--s3)]">
                {t('contactLabel')}
              </div>
              <div className="text-[13px] text-[var(--ink)]">{result.contact}</div>
            </div>
          )}
          <div className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--s3)]">
            {t('messageLabel')}
          </div>
          <div className="whitespace-pre-wrap text-[13.5px] leading-[1.75] text-[var(--ink)]">{result.message}</div>
        </div>
      )}

      <p className="mt-2 text-[11.5px] leading-[1.7] text-[var(--ink3)]">{t('note')}</p>
    </form>
  );
}
