import {
  Button,
  EmptyState,
  EmptyStateBody,
} from "@patternfly/react-core";
import { ArrowLeftIcon } from "@patternfly/react-icons";
import { useEffect, useState, type ReactNode, type Key } from "react";
import type { PrimaryDetailLayoutLabels } from "./labels.js";

export interface PrimaryDetailLayoutProps<T> {
  /** The collection rendered in the primary (list) pane. */
  items: readonly T[];
  /** Stable id for an item — used as React key and selection identity. */
  getItemId: (item: T) => string;
  /** Currently selected item id. `null` means "no selection". */
  selectedId: string | null;
  /** Called when the user selects an item (click / Enter / Space). */
  onSelect: (id: string) => void;
  /** Renders a single item in the list pane. Wrap your content however you like. */
  renderListItem: (item: T, isSelected: boolean) => ReactNode;
  /** Renders the detail pane for the selected item. */
  renderDetail: (item: T) => ReactNode;
  /** Required. Provide via `primaryDetailLayoutEnLabels` or a translated object. */
  labels: PrimaryDetailLayoutLabels;
}

/**
 * Two-pane Primary–Detail layout (modeled on patternfly.org/patterns/primary-detail).
 *
 * Responsive: side-by-side at md+ (>=768px); stacked on small screens with a
 * "back to list" affordance. Mobile pane state is internal — the parent only
 * controls selection.
 */
export function PrimaryDetailLayout<T>({
  items,
  getItemId,
  selectedId,
  onSelect,
  renderListItem,
  renderDetail,
  labels,
}: PrimaryDetailLayoutProps<T>) {
  const selected = items.find((i) => getItemId(i) === selectedId) ?? null;

  // On small screens, show "list" by default; flip to "detail" on selection.
  const [mobilePane, setMobilePane] = useState<"list" | "detail">(
    selected ? "detail" : "list",
  );

  useEffect(() => {
    if (selected) setMobilePane("detail");
  }, [selected]);

  const handleSelect = (id: string) => {
    onSelect(id);
    setMobilePane("detail");
  };

  return (
    <div className="gp-primary-detail" data-pane={mobilePane}>
      <section
        className="gp-primary-detail__list"
        aria-label={labels.listAriaLabel}
      >
        <ul role="listbox" aria-label={labels.listAriaLabel} style={listStyle}>
          {items.map((item) => {
            const id = getItemId(item);
            const isSelected = id === selectedId;
            return (
              <li
                key={id as Key}
                role="option"
                aria-selected={isSelected}
                tabIndex={0}
                onClick={() => handleSelect(id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(id);
                  }
                }}
                style={{
                  ...itemStyle,
                  ...(isSelected ? selectedItemStyle : null),
                }}
              >
                {renderListItem(item, isSelected)}
              </li>
            );
          })}
        </ul>
      </section>

      <section
        className="gp-primary-detail__detail"
        aria-label={labels.detailAriaLabel}
      >
        <Button
          variant="link"
          icon={<ArrowLeftIcon />}
          className="gp-primary-detail__back-button"
          onClick={() => setMobilePane("list")}
        >
          {labels.backToList}
        </Button>

        {selected ? (
          renderDetail(selected)
        ) : (
          <EmptyState titleText={labels.emptyDetailTitle} headingLevel="h2">
            <EmptyStateBody>{labels.emptyDetailBody}</EmptyStateBody>
          </EmptyState>
        )}
      </section>
    </div>
  );
}

const listStyle = {
  listStyle: "none",
  margin: 0,
  padding: 0,
} as const;

const itemStyle = {
  // Row padding stays on the spacer scale (list rows aren't form
  // controls — `--gp-control-pad-*` would feel cramped here).
  padding: "var(--gp-space-md, 16px)",
  // Subtle row divider — `--gp-border-subtle` is the canonical use,
  // with `--gp-border-width` driving thickness.
  borderBlockEnd:
    "var(--gp-border-width, 1px) solid var(--gp-border-subtle, var(--gp-color-border, #d2d2d2))",
  cursor: "pointer",
  color: "var(--gp-text-default, var(--gp-color-text, inherit))",
  fontFamily: "var(--gp-font-body, var(--gp-font-family, inherit))",
} as const;

const selectedItemStyle = {
  background: "var(--gp-color-primary, #0066cc)",
  color: "var(--gp-color-on-primary, #ffffff)",
} as const;
