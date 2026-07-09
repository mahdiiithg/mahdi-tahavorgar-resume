"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#experience", label: "EXPERIENCE" },
  { href: "#metrics", label: "IMPACT" },
  { href: "#opensource", label: "OPEN SOURCE" },
  { href: "#contact", label: "CONTACT" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-6 py-2.5 transition-all duration-500 ${
          scrolled
            ? "mx-4 border-line bg-ink/70 backdrop-blur-xl sm:mx-auto sm:max-w-3xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a
          href="#top"
          className="font-display text-base font-extrabold tracking-tight text-fg transition-colors duration-200 hover:text-accent"
        >
          MT<span className="text-accent">.</span>
        </a>
        <div className="hidden items-center gap-7 sm:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] tracking-[0.2em] text-muted transition-colors duration-200 hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="mailto:mahditahavorgar@gmail.com"
          className="rounded-full border border-accent/50 px-4 py-1.5 font-mono text-[11px] tracking-[0.2em] text-accent transition-colors duration-200 hover:bg-accent hover:text-ink"
        >
          HIRE ME
        </a>
      </nav>
    </header>
  );
}
