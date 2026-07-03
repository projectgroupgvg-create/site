'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT ?? '';

export default function NewsletterSignup() {
  const t = useTranslations('Newsletter');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!endpoint || !email || status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return <p className="text-[11.5px] text-[rgba(245,245,245,0.55)]">{t('success')}</p>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex max-w-[360px] gap-0">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('placeholder')}
          className="flex-1 rounded-l-sm border-hair border-r-0 border-[rgba(245,245,245,0.15)] bg-transparent px-3.5 py-2.5 text-[12px] text-[var(--wh)] outline-none placeholder:text-[rgba(245,245,245,0.35)]"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="whitespace-nowrap rounded-r-sm border-hair border-[rgba(245,245,245,0.15)] bg-[rgba(245,245,245,0.08)] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--wh)] transition-colors hover:bg-[rgba(245,245,245,0.15)] disabled:cursor-wait"
        >
          {status === 'sending' ? '...' : t('submit')}
        </button>
      </form>
      {status === 'error' && (
        <p className="mt-2 text-[11px] text-[rgba(245,245,245,0.45)]">{t('error')}</p>
      )}
      {!endpoint && (
        <p className="mt-2 text-[10.5px] text-[rgba(245,245,245,0.35)]">{t('notConfigured')}</p>
      )}
    </div>
  );
}
