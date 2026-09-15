import type { FloatingBadge } from "./aboutContent";

function Base({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      {children}
    </svg>
  );
}

const ICONS: Record<FloatingBadge["icon"], () => React.ReactElement> = {
  window: () => (
    <Base>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 9h18" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="6" cy="7" r="0.6" fill="currentColor" />
    </Base>
  ),
  logo: () => (
    <Base>
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    </Base>
  ),
  video: () => (
    <Base>
      <rect x="3" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M17 10l4-2.5v9L17 14" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </Base>
  ),
  code: () => (
    <Base>
      <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </Base>
  ),
  ai: () => (
    <Base>
      <rect x="7" y="7" width="10" height="10" rx="3" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10" cy="12" r="0.9" fill="currentColor" />
      <circle cx="14" cy="12" r="0.9" fill="currentColor" />
      <path d="M12 7V4M7 12H4M20 12h-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </Base>
  ),
  canvas: () => (
    <Base>
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8.5" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4 17l5-4 4 3 4-5 3 4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </Base>
  ),
  target: () => (
    <Base>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </Base>
  ),
  sketch: () => (
    <Base>
      <path d="M4 18l3.2-.6L18 6.6a1.5 1.5 0 0 0-2.1-2.1L5.1 15.3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M4 20h14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </Base>
  ),
  node: () => (
    <Base>
      <circle cx="6" cy="7" r="2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="18" cy="7" r="2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="18" r="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7.6 8.2L11 16.3M16.4 8.2L13 16.3M8 7h8" stroke="currentColor" strokeWidth="1.1" />
    </Base>
  ),
  shape: () => (
    <Base>
      <circle cx="8.5" cy="9" r="4" stroke="currentColor" strokeWidth="1.4" />
      <rect x="12.5" y="12" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    </Base>
  ),
  motion: () => (
    <Base>
      <path d="M3 17c4 0 4-10 8-10s4 10 8 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="19" cy="17" r="1.4" fill="currentColor" />
    </Base>
  ),
  swatch: () => (
    <Base>
      <circle cx="7" cy="9" r="3" fill="currentColor" opacity="0.85" />
      <circle cx="14" cy="8" r="3" fill="currentColor" opacity="0.6" />
      <circle cx="12" cy="15" r="3" fill="currentColor" opacity="0.35" />
    </Base>
  ),
  chart: () => (
    <Base>
      <path d="M4 19V9M10 19V5M16 19v-7M4 19h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </Base>
  ),
  system: () => (
    <Base>
      <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="18" cy="6" r="2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="18" r="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 6h8M7.2 7.5L11 16.2M16.8 7.5L13 16.2" stroke="currentColor" strokeWidth="1.1" />
    </Base>
  ),
  auto: () => (
    <Base>
      <path d="M4 12a8 8 0 0 1 14-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M20 12a8 8 0 0 1-14 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M18 5v3h-3M6 19v-3h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </Base>
  ),
  update: () => (
    <Base>
      <path d="M6 12a6 6 0 1 1 2 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M4 17v-3h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </Base>
  ),
};

export default function AboutIcon({ icon }: { icon: FloatingBadge["icon"] }) {
  const Icon = ICONS[icon];
  return <Icon />;
}
