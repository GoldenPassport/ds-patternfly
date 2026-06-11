/**
 * Context selector — a scoped switcher (workspace / project / organisation)
 * composed from Select + an inline SearchInput above the list.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useMemo, useState } from "react";
import type { CSSProperties, Ref } from "react";
import {
  Divider,
  MenuToggle,
  type MenuToggleElement,
  SearchInput,
  Select,
  SelectGroup,
  SelectList,
  SelectOption,
} from "../../_lib.js";
import { CheckIcon } from "@patternfly/react-icons";

type Workspace = { id: string; name: string; section: "Recent" | "All" };

const allWorkspaces: Workspace[] = [
  { id: "ws-acme", name: "Acme", section: "Recent" },
  { id: "ws-beta", name: "Beta Lab", section: "Recent" },
  { id: "ws-globex", name: "Globex", section: "All" },
  { id: "ws-initech", name: "Initech", section: "All" },
  { id: "ws-massive", name: "Massive Dynamic", section: "All" },
  { id: "ws-soylent", name: "Soylent", section: "All" },
];

// #region Demo
export function Demo() {
  const selectId = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Workspace>(allWorkspaces[0]!);
  const [filter, setFilter] = useState("");

  const filtered = useMemo(() => {
    const q = filter.toLowerCase();
    return allWorkspaces.filter((w) => w.name.toLowerCase().includes(q));
  }, [filter]);

  const recent = filtered.filter((w) => w.section === "Recent");
  const all = filtered.filter((w) => w.section === "All");

  return (
    <Select
      id={selectId}
      isOpen={open}
      selected={active.id}
      onSelect={(_e, value) => {
        const next = allWorkspaces.find((w) => w.id === value);
        if (next) setActive(next);
        setOpen(false);
      }}
      onOpenChange={setOpen}
      toggle={(toggleRef: Ref<MenuToggleElement>) => (
        <MenuToggle
          ref={toggleRef}
          onClick={() => setOpen((o) => !o)}
          isExpanded={open}
          style={{ width: 280 } as CSSProperties}
        >
          <strong style={{ marginInlineEnd: 8 }}>Workspace:</strong>
          {active.name}
        </MenuToggle>
      )}
    >
      <div style={{ padding: 8 }}>
        <SearchInput
          placeholder="Filter workspaces…"
          value={filter}
          onChange={(_e, v) => setFilter(v)}
          onClear={() => setFilter("")}
          aria-label="Filter workspaces"
        />
      </div>
      <Divider />
      {recent.length > 0 && (
        <SelectGroup label="Recent">
          <SelectList>
            {recent.map((w) => (
              <SelectOption
                key={w.id}
                value={w.id}
                isSelected={w.id === active.id}
              >
                {w.id === active.id ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <CheckIcon /> {w.name}
                  </span>
                ) : (
                  w.name
                )}
              </SelectOption>
            ))}
          </SelectList>
        </SelectGroup>
      )}
      {all.length > 0 && (
        <SelectGroup label="All workspaces">
          <SelectList>
            {all.map((w) => (
              <SelectOption
                key={w.id}
                value={w.id}
                isSelected={w.id === active.id}
              >
                {w.name}
              </SelectOption>
            ))}
          </SelectList>
        </SelectGroup>
      )}
      {filtered.length === 0 && (
        <SelectList>
          <SelectOption isAriaDisabled value="">
            No matches for &ldquo;{filter}&rdquo;
          </SelectOption>
        </SelectList>
      )}
    </Select>
  );
}
// #endregion

export default function ContextSelectorExample() {
  return <Demo />;
}
