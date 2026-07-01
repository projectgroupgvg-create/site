import { useTranslations } from 'next-intl';

const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? '';

export default function ContactSection() {
  const t = useTranslations('Contact');

  const items = [
    { icon: '✦', label: t('addrLabel'), value: t('addrValue') },
    { icon: '✉', label: t('emailLabel'), value: 'gangan.partners@gmail.com' },
    { icon: '✆', label: t('phoneLabel'), value: t('phoneValue') },
    { icon: '◎', label: 'Telegram', value: '@gangan_law' },
  ];

  return (
    <section id="contacts" className="border-t-hair bg-[var(--bg3)]" style={{ borderColor: 'var(--b)' }}>
      <div className="grid grid-cols-1 gap-12 px-6 py-24 sm:px-11 lg:grid-cols-2 lg:gap-20">
        <div>
          <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.4em] text-[var(--s3)]">
            {t('lbl')}
          </div>
          <h2 className="mb-5 font-serif text-[clamp(26px,3.2vw,44px)] font-bold leading-[1.1] text-[var(--ink)]">
            {t('title')}
          </h2>
          <div className="divider" />
          <p className="mb-10 max-w-[460px] text-[14.5px] leading-[1.8] text-[var(--ink3)]">
            {t('sub')}
          </p>

          <div className="flex flex-col gap-6">
            {items.map((item) => (
              <div key={item.label} className="flex items-start gap-5">
                <div
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center border-hair bg-[var(--wh)] text-[13px] text-[var(--s3)]"
                  style={{ borderColor: 'var(--b)' }}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="mb-0.5 text-[8.5px] font-medium uppercase tracking-[0.25em] text-[var(--ink3)]">
                    {item.label}
                  </div>
                  <div className="text-[13.5px] text-[var(--ink)]">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--s3)]">
            {t('formTitle')}
          </div>
          <form
            className="flex flex-col gap-3"
            action={formEndpoint || undefined}
            method="POST"
          >
            <input
              type="text"
              name="name"
              placeholder={t('formName')}
              required
              className="border-hair bg-[var(--wh)] px-3.5 py-3 text-[13px] text-[var(--ink)] outline-none placeholder:text-[var(--ink3)]"
              style={{ borderColor: 'var(--b)' }}
            />
            <input
              type="tel"
              name="phone"
              placeholder={t('formPhone')}
              required
              className="border-hair bg-[var(--wh)] px-3.5 py-3 text-[13px] text-[var(--ink)] outline-none placeholder:text-[var(--ink3)]"
              style={{ borderColor: 'var(--b)' }}
            />
            <input
              type="email"
              name="email"
              placeholder={t('formEmail')}
              className="border-hair bg-[var(--wh)] px-3.5 py-3 text-[13px] text-[var(--ink)] outline-none placeholder:text-[var(--ink3)]"
              style={{ borderColor: 'var(--b)' }}
            />
            <textarea
              name="message"
              placeholder={t('formMessage')}
              rows={4}
              required
              className="resize-y border-hair bg-[var(--wh)] px-3.5 py-3 text-[13px] text-[var(--ink)] outline-none placeholder:text-[var(--ink3)]"
              style={{ borderColor: 'var(--b)' }}
            />
            <button
              type="submit"
              className="mt-1 bg-[var(--ink)] px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--wh)] transition-colors hover:bg-[#333]"
            >
              {t('formSubmit')}
            </button>
            {!formEndpoint && (
              <p className="mt-1 text-[11px] text-[var(--ink3)]">
                Форма ще не підключена до жодного сервісу — додайте
                NEXT_PUBLIC_FORM_ENDPOINT (наприклад, Formspree) у .env.local.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
