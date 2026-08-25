'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { formEndpoint } from '@/lib/site';

type Msg = { role: 'user' | 'assistant'; text: string };

export default function AIConsultation() {
  const t = useTranslations('AI');
  const tc = useTranslations('Consent');
  const locale = useLocale();
  const greeting = t('greeting');
  const topics = t.raw('topics') as string[];
  const topicPrompts = t.raw('topicPrompts') as string[];

  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', text: greeting },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  // Per the firm's data-protection counsel, a single generic checkbox isn't
  // sufficient consent for this data flow. Three separate, all-required
  // checkboxes: (1) privacy policy acknowledgment, (2) explicit awareness
  // that message text goes to Anthropic in the US, (3) confirmation the
  // client won't paste passwords/keys/documents/sensitive third-party data.
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);
  const [consent3, setConsent3] = useState(false);
  const consentGiven = consent1 && consent2 && consent3;
  const scrollRef = useRef<HTMLDivElement>(null);
  // Guards against sending the handoff notice more than once per
  // conversation — the backend can in principle flip `intakeComplete` again
  // if the client keeps chatting after the handoff message.
  const summarySentRef = useRef(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  // Fire-and-forget: notifies the firm's inbox that an intake finished, via
  // the same Formspree endpoint used by the other forms. Deliberately does
  // NOT forward the full conversation — counsel flagged that a complete
  // transcript can carry attorney-client-privileged or special-category
  // data that Formspree's and Anthropic's standard terms aren't cleared to
  // receive. Only the topic + the contact method/time the client stated
  // (extracted server-side into `contactSummary`, see route.ts) is sent;
  // the full chat history is never persisted anywhere.
  function sendHandoffNotice(contactSummary: string | null) {
    if (!formEndpoint || summarySentRef.current) return;
    summarySentRef.current = true;
    const message = contactSummary
      ? `Новий інтейк через AI-секретар. ${contactSummary}`
      : 'Новий інтейк через AI-секретар завершено, але короткий підсумок не сформувався автоматично — клієнту рекомендовано звернутися через /intake або за телефоном.';
    fetch(formEndpoint, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'ai-consult',
        locale,
        email: 'ai-widget@gangan.partners',
        message,
      }),
    }).catch(() => {
      // Best-effort only — don't surface a failure to the client, the
      // conversation itself already succeeded on their end.
    });
  }

  async function send(text?: string) {
    const value = (text ?? input).trim();
    if (!value || sending || !consentGiven) return;
    setInput('');
    setSending(true);
    const userMsg: Msg = { role: 'user', text: value };
    setMessages((m) => [...m, userMsg]);

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
      // 429 (rate limited) and the "not configured" case both come back with
      // a normal JSON body containing a user-facing `reply`, so render those
      // instead of falling through to the generic error message.
      const data = await res.json().catch(() => null);
      if (!data?.reply) throw new Error('bad response');
      const assistantMsg: Msg = { role: 'assistant', text: data.reply };
      setMessages((m) => [...m, assistantMsg]);
      if (data.intakeComplete) {
        sendHandoffNotice(data.contactSummary ?? null);
      }
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
          <h2 className="mb-5 font-serif text-[clamp(26px,3.2vw,44px)] font-light leading-[1.1] text-[var(--ink)]">
            {t('title')}
          </h2>
          <div className="divider" />
          <p className="max-w-[460px] text-[14.5px] leading-[1.8] text-[var(--ink3)]">
            {t('sub')}
          </p>

          <Link
            href="/intake"
            className="mt-4 inline-block text-[11px] uppercase tracking-[0.1em] text-[var(--ink2)] underline decoration-[color:var(--b)] underline-offset-4 transition-colors hover:text-[var(--ink)]"
          >
            {t('intakeLink')} →
          </Link>
        </div>

        <div>
          <div className="overflow-hidden rounded-lg border-hair bg-[var(--wh)]" style={{ borderColor: 'var(--b)' }}>
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
                  className={`max-w-[90%] rounded-sm px-3.5 py-2.5 text-[12.5px] leading-[1.65] ${
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
                <div className="self-start rounded-sm border-l-2 bg-[var(--bg2)] px-3.5 py-2.5 text-[12.5px] text-[var(--ink2)]" style={{ borderColor: 'var(--s3)' }}>
                  <div className="mb-1 text-[8px] font-semibold uppercase tracking-[0.2em] text-[var(--s3)]">
                    Gangan AI
                  </div>
                  <span className="ldots" />
                </div>
              )}
            </div>

            <div className="border-t-hair px-4.5 py-3.5" style={{ borderColor: 'var(--b)' }}>
              {consentGiven ? (
                <>
                  <div className="flex">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && send()}
                      placeholder={t('placeholder')}
                      className="flex-1 rounded-l-sm border-hair border-r-0 bg-[var(--bg)] px-3.5 py-2.5 text-[12.5px] text-[var(--ink)] outline-none placeholder:text-[var(--ink3)]"
                      style={{ borderColor: 'var(--b)' }}
                    />
                    <button
                      onClick={() => send()}
                      disabled={sending}
                      className="whitespace-nowrap rounded-r-sm bg-[var(--ink)] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--wh)] transition-colors hover:bg-[var(--ink-hover)] disabled:cursor-wait"
                    >
                      {sending ? t('sending') : t('send')}
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {topics.map((topic, i) => (
                      <button
                        key={topic}
                        onClick={() => send(topicPrompts[i])}
                        className="rounded-sm border-hair px-2.5 py-1.5 text-[10px] text-[var(--ink3)] transition-colors hover:text-[var(--ink)]"
                        style={{ borderColor: 'var(--b)' }}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2.5">
                  <label className="flex items-start gap-2.5 text-[11.5px] leading-[1.6] text-[var(--ink2)]">
                    <input
                      type="checkbox"
                      checked={consent1}
                      onChange={(e) => setConsent1(e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                    />
                    <span>
                      {t('consent1')}{' '}
                      <Link href="/privacy" className="underline decoration-[color:var(--b)] underline-offset-2 hover:text-[var(--ink)]">
                        {tc('linkText')}
                      </Link>
                    </span>
                  </label>
                  <label className="flex items-start gap-2.5 text-[11.5px] leading-[1.6] text-[var(--ink2)]">
                    <input
                      type="checkbox"
                      checked={consent2}
                      onChange={(e) => setConsent2(e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                    />
                    <span>{t('consent2')}</span>
                  </label>
                  <label className="flex items-start gap-2.5 text-[11.5px] leading-[1.6] text-[var(--ink2)]">
                    <input
                      type="checkbox"
                      checked={consent3}
                      onChange={(e) => setConsent3(e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                    />
                    <span>{t('consent3')}</span>
                  </label>
                </div>
              )}
            </div>
          </div>
          <p className="mt-3 text-[10.5px] leading-[1.6] text-[var(--ink3)]">{t('disclaimer')}</p>
        </div>
      </div>
    </section>
  );
}
