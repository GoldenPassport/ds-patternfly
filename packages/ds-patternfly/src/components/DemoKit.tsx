import { useEffect } from "react";
import type { CSSProperties, ReactNode } from "react";

/**
 * PF6 breakpoint widths (px). Matches `--pf-v6-c-page__sidebar--xl--Width`
 * etc. tokens — used by `sidenavDrawerCss` to decide where push → overlay
 * switches via a container query.
 */
const PF6_BREAKPOINT_PX = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  "2xl": 1450,
} as const;

/**
 * Mode for `sidenavDrawerCss.overlayBelow`:
 *   - a breakpoint key (`"sm"`–`"2xl"`) — switch to overlay when the
 *     demo container is narrower than that breakpoint (push above),
 *   - `"always"` — overlay regardless of container width (canonical
 *     drawer demo),
 *   - `"never"` — push regardless of container width (canonical pinned
 *     desktop sidebar).
 */
export type SidenavOverlayBreakpoint =
  | keyof typeof PF6_BREAKPOINT_PX
  | "always"
  | "never";

/**
 * Scoped CSS for the PF6 Page sidenav-drawer pattern. Switches between
 * push (sidebar pinned beside content) and overlay (sidebar floats over
 * content with a backdrop) based on the demo container's own inline
 * size — not the viewport — via a container query, so Storybook docs
 * with multiple demos stacked at different widths behave correctly.
 *
 * Defaults to `overlayBelow: "md"` (overlay at <768px, push at ≥768px).
 *
 * - Push mode: smooth same-speed width transition, `overflow: hidden`
 *   held across both states so content doesn't snap into view on the
 *   open transition.
 * - Overlay mode: absolute-positioned sidebar with z-index lift,
 *   semi-transparent backdrop, slide-in via transform.
 *
 * Pair with `useSidenavOffClick`, which auto-detects the active mode
 * via the sidebar's computed `position` and closes only in overlay.
 */
export function sidenavDrawerCss(
  containerId: string,
  {
    overlayBelow = "md",
    fullHeight = false,
  }: {
    overlayBelow?: SidenavOverlayBreakpoint;
    /** Full-viewport-height overlay variant: the drawer spans the whole
     * page (over the masthead too), scrolls a long nav, and sits above
     * the masthead with a full-page scrim — pair with an in-drawer close
     * button since the masthead toggle is then covered. Only affects the
     * overlay mode; push mode is unchanged. */
    fullHeight?: boolean;
  } = {},
) {
  const c = `#${containerId}`;
  // Overlay-mode rules. Apply at default (narrow) widths and below the
  // breakpoint via a container query. The sidebar floats from the
  // start-inline edge with a shadow on its end-inline edge — in LTR
  // that's a right-edge shadow + slide-from-left; `:dir(rtl)` flips
  // both to a left-edge shadow + slide-from-right.
  const overlayRules = [
    `${c} .pf-v6-c-page {`,
    `  position: relative;`,
    `}`,
    `${c} .pf-v6-c-page__sidebar {`,
    `  position: absolute;`,
    `  /* The sidebar is a grid item placed in the content row, so its`,
    `     absolute containing block already begins just below the masthead.`,
    `     Pin it with inset-block: 0 — adding a masthead-height offset here`,
    `     would double-count and push the drawer too far down. */`,
    `  inset-block: 0;`,
    `  inset-inline-start: 0;`,
    `  /* Drop PF6's sidebar margins so the overlay drawer sits flush to the`,
    `     header (no top gap) and the inline-start edge. */`,
    `  margin: 0;`,
    `  width: var(--pf-v6-c-page__sidebar--xl--Width);`,
    `  overflow: hidden;`,
    `  z-index: 1000;`,
    `  /* End-inline shadow (right in LTR). RTL flip below. */`,
    `  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.18);`,
    `  transform: translateX(0);`,
    `  transition: transform 220ms cubic-bezier(0.4, 0, 0.2, 1);`,
    `}`,
    `${c} .pf-v6-c-page__sidebar-main {`,
    `  /* In the glass theme PF6 turns the sidebar panel into a floating,`,
    `     inset, rounded card with an all-round drop shadow. For an overlay`,
    `     drawer that should be flush: drop the inset margin, the rounded`,
    `     corners, and the card shadow — the only shadow we keep is the`,
    `     sidebar's end-inline (right) edge shadow set above. */`,
    `  margin: 0;`,
    `  border-radius: 0;`,
    `  box-shadow: none;`,
    `}`,
    // Glass + overlay: the drawer floats over the content, so frost it with
    // the SAME standardised system glass as every other chrome surface
    // (masthead, push side nav, menus) — see --gp-glass-surface-fill in
    // src/styles/index.css. The backdrop blur keeps the nav legible at this
    // thinner opacity.
    `.pf-v6-theme-glass ${c} .pf-v6-c-page__sidebar-main {`,
    `  background-color: var(--gp-glass-surface-fill) !important;`,
    `  backdrop-filter: var(--gp-glass-surface-blur) saturate(140%);`,
    `  -webkit-backdrop-filter: var(--gp-glass-surface-blur) saturate(140%);`,
    `}`,
    `:dir(rtl) ${c} .pf-v6-c-page__sidebar {`,
    `  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.18);`,
    `}`,
    `${c} .pf-v6-c-page__sidebar.pf-m-collapsed {`,
    `  transform: translateX(-100%);`,
    `  /* When collapsed, PF6 marks the drawer aria-hidden; hide it after the`,
    `     slide-out so its off-screen controls (close button, nav links) drop`,
    `     out of the tab order too — otherwise axe flags aria-hidden-focus.`,
    `     visibility flips only after the 220ms transform, so the slide-out`,
    `     still animates; on expand the base rule restores it immediately. */`,
    `  visibility: hidden;`,
    `  transition: transform 220ms cubic-bezier(0.4, 0, 0.2, 1),`,
    `    visibility 0s linear 220ms;`,
    `}`,
    `:dir(rtl) ${c} .pf-v6-c-page__sidebar.pf-m-collapsed {`,
    `  transform: translateX(100%);`,
    `}`,
    `${c} .pf-v6-c-page:has(.pf-v6-c-page__sidebar.pf-m-expanded)::before {`,
    `  content: "";`,
    `  /* Place the scrim in the content row (row 2, below the masthead`,
    `     header row) via the grid, then fill it. This keeps the masthead`,
    `     uncovered without depending on a fixed masthead-height value. */`,
    `  grid-row: 2 / -1;`,
    `  grid-column: 1 / -1;`,
    `  position: absolute;`,
    `  inset: 0;`,
    `  background: rgba(0, 0, 0, 0.32);`,
    `  z-index: 999;`,
    `  pointer-events: none;`,
    `}`,
  ];
  if (fullHeight) {
    // Override the overlay rules above for the full-viewport-height
    // variant: span header + content rows (full page height), scroll a
    // long nav, and lift above the masthead.
    overlayRules.push(
      `${c} .pf-v6-c-page__sidebar {`,
      `  grid-row: 1 / -1;`,
      `  overflow-y: auto;`,
      `  z-index: 1100;`,
      `  /* PF6 gives the sidebar a top margin; zero it so the full-height`,
      `     overlay reaches the very top (covering the masthead). */`,
      `  margin-block-start: 0;`,
      `}`,
      // Drop the ::before scrim — the demo renders a real, clickable
      // .gp-sidenav-scrim (tapping the overlay closes the nav). It sits
      // just under the sidebar (z 1100) and over the page content.
      `${c} .pf-v6-c-page:has(.pf-v6-c-page__sidebar.pf-m-expanded)::before {`,
      `  content: none;`,
      `}`,
      `${c} .gp-sidenav-scrim {`,
      `  display: block;`,
      `}`,
    );
  }
  // Push-mode rules. Reset overlay-mode rules and pin the sidebar back
  // into the page grid with a width transition.
  const pushRules = [
    `${c} .pf-v6-c-page {`,
    `  position: static;`,
    `  grid-template-areas: "header header" "sidebar main";`,
    `  grid-template-columns: auto 1fr;`,
    `}`,
    `${c} .pf-v6-c-page__sidebar {`,
    `  position: static;`,
    `  inset: auto;`,
    `  width: var(--pf-v6-c-page__sidebar--xl--Width);`,
    `  overflow: hidden;`,
    `  z-index: auto;`,
    `  box-shadow: none;`,
    `  transform: none;`,
    `  transition: width 220ms cubic-bezier(0.4, 0, 0.2, 1);`,
    `}`,
    `${c} .pf-v6-c-page__sidebar.pf-m-collapsed {`,
    `  width: 0;`,
    `  transform: none;`,
    `}`,
    `${c} .pf-v6-c-page:has(.pf-v6-c-page__sidebar.pf-m-expanded)::before {`,
    `  content: none;`,
    `}`,
    // No overlay in push mode → hide the clickable scrim (if present).
    `${c} .gp-sidenav-scrim {`,
    `  display: none;`,
    `}`,
    // Glass + push: float the nav as a frosted glass BOX — the standardised
    // system glass fill + blur, inset on all sides (so a strip of page shows
    // around it), rounded corners, and a soft glass shadow, so it reads as an
    // elevated floating panel (PF6's default glass floating-nav look, with our
    // standardised frost). Overrides the global push side-nav rule for this
    // demo (which keeps the nav flush with only an inner gap).
    `.pf-v6-theme-glass ${c} .pf-v6-c-page__sidebar-main {`,
    `  background-color: var(--gp-glass-surface-fill) !important;`,
    `  backdrop-filter: var(--gp-glass-surface-blur) saturate(140%);`,
    `  -webkit-backdrop-filter: var(--gp-glass-surface-blur) saturate(140%);`,
    `  margin: var(--pf-t--global--spacer--lg, 24px);`,
    `  border-radius: var(--gp-radius-card, 16px);`,
    `  box-shadow: var(--pf-t--global--box-shadow--glass--default);`,
    `}`,
    // The floating nav box already insets itself from the content with its
    // own end-inline margin, so drop the content panel's start-inline margin
    // — otherwise the two stack into a doubled gap. (Push only; the overlay
    // drawer floats over the content, so the panel keeps its symmetric inset.)
    `.pf-v6-theme-glass ${c} .pf-v6-c-page__main-container {`,
    `  margin-inline-start: 0;`,
    `}`,
  ];
  if (overlayBelow === "always") {
    return overlayRules.join("\n");
  }
  if (overlayBelow === "never") {
    return pushRules.join("\n");
  }
  const px = PF6_BREAKPOINT_PX[overlayBelow];
  return [
    // Container observed by the @container query lives at the wrapper id.
    `${c} { container-type: inline-size; }`,
    // Mobile-first: overlay at narrow widths.
    ...overlayRules,
    // Push when the container is at or above the breakpoint.
    `@container (min-width: ${px}px) {`,
    ...pushRules.map((line) => `  ${line}`),
    `}`,
  ].join("\n");
}

/**
 * Block PF6's `isManagedSidebar` main-click-close handler when the sidebar
 * is currently rendered in push mode (computed `position: static` or
 * `relative`). Solves the PF6 threshold mismatch inside a Storybook
 * DemoFrame: PF6 picks push vs overlay via CSS at `min-width: 75rem`
 * against the VIEWPORT, but its JS picks push vs overlay via
 * ResizeObserver against the PAGE element's width — they disagree
 * whenever the iframe is wide (≥xl) but the DemoFrame caps the Page at
 * a narrower width. In that mismatch the sidebar paints as push but
 * still closes on outside click. This hook puts a capture-phase
 * mousedown listener on the page main and `stopImmediatePropagation`s
 * before PF6's bubble-phase listener fires, but only when push mode is
 * active.
 *
 * Drop on any demo that uses `isManagedSidebar` AND a custom CSS that
 * forces push at narrow widths (eg `sidenavDrawerCss`).
 */
export function useBlockPushClickClose({
  pageContainerId,
  sidebarId,
  overlayBelow = "md",
}: {
  pageContainerId: string;
  sidebarId: string;
  /**
   * The container width below which the sidebar should be treated as
   * overlay (PF6's close-on-main-click runs). At or above the
   * breakpoint, the sidebar is treated as push (PF6's handler is
   * blocked — only the hamburger toggle controls open/close).
   *
   * Matches `sidenavDrawerCss`'s `overlayBelow` so the CSS-driven
   * visual mode and the hook-driven click-close policy stay in sync.
   * Defaults to `"md"` (768px) — same as `sidenavDrawerCss`.
   */
  overlayBelow?: SidenavOverlayBreakpoint;
}) {
  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target as Element | null;
      const ownerDoc = target?.ownerDocument;
      if (!ownerDoc) return;
      const sidebar = ownerDoc.getElementById(sidebarId);
      const container = ownerDoc.getElementById(pageContainerId);
      if (!sidebar || !container) return;
      // "always" overlay: never block — always let PF6 close.
      // "never" overlay: always block — push semantics regardless of width.
      // Numeric breakpoint: measure the container's own inline size and
      // compare. At ≥ breakpoint we're in push mode → block. Below →
      // overlay → let PF6 close run normally.
      if (overlayBelow === "always") return;
      if (overlayBelow === "never") {
        e.stopImmediatePropagation();
        return;
      }
      const threshold = PF6_BREAKPOINT_PX[overlayBelow];
      const containerWidth = container.getBoundingClientRect().width;
      const isPush = containerWidth >= threshold;
      if (isPush) {
        e.stopImmediatePropagation();
      }
    };
    const attach = () => {
      const container = document.getElementById(pageContainerId);
      const main = container?.querySelector(
        ".pf-v6-c-page__main",
      ) as HTMLElement | null;
      if (!main) return null;
      main.addEventListener("mousedown", handler, { capture: true });
      main.addEventListener("touchstart", handler, { capture: true });
      return main;
    };
    // PF6 attaches its listener in Page.componentDidMount; we wait one
    // tick so the page main exists, then bind in capture phase to win.
    let main = attach();
    const retry = main ? null : setTimeout(() => { main = attach(); }, 0);
    return () => {
      if (retry) clearTimeout(retry);
      main?.removeEventListener("mousedown", handler, { capture: true });
      main?.removeEventListener("touchstart", handler, { capture: true });
    };
  }, [pageContainerId, sidebarId]);
}

/**
 * Off-click close for the PF6 PageSidebar / PageToggleButton sidenav-drawer
 * pattern. Listens for mousedown on the document (and the Storybook iframe
 * document, since clicks inside the demo originate there).
 *
 * **Mode-aware**: only closes when the sidebar is in overlay mode (the
 * mobile pattern, where the sidebar floats on top of content via
 * `position: absolute`). When the sidebar is pinned beside the content in
 * push mode (`position: static`/`relative` — the desktop pattern),
 * off-click is a no-op — push-mode rails should only collapse from the
 * hamburger toggle, never from a stray click into the main area.
 *
 * The mode check runs at click time against the sidebar's computed
 * `position`, so the helper does the right thing regardless of viewport
 * breakpoint or whether the demo force-pushes via `sidenavDrawerCss`.
 */
export function useSidenavOffClick({
  open,
  close,
  containerId,
  sidebarId,
  toggleId,
}: {
  open: boolean;
  close: () => void;
  containerId: string;
  sidebarId: string;
  toggleId: string;
}) {
  useEffect(() => {
    if (!open) return undefined;
    const handler = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const ownerDoc = target.ownerDocument;
      const root = ownerDoc.getElementById(containerId);
      if (!root || !root.contains(target)) return;
      const sidebar = ownerDoc.getElementById(sidebarId);
      const toggle = ownerDoc.getElementById(toggleId);
      if (sidebar?.contains(target) || toggle?.contains(target)) return;
      // Overlay-only: skip if the sidebar is currently pinned (push mode).
      // PF6 picks push at viewport >= xl OR when sidenavDrawerCss forces it
      // via `position: static`; we detect by computed style at click time.
      const win = sidebar?.ownerDocument.defaultView ?? window;
      const position = sidebar ? win.getComputedStyle(sidebar).position : "";
      if (position !== "absolute" && position !== "fixed") return;
      close();
    };
    document.addEventListener("mousedown", handler, true);
    const iframe = document.querySelector(
      "iframe#storybook-preview-iframe",
    ) as HTMLIFrameElement | null;
    const iframeDoc = iframe?.contentDocument;
    iframeDoc?.addEventListener("mousedown", handler, true);
    return () => {
      document.removeEventListener("mousedown", handler, true);
      iframeDoc?.removeEventListener("mousedown", handler, true);
    };
  }, [open, close, containerId, sidebarId, toggleId]);
}

/**
 * Inline note used on every form/input page to remind the reader that the
 * focus-ring style is a system-wide setting rather than a per-component
 * choice. Tab into any input above to see the active ring; toggle the
 * "Focus ring" toolbar to compare.
 *
 * Cross-references the Foundations/Focus page for the full explanation —
 * keeps each component page focused on the component itself.
 */
export function FocusRingNote() {
  return (
    <div
      style={{
        margin: 0,
        padding: "12px 16px",
        background: "var(--gp-color-bg-secondary-default)",
        borderRadius: "var(--gp-radius-sm)",
        color: "var(--gp-color-text-regular)",
        fontSize: 14,
        lineHeight: 1.55,
      }}
    >
      <strong>Focus ring:</strong> system-wide setting via{" "}
      <code>&lt;ThemeProvider focusRing=&quot;outer&quot; | &quot;inner&quot;&gt;</code>.
      Tab into any input above and toggle the{" "}
      <strong>Focus ring</strong> toolbar item to compare. See{" "}
      <strong>Foundations → Focus</strong> for the full reference.
    </div>
  );
}

/**
 * Single shaded box used as a child inside layout demos so the reader can see
 * sizing and gap behavior. Numbered when the order matters.
 */
export function Box({
  label,
  style,
}: {
  label?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        background: "var(--gp-color-brand-default)",
        color: "var(--gp-color-brand-on)",
        padding: "12px 16px",
        borderRadius: "var(--gp-radius-sm)",
        fontFamily: "var(--gp-font-family)",
        fontSize: 14,
        textAlign: "center",
        ...style,
      }}
    >
      {label}
    </div>
  );
}

/**
 * Frame around a live demo so the reader can see where the layout's bounds are.
 * Adds a dashed border + subtle background so transparent layout components
 * (e.g. <Stack>) remain visible.
 */
export function DemoFrame({
  children,
  height,
}: {
  children: ReactNode;
  height?: number | string;
}) {
  return (
    <div
      // gp-doc-demoframe: under .pf-v6-theme-glass the recessed fill goes
      // translucent + lightly frosted (see the glass layer in
      // src/styles/index.css) so the gradient shows through and any live
      // demo inside reads as glass instead of sitting on an opaque recess.
      className="gp-doc-demoframe"
      style={{
        border: "1px dashed var(--gp-color-border-subtle)",
        borderRadius: "var(--gp-radius-sm)",
        padding: 16,
        background: "var(--gp-color-bg-secondary-default)",
        height,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Two-column reference table for component props.
 */
export function PropsTable({
  rows,
}: {
  rows: { name: string; type: string; description: ReactNode }[];
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(140px, max-content) minmax(180px, max-content) 1fr",
        rowGap: 8,
        columnGap: 24,
        fontFamily: "var(--gp-font-family)",
        fontSize: 14,
        color: "var(--gp-color-text-regular)",
      }}
    >
      <strong style={{ color: "var(--gp-color-text-subtle)" }}>Prop</strong>
      <strong style={{ color: "var(--gp-color-text-subtle)" }}>Type</strong>
      <strong style={{ color: "var(--gp-color-text-subtle)" }}>Description</strong>
      {rows.map((r) => (
        <div key={r.name} style={{ display: "contents" }}>
          <code style={{ wordBreak: "break-all" }}>{r.name}</code>
          <code style={{ color: "var(--gp-color-text-subtle)", wordBreak: "break-all" }}>
            {r.type}
          </code>
          <span>{r.description}</span>
        </div>
      ))}
    </div>
  );
}
