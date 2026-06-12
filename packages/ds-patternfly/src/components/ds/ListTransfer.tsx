import { useState, type ReactNode } from "react";
import {
  DualListSelector,
  DualListSelectorControl,
  DualListSelectorControlsWrapper,
  DualListSelectorList,
  DualListSelectorListItem,
  DualListSelectorPane,
} from "../base/index.js";
import AngleDoubleLeftIcon from "@patternfly/react-icons/dist/esm/icons/angle-double-left-icon";
import AngleDoubleRightIcon from "@patternfly/react-icons/dist/esm/icons/angle-double-right-icon";
import AngleLeftIcon from "@patternfly/react-icons/dist/esm/icons/angle-left-icon";
import AngleRightIcon from "@patternfly/react-icons/dist/esm/icons/angle-right-icon";
import { type ListTransferLabels, listTransferEnLabels } from "./labels.js";

export type { ListTransferLabels } from "./labels.js";
export { listTransferEnLabels } from "./labels.js";

/** One transferable item. */
export interface TransferItem {
  /** Stable id. */
  id: string;
  /** Display content. */
  text: ReactNode;
}

/**
 * ListTransfer — the "dual list selector": two side-by-side lists with
 * controls for moving items between an Available pane and a Chosen pane
 * (select-some / move-all, both directions). Controlled by the `available`
 * and `chosen` partitions — ListTransfer owns the transient per-item
 * selection and the move logic, and fires `onChange` with the new partition.
 * Use for permissions, column pickers, allow-lists.
 */
export interface ListTransferProps {
  /** Required. Provide via `listTransferEnLabels` or your translations. */
  labels?: ListTransferLabels;
  /** Items in the Available (left) pane. */
  available: TransferItem[];
  /** Items in the Chosen (right) pane. */
  chosen: TransferItem[];
  /** Fired with the new partition whenever items move. */
  onChange: (next: { available: TransferItem[]; chosen: TransferItem[] }) => void;
}

function status(template: string, selected: number, total: number): string {
  return template
    .replace(/\{selected\}/g, String(selected))
    .replace(/\{total\}/g, String(total));
}

export function ListTransfer({
  labels = listTransferEnLabels,
  available,
  chosen,
  onChange,
}: ListTransferProps) {
  const [availSel, setAvailSel] = useState<Set<string>>(new Set());
  const [chosenSel, setChosenSel] = useState<Set<string>>(new Set());

  const toggle = (set: Set<string>, id: string): Set<string> => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  };

  const moveSelected = (fromAvailable: boolean) => {
    const sel = fromAvailable ? availSel : chosenSel;
    const src = fromAvailable ? available : chosen;
    const dst = fromAvailable ? chosen : available;
    const moved = src.filter((it) => sel.has(it.id));
    const remaining = src.filter((it) => !sel.has(it.id));
    const nextSrc = remaining;
    const nextDst = [...dst, ...moved];
    onChange(
      fromAvailable
        ? { available: nextSrc, chosen: nextDst }
        : { available: nextDst, chosen: nextSrc },
    );
    if (fromAvailable) setAvailSel(new Set());
    else setChosenSel(new Set());
  };

  const moveAll = (fromAvailable: boolean) => {
    onChange(
      fromAvailable
        ? { available: [], chosen: [...chosen, ...available] }
        : { available: [...available, ...chosen], chosen: [] },
    );
    setAvailSel(new Set());
    setChosenSel(new Set());
  };

  const pane = (items: TransferItem[], isChosen: boolean) => {
    const sel = isChosen ? chosenSel : availSel;
    const setSel = isChosen ? setChosenSel : setAvailSel;
    return (
      <DualListSelectorPane
        title={isChosen ? labels.chosenTitle : labels.availableTitle}
        status={status(labels.selectedStatus, sel.size, items.length)}
        {...(isChosen ? { isChosen: true } : {})}
      >
        <DualListSelectorList>
          {items.map((it) => (
            <DualListSelectorListItem
              key={it.id}
              isSelected={sel.has(it.id)}
              onOptionSelect={() => setSel(toggle(sel, it.id))}
            >
              {it.text}
            </DualListSelectorListItem>
          ))}
        </DualListSelectorList>
      </DualListSelectorPane>
    );
  };

  return (
    <DualListSelector>
      {pane(available, false)}
      <DualListSelectorControlsWrapper>
        <DualListSelectorControl
          isDisabled={availSel.size === 0}
          onClick={() => moveSelected(true)}
          aria-label={labels.addSelected}
          icon={<AngleRightIcon />}
        />
        <DualListSelectorControl
          isDisabled={available.length === 0}
          onClick={() => moveAll(true)}
          aria-label={labels.addAll}
          icon={<AngleDoubleRightIcon />}
        />
        <DualListSelectorControl
          isDisabled={chosen.length === 0}
          onClick={() => moveAll(false)}
          aria-label={labels.removeAll}
          icon={<AngleDoubleLeftIcon />}
        />
        <DualListSelectorControl
          isDisabled={chosenSel.size === 0}
          onClick={() => moveSelected(false)}
          aria-label={labels.removeSelected}
          icon={<AngleLeftIcon />}
        />
      </DualListSelectorControlsWrapper>
      {pane(chosen, true)}
    </DualListSelector>
  );
}
