"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Job = {
  level: string;
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  tags: string[];
  accent: "accent" | "violet";
};

const JOBS: Job[] = [
  {
    level: "01",
    company: "SAXON SOFTWARE",
    role: "Senior Front-End Engineer / Team Lead",
    period: "Oct 2022 — Present",
    location: "Dubai, UAE",
    highlights: [
      "Leading a team of 4 front-end engineers — code reviews, technical interviews, mentorship.",
      "Architected the entire front end of a drilling & mud-logging platform used globally by field engineers.",
      "Real-time dashboards monitoring 110+ industrial sensors over WebSockets, with custom charts and zoom-based analysis.",
      "80% faster application and UX scores after architecture redesign and state-management optimization.",
      "Memory cut from 400MB to 50MB by optimizing high-frequency data rendering.",
    ],
    tags: ["React", "TypeScript", "WebSockets", "Canvas API", "Leadership"],
    accent: "accent",
  },
  {
    level: "02",
    company: "FIBODEX",
    role: "Senior Front-End Engineer / Technical Lead",
    period: "May 2020 — Jun 2022",
    location: "Karaj, Iran",
    highlights: [
      "Architected and led the front end of a scalable real-time cryptocurrency trading platform.",
      "Next.js SSR migration delivered a 50% increase in organic traffic through improved SEO.",
      "Low-latency trading interfaces with integrated TradingView charts for live market data.",
    ],
    tags: ["Next.js", "Redux Toolkit", "TradingView", "SSR"],
    accent: "violet",
  },
  {
    level: "03",
    company: "GYM MATE",
    role: "Founder & Lead Developer",
    period: "May 2019 — May 2020",
    location: "Karaj, Iran",
    highlights: [
      "Founded and bootstrapped a sports social networking platform — concept to launch as sole technical founder.",
      "Cross-platform mobile app shipped with React Native, Node.js and MongoDB.",
    ],
    tags: ["React Native", "Node.js", "MongoDB", "Product"],
    accent: "accent",
  },
  {
    level: "04",
    company: "AZADEH TRAVEL",
    role: "Front-End Developer",
    period: "Jan 2018 — May 2019",
    location: "Karaj, Iran",
    highlights: [
      "Responsive, cross-browser web applications built with JavaScript and React.",
      "Multiple front-end deliveries including web prototypes and a native mobile app.",
    ],
    tags: ["JavaScript", "React", "Responsive Design"],
    accent: "violet",
  },
];

function Chapter({ job, index }: { job: Job; index: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bigY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const accentText = job.accent === "accent" ? "text-accent" : "text-violet";
  const accentBorder =
    job.accent === "accent"
      ? "hover:border-accent/40 border-line"
      : "hover:border-violet/40 border-line";
  const flipDirection = index % 2 === 0 ? 8 : -8;

  return (
    <div ref={ref} className="relative flex min-h-screen items-center py-24">
      {/* giant parallax level number */}
      <motion.span
        aria-hidden="true"
        style={reduced ? undefined : { y: bigY }}
        className="text-outline pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-display text-[36vw] font-extrabold leading-none sm:text-[24rem]"
      >
        {job.level}
      </motion.span>

      <div className="perspective-1200 relative z-10 w-full">
        <motion.article
          initial={
            reduced
              ? { opacity: 1 }
              : { opacity: 0, rotateY: flipDirection, y: 60, transformPerspective: 1200 }
          }
          whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1, ease: EASE }}
          className={`preserve-3d max-w-2xl rounded-2xl border ${accentBorder} bg-surface/70 p-8 backdrop-blur-xl transition-colors duration-500 sm:p-10`}
        >
          <div className="flex items-baseline justify-between gap-4">
            <span className={`font-mono text-xs tracking-[0.3em] ${accentText}`}>
              LEVEL {job.level}
            </span>
            <span className="font-mono text-[11px] text-dim">
              {job.period}
            </span>
          </div>

          <h3 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-fg sm:text-5xl">
            {job.company}
          </h3>
          <p className={`mt-2 text-sm sm:text-base ${accentText}`}>
            {job.role} · {job.location}
          </p>

          <ul className="mt-7 space-y-3.5">
            {job.highlights.map((h) => (
              <li
                key={h}
                className="flex gap-3 text-[15px] leading-relaxed text-muted"
              >
                <span
                  className={`mt-[10px] h-1 w-1 shrink-0 rounded-full ${
                    job.accent === "accent" ? "bg-accent" : "bg-violet"
                  }`}
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-2">
            {job.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-ink/60 px-3.5 py-1.5 font-mono text-[11px] text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.article>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6">
      <div className="pt-24">
        <p className="font-mono text-xs tracking-[0.35em] text-violet">
          02 / THE DESCENT
        </p>
        <h2 className="mt-4 font-display text-4xl font-extrabold uppercase tracking-tight text-fg sm:text-6xl">
          Four levels <span className="text-outline">down</span>
        </h2>
      </div>
      {JOBS.map((job, i) => (
        <Chapter key={job.company} job={job} index={i} />
      ))}
    </section>
  );
}
