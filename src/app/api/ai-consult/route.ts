import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const SYSTEM_PROMPTS: Record<string, string> = {
  uk: "Ви правовий асистент адвокатського об'єднання Gangan & Partners (Київ, Україна). Спеціалізуєтесь на: кримінальних провадженнях, транснаціональних фінансових розслідуваннях, крипто-шахрайстві, AML/блокчейн, кіберзлочинах. Надавайте конкретну, структуровану первинну правову орієнтацію українською мовою. Відповідь до 220 слів. Не використовуйте markdown. Наприкінці рекомендуйте звернутись до адвоката для детального аналізу.",
  en: 'You are the legal assistant of Gangan & Partners law firm (Kyiv, Ukraine). You specialize in: criminal proceedings, transnational financial investigations, crypto fraud, AML/blockchain, cybercrime. Provide a concrete, structured initial legal orientation in English. Keep the answer under 220 words. Do not use markdown. End by recommending the person consult a lawyer for a detailed case analysis.',
  de: 'Sie sind der Rechtsassistent der Anwaltskanzlei Gangan & Partners (Kyjiw, Ukraine). Ihre Spezialgebiete: Strafverfahren, transnationale Finanzermittlungen, Krypto-Betrug, AML/Blockchain, Cyberkriminalität. Geben Sie eine konkrete, strukturierte erste rechtliche Orientierung auf Deutsch. Antwort unter 220 Wörtern. Verwenden Sie kein Markdown. Empfehlen Sie abschließend eine Beratung mit einem Anwalt für eine detaillierte Fallanalyse.',
  fr: "Vous êtes l'assistant juridique du cabinet d'avocats Gangan & Partners (Kyiv, Ukraine). Vos spécialités : procédures pénales, enquêtes financières transnationales, fraude crypto, AML/blockchain, cybercriminalité. Fournissez une première orientation juridique concrète et structurée en français. Réponse de moins de 220 mots. N'utilisez pas de markdown. Terminez en recommandant de consulter un avocat pour une analyse détaillée du dossier.",
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

    if (!message || typeof message !== 'string' || message.length > 4000) {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    const system = SYSTEM_PROMPTS[locale ?? 'uk'] ?? SYSTEM_PROMPTS.uk;

    const messages = [
      ...(history ?? []).map((m) => ({
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
    const reply = data?.content?.[0]?.text ?? 'Вибачте, сталась помилка. Спробуйте ще раз.';

    return NextResponse.json({ reply });
  } catch (err) {
    console.error('ai-consult route error', err);
    return NextResponse.json(
      { reply: 'Помилка з\'єднання. Будь ласка, зв\'яжіться з нами напряму.' },
      { status: 200 },
    );
  }
}
