/**
 * Options menu — a toggleable menu of toggleable settings (filter sets,
 * display preferences), composed from Select with hasCheckbox options.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import type { Ref } from "react";
import {
  Divider,
  MenuToggle,
  type MenuToggleElement,
  Select,
  SelectGroup,
  SelectList,
  SelectOption,
} from "@golden-passport/ds-patternfly";
import { CogIcon, FilterIcon } from "@patternfly/react-icons";

// #region MultiSelectFilterSet
export function MultiSelectFilterSet() {
  const selectId = useId();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<string[]>(["status: open"]);
  const toggleFilter = (v: string) =>
    setFilters((prev) =>
      prev.includes(v) ? prev.filter((p) => p !== v) : [...prev, v],
    );

  return (
    <Select
      id={selectId}
      role="menu"
      isOpen={filterOpen}
      selected={filters}
      onSelect={(_e, v) => toggleFilter(String(v))}
      onOpenChange={setFilterOpen}
      toggle={(toggleRef: Ref<MenuToggleElement>) => (
        <MenuToggle
          ref={toggleRef}
          onClick={() => setFilterOpen((o) => !o)}
          isExpanded={filterOpen}
          icon={<FilterIcon />}
          badge={filters.length > 0 ? filters.length : undefined}
        >
          Filter
        </MenuToggle>
      )}
    >
      <SelectGroup label="Status">
        <SelectList>
          {["status: open", "status: in-progress", "status: closed"].map(
            (v) => (
              <SelectOption
                key={v}
                hasCheckbox
                value={v}
                isSelected={filters.includes(v)}
              >
                {v.replace("status: ", "")}
              </SelectOption>
            ),
          )}
        </SelectList>
      </SelectGroup>
      <Divider />
      <SelectGroup label="Owner">
        <SelectList>
          {["owner: me", "owner: my-team", "owner: anyone"].map((v) => (
            <SelectOption
              key={v}
              hasCheckbox
              value={v}
              isSelected={filters.includes(v)}
            >
              {v.replace("owner: ", "")}
            </SelectOption>
          ))}
        </SelectList>
      </SelectGroup>
      <Divider />
      <SelectGroup label="Priority">
        <SelectList>
          {["priority: p1", "priority: p2", "priority: p3"].map((v) => (
            <SelectOption
              key={v}
              hasCheckbox
              value={v}
              isSelected={filters.includes(v)}
            >
              {v.replace("priority: ", "")}
            </SelectOption>
          ))}
        </SelectList>
      </SelectGroup>
    </Select>
  );
}
// #endregion

// #region SettingsCluster
export function SettingsCluster() {
  const selectId = useId();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [density, setDensity] = useState<string>("comfortable");

  return (
    <Select
      id={selectId}
      isOpen={settingsOpen}
      selected={density}
      onSelect={(_e, v) => {
        setDensity(String(v));
        setSettingsOpen(false);
      }}
      onOpenChange={setSettingsOpen}
      toggle={(toggleRef) => (
        <MenuToggle
          ref={toggleRef}
          aria-label="Display options"
          variant="plain"
          onClick={() => setSettingsOpen((o) => !o)}
          isExpanded={settingsOpen}
          icon={<CogIcon />}
        />
      )}
    >
      <SelectGroup label="Density">
        <SelectList>
          {["compact", "comfortable", "spacious"].map((v) => (
            <SelectOption
              key={v}
              value={v}
              isSelected={density === v}
            >
              {v[0]?.toUpperCase()}{v.slice(1)}
            </SelectOption>
          ))}
        </SelectList>
      </SelectGroup>
    </Select>
  );
}
// #endregion

export default function OptionsMenuExample() {
  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
      <MultiSelectFilterSet />
      <SettingsCluster />
    </div>
  );
}
