// DS layer — the exported, OOTB-configurable "lego block" components.
// Each composes base wrappers + react-core, applies the PF design tokens +
// GP dial styling, and adds DS-specific logic (validation, slots, labels).
// This is the public focus of the library; base/ is the building material.

// App shells & layouts
export { Shell } from "./Shell.js";
export type { ShellProps } from "./Shell.js";
export { PrimaryDetailLayout } from "./PrimaryDetailLayout.js";
export type { PrimaryDetailLayoutProps } from "./PrimaryDetailLayout.js";
export { DashboardShell } from "./DashboardShell.js";
export type { DashboardShellProps } from "./DashboardShell.js";

// AI
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

// Navigation & content
export { Hyperlink } from "./Hyperlink.js";
export type { HyperlinkProps } from "./Hyperlink.js";
export { PageHeader } from "./PageHeader.js";
export type { PageHeaderProps } from "./PageHeader.js";

// Data & toolbars
export { FilterToolbar, filterToolbarEnLabels } from "./FilterToolbar.js";
export type {
  FilterToolbarProps,
  FilterDef,
  FilterToolbarLabels,
} from "./FilterToolbar.js";
export {
  BulkSelectToolbar,
  bulkSelectToolbarEnLabels,
} from "./BulkSelectToolbar.js";
export type {
  BulkSelectToolbarProps,
  BulkSelectToolbarLabels,
} from "./BulkSelectToolbar.js";
export { ListManager } from "./ListManager.js";
export type { ListManagerProps } from "./ListManager.js";

// Label contracts + English defaults
export {
  shellEnLabels,
  primaryDetailLayoutEnLabels,
} from "./labels.js";
export type {
  ShellLabels,
  PrimaryDetailLayoutLabels,
} from "./labels.js";
