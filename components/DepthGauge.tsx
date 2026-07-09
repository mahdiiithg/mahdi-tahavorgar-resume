"use client";

import { useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const MAX_DEPTH = 3200;

const STATIONS = [
  { at: 0.0, label: "SURFACE" },
  { at: 0.16, label: "SIGNAL" },
  { at: 0.32, label: "LVL 01" },
  { at: 0.46, label: "LVL 02" },
  { at: 0.56, label: "LVL 03" },
  { at: 0.64, label: "LVL 04" },
  { at: 0.78, label: "IMPACT" },
  { at: 1.0, label: "CORE" },
];

export default function DepthGauge() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });
  const [depth, setDepth] = useState(0);
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(smooth, "change", (v) => {
    setDepth(Math.round(v * MAX_DEPTH));
    setProgress(v);
  });

  return (
    <div
      aria-hidden="true"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 select-none flex-col items-center gap-3 lg:flex"
    >
      <span className="font-mono text-[10px] tracking-[0.3em] text-dim">
        DEPTH
      </span>
      <div className="relative h-[46vh] w-px bg-line">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 h-px w-2 -translate-x-1/2 bg-line"
            style={{ top: `${(i / 8) * 100}%` }}
          />
        ))}
        <div
          className="absolute left-0 top-0 w-px bg-gradient-to-b from-accent/70 to-violet"
          style={{ height: `${progress * 100}%` }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ top: `${progress * 100}%` }}
        >
          <div className="h-2.5 w-2.5 rotate-45 border border-accent bg-ink shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
        </div>
        {STATIONS.map((s) => (
          <span
            key={s.label}
            className={`absolute right-4 -translate-y-1/2 whitespace-nowrap font-mono text-[9px] tracking-[0.25em] transition-colors duration-300 ${
              progress >= s.at - 0.04 ? "text-accent" : "text-dim/50"
            }`}
            style={{ top: `${s.at * 100}%` }}
          >
            {s.label}
          </span>
        ))}
      </div>
      <span className="font-mono text-[11px] tabular-nums text-accent">
        {depth}m
      </span>
    </div>
  );
}
