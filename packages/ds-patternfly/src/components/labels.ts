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
  /** Aria-label for the sidebar nav landmark. */
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
