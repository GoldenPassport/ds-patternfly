import type { ReactNode } from "react";

/**
 * ListManager — the page scaffold for a managed collection: an optional
 * header, a toolbar row (filters and/or bulk-select on the left, pagination
 * on the right), the list body (a Table, a Gallery of Cards, …), and an
 * optional footer pagination.
 *
 * A layout-only composition: every region is a `ReactNode` slot, so you
 * bring a `PageHeader`, `FilterToolbar`, `BulkSelectToolbar`, your table or
 * card grid, and `Pagination` — ListManager owns the consistent vertical
 * rhythm and the toolbar arrangement, not the data. No `labels` prop (its
 * slotted children own their text).
 */
export interface ListManagerProps {
  /** Header slot (e.g. a `<PageHeader>`). */
  header?: ReactNode;
  /** Left side of the toolbar row — a `<FilterToolbar>` and/or
   * `<BulkSelectToolbar>`. */
  toolbar?: ReactNode;
  /** Right side of the toolbar row — typically a `<Pagination>`. */
  toolbarEnd?: ReactNode;
  /** The list body — a `<Table>`, a `<Gallery>` of cards, an empty state. */
  children: ReactNode;
  /** Footer pagination slot, rendered below the body. */
  footer?: ReactNode;
}

export function ListManager({
  header,
  toolbar,
  toolbarEnd,
  children,
  footer,
}: ListManagerProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {header}
      {toolbar || toolbarEnd ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 auto", minInlineSize: 0 }}>{toolbar}</div>
          {toolbarEnd ? <div>{toolbarEnd}</div> : null}
        </div>
      ) : null}
      <div>{children}</div>
      {footer ? (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {footer}
        </div>
      ) : null}
    </div>
  );
}
