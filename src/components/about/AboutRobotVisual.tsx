"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import type { PointerState, DirOverride, Ref } from "../hero/Robot";
import type { Expression } from "../hero/expressions";
import type { FloatingBadge } from "./aboutContent";
import AboutIcon from "./AboutIcons";

// reuses the exact same 3D robot + scene as the hero — one shared GLB,
// one shared material set, no second heavy asset load
const Scene3D = dynamic(() => import("../hero/Scene3D"), { ssr: false, loading: () => null });

const SLOT_POSITIONS = [
  { left: "4%", top: "10%" },
  { left: "80%", top: "6%" },
  { left: "88%", top: "56%" },
  { left: "2%", top: "60%" },
  { left: "18%", top: "88%" },
  { left: "64%", top: "90%" },
];

const FLOAT_CLASSES = ["animate-float-y", "animate-float-y-slow", "animate-float-y-rev"];

export default function AboutRobotVisual({
  expression,
  dirOverrideRef,
  badges,
}: {
  expression: Expression;
  dirOverrideRef: Ref<DirOverride>;
  badges: FloatingBadge[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<PointerState>({ x: 0, y: 0 });
  const badgeWrapRef = useRef<HTMLDivElement>(null);
  const [displayedBadges, setDisplayedBadges] = useState(badges);
  const isFirst = useRef(true);

  // calmer, more editorial cursor-follow than the hero — smaller range
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      pointerRef.current.x = Math.max(-1, Math.min(1, x)) * 0.55;
      pointerRef.current.y = Math.max(-1, Math.min(1, -y)) * 0.55;
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  // cross-fade the floating badges when the active story stage swaps them
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    const wrap = badgeWrapRef.current;
    if (!wrap || !wrap.children.length) {
      setDisplayedBadges(badges);
      return;
    }
    const tl = gsap.timeline();
    tl.to(wrap.children, { opacity: 0, y: 8, duration: 0.25, stagger: 0.03, ease: "power1.in" });
    tl.add(() => setDisplayedBadges(badges));
    tl.fromTo(
      wrap.children,
      { opacity: 0, y: 8, scale: 0.85 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05, ease: "back.out(1.6)" }
    );
    return () => {
      tl.kill();
    };
  }, [badges]);

  return (
    <div ref={containerRef} className="relative aspect-square w-full max-w-[480px]">
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(139,124,246,0.22), transparent 70%)" }}
      />
      <div className="absolute inset-0 z-10">
        <Scene3D pointerRef={pointerRef} dirOverrideRef={dirOverrideRef} expression={expression} />
      </div>

      <div ref={badgeWrapRef} className="pointer-events-none absolute inset-0 z-20">
        {displayedBadges.slice(0, 6).map((badge, i) => (
          <div
            key={badge.key}
            className={`absolute flex items-center gap-2 rounded-xl border border-white/70 bg-white/80 px-3 py-2 shadow-[0_14px_30px_-14px_rgba(76,58,140,0.4)] backdrop-blur-md dark:border-white/10 dark:bg-surface-raised/90 ${FLOAT_CLASSES[i % FLOAT_CLASSES.length]}`}
            style={{
              ...SLOT_POSITIONS[i % SLOT_POSITIONS.length],
              animationDelay: `${-i * 1.3}s`,
            }}
          >
            <span className="h-4 w-4 shrink-0 text-accent-solid">
              <AboutIcon icon={badge.icon} />
            </span>
            <span className="hidden whitespace-nowrap text-[11px] font-medium text-ink-soft sm:inline">
              {badge.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
