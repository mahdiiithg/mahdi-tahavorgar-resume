import Reveal from "./Reveal";

const LINKS = [
  {
    label: "EMAIL",
    value: "mahditahavorgar@gmail.com",
    href: "mailto:mahditahavorgar@gmail.com",
  },
  {
    label: "PHONE",
    value: "+971 58 525 0180",
    href: "tel:+971585250180",
  },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/mahdi-tahavorgar",
    href: "https://www.linkedin.com/in/mahdi-tahavorgar",
  },
  {
    label: "GITHUB",
    value: "github.com/mahdiiithg",
    href: "https://github.com/mahdiiithg",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative flex min-h-screen flex-col justify-center overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-6 py-32">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.35em] text-violet">
            06 / ARRIVAL
          </p>
          <h2 className="mt-6 font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-8xl">
            <span className="text-chrome">Let&apos;s build</span>
            <br />
            <span className="text-accent text-glow-accent">something fast.</span>
          </h2>
          <p className="mt-8 max-w-lg text-lg text-muted">
            Open to senior front-end and technical leadership roles. If your
            product needs interfaces that keep up with your data, get in touch.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group cursor-pointer rounded-2xl border border-line bg-surface/70 p-7 backdrop-blur-xl transition-all duration-300 hover:border-accent/40 hover:bg-raise/70"
              >
                <p className="font-mono text-[10px] tracking-[0.3em] text-dim transition-colors duration-300 group-hover:text-violet">
                  {l.label}
                </p>
                <p className="mt-3 break-all font-mono text-sm text-fg transition-colors duration-300 group-hover:text-accent sm:text-base">
                  {l.value}
                </p>
              </a>
            ))}
          </div>
        </Reveal>

        <footer className="mt-28 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] tracking-[0.25em] text-dim">
            © {new Date().getFullYear()} MAHDI TAHAVORGAR · DUBAI, UAE
          </p>
          <p className="font-mono text-[11px] tracking-[0.25em] text-dim">
            DESIGNED &amp; ENGINEERED BY ME · NEXT.JS + WEBGL
          </p>
        </footer>
      </div>
    </section>
  );
}
