import {
  Page,
  Masthead,
  MastheadMain,
  MastheadBrand,
  MastheadLogo,
  MastheadToggle,
  MastheadContent,
  PageSidebar,
  PageSidebarBody,
  PageToggleButton,
} from "@patternfly/react-core";
import { useEffect, useRef, type ReactNode } from "react";
import { SkipToContent } from "../a11y/SkipToContent.js";
import type { ShellLabels } from "./labels.js";

/**
 * Per-breakpoint Masthead display setting — matches PF6's
 * `Masthead#display` prop. `"stack"` puts the brand on row 1 and the
 * toggle + actions on row 2; `"inline"` puts everything on a single row.
 */
export type MastheadDisplay = {
  default?: "inline" | "stack";
  sm?: "inline" | "stack";
  md?: "inline" | "stack";
  lg?: "inline" | "stack";
  xl?: "inline" | "stack";
  "2xl"?: "inline" | "stack";
};

export interface ShellProps {
  /** Required. Provide via `shellEnLabels` or your own translated object. */
  labels: ShellLabels;
  /** Brand mark / logo node rendered in the masthead. */
  brandLogo?: ReactNode;
  /** Sidebar navigation content (typically a PatternFly `<Nav>`). */
  sidebar?: ReactNode;
  /** Optional masthead toolbar content (search, user menu, etc.). */
  mastheadActions?: ReactNode;
  /**
   * Per-breakpoint Masthead layout. Default is `{ default: "inline" }` —
   * everything on one row at every breakpoint. Pass
   * `{ default: "stack", lg: "inline" }` to switch to PF6's two-row mobile
   * layout (brand on row 1, toggle + actions on row 2).
   */
  mastheadDisplay?: MastheadDisplay;
  /**
   * @deprecated No longer needed — the Shell now uses PF6's native
   * `isManagedSidebar` which closes the sidebar on outside click only
   * when it's in overlay mode (mobile / narrow viewport). In push mode
   * (desktop, sidebar pinned beside content) outside clicks are
   * ignored. The prop is accepted for backward compatibility and has
   * no effect.
   */
  closeSidebarOnOutsideClick?: boolean;
  /** Page body. Wrapped in the `<main>` landmark targeted by SkipToContent. */
  children: ReactNode;
}

const DEFAULT_MASTHEAD_DISPLAY: MastheadDisplay = {
  default: "inline",
};

const MAIN_ID = "gp-main-content";
const SHELL_ROOT_ID = "gp-app-shell-root";
const SIDEBAR_ID = "gp-sidebar";
const TOGGLE_ID = "gp-sidebar-toggle";

// Threshold below which the sidebar is treated as overlay (mobile)
// and PF6's main-click-close should fire normally; at or above this
// width the sidebar is pinned in push mode and outside clicks are
// ignored. Matches the `md` PF6 breakpoint (48rem = 768px).
const PUSH_BREAKPOINT_PX = 768;

/**
 * Top-level application shell: SkipToContent + Masthead + (optional) Sidebar + main.
 *
 * Sidebar state is owned by PF6's native `isManagedSidebar` — Page picks
 * push vs overlay automatically from viewport width and wires
 * main-click-to-close on overlay (mobile). A capture-phase mousedown
 * listener blocks PF6's main-click handler when the Shell is wide
 * enough to render the sidebar in push mode, so a pinned desktop rail
 * only collapses via the hamburger toggle.
 *
 * All user-facing strings come from `labels` — no hardcoded English here.
 */
export function Shell({
  labels,
  brandLogo,
  sidebar,
  mastheadActions,
  mastheadDisplay = DEFAULT_MASTHEAD_DISPLAY,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  closeSidebarOnOutsideClick,
  children,
}: ShellProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Block PF6's isManagedSidebar main-click-close when the sidebar is
  // visually pinned in push mode (Shell width ≥ md). PF6 attaches a
  // bubble-phase mousedown listener on the page main; ours runs in
  // capture phase and stopImmediatePropagation's before PF6's handler
  // gets the event. In overlay mode (Shell < md) we let PF6 close on
  // outside click — the canonical mobile drawer dismiss gesture.
  useEffect(() => {
    if (!sidebar) return undefined;
    const handler = (e: Event) => {
      const root = rootRef.current;
      if (!root) return;
      const pageMain = root.querySelector(".pf-v6-c-page__main");
      if (!pageMain || !pageMain.contains(e.target as Node)) return;
      const isPush = root.getBoundingClientRect().width >= PUSH_BREAKPOINT_PX;
      if (isPush) e.stopImmediatePropagation();
    };
    document.addEventListener("mousedown", handler, true);
    document.addEventListener("touchstart", handler, true);
    return () => {
      document.removeEventListener("mousedown", handler, true);
      document.removeEventListener("touchstart", handler, true);
    };
  }, [sidebar]);

  // PageToggleButton + PageSidebar read state from PageContext (Page
  // owns it via isManagedSidebar) — no isSidebarOpen / onSidebarToggle
  // props needed here.
  const masthead = (
    <Masthead
      aria-label={labels.mastheadAriaLabel}
      display={mastheadDisplay}
    >
      <MastheadMain>
        {sidebar ? (
          <MastheadToggle>
            <PageToggleButton
              isHamburgerButton
              aria-label={labels.toggleSidebar}
              id={TOGGLE_ID}
            />
          </MastheadToggle>
        ) : null}
        <MastheadBrand>
          {brandLogo ? <MastheadLogo>{brandLogo}</MastheadLogo> : null}
        </MastheadBrand>
      </MastheadMain>
      {mastheadActions ? <MastheadContent>{mastheadActions}</MastheadContent> : null}
    </Masthead>
  );

  // No aria-label on PageSidebar: it renders a roleless <div>, and ARIA
  // prohibits labels on generic elements (axe aria-prohibited-attr). The
  // consumer's <Nav aria-label="…"> inside the slot is the named landmark.
  const sidebarEl = sidebar ? (
    <PageSidebar id={SIDEBAR_ID}>
      <PageSidebarBody>{sidebar}</PageSidebarBody>
    </PageSidebar>
  ) : undefined;

  return (
    <div id={SHELL_ROOT_ID} ref={rootRef}>
      {/* Scoped CSS:
       *  - Sidenav-drawer animation — same easing / duration as the
       *    Page story demos. `overflow: hidden` held across both states
       *    stops sidebar content from snapping into view on open.
       *  - Mobile masthead fit — PF6 reserves a fixed 11.8125rem
       *    (~189px) for `.pf-v6-c-masthead__logo` via its own custom
       *    property, which pushes the action toolbar off-screen on
       *    phones. Below md (768px) we let the logo hug its real
       *    width so notifications / settings / help / user menu fit. */}
      {/* Plus: overlay-drawer cast shadow — below PF6's push breakpoint
       *  (75rem) the sidebar floats over the content, so it casts a shadow
       *  off the edge that faces the main content: right in LTR, left in
       *  RTL. (PF6 v6 only ships a `--right` token and flips the transform
       *  for RTL, so without this the glass overlay drawer has no edge
       *  shadow in LTR and a wrong-side one in RTL.) Above 75rem the sidebar
       *  is a pushed glass box with its own shadow, so no cast shadow. */}
      {/* Plus: mobile content-card corners — PF6 squares the glass content
       *  card at narrow widths; keep it rounded (and keep its top inset
       *  below the masthead) so it reads as a floating card on phones too. */}
      <style
        dangerouslySetInnerHTML={{
          __html: [
            `#${SHELL_ROOT_ID} .pf-v6-c-page__sidebar {`,
            `  overflow: hidden;`,
            `  transition: width 220ms cubic-bezier(0.4, 0, 0.2, 1);`,
            `}`,
            // Full-height main: PF6 sets the content card to align-self:start
            // so it hugs its content. Stretch it to fill the content row
            // instead — it already has overflow:auto, so long content scrolls
            // inside the card. The inner main wrapper becomes a flex column so
            // a trailing footer section can be pinned to the card bottom (it
            // stays there when content is short; scrolls with content when not).
            // (The glass side-nav box, the content card's float margins, and
            // the open-nav start-margin coordination are all handled by the
            // global push-glass rules in src/styles/index.css.)
            `#${SHELL_ROOT_ID} .pf-v6-c-page__main-container {`,
            `  align-self: stretch;`,
            `}`,
            `#${SHELL_ROOT_ID} .gp-main {`,
            `  display: flex;`,
            `  flex-direction: column;`,
            `}`,
            // Keep each section at its natural height (don't let the flex
            // column shrink them) so long content overflows the card and
            // scrolls, rather than being squeezed to fit.
            `#${SHELL_ROOT_ID} .gp-main > * {`,
            `  flex-shrink: 0;`,
            `}`,
            // Pin a trailing footer section to the card bottom.
            `#${SHELL_ROOT_ID} .gp-main > footer {`,
            `  margin-block-start: auto;`,
            `}`,
            // Below the push breakpoint the nav is an overlay drawer: cast a
            // shadow off the edge facing the content (right LTR / left RTL),
            // and float the glass content card with even margins + rounded
            // corners (the global float rules only kick in at push/≥75rem).
            `@media (max-width: 74.99rem) {`,
            `  #${SHELL_ROOT_ID} .pf-v6-c-page__sidebar.pf-m-expanded {`,
            `    box-shadow: 10px 0 9px -8px rgba(41, 41, 41, 0.15);`,
            `  }`,
            `  :dir(rtl) #${SHELL_ROOT_ID} .pf-v6-c-page__sidebar.pf-m-expanded {`,
            `    box-shadow: -10px 0 9px -8px rgba(41, 41, 41, 0.15);`,
            `  }`,
            `  .pf-v6-theme-glass #${SHELL_ROOT_ID} .pf-v6-c-page__main-container {`,
            `    margin: var(--pf-t--global--spacer--lg, 1.5rem);`,
            `    border-radius: var(--pf-t--global--border--radius--glass--default, 16px);`,
            `  }`,
            `}`,
            `@media (max-width: 47.98rem) {`,
            `  #${SHELL_ROOT_ID} .pf-v6-c-masthead {`,
            `    --pf-v6-c-masthead__logo--Width: auto;`,
            `  }`,
            `}`,
          ].join("\n"),
        }}
      />
      <SkipToContent targetId={MAIN_ID} label={labels.skipToContent} />
      <Page
        masthead={masthead}
        sidebar={sidebarEl}
        isManagedSidebar
        defaultManagedSidebarIsOpen
      >
        {/* PF6 <Page> already renders the <main> landmark. Wrap children in
         *  a focusable div so SkipToContent has a target without creating a
         *  duplicate main landmark. */}
        <div id={MAIN_ID} className="gp-main" tabIndex={-1}>
          {children}
        </div>
      </Page>
    </div>
  );
}
