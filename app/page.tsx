import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Experience from "@/components/Experience";
import Metrics from "@/components/Metrics";
import OpenSource from "@/components/OpenSource";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import DepthGauge from "@/components/DepthGauge";
import SceneClient from "@/components/SceneClient";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main id="top" className="relative">
        <SceneClient />
        <Nav />
        <DepthGauge />
        <div className="relative z-10">
          <Hero />
          <Manifesto />
          <Experience />
          <Metrics />
          <OpenSource />
          <Skills />
          <Contact />
        </div>
      </main>
    </SmoothScroll>
  );
}
