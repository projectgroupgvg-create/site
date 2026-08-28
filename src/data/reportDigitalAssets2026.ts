// Content for /reports/digital-assets-cross-border-2026/ — transcribed from
// the client-supplied PDF "Digital Assets & Cross-Border Legal Risk Outlook
// 2026" (Ганган і Партнери, Київ, 25 серпня 2026 року — revised/justified
// edition, supersedes the 30 липня 2026 draft). Kept as structured data
// rather than JSON translation strings because this report is Ukrainian-only
// for now (per the SEO brief's own phasing — English/German/French are an
// explicit "stage 2"), so the next-intl layer isn't needed here.

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
  date: '25 серпня 2026 року',
  dateIso: '2026-08-25',
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
      { 'Контур': 'ЄС', 'Що змінилося': 'Максимальний перехідний режим MiCA завершився 1 липня 2026 року. Надання охоплених MiCA послуг клієнтам ЄС без авторизації загалом заборонене; reverse solicitation є вузьким винятком. [1, ст. 61, 143; 6]' },
      { 'Контур': 'Україна', 'Що змінилося': 'Закон № 2074-IX не набрав чинності. Станом на 25 серпня 2026 року законопроєкт № 10225-д готується до другого читання; очікувані правила не є чинним правом. [29; 30]' },
      { 'Контур': 'AML', 'Що змінилося': 'За self-reported опитуванням FATF 83% зі 129 юрисдикцій-респондентів повідомили про ухвалення законодавства щодо Travel Rule; практичне застосування залишається нерівномірним. [12]' },
      { 'Контур': 'Податки', 'Що змінилося': 'У 2026 році Reporting Crypto-Asset Service Providers, що підпадають під DAC8, збирають звітні дані; перший обмін має відбутися до 30 вересня 2027 року з урахуванням національних строків. [10; 11]' },
      { 'Контур': 'Спори', 'Що змінилося': 'Швидке збереження адрес, хешів транзакцій, логів і комунікацій підвищує шанси на повернення активів, але технічне відстеження не дорівнює юридичному заморожуванню. [17-19; 23]' },
    ],
  },
  audience:
    'Звіт призначений для українських засновників, інвесторів, фінтех- і Web3-команд, провайдерів OTC, кастодіальних і платіжних рішень, а також бізнесу, який приймає криптоактиви або стикається з блокуванням, шахрайством чи транскордонним розслідуванням.',
};

// The 7-10 "key findings" pulled from the callout/conclusion boxes across
// the report — satisfies TZ 8.2's "7-10 ключових висновків" requirement.
export const keyFindings = [
  'Максимальний перехідний режим MiCA для CASP, які діяли до 30 грудня 2024 року, завершився 1 липня 2026 року; надання охоплених послуг у ЄС без авторизації загалом заборонене, крім вузьких винятків. [1, ст. 143; 6]',
  'Закон України № 2074-IX ухвалений, але не набрав чинності; законопроєкт № 10225-д станом на 25 серпня 2026 року готується до другого читання. [29; 30]',
  'Токенізація не змінює економічну сутність операції: у справі Crypsee НБУ виявив ознаки фактичного гривневого споживчого кредитування, оформленого як позики в USDT. [34]',
  'Reverse solicitation тлумачиться вузько: сама доступність сайту не є вирішальною; оцінюються всі обставини, зокрема локалізація, реклама, SEO/SEM, affiliates та influencers. [1, ст. 61; 4]',
  'За self-reported опитуванням FATF 83% зі 129 юрисдикцій-респондентів повідомили про ухвалення законодавства щодо Travel Rule; практичний нагляд та enforcement залишаються нерівномірними. [12]',
  'DAC8 охоплює RCASP, які підпадають під імплементовані національні правила: у 2026 році вони збирають звітні дані, а перший обмін має відбутися до 30 вересня 2027 року. [10; 11]',
  'Санкційна перевірка охоплює особу, адресу, ownership/control та on-chain exposure; кластер є ризиковим індикатором, а не самостійним доказом контролю. Правила ЄС та OFAC застосовуються окремо. [24-28]',
  'Компрометація доступу є одним із ключових векторів криптоінцидентів; типовими механізмами є phishing, malicious signatures, social engineering, infostealers, session theft та SIM swap. [14; 23; 35]',
  'Дії в перші години та дні впливають на збереження доказів і можливість recovery; добровільний risk hold платформи слід відрізняти від процесуального freezing або seizure. [17-19; 23]',
  "З 18 серпня 2026 року Regulation (EU) 2023/1543 застосовується в ЄС до визначених service providers; фінансові послуги виключені, а Україна не видає EPOC/EPOC-PR безпосередньо. [15; 16; 36]",
];

export const sections: ReportSection[] = [
  {
    id: 'ukraine',
    tag: 'UKRAINE',
    title: '1. Україна: ринок існує, спеціальний режим формується',
    intro:
      'Закон України № 2074-IX «Про віртуальні активи» ухвалений у 2022 році, але не набрав чинності. Законопроєкт № 10225-д 3 вересня 2025 року прийнято за основу з доопрацюванням; станом на 25 серпня 2026 року він готується до другого читання. Положення законопроєкту не слід подавати як чинне право. [29; 30]',
    callout: {
      title: 'Юридичне правило обережності',
      text: 'У презентаціях, договорах і юридичних висновках слід чітко розділяти: (1) чинне право; (2) ухвалений, але нечинний Закон № 2074-IX; (3) положення законопроєкту № 10225-д, які можуть змінитися до остаточного голосування. [29; 30]',
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
      text: 'Відсутність чинного спеціального режиму не означає відсутності застосовного права. Водночас спеціальні регуляторні та процедурні прогалини зберігаються. Проєкт може підпадати під кілька чинних режимів; кваліфікація залежить від фактичних грошових потоків, договорів, реклами та розподілу контролю. [29-33]',
    },
    sources: "Закон № 2074-IX [29]; законопроєкт № 10225-д [30]; Закон № 361-IX [31]; КПК України [32]; матеріали Ради з фінансової стабільності / НБУ [33].",
  },
  {
    id: 'token-function',
    tag: 'REGULATORY SIGNAL',
    title: '2. Функція продукту важливіша за назву токена',
    intro:
      '2 квітня 2026 року НБУ повідомив про заборону діяльності онлайн-сервісу Crypsee. За результатами аналізу правочинів НБУ виявив ознаки надання фінансової послуги з надання коштів у кредит: формально оформлені позики в USDT фактично мали ознаки гривневого споживчого кредитування без належного регуляторного режиму. Висновок ґрунтувався на змісті договорів, фактичних розрахунках, вартості кредиту, розкритті інформації та захисті споживачів. [34]',
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
    sources: 'рішення НБУ щодо Crypsee [34]; MiCA [1]; настанови ESMA щодо кваліфікації криптоактивів як фінансових інструментів [5].',
  },
  {
    id: 'eu-classification',
    tag: 'EUROPEAN UNION',
    title: '3. Вихід до ЄС починається з класифікації',
    intro:
      "MiCA не охоплює всі цифрові активи. Перший юридичний крок — встановити, чи є інструмент криптоактивом у розумінні MiCA або підпадає під інший режим: фінансових інструментів, депозитів, структурованих депозитів, коштів (крім e-money tokens), сек'юритизаційних позицій, страхових або пенсійних продуктів. Оцінка здійснюється індивідуально з урахуванням прав та економічної сутності. [1, ст. 2; 5]",
    callout: {
      title: 'Substance over form у ЄС',
      text: 'ESMA вимагає технологічно нейтрального підходу: якщо токен надає права, еквівалентні акціям, облігаціям або іншим transferable securities, його слід оцінювати за MiFID II, а не лише за MiCA.',
    },
    table: {
      headers: ['Класифікаційна брама', 'Що перевірити'],
      rows: [
        { 'Класифікаційна брама': 'Financial instrument?', 'Що перевірити': 'Перевірити права на прибуток, управління, погашення, оборотність і стандартизацію. Жодна ознака не є вирішальною сама по собі; потрібна індивідуальна оцінка за категоріями MiFID II. [5]' },
        { 'Класифікаційна брама': 'EMT', 'Що перевірити': 'Токен підтримує стабільну вартість шляхом прив’язки до однієї офіційної валюти.' },
        { 'Класифікаційна брама': 'ART', 'Що перевірити': "Стабільність пов'язана з іншою вартістю, правом або комбінацією активів/валют." },
        { 'Класифікаційна брама': 'Інший crypto-asset', 'Що перевірити': 'Utility, exchange або інший токен, що не виключений зі сфери MiCA.' },
        { 'Класифікаційна брама': 'NFT / унікальність', 'Що перевірити': 'Назва NFT не є достатньою. Серії, взаємозамінність і фактичні права потребують окремої оцінки.' },
        { 'Класифікаційна брама': 'DeFi', 'Що перевірити': "Оцінити, чи послуга надається повністю децентралізовано без посередника; для AML/FATF — чи є особа або група з контролем або достатнім впливом." },
      ],
    },
    conclusion: {
      title: 'Вихідний документ',
      text: "До запуску маркетингу варто мати меморандум про класифікацію з описом токена, прав користувача, грошових потоків, прав контролю, географії та мотивованого висновку про застосовний режим. Це робочий доказ належної підготовки, а не формальна довідка.",
    },
    sources: 'MiCA, зокрема стаття 2 [1]; настанови ESMA щодо фінансових інструментів [5]; сторінка ESMA щодо MiCA та Interim Register [3].',
  },
  {
    id: 'casp-authorisation',
    tag: 'MARKET ACCESS',
    title: '4. CASP-авторизація та межі reverse solicitation',
    intro:
      'MiCA вимагає авторизації для надання охоплених crypto-asset services у ЄС. Дозвіл визначає перелік послуг і може використовуватися в Союзі за правилами passporting. Максимальний перехідний режим для провайдерів, які діяли до 30 грудня 2024 року, завершився 1 липня 2026 року; для окремого CASP він міг завершитися раніше через національний строк або рішення щодо авторизації. [1, ст. 59, 143; 6]',
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
      text: "Стаття 61 MiCA встановлює вузький виняток з вимоги авторизації для фірми з третьої країни, якщо клієнт ЄС звернувся виключно з власної ініціативи. Виняток не створює права рекламувати нові типи активів або послуг і оцінюється за всіма фактичними обставинами. [1, ст. 61; 4]",
    },
    bulletsTitle: 'Практичний зміст ризику',
    bullets: [
      'Ймовірні ознаки залучення: таргетована реклама в ЄС; локалізовані кампанії; affiliates та influencers; заходи; географічно орієнтовані SEO/SEM; локальні телефонні номери. Сама доступність сайту не є вирішальною. [4]',
      'Не усувають порушення: disclaimer про ініціативу клієнта, вибір права третьої країни або checkbox, якщо фактичні обставини свідчать про solicitation. [4]',
      'Вимоги застосовуються і в B2B-контексті: ESMA прямо поширює підхід до unauthorized CASPs на відносини між професійними учасниками. [6]',
    ],
    sources: 'MiCA, статті 59, 61 і 143 [1]; ESMA reverse solicitation [4]; заява ESMA про завершення перехідного режиму [6]; MiCA register [3].',
  },
  {
    id: 'travel-rule',
    tag: 'AML / CFT',
    title: '5. Travel Rule: транзакція стає пакетом ідентифікаційних даних',
    intro:
      'Regulation (EU) 2023/1113 застосовується з 30 грудня 2024 року і визначає інформацію про originator та beneficiary, яка має супроводжувати перекази криптоактивів. CASP повинен мати процедури щодо відсутніх або неповних даних, ризик-орієнтованої оцінки та операцій із self-hosted addresses. [2; 7]',
    callout: {
      title: 'Глобальний контекст FATF 2026',
      text: "За результатами self-reported опитування FATF 83% зі 129 юрисдикцій-респондентів повідомили про ухвалення законодавства щодо Travel Rule. Майже половина юрисдикцій, які вже мають такі правила, ще не здійснювали пов'язаних наглядових або enforcement actions. FATF не проводила незалежної перевірки відповідей.",
    },
    bulletsTitle: 'Рекомендований операційний контур',
    bullets: [
      'визначити ролі сторін, тип гаманця і CASP-контрагента до виконання переказу;',
      'зібрати та верифікувати належний обсяг даних originator/beneficiary;',
      'перевірити санкції, high-risk юрисдикції, PEP, adverse information та on-chain indicators;',
      'установити правила hold / reject / return / report для неповних або суперечливих даних;',
      'зберігати рішення, спрацювання системи, хеші транзакцій і підстави risk scoring;',
      'контролювати провайдерів обміну даними Travel Rule та передачу персональних даних.',
    ],
    conclusion: {
      title: 'Самостійно розміщена адреса (self-hosted address) не є автоматично забороненою',
      text: 'До таких переказів застосовується ризик-орієнтована оцінка. Якщо сума перевищує 1 000 євро, CASP має вжити належних заходів, щоб оцінити, чи належить адреса клієнту або контролюється ним. Тип адреси сам по собі не доводить незаконність операції. [2, ст. 19; 7]',
    },
    sources: 'Regulation (EU) 2023/1113 [2]; EBA Travel Rule Guidelines [7]; EBA ML/TF Risk Factors Guidelines [8]; FATF Seventh Targeted Update [12].',
  },
  {
    id: 'dac8',
    tag: 'TAX TRANSPARENCY',
    title: '6. DAC8: криптооперації входять до автоматичного обміну',
    intro:
      'Держави-члени застосовують правила DAC8 з 1 січня 2026 року. Reporting Crypto-Asset Service Providers (RCASP), які підпадають під імплементовані національні норми, збирають дані про reportable transactions користувачів — податкових резидентів ЄС. Перший обмін інформацією за 2026 рік має відбутися до 30 вересня 2027 року. [10; 11]',
    table: {
      headers: ["Період", "Обов'язок / наслідок"],
      rows: [
        { 'Період': '2026', "Обов'язок / наслідок": 'Збір self-certifications, tax residence, TIN та даних про reportable transactions.' },
        { 'Період': 'До 30.09.2027', "Обов'язок / наслідок": 'Перша звітність та обмін за 2026 рік — з урахуванням національних строків і форматів. [10; 11]' },
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
    sources: 'Council Directive (EU) 2023/2226 [10]; European Commission: DAC8 [11].',
  },
  {
    id: 'emerging-risks',
    tag: 'EMERGING RISK MAP',
    title: '7. Stablecoins, DeFi, P2P та offshore VASPs',
    intro:
      'FATF у звітах 2026 року виділяє ризики індустріалізації шахрайства, зловживання stablecoins, P2P-переказів через unhosted wallets та offshore VASPs. У звіті про DeFi від 21 липня 2026 року зазначено: 132 зі 143 юрисдикцій-респондентів (майже 93%) не імплементували стандарти FATF щодо qualifying DeFi arrangements; лише 2 зі 142 повідомили про фактичне ліцензування або реєстрацію. Дані є self-reported. [12; 13]',
    callout: {
      title: 'Принцип пропорційності',
      text: 'Ризикова ознака не дорівнює незаконності. Юридично стійка система має не лише виявляти alerts, а й забезпечувати їх перевірку, документування контексту, право клієнта надати пояснення та обґрунтоване рішення: proceed, enhanced due diligence, hold, reject, exit або report.',
    },
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
    conclusion: {
      title: 'Помилка двох крайнощів',
      text: 'Небезпечно як ігнорувати on-chain indicators, так і автоматично вважати злочинною будь-яку операцію зі stablecoin, self-hosted wallet, DeFi або privacy tool.',
    },
    sources: 'FATF Seventh Targeted Update [12]; FATF Targeted Report on DeFi [13]; EBA ML/TF Risk Factors Guidelines [8].',
  },
  {
    id: 'sanctions',
    tag: 'SANCTIONS',
    title: '8. Санкційний ризик не обмежується перевіркою імені',
    intro:
      'Станом на 25 серпня 2026 року консолідовані санкційні FAQs Європейської Комісії оновлено 24 серпня 2026 року. Перевірку слід починати з первинних актів і звіряти з актуальним FAQ. Критерії ownership/control ЄС та OFAC застосовуються окремо в межах відповідного режиму. OFAC рекомендує tailored, risk-based program, зокрема geolocation, IP blocking, sanctions screening та blockchain analytics. Повідомлення про підозрілу діяльність подається лише тоді, коли це передбачено BSA/AML або іншим застосовним законодавством. [24-28]',
    table: {
      headers: ['Рівень', 'Що перевіряти'],
      rows: [
        { 'Рівень': 'Особа', 'Що перевіряти': 'name, aliases, DOB, citizenship, residence, ownership/control' },
        { 'Рівень': 'Адреса', 'Що перевіряти': "wallet address, on-chain exposure і кластер як ризикові індикатори; зв'язок з особою та фактичний контроль потребують ручної перевірки" },
        { 'Рівень': 'Сервіс', 'Що перевіряти': 'exchange, mixer, bridge, OTC broker, payment processor, hosted/unhosted status' },
        { 'Рівень': 'Географія', 'Що перевіряти': 'IP, device, residence, bank, corporate seat, shipping/service location' },
        { 'Рівень': 'Призначення', 'Що перевіряти': 'economic rationale, source of funds/wealth, recipient and end use' },
        { 'Рівень': 'Контроль', 'Що перевіряти': 'власники та особи, що фактично контролюють company, protocol або treasury' },
      ],
    },
    bulletsTitle: 'Що має містити sanctions compliance framework',
    bullets: [
      'визначення окремого переліку застосовних режимів: Україна, ЄС, ООН, США/OFAC та інші залежно від nexus;',
      'screening під час onboarding, перед транзакцією та в межах ongoing monitoring;',
      'окремі правила ownership/control для кожного застосовного санкційного режиму;',
      "on-chain analytics із визначеними thresholds та обов'язковою ручною перевіркою;",
      'процедури блокування, відмови, повідомлення, збереження доказів і legal privilege;',
      'контроль geofencing, affiliates, contractors та outsourced providers.',
    ],
    sources: 'санкційна політика ЄС [24]; Regulations (EU) No 269/2014 і No 833/2014 [25; 26]; FAQs Європейської Комісії [27]; guidance OFAC [28].',
  },
  {
    id: 'cybercrime',
    tag: 'CYBERCRIME & FRAUD',
    title: '9. Компрометація доступу — один із ключових векторів криптоінцидентів',
    intro:
      'Europol у IOCTA 2026 описує зростання онлайн-шахрайства, використання AI, end-to-end encryption та proxy infrastructure. Під час розслідування як типові вектори слід перевіряти phishing, malicious signatures, social engineering, infostealers, викрадення session tokens, SIM swap та compromised devices. [14; 23; 35]',
    callout: {
      title: 'Доказовий пріоритет',
      text: 'Недостатньо зберегти лише хеш транзакції. Кваліфікований форензичний спеціаліст має створити форензичні копії (образи), обчислити контрольні хеш-значення, зафіксувати ланцюг зберігання та зберегти оригінальні носії без змін. Також важливі browser history, extension logs, email headers, chat exports, session data, IP/device notifications, API history, smart-contract approvals, DNS/hosting data і точна часова шкала. [23]',
    },
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
    conclusion: {
      title: 'Роль юриста з першої години',
      text: 'Визначити legal hold, межі внутрішнього розслідування, privilege, повідомлення регуляторам і контрагентам та підготувати preservation/freezing requests без передчасних неперевірених тверджень. Настанови INTERPOL є технічним орієнтиром для правоохоронців; корпоративна команда має діяти через кваліфікованого спеціаліста та на належній правовій підставі. [23]',
    },
    sources: 'Europol IOCTA 2026 [14]; INTERPOL Digital Forensics First Responders [23]; актуальні рекомендації Кіберполіції [35].',
  },
  {
    id: 'first-48-hours',
    tag: 'INCIDENT RESPONSE',
    title: '10. Перші 48 годин після криптоінциденту',
    intro: 'Рекомендований авторський incident-response protocol — практичний орієнтир команди, а не встановлена законом процедура.',
    table: {
      headers: ['Час', 'Ціль', 'Ключові дії'],
      rows: [
        { 'Час': '0–2 години', 'Ціль': 'Зупинити втрати', 'Ключові дії': 'ізолювати compromised devices; revoke sessions/approvals; pause withdrawals, якщо дозволено; не видаляти дані' },
        { 'Час': '0–4 години', 'Ціль': 'Зафіксувати', 'Ключові дії': 'wallets, tx hashes, chain, timestamps, fiat accounts, URLs, domains, emails, chats, screenshots і суму' },
        { 'Час': '2–8 годин', 'Ціль': 'Зберегти докази', 'Ключові дії': 'форензичні копії та експорт логів; контрольні хеші; chain of custody; legal hold; журнал дій команди' },
        { 'Час': '2–12 годин', 'Ціль': 'Сповістити точки контролю', 'Ключові дії': 'preservation requests; приватний risk hold і процесуальне freezing слід розмежовувати' },
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
      'не надсилати seed phrase, private key або повну форензичну копію третім особам;',
      'не називати конкретну особу злочинцем до належної перевірки та процесуальної оцінки;',
      'не обіцяти клієнту гарантоване повернення: blockchain tracing не дорівнює юридичному freezing.',
    ],
    conclusion: {
      title: 'Критична залежність',
      text: 'Технічне встановлення destination wallet створює lead. Для фактичного повернення потрібні ідентифікація контрольної особи, юрисдикція, правова підстава, швидка взаємодія з платформою та процесуальне рішення компетентного органу.',
    },
    sources: 'INTERPOL [23]; Europol IOCTA 2026 [14]; Regulation (EU) 2023/1543 [15]; Будапештська конвенція [19].',
  },
  {
    id: 'cross-border-evidence',
    tag: 'CROSS-BORDER INVESTIGATIONS',
    title: '11. Електронні докази та повернення активів',
    intro:
      "Криптоінцидент майже завжди розподілений між кількома юрисдикціями: потерпілий, пристрій, exchange, stablecoin issuer, bank, cloud provider і підозрювана особа можуть бути в різних державах. Тому юридична стратегія має проєктуватися як multi-jurisdiction evidence map.",
    callout: {
      title: 'ЄС: e-Evidence застосовується з 18 серпня 2026 року',
      text: 'Regulation (EU) 2023/1543 дозволяє компетентним судовим органам держав-членів ЄС вимагати від визначених service providers в іншій державі-члені видачі або збереження електронних даних. Фінансові послуги виключені зі сфери Регламенту. Україна не може безпосередньо видавати EPOC/EPOC-PR; для неї застосовуються національні процедури, MLA та Будапештська конвенція. Акт не є підставою для freezing чи confiscation. [15, ст. 3, 34; 16; 19-22]',
    },
    table: {
      headers: ['Джерело', 'Що може містити', 'Механізм'],
      rows: [
        { 'Джерело': 'Blockchain', 'Що може містити': 'transactions, addresses, token contract, bridge, approvals', 'Механізм': 'публічні дані; аналітика як investigative lead; достовірність і допустимість встановлюються процесуально' },
        { 'Джерело': 'Platform', 'Що може містити': 'KYC, IP/device, deposits/withdrawals, linked accounts', 'Механізм': 'preservation; law-enforcement/judicial request' },
        { 'Джерело': 'Bank / PSP', 'Що може містити': 'fiat off-ramp, beneficiary, account statements', 'Механізм': 'процесуальний запит або рішення; FIU-to-FIU exchange надає розвідінформацію, але не замінює отримання доказів' },
        { 'Джерело': 'Cloud / telecom', 'Що може містити': 'subscriber, traffic, access logs, domain/hosting', 'Механізм': 'Будапештська конвенція / MLA; e-Evidence лише для визначених провайдерів та компетентних органів ЄС' },
        { 'Джерело': 'Corporate', 'Що може містити': 'ownership, directors, UBO, contractual counterparties', 'Механізм': 'official registries, disclosure, judicial measures' },
        { 'Джерело': 'Physical device', 'Що може містити': 'wallet files, keys, sessions, chats, source code', 'Механізм': 'форензичне копіювання із документованим ланцюгом зберігання та контрольними хешами' },
      ],
    },
    bulletsTitle: 'Послідовність повернення активів',
    bullets: [
      'preserve — не допустити знищення даних;',
      'trace — встановити маршрут і точки можливого контролю;',
      "attribute — пов'язати адресу або акаунт із конкретною особою чи сервісом;",
      'risk hold — просити платформу про добровільне тимчасове обмеження за її правилами;',
      'freeze/seize — отримати належне процесуальне рішення компетентного органу;',
      'adjudicate — довести право на актив і підстави вилучення або повернення;',
      'return — виконати рішення з урахуванням custody, chain, tax і sanctions issues.',
    ],
    sources: 'e-Evidence [15; 16; 36]; freezing/confiscation [17; 18]; Будапештська конвенція та українська реформа [19-22]; КПК України [32]; INTERPOL [23].',
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
    { 'Блок': 'DAC8', 'Контрольне питання': 'Чи визначені RCASP status, reportable users і data fields? [10; 11]' },
    { 'Блок': 'DORA / ICT', 'Контрольне питання': 'Якщо DORA застосовується, чи діють incident, continuity, testing і third-party risk frameworks? [9]' },
    { 'Блок': 'Privacy', 'Контрольне питання': 'Чи є lawful basis, notices, transfers і retention schedule?' },
    { 'Блок': 'Market abuse', 'Контрольне питання': 'Якщо Title VI MiCA застосовується до активів, допущених до торгівлі або щодо яких подано запит на допуск, чи контролюються зловживання? [1]' },
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
    { 'Тренд': 'Electronic evidence', 'Ймовірний практичний наслідок': 'Після початку застосування Regulation (EU) 2023/1543 швидкість preservation/production для визначених провайдерів у межах ЄС зростатиме; точне визначення data category, provider і jurisdiction залишатиметься критичним. [15; 16; 36]' },
  ],
  conclusion:
    'У 2026–2027 роках юридична якість Web3-проєкту вимірюватиметься не кількістю disclaimers, а здатністю довести: хто контролює продукт, на якій правовій підставі він працює, звідки походять активи, як захищені клієнти та що відбудеться в перші години після інциденту — з урахуванням права конкретної юрисдикції та фактичної моделі.',
};

export const sourceRegister = [
  { n: 1, name: 'MiCA — Regulation (EU) 2023/1114', url: 'https://eur-lex.europa.eu/eli/reg/2023/1114/oj/eng' },
  { n: 2, name: 'Transfer of Funds Regulation — Regulation (EU) 2023/1113', url: 'https://eur-lex.europa.eu/eli/reg/2023/1113/oj/eng' },
  { n: 3, name: 'ESMA: MiCA and Interim Register', url: 'https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica' },
  { n: 4, name: 'ESMA Guidelines on reverse solicitation (26.02.2025)', url: 'https://www.esma.europa.eu/document/guidelines-reverse-solicitation-under-mica' },
  { n: 5, name: 'ESMA Guidelines on qualification as financial instruments (19.03.2025)', url: 'https://www.esma.europa.eu/document/guidelines-conditions-and-criteria-qualification-crypto-assets-financial-instruments' },
  { n: 6, name: 'ESMA Public Statement on end of MiCA transition (23.06.2026)', url: 'https://www.esma.europa.eu/sites/default/files/2026-06/ESMA75-113276571-1710_Public_Statement_MiCA_transitional_period_ends.pdf' },
  { n: 7, name: 'EBA Travel Rule Guidelines, EBA/GL/2024/11', url: 'https://www.eba.europa.eu/activities/single-rulebook/regulatory-activities/anti-money-laundering-and-countering-financing-terrorism/guidelines-information-requirements-relation-transfers-funds-and-certain-crypto-assets-transfers' },
  { n: 8, name: 'EBA ML/TF Risk Factors Guidelines, EBA/GL/2024/01', url: 'https://www.eba.europa.eu/publications-and-media/press-releases/eba-issues-guidance-crypto-asset-service-providers' },
  { n: 9, name: 'DORA — Regulation (EU) 2022/2554', url: 'https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng' },
  { n: 10, name: 'DAC8 — Council Directive (EU) 2023/2226', url: 'https://eur-lex.europa.eu/eli/dir/2023/2226/oj/eng' },
  { n: 11, name: 'European Commission: DAC8 implementation', url: 'https://taxation-customs.ec.europa.eu/taxation/tax-transparency-cooperation/administrative-cooperation-and-mutual-assistance/directive-administrative-cooperation-dac/dac8_en' },
  { n: 12, name: 'FATF: Seventh Targeted Update 2026', url: 'https://www.fatf-gafi.org/content/dam/fatf-gafi/reports/7th-targeted-update-on-implementation-fatf-standards-vas-vasps-2026.pdf.coredownload.pdf' },
  { n: 13, name: 'FATF: Targeted Report on DeFi (21.07.2026)', url: 'https://www.fatf-gafi.org/en/publications/Virtualassets/targeted-report-decentralised-finance-2026.html' },
  { n: 14, name: 'Europol: IOCTA 2026', url: 'https://www.europol.europa.eu/cms/sites/default/files/documents/IOCTA-2026.pdf' },
  { n: 15, name: 'EU e-Evidence — Regulation (EU) 2023/1543', url: 'https://eur-lex.europa.eu/eli/reg/2023/1543/oj/eng' },
  { n: 16, name: 'EU e-Evidence — Directive (EU) 2023/1544', url: 'https://eur-lex.europa.eu/eli/dir/2023/1544/oj/eng' },
  { n: 17, name: 'Regulation (EU) 2018/1805 — freezing/confiscation orders', url: 'https://eur-lex.europa.eu/eli/reg/2018/1805/oj/eng' },
  { n: 18, name: 'Directive (EU) 2024/1260 — asset recovery/confiscation', url: 'https://eur-lex.europa.eu/eli/dir/2024/1260/oj/eng' },
  { n: 19, name: 'Council of Europe: Budapest Convention', url: 'https://www.coe.int/en/web/cybercrime/the-budapest-convention' },
  { n: 20, name: 'Second Additional Protocol to the Budapest Convention', url: 'https://www.coe.int/en/web/cybercrime/second-additional-protocol' },
  { n: 21, name: 'Council of Europe: Ukraine 24/7 Network (28.04.2026)', url: 'https://www.coe.int/en/web/kyiv/-/enhancing-the-cooperation-through-the-24/7-network-in-accordance-with-article-35-of-the-budapest-convention-in-ukraine' },
  { n: 22, name: 'Council of Europe: Ukraine e-evidence reforms (08.07.2026)', url: 'https://www.coe.int/en/web/cybercrime/-/cybereast-and-cyberua-ukrainian-law-enforcement-authorities-and-the-verkhovna-rada-assessed-the-improvements-to-the-criminal-code-of-ukraine-in-line-with-international-standards' },
  { n: 23, name: 'INTERPOL: Digital Forensics First Responders, v7 (03.2021)', url: 'https://www.interpol.int/content/download/16243/file/Guidelines_to_Digital_Forensics_First_Responders_V7.pdf' },
  { n: 24, name: 'Council of the EU: sanctions against Russia', url: 'https://eur-lex.europa.eu/EN/legal-content/summary/eu-restrictive-measures-in-view-of-russia-s-invasion-of-ukraine.html' },
  { n: 25, name: 'Regulation (EU) No 269/2014', url: 'https://eur-lex.europa.eu/eli/reg/2014/269/oj/eng' },
  { n: 26, name: 'Regulation (EU) No 833/2014', url: 'https://eur-lex.europa.eu/eli/reg/2014/833/oj/eng' },
  { n: 27, name: 'European Commission: sanctions FAQs portal', url: 'https://finance.ec.europa.eu/publications/consolidated-version_en' },
  { n: 28, name: 'OFAC: Sanctions Compliance Guidance for Virtual Currency', url: 'https://home.treasury.gov/news/press-releases/jy0410' },
  { n: 29, name: "Закон України № 2074-IX «Про віртуальні активи»", url: 'https://zakon.rada.gov.ua/laws/show/2074-20' },
  { n: 30, name: 'Законопроєкт № 10225-д', url: 'https://itd.rada.gov.ua/billinfo/Bills/Card/56271' },
  { n: 31, name: 'Закон України № 361-IX про фінансовий моніторинг', url: 'https://zakon.rada.gov.ua/laws/show/361-20' },
  { n: 32, name: 'КПК України — ст. 170-174, розділ IX', url: 'https://zakon.rada.gov.ua/laws/show/4651-17' },
  { n: 33, name: 'Рада з фінансової стабільності / НБУ: концепція ринку ВА', url: 'https://bank.gov.ua/ua/news/all/rfs-vidznachila-riziki-pidvischenogo-opodatkuvannya-bankiv-i-shvalila-kontseptsiyu-regulyuvannya-rinku-virtualnih-aktiviv' },
  { n: 34, name: 'Рішення Правління НБУ від 02.04.2026 № 93-рш (Crypsee)', url: 'https://bank.gov.ua/ua/news/all/schodo-vedennya-nezakonnoyi-diyalnosti-onlayn-servisom-crypsee' },
  { n: 35, name: 'Кіберполіція: як уберегтися від шахрайства з криптовалютою (08.01.2026)', url: 'https://cyberpolice.gov.ua/article/yak-uberegty-sebe-vid-shaxrayiv-pry-investuvanni-u-kryptovalyutu-porady-kiberpolicziyi-3701/' },
  { n: 36, name: 'EUR-Lex: e-Evidence — scope and application date', url: 'https://eur-lex.europa.eu/EN/legal-content/summary/electronic-evidence-in-criminal-proceedings-production-and-preservation-orders.html' },
];

export const methodology = {
  method:
    "Матеріал підготовлено шляхом аналізу нормативних актів, наглядових роз'яснень, публічних заяв, policy papers і risk reports. Показники FATF щодо Travel Rule та DeFi походять із self-reported опитувань і не перевірялися FATF незалежно. Прогнозні висновки відокремлено від чинних юридичних вимог. У тексті розмежовано обов'язкові норми, наглядові роз'яснення та авторські рекомендації. Англомовні терміни збережено лише для усталених правових і технічних понять.",
  limits:
    "Цей звіт має загальноінформаційний характер, не є індивідуальною юридичною, податковою, інвестиційною або фінансовою консультацією та не створює відносин адвокат–клієнт. Застосовне право залежить від структури продукту, юрисдикції, клієнтської бази, фактичних операцій і змін законодавства після дати звіту.",
  about:
    "«Ганган і Партнери» супроводжує складні кримінальні, регуляторні та транскордонні питання у сфері віртуальних активів: AML і блокування активів, криптошахрайство, електронні докази, міжнародне співробітництво, екстрадиція, санкційні ризики та вихід українських проєктів на ринок ЄС.",
  formats: [
    'Product classification', 'EU market-entry risk review', 'AML/Travel Rule gap assessment',
    '48-hour crypto incident response', 'Cross-border evidence & asset recovery strategy',
  ],
};
