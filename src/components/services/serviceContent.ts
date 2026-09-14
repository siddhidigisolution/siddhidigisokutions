import type { ServiceId } from "../hero/serviceData";
import type { Expression } from "../hero/expressions";

export interface Capability {
  label: string;
}

export interface ServiceContent {
  id: ServiceId;
  index: string; // "01".."06"
  name: string;
  tagline: string; // one-line highlight copy under the title
  paragraphs: string[]; // 2-3 sentence extended description
  tags: string[];
  capabilities: Capability[];
  ctaLabel: string;
  robotExpression: Expression;
  glow: string; // tailwind color token used for the background tint + accents
}

export const SERVICE_CONTENT: Record<ServiceId, ServiceContent> = {
  web: {
    id: "web",
    index: "01",
    name: "Web Design & Development",
    tagline:
      "High-performance digital experiences built around your brand, audience and business goals.",
    paragraphs: [
      "We design and build websites and web apps that load fast, read clearly and convert — engineered from the first wireframe through to production.",
      "Every project is built on a component system tailored to your brand, so new pages and features stay consistent as you grow.",
    ],
    tags: ["UI/UX", "Web Development", "Responsive Design", "E-Commerce"],
    capabilities: [
      { label: "UX Strategy" },
      { label: "Wireframing" },
      { label: "UI Design" },
      { label: "Frontend Development" },
      { label: "CMS" },
      { label: "Performance Optimization" },
    ],
    ctaLabel: "Explore Web Solutions",
    robotExpression: "idle",
    glow: "#8a7bf0",
  },
  software: {
    id: "software",
    index: "02",
    name: "Software Development",
    tagline:
      "Scalable software solutions designed to simplify operations and turn complex ideas into powerful products.",
    paragraphs: [
      "From internal tools to customer-facing platforms, we architect and build software that holds up under real usage and real growth.",
      "We work across the stack — APIs, databases, dashboards — so every piece of your product talks to the others cleanly.",
    ],
    tags: ["Web Apps", "SaaS", "Custom Software", "API Integration"],
    capabilities: [
      { label: "Product Architecture" },
      { label: "Backend Systems" },
      { label: "API Integration" },
      { label: "Database Design" },
      { label: "Dashboards" },
      { label: "QA & Testing" },
    ],
    ctaLabel: "Explore Software Solutions",
    robotExpression: "cheerful",
    glow: "#6d8bff",
  },
  branding: {
    id: "branding",
    index: "03",
    name: "Branding & Identity",
    tagline:
      "Distinctive identities that make your business recognizable, memorable and ready to grow.",
    paragraphs: [
      "We build brand systems — name, voice, mark, palette — that hold together across every touchpoint, from a business card to a billboard.",
      "The result is an identity your team can apply confidently, without a designer in the room every time.",
    ],
    tags: ["Logo Design", "Brand Strategy", "Visual Identity", "Brand Guidelines"],
    capabilities: [
      { label: "Brand Strategy" },
      { label: "Naming" },
      { label: "Logo Design" },
      { label: "Visual Identity" },
      { label: "Brand Guidelines" },
      { label: "Packaging" },
    ],
    ctaLabel: "Build Your Brand",
    robotExpression: "happy",
    glow: "#a692f0",
  },
  graphic: {
    id: "graphic",
    index: "04",
    name: "Graphic Design",
    tagline: "Visual communication that turns ideas into attention-grabbing experiences.",
    paragraphs: [
      "Social posts, campaign graphics, illustration, print — every asset is considered on its own and as part of a larger system.",
      "We design for the scroll and the shelf alike, so your visuals hold attention wherever they show up.",
    ],
    tags: ["Social Media", "Marketing Design", "Illustration", "Campaigns"],
    capabilities: [
      { label: "Social Content" },
      { label: "Marketing Collateral" },
      { label: "Illustration" },
      { label: "Campaign Design" },
      { label: "Print Design" },
      { label: "Presentation Design" },
    ],
    ctaLabel: "Explore Design Work",
    robotExpression: "wink",
    glow: "#e0a6f0",
  },
  motion: {
    id: "motion",
    index: "05",
    name: "Motion & Video",
    tagline: "Stories brought to life through motion, editing, visual effects and cinematic design.",
    paragraphs: [
      "From short-form social edits to full brand films, we handle motion graphics, editing and VFX in one connected process.",
      "Every frame is built to hold attention — paced for the platform it's made for.",
    ],
    tags: ["Motion Graphics", "Video Editing", "3D Animation", "Visual Effects"],
    capabilities: [
      { label: "Motion Graphics" },
      { label: "Video Editing" },
      { label: "3D Animation" },
      { label: "Visual Effects" },
      { label: "Sound Design" },
      { label: "Color Grading" },
    ],
    ctaLabel: "Explore Motion Work",
    robotExpression: "excited",
    glow: "#6d8bff",
  },
  ai: {
    id: "ai",
    index: "06",
    name: "AI Solutions & Automation",
    tagline: "Intelligent systems that automate repetitive work, connect your tools and unlock new possibilities.",
    paragraphs: [
      "We build AI-powered tools and automation that remove busywork — connecting the software you already use into one smooth workflow.",
      "From custom agents to internal copilots, every system is scoped around a real bottleneck, not a buzzword.",
    ],
    tags: ["AI Integration", "Automation", "AI Agents", "Workflow Systems"],
    capabilities: [
      { label: "AI Integration" },
      { label: "Workflow Automation" },
      { label: "AI Agents" },
      { label: "Data Pipelines" },
      { label: "Internal Tools" },
      { label: "Model Evaluation" },
    ],
    ctaLabel: "Explore AI Solutions",
    robotExpression: "joyful",
    glow: "#7c5ce0",
  },
};

export const SERVICE_ORDER: ServiceId[] = ["web", "software", "branding", "graphic", "motion", "ai"];
