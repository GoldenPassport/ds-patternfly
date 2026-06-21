import type { CSSProperties } from "react";
import { Button, type ButtonProps } from "../base/index.js";

/**
 * Corner shape. PF6 ships no `shape` prop on Button, so the radius lands as an
 * inline style. `circle` / `pill` additionally square the box for icon-only
 * buttons so the radius reads as a true circle / pill, not an ellipse.
 */
export type ButtonShape =
  | "default"
  | "square"
  | "rounded"
  | "strong"
  | "pill"
  | "circle";

const SHAPE_RADIUS: Record<ButtonShape, string> = {
  default: "var(--gp-radius-control, var(--pf-v6-c-button--BorderRadius))",
  square: "0",
  rounded: "8px",
  strong: "12px",
  pill: "999px",
  circle: "50%",
};

/**
 * ActionButton — the brandable button lego block: the base Button plus a
 * `shape` prop (default / square / rounded / strong / pill / circle). Owns the
 * border-radius mapping and the icon-only squaring so a circular or pill icon
 * button is one prop, not a hand-rolled inline style. Everything else
 * (variant, icon, isLoading, isDisabled, onClick, …) passes straight through to
 * Button.
 */
export interface ActionButtonProps extends ButtonProps {
  /** Corner shape. Default "default" (the brand control radius). */
  shape?: ButtonShape;
}

export function ActionButton({
  shape = "default",
  icon,
  children,
  style,
  ...rest
}: ActionButtonProps) {
  const iconOnly = icon != null && (children == null || children === false);
  const shapeStyle: CSSProperties = {
    borderRadius: SHAPE_RADIUS[shape],
    // Icon-only pill / circle buttons need a square box so the radius renders
    // as a true circle / pill rather than an ellipse.
    ...(iconOnly && (shape === "circle" || shape === "pill")
      ? { aspectRatio: "1", paddingInline: 0 }
      : {}),
  };
  return (
    <Button
      {...rest}
      {...(icon ? { icon } : {})}
      style={{ ...shapeStyle, ...style }}
    >
      {children}
    </Button>
  );
}
