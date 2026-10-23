/** Shown only when NEXT_PUBLIC_IS_DEMO=true. */
export function DemoRibbon({ label }: { label: string }) {
  return (
    <p className="pointer-events-none fixed bottom-5 left-4 z-40 rounded-full border border-gold/60 bg-ink-deep px-3 py-1.5 text-xs font-medium text-gold">
      {label}
    </p>
  );
}
