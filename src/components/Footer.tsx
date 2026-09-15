"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import RobotCompanion2D from "./shared/RobotCompanion2D";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_LINK,
  SOCIAL_LINKS,
} from "./contact/contactContent";

const NAV_LINKS = ["Home", "Services", "About", "Contact"];

function FooterRobot() {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const cycle = () => {
      setBlink(true);
      const revert = setTimeout(() => setBlink(false), 260);
      timeout = setTimeout(cycle, 4500 + Math.random() * 3500);
      return revert;
    };
    timeout = setTimeout(cycle, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return <RobotCompanion2D expression={blink ? "wink" : "idle"} />;
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border-soft bg-surface-alt px-6 pb-8 pt-16 sm:px-10 lg:px-14">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-4">
            <Image
              src="/logo-black.png"
              alt="Siddhi Digital Solution"
              width={1079}
              height={459}
              className="h-14 w-auto dark:hidden"
            />
            <Image
              src="/logo-white.png"
              alt="Siddhi Digital Solution"
              width={1080}
              height={460}
              className="hidden h-14 w-auto dark:block"
            />
            <FooterRobot />
          </div>
          <p className="mt-4 max-w-[260px] text-[13.5px] leading-relaxed text-ink-muted">
            We turn ideas into digital experiences.
          </p>
        </div>

        <div>
          <span className="text-[10.5px] font-semibold tracking-[0.14em] text-ink-faint">
            NAVIGATE
          </span>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-[13.5px] text-ink-soft transition-colors duration-300 hover:text-accent-solid"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="text-[10.5px] font-semibold tracking-[0.14em] text-ink-faint">
            CONTACT
          </span>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[13.5px] text-ink-soft transition-colors duration-300 hover:text-accent-solid"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a
                href={CONTACT_PHONE_LINK}
                className="text-[13.5px] text-ink-soft transition-colors duration-300 hover:text-accent-solid"
              >
                {CONTACT_PHONE_DISPLAY}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <span className="text-[10.5px] font-semibold tracking-[0.14em] text-ink-faint">
            FOLLOW
          </span>
          <ul className="mt-4 space-y-2.5">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.key}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13.5px] text-ink-soft transition-colors duration-300 hover:text-accent-solid"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex w-full max-w-[1400px] flex-col items-center justify-between gap-3 border-t border-border-soft pt-6 text-center sm:flex-row sm:text-left">
        <p className="text-[12px] text-ink-faint">
          © {new Date().getFullYear()} Siddhi Digital Solution. All rights reserved.
        </p>
        <p className="text-[12px] text-ink-faint">Made with ideas + technology.</p>
      </div>
    </footer>
  );
}
