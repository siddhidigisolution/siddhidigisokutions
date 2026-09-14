import type { ServiceId } from "./serviceData";

function Base({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <circle
        cx="20"
        cy="20"
        r="18.5"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1"
      />
      {children}
    </svg>
  );
}

const WebIcon = () => (
  <Base>
    <rect x="10" y="12" width="20" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M10 16.5H30" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="12.6" cy="14.3" r="0.6" fill="currentColor" />
    <circle cx="14.6" cy="14.3" r="0.6" fill="currentColor" />
  </Base>
);

const SoftwareIcon = () => (
  <Base>
    <path
      d="M16 15l-4.5 5L16 25M24 15l4.5 5L24 25M21.5 13l-3 14"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Base>
);

const BrandingIcon = () => (
  <Base>
    <circle cx="20" cy="20" r="6.5" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="20" cy="20" r="1.4" fill="currentColor" />
    <path d="M20 9.5V13M20 27V30.5M9.5 20H13M27 20H30.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </Base>
);

const GraphicIcon = () => (
  <Base>
    <circle cx="17" cy="17" r="5.2" stroke="currentColor" strokeWidth="1.4" />
    <rect x="19" y="19" width="9.5" height="9.5" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
  </Base>
);

const MotionIcon = () => (
  <Base>
    <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.4" />
    <path d="M17.5 16.3v7.4l6.3-3.7-6.3-3.7z" fill="currentColor" />
  </Base>
);

const AiIcon = () => (
  <Base>
    <rect x="14" y="14" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="17.3" cy="19" r="1" fill="currentColor" />
    <circle cx="22.7" cy="19" r="1" fill="currentColor" />
    <path d="M17 23c0.9 0.9 2 1.3 3 1.3s2.1-0.4 3-1.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M20 14V10.5M14 20h-3.5M26 20h3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </Base>
);

export const SERVICE_ICONS: Record<ServiceId, () => React.ReactElement> = {
  web: WebIcon,
  software: SoftwareIcon,
  branding: BrandingIcon,
  graphic: GraphicIcon,
  motion: MotionIcon,
  ai: AiIcon,
};
