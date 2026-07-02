// Seed/fallback data for the crypto tax calculator (used when Sanity has no
// taxJurisdiction documents yet, or as the starting content for lawyers to
// review and refine in Studio). Every rate here is sourced from the
// publications cited in `sourceUrl`, researched July 2026 — tax rules change
// and this is NOT a substitute for professional advice. See
// sanity/schemaTypes/taxJurisdiction.ts for the field meanings and
// sanity/README.md for how to edit this content in Studio instead.

export type LocalizedText = { uk: string; en: string; de: string; fr: string };

export type TaxJurisdiction = {
  countryCode: string;
  flagEmoji: string;
  countryName: LocalizedText;
  primaryCurrency: 'EUR' | 'PLN' | 'UAH' | 'USD' | 'CHF';
  status: 'stable' | 'draft' | 'pending';
  statusNote?: LocalizedText;
  lastReviewed: string;
  sourceLabel: string;
  sourceUrl: string;

  capitalGainsCalculable: boolean;
  capitalGainsRate?: number;
  capitalGainsRateNote: LocalizedText;
  capitalGainsAllowance?: number;
  capitalGainsAllowanceCurrency?: 'EUR' | 'PLN' | 'UAH' | 'USD' | 'CHF';
  capitalGainsHoldingExemptionMonths?: number;
  capitalGainsNotes: LocalizedText;

  stakingMiningCalculable: boolean;
  stakingMiningRate?: number;
  stakingMiningRateNote: LocalizedText;
  stakingMiningAllowance?: number;
  stakingMiningAllowanceCurrency?: 'EUR' | 'PLN' | 'UAH' | 'USD' | 'CHF';
  stakingMiningNotes: LocalizedText;

  defiNotes: LocalizedText;
};

export const fallbackTaxJurisdictions: TaxJurisdiction[] = [
  {
    countryCode: 'UA',
    flagEmoji: '🇺🇦',
    countryName: { uk: 'Україна', en: 'Ukraine', de: 'Ukraine', fr: 'Ukraine' },
    primaryCurrency: 'UAH',
    status: 'draft',
    statusNote: {
      uk: "Профільний закон ще не набрав чинності. Законопроєкт №10225-д пройшов перше читання (вересень 2025), очікувана дата набрання чинності — 1 січня 2026. До ухвалення закону податкова служба застосовує загальні правила оподаткування інвестиційного доходу.",
      en: 'The dedicated law has not yet entered into force. Draft Bill No. 10225-d passed its first reading (September 2025); the expected effective date is 1 January 2026. Until enacted, the tax authority applies general investment-income rules.',
      de: 'Das entsprechende Gesetz ist noch nicht in Kraft. Der Gesetzentwurf Nr. 10225-d wurde in erster Lesung angenommen (September 2025); das geplante Inkrafttreten ist der 1. Januar 2026. Bis dahin wendet die Steuerbehörde allgemeine Regeln für Kapitaleinkünfte an.',
      fr: "La loi dédiée n'est pas encore entrée en vigueur. Le projet de loi n°10225-d a été adopté en première lecture (septembre 2025) ; l'entrée en vigueur prévue est le 1er janvier 2026. En attendant, l'administration fiscale applique les règles générales sur les revenus d'investissement.",
    },
    lastReviewed: '2026-06-20',
    sourceLabel: 'Верховна Рада України — законопроєкт №10225-д',
    sourceUrl: 'https://itd.rada.gov.ua/billinfo/Bills/Card/56271',

    capitalGainsCalculable: true,
    capitalGainsRate: 23,
    capitalGainsRateNote: {
      uk: '18% ПДФО + 5% військовий збір = 23%. Перехідний період 2026 року: пільгова ставка 5% ПДФО + 5% військовий збір для активів, придбаних до набрання чинності законом.',
      en: '18% personal income tax + 5% military levy = 23%. Transition period in 2026: a reduced 5% PIT + 5% military levy applies to assets acquired before the law enters into force.',
      de: '18% Einkommensteuer + 5% Militärabgabe = 23%. Übergangszeitraum 2026: ermäßigter Satz von 5% Einkommensteuer + 5% Militärabgabe für vor Inkrafttreten erworbene Vermögenswerte.',
      fr: "18% d'impôt sur le revenu + 5% de prélèvement militaire = 23%. Période de transition 2026 : taux réduit de 5% d'IR + 5% de prélèvement militaire pour les actifs acquis avant l'entrée en vigueur de la loi.",
    },
    capitalGainsAllowance: undefined,
    capitalGainsNotes: {
      uk: 'Оподатковується різниця між доходом від продажу та вартістю придбання. Обмін криптовалюти на криптовалюту (crypto-to-crypto) не оподатковується — податок виникає лише при конвертації у фіат або оплаті товарів/послуг.',
      en: 'Tax applies to the difference between sale proceeds and acquisition cost. Crypto-to-crypto exchanges are not taxable — tax arises only on conversion to fiat or use for goods/services.',
      de: 'Besteuert wird die Differenz zwischen Verkaufserlös und Anschaffungskosten. Krypto-zu-Krypto-Tausch ist steuerfrei — die Steuer entsteht erst bei Umwandlung in Fiatgeld oder bei Verwendung für Waren/Dienstleistungen.',
      fr: "L'impôt porte sur la différence entre le produit de la vente et le coût d'acquisition. Les échanges crypto-à-crypto ne sont pas imposables — l'imposition n'intervient qu'à la conversion en monnaie fiduciaire ou à l'usage pour des biens/services.",
    },

    stakingMiningCalculable: false,
    stakingMiningRateNote: {
      uk: 'Законопроєкт не містить окремих положень щодо staking/mining — станом на перевірку діють лише загальні норми.',
      en: 'The draft law does not yet contain dedicated staking/mining provisions — only general rules apply as of this review.',
      de: 'Der Gesetzentwurf enthält noch keine speziellen Regelungen für Staking/Mining — es gelten derzeit nur die allgemeinen Vorschriften.',
      fr: "Le projet de loi ne contient pas encore de dispositions spécifiques pour le staking/mining — seules les règles générales s'appliquent à ce jour.",
    },
    stakingMiningNotes: {
      uk: 'Через відсутність спеціального регулювання настійно рекомендуємо консультацію з податковим юристом до подання декларації.',
      en: 'Given the lack of specific regulation, we strongly recommend consulting a tax lawyer before filing.',
      de: 'Aufgrund der fehlenden speziellen Regelung empfehlen wir dringend eine Beratung durch einen Steueranwalt vor der Abgabe der Erklärung.',
      fr: "En l'absence de réglementation spécifique, nous recommandons vivement de consulter un avocat fiscaliste avant toute déclaration.",
    },

    defiNotes: {
      uk: 'DeFi окремо не врегульовано. За аналогією з crypto-to-crypto обмінами, операції всередині протоколів (надання ліквідності, lending) імовірно не створюють податкового обов\'язку до моменту виведення у фіат, але це не підтверджено роз\'ясненнями ДПС. Консультація обов\'язкова.',
      en: 'DeFi is not separately regulated. By analogy with crypto-to-crypto exchanges, in-protocol operations (liquidity provision, lending) likely do not trigger tax until converted to fiat, but this is not confirmed by tax authority guidance. Consultation is essential.',
      de: 'DeFi ist nicht gesondert geregelt. In Analogie zu Krypto-zu-Krypto-Tausch lösen protokollinterne Vorgänge (Liquiditätsbereitstellung, Lending) vermutlich erst bei Umwandlung in Fiatgeld eine Steuer aus, dies ist jedoch nicht durch behördliche Leitlinien bestätigt. Eine Beratung ist unerlässlich.',
      fr: "La DeFi n'est pas réglementée séparément. Par analogie avec les échanges crypto-à-crypto, les opérations au sein des protocoles (fourniture de liquidité, prêt) ne déclenchent probablement pas d'imposition avant la conversion en monnaie fiduciaire, mais cela n'est pas confirmé par l'administration fiscale. Une consultation est indispensable.",
    },
  },

  {
    countryCode: 'DE',
    flagEmoji: '🇩🇪',
    countryName: { uk: 'Німеччина', en: 'Germany', de: 'Deutschland', fr: 'Allemagne' },
    primaryCurrency: 'EUR',
    status: 'stable',
    lastReviewed: '2026-06-20',
    sourceLabel: 'BMF-Schreiben vom 6. März 2025 (через Winheller Rechtsanwälte)',
    sourceUrl: 'https://www.winheller.com/en/banking-finance-and-insurance-law/bitcoin-trading/bitcoin-and-tax.html',

    capitalGainsCalculable: false,
    capitalGainsRate: undefined,
    capitalGainsRateNote: {
      uk: 'У межах строку утримання прибуток додається до загального доходу і оподатковується за прогресивною ставкою ПДФО (до 45% + надбавка солідарності 5,5%, можливо церковний податок).',
      en: 'Within the holding period, gains are added to total income and taxed at the progressive personal income tax rate (up to 45% + 5.5% solidarity surcharge, possibly church tax).',
      de: 'Innerhalb der Haltefrist wird der Gewinn dem übrigen Einkommen hinzugerechnet und mit dem progressiven Einkommensteuersatz besteuert (bis zu 45% zzgl. 5,5% Solidaritätszuschlag, ggf. Kirchensteuer).',
      fr: "Dans le délai de détention, le gain s'ajoute au revenu total et est imposé au taux progressif de l'impôt sur le revenu (jusqu'à 45% + 5,5% de surtaxe de solidarité, éventuellement l'impôt cultuel).",
    },
    capitalGainsAllowance: 1000,
    capitalGainsAllowanceCurrency: 'EUR',
    capitalGainsHoldingExemptionMonths: 12,
    capitalGainsNotes: {
      uk: 'Ключова пільга: продаж після утримання понад 12 місяців повністю звільнений від податку для приватних осіб. У межах 12 місяців діє поріг звільнення (Freigrenze) 1000 EUR на рік — але це поріг "все або нічого": якщо сумарний прибуток за рік досягає 1000 EUR, оподатковується вся сума, а не тільки перевищення.',
      en: 'Key relief: sales after a holding period of more than 12 months are fully tax-exempt for private individuals. Within 12 months, a €1,000/year exemption threshold (Freigrenze) applies — this is an all-or-nothing threshold: once total annual gains reach €1,000, the entire amount is taxed, not just the excess.',
      de: 'Wesentliche Vergünstigung: Verkäufe nach einer Haltefrist von mehr als 12 Monaten sind für Privatpersonen vollständig steuerfrei. Innerhalb von 12 Monaten gilt eine Freigrenze von 1.000 EUR pro Jahr — eine Alles-oder-nichts-Grenze: Wird die Freigrenze erreicht, ist der gesamte Betrag steuerpflichtig, nicht nur der übersteigende Teil.',
      fr: "Avantage clé : les ventes après une durée de détention de plus de 12 mois sont entièrement exonérées d'impôt pour les particuliers. Dans les 12 mois, un seuil d'exonération (Freigrenze) de 1 000 EUR/an s'applique — un seuil tout-ou-rien : si le gain annuel total atteint 1 000 EUR, la totalité est imposée, pas seulement l'excédent.",
    },

    stakingMiningCalculable: false,
    stakingMiningRateNote: {
      uk: 'Дохід від стейкінгу/майнінгу оподатковується за ринковою вартістю на момент отримання, за прогресивною ставкою ПДФО (до 45%). Стейкінг не подовжує строк утримання базового активу.',
      en: 'Staking/mining income is taxed at market value on receipt, at the progressive personal income tax rate (up to 45%). Staking does not extend the holding period of the underlying asset.',
      de: 'Einkünfte aus Staking/Mining werden zum Marktwert im Zeitpunkt des Zuflusses mit dem progressiven Einkommensteuersatz besteuert (bis zu 45%). Staking verlängert nicht die Haltefrist des zugrunde liegenden Vermögenswerts.',
      fr: "Les revenus de staking/mining sont imposés à la valeur de marché au moment de la réception, au taux progressif de l'impôt sur le revenu (jusqu'à 45%). Le staking ne prolonge pas la durée de détention de l'actif sous-jacent.",
    },
    stakingMiningAllowance: 256,
    stakingMiningAllowanceCurrency: 'EUR',
    stakingMiningNotes: {
      uk: 'Діє окремий поріг звільнення 256 EUR на рік для "інших доходів" (куди входить стейкінг). Так само за принципом "все або нічого": перевищення порогу — оподатковується вся сума.',
      en: 'A separate €256/year exemption threshold applies to "other income" (which includes staking). Same all-or-nothing principle: exceeding the threshold taxes the full amount.',
      de: 'Für "sonstige Einkünfte" (worunter Staking fällt) gilt eine gesonderte Freigrenze von 256 EUR pro Jahr. Ebenfalls nach dem Alles-oder-nichts-Prinzip: bei Überschreiten wird der gesamte Betrag besteuert.',
      fr: "Un seuil d'exonération distinct de 256 EUR/an s'applique aux « autres revenus » (incluant le staking). Même principe tout-ou-rien : au-delà du seuil, la totalité est imposée.",
    },

    defiNotes: {
      uk: 'BMF-роз\'яснення від 6.03.2025 торкається лендингу, але DeFi загалом залишається складною зоною: обмін токенів у пулах ліквідності може розглядатись як подія реалізації, що впливає на строк утримання. Рекомендуємо детальний розгляд кожної операції з юристом.',
      en: 'The BMF circular of 6 March 2025 addresses lending, but DeFi remains complex overall: token swaps within liquidity pools may be treated as disposal events affecting the holding period. We recommend a detailed review of each transaction with a lawyer.',
      de: 'Das BMF-Schreiben vom 6.3.2025 behandelt Lending, DeFi bleibt insgesamt aber komplex: Token-Tausch in Liquiditätspools kann als Veräußerungsvorgang gelten und die Haltefrist beeinflussen. Wir empfehlen eine detaillierte Prüfung jeder Transaktion mit einem Anwalt.',
      fr: "La circulaire du BMF du 6 mars 2025 traite du lending, mais la DeFi reste globalement complexe : l'échange de jetons dans les pools de liquidité peut être considéré comme un événement de cession affectant la durée de détention. Nous recommandons un examen détaillé de chaque opération avec un avocat.",
    },
  },

  {
    countryCode: 'PL',
    flagEmoji: '🇵🇱',
    countryName: { uk: 'Польща', en: 'Poland', de: 'Polen', fr: 'Pologne' },
    primaryCurrency: 'PLN',
    status: 'stable',
    lastReviewed: '2026-06-20',
    sourceLabel: 'Ustawa o PIT — формуляр PIT-38 (через Dudkowiak & Putyra)',
    sourceUrl: 'https://www.dudkowiak.com/blog/crypto-tax-in-poland-2025-guide/',

    capitalGainsCalculable: true,
    capitalGainsRate: 19,
    capitalGainsRateNote: {
      uk: 'Фіксована ставка 19% незалежно від суми прибутку — податок на дохід з капіталу (форма PIT-38).',
      en: 'Flat 19% rate regardless of gain amount — capital income tax (form PIT-38).',
      de: 'Pauschaler Satz von 19% unabhängig von der Gewinnhöhe — Kapitalertragsteuer (Formular PIT-38).',
      fr: 'Taux forfaitaire de 19% quel que soit le montant du gain — impôt sur les revenus du capital (formulaire PIT-38).',
    },
    capitalGainsAllowance: undefined,
    capitalGainsNotes: {
      uk: 'Порогу звільнення немає. Обмін криптовалюти на криптовалюту не оподатковується — податок виникає лише при обміні на фіат, товари чи послуги. До витрат зараховується лише вартість придбання та прямі комісії за транзакції.',
      en: 'No exemption threshold. Crypto-to-crypto exchanges are not taxable — tax arises only on exchange to fiat, goods or services. Only the acquisition cost and direct transaction fees are deductible.',
      de: 'Kein Freibetrag. Krypto-zu-Krypto-Tausch ist steuerfrei — die Steuer entsteht erst beim Tausch in Fiatgeld, Waren oder Dienstleistungen. Abzugsfähig sind nur die Anschaffungskosten und direkte Transaktionsgebühren.',
      fr: "Aucun seuil d'exonération. Les échanges crypto-à-crypto ne sont pas imposables — l'imposition n'intervient qu'à l'échange contre des monnaies fiduciaires, biens ou services. Seuls le coût d'acquisition et les frais de transaction directs sont déductibles.",
    },

    stakingMiningCalculable: true,
    stakingMiningRate: 19,
    stakingMiningRateNote: {
      uk: 'Сам факт майнінгу чи стейкінгу не створює податкового обов\'язку — оподатковується лише конвертація отриманих монет у фіат/товари/послуги, за тією ж ставкою 19%.',
      en: 'Mining or staking itself does not trigger tax — only converting the received coins to fiat/goods/services is taxed, at the same 19% rate.',
      de: 'Mining oder Staking an sich löst keine Steuer aus — besteuert wird nur die Umwandlung der erhaltenen Coins in Fiatgeld/Waren/Dienstleistungen, zum gleichen Satz von 19%.',
      fr: "Le minage ou le staking en tant que tel ne déclenche pas d'imposition — seule la conversion des jetons reçus en monnaie fiduciaire/biens/services est imposée, au même taux de 19%.",
    },
    stakingMiningNotes: {
      uk: 'Витрати на електроенергію та обладнання для майнінгу НЕ визнаються витратами, що зменшують базу оподаткування (позиція Верховного адміністративного суду, підтверджена у 2026 р.). База вартості для нагород стейкінгу — нульова, тому оподатковується повна сума при продажу.',
      en: 'Electricity and mining hardware costs are NOT recognized as deductible expenses (position of the Supreme Administrative Court, reaffirmed in 2026). The cost basis for staking rewards is zero, so the full amount is taxed on sale.',
      de: 'Stromkosten und Mining-Hardware werden NICHT als abzugsfähige Kosten anerkannt (Position des Obersten Verwaltungsgerichts, 2026 bestätigt). Die Anschaffungskosten für Staking-Rewards betragen null, sodass beim Verkauf der volle Betrag besteuert wird.',
      fr: "Les coûts d'électricité et de matériel de minage ne sont PAS reconnus comme charges déductibles (position de la Cour administrative suprême, confirmée en 2026). La base de coût des récompenses de staking est nulle, donc le montant total est imposé à la vente.",
    },

    defiNotes: {
      uk: 'DeFi окремо не врегульовано законом про ПДФО. Ймовірно застосовується той самий підхід, що й до crypto-to-crypto обмінів (без оподаткування до конвертації у фіат), але офіційних роз\'яснень немає. Рекомендуємо консультацію для складних DeFi-стратегій.',
      en: 'DeFi is not separately addressed in the PIT Act. The same approach as crypto-to-crypto exchanges likely applies (no tax until fiat conversion), but there is no official guidance. We recommend consultation for complex DeFi strategies.',
      de: 'DeFi wird im PIT-Gesetz nicht gesondert behandelt. Vermutlich gilt der gleiche Ansatz wie bei Krypto-zu-Krypto-Tausch (keine Steuer bis zur Umwandlung in Fiatgeld), es gibt jedoch keine offizielle Leitlinie. Für komplexe DeFi-Strategien empfehlen wir eine Beratung.',
      fr: "La DeFi n'est pas traitée séparément dans la loi PIT. La même approche que pour les échanges crypto-à-crypto s'applique probablement (pas d'imposition avant la conversion en monnaie fiduciaire), mais il n'existe pas de directive officielle. Nous recommandons une consultation pour les stratégies DeFi complexes.",
    },
  },

  {
    countryCode: 'FR',
    flagEmoji: '🇫🇷',
    countryName: { uk: 'Франція', en: 'France', de: 'Frankreich', fr: 'France' },
    primaryCurrency: 'EUR',
    status: 'stable',
    lastReviewed: '2026-06-20',
    sourceLabel: 'DGFiP — Prélèvement Forfaitaire Unique (через Blockpit / CMS Law)',
    sourceUrl: 'https://cms.law/en/int/expert-guides/cms-expert-guide-on-taxation-of-crypto-assets/france',

    capitalGainsCalculable: true,
    capitalGainsRate: 31.4,
    capitalGainsRateNote: {
      uk: 'Єдиний фіксований податок (PFU/"flat tax") — 12,8% податку на дохід + 18,6% соціальних внесків = 31,4% (з 2026 р., після підвищення CSG на 1,4 п.п.; у 2025 р. було 30%).',
      en: 'Flat tax (PFU) — 12.8% income tax + 18.6% social charges = 31.4% (as of 2026, after a 1.4pp CSG increase; it was 30% in 2025).',
      de: 'Einheitssteuer (PFU/"flat tax") — 12,8% Einkommensteuer + 18,6% Sozialabgaben = 31,4% (Stand 2026, nach einer Erhöhung der CSG um 1,4 Prozentpunkte; 2025 waren es 30%).',
      fr: "Prélèvement Forfaitaire Unique (PFU) — 12,8% d'impôt sur le revenu + 18,6% de prélèvements sociaux = 31,4% (depuis 2026, après une hausse de la CSG de 1,4 point ; 30% en 2025).",
    },
    capitalGainsAllowance: 305,
    capitalGainsAllowanceCurrency: 'EUR',
    capitalGainsNotes: {
      uk: 'Застосовується до "випадкових" (непрофесійних) інвесторів — з 2023 р. частота/обсяг угод більше не визначає професійний статус. Річний оборот продажів до 305 EUR звільнений від податку. Можна обрати прогресивну шкалу ПДФО замість PFU, якщо це вигідніше.',
      en: 'Applies to "occasional" (non-professional) investors — since 2023, trading frequency/volume no longer determines professional status. Annual sales turnover up to €305 is tax-exempt. Taxpayers may opt for the progressive income tax scale instead of the PFU if more favorable.',
      de: 'Gilt für "gelegentliche" (nicht-professionelle) Anleger — seit 2023 bestimmt Handelshäufigkeit/-volumen nicht mehr den professionellen Status. Ein jährlicher Verkaufsumsatz bis 305 EUR ist steuerfrei. Anstelle der PFU kann die progressive Einkommensteuerskala gewählt werden, falls günstiger.',
      fr: "S'applique aux investisseurs « occasionnels » (non professionnels) — depuis 2023, la fréquence/le volume des transactions ne détermine plus le statut professionnel. Un chiffre d'affaires annuel de cessions jusqu'à 305 EUR est exonéré. Le barème progressif de l'IR peut être choisi à la place du PFU si plus avantageux.",
    },

    stakingMiningCalculable: false,
    stakingMiningRateNote: {
      uk: 'Дохід від майнінгу класифікується як "не комерційний прибуток" (BNC) і оподатковується за прогресивною шкалою ПДФО (до 45%). DGFiP ще не опублікував офіційних роз\'яснень щодо стейкінгу — фахівці зазвичай застосовують той самий режим BNC.',
      en: 'Mining income is classified as "non-commercial profits" (BNC) and taxed at the progressive income tax scale (up to 45%). The DGFiP has not yet published official guidance on staking — practitioners generally apply the same BNC regime.',
      de: 'Mining-Einkünfte werden als "nicht-kommerzielle Gewinne" (BNC) eingestuft und nach der progressiven Einkommensteuerskala besteuert (bis zu 45%). Die DGFiP hat noch keine offizielle Leitlinie zum Staking veröffentlicht — in der Praxis wird meist dasselbe BNC-Regime angewandt.',
      fr: "Les revenus de minage sont classés en Bénéfices Non Commerciaux (BNC) et imposés au barème progressif de l'IR (jusqu'à 45%). La DGFiP n'a pas encore publié de doctrine officielle sur le staking — les praticiens appliquent généralement le même régime BNC.",
    },
    stakingMiningNotes: {
      uk: 'Режим micro-BNC (річний оборот до 77 700 EUR) дає автоматичну знижку 34% від обороту перед оподаткуванням — оподатковується лише 66% доходу. Через прогресивність та можливість вибору режиму точний розрахунок вимагає аналізу загального доходу платника.',
      en: 'The micro-BNC regime (annual turnover up to €77,700) gives an automatic 34% deduction from turnover before tax — only 66% of income is taxable. Because of the progressive scale and regime choice, an exact calculation requires analysis of the taxpayer\'s total income.',
      de: 'Die Micro-BNC-Regelung (Jahresumsatz bis 77.700 EUR) gewährt einen automatischen Abschlag von 34% auf den Umsatz vor Steuer — nur 66% des Einkommens sind steuerpflichtig. Aufgrund der Progression und der Regimewahl erfordert eine genaue Berechnung eine Analyse des Gesamteinkommens.',
      fr: "Le régime micro-BNC (chiffre d'affaires annuel jusqu'à 77 700 EUR) applique un abattement automatique de 34% sur le chiffre d'affaires avant imposition — seuls 66% du revenu sont imposables. En raison de la progressivité et du choix de régime, un calcul exact nécessite une analyse du revenu global du contribuable.",
    },

    defiNotes: {
      uk: 'DeFi залишається "сірою зоною" — DGFiP не публікував спеціальних роз\'яснень. Фахівці зазвичай застосовують режим BNC за аналогією зі стейкінгом/майнінгом, але трактування може відрізнятись залежно від типу протоколу (лендинг, пули ліквідності, yield farming). Консультація обов\'язкова перед декларуванням.',
      en: 'DeFi remains a "grey area" — the DGFiP has not published specific guidance. Practitioners generally apply the BNC regime by analogy with staking/mining, but treatment can vary by protocol type (lending, liquidity pools, yield farming). Consultation is essential before filing.',
      de: 'DeFi bleibt eine "Grauzone" — die DGFiP hat keine spezielle Leitlinie veröffentlicht. In der Praxis wird meist analog zu Staking/Mining das BNC-Regime angewandt, die Behandlung kann jedoch je nach Protokolltyp (Lending, Liquiditätspools, Yield Farming) variieren. Vor der Erklärung ist eine Beratung unerlässlich.',
      fr: "La DeFi reste une « zone grise » — la DGFiP n'a publié aucune doctrine spécifique. Les praticiens appliquent généralement le régime BNC par analogie avec le staking/minage, mais le traitement peut varier selon le type de protocole (prêt, pools de liquidité, yield farming). Une consultation est indispensable avant toute déclaration.",
    },
  },

  {
    countryCode: 'CH',
    flagEmoji: '🇨🇭',
    countryName: { uk: 'Швейцарія', en: 'Switzerland', de: 'Schweiz', fr: 'Suisse' },
    primaryCurrency: 'CHF',
    status: 'stable',
    lastReviewed: '2026-06-20',
    sourceLabel: 'Federal Tax Administration (через CoinTracking / Blockpit)',
    sourceUrl: 'https://cointracking.info/tax-guides/switzerland/guide/',

    capitalGainsCalculable: true,
    capitalGainsRate: 0,
    capitalGainsRateNote: {
      uk: 'Приріст капіталу від продажу крипто повністю звільнений від податку для приватних інвесторів — Швейцарія оподатковує не сам прибуток, а активи (податок на майно).',
      en: 'Capital gains from selling crypto are fully tax-exempt for private investors — Switzerland taxes the assets themselves (wealth tax), not the gain.',
      de: 'Kapitalgewinne aus dem Verkauf von Krypto sind für Privatanleger vollständig steuerfrei — die Schweiz besteuert nicht den Gewinn, sondern das Vermögen selbst (Vermögenssteuer).',
      fr: "Les plus-values sur la vente de crypto sont totalement exonérées d'impôt pour les investisseurs privés — la Suisse taxe les actifs eux-mêmes (impôt sur la fortune), pas le gain.",
    },
    capitalGainsNotes: {
      uk: 'Натомість усі криптоактиви щороку оподатковуються податком на майно (Vermögenssteuer) за їхньою вартістю на кінець року — ставка 0,3–1% залежно від кантону, з неоподатковуваним порогом близько 100 000 CHF на особу. Звільнення діє лише для "приватних" інвесторів — статус "професійного трейдера" (залежить від частоти угод, використання плеча, співвідношення прибутку до доходу) призводить до оподаткування прибутку як доходу від підприємницької діяльності.',
      en: 'Instead, all crypto holdings are subject to an annual wealth tax (Vermögenssteuer) on their year-end value — 0.3–1% depending on canton, with an exemption threshold of roughly CHF 100,000 per person. The exemption applies only to "private" investors — "professional trader" status (based on trading frequency, use of leverage, and the ratio of gains to income) causes gains to be taxed as business income instead.',
      de: 'Stattdessen unterliegen alle Krypto-Bestände jährlich der Vermögenssteuer auf den Wert zum Jahresende — 0,3–1% je nach Kanton, mit einem Freibetrag von rund CHF 100.000 pro Person. Die Befreiung gilt nur für "private" Anleger — der Status als "gewerbsmäßiger Händler" (abhängig von Handelshäufigkeit, Hebeleinsatz und dem Verhältnis von Gewinn zu Einkommen) führt dazu, dass Gewinne stattdessen als Geschäftseinkommen besteuert werden.',
      fr: "En contrepartie, tous les avoirs crypto sont soumis chaque année à l'impôt sur la fortune (Vermögenssteuer) sur leur valeur en fin d'année — 0,3 à 1% selon le canton, avec un seuil d'exonération d'environ 100 000 CHF par personne. L'exonération ne s'applique qu'aux investisseurs « privés » — le statut de « trader professionnel » (fondé sur la fréquence des transactions, l'usage de l'effet de levier et le ratio gains/revenus) entraîne une imposition des gains comme revenu d'activité.",
    },

    stakingMiningCalculable: false,
    stakingMiningRateNote: {
      uk: 'Дохід від стейкінгу та майнінгу оподатковується як дохід від рухомого майна за прогресивною ставкою податку на дохід (федеральний + кантональний + муніципальний), що залежить від кантону та загального доходу платника.',
      en: 'Staking and mining income is taxed as income from movable assets at the progressive income tax rate (federal + cantonal + municipal), which depends on the canton and the taxpayer\'s total income.',
      de: 'Einkünfte aus Staking und Mining werden als Einkommen aus beweglichem Vermögen zum progressiven Einkommensteuersatz besteuert (Bund + Kanton + Gemeinde), abhängig vom Kanton und dem Gesamteinkommen der steuerpflichtigen Person.',
      fr: "Les revenus de staking et de minage sont imposés comme des revenus de capitaux mobiliers au taux progressif de l'impôt sur le revenu (fédéral + cantonal + communal), qui dépend du canton et du revenu total du contribuable.",
    },
    stakingMiningNotes: {
      uk: 'Оцінюється за ринковою вартістю CHF на день отримання нагороди. Через кантональні відмінності (26 кантонів із власними ставками) точний розрахунок неможливий без вказання кантону проживання.',
      en: 'Valued at the CHF market price on the day the reward is received. Because of cantonal differences (26 cantons with their own rates), an exact calculation isn\'t possible without specifying the canton of residence.',
      de: 'Bewertung zum CHF-Marktwert am Tag des Zuflusses. Aufgrund kantonaler Unterschiede (26 Kantone mit eigenen Sätzen) ist eine genaue Berechnung ohne Angabe des Wohnkantons nicht möglich.',
      fr: "Évalué à la valeur de marché en CHF le jour de la réception. En raison des différences cantonales (26 cantons avec leurs propres taux), un calcul exact n'est pas possible sans préciser le canton de résidence.",
    },

    defiNotes: {
      uk: 'Федеральна податкова адміністрація не публікувала вичерпних роз\'яснень щодо DeFi. Дохід від лендингу зазвичай трактується за аналогією зі стейкінгом (дохід від рухомого майна). З 2027 року очікується розширена міжнародна звітність по крипто-провайдерах (CARF). Рекомендуємо консультацію з урахуванням кантону.',
      en: 'The Federal Tax Administration has not published comprehensive DeFi guidance. Lending income is generally treated by analogy with staking (income from movable assets). Expanded international crypto-provider reporting (CARF) is expected from 2027. We recommend consultation that accounts for your canton.',
      de: 'Die Eidgenössische Steuerverwaltung hat keine umfassende Leitlinie zu DeFi veröffentlicht. Lending-Erträge werden meist analog zum Staking behandelt (Einkommen aus beweglichem Vermögen). Ab 2027 wird eine erweiterte internationale Meldepflicht für Krypto-Anbieter (CARF) erwartet. Wir empfehlen eine Beratung unter Berücksichtigung Ihres Kantons.',
      fr: "L'Administration fédérale des contributions n'a pas publié de doctrine complète sur la DeFi. Les revenus de prêt sont généralement traités par analogie avec le staking (revenus de capitaux mobiliers). Une déclaration internationale élargie pour les prestataires crypto (CARF) est attendue dès 2027. Nous recommandons une consultation tenant compte de votre canton.",
    },
  },

  {
    countryCode: 'LT',
    flagEmoji: '🇱🇹',
    countryName: { uk: 'Литва', en: 'Lithuania', de: 'Litauen', fr: 'Lituanie' },
    primaryCurrency: 'EUR',
    status: 'stable',
    statusNote: {
      uk: 'З 1 січня 2026 року набула чинності податкова реформа: більшість видів доходу фізосіб, включно з прибутком від продажу крипто, тепер підсумовується і оподатковується за прогресивною шкалою замість колишньої фіксованої ставки 15%.',
      en: 'A tax reform took effect on 1 January 2026: most types of individual income, including crypto sale gains, are now aggregated and taxed at progressive rates instead of the former flat 15% rate.',
      de: 'Am 1. Januar 2026 trat eine Steuerreform in Kraft: Die meisten Einkommensarten natürlicher Personen, einschließlich Gewinnen aus dem Verkauf von Krypto, werden nun zusammengerechnet und progressiv besteuert statt zum bisherigen Pauschalsatz von 15%.',
      fr: "Une réforme fiscale est entrée en vigueur le 1er janvier 2026 : la plupart des types de revenus des particuliers, y compris les gains de cession de crypto, sont désormais agrégés et imposés à des taux progressifs au lieu de l'ancien taux forfaitaire de 15%.",
    },
    lastReviewed: '2026-06-20',
    sourceLabel: 'PwC Lithuania Individual Tax Summary',
    sourceUrl: 'https://taxsummaries.pwc.com/lithuania/individual/significant-developments',

    capitalGainsCalculable: false,
    capitalGainsRateNote: {
      uk: 'З 2026 року прибуток від продажу крипто підсумовується з іншими доходами і оподатковується прогресивно: 20% до ~82 962 EUR на рік, 25% від ~82 963 до ~138 270 EUR, 32% понад цю суму.',
      en: 'Since 2026, crypto sale gains are aggregated with other income and taxed progressively: 20% up to ~€82,962/year, 25% from ~€82,963 to ~€138,270, 32% above that.',
      de: 'Seit 2026 werden Gewinne aus dem Verkauf von Krypto mit anderen Einkünften zusammengerechnet und progressiv besteuert: 20% bis ca. 82.962 EUR/Jahr, 25% von ca. 82.963 bis ca. 138.270 EUR, 32% darüber.',
      fr: "Depuis 2026, les gains de cession de crypto sont agrégés aux autres revenus et imposés progressivement : 20% jusqu'à ~82 962 EUR/an, 25% de ~82 963 à ~138 270 EUR, 32% au-delà.",
    },
    capitalGainsAllowance: 2500,
    capitalGainsAllowanceCurrency: 'EUR',
    capitalGainsNotes: {
      uk: 'До реформи діяв неоподатковуваний поріг 2500 EUR на рік для доходу від продажу особистого майна (включно з крипто) — за наявною інформацією поріг продовжує застосовуватись, але це варто перевірити окремо з урахуванням змін 2026 року. Через прогресивність та агрегацію з іншими доходами точний розрахунок вимагає аналізу повної податкової ситуації платника.',
      en: 'Before the reform, a €2,500/year non-taxable threshold applied to income from selling personal assets (including crypto) — available information suggests the threshold continues to apply, but this should be verified separately given the 2026 changes. Because of progressivity and aggregation with other income, an exact calculation requires analysis of the taxpayer\'s full tax situation.',
      de: 'Vor der Reform galt ein jährlicher Freibetrag von 2.500 EUR für Einkünfte aus dem Verkauf persönlicher Vermögenswerte (einschließlich Krypto) — verfügbare Informationen deuten darauf hin, dass der Freibetrag weiterhin gilt, dies sollte jedoch angesichts der Änderungen 2026 gesondert geprüft werden. Aufgrund der Progression und der Zusammenrechnung mit anderen Einkünften erfordert eine genaue Berechnung eine Analyse der gesamten steuerlichen Situation.',
      fr: "Avant la réforme, un seuil non imposable de 2 500 EUR/an s'appliquait aux revenus de cession de biens personnels (y compris crypto) — les informations disponibles suggèrent que ce seuil continue de s'appliquer, mais cela doit être vérifié séparément compte tenu des changements de 2026. En raison de la progressivité et de l'agrégation avec d'autres revenus, un calcul exact nécessite une analyse de la situation fiscale complète du contribuable.",
    },

    stakingMiningCalculable: false,
    stakingMiningRateNote: {
      uk: 'Дохід від майнінгу, що кваліфікується як індивідуальна діяльність, оподатковувався за ставкою 15%; з 2026 року також підпадає під нові прогресивні ставки 20/25/32% у сукупності з іншими доходами.',
      en: 'Mining income qualifying as individual activity was taxed at 15%; from 2026 it is also subject to the new progressive 20/25/32% rates in aggregate with other income.',
      de: 'Mining-Einkünfte, die als individuelle Tätigkeit gelten, wurden mit 15% besteuert; ab 2026 unterliegen sie zusammen mit anderen Einkünften ebenfalls den neuen progressiven Sätzen von 20/25/32%.',
      fr: "Les revenus de minage qualifiés d'activité individuelle étaient imposés à 15% ; depuis 2026, ils sont également soumis aux nouveaux taux progressifs de 20/25/32% en agrégation avec les autres revenus.",
    },
    stakingMiningNotes: {
      uk: 'Класифікація стейкінгу окремо від майнінгу в литовському законодавстві прописана не так чітко — рекомендуємо консультацію для визначення правильної категорії доходу.',
      en: 'Lithuanian law does not clearly distinguish staking from mining for classification purposes — we recommend consultation to determine the correct income category.',
      de: 'Das litauische Recht unterscheidet Staking nicht eindeutig von Mining für Klassifikationszwecke — wir empfehlen eine Beratung zur Bestimmung der richtigen Einkommenskategorie.',
      fr: "Le droit lituanien ne distingue pas clairement le staking du minage à des fins de classification — nous recommandons une consultation pour déterminer la catégorie de revenu correcte.",
    },

    defiNotes: {
      uk: 'Офіційних роз\'яснень щодо DeFi литовська податкова інспекція (VMI) не публікувала. Враховуючи щойно запроваджену реформу агрегованого прогресивного оподаткування, ми рекомендуємо консультацію перед будь-якими DeFi-операціями зі значними сумами.',
      en: 'Lithuania\'s tax inspectorate (VMI) has not published official DeFi guidance. Given the newly introduced aggregated progressive taxation reform, we recommend consultation before any significant DeFi transactions.',
      de: 'Die litauische Steuerinspektion (VMI) hat keine offizielle Leitlinie zu DeFi veröffentlicht. Angesichts der neu eingeführten Reform der aggregierten progressiven Besteuerung empfehlen wir eine Beratung vor größeren DeFi-Transaktionen.',
      fr: "L'inspection fiscale lituanienne (VMI) n'a pas publié de doctrine officielle sur la DeFi. Compte tenu de la réforme récemment introduite d'imposition progressive agrégée, nous recommandons une consultation avant toute opération DeFi significative.",
    },
  },

  {
    countryCode: 'US',
    flagEmoji: '🇺🇸',
    countryName: { uk: 'США (федеральний рівень)', en: 'USA (federal level)', de: 'USA (Bundesebene)', fr: 'États-Unis (niveau fédéral)' },
    primaryCurrency: 'USD',
    status: 'stable',
    statusNote: {
      uk: 'Показані лише федеральні (IRS) ставки. Більшість штатів додатково стягують власний податок на дохід/приріст капіталу (від 0% у штатах без податку на дохід до понад 13% у Каліфорнії) — тут не враховано.',
      en: 'Only federal (IRS) rates are shown. Most states additionally levy their own income/capital gains tax (from 0% in no-income-tax states to over 13% in California) — not accounted for here.',
      de: 'Es werden nur die föderalen (IRS-)Sätze angezeigt. Die meisten Bundesstaaten erheben zusätzlich eine eigene Einkommens-/Kapitalertragsteuer (von 0% in Staaten ohne Einkommensteuer bis über 13% in Kalifornien) — hier nicht berücksichtigt.',
      fr: "Seuls les taux fédéraux (IRS) sont indiqués. La plupart des États prélèvent en plus leur propre impôt sur le revenu/les plus-values (de 0% dans les États sans impôt sur le revenu à plus de 13% en Californie) — non pris en compte ici.",
    },
    lastReviewed: '2026-06-20',
    sourceLabel: 'IRS — Digital Assets (irs.gov)',
    sourceUrl: 'https://www.irs.gov/filing/digital-assets',

    capitalGainsCalculable: false,
    capitalGainsRateNote: {
      uk: 'Короткострокові операції (актив утримувався ≤1 року) оподатковуються як звичайний дохід за федеральною прогресивною шкалою 10–37%. Довгострокові (утримання понад 1 рік) — за пільговими ставками приросту капіталу 0%, 15% або 20% залежно від загального доходу. Для високодохідних платників може додатково застосовуватись 3,8% податок на чистий інвестиційний дохід (NIIT).',
      en: 'Short-term transactions (asset held ≤1 year) are taxed as ordinary income at the federal progressive rate of 10–37%. Long-term (held over 1 year) — at preferential capital gains rates of 0%, 15%, or 20% depending on total income. Higher earners may also owe an additional 3.8% Net Investment Income Tax (NIIT).',
      de: 'Kurzfristige Transaktionen (Vermögenswert ≤1 Jahr gehalten) werden als ordentliches Einkommen zum progressiven Bundessatz von 10–37% besteuert. Langfristig (über 1 Jahr gehalten) — zu ermäßigten Kapitalertragssätzen von 0%, 15% oder 20%, abhängig vom Gesamteinkommen. Für Besserverdiener kann zusätzlich die 3,8%ige Net Investment Income Tax (NIIT) anfallen.',
      fr: "Les transactions à court terme (actif détenu ≤1 an) sont imposées comme un revenu ordinaire au taux fédéral progressif de 10 à 37%. À long terme (détention de plus d'un an) — aux taux préférentiels de plus-values de 0%, 15% ou 20% selon le revenu total. Les contribuables à revenus élevés peuvent également devoir la taxe supplémentaire de 3,8% sur le revenu net d'investissement (NIIT).",
    },
    capitalGainsNotes: {
      uk: 'З 2026 року централізовані криптобіржі, що працюють у США, зобов\'язані звітувати про прибутки/збитки до IRS через форму 1099-DA. Точний розрахунок неможливий без знання загального річного доходу та штату проживання.',
      en: 'As of 2026, centralized crypto exchanges operating in the US are required to report gains/losses to the IRS via Form 1099-DA. An exact calculation isn\'t possible without knowing total annual income and state of residence.',
      de: 'Ab 2026 müssen zentralisierte Krypto-Börsen, die in den USA tätig sind, Gewinne/Verluste dem IRS über Formular 1099-DA melden. Eine genaue Berechnung ist ohne Kenntnis des gesamten Jahreseinkommens und des Wohnsitzstaats nicht möglich.',
      fr: "Depuis 2026, les plateformes d'échange crypto centralisées opérant aux États-Unis doivent déclarer les gains/pertes à l'IRS via le formulaire 1099-DA. Un calcul exact n'est pas possible sans connaître le revenu annuel total et l'État de résidence.",
    },

    stakingMiningCalculable: false,
    stakingMiningRateNote: {
      uk: 'Нагороди від стейкінгу та майнінгу оподатковуються як звичайний дохід за ринковою вартістю на момент отримання, за тією ж прогресивною шкалою 10–37%, що й короткострокові операції.',
      en: 'Staking and mining rewards are taxed as ordinary income at fair market value on receipt, at the same progressive 10–37% scale as short-term transactions.',
      de: 'Staking- und Mining-Belohnungen werden als ordentliches Einkommen zum Marktwert im Zeitpunkt des Zuflusses besteuert, nach derselben progressiven Skala von 10–37% wie kurzfristige Transaktionen.',
      fr: "Les récompenses de staking et de minage sont imposées comme un revenu ordinaire à la juste valeur marchande à la réception, selon le même barème progressif de 10 à 37% que les transactions à court terme.",
    },
    stakingMiningNotes: {
      uk: 'Подальший продаж отриманих нагород створює окрему подію приросту капіталу з базою вартості, що дорівнює їхній ринковій вартості на момент отримання.',
      en: 'Later selling the received rewards creates a separate capital gains event, with a cost basis equal to their market value at the time of receipt.',
      de: 'Der spätere Verkauf der erhaltenen Belohnungen stellt ein separates Kapitalgewinnereignis dar, mit Anschaffungskosten in Höhe ihres Marktwerts zum Zeitpunkt des Zuflusses.',
      fr: "La vente ultérieure des récompenses reçues constitue un événement de plus-value distinct, avec une base de coût égale à leur valeur de marché au moment de la réception.",
    },

    defiNotes: {
      uk: 'IRS не опублікував вичерпних роз\'яснень щодо DeFi. Серед практиків триває дискусія, чи створює надання ліквідності подію реалізації активу. Через складність і відсутність чіткої позиції IRS консультація обов\'язкова перед значними DeFi-операціями.',
      en: 'The IRS has not published comprehensive DeFi guidance. There is ongoing debate among practitioners about whether providing liquidity constitutes a taxable disposal event. Given the complexity and lack of a clear IRS position, consultation is essential before significant DeFi transactions.',
      de: 'Der IRS hat keine umfassende Leitlinie zu DeFi veröffentlicht. Unter Praktikern besteht anhaltende Debatte darüber, ob die Bereitstellung von Liquidität ein steuerpflichtiges Veräußerungsereignis darstellt. Angesichts der Komplexität und der fehlenden klaren IRS-Position ist vor größeren DeFi-Transaktionen eine Beratung unerlässlich.',
      fr: "L'IRS n'a pas publié de doctrine complète sur la DeFi. Un débat persiste parmi les praticiens quant à savoir si la fourniture de liquidité constitue un événement de cession imposable. Compte tenu de la complexité et de l'absence de position claire de l'IRS, une consultation est indispensable avant toute opération DeFi significative.",
    },
  },
];
