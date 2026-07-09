import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

const PACKAGES = [
  {
    name: "react-canvas-timechart",
    desc: "High-frequency time-series charting rendered straight to canvas — built for sensor-grade data rates.",
  },
  {
    name: "react-canvas-gauge-3d",
    desc: "3D instrument gauges for React dashboards, drawn with the raw Canvas API.",
  },
  {
    name: "react-native-gauge-3d",
    desc: "The same 3D gauge instrumentation, ported to React Native.",
  },
  {
    name: "react-captcha-slider",
    desc: "A slide-to-verify captcha component with smooth, physics-feeling interaction.",
  },
];

function NpmIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
    </svg>
  );
}

export default function OpenSource() {
  return (
    <section id="opensource" className="relative mx-auto max-w-6xl px-6 py-32">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.35em] text-violet">
          04 / INSTRUMENTS RELEASED
        </p>
        <h2 className="mt-4 font-display text-4xl font-extrabold uppercase tracking-tight text-fg sm:text-6xl">
          Open <span className="text-outline">source</span>
        </h2>
        <p className="mt-4 max-w-lg text-muted">
          Four published npm packages — the same rendering techniques behind my
          production dashboards, packaged for everyone.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {PACKAGES.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.07}>
            <TiltCard className="h-full">
              <a
                href={`https://www.npmjs.com/package/${p.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full cursor-pointer flex-col rounded-2xl border border-line bg-surface/70 p-7 backdrop-blur-xl transition-colors duration-300 hover:border-accent/40"
              >
                <div className="flex items-center justify-between">
                  <span className="text-dim transition-colors duration-300 group-hover:text-accent">
                    <NpmIcon />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-dim">
                    NPM / PUBLIC
                  </span>
                </div>
                <h3 className="mt-6 font-mono text-base text-fg transition-colors duration-300 group-hover:text-accent">
                  {p.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {p.desc}
                </p>
                <span className="mt-6 font-mono text-[11px] tracking-[0.25em] text-dim transition-colors duration-300 group-hover:text-violet">
                  VIEW PACKAGE →
                </span>
              </a>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
