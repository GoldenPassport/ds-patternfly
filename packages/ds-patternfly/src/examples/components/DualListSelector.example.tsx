/**
 * DualListSelector — two side-by-side lists with controls for moving
 * items between them (permission pickers, role assignment, membership).
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import {
  DualListSelector,
  DualListSelectorControl,
  DualListSelectorControlsWrapper,
  DualListSelectorList,
  DualListSelectorListItem,
  DualListSelectorPane,
} from "@golden-passport/ds-patternfly";
import {
  AngleDoubleLeftIcon,
  AngleDoubleRightIcon,
  AngleLeftIcon,
  AngleRightIcon,
} from "@patternfly/react-icons";

type Item = { text: string; selected: boolean };

// #region Basic
export function Basic() {
  const [available, setAvailable] = useState<Item[]>([
    { text: "Read tasks", selected: false },
    { text: "Write tasks", selected: false },
    { text: "Delete tasks", selected: false },
    { text: "Manage members", selected: false },
    { text: "Manage billing", selected: false },
  ]);
  const [chosen, setChosen] = useState<Item[]>([
    { text: "Read workflows", selected: false },
  ]);

  const moveSelected = (fromAvailable: boolean) => {
    const src = fromAvailable ? [...available] : [...chosen];
    const dst = fromAvailable ? [...chosen] : [...available];
    const moved = src.filter((it) => it.selected).map((it) => ({ ...it, selected: false }));
    const remaining = src.filter((it) => !it.selected);
    if (fromAvailable) {
      setAvailable(remaining);
      setChosen([...dst, ...moved]);
    } else {
      setChosen(remaining);
      setAvailable([...dst, ...moved]);
    }
  };

  const moveAll = (fromAvailable: boolean) => {
    if (fromAvailable) {
      setChosen([...chosen, ...available.map((it) => ({ ...it, selected: false }))]);
      setAvailable([]);
    } else {
      setAvailable([...available, ...chosen.map((it) => ({ ...it, selected: false }))]);
      setChosen([]);
    }
  };

  const onOptionSelect = (
    _e: unknown,
    idx: number,
    isAvailable: boolean,
  ) => {
    const set = isAvailable ? setAvailable : setChosen;
    const list = isAvailable ? [...available] : [...chosen];
    const item = list[idx];
    if (!item) return;
    list[idx] = { ...item, selected: !item.selected };
    set(list);
  };

  return (
    <DualListSelector>
      <DualListSelectorPane
        title="Available permissions"
        status={`${available.filter((i) => i.selected).length} of ${available.length} selected`}
      >
        <DualListSelectorList>
          {available.map((it, i) => (
            <DualListSelectorListItem
              key={it.text}
              isSelected={it.selected}
              onOptionSelect={(e) => onOptionSelect(e, i, true)}
            >
              {it.text}
            </DualListSelectorListItem>
          ))}
        </DualListSelectorList>
      </DualListSelectorPane>

      <DualListSelectorControlsWrapper>
        <DualListSelectorControl
          isDisabled={!available.some((i) => i.selected)}
          onClick={() => moveSelected(true)}
          aria-label="Add selected"
          icon={<AngleRightIcon />}
        />
        <DualListSelectorControl
          isDisabled={available.length === 0}
          onClick={() => moveAll(true)}
          aria-label="Add all"
          icon={<AngleDoubleRightIcon />}
        />
        <DualListSelectorControl
          isDisabled={chosen.length === 0}
          onClick={() => moveAll(false)}
          aria-label="Remove all"
          icon={<AngleDoubleLeftIcon />}
        />
        <DualListSelectorControl
          isDisabled={!chosen.some((i) => i.selected)}
          onClick={() => moveSelected(false)}
          aria-label="Remove selected"
          icon={<AngleLeftIcon />}
        />
      </DualListSelectorControlsWrapper>

      <DualListSelectorPane
        title="Chosen permissions"
        status={`${chosen.filter((i) => i.selected).length} of ${chosen.length} selected`}
        isChosen
      >
        <DualListSelectorList>
          {chosen.map((it, i) => (
            <DualListSelectorListItem
              key={it.text}
              isSelected={it.selected}
              onOptionSelect={(e) => onOptionSelect(e, i, false)}
            >
              {it.text}
            </DualListSelectorListItem>
          ))}
        </DualListSelectorList>
      </DualListSelectorPane>
    </DualListSelector>
  );
}
// #endregion

export default function DualListSelectorExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
    </div>
  );
}
