/**
 * Filters pattern — the standard filter toolbar: search input, faceted
 * selects, removable filter chips, one-click clear-all.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import {
  Button,
  Label,
  LabelGroup,
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
} from "../_lib.js";
import { FilterIcon } from "@patternfly/react-icons";

const STATUSES = ["Active", "Paused", "Failed"];
const OWNERS = ["ada", "grace", "linus"];

// #region SearchFacetsChips
export function SearchFacetsChips() {
  const id = useId();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<Set<string>>(new Set());
  const [owner, setOwner] = useState<Set<string>>(new Set());
  const [statusOpen, setStatusOpen] = useState(false);
  const [ownerOpen, setOwnerOpen] = useState(false);

  const toggle = (set: Set<string>, v: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set);
    if (next.has(v)) next.delete(v);
    else next.add(v);
    setter(next);
  };

  return (
    <>
      <Toolbar
        id={`${id}-filters-toolbar`}
        clearAllFilters={() => {
          setStatus(new Set());
          setOwner(new Set());
          setQ("");
        }}
      >
        <ToolbarContent>
          <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="md">
            <ToolbarItem>
              <SearchInput
                value={q}
                onChange={(_e, v) => setQ(v)}
                onClear={() => setQ("")}
                placeholder="Filter by name"
                aria-label="Filter by name"
              />
            </ToolbarItem>
            <ToolbarGroup variant="filter-group">
              <ToolbarFilter
                labels={Array.from(status)}
                deleteLabel={(_c, v) => toggle(status, v as string, setStatus)}
                deleteLabelGroup={() => setStatus(new Set())}
                categoryName="Status"
              >
                <Select
                  isOpen={statusOpen}
                  onOpenChange={setStatusOpen}
                  onSelect={(_e, v) => toggle(status, v as string, setStatus)}
                  toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                    <MenuToggle
                      ref={toggleRef}
                      onClick={() => setStatusOpen((o) => !o)}
                    >
                      Status {status.size > 0 && <Label isCompact>{status.size}</Label>}
                    </MenuToggle>
                  )}
                >
                  <SelectList>
                    {STATUSES.map((s) => (
                      <SelectOption key={s} value={s} hasCheckbox isSelected={status.has(s)}>
                        {s}
                      </SelectOption>
                    ))}
                  </SelectList>
                </Select>
              </ToolbarFilter>
              <ToolbarFilter
                labels={Array.from(owner)}
                deleteLabel={(_c, v) => toggle(owner, v as string, setOwner)}
                deleteLabelGroup={() => setOwner(new Set())}
                categoryName="Owner"
              >
                <Select
                  isOpen={ownerOpen}
                  onOpenChange={setOwnerOpen}
                  onSelect={(_e, v) => toggle(owner, v as string, setOwner)}
                  toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                    <MenuToggle
                      ref={toggleRef}
                      onClick={() => setOwnerOpen((o) => !o)}
                    >
                      Owner {owner.size > 0 && <Label isCompact>{owner.size}</Label>}
                    </MenuToggle>
                  )}
                >
                  <SelectList>
                    {OWNERS.map((o) => (
                      <SelectOption key={o} value={o} hasCheckbox isSelected={owner.has(o)}>
                        {o}
                      </SelectOption>
                    ))}
                  </SelectList>
                </Select>
              </ToolbarFilter>
            </ToolbarGroup>
          </ToolbarToggleGroup>
          <ToolbarItem align={{ default: "alignEnd" }}>
            <Button variant="primary">Create</Button>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
      <div style={{ padding: 12, color: "var(--gp-color-text-subtle)", fontSize: 13 }}>
        Active: search=<strong>{q || "—"}</strong>
        {" · "}status=<strong>{Array.from(status).join(",") || "any"}</strong>
        {" · "}owner=<strong>{Array.from(owner).join(",") || "any"}</strong>
      </div>
      {(status.size > 0 || owner.size > 0) && (
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ color: "var(--gp-color-text-subtle)", fontSize: 13 }}>
            Selected:
          </span>
          <LabelGroup isClosable={false}>
            {Array.from(status).map((s) => (
              <Label key={`s-${s}`} color="blue" isCompact>{`Status: ${s}`}</Label>
            ))}
            {Array.from(owner).map((o) => (
              <Label key={`o-${o}`} color="purple" isCompact>{`Owner: ${o}`}</Label>
            ))}
          </LabelGroup>
        </div>
      )}
    </>
  );
}
// #endregion

export default function FiltersExample() {
  return <SearchFacetsChips />;
}
