import { Icon } from "@/components/ui/Icon";
import { whatsappHref } from "@/lib/links";

export function WhatsAppFab({ label, greeting }: { label: string; greeting: string }) {
  return (
    <a
      href={whatsappHref(greeting)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fab-pulse fixed bottom-5 right-4 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-white md:hidden"
    >
      <Icon name="whatsapp" className="size-7" />
    </a>
  );
}
