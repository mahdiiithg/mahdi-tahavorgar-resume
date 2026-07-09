import type { Metadata } from "next";
import { Syne, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mahdi-tahavorgar.boppgames.com"),
  title: "Mahdi Tahavorgar — Senior Front-End Engineer & Team Lead",
  description:
    "Senior Front-End Engineer with 7+ years building high-performance, real-time web applications. React, Next.js, TypeScript. 110+ sensor dashboards, crypto trading platforms, 80% performance gains.",
  keywords: [
    "Mahdi Tahavorgar",
    "Senior Front-End Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Team Lead",
    "Dubai",
    "Real-time Data Visualization",
    "WebGL",
  ],
  openGraph: {
    title: "Mahdi Tahavorgar — Senior Front-End Engineer & Team Lead",
    description:
      "Interfaces that move at the speed of data. 7+ years of real-time web engineering: React, Next.js, TypeScript.",
    url: "https://mahdi-tahavorgar.boppgames.com",
    siteName: "Mahdi Tahavorgar",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-ink">
      <body
        className={`${syne.variable} ${grotesk.variable} ${jetbrains.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
