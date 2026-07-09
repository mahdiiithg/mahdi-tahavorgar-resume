"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

function StaggeredWord({
  word,
  delay,
  className,
}: {
  word: string;
  delay: number;
  className: string;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={`block overflow-hidden ${className}`}>
      <span className="flex justify-center">
        {word.split("").map((ch, i) => (
          <motion.span
            key={i}
            initial={reduced ? { y: 0 } : { y: "115%", rotateX: -45 }}
            animate={{ y: 0, rotateX: 0 }}
            transition={{ duration: 1.1, delay: delay + i * 0.045, ease: EASE }}
            className="text-chrome inline-block will-change-transform"
          >
            {ch}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // hero content recedes into depth as you begin the dive
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      <motion.div
        style={reduced ? undefined : { scale, opacity, y }}
        className="flex w-full flex-col items-center"
      >
        <motion.p
          initial={reduced ? {} : { opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
          className="mb-8 text-center font-mono text-[11px] text-accent sm:text-xs"
        >
          SENIOR FRONT-END ENGINEER · TEAM LEAD · DUBAI
        </motion.p>

        <h1 className="perspective-1200 text-center font-display font-extrabold uppercase leading-[0.95] tracking-tight">
          <StaggeredWord
            word="MAHDI"
            delay={0.35}
            className="text-[15vw] sm:text-[13vw] lg:text-[10.5rem]"
          />
          <StaggeredWord
            word="TAHAVORGAR"
            delay={0.7}
            className="text-[7.7vw] sm:text-[7.4vw] lg:text-[6.1rem]"
          />
        </h1>

        <motion.p
          initial={reduced ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: EASE }}
          className="mt-10 max-w-2xl text-center text-base leading-relaxed text-muted sm:text-lg"
        >
          I engineer interfaces that move at the speed of data — real-time
          dashboards streaming{" "}
          <span className="text-fg">110+ live sensors</span>, crypto trading
          platforms, and canvas rendering engines that never drop a frame.
        </motion.p>

        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.75, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group relative cursor-pointer overflow-hidden rounded-full border border-accent/60 px-7 py-3 font-mono text-xs tracking-[0.2em] text-accent transition-colors duration-300 hover:text-ink"
          >
            <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-300 ease-out group-hover:translate-x-0" />
            <span className="relative">START THE DIVE ↓</span>
          </a>
          <a
            href="https://github.com/mahdiiithg"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer rounded-full border border-line px-7 py-3 font-mono text-xs tracking-[0.2em] text-muted transition-colors duration-300 hover:border-violet hover:text-violet"
          >
            GITHUB
          </a>
        </motion.div>
      </motion.div>

      {/* corner HUD */}
      <motion.div
        initial={reduced ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 2 }}
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-6 pb-6 font-mono text-[10px] tracking-[0.25em] text-dim sm:px-10"
      >
        <div className="hidden space-y-1 sm:block">
          <p>EXP / 7+ YRS</p>
          <p>SENSORS / 110+</p>
        </div>
        <div className="mx-auto flex flex-col items-center gap-2 sm:mx-0">
          <span className="inline-block h-8 w-px bg-gradient-to-b from-transparent via-accent to-transparent" />
          <p className="animate-pulse-slow">SCROLL TO DESCEND</p>
        </div>
        <div className="hidden space-y-1 text-right sm:block">
          <p>SPEED / +80%</p>
          <p>MEMORY / −87.5%</p>
        </div>
      </motion.div>
    </section>
  );
}
