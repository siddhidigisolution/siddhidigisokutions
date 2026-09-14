"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ServiceId } from "../hero/serviceData";
import { SERVICE_CONTENT } from "./serviceContent";
import ServicesHeader from "./ServicesHeader";
import ServiceNavigation from "./ServiceNavigation";
import ServiceVisualizer from "./ServiceVisualizer";
import ServiceDetails from "./ServiceDetails";
import RobotCompanion2D from "../shared/RobotCompanion2D";
import { usePrefersReducedMotion } from "../shared/usePrefersReducedMotion";

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<ServiceId>("web");
  const [expanded, setExpanded] = useState(false);
  const [hoveredService, setHoveredService] = useState<ServiceId | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const service = SERVICE_CONTENT[activeService];
  const displayExpression = SERVICE_CONTENT[hoveredService ?? activeService].robotExpression;

  const handleSelect = (id: ServiceId) => {
    if (id === activeService) {
      setExpanded((e) => !e);
      return;
    }
    setActiveService(id);
    setExpanded(false);
  };

  // scroll-triggered entrance: header, nav rows, visual and companion reveal
  // sequentially as the section comes into view; a subtle parallax carries
  // the visual column as the user scrolls through the section
  useEffect(() => {
    if (reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const rows = navRef.current?.querySelectorAll<HTMLElement>("[data-service-row]");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });

      if (headerRef.current) {
        tl.from(headerRef.current, { opacity: 0, y: 28, duration: 0.7, ease: "expo.out" });
      }
      if (rows && rows.length) {
        // each service row flies in from the left, cascading one after
        // another rather than arriving as a single block
        tl.from(
          rows,
          {
            opacity: 0,
            x: -90,
            rotate: -2,
            duration: 0.65,
            stagger: 0.12,
            ease: "expo.out",
          },
          "-=0.35"
        );
      }
      if (rightColRef.current) {
        tl.from(
          rightColRef.current,
          { opacity: 0, y: 24, scale: 0.97, duration: 0.6, ease: "expo.out" },
          "-=0.5"
        );
      }

      if (rightColRef.current) {
        gsap.to(rightColRef.current, {
          y: -26,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden bg-surface-alt px-6 pb-24 pt-32 sm:px-10 sm:pt-36 lg:px-14"
    >
      {/* echoes the hero's ambient orbital lines, fading as the robot's
          environment hands off into the services section */}
      <svg
        className="pointer-events-none absolute left-1/2 top-0 hidden h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-[0.18] md:block"
        viewBox="0 0 900 420"
        fill="none"
      >
        <ellipse cx="450" cy="210" rx="380" ry="160" className="stroke-accent-tint-border" strokeWidth="1" strokeDasharray="2 6" />
        <ellipse cx="450" cy="210" rx="300" ry="190" className="stroke-accent-tint-border" strokeWidth="1" strokeDasharray="2 6" opacity="0.7" />
      </svg>

      {/* very subtle active-service tint */}
      <div
        className="pointer-events-none absolute inset-0 -z-0 opacity-[0.06]"
        style={{
          background: `radial-gradient(50% 40% at 78% 30%, ${service.glow}, transparent 70%)`,
        }}
      />

      <div className="relative mx-auto w-full max-w-[1400px]">
        <ServicesHeader ref={headerRef} />

        <div className="mt-16 flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div ref={navRef}>
            <ServiceNavigation
              activeService={activeService}
              onSelect={handleSelect}
              onHoverChange={setHoveredService}
            />
          </div>

          <div ref={rightColRef} className="flex flex-1 flex-col items-center lg:items-start">
            <div className="relative w-full max-w-[560px]">
              <ServiceVisualizer activeService={activeService} />
              <RobotCompanion2D
                expression={displayExpression}
                className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-4"
              />
            </div>

            <div className="mt-7 w-full max-w-[560px]">
              <h3 className="text-[1.35rem] font-bold tracking-[-0.01em] text-ink sm:text-[1.55rem]">
                {service.name}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">
                {service.tagline}
              </p>
            </div>

            <ServiceDetails
              service={service}
              expanded={expanded}
              onToggle={() => setExpanded((e) => !e)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
