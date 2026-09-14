export type Expression =
  | "idle"
  | "happy"
  | "excited"
  | "cheerful"
  | "joyful"
  | "grinning"
  | "wink"
  | "playful"
  | "loving";

export type EyeShape = "dot" | "star" | "heart" | "caret" | "arc" | "squint";
export type MouthShape = "smile" | "open" | "tongue";

export interface FaceConfig {
  leftEye: EyeShape;
  rightEye: EyeShape;
  mouth: MouthShape;
}

// mirrors the reference sheet of positive expressions exactly — each is a
// distinct eye/mouth icon combination, not a numeric variation of one shape
export const EXPRESSIONS: Record<Expression, FaceConfig> = {
  idle: { leftEye: "dot", rightEye: "dot", mouth: "smile" },
  happy: { leftEye: "dot", rightEye: "dot", mouth: "smile" },
  excited: { leftEye: "caret", rightEye: "caret", mouth: "open" },
  cheerful: { leftEye: "arc", rightEye: "arc", mouth: "smile" },
  joyful: { leftEye: "star", rightEye: "star", mouth: "smile" },
  grinning: { leftEye: "dot", rightEye: "dot", mouth: "open" },
  wink: { leftEye: "dot", rightEye: "arc", mouth: "smile" },
  playful: { leftEye: "dot", rightEye: "squint", mouth: "tongue" },
  loving: { leftEye: "heart", rightEye: "heart", mouth: "smile" },
};

export const RANDOM_EXPRESSIONS: Expression[] = [
  "excited",
  "cheerful",
  "joyful",
  "grinning",
  "wink",
  "playful",
  "loving",
];

export function randomExpression(exclude?: Expression): Expression {
  const pool = RANDOM_EXPRESSIONS.filter((e) => e !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}
