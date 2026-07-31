// Content for /reports/digital-assets-cross-border-2026/ — transcribed from
// the client-supplied PDF "Digital Assets & Cross-Border Legal Risk Outlook
// 2026" (Ганган і Партнери, Київ, 30 липня 2026 року). Kept as structured
// data rather than JSON translation strings because this report is
// Ukrainian-only for now (per the SEO brief's own phasing — English/German/
// French are an explicit "stage 2"), so the next-intl layer isn't needed here.

export type ReportTableRow = Record<string, string>;

export type ReportSection = {
  id: string;
  tag: string;
  title: string;
  intro?: string;
  callout?: { title: string; text: string };
  table?: { headers: string[]; rows: ReportTableRow[] };
  bullets?: string[];
  bulletsTitle?: string;
  conclusion?: { title: string; text: string };
  sources?: string;
};

export const reportMeta = {
  title: 'Digital Assets & Cross-Border Legal Risk Outlook 2026',
  subtitle: 'Віртуальні активи та транскордонні юридичні ризики: Україна — Європейський Союз',
  focusTags: [
    'MiCA', 'вихід українських проєктів до ЄС', 'AML/Travel Rule', 'DAC8', 'санкції',
    'криптозлочини', 'електронні докази', 'повернення активів',
  ],
  location: 'Київ',
  date: '30 липня 2026 року',
  dateIso: '2026-07-30',
  author: "В'ячеслав Ганган",
  org: 'Ганган і Партнери',
  pdfUrl: '/reports/digital-assets-cross-border-2026.pdf',
};

export const executiveBrief = {
  thesis:
    'Для криптопроєкту більше недостатньо правильно назвати продукт. Регулятори оцінюють, що він фактично робить: зберігає активи, виконує переказ, організовує торгівлю, надає кредит, залучає інвестиції чи забезпечує платіж.',
  table: {
    headers: ['Контур', 'Що змінилося'],
    rows: [
      { 'Контур': 'ЄС', 'Що змінилося': 'Максимальний перехідний режим MiCA для попередніх провайдерів завершився 1 липня 2026 року. Активне залучення клієнтів ЄС без належної авторизації стало гострішим ризиком.' },
      { 'Контур': 'Україна', 'Що змінилося': 'Закон № 2074-IX станом на дату звіту не набрав чинності. Законопроєкт № 10225-д готується до другого читання; очікувані правила не можна видавати за чинні.' },
      { 'Контур': 'AML', 'Що змінилося': 'Travel Rule стає глобальним стандартом операційної інфраструктури. FATF повідомляє: 83% опитаних юрисдикцій уже ухвалили відповідне законодавство.' },
      { 'Контур': 'Податки', 'Що змінилося': 'DAC8 діє з 1 січня 2026 року: провайдери почали збирати дані про reportable transactions користувачів — податкових резидентів ЄС.' },
      { 'Контур': 'Спори', 'Що змінилося': 'Шанс на freezing і повернення активів найбільше залежить від швидкого збереження wallet addresses, transaction hashes, логів доступу та комунікацій.' },
    ],
  },
  audience:
    'Звіт призначений для українських засновників, інвесторів, фінтех- і Web3-команд, провайдерів OTC, кастодіальних і платіжних рішень, а також бізнесу, який приймає криптоактиви або стикається з блокуванням, шахрайством чи транскордонним розслідуванням.',
};

// The 7-10 "key findings" pulled from the callout/conclusion boxes across
// the report — satisfies TZ 8.2's "7-10 ключових висновків" requirement.
export const keyFindings = [
  'Максимальний перехідний режим MiCA для попередніх CASP завершився 1 липня 2026 року — активне залучення клієнтів ЄС без авторизації стало гострішим ризиком.',
  'Закон України № 2074-IX «Про віртуальні активи» ухвалений, але досі не набрав чинності; законопроєкт № 10225-д — лише проєкт, а не чинне право.',
  'Токенізація не змінює економічну сутність операції: НБУ кваліфікував позики в USDT сервісу Crypsee як фактичне споживче кредитування без належного регуляторного режиму.',
  'Reverse solicitation (ст. 61 MiCA) — вузький виняток, який тлумачиться обмежено і не виправдовує таргетовану рекламу чи EU-мовні кампанії.',
  '83% опитаних юрисдикцій FATF уже ухвалили законодавство про Travel Rule, але майже половина з них ще не проводила пов’язаних enforcement-дій.',
  'DAC8 діє з 1 січня 2026 року: провайдери вже збирають self-certification і дані про reportable transactions користувачів — податкових резидентів ЄС.',
  'ЄС прямо включає crypto-assets до санкційного режиму: перевірка виходить за межі імені й охоплює wallet-адреси, кластери та контроль.',
  'У кіберінцидентах блокчейн зазвичай залишається технічно справним — активи втрачаються через компрометацію людини: seed phrase, session token, SIM swap, соціальну інженерію.',
  'Швидкість перших 48 годин після інциденту — визначальний фактор для збереження доказів і реального шансу на freezing та повернення активів.',
  'З 18 серпня 2026 року діє Регламент ЄС про e-Evidence (European Production/Preservation Orders) — новий інструмент транскордонного збору електронних доказів.',
];

export const sections: ReportSection[] = [
  {
    id: 'ukraine',
    tag: 'UKRAINE',
    title: '1. Україна: ринок існує, повна рамка ще формується',
    intro:
      'Закон України № 2074-IX «Про віртуальні активи» ухвалений у 2022 році, але офіційна база Верховної Ради позначає його як такий, що не набрав чинності. Паралельно законопроєкт № 10225-д 3 вересня 2025 року прийнято за основу з доопрацюванням; станом на 30 липня 2026 року він готується до другого читання.',
    callout: {
      title: 'Юридичне правило обережності',
      text: 'У презентаціях, договорах і legal opinions слід чітко розділяти: (1) чинне право; (2) ухвалений, але нечинний Закон № 2074-IX; (3) положення законопроєкту № 10225-д, які можуть змінитися до остаточного голосування.',
    },
    bulletsTitle: 'Що вже діє незалежно від спеціального закону',
    bullets: [
      "цивільне, господарське та корпоративне право — для договорів, прав на програмний код, токеноміки, відповідальності та відшкодування;",
      'законодавство про фінансові та платіжні послуги — якщо економічна сутність продукту відповідає регульованій послузі;',
      'законодавство про фінансовий моніторинг — для належної перевірки, походження активів і підозрілих операцій у межах його чинної сфери;',
      'податкове, валютне, споживче, рекламне та санкційне законодавство;',
      "кримінальне і кримінальне процесуальне право — у справах про шахрайство, несанкціонований доступ, легалізацію доходів, арешт і спеціальну конфіскацію.",
    ],
    conclusion: {
      title: 'Практичний висновок',
      text: '«Правового вакууму» немає. Проєкт може одночасно потрапити під декілька чинних режимів, а кваліфікація залежатиме від фактичних грошових потоків, договорів, реклами та розподілу контролю.',
    },
    sources: "Закон України № 2074-IX «Про віртуальні активи» • Законопроєкт № 10225-д • Закон України № 361-IX про фінансовий моніторинг • НБУ: концепція регулювання ринку VA • НКЦПФР: законодавче регулювання VA",
  },
  {
    id: 'token-function',
    tag: 'REGULATORY SIGNAL',
    title: '2. Функція продукту важливіша за назву токена',
    intro:
      '2 квітня 2026 року НБУ повідомив про заборону діяльності онлайн-сервісу Crypsee: формальні позики в USDT за результатами аналізу правочинів були кваліфіковані як фактичне гривневе споживче кредитування без належного регуляторного режиму. НБУ послався на зміст договорів, реальні розрахунки, вартість кредиту, розкриття інформації та захист споживачів.',
    callout: {
      title: 'Сигнал для ринку',
      text: 'Токенізація не «переписує» економічну сутність операції. USDT, smart contract або нерезидент у структурі не усувають вимоги, що застосовуються до фактичної фінансової послуги.',
    },
    table: {
      headers: ['Крок', 'Питання'],
      rows: [
        { 'Крок': '1. Актив', 'Питання': 'Що отримує користувач: право вимоги, частку прибутку, доступ, платіжний інструмент, забезпечення чи лише цифровий запис?' },
        { 'Крок': '2. Послуга', 'Питання': 'Хто контролює ключі, виконує перекази, обмін, кастодію, matching orders, розміщення або консультацію?' },
        { 'Крок': '3. Грошовий потік', 'Питання': 'У якій валюті фактично видаються та повертаються кошти; хто приймає spread, fee, interest або performance return?' },
        { 'Крок': '4. Маркетинг', 'Питання': 'Кому і де адресована реклама; чи обіцяє вона дохідність, ліквідність, кредит або захист капіталу?' },
        { 'Крок': '5. Контроль', 'Питання': 'Хто може змінити smart contract, заблокувати wallet, оновити protocol, вилучити liquidity або зупинити операцію?' },
        { 'Крок': '6. Юрисдикція', 'Питання': 'Де перебувають клієнти, команда, сервери, банк, кастодіан та особа, яка приймає ключові рішення?' },
      ],
    },
    conclusion: {
      title: 'Документи, які мають узгоджуватися',
      text: 'White paper, Terms of Use, Privacy Notice, AML/KYC Policy, sanctions policy, risk disclosures, custody terms, token allocation, treasury policy та фактичний UX повинні описувати одну й ту саму модель. Розрив між документами і продуктом — окремий доказовий та регуляторний ризик.',
    },
    sources: 'НБУ: рішення щодо Crypsee • MiCA — Regulation (EU) 2023/1114 • ESMA: crypto-assets as financial instruments',
  },
  {
    id: 'eu-classification',
    tag: 'EUROPEAN UNION',
    title: '3. Вихід до ЄС починається з класифікації',
    intro:
      "MiCA не охоплює всі цифрові активи. Перший юридичний крок — встановити, чи є інструмент cryptoasset у розумінні MiCA, чи він належить до іншого режиму: фінансових інструментів, депозитів, structured deposits, коштів, сек'юритизації, страхових або пенсійних продуктів.",
    callout: {
      title: 'Substance over form у ЄС',
      text: 'ESMA вимагає технологічно нейтрального підходу: якщо токен надає права, еквівалентні акціям, облігаціям або іншим transferable securities, його слід оцінювати за MiFID II, а не лише за MiCA.',
    },
    table: {
      headers: ['Класифікаційна брама', 'Що перевірити'],
      rows: [
        { 'Класифікаційна брама': 'Financial instrument?', 'Що перевірити': 'Перевірити права на прибуток, управління, погашення, оборотність і стандартизацію. Якщо так — аналіз MiFID II та пов’язаних актів.' },
        { 'Класифікаційна брама': 'EMT', 'Що перевірити': 'Токен підтримує стабільну вартість шляхом прив’язки до однієї офіційної валюти.' },
        { 'Класифікаційна брама': 'ART', 'Що перевірити': "Стабільність пов'язана з іншою вартістю, правом або комбінацією активів/валют." },
        { 'Класифікаційна брама': 'Інший crypto-asset', 'Що перевірити': 'Utility, exchange або інший токен, що не виключений зі сфери MiCA.' },
        { 'Класифікаційна брама': 'NFT / унікальність', 'Що перевірити': 'Назва NFT не є достатньою. Серії, взаємозамінність і фактичні права потребують окремої оцінки.' },
        { 'Класифікаційна брама': 'DeFi', 'Що перевірити': 'Оцінити, чи існує особа або група, що здійснює контроль чи достатній вплив на arrangement.' },
      ],
    },
    conclusion: {
      title: 'Вихідний документ',
      text: "До запуску маркетингу варто мати classification memorandum із описом токена, прав користувача, cash flows, control rights, географії та мотивованого висновку про застосовний режим. Це робочий доказ належної підготовки, а не формальна довідка.",
    },
    sources: 'MiCA — Regulation (EU) 2023/1114 • ESMA: crypto-assets as financial instruments • ESMA: MiCA & Interim Register',
  },
  {
    id: 'casp-authorisation',
    tag: 'MARKET ACCESS',
    title: '4. CASP-авторизація та межі reverse solicitation',
    intro:
      'MiCA передбачає авторизацію для надання crypto-asset services у ЄС. Дозвіл визначає перелік послуг і може використовуватися в межах Союзу за правилами passporting. Максимальний перехідний режим для провайдерів, які діяли до 30 грудня 2024 року, завершився 1 липня 2026 року або раніше — залежно від рішення конкретної держави.',
    table: {
      headers: ['Група', 'Приклади регульованих функцій'],
      rows: [
        { 'Група': 'Custody', 'Приклади регульованих функцій': 'зберігання/адміністрування crypto-assets або засобів доступу' },
        { 'Група': 'Trading platform', 'Приклади регульованих функцій': 'керування платформою торгівлі' },
        { 'Група': 'Exchange', 'Приклади регульованих функцій': 'обмін crypto-assets на funds або інші crypto-assets' },
        { 'Група': 'Orders', 'Приклади регульованих функцій': 'execution, reception/transmission або placement' },
        { 'Група': 'Advice / portfolio', 'Приклади регульованих функцій': 'поради або управління портфелем crypto-assets' },
        { 'Група': 'Transfer', 'Приклади регульованих функцій': 'переказ crypto-assets від імені клієнта' },
      ],
    },
    callout: {
      title: 'Reverse solicitation — вузький виняток',
      text: "Стаття 61 MiCA дозволяє третій країні надати конкретну послугу клієнту ЄС, якщо клієнт звернувся виключно з власної ініціативи. ESMA наголошує: виняток тлумачиться вузько і не створює права рекламувати нові типи активів чи послуг.",
    },
    bulletsTitle: 'Практичний зміст ризику',
    bullets: [
      'Ймовірне залучення: таргетована реклама в ЄС; EU-language campaigns; affiliates; influencers; events; SEO/SEM із географічним фокусом; EU phone numbers.',
      'Не лікує порушення: disclaimer «client’s own initiative», вибір права третьої країни або checkbox не перекривають фактичне solicitation.',
      'B2B теж важливо: ESMA окремо вказує, що вимоги щодо unauthorized CASPs стосуються також business-to-business контексту.',
    ],
    sources: 'MiCA — Regulation (EU) 2023/1114 • ESMA: reverse solicitation guidelines • ESMA: end of MiCA transition • ESMA: MiCA & Interim Register',
  },
  {
    id: 'travel-rule',
    tag: 'AML / CFT',
    title: '5. Travel Rule: транзакція стає пакетом ідентифікаційних даних',
    intro:
      'Regulation (EU) 2023/1113 застосовується з 30 грудня 2024 року та встановлює вимоги до інформації про originator і beneficiary, що супроводжує перекази crypto-assets. CASP повинен мати процедури для missing/incomplete information, ризик-орієнтованої оцінки та операцій із self-hosted addresses.',
    callout: {
      title: 'Глобальний контекст FATF 2026',
      text: '83% опитаних юрисдикцій повідомили про ухвалення Travel Rule legislation. Водночас майже половина юрисдикцій, які вже мають такі правила, ще не здійснювали пов’язаних із Travel Rule наглядових або enforcement actions.',
    },
    bulletsTitle: 'Мінімальний операційний контур',
    bullets: [
      'визначити ролі сторін, тип wallet і CASP counterparty до виконання переказу;',
      'зібрати та верифікувати дані originator/beneficiary у належному обсязі;',
      'перевірити санкції, high-risk geography, PEP, adverse information і blockchain indicators;',
      'визначити правила hold / reject / return / report для неповних або суперечливих даних;',
      'зберігати рішення, alerts, transaction hashes і підстави risk scoring;',
      'контролювати постачальників Travel Rule messaging та передачу персональних даних.',
    ],
    conclusion: {
      title: 'Self-hosted wallet не є автоматично забороненим',
      text: 'Ризик залежить від контексту. Для переказів до/з self-hosted address потрібні заходи ідентифікації, верифікації контролю та оцінки ризику. Автоматична відмова лише через тип wallet може бути так само проблемною, як і відсутність перевірки.',
    },
    sources: 'Transfer of Funds Regulation — Regulation (EU) 2023/1113 • EBA: Travel Rule guidelines • EBA: ML/TF risk factors for CASPs • FATF: 7th Targeted Update 2026 • FATF: 2026 summary',
  },
  {
    id: 'dac8',
    tag: 'TAX TRANSPARENCY',
    title: '6. DAC8: криптооперації входять до автоматичного обміну',
    intro:
      'DAC8 застосовується з 1 січня 2026 року та розширює автоматичний обмін податковою інформацією на crypto-assets. Reporting Crypto-Asset Service Providers мають збирати дані про reportable transactions користувачів — податкових резидентів ЄС.',
    table: {
      headers: ["Період", "Обов'язок / наслідок"],
      rows: [
        { 'Період': '2026', "Обов'язок / наслідок": 'Збір self-certifications, tax residence, TIN та даних про reportable transactions.' },
        { 'Період': '01.01–30.09.2027', "Обов'язок / наслідок": 'Перша звітність за фінансовий рік 2026 — з урахуванням національних строків і форматів.' },
        { 'Період': 'Після звітування', "Обов'язок / наслідок": 'Автоматичний обмін між податковими адміністраціями; можливе зіставлення з банківськими, корпоративними й AML-даними.' },
      ],
    },
    bulletsTitle: 'Що має зробити провайдер',
    bullets: [
      'провести scope analysis: чи є він Reporting Crypto-Asset Service Provider;',
      'перебудувати onboarding для tax residency і self-certification;',
      'визначити reportable users, transactions, valuation methodology та data lineage;',
      'узгодити DAC8 із GDPR, AML recordkeeping та внутрішніми строками зберігання;',
      'перевірити single registration obligations для провайдера поза ЄС, якщо вони застосовуються;',
      'підготувати процедури виправлення помилкових TIN, дублювання акаунтів і зміни податкової резидентності.',
    ],
    conclusion: {
      title: 'Для українського засновника',
      text: 'Іноземна компанія, рахунок або wallet не роблять операцію «невидимою». Важливо завчасно узгодити особисту податкову резидентність, корпоративну структуру, контроль над treasury та облік acquisition cost.',
    },
    sources: 'European Commission: DAC8 • Transfer of Funds Regulation — Regulation (EU) 2023/1113',
  },
  {
    id: 'emerging-risks',
    tag: 'EMERGING RISK MAP',
    title: '7. Stablecoins, DeFi, P2P та offshore VASPs',
    intro:
      'FATF у липні 2026 року визначила серед зростаючих ризиків індустріалізацію шахрайства з використанням virtual assets, зловживання stablecoins, P2P-перекази через unhosted wallets, offshore VASPs поза ефективним наглядом та труднощі визначення осіб, які контролюють DeFi arrangements.',
    table: {
      headers: ['Сегмент', 'Чому виникає ризик', 'Що перевіряється'],
      rows: [
        { 'Сегмент': 'Stablecoins', 'Чому виникає ризик': 'висока швидкість і глобальна ліквідність', 'Що перевіряється': 'reserve/issuer, freezing policy, sanctions exposure, chain and bridge risk' },
        { 'Сегмент': 'DeFi', 'Чому виникає ризик': 'розподілений інтерфейс, але можливий фактичний контроль', 'Що перевіряється': 'admin keys, governance concentration, fee capture, upgrade rights, front-end control' },
        { 'Сегмент': 'P2P / unhosted', 'Чому виникає ризик': 'відсутність regulated counterparty на одній стороні', 'Що перевіряється': 'wallet control, source/destination, behavioural pattern, purpose' },
        { 'Сегмент': 'Offshore VASP', 'Чому виникає ризик': 'послуга доступна глобально без дієвого нагляду', 'Що перевіряється': 'licence authenticity, jurisdiction, ownership, enforcement history, exit path' },
        { 'Сегмент': 'Bridge / mixer', 'Чому виникає ризик': 'ускладнення маршруту і підвищення alert score', 'Що перевіряється': 'legitimate rationale, pre/post-chain evidence, sanctions/illicit exposure' },
      ],
    },
    callout: {
      title: 'Необхідна пропорційність',
      text: 'Ризикова ознака не дорівнює незаконності. Юридично стійка система має не лише виявляти alerts, а й забезпечувати їх перевірку, документування контексту, право клієнта надати пояснення та розумне рішення: proceed, enhanced due diligence, hold, reject, exit або report.',
    },
    conclusion: {
      title: 'Помилка двох крайнощів',
      text: 'Небезпечно як ігнорувати on-chain indicators, так і автоматично вважати злочинною будь-яку операцію зі stablecoin, self-hosted wallet, DeFi або privacy tool.',
    },
    sources: 'FATF: 7th Targeted Update 2026 • FATF: 2026 summary • EBA: ML/TF risk factors for CASPs',
  },
  {
    id: 'sanctions',
    tag: 'SANCTIONS',
    title: '8. Санкційний ризик не обмежується перевіркою імені',
    intro:
      "ЄС прямо включає crypto-assets до режиму restrictive measures. Чинні обмеження охоплюють окремі crypto-asset services, wallets, accounts і custody, а також осіб та сервіси, пов'язані з обходом санкцій. Європейська Комісія регулярно оновлює консолідовані FAQs; станом на дату звіту останнє оновлення датоване 17 липня 2026 року.",
    table: {
      headers: ['Рівень', 'Що перевіряти'],
      rows: [
        { 'Рівень': 'Особа', 'Що перевіряти': 'name, aliases, DOB, citizenship, residence, ownership/control' },
        { 'Рівень': 'Адреса', 'Що перевіряти': 'wallet address та її кластер; exposure не лише до прямого контрагента' },
        { 'Рівень': 'Сервіс', 'Що перевіряти': 'exchange, mixer, bridge, OTC broker, payment processor, hosted/unhosted status' },
        { 'Рівень': 'Географія', 'Що перевіряти': 'IP, device, residence, bank, corporate seat, shipping/service location' },
        { 'Рівень': 'Призначення', 'Що перевіряти': 'economic rationale, source of funds/wealth, recipient and end use' },
        { 'Рівень': 'Контроль', 'Що перевіряти': 'власники та особи, що фактично контролюють company, protocol або treasury' },
      ],
    },
    bulletsTitle: 'Що має містити sanctions compliance framework',
    bullets: [
      'перелік застосовних режимів — Україна, ЄС, ООН, США/OFAC та інші залежно від nexus;',
      'screening до onboarding, перед транзакцією та під час ongoing monitoring;',
      'правила роботи з indirect ownership/control і змінами списків;',
      'on-chain analytics із визначеними thresholds та human review;',
      'процедури блокування, відмови, повідомлення, збереження доказів і legal privilege;',
      'контроль geofencing, affiliates, contractors і outsourced providers.',
    ],
    sources: 'EU sanctions against Russia — official summary • European Commission: consolidated sanctions FAQs • OFAC: sanctions compliance for virtual currency',
  },
  {
    id: 'cybercrime',
    tag: 'CYBERCRIME & FRAUD',
    title: '9. Загроза зміщується від «злому блокчейну» до компрометації людини',
    intro:
      "Europol у IOCTA 2026 описує прискорення online fraud, використання AI, end-to-end encryption, proxy infrastructure, infostealers та cryptocurrency drainers. Блокчейн часто залишається технічно справним; активи втрачаються через seed phrase, session token, malicious signature, social engineering, SIM swap або compromised device.",
    table: {
      headers: ['Вектор', 'Механіка'],
      rows: [
        { 'Вектор': 'Phishing / drainer', 'Механіка': 'підроблений сайт або dApp змушує підписати дозвіл чи транзакцію' },
        { 'Вектор': 'Business email compromise', 'Механіка': 'підміна платіжних реквізитів, wallet address або контрагента' },
        { 'Вектор': 'Infostealer', 'Механіка': 'викрадення cookies, passwords, wallet extensions, API keys' },
        { 'Вектор': 'SIM swap / account takeover', 'Механіка': 'перехоплення 2FA, email або exchange account' },
        { 'Вектор': 'Fake investment / pig butchering', 'Механіка': 'тривале формування довіри та контрольований «інвестиційний» інтерфейс' },
        { 'Вектор': 'Insider / key misuse', 'Механіка': 'зловживання доступом до treasury, multisig або withdrawal rules' },
      ],
    },
    callout: {
      title: 'Доказовий пріоритет',
      text: 'Потрібно зберегти не лише transaction hash. Важливі також source device, browser history, extension logs, email headers, chat exports, session data, IP/device notifications, API history, smart-contract approvals, DNS/hosting data та точна часова шкала. Усі дії мають мінімізувати зміну первинних даних.',
    },
    conclusion: {
      title: 'Роль юриста з першої години',
      text: 'Визначити legal hold, межі внутрішнього розслідування, privilege, повідомлення регуляторам і контрагентам, а також сформулювати preservation/freezing requests без передчасних неперевірених тверджень.',
    },
    sources: 'Europol: IOCTA 2026 • INTERPOL: digital forensics first responders • Кіберполіція: ризики криптошахрайства',
  },
  {
    id: 'first-48-hours',
    tag: 'INCIDENT RESPONSE',
    title: '10. Перші 48 годин після криптоінциденту',
    table: {
      headers: ['Час', 'Ціль', 'Ключові дії'],
      rows: [
        { 'Час': '0–2 години', 'Ціль': 'Зупинити втрати', 'Ключові дії': 'ізолювати compromised devices; revoke sessions/approvals; pause withdrawals, якщо дозволено; не видаляти дані' },
        { 'Час': '0–4 години', 'Ціль': 'Зафіксувати', 'Ключові дії': 'wallets, tx hashes, chain, timestamps, fiat accounts, URLs, domains, emails, chats, screenshots і суму' },
        { 'Час': '2–8 годин', 'Ціль': 'Зберегти докази', 'Ключові дії': 'forensic images/log exports; chain of custody; legal hold; окремий журнал усіх дій команди' },
        { 'Час': '2–12 годин', 'Ціль': 'Сповістити точки контролю', 'Ключові дії': 'біржі, custodians, stablecoin issuer, bank/payment provider; preservation і risk/freeze notices' },
        { 'Час': '4–24 години', 'Ціль': 'Побудувати маршрут', 'Ключові дії': 'on-chain tracing, attribution hypotheses, bridges/swaps, deposit addresses, off-ramp points' },
        { 'Час': '6–24 години', 'Ціль': 'Розпочати правовий контур', 'Ключові дії': "заява/повідомлення; процесуальна стратегія; юрисдикції; контакт з компетентними органами" },
        { 'Час': '24–48 годин', 'Ціль': 'Координувати', 'Ключові дії': 'follow-up з platforms та authorities; уточнені додатки; litigation/regulatory notifications; recovery plan' },
      ],
    },
    bulletsTitle: 'Чого не робити',
    bullets: [
      'не вести переговори з імовірним зловмисником без узгодженої стратегії;',
      'не публікувати wallet addresses або деталі атаки до оцінки наслідків;',
      'не перезавантажувати та не «чистити» пристрої, які можуть містити докази;',
      'не надсилати seed phrase, private key або повний forensic dump третім особам;',
      'не називати конкретну особу злочинцем до належної перевірки та процесуальної оцінки;',
      'не обіцяти клієнту гарантоване повернення: blockchain tracing не дорівнює юридичному freezing.',
    ],
    conclusion: {
      title: 'Критична залежність',
      text: 'Технічне встановлення destination wallet створює lead. Для фактичного повернення потрібні ідентифікація контрольної особи, юрисдикція, правова підстава, швидка взаємодія з платформою та процесуальне рішення компетентного органу.',
    },
    sources: 'INTERPOL: digital forensics first responders • Europol: IOCTA 2026 • EU e-Evidence Regulation • Council of Europe: Budapest Convention',
  },
  {
    id: 'cross-border-evidence',
    tag: 'CROSS-BORDER INVESTIGATIONS',
    title: '11. Електронні докази та повернення активів',
    intro:
      "Криптоінцидент майже завжди розподілений між кількома юрисдикціями: потерпілий, пристрій, exchange, stablecoin issuer, bank, cloud provider і підозрювана особа можуть бути в різних державах. Тому юридична стратегія має проєктуватися як multi-jurisdiction evidence map.",
    table: {
      headers: ['Джерело', 'Що може містити', 'Механізм'],
      rows: [
        { 'Джерело': 'Blockchain', 'Що може містити': 'transactions, addresses, token contract, bridge, approvals', 'Механізм': 'публічні дані + expert/analytics evidence' },
        { 'Джерело': 'Platform', 'Що може містити': 'KYC, IP/device, deposits/withdrawals, linked accounts', 'Механізм': 'preservation; law-enforcement/judicial request' },
        { 'Джерело': 'Bank / PSP', 'Що може містити': 'fiat off-ramp, beneficiary, account statements', 'Механізм': 'AML contact + процесуальний запит' },
        { 'Джерело': 'Cloud / telecom', 'Що може містити': 'subscriber, traffic, access logs, domain/hosting', 'Механізм': 'Budapest Convention / MLA / e-Evidence where applicable' },
        { 'Джерело': 'Corporate', 'Що може містити': 'ownership, directors, UBO, contractual counterparties', 'Механізм': 'official registries, disclosure, judicial measures' },
        { 'Джерело': 'Physical device', 'Що може містити': 'wallet files, keys, sessions, chats, source code', 'Механізм': 'forensic acquisition with chain of custody' },
      ],
    },
    callout: {
      title: 'ЄС: e-Evidence із 18 серпня 2026 року',
      text: 'Regulation (EU) 2023/1543 запроваджує European Production Orders і European Preservation Orders для електронних доказів у кримінальних провадженнях. Для України основою міжнародної співпраці залишаються національні процедури, MLA та Будапештська конвенція.',
    },
    bulletsTitle: 'Послідовність recovery',
    bullets: [
      'preserve — не допустити знищення даних;',
      'trace — встановити маршрут і точки можливого контролю;',
      "attribute — пов'язати address/account із конкретною особою або сервісом;",
      'freeze/seize — отримати добровільне тимчасове обмеження або процесуальне рішення;',
      'adjudicate — довести право на актив і підстави вилучення/повернення;',
      'return — виконати рішення з урахуванням custody, chain, tax і sanctions issues.',
    ],
    sources: 'EU e-Evidence Regulation • Council of Europe: Budapest Convention • Council of Europe: Ukraine & electronic evidence reform • INTERPOL: digital forensics first responders',
  },
];

export const boardChecklist = {
  title: '12. Готовність проєкту: 20 контрольних питань',
  headers: ['Блок', 'Контрольне питання'],
  rows: [
    { 'Блок': 'Класифікація', 'Контрольне питання': 'Чи є актуальний classification memo для кожного token/service?' },
    { 'Блок': 'Периметр ЄС', 'Контрольне питання': 'Які держави, мови, домени, affiliates та канали маркетингу охоплюються?' },
    { 'Блок': 'Ліцензія', 'Контрольне питання': 'Яка юридична особа надає кожну послугу і на підставі якого дозволу?' },
    { 'Блок': 'Reverse solicitation', 'Контрольне питання': 'Чи існують докази exclusive initiative, а не лише disclaimer?' },
    { 'Блок': 'White paper', 'Контрольне питання': 'Чи узгоджуються права токена, ризики, tokenomics і фактичний код?' },
    { 'Блок': 'Custody', 'Контрольне питання': 'Хто контролює keys, recovery, withdrawals і segregation?' },
    { 'Блок': 'AML', 'Контрольне питання': 'Чи документовані risk appetite, KYC/KYB, EDD та monitoring?' },
    { 'Блок': 'Travel Rule', 'Контрольне питання': 'Чи передаються/отримуються дані і як обробляються винятки?' },
    { 'Блок': 'Self-hosted wallets', 'Контрольне питання': 'Як верифікується control і за яких умов потрібна EDD?' },
    { 'Блок': 'Sanctions', 'Контрольне питання': 'Які списки, ownership rules та wallet indicators перевіряються?' },
    { 'Блок': 'DAC8', 'Контрольне питання': 'Чи визначені RCASP status, reportable users і data fields?' },
    { 'Блок': 'DORA / ICT', 'Контрольне питання': 'Чи є incident, continuity, testing та third-party risk framework?' },
    { 'Блок': 'Privacy', 'Контрольне питання': 'Чи є lawful basis, notices, transfers і retention schedule?' },
    { 'Блок': 'Market abuse', 'Контрольне питання': 'Чи контролюються inside information, manipulation і conflicts?' },
    { 'Блок': 'Treasury', 'Контрольне питання': 'Чи документовані source, approvals, multisig і related-party flows?' },
    { 'Блок': 'Vendors', 'Контрольне питання': 'Чи перевірені banks, custodians, analytics, bridges та issuers?' },
    { 'Блок': 'Evidence', 'Контрольне питання': "Чи логуються дії так, щоб їх можна було використати у спорі?" },
    { 'Блок': 'Incident', 'Контрольне питання': 'Чи є 24/7 contact tree і готові preservation templates?' },
    { 'Блок': 'Insurance', 'Контрольне питання': 'Чи відповідає покриття cyber/crime/D&O фактичній моделі?' },
    { 'Блок': 'Board', 'Контрольне питання': 'Чи отримує керівний орган регулярні metrics, incidents і regulatory updates?' },
  ],
};

export const ninetyDayProgramme = {
  title: '13. Практичний план на 90 днів',
  headers: ['Період', 'Фокус', 'Результат'],
  rows: [
    { 'Період': 'Дні 1–15', 'Фокус': 'Scope & facts', 'Результат': 'product map; entities; jurisdictions; token/service classification; gap list' },
    { 'Період': 'Дні 16–30', 'Фокус': 'Legal architecture', 'Результат': 'licensing route; contracting chain; marketing perimeter; roles/controllers' },
    { 'Період': 'Дні 31–50', 'Фокус': 'Compliance design', 'Результат': 'AML/Travel Rule; sanctions; DAC8; privacy; complaints; recordkeeping' },
    { 'Період': 'Дні 51–70', 'Фокус': 'Operationalisation', 'Результат': 'vendor controls; monitoring rules; incident playbook; staff training; board reporting' },
    { 'Період': 'Дні 71–85', 'Фокус': 'Testing', 'Результат': 'sample onboarding; transaction alerts; self-hosted case; sanctions hit; cyber tabletop' },
    { 'Період': 'Дні 86–90', 'Фокус': 'Release gate', 'Результат': 'document sign-off; residual risk acceptance; launch restrictions; evidence pack' },
  ],
};

export const outlook2027 = {
  title: '14. Прогноз: що визначатиме 2027 рік',
  headers: ['Тренд', 'Ймовірний практичний наслідок'],
  rows: [
    { 'Тренд': 'Enforcement після переходу', 'Ймовірний практичний наслідок': 'Після завершення MiCA transitional period увага зміщується від підготовки заявок до фактичного unauthorized activity, outsourcing і захисту клієнтських активів.' },
    { 'Тренд': 'Data convergence', 'Ймовірний практичний наслідок': 'Travel Rule, DAC8, KYC, sanctions screening та blockchain analytics дедалі частіше формуватимуть єдиний профіль операції.' },
    { 'Тренд': 'Stablecoins & unhosted wallets', 'Ймовірний практичний наслідок': 'Очікується детальніший risk-based контроль без тотожності між privacy/self-custody та незаконністю.' },
    { 'Тренд': 'DeFi control tests', 'Ймовірний практичний наслідок': 'Юридичний аналіз концентруватиметься на admin keys, governance, fees, front-end і можливості змінювати protocol.' },
    { 'Тренд': 'Українська рамка', 'Ймовірний практичний наслідок': 'Після остаточного рішення щодо законопроєкту № 10225-д бізнесу знадобиться перехід від очікуваної моделі до фактичних authorization, tax і supervisory requirements.' },
    { 'Тренд': 'Electronic evidence', 'Ймовірний практичний наслідок': 'Нові e-Evidence інструменти ЄС посилять швидкість preservation/production, але вимагатимуть точнішого визначення data category, provider і jurisdiction.' },
  ],
  conclusion:
    'У 2026–2027 роках юридична якість Web3-проєкту вимірюватиметься не кількістю disclaimers, а здатністю довести: хто контролює продукт, на якій підставі він працює, звідки походять активи, як захищені клієнти та що відбудеться у перші години після інциденту.',
};

export const sourceRegister = [
  { n: 1, name: 'MiCA — Regulation (EU) 2023/1114', url: 'https://eur-lex.europa.eu/eli/reg/2023/1114/oj/eng' },
  { n: 2, name: 'Transfer of Funds Regulation — Regulation (EU) 2023/1113', url: 'https://eur-lex.europa.eu/eli/reg/2023/1113/oj/eng' },
  { n: 3, name: 'ESMA: MiCA & Interim Register', url: 'https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica' },
  { n: 4, name: 'ESMA: reverse solicitation guidelines', url: 'https://www.esma.europa.eu/document/guidelines-reverse-solicitation-under-mica' },
  { n: 5, name: 'ESMA: crypto-assets as financial instruments', url: 'https://www.esma.europa.eu/document/guidelines-conditions-and-criteria-qualification-crypto-assets-financial-instruments' },
  { n: 6, name: 'ESMA: end of MiCA transition', url: 'https://www.esma.europa.eu/sites/default/files/2026-06/ESMA75-113276571-1710_Public_Statement_MiCA_transitional_period_ends.pdf' },
  { n: 7, name: 'EBA: Travel Rule guidelines', url: 'https://www.eba.europa.eu/activities/single-rulebook/regulatory-activities/anti-money-laundering-and-countering-financing-terrorism/guidelines-information-requirements-relation-transfers-funds-and-certain-crypto-assets-transfers' },
  { n: 8, name: 'EBA: ML/TF risk factors for CASPs', url: 'https://www.eba.europa.eu/publications-and-media/press-releases/eba-issues-guidance-crypto-asset-service-providers' },
  { n: 9, name: 'DORA — Regulation (EU) 2022/2554', url: 'https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng' },
  { n: 10, name: 'European Commission: DAC8', url: 'https://taxation-customs.ec.europa.eu/taxation/tax-transparency-cooperation/administrative-cooperation-and-mutual-assistance/directive-administrative-cooperation-dac/dac8_en' },
  { n: 11, name: 'FATF: 7th Targeted Update 2026', url: 'https://www.fatf-gafi.org/content/dam/fatf-gafi/reports/7th-targeted-update-on-implementation-fatf-standards-vas-vasps-2026.pdf.coredownload.pdf' },
  { n: 12, name: 'FATF: 2026 summary', url: 'https://www.fatf-gafi.org/en/news/targeted-updated-va-vasps-2026.html' },
  { n: 13, name: 'Europol: IOCTA 2026', url: 'https://www.europol.europa.eu/cms/sites/default/files/documents/IOCTA-2026.pdf' },
  { n: 14, name: 'EU e-Evidence Regulation', url: 'https://eur-lex.europa.eu/eli/reg/2023/1543/oj/eng' },
  { n: 15, name: 'Council of Europe: Budapest Convention', url: 'https://www.coe.int/en/web/cybercrime/the-budapest-convention' },
  { n: 16, name: 'Council of Europe: Ukraine & electronic evidence reform', url: 'https://www.coe.int/en/web/cybercrime/-/cybereast-and-cyberua-ukrainian-law-enforcement-authorities-and-the-verkhovna-rada-assessed-the-improvements-to-the-criminal-code-of-ukraine-in-line-with-international-standards' },
  { n: 17, name: 'INTERPOL: digital forensics first responders', url: 'https://www.interpol.int/content/download/16243/file/Guidelines_to_Digital_Forensics_First_Responders_V7.pdf' },
  { n: 18, name: 'EU sanctions against Russia — official summary', url: 'https://eur-lex.europa.eu/EN/legal-content/summary/eu-restrictive-measures-in-view-of-russia-s-invasion-of-ukraine.html' },
  { n: 19, name: 'European Commission: consolidated sanctions FAQs', url: 'https://finance.ec.europa.eu/publications/consolidated-version_en' },
  { n: 20, name: 'OFAC: sanctions compliance for virtual currency', url: 'https://home.treasury.gov/news/press-releases/jy0410' },
  { n: 21, name: "Закон України № 2074-IX «Про віртуальні активи»", url: 'https://zakon.rada.gov.ua/laws/show/2074-20' },
  { n: 22, name: 'Законопроєкт № 10225-д', url: 'https://itd.rada.gov.ua/billinfo/Bills/Card/56271' },
  { n: 23, name: 'Закон України № 361-IX про фінансовий моніторинг', url: 'https://zakon.rada.gov.ua/laws/show/361-20' },
  { n: 24, name: 'НБУ: концепція регулювання ринку VA', url: 'https://bank.gov.ua/ua/news/all/rfs-vidznachila-riziki-pidvischenogo-opodatkuvannya-bankiv-i-shvalila-kontseptsiyu-regulyuvannya-rinku-virtualnih-aktiviv' },
  { n: 25, name: 'НБУ: рішення щодо Crypsee', url: 'https://bank.gov.ua/ua/news/all/schodo-vedennya-nezakonnoyi-diyalnosti-onlayn-servisom-crypsee' },
  { n: 26, name: 'НКЦПФР: законодавче регулювання VA', url: 'https://www.nssmc.gov.ua/nktspfr-pidtrymuie-rozvytok-rynku-virtualnykh-aktyviv-cherez-iakisne-zakonodavche-rehuliuvannia/' },
  { n: 27, name: 'Кіберполіція: ризики криптошахрайства', url: 'https://cyberpolice.gov.ua/article/yak-uberegty-sebe-vid-shaxrayiv-pry-investuvanni-u-kryptovalyutu-porady-kiberpolicziyi-3701/' },
];

export const methodology = {
  method:
    'Матеріал підготовлено шляхом функціонального аналізу чинних і майбутніх регуляторних контурів України та ЄС із використанням виключно офіційних джерел. Проєктні норми позначені окремо і не подаються як чинне право. Кількісні показники в інфографіці походять із опитування та mutual-evaluation data FATF 2026.',
  limits:
    "Цей звіт має загальноінформаційний характер, не є індивідуальною юридичною, податковою, інвестиційною або фінансовою консультацією та не створює відносин адвокат–клієнт. Застосовне право залежить від структури продукту, юрисдикції, клієнтської бази, фактичних операцій і змін законодавства після дати звіту.",
  about:
    "«Ганган і Партнери» супроводжує складні кримінальні, регуляторні та транскордонні питання у сфері віртуальних активів: AML і блокування активів, криптошахрайство, електронні докази, міжнародне співробітництво, екстрадиція, санкційні ризики та вихід українських проєктів на ринок ЄС.",
  formats: [
    'Product classification', 'EU market-entry risk review', 'AML/Travel Rule gap assessment',
    '48-hour crypto incident response', 'Cross-border evidence & asset recovery strategy',
  ],
};
