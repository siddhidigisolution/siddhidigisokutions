"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./shared/ThemeToggle";

const NAV_ITEMS = ["Home", "Services", "Contact"];
const HEADER_TOP_OFFSET = 48; // matches top-12
const CLEARANCE = 16; // fade out slightly before actual overlap, not on contact

export default function Header() {
  const [active, setActive] = useState("Home");
  const [visible, setVisible] = useState(true);
  const headerRef = useRef<HTMLElement>(null);

  // the header fades out as soon as the robot's head (not just the wider
  // orbit stage) would start overlapping it, and returns once scrolled
  // back above that point — measured against the robot stage's own
  // geometry rather than a generic scroll distance, so it never visually
  // mixes with the robot regardless of viewport size
  useEffect(() => {
    let ticking = false;
    let headerBottom = HEADER_TOP_OFFSET + (headerRef.current?.offsetHeight ?? 90);

    const measureHeader = () => {
      headerBottom = HEADER_TOP_OFFSET + (headerRef.current?.offsetHeight ?? 90);
    };

    const update = () => {
      const stage = document.getElementById("robot-stage");
      if (!stage) {
        setVisible(true);
        ticking = false;
        return;
      }
      const rect = stage.getBoundingClientRect();
      // the robot's head sits roughly a fifth of the way down the stage —
      // orbiting service tabs float above it and shouldn't count
      const headTop = rect.top + rect.height * 0.2;
      setVisible(headTop > headerBottom + CLEARANCE);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    measureHeader();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measureHeader);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measureHeader);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={[
        "fixed inset-x-0 top-12 z-50 flex justify-center px-4 transition-all duration-500",
        "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
        visible ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <div className="flex w-full max-w-[1180px] items-center justify-between">
        <a href="#home" className="flex items-center">
          <Image
            src="/logo-black.png"
            alt="Siddhi Digital Solution"
            width={1079}
            height={459}
            priority
            className="h-[72px] w-auto dark:hidden"
          />
          <Image
            src="/logo-white.png"
            alt="Siddhi Digital Solution"
            width={1080}
            height={460}
            priority
            className="hidden h-[72px] w-auto dark:block"
          />
        </a>

        <nav className="hidden items-center gap-7 rounded-full border border-border-soft bg-white/70 px-6 py-2.5 shadow-[0_8px_30px_-12px_rgba(30,20,70,0.18)] backdrop-blur-xl dark:bg-surface-raised/80 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setActive(item)}
              className="relative py-1 text-[13px] font-medium text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              {item}
              <span
                className={[
                  "absolute -bottom-0.5 left-0 h-[2px] w-full origin-left rounded-full bg-gradient-to-r from-accent-from to-accent-to transition-transform duration-[400ms]",
                  active === item ? "scale-x-100" : "scale-x-0",
                ].join(" ")}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-accent-from to-accent-to px-[18px] py-2 text-[12.5px] font-semibold text-white shadow-[0_6px_18px_-6px_rgba(91,63,224,0.55)] transition-all duration-[400ms] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-6px_rgba(91,63,224,0.6)] sm:inline-flex"
          >
            Start a Project <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
