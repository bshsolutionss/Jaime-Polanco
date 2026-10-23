import { sectionIds, siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionary";
import { ServiceTabs, type ServiceTabData } from "@/components/sections/ServiceTabs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whatsappHref } from "@/lib/links";

export function Services({ t }: { t: Dictionary }) {
  const { services } = t;
  const tabs: ServiceTabData[] = siteConfig.serviceCategories.map((category) => ({
    id: category.id,
    icon: category.icon,
    label: services.categories[category.id],
    note: services.categoryNotes[category.id],
    countLabel: services.count.replace("{n}", String(category.services.length)),
    items: category.services.map((id) => ({
      id,
      ...services.items[id],
      // Opens WhatsApp with the service already named, so the first message is never blank.
      askHref: whatsappHref(services.askGreeting.replace("{service}", services.items[id].name)),
    })),
  }));

  return (
    <section id={sectionIds.services} aria-labelledby="services-title" className="bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="services-title" title={services.title} intro={services.intro} />
        <ServiceTabs
          tabs={tabs}
          label={services.tablistLabel}
          askLabel={services.ask}
          newTabLabel={t.common.newTab}
          showAllLabel={services.showAll}
          showLessLabel={services.showLess}
        />
      </div>
    </section>
  );
}
