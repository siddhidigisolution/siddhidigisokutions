"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Expression } from "../hero/expressions";

// Lightweight flat-SVG restatement of the hero robot's expression language
// (dot/star/heart/caret/arc/squint eyes, smile/open/tongue mouth) — no 3D
// scene, so it stays cheap to reuse anywhere a small reactive companion is
// needed instead of the full 3D robot (Services, About supporting sections).

type EyeShape = "dot" | "star" | "heart" | "caret" | "arc" | "squint";
type MouthShape = "smile" | "open" | "tongue";

const EXPRESSION_FACES: Record<Expression, { left: EyeShape; right: EyeShape; mouth: MouthShape }> = {
  idle: { left: "dot", right: "dot", mouth: "smile" },
  happy: { left: "dot", right: "dot", mouth: "smile" },
  excited: { left: "caret", right: "caret", mouth: "open" },
  cheerful: { left: "arc", right: "arc", mouth: "smile" },
  joyful: { left: "star", right: "star", mouth: "smile" },
  grinning: { left: "dot", right: "dot", mouth: "open" },
  wink: { left: "dot", right: "arc", mouth: "smile" },
  playful: { left: "dot", right: "squint", mouth: "tongue" },
  loving: { left: "heart", right: "heart", mouth: "smile" },
};

function Eye({ shape, x }: { shape: EyeShape; x: number }) {
  const y = -1;
  switch (shape) {
    case "star":
      return (
        <path
          transform={`translate(${x} ${y}) scale(2.6)`}
          d="M0,-1 L0.22,-0.31 L0.95,-0.31 L0.36,0.12 L0.59,0.81 L0,0.38 L-0.59,0.81 L-0.36,0.12 L-0.95,-0.31 L-0.22,-0.31 Z"
          fill="currentColor"
        />
      );
    case "heart":
      return (
        <path
          transform={`translate(${x} ${y}) scale(0.13) translate(0 2)`}
          d="M0,10 C-9,3 -12,-6 -6,-9.5 C-2,-11.5 0,-8 0,-6 C0,-8 2,-11.5 6,-9.5 C12,-6 9,3 0,10 Z"
          fill="currentColor"
        />
      );
    case "caret":
      return (
        <path
          transform={`translate(${x} ${y})`}
          d="M-2.2,0.6 L0,-1.1 L2.2,0.6"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      );
    case "arc":
      return (
        <path
          transform={`translate(${x} ${y})`}
          d="M-2,-0.4 Q0,1.1 2,-0.4"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          fill="none"
        />
      );
    case "squint":
      return (
        <path
          transform={`translate(${x} ${y})`}
          d="M1.6,-1.1 L-0.8,0.4 L1.6,1.9"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      );
    case "dot":
    default:
      return <circle cx={x} cy={y} r="1.7" fill="currentColor" />;
  }
}

function Mouth({ shape }: { shape: MouthShape }) {
  if (shape === "open") {
    return <ellipse cx="0" cy="4.2" rx="3.1" ry="2.6" fill="currentColor" />;
  }
  if (shape === "tongue") {
    return (
      <>
        <path d="M-3.3,3.4 Q0,5.6 3.3,3.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
        <ellipse cx="1.3" cy="5.6" rx="0.9" ry="1.1" fill="#ff9ec7" />
      </>
    );
  }
  return <path d="M-3.3,3.2 Q0,5.6 3.3,3.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />;
}

export default function RobotCompanion2D({
  expression,
  className = "",
}: {
  expression: Expression;
  className?: string;
}) {
  const faceRef = useRef<HTMLDivElement>(null);
  const face = EXPRESSION_FACES[expression];

  useEffect(() => {
    if (!faceRef.current) return;
    gsap.fromTo(
      faceRef.current,
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2.2)" }
    );
  }, [expression]);

  return (
    <div
      className={`pointer-events-none flex flex-col items-center gap-0 ${className}`}
      aria-hidden
    >
      <span className="h-2.5 w-2.5 rounded-full bg-[#a692f0]" />
      <span className="-mt-0.5 h-3 w-[3px] bg-[#c9beff]" />
      <div className="relative flex h-14 w-16 items-center justify-center rounded-[20px] border border-white/60 bg-white/80 shadow-[0_10px_28px_-10px_rgba(76,58,140,0.35)] backdrop-blur-md dark:border-white/10 dark:bg-surface-raised/90">
        <div className="flex h-9 w-11 items-center justify-center rounded-xl bg-[#0b0b12]">
          <div ref={faceRef} className="text-[#8b7cf6]">
            <svg viewBox="-6 -6 12 12" width="34" height="28">
              <Eye shape={face.left} x={-2.3} />
              <Eye shape={face.right} x={2.3} />
              <g className="text-[#6d8bff]">
                <Mouth shape={face.mouth} />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
