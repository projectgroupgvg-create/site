import { useTranslations } from 'next-intl';
import ContactGraphic from './ContactGraphic';
import { formEndpoint } from '@/lib/site';

const phoneRaw = '+380965549847';

export default function ContactSection() {
  const t = useTranslations('Contact');

  const items = [
    { icon: '✦', label: t('addrLabel'), value: t('addrValue') },
    { icon: '✉', label: t('emailLabel'), value: 'gangan.partners@gmail.com', href: 'mailto:gangan.partners@gmail.com' },
    { icon: '✆', label: t('phoneLabel'), value: t('phoneValue'), href: `tel:${phoneRaw}` },
    {
      icon: 'WA',
      label: 'WhatsApp',
      value: t('phoneValue'),
      href: `https://wa.me/${phoneRaw.replace('+', '')}`,
    },
    { icon: 'TG', label: 'Telegram', value: '@gangan_law', href: 'https://t.me/gangan_law' },
  ];

  return (
    <section
      id="contacts"
      className="relative overflow-hidden border-t-hair bg-[var(--bg3)]"
      style={{ borderColor: 'var(--b)' }}
    >
      <ContactGraphic className="pointer-events-none absolute -right-[12%] top-1/2 h-[900px] w-[900px] -translate-y-1/2 opacity-[0.16] sm:opacity-[0.22]" />

      <div className="relative z-10 grid grid-cols-1 gap-12 px-6 py-24 sm:px-11 lg:grid-cols-2 lg:gap-20">
        <div>
          <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.4em] text-[var(--s3)]">
            {t('lbl')}
          </div>
          <h2 className="mb-5 font-serif text-[clamp(26px,3.2vw,44px)] font-light leading-[1.1] text-[var(--ink)]">
            {t('title')}
          </h2>
          <div className="divider" />
          <p className="mb-10 max-w-[460px] text-[14.5px] leading-[1.8] text-[var(--ink3)]">
            {t('sub')}
          </p>

          <div className="flex flex-col gap-6">
            {items.map((item) => {
              const Wrapper = item.href ? 'a' : 'div';
              return (
              <Wrapper
                key={item.label}
                {...(item.href
                  ? { href: item.href, target: item.href.startsWith('http') ? '_blank' : undefined, rel: item.href.startsWith('http') ? 'noopener noreferrer' : undefined }
                  : {})}
                className={`flex items-start gap-5 ${item.href ? 'transition-colors hover:opacity-80' : ''}`}
              >
                <div
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-sm border-hair bg-[var(--wh)] text-[10px] font-semibold text-[var(--s3)]"
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
              </Wrapper>
              );
            })}
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
              className="rounded-sm border-hair bg-[var(--wh)] px-3.5 py-3 text-[13px] text-[var(--ink)] outline-none placeholder:text-[var(--ink3)]"
              style={{ borderColor: 'var(--b)' }}
            />
            <input
              type="tel"
              name="phone"
              placeholder={t('formPhone')}
              required
              className="rounded-sm border-hair bg-[var(--wh)] px-3.5 py-3 text-[13px] text-[var(--ink)] outline-none placeholder:text-[var(--ink3)]"
              style={{ borderColor: 'var(--b)' }}
            />
            <input
              type="email"
              name="email"
              placeholder={t('formEmail')}
              className="rounded-sm border-hair bg-[var(--wh)] px-3.5 py-3 text-[13px] text-[var(--ink)] outline-none placeholder:text-[var(--ink3)]"
              style={{ borderColor: 'var(--b)' }}
            />
            <textarea
              name="message"
              placeholder={t('formMessage')}
              rows={4}
              required
              className="resize-y rounded-sm border-hair bg-[var(--wh)] px-3.5 py-3 text-[13px] text-[var(--ink)] outline-none placeholder:text-[var(--ink3)]"
              style={{ borderColor: 'var(--b)' }}
            />
            <button
              type="submit"
              className="mt-1 rounded-sm bg-[var(--ink)] px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--wh)] transition-colors hover:bg-[var(--ink-hover)]"
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
