import Counter from "./Counter";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

const METRICS = [
  {
    value: 80,
    suffix: "%",
    label: "FASTER APPLICATION",
    detail: "Architecture redesign & state-management optimization at Saxon",
    accent: "text-accent",
  },
  {
    value: 87,
    suffix: ".5%",
    label: "MEMORY REDUCED",
    detail: "400MB → 50MB by optimizing high-frequency data rendering",
    accent: "text-violet",
  },
  {
    value: 110,
    suffix: "+",
    label: "LIVE SENSORS",
    detail: "Streaming over WebSockets into custom real-time charts",
    accent: "text-accent",
  },
  {
    value: 50,
    suffix: "%",
    label: "MORE ORGANIC TRAFFIC",
    detail: "Next.js SSR migration for a crypto trading platform",
    accent: "text-violet",
  },
  {
    value: 4,
    suffix: "",
    label: "ENGINEERS MENTORED",
    detail: "Code reviews, interviews & growth as Team Lead",
    accent: "text-accent",
  },
  {
    value: 4,
    suffix: "",
    label: "NPM PACKAGES",
    detail: "Open-source canvas charting & gauge libraries",
    accent: "text-violet",
  },
];

export default function Metrics() {
  return (
    <section id="metrics" className="relative mx-auto max-w-6xl px-6 py-32">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.35em] text-violet">
          03 / SENSOR READINGS
        </p>
        <h2 className="mt-4 font-display text-4xl font-extrabold uppercase tracking-tight text-fg sm:text-6xl">
          Measured <span className="text-outline">impact</span>
        </h2>
        <p className="mt-4 max-w-lg text-muted">
          Not adjectives — instrument readings from shipped production systems.
        </p>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {METRICS.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.06}>
            <TiltCard className="h-full">
              <div className="group h-full rounded-2xl border border-line bg-surface/70 p-8 backdrop-blur-xl transition-colors duration-300 hover:border-accent/30">
                <p className={`font-display text-6xl font-extrabold ${m.accent}`}>
                  <Counter to={m.value} suffix={m.suffix} />
                </p>
                <p className="mt-5 font-mono text-xs tracking-[0.25em] text-fg">
                  {m.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-dim">
                  {m.detail}
                </p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
