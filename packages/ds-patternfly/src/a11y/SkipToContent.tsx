import { useState, type CSSProperties } from "react";

/** A single destination in a skip-links menu. */
export interface SkipLink {
  /** Element id of the landmark to jump to (must be focusable, e.g. tabIndex={-1}). */
  targetId: string;
  /** Visible link text. */
  label: string;
}

export interface SkipToContentProps {
  /** Single-target: element id of the main landmark to jump to (e.g. "main-content"). */
  targetId?: string;
  /** Single-target: visible link text. Provided as a prop so it can be translated. */
  label?: string;
  /**
   * Multi-target: a menu of skip links (e.g. Skip to main content /
   * navigation / search). When provided, renders a focus-revealed skip-links
   * nav and takes precedence over `targetId` / `label`.
   */
  links?: SkipLink[];
  /** Accessible name for the skip-links nav in multi-target mode. */
  ariaLabel?: string;
}

// Brand z-index token for the skip link (see --gp-z-skip-link in styles).
const SKIP_Z = "var(--gp-z-skip-link, 9999)" as CSSProperties["zIndex"];

const HIDDEN: CSSProperties = {
  // Visually hidden until focused — clip-path so screen readers still see it.
  position: "absolute",
  insetInlineStart: "0.5rem",
  insetBlockStart: "0.5rem",
  clipPath: "inset(50%)",
  width: 1,
  height: 1,
  overflow: "hidden",
  zIndex: SKIP_Z,
};

const linkStyle: CSSProperties = {
  display: "block",
  padding: "0.5rem 0.75rem",
  background: "var(--gp-color-primary, #0066cc)",
  color: "var(--gp-color-on-primary, #ffffff)",
  borderRadius: "var(--gp-radius-md, 6px)",
  fontFamily: "var(--gp-font-family, inherit)",
  textDecoration: "none",
};

const singleFocused: CSSProperties = {
  ...linkStyle,
  position: "absolute",
  insetInlineStart: "0.5rem",
  insetBlockStart: "0.5rem",
  clipPath: "none",
  width: "auto",
  height: "auto",
  overflow: "visible",
  zIndex: SKIP_Z,
};

/**
 * Keyboard-only "skip to content" affordance. Renders invisibly until focused,
 * then pops into the top-left of the viewport. Place it as the first focusable
 * element inside `<Shell>` / your app root.
 *
 * Pass `targetId` + `label` for a single skip link, or `links` for a menu of
 * skip targets (main content, navigation, search, …) revealed together on
 * focus. Every target id must be focusable (e.g. `tabIndex={-1}`).
 */
export function SkipToContent({ targetId, label, links, ariaLabel }: SkipToContentProps) {
  const [focused, setFocused] = useState(false);

  // ── Menu of skip links ───────────────────────────────────────────────
  if (links && links.length > 0) {
    return (
      <nav
        aria-label={ariaLabel ?? "Skip links"}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
        }}
        style={
          focused
            ? {
                position: "absolute",
                insetInlineStart: "0.5rem",
                insetBlockStart: "0.5rem",
                zIndex: SKIP_Z,
                display: "flex",
                flexDirection: "column",
                gap: "0.375rem",
                padding: "0.5rem",
                background: "var(--gp-color-bg-elevated, #ffffff)",
                borderRadius: "var(--gp-radius-md, 6px)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.25)",
              }
            : HIDDEN
        }
      >
        {links.map((link) => (
          <a key={link.targetId} href={`#${link.targetId}`} style={linkStyle}>
            {link.label}
          </a>
        ))}
      </nav>
    );
  }

  // ── Single skip link ─────────────────────────────────────────────────
  return (
    <a
      href={`#${targetId ?? ""}`}
      style={focused ? singleFocused : { ...HIDDEN, ...linkStyle }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {label}
    </a>
  );
}
