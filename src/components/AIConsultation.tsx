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
  // Single upfront checkbox: everyone chatting with the AI necessarily sends
  // message text to Anthropic, so privacy-policy acknowledgment + that
  // specific transfer are gated together here. The separate "don't paste
  // sensitive data" warning is now passive copy (see the callout below the
  // input) rather than an active checkbox — and consent to the *second*
  // data flow (handing a summary to the firm via Formspree) is asked for
  // separately, at the point that actually happens, in the review panel
  // below.
  const [consentAnthropic, setConsentAnthropic] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Once the model signals the intake is complete, its auto-drafted
  // contactSummary lands here for the client to review/edit/discard —
  // nothing is sent anywhere automatically. `null` = no pending handoff;
  // an empty string is a valid (if unhelpful) editable draft.
  const [pendingSummary, setPendingSummary] = useState<string | null>(null);
  const [consentFormspree, setConsentFormspree] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [handoffSubmitting, setHandoffSubmitting] = useState(false);
  const [handoffSent, setHandoffSent] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, pendingSummary]);

  async function send(text?: string) {
    const value = (text ?? input).trim();
    if (!value || sending || !consentAnthropic) return;
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
      // Only pick up a fresh draft if there isn't one already pending/sent —
      // guards against the model re-flagging intakeComplete if the client
      // keeps chatting after the handoff message.
      if (data.intakeComplete && pendingSummary === null && !handoffSent) {
        setPendingSummary(typeof data.contactSummary === 'string' ? data.contactSummary : '');
      }
    } catch {
      setMessages((m) => [...m, { role: 'assistant', text: t('error') }]);
    } finally {
      setSending(false);
    }
  }

  // Only fires on the client's own explicit click — never automatically.
  // Sends the (possibly hand-edited) summary text the client has reviewed,
  // never the underlying chat history.
  async function sendToLawyer() {
    if (!formEndpoint || pendingSummary === null || !consentFormspree || handoffSubmitting) return;
    setHandoffSubmitting(true);
    try {
      await fetch(formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'ai-consult',
          locale,
          email: 'ai-widget@gangan.partners',
          message: `Новий інтейк через AI-секретар. ${pendingSummary.trim() || t('summaryEmpty')}`,
          marketingOptIn: consentMarketing,
        }),
      });
    } catch {
      // Best-effort only — if this fails the client still saw their own
      // conversation succeed; they can fall back to /intake or the phone
      // number in the reply text.
    } finally {
      setHandoffSubmitting(false);
      setHandoffSent(true);
    }
  }

  function discardSummary() {
    setPendingSummary(null);
    setConsentFormspree(false);
    setConsentMarketing(false);
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

              {/* Review/edit/confirm panel — appears once the model signals
                  the intake is done, replaces the auto-send that used to
                  happen silently. Nothing reaches Formspree until the
                  client explicitly clicks "send to lawyer" below. */}
              {pendingSummary !== null && !handoffSent && (
                <div
                  className="self-stretch rounded-sm border-hair bg-[var(--bgc)] p-3.5"
                  style={{ borderColor: 'var(--s3)' }}
                >
                  <div className="mb-1.5 text-[8px] font-semibold uppercase tracking-[0.2em] text-[var(--s3)]">
                    {t('reviewTitle')}
                  </div>
                  <p className="mb-2.5 text-[11px] leading-[1.6] text-[var(--ink3)]">{t('reviewHint')}</p>
                  <textarea
                    value={pendingSummary}
                    onChange={(e) => setPendingSummary(e.target.value)}
                    placeholder={t('summaryPlaceholder')}
                    rows={3}
                    className="mb-3 w-full resize-y rounded-sm border-hair bg-[var(--wh)] px-3 py-2.5 text-[12.5px] leading-[1.6] text-[var(--ink)] outline-none placeholder:text-[var(--ink3)]"
                    style={{ borderColor: 'var(--b)' }}
                  />
                  <label className="mb-2 flex items-start gap-2 text-[11px] leading-[1.55] text-[var(--ink2)]">
                    <input
                      type="checkbox"
                      checked={consentFormspree}
                      onChange={(e) => setConsentFormspree(e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                    />
                    <span>{t('consentFormspree')}</span>
                  </label>
                  <label className="mb-3 flex items-start gap-2 text-[11px] leading-[1.55] text-[var(--ink2)]">
                    <input
                      type="checkbox"
                      checked={consentMarketing}
                      onChange={(e) => setConsentMarketing(e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                    />
                    <span>{t('consentMarketing')}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={sendToLawyer}
                      disabled={!consentFormspree || handoffSubmitting}
                      className="rounded-sm bg-[var(--ink)] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--wh)] transition-colors hover:bg-[var(--ink-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {handoffSubmitting ? t('sendingHandoff') : t('sendToLawyerBtn')}
                    </button>
                    <button
                      onClick={discardSummary}
                      disabled={handoffSubmitting}
                      className="rounded-sm border-hair px-4 py-2.5 text-[10px] uppercase tracking-[0.1em] text-[var(--ink3)] transition-colors hover:text-[var(--ink)]"
                      style={{ borderColor: 'var(--b)' }}
                    >
                      {t('discardBtn')}
                    </button>
                  </div>
                </div>
              )}

              {handoffSent && (
                <div className="self-stretch rounded-sm border-l-2 bg-[var(--bg2)] px-3.5 py-2.5 text-[12.5px] leading-[1.6] text-[var(--ink2)]" style={{ borderColor: 'var(--s3)' }}>
                  <div className="mb-1 text-[8px] font-semibold uppercase tracking-[0.2em] text-[var(--s3)]">
                    {t('handoffSentTitle')}
                  </div>
                  {t('handoffSentBody')}
                </div>
              )}
            </div>

            <div className="border-t-hair px-4.5 py-3.5" style={{ borderColor: 'var(--b)' }}>
              {consentAnthropic ? (
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
                <label className="flex items-start gap-2.5 text-[11.5px] leading-[1.6] text-[var(--ink2)]">
                  <input
                    type="checkbox"
                    checked={consentAnthropic}
                    onChange={(e) => setConsentAnthropic(e.target.checked)}
                    className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                  />
                  <span>
                    {t('consent1')}{' '}
                    <Link href="/privacy" className="underline decoration-[color:var(--b)] underline-offset-2 hover:text-[var(--ink)]">
                      {tc('linkText')}
                    </Link>
                  </span>
                </label>
              )}
            </div>
          </div>
          <p className="mt-3 text-[10.5px] leading-[1.6] text-[var(--ink3)]">{t('disclaimer')}</p>
        </div>
      </div>
    </section>
  );
}
