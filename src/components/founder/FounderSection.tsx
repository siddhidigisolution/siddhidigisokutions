"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealHeading from "../shared/RevealHeading";
import { usePrefersReducedMotion } from "../shared/usePrefersReducedMotion";

export default function FounderSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      });
      if (photoRef.current) {
        tl.from(photoRef.current, { opacity: 0, scale: 0.94, duration: 0.7, ease: "expo.out" });
      }
      if (copyRef.current) {
        tl.from(
          copyRef.current,
          { opacity: 0, y: 24, duration: 0.7, ease: "expo.out" },
          "-=0.5"
        );
      }
    }, section);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="founder" className="relative overflow-hidden bg-surface">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 opacity-30"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 0%, rgba(139,124,246,0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-24 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,38%)_minmax(0,54%)] lg:justify-between lg:gap-16">
          {/* photo — placeholder frame until the real founder photo is added */}
          <div ref={photoRef} className="mx-auto w-full max-w-[340px] lg:mx-0">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-dashed border-accent-tint-border bg-accent-tint">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface text-accent-solid shadow-[0_10px_24px_-12px_rgba(76,58,140,0.4)]">
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
                    <circle cx="12" cy="8.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M4.5 20c1.5-4.2 4.8-6.2 7.5-6.2s6 2 7.5 6.2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="text-[12px] font-medium text-ink-muted">
                  Founder photo coming soon
                </span>
              </div>
            </div>
          </div>

          {/* copy */}
          <div ref={copyRef}>
            <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] text-ink-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-solid" />
              MEET THE FOUNDER
            </span>

            <RevealHeading
              as="h2"
              className="mt-5 text-[2rem] font-bold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2.4rem]"
            >
              The person behind{" "}
              <span className="reveal-gradient bg-gradient-to-r from-accent-from to-accent-to">
                Siddhi Digital Solution.
              </span>
            </RevealHeading>

            <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">
              [Add a short founder bio here — a couple of sentences on their background, what led
              them to start Siddhi Digital Solution, and the vision driving the studio today.]
            </p>

            <div className="mt-6">
              <p className="text-[16px] font-bold text-ink">[Founder Name]</p>
              <p className="text-[13.5px] text-ink-faint">Founder &amp; CEO, Siddhi Digital Solution</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
