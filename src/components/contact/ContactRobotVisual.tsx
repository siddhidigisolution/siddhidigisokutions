"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import type { PointerState, DirOverride, Ref } from "../hero/Robot";
import type { Expression } from "../hero/expressions";
import { usePrefersReducedMotion } from "../shared/usePrefersReducedMotion";

// same shared 3D robot scene as the Hero/About — no second model load
const Scene3D = dynamic(() => import("../hero/Scene3D"), { ssr: false, loading: () => null });

const FLOATERS: { key: string; left: string; top: string; anim: string; delay: string; content: React.ReactNode }[] = [
  {
    key: "message",
    left: "2%",
    top: "14%",
    anim: "animate-float-y",
    delay: "-0.6s",
    content: (
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
        <path d="M4 5h16v11H9l-5 4V5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "email",
    left: "82%",
    top: "10%",
    anim: "animate-float-y-slow",
    delay: "-2s",
    content: (
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "chat",
    left: "86%",
    top: "62%",
    anim: "animate-float-y-rev",
    delay: "-1.2s",
    content: (
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
        <circle cx="12" cy="12" r="1.3" fill="currentColor" />
        <circle cx="7" cy="12" r="1.3" fill="currentColor" />
        <circle cx="17" cy="12" r="1.3" fill="currentColor" />
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    key: "node",
    left: "4%",
    top: "66%",
    anim: "animate-float-y",
    delay: "-3s",
    content: (
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
        <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M7.5 7.5l9 9" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
];

export default function ContactRobotVisual({
  expression,
  dirOverrideRef,
  speech,
}: {
  expression: Expression;
  dirOverrideRef: Ref<DirOverride>;
  speech: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<PointerState>({ x: 0, y: 0 });
  const speechRef = useRef<HTMLDivElement>(null);
  const [displayedSpeech, setDisplayedSpeech] = useState(speech);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reducedMotion) return; // keep the robot still if motion is reduced
    const handleMove = (e: PointerEvent) => {
      if (dirOverrideRef.current.active) return; // form focus takes priority
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      pointerRef.current.x = Math.max(-1, Math.min(1, x)) * 0.5;
      pointerRef.current.y = Math.max(-1, Math.min(1, -y)) * 0.5;
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  useEffect(() => {
    if (speech === displayedSpeech) return;
    const el = speechRef.current;
    if (!el || reducedMotion) {
      setDisplayedSpeech(speech);
      return;
    }
    const tl = gsap.timeline();
    tl.to(el, { opacity: 0, y: 6, scale: 0.92, duration: 0.2, ease: "power1.in" });
    tl.add(() => setDisplayedSpeech(speech));
    tl.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(2)" });
    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speech]);

  return (
    <div ref={containerRef} className="relative mx-auto aspect-square w-full max-w-[360px]">
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-90 blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(139,124,246,0.45) 0%, rgba(139,124,246,0.3) 30%, rgba(139,124,246,0.12) 55%, transparent 75%)",
        }}
      />
      <div className="absolute inset-0 z-10">
        <Scene3D pointerRef={pointerRef} dirOverrideRef={dirOverrideRef} expression={expression} />
      </div>

      {displayedSpeech && (
        <div
          ref={speechRef}
          className="pointer-events-none absolute left-1/2 top-[6%] z-20 -translate-x-1/2 rounded-2xl rounded-bl-sm border border-white/70 bg-white/90 px-4 py-2 text-[12.5px] font-medium text-ink-soft shadow-[0_10px_24px_-10px_rgba(76,58,140,0.35)] backdrop-blur-md dark:border-white/10 dark:bg-surface-raised/90"
        >
          {displayedSpeech}
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 z-20">
        {FLOATERS.map((f) => (
          <div
            key={f.key}
            className={`absolute flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/80 p-2 text-accent-solid shadow-[0_10px_24px_-12px_rgba(76,58,140,0.4)] backdrop-blur-md dark:border-white/10 dark:bg-surface-raised/80 ${reducedMotion ? "" : f.anim}`}
            style={{ left: f.left, top: f.top, animationDelay: f.delay }}
          >
            {f.content}
          </div>
        ))}
      </div>
    </div>
  );
}
