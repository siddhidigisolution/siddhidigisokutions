"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { DirOverride, PointerState } from "./Robot";
import ServiceOrbit from "./ServiceOrbit";
import { randomExpression, type Expression } from "./expressions";
import RevealHeading from "../shared/RevealHeading";
import { usePrefersReducedMotion } from "../shared/usePrefersReducedMotion";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => null,
});

export default function HeroScene() {
  const sceneWrapRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<PointerState>({ x: 0, y: 0 });
  const dirOverrideRef = useRef<DirOverride>({ x: 0, y: 0, active: false });
  const scrollGazeRef = useRef({ x: 0, y: 0, active: false });
  const reducedMotion = usePrefersReducedMotion();

  const [expression, setExpression] = useState<Expression>("idle");
  const [revealed, setRevealed] = useState(false);
  const [copyIn, setCopyIn] = useState(false);

  const triggerExpression = useCallback(() => {
    setExpression((prev) => randomExpression(prev));
  }, []);

  const resetExpression = useCallback(() => {
    setExpression("idle");
  }, []);

  useEffect(() => {
    const copyTimer = setTimeout(() => setCopyIn(true), 60);
    const revealTimer = setTimeout(() => setRevealed(true), 650);
    return () => {
      clearTimeout(copyTimer);
      clearTimeout(revealTimer);
    };
  }, []);

  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) {
      let raf = 0;
      const start = performance.now();
      const loop = (now: number) => {
        const t = (now - start) / 1000;
        pointerRef.current.x = Math.sin(t * 0.35) * 0.5;
        pointerRef.current.y = Math.cos(t * 0.27) * 0.3;
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(raf);
    }

    const el = sceneWrapRef.current;
    const handleMove = (e: PointerEvent) => {
      const rect = el?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      pointerRef.current.x = Math.max(-1, Math.min(1, x));
      pointerRef.current.y = Math.max(-1, Math.min(1, -y));
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  // ambient "notice you're scrolling away" gaze: as the visitor starts
  // scrolling down from the very top, the robot glances downward, tracking
  // scroll progress over the first stretch of movement; ServiceOrbit reads
  // this as a fallback whenever nothing is hovered/selected
  useEffect(() => {
    if (reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      trigger: "#home",
      start: "top top",
      end: "top top-=260",
      scrub: 0.4,
      onUpdate: (self) => {
        scrollGazeRef.current.active = self.progress > 0.02;
        scrollGazeRef.current.x = 0;
        scrollGazeRef.current.y = -self.progress * 0.5;
      },
    });
    return () => trigger.kill();
  }, [reducedMotion]);

  return (
    <section
      id="home"
      className="hero-grain relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-surface-alt pt-32 pb-16 sm:pt-36 lg:pt-40"
    >
      {/* ambient orbital lines */}
      <svg
        className="pointer-events-none absolute left-1/2 top-[300px] hidden h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 opacity-[0.35] md:block"
        viewBox="0 0 720 720"
        fill="none"
      >
        <ellipse cx="360" cy="360" rx="330" ry="270" className="stroke-accent-tint-border" strokeWidth="1" strokeDasharray="2 6" />
        <ellipse cx="360" cy="360" rx="260" ry="310" className="stroke-accent-tint-border" strokeWidth="1" strokeDasharray="2 6" opacity="0.7" />
      </svg>

      <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col items-center px-6 sm:px-10 lg:px-14">
        {/* robot + orbit */}
        <div
          ref={sceneWrapRef}
          id="robot-stage"
          className="relative h-[420px] w-full max-w-[680px] sm:h-[520px] md:h-[600px] md:max-w-[950px] lg:h-[640px] lg:max-w-[1180px]"
        >
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 aspect-square h-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(139,124,246,0.32) 0%, rgba(139,124,246,0.22) 22%, rgba(139,124,246,0.11) 45%, rgba(139,124,246,0.04) 65%, transparent 80%)",
              filter: "blur(6px)",
            }}
          />
          <Scene3D
            pointerRef={pointerRef}
            dirOverrideRef={dirOverrideRef}
            expression={expression}
          />
          <div className="hidden sm:contents">
            <ServiceOrbit
              dirOverrideRef={dirOverrideRef}
              scrollGazeRef={scrollGazeRef}
              revealed={revealed}
              onTriggerExpression={triggerExpression}
              onResetExpression={resetExpression}
            />
          </div>
        </div>

        {/* headline content */}
        <div
          className={[
            "relative z-10 -mt-4 max-w-5xl text-center transition-all duration-[900ms] sm:-mt-8 md:-mt-10",
            "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
            copyIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          ].join(" ")}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[11px] font-medium tracking-[0.16em] text-ink-muted backdrop-blur-md dark:border-white/10 dark:bg-surface-raised/60">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-solid" />
            WE BUILD WHAT&rsquo;S NEXT
          </span>

          <RevealHeading
            as="h1"
            when="load"
            delay={0.15}
            className="mt-5 text-[2.3rem] font-bold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.9rem] lg:whitespace-nowrap lg:text-[2.85rem]"
          >
            Ideas deserve more than just a screen.
            <br />
            <span className="reveal-gradient bg-gradient-to-r from-accent-from to-accent-to">
              We turn them into digital experiences.
            </span>
          </RevealHeading>

          <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-ink-muted">
            We design, build and elevate digital products that help brands
            grow, stand out and lead the future.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-from to-accent-cta-to px-6 py-3.5 text-[13.5px] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(91,63,224,0.55)] transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-8px_rgba(91,63,224,0.65)] active:translate-y-0 active:scale-[0.97]"
            >
              Start a Project
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/50 px-6 py-3.5 text-[13.5px] font-semibold text-ink backdrop-blur-md transition-colors duration-500 hover:border-accent-tint-border hover:bg-accent-tint/70 dark:border-white/10 dark:bg-surface-raised/50"
            >
              Explore Services <span aria-hidden>⠿</span>
            </a>
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="pointer-events-none absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-70">
        <span className="text-[10px] font-medium tracking-[0.14em] text-ink-muted">
          SCROLL TO EXPLORE
        </span>
        <span className="flex h-8 w-5 justify-center rounded-full border border-black/20 pt-1.5 dark:border-white/20">
          <span className="h-1.5 w-1 animate-scroll-dot rounded-full bg-ink-muted" />
        </span>
      </div>
    </section>
  );
}
