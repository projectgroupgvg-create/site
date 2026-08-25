'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { encryptMessage } from '@/lib/confidentialCrypto';
import { CONFIDENTIAL_PUBLIC_KEY_PEM } from '@/lib/confidentialPublicKey';
import { formEndpoint as endpoint } from '@/lib/site';

export default function ConfidentialForm() {
  const t = useTranslations('Confidential');
  const tc = useTranslations('Consent');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!endpoint || !message.trim() || !consent || status === 'sending') return;
    setStatus('sending');

    try {
      const payload = JSON.stringify({ contact, message });
      const encrypted = await encryptMessage(CONFIDENTIAL_PUBLIC_KEY_PEM, payload);

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'confidential-message',
          note: 'This submission is end-to-end encrypted. Decrypt at /confidential/decrypt with the private key.',
          encrypted,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setContact('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border-hair bg-[var(--bgc)] p-8 text-center" style={{ borderColor: 'var(--b)' }}>
        <div className="mb-2 font-serif text-[20px] font-semibold text-[var(--ink)]">{t('successTitle')}</div>
        <p className="text-[13px] text-[var(--ink3)]">{t('successBody')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div
        className="mb-2 flex items-center gap-2.5 rounded-sm border-hair bg-[var(--bgc)] px-4 py-3 text-[12px] text-[var(--ink2)]"
        style={{ borderColor: 'var(--b)' }}
      >
        <span className="text-[var(--s3)]">🔒</span>
        {t('encryptedBadge')}
      </div>

      <div>
        <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--s3)]">
          {t('contactLabel')}
        </label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder={t('contactPlaceholder')}
          className="w-full rounded-sm border-hair bg-[var(--wh)] px-3.5 py-3 text-[13px] text-[var(--ink)] outline-none placeholder:text-[var(--ink3)]"
          style={{ borderColor: 'var(--b)' }}
        />
      </div>

      <div>
        <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--s3)]">
          {t('messageLabel')}
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('messagePlaceholder')}
          rows={7}
          required
          className="w-full resize-y rounded-sm border-hair bg-[var(--wh)] px-3.5 py-3 text-[13px] text-[var(--ink)] outline-none placeholder:text-[var(--ink3)]"
          style={{ borderColor: 'var(--b)' }}
        />
      </div>

      <label className="flex items-start gap-2.5 text-[11.5px] leading-[1.6] text-[var(--ink3)]">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
        />
        <span>
          {tc('text')}{' '}
          <Link href="/privacy" className="underline decoration-[color:var(--b)] underline-offset-2 hover:text-[var(--ink)]">
            {tc('linkText')}
          </Link>
        </span>
      </label>

      <button
        type="submit"
        disabled={status === 'sending' || !consent}
        className="mt-1 rounded-sm bg-[var(--ink)] px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--wh)] transition-colors hover:bg-[var(--ink-hover)] disabled:cursor-wait disabled:opacity-50"
      >
        {status === 'sending' ? t('sending') : t('submit')}
      </button>
      {status === 'error' && <p className="text-[11px] text-[var(--ink3)]">{t('error')}</p>}
      {!endpoint && <p className="text-[11px] text-[var(--ink3)]">{t('notConfigured')}</p>}

      <p className="mt-2 text-[11.5px] leading-[1.7] text-[var(--ink3)]">{t('howItWorks')}</p>
    </form>
  );
}
