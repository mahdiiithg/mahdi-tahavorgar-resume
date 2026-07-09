import Reveal from "./Reveal";

const ROW_A = [
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript ES6+",
  "Redux Toolkit",
  "Tailwind CSS",
  "WebSockets",
  "Canvas API",
  "TradingView",
];

const ROW_B = [
  "Real-time Charts",
  "Sensor Dashboards",
  "Front-End Architecture",
  "Performance Optimization",
  "Team Leadership",
  "Mentoring",
  "Node.js",
  "Docker",
  "CI/CD",
  "Git",
];

function MarqueeRow({
  items,
  reverse = false,
  accent,
}: {
  items: string[];
  reverse?: boolean;
  accent: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden">
      <div
        className={`flex shrink-0 items-center gap-4 pr-4 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((s, i) => (
          <span
            key={`${s}-${i}`}
            className={`whitespace-nowrap rounded-full border border-line bg-surface/70 px-6 py-3 font-display text-lg font-semibold text-muted backdrop-blur transition-colors duration-300 ${accent}`}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.35em] text-violet">
            05 / CAPABILITIES
          </p>
          <h2 className="mt-4 font-display text-4xl font-extrabold uppercase tracking-tight text-fg sm:text-6xl">
            The <span className="text-outline">toolkit</span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-16 space-y-5">
        <MarqueeRow items={ROW_A} accent="hover:text-accent hover:border-accent/40" />
        <MarqueeRow items={ROW_B} reverse accent="hover:text-violet hover:border-violet/40" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <Reveal delay={0.1}>
          <p className="mt-14 font-mono text-xs leading-relaxed text-dim">
            EDUCATION / B.Sc. Electronic Technology Engineering — Ghiaseddin
            Jamshid Kashani University, 2016
          </p>
        </Reveal>
      </div>
    </section>
  );
}
