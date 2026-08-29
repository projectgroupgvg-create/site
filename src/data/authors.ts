// Shared author/credential data for site content that needs to attribute a
// named, verifiable person (blog posts today; news items or reports later).
// Single source of truth so the byline shown in Article JSON-LD carries the
// exact same E-E-A-T signals (job title, expertise areas, ЄРАУ registry
// link) as the person's own /team/[slug] profile page — instead of each
// call site re-typing (and risking drifting from) the same credentials.
export const AUTHOR_VIACHESLAV_GANGAN = {
  name: "В'ячеслав Ганган",
  path: '/team/viacheslav-gangan',
  jobTitle: 'Адвокат, керуючий партнер',
  knowsAbout: ['Кримінальне право', 'Корпоративне право', 'Віртуальні активи', 'AML', 'Транскордонні провадження'],
  sameAs: [
    'https://erau.unba.org.ua/profile/39973',
    'https://www.obozrevatel.com/ukr/person/gangan-vyacheslav-georgievich.htm',
  ],
};
