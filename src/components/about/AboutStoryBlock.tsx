"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { DirOverride } from "../hero/Robot";
import type { Expression } from "../hero/expressions";
import { STORY_STAGES, DEFAULT_BADGES, type StoryStageId } from "./aboutContent";
import AboutIntro from "./AboutIntro";
import AboutStory from "./AboutStory";
import AboutRobotVisual from "./AboutRobotVisual";
import { usePrefersReducedMotion } from "../shared/usePrefersReducedMotion";

// robot cycles a small, subtle expression every so often while resting —
// much calmer than the hero's hover-driven reactions, per the brief
const IDLE_POOL: Expression[] = ["happy", "cheerful", "wink"];

export default function AboutStoryBlock() {
  const [activeStage, setActiveStage] = useState<StoryStageId | null>(null);
  const [idleExpression, setIdleExpression] = useState<Expression>("idle");
  const dirOverrideRef = useRef<DirOverride>({ x: 0, y: 0, active: false });

  const sectionRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  // gentle idle personality: every 7-10s, flash a subtle expression, then settle
  useEffect(() => {
    if (activeStage) return;
    let timeout: ReturnType<typeof setTimeout>;
    const cycle = () => {
      const next = IDLE_POOL[Math.floor(Math.random() * IDLE_POOL.length)];
      setIdleExpression(next);
      const revert = setTimeout(() => setIdleExpression("idle"), 1800);
      timeout = setTimeout(cycle, 7000 + Math.random() * 3000);
      return revert;
    };
    timeout = setTimeout(cycle, 4000);
    return () => clearTimeout(timeout);
  }, [activeStage]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      });
      if (introRef.current) {
        tl.from(introRef.current, { opacity: 0, y: 28, duration: 0.7, ease: "expo.out" });
      }
      if (visualRef.current) {
        tl.from(
          visualRef.current,
          { opacity: 0, scale: 0.94, duration: 0.7, ease: "expo.out" },
          "-=0.5"
        );
      }
      // a brief "notices you've arrived" glance toward the story panel once
      // the robot has scrolled into view, before settling back to ambient idle
      if (!reducedMotion) {
        tl.call(() => {
          dirOverrideRef.current.active = true;
          dirOverrideRef.current.x = -0.3;
          dirOverrideRef.current.y = 0.1;
          window.setTimeout(() => {
            dirOverrideRef.current.active = false;
          }, 1300);
        });
      }
    }, section);
    return () => ctx.revert();
  }, [reducedMotion]);

  const stage = STORY_STAGES.find((s) => s.id === activeStage) ?? null;
  const expression = stage?.expression ?? idleExpression;
  const badges = stage?.badges ?? DEFAULT_BADGES;

  return (
    <div ref={sectionRef} className="mx-auto w-full max-w-[1400px] px-6 py-24 sm:px-10 lg:px-14">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,52%)_minmax(0,44%)] lg:justify-between lg:gap-10">
        {/* mobile order: intro -> robot -> story. Desktop: explicit grid
            placement puts intro+story in the left column, robot sticky right */}
        <div className="order-1 lg:order-none lg:col-start-1 lg:row-start-1">
          <AboutIntro ref={introRef} />
        </div>

        <div
          ref={visualRef}
          className="order-2 mx-auto w-full max-w-[480px] lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:mx-0 lg:max-w-none lg:sticky lg:top-40"
        >
          <AboutRobotVisual
            expression={expression}
            dirOverrideRef={dirOverrideRef}
            badges={badges}
          />
        </div>

        <div className="order-3 lg:order-none lg:col-start-1 lg:row-start-2">
          <AboutStory activeStage={activeStage} onSelect={setActiveStage} />
        </div>
      </div>
    </div>
  );
}
