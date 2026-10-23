import { Ornament } from "@/components/ui/Ornament";

type Props = { id: string; title: string; intro?: string; onDark?: boolean; align?: "left" | "center" };

export function SectionHeading({ id, title, intro, onDark = false, align = "left" }: Props) {
  const center = align === "center";
  return (
    <div className={`reveal max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <h2 id={id} className={`text-4xl leading-[1.08] sm:text-[3.25rem] ${onDark ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      <Ornament className="mt-5" align={align} />
      {intro && (
        <p className={`mt-5 text-lg leading-relaxed ${onDark ? "text-on-dark" : "text-muted"}`}>{intro}</p>
      )}
    </div>
  );
}
