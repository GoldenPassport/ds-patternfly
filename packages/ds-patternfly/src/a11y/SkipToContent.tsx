import type { CSSProperties } from "react";

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

/** The pill look shared by single link + menu items. */
const linkStyle: CSSProperties = {
  display: "block",
  padding: "0.5rem 0.75rem",
  background: "var(--gp-color-primary, #0066cc)",
  color: "var(--gp-color-on-primary, #ffffff)",
  borderRadius: "var(--gp-radius-md, 6px)",
  fontFamily: "var(--gp-font-family, inherit)",
  textDecoration: "none",
};

// Reveal is toggled imperatively on focus/blur (synchronous, so it works with
// programmatic focus and keyboard alike). Each toggle sets the full set of
// hide/show properties so assigning either object flips the state completely.
const CLIP_HIDDEN: CSSProperties = {
  clipPath: "inset(50%)",
  width: "1px",
  height: "1px",
  overflow: "hidden",
};
const CLIP_SHOWN: CSSProperties = {
  clipPath: "none",
  width: "auto",
  height: "auto",
  overflow: "visible",
};

const anchorBase: CSSProperties = {
  position: "absolute",
  insetInlineStart: "0.5rem",
  insetBlockStart: "0.5rem",
  zIndex: SKIP_Z,
};

const MENU_HIDDEN: CSSProperties = {
  ...CLIP_HIDDEN,
  display: "block",
  padding: 0,
  gap: 0,
  background: "transparent",
  boxShadow: "none",
};
const MENU_SHOWN: CSSProperties = {
  ...CLIP_SHOWN,
  display: "flex",
  flexDirection: "column",
  gap: "0.375rem",
  padding: "0.5rem",
  background: "var(--gp-color-bg-elevated, #ffffff)",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.25)",
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
  // ── Menu of skip links ───────────────────────────────────────────────
  if (links && links.length > 0) {
    return (
      <nav
        aria-label={ariaLabel ?? "Skip links"}
        style={{
          ...anchorBase,
          ...MENU_HIDDEN,
          borderRadius: "var(--gp-radius-md, 6px)",
        }}
        onFocus={(e) => Object.assign(e.currentTarget.style, MENU_SHOWN)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            Object.assign(e.currentTarget.style, MENU_HIDDEN);
          }
        }}
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
      style={{ ...anchorBase, ...linkStyle, ...CLIP_HIDDEN }}
      onFocus={(e) => Object.assign(e.currentTarget.style, CLIP_SHOWN)}
      onBlur={(e) => Object.assign(e.currentTarget.style, CLIP_HIDDEN)}
    >
      {label}
    </a>
  );
}
