"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

// Word-by-word reveal for headlines: each word slides up out of a mask as it
// scrolls into view (or on mount, for above-the-fold headlines). Preserves
// any nested markup (e.g. a gradient <span>) since GSAP's SplitText splits
// around existing elements rather than flattening them.
export default function RevealHeading({
  as: Tag = "h2",
  className,
  children,
  when = "scroll",
  delay = 0,
}: {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: React.ReactNode;
  when?: "scroll" | "load";
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    let split: SplitText | undefined;
    const ctx = gsap.context(() => {
      split = SplitText.create(el, {
        type: "words",
        mask: "words",
        autoSplit: false,
        onSplit(self) {
          return gsap.from(self.words, {
            yPercent: 130,
            opacity: 0,
            stagger: 0.045,
            duration: 0.8,
            delay,
            ease: "expo.out",
            ...(when === "scroll"
              ? { scrollTrigger: { trigger: el, start: "top 80%", once: true } }
              : {}),
          });
        },
      });
    }, el);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [reducedMotion, when, delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
