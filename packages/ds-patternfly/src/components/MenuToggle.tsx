/**
 * DS MenuToggle — PatternFly 6 MenuToggle under the Golden Passport dials.
 * Thin wrapper: the dial CSS (src/styles) already brands it; add DS
 * defaults here when the design system diverges from stock PF6.
 * Ref-forwarding: Dropdown/Select toggles position their menus against the
 * toggle element, so the ref must reach PF6's node.
 */
import { forwardRef } from "react";
import { MenuToggle as PFMenuToggle } from "@patternfly/react-core";
import type { ComponentPropsWithoutRef, ComponentRef } from "react";

export type MenuToggleProps = ComponentPropsWithoutRef<typeof PFMenuToggle>;

export const MenuToggle = forwardRef<
  ComponentRef<typeof PFMenuToggle>,
  MenuToggleProps
>(function MenuToggle(props, ref) {
  return <PFMenuToggle ref={ref} {...props} />;
});

export {
  MenuToggleAction,
  MenuToggleCheckbox,
} from "@patternfly/react-core";

export type {
  MenuToggleElement,
} from "@patternfly/react-core";
