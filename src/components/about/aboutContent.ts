import type { Expression } from "../hero/expressions";

export type StoryStageId = "think" | "create" | "evolve";

export interface FloatingBadge {
  key: string;
  label: string;
  icon: "window" | "logo" | "video" | "code" | "ai" | "canvas" | "target" | "sketch" | "node" | "shape" | "motion" | "swatch" | "chart" | "system" | "auto" | "update";
}

export interface StoryStage {
  id: StoryStageId;
  index: string;
  title: string;
  lede: string;
  copy: string;
  expression: Expression;
  badges: FloatingBadge[];
}

export const STORY_STAGES: StoryStage[] = [
  {
    id: "think",
    index: "01",
    title: "Think",
    lede: "Ideas start with understanding.",
    copy: "We first understand the problem, audience and business before designing the solution.",
    expression: "cheerful",
    badges: [
      { key: "notes", label: "Strategy notes", icon: "sketch" },
      { key: "target", label: "Target audience", icon: "target" },
      { key: "nodes", label: "Connected ideas", icon: "node" },
    ],
  },
  {
    id: "create",
    index: "02",
    title: "Create",
    lede: "Then we turn ideas into experiences.",
    copy: "Design, technology and storytelling come together to create something meaningful.",
    expression: "excited",
    badges: [
      { key: "frames", label: "Design frames", icon: "canvas" },
      { key: "code", label: "Code", icon: "code" },
      { key: "motion", label: "Motion paths", icon: "motion" },
      { key: "swatch", label: "Color", icon: "swatch" },
    ],
  },
  {
    id: "evolve",
    index: "03",
    title: "Evolve",
    lede: "And we keep making it better.",
    copy: "We believe great digital products should evolve with the people and businesses using them.",
    expression: "joyful",
    badges: [
      { key: "chart", label: "Growth", icon: "chart" },
      { key: "system", label: "Connected systems", icon: "system" },
      { key: "auto", label: "Automation", icon: "auto" },
    ],
  },
];

export const DEFAULT_BADGES: FloatingBadge[] = [
  { key: "window", label: "Website", icon: "window" },
  { key: "logo", label: "Brand mark", icon: "logo" },
  { key: "video", label: "Video", icon: "video" },
  { key: "code", label: "Code", icon: "code" },
  { key: "ai", label: "AI node", icon: "ai" },
  { key: "canvas", label: "Design canvas", icon: "canvas" },
];

export interface PhilosophyCard {
  key: string;
  title: string;
  copy: string;
  expression: Expression;
}

export const PHILOSOPHY_CARDS: PhilosophyCard[] = [
  {
    key: "simple",
    title: "Simple",
    copy: "Complex problems deserve simple experiences.",
    expression: "cheerful",
  },
  {
    key: "purposeful",
    title: "Purposeful",
    copy: "Every pixel, interaction and line of code should have a reason.",
    expression: "idle",
  },
  {
    key: "human",
    title: "Human",
    copy: "Behind every product is a real person, a real business and a real goal.",
    expression: "happy",
  },
];

export interface ProcessStage {
  index: string;
  title: string;
  copy: string;
  expression: Expression;
}

export const PROCESS_STAGES: ProcessStage[] = [
  { index: "01", title: "Discover", copy: "Understand the problem.", expression: "cheerful" },
  { index: "02", title: "Strategize", copy: "Define the direction.", expression: "idle" },
  { index: "03", title: "Design", copy: "Create the visual experience.", expression: "happy" },
  { index: "04", title: "Build", copy: "Turn it into working technology.", expression: "joyful" },
  { index: "05", title: "Launch", copy: "Bring it to the world.", expression: "excited" },
  { index: "06", title: "Evolve", copy: "Improve and grow it.", expression: "wink" },
];

