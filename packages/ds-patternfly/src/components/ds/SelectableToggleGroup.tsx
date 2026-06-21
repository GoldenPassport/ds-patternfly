import { useId, type ReactNode } from "react";
import { ToggleGroup, ToggleGroupItem } from "../base/index.js";

/** One option in a SelectableToggleGroup. */
export interface ToggleOption {
  /** Stable id — the selection value. */
  id: string;
  /** Visible label. Omit for an icon-only option (then set `ariaLabel`). */
  text?: ReactNode;
  /** Leading icon. */
  icon?: ReactNode;
  /** Accessible name — required for icon-only options. */
  ariaLabel?: string;
  /** Disable just this option. */
  isDisabled?: boolean;
}

interface BaseProps {
  /** The options to render. */
  items: ToggleOption[];
  /** Accessible name for the group (required). */
  ariaLabel: string;
  /** Tighter pill sizing. */
  isCompact?: boolean;
}

export type SelectableToggleGroupProps =
  | (BaseProps & {
      /** Single-select (default): one active option, or none. */
      selectionMode?: "single";
      /** The selected id, or `""` for none. */
      value: string;
      /** Fired with the new selected id (`""` when the active one is cleared). */
      onChange: (value: string) => void;
      /** Allow clicking the active option to clear it (default true). */
      allowDeselect?: boolean;
    })
  | (BaseProps & {
      /** Multi-select: any number of active options. */
      selectionMode: "multiple";
      /** The selected ids. */
      value: string[];
      /** Fired with the next set of selected ids. */
      onChange: (value: string[]) => void;
    });

/**
 * SelectableToggleGroup — a pill row of toggleable options (view switcher,
 * inline radio / checkbox set). The lego block owns the per-item id wiring and
 * the single- vs multi-select state transitions; you pass `items` and the
 * controlled `value` / `onChange`. Single-select is deselectable by default;
 * pass `selectionMode="multiple"` for an independent on/off set.
 */
export function SelectableToggleGroup(props: SelectableToggleGroupProps) {
  const { items, ariaLabel, isCompact } = props;
  const reactId = useId();

  const isSelected = (id: string) =>
    props.selectionMode === "multiple"
      ? props.value.includes(id)
      : props.value === id;

  const handle = (id: string) => {
    if (props.selectionMode === "multiple") {
      props.onChange(
        props.value.includes(id)
          ? props.value.filter((v) => v !== id)
          : [...props.value, id],
      );
    } else {
      const allowDeselect = props.allowDeselect ?? true;
      props.onChange(allowDeselect && props.value === id ? "" : id);
    }
  };

  return (
    <ToggleGroup aria-label={ariaLabel} {...(isCompact ? { isCompact: true } : {})}>
      {items.map((it) => (
        <ToggleGroupItem
          key={it.id}
          buttonId={`${reactId}-${it.id}`}
          isSelected={isSelected(it.id)}
          onChange={() => handle(it.id)}
          {...(it.text != null ? { text: it.text } : {})}
          {...(it.icon != null ? { icon: it.icon } : {})}
          {...(it.ariaLabel != null ? { "aria-label": it.ariaLabel } : {})}
          {...(it.isDisabled ? { isDisabled: true } : {})}
        />
      ))}
    </ToggleGroup>
  );
}
