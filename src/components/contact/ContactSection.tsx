"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { DirOverride } from "../hero/Robot";
import type { Expression } from "../hero/expressions";
import { usePrefersReducedMotion } from "../shared/usePrefersReducedMotion";
import { SPEECH_BUBBLES } from "./contactContent";
import ContactRobotVisual from "./ContactRobotVisual";
import ContactInformation from "./ContactInformation";
import ContactForm, { type FormStatus } from "./ContactForm";
import ContactCTA from "./ContactCTA";
import RevealHeading from "../shared/RevealHeading";

export default function ContactSection() {
  const [expression, setExpression] = useState<Expression>("idle");
  const [speech, setSpeech] = useState<string | null>(SPEECH_BUBBLES.empty);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const dirOverrideRef = useRef<DirOverride>({ x: 0, y: 0, active: false });

  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const formWrapRef = useRef<HTMLDivElement>(null);
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
      if (leftRef.current) {
        tl.from(leftRef.current, { opacity: 0, y: 28, duration: 0.7, ease: "expo.out" });
      }
      if (rightRef.current) {
        tl.from(
          rightRef.current,
          { opacity: 0, y: 28, duration: 0.7, ease: "expo.out" },
          "-=0.5"
        );
      }
      // a brief "notices you've arrived" glance toward the form once the
      // robot has scrolled into view, before settling back to ambient idle
      tl.call(() => {
        dirOverrideRef.current.active = true;
        dirOverrideRef.current.x = 0.35;
        dirOverrideRef.current.y = 0;
        window.setTimeout(() => {
          dirOverrideRef.current.active = false;
        }, 1300);
      });
    }, section);
    return () => ctx.revert();
  }, [reducedMotion]);

  const handleStartProject = () => {
    formWrapRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "center",
    });
    const nameField = document.getElementById("contact-name");
    if (nameField instanceof HTMLElement) {
      window.setTimeout(() => nameField.focus(), reducedMotion ? 0 : 500);
    }
  };

  return (
    <section id="contact" className="hero-grain relative overflow-hidden bg-surface">
      {/* lavender glow settling behind the robot, easing back to the page background toward the footer */}
      <div
        className="pointer-events-none absolute left-[8%] top-16 h-[560px] w-[560px] opacity-60"
        style={{
          background: "radial-gradient(50% 50% at 50% 50%, rgba(139,124,246,0.16), transparent 72%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px]"
        style={{ background: "linear-gradient(to bottom, transparent, var(--surface))" }}
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-28 pt-24 sm:px-10 sm:pt-32 lg:px-14">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-accent-solid">
            LET&rsquo;S TALK
          </span>
          <RevealHeading
            as="h2"
            className="mt-4 text-[32px] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[42px]"
          >
            Have an idea worth building?
            <br />
            Let&rsquo;s turn it into{" "}
            <span className="reveal-gradient bg-gradient-to-r from-accent-from to-accent-to">
              something people remember.
            </span>
          </RevealHeading>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-ink-muted">
            Share a few details about your project and our team will get back to you with next
            steps, timelines, and honest thinking — no generic replies.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,40%)_minmax(0,56%)] lg:justify-between lg:gap-10">
          <div ref={leftRef} className="mx-auto flex w-full max-w-[420px] flex-col items-center lg:sticky lg:top-40 lg:mx-0">
            <ContactRobotVisual expression={expression} dirOverrideRef={dirOverrideRef} speech={speech} />
            <ContactInformation />
          </div>

          <div ref={rightRef} className="w-full">
            <ContactForm
              ref={formWrapRef}
              dirOverrideRef={dirOverrideRef}
              onExpression={setExpression}
              onSpeech={setSpeech}
              onStatusChange={setFormStatus}
            />
          </div>
        </div>

        <ContactCTA onStartProject={handleStartProject} submitted={formStatus === "success"} />
      </div>
    </section>
  );
}
