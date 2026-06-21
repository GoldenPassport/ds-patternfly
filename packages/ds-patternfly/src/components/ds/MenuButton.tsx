import { useState, type ReactNode } from "react";
import {
  Divider,
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownList,
  MenuToggle,
  type MenuToggleElement,
} from "../base/index.js";

/** A single action in a MenuButton. */
export interface MenuAction {
  /** Identifier passed to `onSelect`. */
  id?: string;
  /** Visible label. */
  label: ReactNode;
  /** Secondary line under the label. */
  description?: ReactNode;
  /** Leading icon. */
  icon?: ReactNode;
  /** Disable the item (kept in the list, not selectable). */
  isDisabled?: boolean;
  /** Render a checkmark / selected state (for toggle-style items). */
  isSelected?: boolean;
  /** Per-item handler (fires alongside the menu's `onSelect`). */
  onClick?: () => void;
}
/** A labelled group of actions. */
export interface MenuActionGroup {
  group: ReactNode;
  items: MenuAction[];
}
/** A divider between items / groups. */
export type MenuDivider = "divider";

export type MenuButtonItem = MenuAction | MenuActionGroup | MenuDivider;

/**
 * MenuButton — the action-menu lego block. A trigger button that opens a
 * floating menu of actions, owning the open state, the toggle, and the
 * close-on-select / close-on-outside-click wiring so consumers pass data, not
 * boilerplate. Pass `items` (actions, `"divider"`, or `{ group, items }`) for
 * the common case, or `children` for a bespoke menu body. Built on the base
 * Dropdown + MenuToggle.
 */
export interface MenuButtonProps {
  /** Toggle text. Omit for an icon-only trigger (pass `icon` + `ariaLabel`). */
  label?: ReactNode;
  /** Toggle icon (e.g. a kebab, launcher grid, filter glyph). */
  icon?: ReactNode;
  /** Toggle style. `plain` is the icon-only / kebab look. Default "default". */
  toggleVariant?: "default" | "plain" | "primary" | "secondary";
  /** Accessible name — required for icon-only toggles. */
  ariaLabel?: string;
  /** Count badge on the toggle (e.g. number of active filters). */
  badge?: number;
  /** The menu contents as data. Ignored when `children` is provided. */
  items?: MenuButtonItem[];
  /** Bespoke menu body (escape hatch) — overrides `items`. */
  children?: ReactNode;
  /** Fired when an action is chosen, with its `id` (and the action). */
  onSelect?: (id: string | undefined, action?: MenuAction) => void;
  /** Popper placement of the menu. */
  position?: "start" | "end" | "center" | "right" | "left";
  /** Disable the trigger. */
  isDisabled?: boolean;
}

function isGroup(i: MenuButtonItem): i is MenuActionGroup {
  return typeof i === "object" && i !== null && "group" in i;
}

export function MenuButton({
  label,
  icon,
  toggleVariant = "default",
  ariaLabel,
  badge,
  items,
  children,
  onSelect,
  position,
  isDisabled,
}: MenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const renderAction = (a: MenuAction, key: string) => (
    <DropdownItem
      key={key}
      {...(a.id !== undefined ? { value: a.id } : {})}
      {...(a.description != null ? { description: a.description } : {})}
      {...(a.icon ? { icon: a.icon } : {})}
      isDisabled={!!a.isDisabled}
      onClick={() => {
        a.onClick?.();
        onSelect?.(a.id, a);
      }}
    >
      {a.label}
    </DropdownItem>
  );

  const body =
    children ??
    (items ?? []).map((item, i) => {
      if (item === "divider") return <Divider component="li" key={`d-${i}`} />;
      if (isGroup(item)) {
        return (
          <DropdownGroup key={`g-${i}`} label={item.group}>
            <DropdownList>
              {item.items.map((a, j) => renderAction(a, `g-${i}-${j}`))}
            </DropdownList>
          </DropdownGroup>
        );
      }
      return renderAction(item, `i-${i}`);
    });

  // When items (not children) are passed, wrap bare actions in a DropdownList.
  const content =
    children || (items ?? []).some((i) => i === "divider" || isGroup(i)) ? (
      body
    ) : (
      <DropdownList>{body}</DropdownList>
    );

  return (
    <Dropdown
      isOpen={isOpen}
      onSelect={() => setIsOpen(false)}
      onOpenChange={setIsOpen}
      // Situationally aware: portal to <body> so the menu escapes overflow-
      // clipped containers (cards, iframes), and let Popper flip/shift to stay
      // on-screen — a top-left trigger opens down-and-right, an edge trigger
      // flips inward instead of clipping.
      popperProps={{
        ...(position ? { position } : {}),
        enableFlip: true,
        preventOverflow: true,
        appendTo: () => document.body,
      }}
      toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
        <MenuToggle
          ref={toggleRef}
          onClick={() => setIsOpen((o) => !o)}
          isExpanded={isOpen}
          isDisabled={!!isDisabled}
          variant={toggleVariant}
          {...(icon ? { icon } : {})}
          {...(badge != null && badge > 0 ? { badge } : {})}
          {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
        >
          {label}
        </MenuToggle>
      )}
    >
      {content}
    </Dropdown>
  );
}
