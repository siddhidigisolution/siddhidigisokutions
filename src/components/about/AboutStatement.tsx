"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LINES: { text: string; emphasis?: boolean }[][] = [
  [{ text: "We believe the best digital" }],
  [{ text: "experiences don't just " }, { text: "work.", emphasis: false }],
  [{ text: "They make people " }, { text: "feel something.", emphasis: true }],
];

export default function AboutStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;
    const words = section.querySelectorAll<HTMLElement>("[data-word]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.15, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.02,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 35%",
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative mx-auto w-full max-w-[1200px] px-6 py-28 sm:px-10 lg:px-14">
      <p className="mx-auto max-w-4xl text-center text-[2.1rem] font-bold leading-[1.3] tracking-[-0.02em] sm:text-[2.9rem] lg:text-[3.3rem]">
        {LINES.map((line, li) => (
          <span key={li} className="block">
            {line.map((chunk, ci) =>
              chunk.text.split(" ").map((word, wi) => (
                <span
                  key={`${li}-${ci}-${wi}`}
                  data-word
                  className={[
                    "inline-block",
                    chunk.emphasis
                      ? "bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent"
                      : "text-ink",
                  ].join(" ")}
                >
                  {word}&nbsp;
                </span>
              ))
            )}
          </span>
        ))}
      </p>
    </section>
  );
}
