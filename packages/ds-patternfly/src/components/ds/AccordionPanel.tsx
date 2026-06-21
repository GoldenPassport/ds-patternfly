import { useId, useState, type ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionToggle,
} from "../base/index.js";

/** A single expandable section. */
export interface AccordionPanelItem {
  /** Stable id (for controlled expansion). Defaults to a generated id. */
  id?: string;
  /** The clickable header. */
  title: ReactNode;
  /** The revealed body. */
  content: ReactNode;
  /** Disable the toggle. */
  isDisabled?: boolean;
}

/**
 * AccordionPanel — the accordion lego block: vertically stacked, expandable
 * sections from an `items` array. Owns the expand/collapse state and toggle
 * logic (single-open by default, `multiple` for many-open), the
 * `AccordionItem` / `Toggle` / `Content` wiring, and the id plumbing — you pass
 * data. Controlled (`expanded` + `onExpandedChange`) or uncontrolled
 * (`defaultExpanded`). The friendlier wrapper over the base Accordion family.
 */
export interface AccordionPanelProps {
  /** The sections. */
  items: AccordionPanelItem[];
  /** Allow several sections open at once. Default false (single-open). */
  multiple?: boolean;
  /** Initially-expanded id(s) — uncontrolled. */
  defaultExpanded?: string | string[];
  /** Controlled expanded id(s). Pair with `onExpandedChange`. */
  expanded?: string | string[];
  /** Fired with the next expanded id(s) when a section toggles. */
  onExpandedChange?: (expanded: string | string[]) => void;
  /** Outline each item as a card. */
  isBordered?: boolean;
  /** Render as a semantic definition list (`<dl>`) — for term/description pairs. */
  asDefinitionList?: boolean;
}

export function AccordionPanel({
  items,
  multiple = false,
  defaultExpanded,
  expanded,
  onExpandedChange,
  isBordered,
  asDefinitionList,
}: AccordionPanelProps) {
  const uid = useId();
  const idFor = (item: AccordionPanelItem, i: number) =>
    item.id ?? `${uid}-${i}`;

  const initial = defaultExpanded ?? (multiple ? [] : "");
  const [internal, setInternal] = useState<string | string[]>(initial);
  const current = expanded ?? internal;

  const isOpen = (id: string) =>
    Array.isArray(current) ? current.includes(id) : current === id;

  const toggle = (id: string) => {
    let next: string | string[];
    if (multiple) {
      const arr = Array.isArray(current) ? current : current ? [current] : [];
      next = arr.includes(id) ? arr.filter((p) => p !== id) : [...arr, id];
    } else {
      next = current === id ? "" : id;
    }
    if (expanded === undefined) setInternal(next);
    onExpandedChange?.(next);
  };

  return (
    <Accordion
      asDefinitionList={!!asDefinitionList}
      {...(isBordered ? { isBordered } : {})}
    >
      {items.map((item, i) => {
        const id = idFor(item, i);
        return (
          <AccordionItem key={id} isExpanded={isOpen(id)}>
            <AccordionToggle
              id={id}
              onClick={() => toggle(id)}
              {...(item.isDisabled ? { isDisabled: true } : {})}
            >
              {item.title}
            </AccordionToggle>
            <AccordionContent id={`${id}-content`}>
              {item.content}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
