# Mahdi Tahavorgar — Portfolio

A cinematic, scroll-driven 3D portfolio for a Senior Front-End Engineer.
Live target: **https://mahdi-tahavorgar.boppgames.com**

## The concept — "The Descent"

The entire site is a journey through a WebGL particle universe that morphs as you scroll:

1. **Surface** — the hero floats above an undulating ocean of 6,500 particles
2. **The dive** — particles reform into a tunnel you fly through while career chapters (levels 01–04) pass by
3. **The core** — at the contact section, particles converge into a breathing wireframe core

Extras: Lenis smooth scrolling, Apple-style word-by-word manifesto reveal, 3D mouse-tilt cards,
depth gauge scroll indicator (right rail), animated metric counters, skill marquees.

## Stack

- Next.js 14 (App Router, static prerender) + TypeScript
- Three.js via @react-three/fiber (custom morphing particle system, no drei)
- Framer Motion (scroll-linked reveals) + Lenis (smooth scroll)
- Tailwind CSS — palette: ink `#050508`, accent `#22D3EE`, violet `#8B5CF6`
- Fonts: Syne (display) · Space Grotesk (body) · JetBrains Mono (HUD)

Performance: WebGL scene lazy-loads client-side (excluded from the 87 kB shared JS),
`prefers-reduced-motion` respected throughout, DPR capped at 1.5.

## Develop

```bash
npm install
npm run dev
```

## Deploy (Vercel)

```bash
npx vercel --prod
```

Then add the subdomain in Vercel → Project → Settings → Domains:
`mahdi-tahavorgar.boppgames.com`, and create a CNAME record on boppgames.com:

```
Type: CNAME  Name: mahdi-tahavorgar  Value: cname.vercel-dns.com
```
