// PF6-derived DS components — one thin-wrapper file per PF family
// (Button.tsx, Checkbox.tsx, …), scaffolded by scripts/gen-pf-wrappers.mjs.
export * from "./pf.js";

export { Shell } from "./Shell.js";
export type { ShellProps } from "./Shell.js";
export { PrimaryDetailLayout } from "./PrimaryDetailLayout.js";
export type { PrimaryDetailLayoutProps } from "./PrimaryDetailLayout.js";
export { Hyperlink } from "./Hyperlink.js";
export type { HyperlinkProps } from "./Hyperlink.js";
// AiAssistant keeps its label contract next to the component; the en
// defaults are re-exported under the lib's `xxxEnLabels` convention.
export {
  AiAssistant,
  DEFAULT_CHAT_LABELS as aiAssistantEnLabels,
} from "./AiAssistant.js";
export type {
  AiAssistantProps,
  ChatLabels as AiAssistantLabels,
  ChatMsg,
  ChatPlacement,
} from "./AiAssistant.js";
export {
  shellEnLabels,
  primaryDetailLayoutEnLabels,
} from "./labels.js";
export type {
  ShellLabels,
  PrimaryDetailLayoutLabels,
} from "./labels.js";
