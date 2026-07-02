'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const phoneRaw = '+380500000000';
const email = 'gangan.partners@gmail.com';
const telegramHandle = 'gangan_law';

export default function QuickContactWidget() {
  const t = useTranslations('QuickContact');
  const [open, setOpen] = useState(false);

  const items = [
    { key: 'phone', label: t('call'), href: `tel:${phoneRaw}`, mark: '✆' },
    { key: 'email', label: t('email'), href: `mailto:${email}`, mark: '✉' },
    { key: 'telegram', label: 'Telegram', href: `https://t.me/${telegramHandle}`, mark: 'TG' },
    { key: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/${phoneRaw.replace('+', '')}`, mark: 'WA' },
    { key: 'signal', label: 'Signal', href: `https://signal.me/#p/${phoneRaw}`, mark: 'SG' },
    { key: 'vcard', label: t('saveContact'), href: '/gangan-partners.vcf', mark: '◎', download: true },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[150] flex flex-col items-end gap-2.5">
      {open && (
        <div
          className="flex flex-col gap-1.5 border-hair bg-[var(--wh)] p-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
          style={{ borderColor: 'var(--b)' }}
        >
          {items.map((item) => (
            <a
              key={item.key}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              download={item.download ? true : undefined}
              className="flex items-center gap-3 px-3 py-2.5 text-[12px] text-[var(--ink2)] transition-colors hover:bg-[var(--bgc)]"
            >
              <span
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center border-hair text-[9px] font-semibold text-[var(--s3)]"
                style={{ borderColor: 'var(--b)' }}
              >
                {item.mark}
              </span>
              {item.label}
            </a>
          ))}
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t('toggle')}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--wh)] shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-transform hover:scale-105"
      >
        {open ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
