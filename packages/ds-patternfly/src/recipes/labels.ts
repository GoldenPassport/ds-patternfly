/**
 * Per-recipe label contracts + English defaults.
 *
 * Like the component label contracts ([[../components/labels.ts]]), recipes
 * that own user-facing chrome text require a `labels` prop. Recipes that are
 * pure slot/content compositions (PageHeader, ListManager) don't own any
 * localizable text, so they take no labels prop. The `{count}` token in a
 * label string is replaced with the live number at render.
 */

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
