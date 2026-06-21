/**
 * Per-component label contracts and English defaults.
 *
 * Components require their `labels` prop — they never fall back internally.
 * Consumers either spread one of the `*EnLabels` objects below (zero-i18n
 * apps) or build their own `*Labels` object via their translation library.
 */

export interface ShellLabels {
  /** "Skip to main content" link text. */
  skipToContent: string;
  /** Aria-label for the masthead landmark. */
  mastheadAriaLabel: string;
  /**
   * @deprecated No longer applied — the sidebar wrapper is a roleless
   * element, and ARIA prohibits labels there (axe aria-prohibited-attr).
   * Label your `<Nav aria-label="…">` in the sidebar slot instead. Kept in
   * the contract for backward compatibility.
   */
  sidebarAriaLabel: string;
  /** Aria-label for the sidebar toggle button. */
  toggleSidebar: string;
}

export const shellEnLabels: ShellLabels = {
  skipToContent: "Skip to main content",
  mastheadAriaLabel: "Application header",
  sidebarAriaLabel: "Primary navigation",
  toggleSidebar: "Toggle navigation",
};

export interface PrimaryDetailLayoutLabels {
  /** Aria-label for the list region. */
  listAriaLabel: string;
  /** Aria-label for the detail region. */
  detailAriaLabel: string;
  /** Mobile "back to list" button text. */
  backToList: string;
  /** Heading shown when no item is selected. */
  emptyDetailTitle: string;
  /** Body shown when no item is selected. */
  emptyDetailBody: string;
}

export const primaryDetailLayoutEnLabels: PrimaryDetailLayoutLabels = {
  listAriaLabel: "Items",
  detailAriaLabel: "Item details",
  backToList: "Back to list",
  emptyDetailTitle: "No item selected",
  emptyDetailBody: "Select an item from the list to view its details.",
};

// ── Recipe label contracts ──
// Toolbar lego blocks that own chrome text require a `labels` prop. The
// slot-only lego blocks (PageHeader, ListManager, DashboardShell) own no
// localizable text and take no labels prop. The `{count}` token in a label
// string is replaced with the live number at render (via `withCount`).

export interface FilterToolbarLabels {
  /** Placeholder for the search field. */
  searchPlaceholder: string;
  /** Accessible name for the search field. */
  searchAriaLabel: string;
  /** Text of the "clear all filters" control PF renders when chips exist. */
  clearAllFilters: string;
}

export const filterToolbarEnLabels: FilterToolbarLabels = {
  searchPlaceholder: "Filter by name",
  searchAriaLabel: "Filter by name",
  clearAllFilters: "Clear all filters",
};

export interface BulkSelectToolbarLabels {
  /** Accessible name for the bulk-select split control. */
  ariaLabel: string;
  /** "Select all" menu item — `{count}` → total count. */
  selectAll: string;
  /** "Select page" menu item — `{count}` → rows on the current page. */
  selectPage: string;
  /** "Select none" menu item. */
  selectNone: string;
  /** Status text beside the toggle — `{count}` → selected count. */
  selectedStatus: string;
}

export const bulkSelectToolbarEnLabels: BulkSelectToolbarLabels = {
  ariaLabel: "Select rows",
  selectAll: "Select all ({count})",
  selectPage: "Select page ({count})",
  selectNone: "Select none (0)",
  selectedStatus: "{count} selected",
};

/** Replace every `{count}` token in a label with `n`. */
export function withCount(label: string, n: number): string {
  return label.replace(/\{count\}/g, String(n));
}

export interface FormScaffoldLabels {
  /** Submit button text. */
  submit: string;
  /** Cancel button text. */
  cancel: string;
}

export const formScaffoldEnLabels: FormScaffoldLabels = {
  submit: "Save",
  cancel: "Cancel",
};

export interface ListTransferLabels {
  /** Title over the Available (left) pane. */
  availableTitle: string;
  /** Title over the Chosen (right) pane. */
  chosenTitle: string;
  /** Accessible name for the "move selected right" control. */
  addSelected: string;
  /** Accessible name for the "move all right" control. */
  addAll: string;
  /** Accessible name for the "move all left" control. */
  removeAll: string;
  /** Accessible name for the "move selected left" control. */
  removeSelected: string;
  /** Per-pane status — `{selected}` and `{total}` tokens are replaced. */
  selectedStatus: string;
}

export const listTransferEnLabels: ListTransferLabels = {
  availableTitle: "Available",
  chosenTitle: "Chosen",
  addSelected: "Add selected",
  addAll: "Add all",
  removeAll: "Remove all",
  removeSelected: "Remove selected",
  selectedStatus: "{selected} of {total} selected",
};

export interface CompassShellLabels {
  /** "Skip to main content" link text. */
  skipToContent: string;
}

export const compassShellEnLabels: CompassShellLabels = {
  skipToContent: "Skip to content",
};

export interface CompassTabsNavLabels {
  /** aria-label for the desktop top-level tabs nav. */
  tabsAriaLabel: string;
  /** aria-label for the desktop subtab strip. */
  subtabsAriaLabel: string;
  /** aria-label for the mobile Nav landmark. */
  mobileNavAriaLabel: string;
  /** Heading text in the mobile nav drawer head. */
  mobileNavTitle: string;
  /** aria-label for the mobile nav close button. */
  closeMobileNav: string;
  /** aria-label for the home button (desktop nav). */
  home: string;
  /** aria-label for the search button (desktop nav). */
  search: string;
}

export const compassTabsNavEnLabels: CompassTabsNavLabels = {
  tabsAriaLabel: "Primary navigation",
  subtabsAriaLabel: "Secondary navigation",
  mobileNavAriaLabel: "Navigation",
  mobileNavTitle: "Navigation",
  closeMobileNav: "Close navigation",
  home: "Home",
  search: "Search",
};

export interface CompassRailLabels {
  /** aria-label for the open handle. `{side}` is replaced with start/end. */
  openRail: string;
  /** aria-label for the close handle. `{side}` is replaced with start/end. */
  closeRail: string;
}

export const compassRailEnLabels: CompassRailLabels = {
  openRail: "Open {side} rail",
  closeRail: "Close {side} rail",
};

export interface AppHeaderLabels {
  /** Accessible name for the sidebar toggle (hamburger) button. */
  toggleNav: string;
}

export const appHeaderEnLabels: AppHeaderLabels = {
  toggleNav: "Toggle navigation",
};

export interface ConfirmModalLabels {
  /** Confirm (primary) button text. */
  confirm: string;
  /** Cancel button text. */
  cancel: string;
}

export const confirmModalEnLabels: ConfirmModalLabels = {
  confirm: "Confirm",
  cancel: "Cancel",
};
