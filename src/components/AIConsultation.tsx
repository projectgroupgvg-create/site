'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';

type Msg = { role: 'user' | 'assistant'; text: string };

export default function AIConsultation() {
  const t = useTranslations('AI');
  const locale = useLocale();
  const greeting = t('greeting');
  const tiers = t.raw('tiers') as { price: string; label: string }[];
  const topics = t.raw('topics') as string[];
  const topicPrompts = t.raw('topicPrompts') as string[];

  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', text: greeting },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [selectedTier, setSelectedTier] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  async function send(text?: string) {
    const value = (text ?? input).trim();
    if (!value || sending) return;
    setInput('');
    setSending(true);
    setMessages((m) => [...m, { role: 'user', text: value }]);

    try {
      const res = await fetch('/api/ai-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: value,
          locale,
          history: messages.slice(-6),
        }),
      });
      if (!res.ok) throw new Error('bad response');
      const data = await res.json();
      setMessages((m) => [...m, { role: 'assistant', text: data.reply }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', text: t('error') }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="ai" className="border-y-hair bg-[var(--bg3)]" style={{ borderColor: 'var(--b)' }}>
      <div className="grid grid-cols-1 gap-12 px-6 py-24 sm:px-11 lg:grid-cols-2 lg:gap-20">
        <div>
          <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.4em] text-[var(--s3)]">
            {t('lbl')}
          </div>
          <h2 className="mb-5 font-serif text-[clamp(26px,3.2vw,44px)] font-bold leading-[1.1] text-[var(--ink)]">
            {t('title')}
          </h2>
          <div className="divider" />
          <p className="max-w-[460px] text-[14.5px] leading-[1.8] text-[var(--ink3)]">
            {t('sub')}
          </p>

          <div className="mt-10 border-hair p-6" style={{ borderColor: 'var(--b)', background: 'var(--bgc)' }}>
            <div className="mb-3.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--s3)]">
              {t('payTitle')}
            </div>
            <div className="flex flex-wrap gap-3">
              {tiers.map((tier, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTier(i)}
                  className={`min-w-[90px] flex-1 border-hair px-2 py-3 text-center text-[11px] text-[var(--ink2)] transition-colors ${
                    selectedTier === i ? 'bg-[var(--bg2)]' : 'bg-[var(--wh)]'
                  }`}
                  style={{ borderColor: selectedTier === i ? 'var(--ink)' : 'var(--b)' }}
                >
                  <strong className="block font-serif text-[14.5px] font-bold text-[var(--ink)]">
                    {tier.price}
                  </strong>
                  {tier.label}
                </button>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {['Visa', 'Mastercard', 'Apple Pay', 'LiqPay', 'SWIFT'].map((p) => (
                <span
                  key={p}
                  className="border-hair bg-[var(--wh)] px-2.5 py-1 text-[10px] text-[var(--ink3)]"
                  style={{ borderColor: 'var(--b)' }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="border-hair bg-[var(--wh)]" style={{ borderColor: 'var(--b)' }}>
            <div className="flex items-center gap-2 border-b-hair px-5 py-4" style={{ borderColor: 'var(--b)' }}>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--ink)]" />
              <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--ink)]">
                {t('chatLabel')}
              </span>
            </div>

            <div ref={scrollRef} className="flex max-h-[340px] min-h-[260px] flex-col gap-3.5 overflow-y-auto px-5 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[90%] px-3.5 py-2.5 text-[12.5px] leading-[1.65] ${
                    m.role === 'user'
                      ? 'self-end bg-[var(--ink)] text-[var(--wh)]'
                      : 'self-start border-l-2 bg-[var(--bg2)] text-[var(--ink2)]'
                  }`}
                  style={m.role === 'assistant' ? { borderColor: 'var(--s3)' } : undefined}
                >
                  {m.role === 'assistant' && (
                    <div className="mb-1 text-[8px] font-semibold uppercase tracking-[0.2em] text-[var(--s3)]">
                      Gangan AI
                    </div>
                  )}
                  {m.text}
                </div>
              ))}
              {sending && (
                <div className="self-start border-l-2 bg-[var(--bg2)] px-3.5 py-2.5 text-[12.5px] text-[var(--ink2)]" style={{ borderColor: 'var(--s3)' }}>
                  <div className="mb-1 text-[8px] font-semibold uppercase tracking-[0.2em] text-[var(--s3)]">
                    Gangan AI
                  </div>
                  <span className="ldots" />
                </div>
              )}
            </div>

            <div className="border-t-hair px-4.5 py-3.5" style={{ borderColor: 'var(--b)' }}>
              <div className="flex">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder={t('placeholder')}
                  className="flex-1 border-hair border-r-0 bg-[var(--bg)] px-3.5 py-2.5 text-[12.5px] text-[var(--ink)] outline-none placeholder:text-[var(--ink3)]"
                  style={{ borderColor: 'var(--b)' }}
                />
                <button
                  onClick={() => send()}
                  disabled={sending}
                  className="whitespace-nowrap bg-[var(--ink)] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--wh)] transition-colors hover:bg-[#555] disabled:cursor-wait"
                >
                  {sending ? t('sending') : t('send')}
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {topics.map((topic, i) => (
                  <button
                    key={topic}
                    onClick={() => send(topicPrompts[i])}
                    className="border-hair px-2.5 py-1.5 text-[10px] text-[var(--ink3)] transition-colors hover:text-[var(--ink)]"
                    style={{ borderColor: 'var(--b)' }}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
