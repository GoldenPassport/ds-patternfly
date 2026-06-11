import { useId, useState, type ReactNode } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  MenuToggleCheckbox,
  type MenuToggleElement,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import {
  type BulkSelectToolbarLabels,
  bulkSelectToolbarEnLabels,
  withCount,
} from "./labels.js";

export type { BulkSelectToolbarLabels } from "./labels.js";
export { bulkSelectToolbarEnLabels } from "./labels.js";

/**
 * BulkSelectToolbar — the "select many, act on many" toolbar: a split
 * checkbox + dropdown (select all / page / none) on the left, a derived
 * "{n} selected" status, and contextual bulk actions that appear once a
 * selection exists.
 *
 * Fully controlled: you own the selection and pass counts + handlers. The
 * split checkbox reflects page-selected / partially-selected state and
 * toggles the current page when clicked. A composition of branded
 * react-core primitives — no external dependency.
 */
export interface BulkSelectToolbarProps {
  /** Required. Provide via `bulkSelectToolbarEnLabels` or your translations. */
  labels?: BulkSelectToolbarLabels;
  /** Total rows selected across all pages. */
  selectedCount: number;
  /** Total rows available. */
  totalCount: number;
  /** Rows on the current page (enables "Select page"). */
  pageCount?: number;
  /** Whole current page is selected (checkbox checked). */
  pageSelected?: boolean;
  /** Current page partially selected (checkbox indeterminate). */
  pagePartiallySelected?: boolean;
  /** Select every row across all pages. */
  onSelectAll: () => void;
  /** Clear the entire selection. */
  onSelectNone: () => void;
  /** Select every row on the current page. */
  onSelectPage?: () => void;
  /** Bulk actions, shown only when `selectedCount > 0`. */
  actions?: ReactNode;
}

export function BulkSelectToolbar({
  labels = bulkSelectToolbarEnLabels,
  selectedCount,
  totalCount,
  pageCount,
  pageSelected = false,
  pagePartiallySelected = false,
  onSelectAll,
  onSelectNone,
  onSelectPage,
  actions,
}: BulkSelectToolbarProps) {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <Toolbar id={`${id}-bulk-toolbar`}>
      <ToolbarContent>
        <ToolbarItem>
          <Dropdown
            isOpen={open}
            onSelect={() => setOpen(false)}
            onOpenChange={setOpen}
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                isExpanded={open}
                aria-label={labels.ariaLabel}
                onClick={() => setOpen((o) => !o)}
                splitButtonItems={[
                  <MenuToggleCheckbox
                    key="bulk-check"
                    id={`${id}-bulk-check`}
                    aria-label={labels.ariaLabel}
                    isChecked={
                      pagePartiallySelected ? null : pageSelected
                    }
                    onChange={(_e, checked) =>
                      checked ? onSelectPage?.() : onSelectNone()
                    }
                  >
                    {selectedCount > 0
                      ? withCount(labels.selectedStatus, selectedCount)
                      : ""}
                  </MenuToggleCheckbox>,
                ]}
              />
            )}
          >
            <DropdownList>
              <DropdownItem onClick={onSelectNone}>
                {labels.selectNone}
              </DropdownItem>
              {onSelectPage && pageCount !== undefined ? (
                <DropdownItem onClick={onSelectPage}>
                  {withCount(labels.selectPage, pageCount)}
                </DropdownItem>
              ) : null}
              <DropdownItem onClick={onSelectAll}>
                {withCount(labels.selectAll, totalCount)}
              </DropdownItem>
            </DropdownList>
          </Dropdown>
        </ToolbarItem>
        {selectedCount > 0 && actions ? (
          <>
            <ToolbarItem variant="separator" />
            <ToolbarItem>{actions}</ToolbarItem>
          </>
        ) : null}
      </ToolbarContent>
    </Toolbar>
  );
}
