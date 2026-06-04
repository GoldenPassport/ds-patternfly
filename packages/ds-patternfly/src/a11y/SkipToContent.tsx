import type { CSSProperties } from "react";

export interface SkipToContentProps {
  /** Element id of the main landmark to jump to (e.g. "main-content"). */
  targetId: string;
  /** Visible link text. Provided as a prop so it can be translated. */
  label: string;
}

const baseStyle: CSSProperties = {
  position: "absolute",
  insetInlineStart: "0.5rem",
  insetBlockStart: "0.5rem",
  padding: "0.5rem 0.75rem",
  background: "var(--gp-color-primary, #0066cc)",
  color: "var(--gp-color-on-primary, #ffffff)",
  borderRadius: "var(--gp-radius-md, 6px)",
  fontFamily: "var(--gp-font-family, inherit)",
  textDecoration: "none",
  zIndex: 9999,
  // Visually hidden until focused — using clip-path so screen readers still see it.
  clipPath: "inset(50%)",
  width: 1,
  height: 1,
  overflow: "hidden",
};

const focusedStyle: CSSProperties = {
  clipPath: "none",
  width: "auto",
  height: "auto",
  overflow: "visible",
};

/**
 * Keyboard-only "skip to main content" link. Renders invisibly until focused,
 * at which point it pops into the top-left of the viewport. Place it as the
 * first focusable element inside `<Shell>`.
 */
export function SkipToContent({ targetId, label }: SkipToContentProps) {
  return (
    <a
      href={`#${targetId}`}
      style={baseStyle}
      onFocus={(e) => Object.assign(e.currentTarget.style, focusedStyle)}
      onBlur={(e) => Object.assign(e.currentTarget.style, baseStyle)}
    >
      {label}
    </a>
  );
}
