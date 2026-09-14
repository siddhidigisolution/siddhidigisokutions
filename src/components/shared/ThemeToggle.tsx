"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  // next-themes applies the resolved theme via a blocking script before
  // React hydrates, so resolvedTheme can already be correct on the very
  // first client render — rendering off it directly would mismatch the
  // server's theme-less output. Gating on a post-mount flag intentionally
  // delays the real icon by one render, avoiding that hydration mismatch.
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={[
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-ink-muted transition-colors duration-300 hover:border-accent-tint-border hover:text-accent-solid",
        className,
      ].join(" ")}
    >
      {!mounted ? (
        <span className="h-4 w-4" />
      ) : isDark ? (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
          <path
            d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M12 2.5v2.3M12 19.2v2.3M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2.5 12h2.3M19.2 12h2.3M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
