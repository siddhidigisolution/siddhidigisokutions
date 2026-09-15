"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS_STAGES } from "./aboutContent";
import RobotCompanion2D from "../shared/RobotCompanion2D";

export default function ApproachTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const fill = fillRef.current;
    if (!section || !fill) return;

    const ctx = gsap.context(() => {
      gsap.set(fill, { width: "0%" });
      ScrollTrigger.create({
        trigger: section,
        start: "top 65%",
        end: "bottom 55%",
        scrub: 0.4,
        onUpdate: (self) => {
          gsap.set(fill, { width: `${self.progress * 100}%` });
          const idx = Math.min(
            PROCESS_STAGES.length - 1,
            Math.floor(self.progress * PROCESS_STAGES.length)
          );
          setActiveIndex(idx);
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const stage = PROCESS_STAGES[activeIndex];

  return (
    <section ref={sectionRef} className="relative mx-auto w-full max-w-[1400px] px-6 py-24 sm:px-10 lg:px-14">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <span className="text-[11px] font-medium tracking-[0.16em] text-ink-muted">
            HOW WE WORK
          </span>
          <h3 className="mt-4 max-w-lg text-[1.9rem] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[2.2rem]">
            From first idea to final experience.
          </h3>
        </div>
        <div className="hidden sm:block">
          <RobotCompanion2D expression={stage.expression} />
        </div>
      </div>

      <div className="relative mt-16">
        <div className="absolute left-0 right-0 top-5 h-[2px] rounded-full bg-accent-tint-border/50">
          <div
            ref={fillRef}
            className="h-full rounded-full bg-gradient-to-r from-accent-from to-accent-to"
          />
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {PROCESS_STAGES.map((s, i) => {
            const reached = i <= activeIndex;
            return (
              <div key={s.index} className="relative flex flex-col items-start">
                <span
                  className={[
                    "relative z-10 mb-4 flex h-3 w-3 items-center justify-center rounded-full border-2 transition-colors duration-300",
                    reached ? "border-accent-to bg-accent-to" : "border-accent-tint-border bg-surface",
                  ].join(" ")}
                />
                <span
                  className={[
                    "text-[11px] font-semibold tabular-nums transition-colors duration-300",
                    reached ? "text-accent-solid" : "text-ink-faint",
                  ].join(" ")}
                >
                  {s.index}
                </span>
                <p
                  className={[
                    "mt-1 text-[14.5px] font-bold transition-colors duration-300",
                    reached ? "text-ink" : "text-ink-faint",
                  ].join(" ")}
                >
                  {s.title}
                </p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-ink-muted">{s.copy}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
