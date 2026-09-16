"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { ServiceId } from "../hero/serviceData";
import { SERVICE_CONTENT } from "./serviceContent";
import WebVisualizer from "./visualizers/WebVisualizer";
import SoftwareVisualizer from "./visualizers/SoftwareVisualizer";
import BrandingVisualizer from "./visualizers/BrandingVisualizer";
import GraphicVisualizer from "./visualizers/GraphicVisualizer";
import MotionVisualizer from "./visualizers/MotionVisualizer";
import AIVisualizer from "./visualizers/AIVisualizer";

const VISUALIZERS: Record<ServiceId, () => React.ReactElement> = {
  web: WebVisualizer,
  software: SoftwareVisualizer,
  branding: BrandingVisualizer,
  graphic: GraphicVisualizer,
  motion: MotionVisualizer,
  ai: AIVisualizer,
};

// preset offsets so the particle burst needs no per-render randomness
const PARTICLES = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  const radius = 34 + ((i * 13) % 18);
  return {
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius * 0.7,
  };
});

export default function ServiceVisualizer({ activeService }: { activeService: ServiceId }) {
  const [displayed, setDisplayed] = useState<ServiceId>(activeService);
  const stageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (activeService === displayed) return;

    const stage = stageRef.current;
    const particleEls = particlesRef.current?.children;
    if (!stage || !particleEls) {
      setDisplayed(activeService);
      return;
    }

    const tl = gsap.timeline();
    // 1) current visual recedes + dissolves
    tl.to(stage, {
      scale: 0.9,
      opacity: 0,
      filter: "blur(6px)",
      duration: 0.28,
      ease: "power2.in",
    });
    // 2) particles burst outward then converge back to center
    tl.set(particleEls, { opacity: 0, x: 0, y: 0, scale: 0.4 }, "<");
    tl.to(
      particleEls,
      {
        opacity: 1,
        x: (i: number) => (PARTICLES[i].x - 50) * 2.2,
        y: (i: number) => (PARTICLES[i].y - 50) * 2.2,
        scale: 1,
        duration: 0.3,
        stagger: 0.012,
        ease: "power1.out",
      },
      "<"
    );
    tl.add(() => setDisplayed(activeService));
    tl.to(particleEls, {
      opacity: 0,
      x: 0,
      y: 0,
      scale: 0.3,
      duration: 0.32,
      stagger: 0.01,
      ease: "power2.in",
    });
    // 3) new visual assembles
    tl.fromTo(
      stage,
      { scale: 0.92, opacity: 0, filter: "blur(6px)" },
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.36, ease: "back.out(1.6)" },
      "-=0.15"
    );

    return () => {
      // if this transition gets interrupted by another tab being picked
      // before it finishes (tl.kill() stops it mid-tween), snap the stage
      // and particles back to their normal resting state instead of
      // leaving the visual permanently faded/blurred/invisible — the next
      // effect run will animate a fresh transition from this clean baseline
      tl.kill();
      gsap.set(stage, { opacity: 1, scale: 1, filter: "none" });
      gsap.set(particleEls, { opacity: 0, x: 0, y: 0, scale: 0.4 });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeService]);

  const Visual = VISUALIZERS[displayed];
  const glow = SERVICE_CONTENT[displayed].glow;

  return (
    <div className="relative aspect-[4/3.1] w-full max-w-[560px]">
      {/* service-tinted ambient glow behind the visual */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-[40px] opacity-40 blur-3xl transition-colors duration-700"
        style={{ background: `radial-gradient(60% 60% at 50% 45%, ${glow}33, transparent 75%)` }}
      />

      <div
        ref={stageRef}
        className="relative h-full w-full overflow-hidden rounded-[32px] border border-border-soft bg-surface/85 shadow-[0_30px_70px_-30px_rgba(76,58,140,0.35)]"
      >
        <Visual />
      </div>

      <div ref={particlesRef} className="pointer-events-none absolute inset-0">
        {PARTICLES.map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
            style={{ background: glow }}
          />
        ))}
      </div>
    </div>
  );
}
