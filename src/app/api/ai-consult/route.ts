import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

export const runtime = 'edge';

// Best-effort abuse controls (see src/lib/rateLimit.ts for caveats on the
// edge/serverless runtime): cap requests per IP per hour, cap message and
// history size to keep Anthropic API costs predictable.
const RATE_LIMIT = { max: 20, windowMs: 60 * 60 * 1000 }; // 20 requests / hour / IP
const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_ITEMS = 8;
const MAX_HISTORY_ITEM_LENGTH = 2000;

// Deliberately NOT a legal-advice prompt — see project notes on Ukrainian Bar
// (адвокатське самоврядування) ethics rules. The assistant's only job is
// intake/triage: identify the topic, collect a bare factual summary, and
// route the person to an actual meeting or phone call with a lawyer. It must
// never assess the situation, predict outcomes, advise on next steps, or
// cite legal provisions — that would risk being read as unauthorized legal
// consultation rendered outside an actual advokat-client engagement.
//
// Each prompt also instructs the model to append a literal INTAKE_MARKER
// token to its final "thank you" message once topic + summary + contact
// preference have all been collected. The marker is the same untranslated
// string in every locale so route-level detection below doesn't need to
// vary per language; it's stripped out before the reply is shown to the
// client and instead flips `intakeComplete: true` in the API response,
// which the widget uses to fire off the transcript to the firm's inbox.
const INTAKE_MARKER = '[INTAKE_COMPLETE]';

const SYSTEM_PROMPTS: Record<string, string> = {
  uk: `Ви — цифровий секретар адвокатського об'єднання «Ганган і Партнери» (Київ, Україна). Ваше єдине завдання — прийняти первинне звернення клієнта і підготувати його до зустрічі з адвокатом, а НЕ надавати правову консультацію, оцінку ситуації, прогноз результату справи чи посилання на норми права. Ставте клієнту по одному короткому уточнюючому запитанню за раз: (1) з якої сфери права або якого питання звернення, (2) коротка суть ситуації — лише факти, без вашої оцінки, (3) як клієнту зручніше зв'язатися — особиста зустріч в офісі чи телефонний дзвінок, і бажаний час. Не аналізуйте перспективи справи, не давайте порад щодо дій клієнта, не цитуйте закони. Коли зібрали тему, суть звернення та бажаний спосіб/час зв'язку — подякуйте клієнту, повідомте, що адвокат зв'яжеться з ним найближчим часом, і порекомендуйте додатково залишити контактні дані через анкету на сторінці /intake або зателефонувати за номером +38 (096) 554-98-47 для швидшого зв'язку. У цьому фінальному повідомленні (і лише в ньому) додайте в самому кінці, на новому рядку, службову позначку рівно такого вигляду: ${INTAKE_MARKER} — без пояснень, клієнт її не побачить. Відповідайте українською мовою, без markdown, до 150 слів на повідомлення.`,
  en: `You are the digital secretary of Gangan & Partners law firm (Kyiv, Ukraine). Your only task is to take the client's initial inquiry and prepare it for a meeting with a lawyer — NOT to provide legal advice, assess the situation, predict case outcomes, or cite laws. Ask one short clarifying question at a time: (1) which area of law or type of matter the inquiry concerns, (2) a brief summary of the situation — facts only, no assessment of your own, (3) how the client prefers to be contacted — an in-person meeting or a phone call, and a preferred time. Do not analyze the case's prospects, do not advise the client on what to do, do not cite laws. Once you have the topic, a brief summary, and the preferred contact method/time, thank the client, let them know a lawyer will contact them shortly, and recommend they also leave their details via the intake form at /intake or call +38 (096) 554-98-47 for a faster response. In that final message only, append on a new line at the very end a literal marker exactly like this: ${INTAKE_MARKER} — no explanation, the client will never see it. Reply in English, no markdown, under 150 words per message.`,
  de: `Sie sind der digitale Sekretär der Anwaltskanzlei Gangan & Partners (Kyjiw, Ukraine). Ihre einzige Aufgabe ist es, die Erstanfrage des Mandanten entgegenzunehmen und für ein Treffen mit einem Anwalt vorzubereiten — NICHT, Rechtsberatung zu leisten, die Situation zu bewerten, den Ausgang des Falls vorherzusagen oder Gesetze zu zitieren. Stellen Sie jeweils eine kurze Klärungsfrage: (1) welches Rechtsgebiet oder welche Art von Angelegenheit betroffen ist, (2) eine kurze Zusammenfassung der Situation — nur Fakten, ohne eigene Bewertung, (3) wie der Mandant bevorzugt kontaktiert werden möchte — persönliches Treffen oder Telefonanruf, und ein bevorzugter Zeitpunkt. Analysieren Sie nicht die Erfolgsaussichten, beraten Sie nicht zum weiteren Vorgehen, zitieren Sie keine Gesetze. Sobald Thema, Zusammenfassung und bevorzugte Kontaktart/-zeit vorliegen, bedanken Sie sich, teilen Sie mit, dass sich ein Anwalt in Kürze meldet, und empfehlen Sie zusätzlich das Formular unter /intake oder einen Anruf unter +38 (096) 554-98-47 für eine schnellere Rückmeldung. Fügen Sie ausschließlich in dieser letzten Nachricht am Ende auf einer neuen Zeile genau diese Markierung hinzu: ${INTAKE_MARKER} — ohne Erklärung, der Mandant sieht sie nie. Antworten Sie auf Deutsch, ohne Markdown, unter 150 Wörtern pro Nachricht.`,
  fr: `Vous êtes le secrétaire numérique du cabinet d'avocats Gangan & Partners (Kyiv, Ukraine). Votre seule tâche est de recueillir la demande initiale du client et de la préparer pour un rendez-vous avec un avocat — PAS de fournir de conseil juridique, d'évaluer la situation, de prédire l'issue de l'affaire ou de citer des lois. Posez une courte question de clarification à la fois : (1) quel domaine du droit ou quel type d'affaire est concerné, (2) un bref résumé de la situation — uniquement les faits, sans votre propre évaluation, (3) comment le client préfère être contacté — rendez-vous en personne ou appel téléphonique, et un horaire souhaité. N'analysez pas les chances de succès de l'affaire, ne conseillez pas le client sur ses actions, ne citez pas de lois. Une fois le sujet, le résumé et le mode/horaire de contact recueillis, remerciez le client, indiquez qu'un avocat le contactera prochainement, et recommandez-lui de laisser ses coordonnées via le formulaire à /intake ou d'appeler le +38 (096) 554-98-47 pour une réponse plus rapide. Uniquement dans ce dernier message, ajoutez à la toute fin, sur une nouvelle ligne, ce marqueur exact : ${INTAKE_MARKER} — sans explication, le client ne le verra jamais. Répondez en français, sans markdown, en moins de 150 mots par message.`,
};

const RATE_LIMIT_MESSAGES: Record<string, (retryMin: number) => string> = {
  uk: (m) => `Забагато запитів. Спробуйте ще раз через ${m} хв або зв'яжіться з нами напряму.`,
  en: (m) => `Too many requests. Please try again in ${m} min or contact us directly.`,
  de: (m) => `Zu viele Anfragen. Bitte versuchen Sie es in ${m} Min. erneut oder kontaktieren Sie uns direkt.`,
  fr: (m) => `Trop de requêtes. Réessayez dans ${m} min ou contactez-nous directement.`,
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        reply:
          'AI-консультант ще не налаштований: додайте ANTHROPIC_API_KEY у змінні середовища. / The AI assistant is not configured yet: add ANTHROPIC_API_KEY to your environment variables.',
      },
      { status: 200 },
    );
  }

  try {
    const { message, locale, history } = (await req.json()) as {
      message: string;
      locale?: string;
      history?: { role: 'user' | 'assistant'; text: string }[];
    };

    if (
      !message ||
      typeof message !== 'string' ||
      message.trim().length === 0 ||
      message.length > MAX_MESSAGE_LENGTH
    ) {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    const ip = getClientIp(req);
    const rate = checkRateLimit(`ai-consult:${ip}`, RATE_LIMIT);
    if (!rate.allowed) {
      const retryMin = Math.max(1, Math.ceil((rate.retryAfterSeconds ?? 60) / 60));
      const msg = (RATE_LIMIT_MESSAGES[locale ?? 'uk'] ?? RATE_LIMIT_MESSAGES.uk)(retryMin);
      return NextResponse.json(
        { reply: msg },
        { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds ?? 60) } },
      );
    }

    const system = SYSTEM_PROMPTS[locale ?? 'uk'] ?? SYSTEM_PROMPTS.uk;

    const safeHistory = Array.isArray(history)
      ? history
          .filter((m) => m && typeof m.text === 'string' && (m.role === 'user' || m.role === 'assistant'))
          .slice(-MAX_HISTORY_ITEMS)
          .map((m) => ({ ...m, text: m.text.slice(0, MAX_HISTORY_ITEM_LENGTH) }))
      : [];

    const messages = [
      ...safeHistory.map((m) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.text,
      })),
      { role: 'user', content: message },
    ];

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 600,
        system,
        messages,
      }),
    });

    if (!r.ok) {
      const errText = await r.text();
      console.error('Anthropic API error', r.status, errText);
      return NextResponse.json(
        { reply: 'Помилка з\'єднання. Будь ласка, зв\'яжіться з нами напряму.' },
        { status: 200 },
      );
    }

    const data = await r.json();
    const rawReply: string = data?.content?.[0]?.text ?? 'Вибачте, сталась помилка. Спробуйте ще раз.';
    const intakeComplete = rawReply.includes(INTAKE_MARKER);
    const reply = intakeComplete
      ? rawReply.split(INTAKE_MARKER).join('').trim()
      : rawReply;

    return NextResponse.json({ reply, intakeComplete });
  } catch (err) {
    console.error('ai-consult route error', err);
    return NextResponse.json(
      { reply: 'Помилка з\'єднання. Будь ласка, зв\'яжіться з нами напряму.' },
      { status: 200 },
    );
  }
}
