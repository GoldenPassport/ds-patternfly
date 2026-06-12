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
export { CompassShell, compassShellEnLabels } from "./CompassShell.js";
export type { CompassShellProps, CompassShellLabels } from "./CompassShell.js";

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

// Chrome — app header & footer
export { AppHeader, appHeaderEnLabels } from "./AppHeader.js";
export type { AppHeaderProps, AppHeaderLabels } from "./AppHeader.js";
export { AppFooter } from "./AppFooter.js";
export type { AppFooterProps, FooterLinkGroup } from "./AppFooter.js";

// Data display
export { DataTable } from "./DataTable.js";
export type { DataTableProps, DataTableColumn } from "./DataTable.js";
export { CardGrid } from "./CardGrid.js";
export type { CardGridProps } from "./CardGrid.js";
export { ListView } from "./ListView.js";
export type { ListViewProps, ListViewItem } from "./ListView.js";
export { TabbedView } from "./TabbedView.js";
export type { TabbedViewProps, TabDef } from "./TabbedView.js";
export { TreeNavigation } from "./TreeNavigation.js";
export type { TreeNavigationProps, TreeNode } from "./TreeNavigation.js";

// Feedback & overlays
export { ConfirmModal, confirmModalEnLabels } from "./ConfirmModal.js";
export type { ConfirmModalProps, ConfirmModalLabels } from "./ConfirmModal.js";
export { StatusPanel } from "./StatusPanel.js";
export type { StatusPanelProps, StatusPanelVariant } from "./StatusPanel.js";

// Forms — validated fields + scaffold, with composable validation utils
export { ValidatedTextField } from "./ValidatedTextField.js";
export type { ValidatedTextFieldProps } from "./ValidatedTextField.js";
export { ValidatedTextArea } from "./ValidatedTextArea.js";
export type { ValidatedTextAreaProps } from "./ValidatedTextArea.js";
export { ValidatedSelect } from "./ValidatedSelect.js";
export type { ValidatedSelectProps, SelectChoice } from "./ValidatedSelect.js";
export { FormScaffold, formScaffoldEnLabels } from "./FormScaffold.js";
export type { FormScaffoldProps, FormScaffoldLabels } from "./FormScaffold.js";
export {
  required,
  minLength,
  maxLength,
  pattern,
  email,
  runValidators,
  useFieldValidation,
} from "./validation.js";
export type { Validator, ValidationState, UseFieldValidation } from "./validation.js";

// Label contracts + English defaults (ConfirmModal/AppHeader/FormScaffold
// label exports live with their components above).
export {
  shellEnLabels,
  primaryDetailLayoutEnLabels,
} from "./labels.js";
export type {
  ShellLabels,
  PrimaryDetailLayoutLabels,
} from "./labels.js";
