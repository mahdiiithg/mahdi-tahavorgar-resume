"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const SENTENCE =
  "Most interfaces show data. Mine keep up with it. Seven years of drilling platforms, trading engines and canvas renderers — where a dropped frame is a dropped signal.";

const WORDS = SENTENCE.split(" ");

function Word({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const blur = useTransform(progress, range, [4, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const highlight =
    children === "data." || children === "signal." || children === "keep";
  return (
    <motion.span
      style={{ opacity, filter }}
      className={`inline-block will-change-[opacity,filter] ${
        highlight ? "text-accent" : ""
      }`}
    >
      {children}&nbsp;
    </motion.span>
  );
}

export default function Manifesto() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"],
  });

  return (
    <section ref={ref} className="relative mx-auto max-w-5xl px-6 py-[32vh]">
      <p className="mb-10 font-mono text-xs tracking-[0.35em] text-violet">
        01 / THE SIGNAL
      </p>
      {reduced ? (
        <p className="font-display text-3xl font-bold leading-snug text-fg sm:text-5xl">
          {SENTENCE}
        </p>
      ) : (
        <p className="font-display text-3xl font-bold leading-snug text-fg sm:text-5xl">
          {WORDS.map((w, i) => (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[i / WORDS.length, Math.min((i + 4) / WORDS.length, 1)]}
            >
              {w}
            </Word>
          ))}
        </p>
      )}
    </section>
  );
}
