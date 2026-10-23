import { allServiceIds, sectionIds, siteConfig, type Locale } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionary";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { Ornament } from "@/components/ui/Ornament";
import { formatHours } from "@/lib/hours";
import { telHref, whatsappHref } from "@/lib/links";

export function Contact({ locale, t }: { locale: Locale; t: Dictionary }) {
  const services = [
    ...allServiceIds.map((id) => ({ value: id, label: t.services.items[id].name })),
    { value: "other", label: t.contact.form.serviceOther },
  ];
  const { direct } = t.contact;

  return (
    <section id={sectionIds.contact} aria-labelledby="contact-title" className="py-16 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[7fr_5fr] lg:gap-16">
        <div>
          <SectionHeading id="contact-title" title={t.contact.title} intro={t.contact.intro} />
          <div className="reveal mt-10 rounded-xl border border-rule bg-white p-5 shadow-[var(--shadow-lift)] sm:p-9">
            <ContactForm
              t={t.contact}
              services={services}
              whatsappNumber={siteConfig.whatsapp.number}
              whatsappGreeting={t.common.whatsappGreeting}
              newTabLabel={t.common.newTab}
            />
          </div>
        </div>

        <aside aria-labelledby="direct-title" className="lg:pt-2">
          <div className="reveal on-dark relative overflow-hidden rounded-xl bg-ink-deep p-7 text-on-dark shadow-[var(--shadow-deep)] sm:p-9 lg:sticky lg:top-28">
            <div aria-hidden="true" className="pointer-events-none absolute inset-2.5 rounded-lg border border-gold/30" />
            <h3 id="direct-title" className="text-2xl text-white">
              {direct.title}
            </h3>
            <Ornament className="mt-4" />

            <dl className="mt-7 space-y-6">
              <div>
                <dt className="text-sm">{direct.whatsapp}</dt>
                <dd className="mt-1">
                  <a
                    href={whatsappHref(t.common.whatsappGreeting)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-serif text-2xl text-white hover:text-gold"
                  >
                    <Icon name="whatsapp" className="size-6 text-gold" />
                    {siteConfig.phone.display}
                    <span className="sr-only"> {t.common.newTab}</span>
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm">{direct.phone}</dt>
                <dd className="mt-1">
                  <a href={telHref} className="inline-flex items-center gap-2 font-serif text-2xl text-white hover:text-gold">
                    <Icon name="phone" className="size-6 text-gold" />
                    {siteConfig.phone.display}
                  </a>
                </dd>
              </div>
              {siteConfig.social.instagram && (
                <div>
                  <dt className="text-sm">Instagram</dt>
                  <dd className="mt-1">
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-lg text-white hover:text-gold"
                    >
                      <span className="font-semibold text-gold">{siteConfig.social.instagramHandle}</span>
                      <span className="sr-only"> {t.common.newTab}</span>
                    </a>
                  </dd>
                </div>
              )}
              {siteConfig.email && (
                <div>
                  <dt className="text-sm">{direct.email}</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="inline-flex items-center gap-2 break-all text-lg text-white hover:text-gold"
                    >
                      <Icon name="mail" className="size-5 shrink-0 text-gold" />
                      {siteConfig.email}
                    </a>
                  </dd>
                </div>
              )}
              <div className="border-t border-white/10 pt-6">
                <dt className="flex items-center gap-2 text-sm">
                  <Icon name="pin" className="size-4 text-gold" />
                  {direct.area}
                </dt>
                <dd className="mt-1.5 text-white">
                  {siteConfig.address.locality}, {siteConfig.address.region}
                  <span className="block text-sm text-on-dark">{siteConfig.areaServed}</span>
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-sm">
                  <Icon name="clock" className="size-4 text-gold" />
                  {direct.hours}
                </dt>
                <dd className="mt-1.5 space-y-1 text-white">
                  {formatHours(locale, direct.rangeWord).map((row) => (
                    <p key={row.days} className="flex flex-wrap justify-between gap-x-4">
                      <span>{row.days}</span>
                      <span className="tabular-nums text-on-dark">{row.time}</span>
                    </p>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}
