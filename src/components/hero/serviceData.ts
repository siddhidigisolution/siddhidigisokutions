export type ServiceId =
  | "web"
  | "software"
  | "branding"
  | "graphic"
  | "motion"
  | "ai";

export interface ServiceDef {
  id: ServiceId;
  name: string;
  descriptor: string;
  description: string;
  angle: number; // starting angle in degrees, 0 = right, 90 = up — nodes continuously revolve from here, evenly spaced 60deg apart
  radiusX: number; // shared circular orbit radius as % of container (same for every node — equal spacing, equal distance from center)
  radiusY: number; // shared circular orbit radius as % of container
  driftAmp: number; // px drift amplitude
  driftSpeed: number; // relative speed multiplier
  phase: number; // radians phase offset so drift is not synced
}

export const SERVICES: ServiceDef[] = [
  {
    id: "web",
    name: "Web Design & Development",
    descriptor: "Fast, elegant sites built to convert.",
    description:
      "Custom-built websites and web apps engineered for speed, clarity and conversion — from first pixel to production.",
    angle: -30,
    radiusX: 33,
    radiusY: 33,
    driftAmp: 7,
    driftSpeed: 0.6,
    phase: 0.2,
  },
  {
    id: "software",
    name: "Software Development",
    descriptor: "Robust products, built to scale.",
    description:
      "End-to-end software engineering — architecture, backend systems and product builds that hold up under real growth.",
    angle: 30,
    radiusX: 33,
    radiusY: 33,
    driftAmp: 8,
    driftSpeed: 0.5,
    phase: 1.6,
  },
  {
    id: "branding",
    name: "Branding & Identity",
    descriptor: "Identities that stick in memory.",
    description:
      "Strategic brand systems — naming, voice, visual identity — that make a company instantly recognizable and trusted.",
    angle: 90,
    radiusX: 33,
    radiusY: 33,
    driftAmp: 6,
    driftSpeed: 0.7,
    phase: 3.0,
  },
  {
    id: "graphic",
    name: "Graphic Design",
    descriptor: "Visuals with premium craft.",
    description:
      "Thoughtful, detail-obsessed visual design across digital and print — every asset considered, nothing generic.",
    angle: 150,
    radiusX: 33,
    radiusY: 33,
    driftAmp: 7,
    driftSpeed: 0.55,
    phase: 4.1,
  },
  {
    id: "motion",
    name: "Motion & Video",
    descriptor: "Stories that move people.",
    description:
      "Motion design and video production that bring products and brands to life across every screen and platform.",
    angle: 210,
    radiusX: 33,
    radiusY: 33,
    driftAmp: 7,
    driftSpeed: 0.65,
    phase: 5.2,
  },
  {
    id: "ai",
    name: "AI Solutions & Automation",
    descriptor: "Intelligence built into workflows.",
    description:
      "Custom AI tooling and automation that removes busywork and gives teams intelligence built directly into their workflows.",
    angle: 270,
    radiusX: 33,
    radiusY: 33,
    driftAmp: 8,
    driftSpeed: 0.6,
    phase: 0.8,
  },
];
