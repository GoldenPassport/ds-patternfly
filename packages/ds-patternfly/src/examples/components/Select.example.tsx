/**
 * Select — a menu for picking values: single or multi, with optional
 * grouping, validation, and typeahead.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import type { CSSProperties, Ref } from "react";
import {
  Divider,
  MenuToggle,
  type MenuToggleElement,
  Select,
  SelectGroup,
  SelectList,
  SelectOption,
} from "../_lib.js";

// #region BasicSingleSelect
export function BasicSingleSelect() {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("us-east-1");
  return (
    <Select
      id={`${id}-region-select`}
      isOpen={isOpen}
      selected={selected}
      onSelect={(_e, v) => {
        setSelected(String(v));
        setIsOpen(false);
      }}
      onOpenChange={setIsOpen}
      shouldFocusToggleOnSelect
      toggle={(toggleRef: Ref<MenuToggleElement>) => (
        <MenuToggle
          ref={toggleRef}
          onClick={() => setIsOpen((o) => !o)}
          isExpanded={isOpen}
          style={{ width: 240 } as CSSProperties}
        >
          {selected}
        </MenuToggle>
      )}
    >
      <SelectList>
        <SelectOption value="us-east-1">us-east-1</SelectOption>
        <SelectOption value="us-west-2">us-west-2</SelectOption>
        <SelectOption value="eu-west-1">eu-west-1</SelectOption>
        <SelectOption value="ap-southeast-2">ap-southeast-2</SelectOption>
      </SelectList>
    </Select>
  );
}
// #endregion

// #region Grouped
export function Grouped() {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>("Acme · Production");
  return (
    <Select
      id={`${id}-grouped-select`}
      isOpen={isOpen}
      selected={selected}
      onSelect={(_e, v) => {
        setSelected(String(v));
        setIsOpen(false);
      }}
      onOpenChange={setIsOpen}
      toggle={(toggleRef) => (
        <MenuToggle
          ref={toggleRef}
          onClick={() => setIsOpen((o) => !o)}
          isExpanded={isOpen}
          style={{ width: 260 } as CSSProperties}
        >
          {selected}
        </MenuToggle>
      )}
    >
      <SelectGroup label="Acme">
        <SelectList>
          <SelectOption value="Acme · Production">Production</SelectOption>
          <SelectOption value="Acme · Staging">Staging</SelectOption>
        </SelectList>
      </SelectGroup>
      <Divider />
      <SelectGroup label="Beta Lab">
        <SelectList>
          <SelectOption value="Beta · Production">Production</SelectOption>
          <SelectOption value="Beta · Staging">Staging</SelectOption>
        </SelectList>
      </SelectGroup>
    </Select>
  );
}
// #endregion

// #region MultiSelectCheckboxes
export function MultiSelectCheckboxes() {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [multi, setMulti] = useState<string[]>(["status: open"]);
  const onMulti = (v: string) =>
    setMulti((prev) =>
      prev.includes(v) ? prev.filter((p) => p !== v) : [...prev, v],
    );
  return (
    <Select
      id={`${id}-multi-select`}
      role="menu"
      isOpen={isOpen}
      selected={multi}
      onSelect={(_e, v) => onMulti(String(v))}
      onOpenChange={setIsOpen}
      toggle={(toggleRef) => (
        <MenuToggle
          ref={toggleRef}
          onClick={() => setIsOpen((o) => !o)}
          isExpanded={isOpen}
          style={{ width: 240 } as CSSProperties}
          badge={multi.length > 0 ? multi.length : undefined}
        >
          Filter
        </MenuToggle>
      )}
    >
      <SelectList>
        {["status: open", "owner: me", "label: bug", "priority: p1"].map((v) => (
          <SelectOption
            key={v}
            hasCheckbox
            value={v}
            isSelected={multi.includes(v)}
          >
            {v}
          </SelectOption>
        ))}
      </SelectList>
    </Select>
  );
}
// #endregion

export default function SelectExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <BasicSingleSelect />
      <Grouped />
      <MultiSelectCheckboxes />
    </div>
  );
}
