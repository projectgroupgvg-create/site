import { defineField, defineType } from 'sanity';

// A localized text object — the same shape repeats for several fields, so
// this small factory keeps the schema below readable.
function localizedText(name: string, title: string, rows = 3) {
  return defineField({
    name,
    title,
    type: 'object',
    fields: [
      { name: 'uk', title: 'Українська', type: 'text', rows },
      { name: 'en', title: 'English', type: 'text', rows },
      { name: 'de', title: 'Deutsch', type: 'text', rows },
      { name: 'fr', title: 'Français', type: 'text', rows },
    ],
  });
}

export default defineType({
  name: 'taxJurisdiction',
  title: 'Податкова юрисдикція (крипто) / Crypto Tax Jurisdiction',
  type: 'document',
  fields: [
    defineField({
      name: 'countryCode',
      title: 'Код країни (ISO 3166-1 alpha-2)',
      type: 'string',
      description: 'Напр. UA, DE, PL, FR',
      validation: (Rule) => Rule.required().length(2).uppercase(),
    }),
    defineField({
      name: 'flagEmoji',
      title: 'Емодзі прапору',
      type: 'string',
      description: 'Напр. 🇺🇦',
    }),
    localizedText('countryName', "Назва країни", 1),
    defineField({
      name: 'primaryCurrency',
      title: 'Основна валюта країни',
      type: 'string',
      options: { list: ['EUR', 'PLN', 'UAH', 'USD'] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Статус правового регулювання',
      type: 'string',
      options: {
        list: [
          { title: 'Чинне законодавство / In force', value: 'stable' },
          { title: 'Законопроєкт / Draft legislation', value: 'draft' },
          { title: 'Очікується роз’яснення / Guidance pending', value: 'pending' },
        ],
      },
      initialValue: 'stable',
      validation: (Rule) => Rule.required(),
    }),
    localizedText('statusNote', 'Пояснення статусу (якщо не "чинне")', 3),
    defineField({
      name: 'lastReviewed',
      title: 'Дата останньої перевірки юристом',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourceLabel',
      title: 'Назва офіційного джерела',
      type: 'string',
      description: 'Напр. "Державна податкова служба України", "Bundeszentralamt für Steuern"',
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Посилання на офіційне джерело',
      type: 'url',
    }),

    // --- Capital gains (sale/exchange) ---
    defineField({
      name: 'capitalGainsCalculable',
      title: '[Продаж] Можна порахувати точно?',
      type: 'boolean',
      description: 'Вимкніть, якщо ставка прогресивна й залежить від загального доходу (напр. Німеччина в межах строку утримання) — тоді калькулятор покаже лише опис, крім випадків звільнення за строком утримання',
      initialValue: true,
    }),
    defineField({
      name: 'capitalGainsRate',
      title: '[Продаж] Ставка, %',
      type: 'number',
    }),
    localizedText('capitalGainsRateNote', '[Продаж] Пояснення ставки', 2),
    defineField({
      name: 'capitalGainsAllowance',
      title: '[Продаж] Неоподатковуваний поріг (сума)',
      type: 'number',
      description: 'Залиште порожнім, якщо порогу немає',
    }),
    defineField({
      name: 'capitalGainsAllowanceCurrency',
      title: '[Продаж] Валюта порогу',
      type: 'string',
      options: { list: ['EUR', 'PLN', 'UAH', 'USD'] },
    }),
    defineField({
      name: 'capitalGainsHoldingExemptionMonths',
      title: '[Продаж] Звільнення після утримання (місяців)',
      type: 'number',
      description: 'Напр. 12 для Німеччини. Залиште порожнім, якщо немає.',
    }),
    localizedText('capitalGainsNotes', '[Продаж] Додаткові нотатки', 4),

    // --- Staking / mining ---
    defineField({
      name: 'stakingMiningCalculable',
      title: '[Staking/Mining] Можна порахувати точно?',
      type: 'boolean',
      description: 'Вимкніть, якщо ставка прогресивна/складна (напр. Франція) — тоді покажемо лише опис',
      initialValue: true,
    }),
    defineField({
      name: 'stakingMiningRate',
      title: '[Staking/Mining] Ставка, %',
      type: 'number',
    }),
    localizedText('stakingMiningRateNote', '[Staking/Mining] Пояснення ставки', 2),
    defineField({
      name: 'stakingMiningAllowance',
      title: '[Staking/Mining] Неоподатковуваний поріг (сума)',
      type: 'number',
    }),
    defineField({
      name: 'stakingMiningAllowanceCurrency',
      title: '[Staking/Mining] Валюта порогу',
      type: 'string',
      options: { list: ['EUR', 'PLN', 'UAH', 'USD'] },
    }),
    localizedText('stakingMiningNotes', '[Staking/Mining] Додаткові нотатки', 4),

    // --- DeFi — deliberately descriptive-only, no numeric calculation ---
    localizedText('defiNotes', '[DeFi] Опис підходу (без розрахунку — зона невизначеності)', 5),
  ],
  preview: {
    select: { title: 'countryName.uk', subtitle: 'countryCode', media: 'flagEmoji' },
  },
});
