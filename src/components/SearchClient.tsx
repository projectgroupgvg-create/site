'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export type SearchItem = {
  type: 'practice' | 'blog' | 'news';
  title: string;
  excerpt: string;
  href: string;
};

function normalize(s: string) {
  return s.toLowerCase();
}

export default function SearchClient({ items }: { items: SearchItem[] }) {
  const t = useTranslations('Search');
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return [];
    return items.filter(
      (item) => normalize(item.title).includes(q) || normalize(item.excerpt).includes(q),
    );
  }, [items, query]);

  const typeLabel = (type: SearchItem['type']) =>
    type === 'practice' ? t('typePractice') : type === 'blog' ? t('typeBlog') : t('typeNews');

  return (
    <div>
      <input
        type="text"
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('placeholder')}
        className="w-full rounded-sm border-hair bg-[var(--wh)] px-5 py-4 text-[16px] text-[var(--ink)] outline-none"
        style={{ borderColor: 'var(--b)' }}
      />

      <div className="mt-8">
        {query.trim() === '' ? (
          <p className="text-[13px] text-[var(--ink3)]">{t('hint')}</p>
        ) : results.length === 0 ? (
          <p className="text-[13px] text-[var(--ink3)]">{t('noResults')}</p>
        ) : (
          <div className="flex flex-col gap-3">
            {results.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border-hair bg-[var(--bgc)] p-5 transition-colors hover:bg-[var(--wh)]"
                style={{ borderColor: 'var(--b)' }}
              >
                <div className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--s3)]">
                  {typeLabel(item.type)}
                </div>
                <div className="mb-1.5 font-serif text-[15px] font-semibold text-[var(--ink)]">
                  {item.title}
                </div>
                {item.excerpt && (
                  <div className="text-[12.5px] leading-[1.65] text-[var(--ink3)]">{item.excerpt}</div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
