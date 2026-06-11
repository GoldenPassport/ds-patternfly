import { useId, useState, type ReactNode } from "react";
import {
  Label,
  MenuToggle,
  type MenuToggleElement,
  Select,
  SelectList,
  SelectOption,
  SearchInput,
  Toolbar,
  ToolbarContent,
  ToolbarFilter,
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
} from "@patternfly/react-core";
import { FilterIcon } from "@patternfly/react-icons/dist/esm/icons/filter-icon";
import { type FilterToolbarLabels, filterToolbarEnLabels } from "./labels.js";

export type { FilterToolbarLabels } from "./labels.js";
export { filterToolbarEnLabels } from "./labels.js";

/** One faceted filter: a category with a fixed set of multi-select options. */
export interface FilterDef {
  /** Stable key used in `values` / `onChange`. */
  key: string;
  /** Category name shown on the toggle and in chip groups. */
  label: string;
  /** Selectable options. */
  options: { value: string; label: string }[];
}

/**
 * FilterToolbar — the standard filter bar: a search field, faceted
 * multi-select facets, removable filter chips, and one-click clear-all.
 *
 * Fully controlled: you own `searchValue` + `values` and update them from
 * the callbacks. Chips and the clear-all control are derived from `values`
 * automatically. A composition of branded react-core Toolbar primitives.
 */
export interface FilterToolbarProps {
  /** Required. Provide via `filterToolbarEnLabels` or your own translations. */
  labels?: FilterToolbarLabels;
  /** Current search text. Omit to hide the search field. */
  searchValue?: string;
  /** Fired as the search text changes. */
  onSearchChange?: (value: string) => void;
  /** Faceted filters to render. */
  filters?: FilterDef[];
  /** Selected values per filter key. */
  values?: Record<string, string[]>;
  /** Fired when a facet's selection changes (toggle a value). */
  onChange?: (key: string, values: string[]) => void;
  /** Fired by the search field and PF's clear-all control. */
  onClearAll?: () => void;
  /** Right-aligned actions (e.g. a primary "Create" button). */
  actions?: ReactNode;
}

export function FilterToolbar({
  labels = filterToolbarEnLabels,
  searchValue,
  onSearchChange,
  filters = [],
  values = {},
  onChange,
  onClearAll,
  actions,
}: FilterToolbarProps) {
  const id = useId();
  const [openKey, setOpenKey] = useState<string | null>(null);

  const toggleValue = (def: FilterDef, value: string) => {
    const current = values[def.key] ?? [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange?.(def.key, next);
  };

  return (
    <Toolbar
      id={`${id}-filter-toolbar`}
      {...(onClearAll ? { clearAllFilters: onClearAll } : {})}
      clearFiltersButtonText={labels.clearAllFilters}
      collapseListedFiltersBreakpoint="md"
    >
      <ToolbarContent>
        {/* No aria-label on ToolbarToggleGroup — PF renders it as a roleless
            <div>, where ARIA prohibits aria-label (axe aria-prohibited-attr).
            The collapse toggle button names itself from the filter icon. */}
        <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="md">
          {onSearchChange ? (
            <ToolbarItem>
              <SearchInput
                value={searchValue ?? ""}
                onChange={(_e, v) => onSearchChange(v)}
                onClear={() => onSearchChange("")}
                placeholder={labels.searchPlaceholder}
                aria-label={labels.searchAriaLabel}
              />
            </ToolbarItem>
          ) : null}
          {filters.length > 0 ? (
            <ToolbarGroup variant="filter-group">
              {filters.map((def) => {
                const selected = values[def.key] ?? [];
                return (
                  <ToolbarFilter
                    key={def.key}
                    labels={selected}
                    deleteLabel={(_c, v) => toggleValue(def, v as string)}
                    deleteLabelGroup={() => onChange?.(def.key, [])}
                    categoryName={def.label}
                  >
                    <Select
                      isOpen={openKey === def.key}
                      onOpenChange={(open) => setOpenKey(open ? def.key : null)}
                      onSelect={(_e, v) => toggleValue(def, v as string)}
                      toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                        <MenuToggle
                          ref={toggleRef}
                          onClick={() =>
                            setOpenKey((k) => (k === def.key ? null : def.key))
                          }
                        >
                          {def.label}{" "}
                          {selected.length > 0 && (
                            <Label isCompact>{selected.length}</Label>
                          )}
                        </MenuToggle>
                      )}
                    >
                      <SelectList>
                        {def.options.map((opt) => (
                          <SelectOption
                            key={opt.value}
                            value={opt.value}
                            hasCheckbox
                            isSelected={selected.includes(opt.value)}
                          >
                            {opt.label}
                          </SelectOption>
                        ))}
                      </SelectList>
                    </Select>
                  </ToolbarFilter>
                );
              })}
            </ToolbarGroup>
          ) : null}
        </ToolbarToggleGroup>
        {actions ? (
          <ToolbarItem align={{ default: "alignEnd" }}>{actions}</ToolbarItem>
        ) : null}
      </ToolbarContent>
    </Toolbar>
  );
}
