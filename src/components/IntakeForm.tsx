'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? '';

type Practice = { num: string; title: string };

export default function IntakeForm({ practices }: { practices: Practice[] }) {
  const t = useTranslations('Intake');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!endpoint || status === 'sending') return;
    setStatus('sending');

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, formType: 'case-intake' }),
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
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
      <div>
        <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--s3)]">
          {t('practiceLabel')}
        </label>
        <select
          name="practice"
          required
          className="w-full rounded-sm border-hair bg-[var(--wh)] px-3.5 py-3 text-[13px] text-[var(--ink)] outline-none"
          style={{ borderColor: 'var(--b)' }}
        >
          <option value="">{t('practicePlaceholder')}</option>
          {practices.map((p) => (
            <option key={p.num} value={p.title}>
              {p.title}
            </option>
          ))}
          <option value="other">{t('practiceOther')}</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--s3)]">
          {t('urgencyLabel')}
        </label>
        <div className="flex flex-wrap gap-2">
          {(['urgent', 'week', 'flexible'] as const).map((value, i) => (
            <label key={value} className="flex-1">
              <input
                type="radio"
                name="urgency"
                value={t(`urgency_${value}`)}
                required
                defaultChecked={i === 0}
                className="peer sr-only"
              />
              <span className="block cursor-pointer rounded-sm border-hair px-3 py-2.5 text-center text-[11.5px] text-[var(--ink2)] transition-colors peer-checked:bg-[var(--ink)] peer-checked:text-[var(--wh)]" style={{ borderColor: 'var(--b)' }}>
                {t(`urgency_${value}`)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <textarea
        name="description"
        placeholder={t('descriptionPlaceholder')}
        rows={4}
        required
        className="resize-y rounded-sm border-hair bg-[var(--wh)] px-3.5 py-3 text-[13px] text-[var(--ink)] outline-none placeholder:text-[var(--ink3)]"
        style={{ borderColor: 'var(--b)' }}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          placeholder={t('namePlaceholder')}
          required
          className="rounded-sm border-hair bg-[var(--wh)] px-3.5 py-3 text-[13px] text-[var(--ink)] outline-none placeholder:text-[var(--ink3)]"
          style={{ borderColor: 'var(--b)' }}
        />
        <input
          type="tel"
          name="phone"
          placeholder={t('phonePlaceholder')}
          required
          className="rounded-sm border-hair bg-[var(--wh)] px-3.5 py-3 text-[13px] text-[var(--ink)] outline-none placeholder:text-[var(--ink3)]"
          style={{ borderColor: 'var(--b)' }}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-1 rounded-sm bg-[var(--ink)] px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--wh)] transition-colors hover:bg-[#333] disabled:cursor-wait"
      >
        {status === 'sending' ? t('sending') : t('submit')}
      </button>
      {status === 'error' && <p className="text-[11px] text-[var(--ink3)]">{t('error')}</p>}
      {!endpoint && (
        <p className="text-[11px] text-[var(--ink3)]">{t('notConfigured')}</p>
      )}
    </form>
  );
}
