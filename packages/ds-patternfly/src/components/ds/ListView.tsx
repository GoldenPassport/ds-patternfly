import { useId, type ReactNode } from "react";
import {
  DataList,
  DataListAction,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
} from "../base/index.js";

/** One list row. */
export interface ListViewItem {
  /** Stable id — the value passed to onSelect. */
  id: string;
  /** Primary line. */
  title: ReactNode;
  /** Secondary line under the title. */
  description?: ReactNode;
  /** Extra cell content shown to the right of the title block. */
  content?: ReactNode;
  /** Per-row actions (buttons, a kebab menu). */
  actions?: ReactNode;
}

/**
 * ListView — a selectable list of rows from an `items` array, each with a
 * title, optional description, extra content, and per-row actions. Wraps the
 * base DataList with single-select wiring and an empty-state slot. The
 * richer sibling of the base SimpleList (multi-cell rows + actions).
 */
export interface ListViewProps {
  /** Row data. */
  items: ListViewItem[];
  /** Accessible name for the list. */
  ariaLabel: string;
  /** Selected row id (controlled). Enables selectable rows when `onSelect` is set. */
  selectedId?: string;
  /** Fired with the row id when a row is selected. */
  onSelect?: (id: string) => void;
  /** Shown when `items` is empty (e.g. a StatusPanel). */
  emptyState?: ReactNode;
  /** Compact row density. */
  isCompact?: boolean;
}

export function ListView({
  items,
  ariaLabel,
  selectedId,
  onSelect,
  emptyState,
  isCompact,
}: ListViewProps) {
  const uid = useId();
  if (items.length === 0 && emptyState) return <>{emptyState}</>;

  return (
    <DataList
      aria-label={ariaLabel}
      {...(isCompact ? { isCompact: true } : {})}
      {...(onSelect
        ? {
            selectedDataListItemId: selectedId ? `${uid}-${selectedId}` : "",
            onSelectDataListItem: (_e, id) => {
              const raw = id.replace(`${uid}-`, "");
              onSelect(raw);
            },
          }
        : {})}
    >
      {items.map((item) => {
        const rowId = `${uid}-${item.id}`;
        return (
          <DataListItem key={item.id} id={rowId} aria-labelledby={`${rowId}-title`}>
            <DataListItemRow>
              <DataListItemCells
                dataListCells={[
                  <DataListCell key="primary">
                    <span id={`${rowId}-title`} style={{ fontWeight: 600 }}>
                      {item.title}
                    </span>
                    {item.description ? (
                      <div style={{ color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
                        {item.description}
                      </div>
                    ) : null}
                  </DataListCell>,
                  ...(item.content
                    ? [<DataListCell key="content">{item.content}</DataListCell>]
                    : []),
                ]}
              />
              {item.actions ? (
                <DataListAction
                  id={`${rowId}-actions`}
                  aria-labelledby={`${rowId}-title ${rowId}-actions`}
                  aria-label="Actions"
                >
                  {item.actions}
                </DataListAction>
              ) : null}
            </DataListItemRow>
          </DataListItem>
        );
      })}
    </DataList>
  );
}
