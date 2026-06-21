import { useState, type Ref } from "react";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownList,
  Flex,
  MenuToggle,
  type MenuToggleElement,
} from "../base/index.js";
import type { CompassProfileMenuItem } from "./compassModels.js";

export type { CompassProfileMenuItem } from "./compassModels.js";

export interface CompassProfileMenuProps {
  /** Display name — shown beside the avatar (desktop) / aria-label (compact). */
  name: string;
  /** Avatar image src. */
  avatarSrc: string;
  /** Menu items. */
  items: CompassProfileMenuItem[];
  /** Avatar-only toggle (no name) — set from `useCompassResponsive()`. */
  isCompact?: boolean;
  /** Controlled open state. Pair with `onOpenChange`. */
  isOpen?: boolean;
  /** Uncontrolled initial open state (default false). */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Dropdown popper position (default "right"). */
  position?: "right" | "left";
}

/**
 * CompassProfileMenu — the user-profile dropdown for the Compass header: a
 * name + avatar toggle on desktop that collapses to an avatar-only toggle when
 * `isCompact`. Owns the open state and the responsive toggle; you pass the
 * name, avatar, and items.
 */
export function CompassProfileMenu({
  name,
  avatarSrc,
  items,
  isCompact = false,
  isOpen,
  defaultOpen = false,
  onOpenChange,
  position = "right",
}: CompassProfileMenuProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isOpen ?? internalOpen;

  const setOpen = (next: boolean) => {
    if (isOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <Dropdown
      isOpen={open}
      onSelect={() => setOpen(false)}
      onOpenChange={(next) => setOpen(next)}
      popperProps={{ position }}
      toggle={(toggleRef: Ref<MenuToggleElement>) =>
        isCompact ? (
          <MenuToggle
            ref={toggleRef}
            aria-label={name}
            onClick={() => setOpen(!open)}
            isExpanded={open}
            variant="plain"
            className="gp-compass-avatar-toggle"
            icon={<Avatar src={avatarSrc} alt="" size="md" />}
          />
        ) : (
          <MenuToggle
            ref={toggleRef}
            onClick={() => setOpen(!open)}
            isExpanded={open}
            variant="plain"
            isCircle
          >
            <Flex alignItems={{ default: "alignItemsCenter" }} gap={{ default: "gapMd" }}>
              {name}
              <Avatar src={avatarSrc} alt="" size="md" />
            </Flex>
          </MenuToggle>
        )
      }
    >
      <DropdownList>
        {items.map((item) => (
          <DropdownItem
            key={item.id}
            {...(item.onClick ? { onClick: item.onClick } : {})}
            {...(item.isDisabled ? { isDisabled: true } : {})}
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownList>
    </Dropdown>
  );
}
