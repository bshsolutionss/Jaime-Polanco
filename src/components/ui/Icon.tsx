import type { ReactNode } from "react";

export type IconName =
  | "whatsapp"
  | "phone"
  | "check"
  | "plus"
  | "menu"
  | "close"
  | "clock"
  | "pin"
  | "mail"
  | "language"
  | "lock"
  | "doc"
  | "passport"
  | "stamp"
  | "scale";

const paths: Record<IconName, ReactNode> = {
  whatsapp: (
    <>
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" />
      <path d="M9 8.5c0 3.6 2.9 6.5 6.5 6.5l1-1.4-2-1-1 .8a4.4 4.4 0 0 1-2.4-2.4l.8-1-1-2L9 8.5Z" />
    </>
  ),
  phone: (
    <path d="M5 4h3.5l1.5 4-2 1.5a10 10 0 0 0 6.5 6.5L16 14l4 1.5V19a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1Z" />
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  language: (
    <>
      <path d="M4 5h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H8l-3 2.5V13H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
      <path d="M14 9h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1v2.5L16 17h-5a1 1 0 0 1-1-1v-3" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="1.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2" />
    </>
  ),
  doc: (
    <>
      <path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10.5A.5.5 0 0 1 6.5 20V4a.5.5 0 0 1 .5-.5Z" />
      <path d="M14 3.5V8h4M9.5 12h5M9.5 15.5h5" />
    </>
  ),
  passport: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <circle cx="12" cy="10" r="3" />
      <path d="M9 17h6" />
    </>
  ),
  stamp: (
    <>
      <path d="M10 3.5h4a1 1 0 0 1 1 1v3.5l-1 3h-4l-1-3V4.5a1 1 0 0 1 1-1Z" />
      <path d="M5 14.5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2V17H5v-2.5ZM4 20.5h16" />
    </>
  ),
  scale: (
    <>
      <path d="M12 3.5v17M8 20.5h8M5 7h14" />
      <path d="m5 7-2.5 6a2.5 2.5 0 0 0 5 0L5 7ZM19 7l-2.5 6a2.5 2.5 0 0 0 5 0L19 7Z" />
    </>
  ),
};

export function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
