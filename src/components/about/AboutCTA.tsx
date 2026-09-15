"use client";

import { useState } from "react";
import type { Expression } from "../hero/expressions";
import RobotCompanion2D from "../shared/RobotCompanion2D";
import RevealHeading from "../shared/RevealHeading";

export default function AboutCTA() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const expression: Expression = clicked ? "excited" : hovered ? "happy" : "idle";

  return (
    <section className="relative mx-auto w-full max-w-[1400px] px-6 pb-28 pt-8 sm:px-10 lg:px-14">
      <div className="relative overflow-hidden rounded-[36px] border border-border-soft bg-surface px-8 py-16 text-center shadow-[0_30px_70px_-40px_rgba(76,58,140,0.35)] sm:px-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, rgba(139,124,246,0.14), transparent 70%)",
          }}
        />

        <div className="relative mx-auto mb-6 w-fit">
          <div
            className={`transition-transform duration-400 ${hovered ? "-rotate-3" : "rotate-0"}`}
          >
            <RobotCompanion2D expression={expression} />
          </div>
        </div>

        <span className="relative text-[11px] font-medium tracking-[0.16em] text-ink-muted">
          LET&rsquo;S BUILD SOMETHING MEANINGFUL
        </span>

        <RevealHeading
          as="h3"
          className="relative mx-auto mt-4 max-w-lg text-[2rem] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[2.4rem]"
        >
          Have an idea worth building?
        </RevealHeading>

        <p className="relative mx-auto mt-4 max-w-sm text-[14.5px] leading-relaxed text-ink-muted">
          Let&rsquo;s turn it into something people remember.
        </p>

        <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => setClicked(true)}
            className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-from to-accent-cta-to px-6 py-3.5 text-[13.5px] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(91,63,224,0.55)] transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-8px_rgba(91,63,224,0.65)] active:translate-y-0 active:scale-[0.97]"
          >
            Start a Project
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
