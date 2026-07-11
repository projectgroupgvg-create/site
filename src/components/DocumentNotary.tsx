'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

type Status = 'idle' | 'hashing' | 'submitting' | 'done' | 'error';

async function sha256Hex(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const digest = await crypto.subtle.digest('SHA-256', buffer);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export default function DocumentNotary() {
  const t = useTranslations('Notary');
  const [status, setStatus] = useState<Status>('idle');
  const [fileName, setFileName] = useState('');
  const [hash, setHash] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setStatus('hashing');
    setFileName(file.name);
    try {
      const hex = await sha256Hex(file);
      setHash(hex);
      setStatus('submitting');

      const res = await fetch('/api/notarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hashHex: hex }),
      });
      const data = await res.json();
      if (!res.ok || !data.ots) throw new Error('failed');

      const bytes = Uint8Array.from(atob(data.ots), (c) => c.charCodeAt(0));
      const blob = new Blob([bytes], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name}.ots`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div>
      <div
        className="mb-8 flex flex-col items-center gap-4 rounded-lg border-hair border-dashed p-10 text-center"
        style={{ borderColor: 'var(--bs)' }}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        <p className="text-[13px] leading-[1.7] text-[var(--ink2)]">{t('dropHint')}</p>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={status === 'hashing' || status === 'submitting'}
          className="rounded-sm bg-[var(--ink)] px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--wh)] transition-colors hover:bg-[var(--ink-hover)] disabled:cursor-wait disabled:opacity-60"
        >
          {status === 'hashing'
            ? t('statusHashing')
            : status === 'submitting'
              ? t('statusSubmitting')
              : t('chooseFile')}
        </button>
      </div>

      {hash && (
        <div className="mb-8 rounded-lg border-hair bg-[var(--bgc)] p-6" style={{ borderColor: 'var(--b)' }}>
          <div className="mb-2 text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--s3)]">
            {fileName}
          </div>
          <div className="break-all font-mono text-[12px] leading-[1.7] text-[var(--ink2)]">{hash}</div>

          {status === 'done' && (
            <p className="mt-4 border-t-hair pt-4 text-[13px] leading-[1.75] text-[var(--ink2)]" style={{ borderColor: 'var(--b)' }}>
              ✓ {t('resultDone')}
            </p>
          )}
          {status === 'error' && (
            <p className="mt-4 border-t-hair pt-4 text-[13px] leading-[1.75] text-[var(--ink2)]" style={{ borderColor: 'var(--b)' }}>
              {t('resultError')}
            </p>
          )}
        </div>
      )}

      <div
        className="mt-8 rounded-lg border-hair bg-[var(--bg2)] p-6 text-[12px] leading-[1.75] text-[var(--ink3)]"
        style={{ borderColor: 'var(--b)' }}
      >
        <p className="mb-3">{t('howItWorks')}</p>
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
