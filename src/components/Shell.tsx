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
import { useEffect, useRef, useState, type ReactNode } from "react";
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
   * When true (default), clicking anywhere outside the sidebar / hamburger
   * toggle closes the sidebar — the standard sidenav-drawer behaviour. Set
   * `false` for shells that want the sidebar to stay open until the user
   * presses the hamburger explicitly.
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

/**
 * Top-level application shell: SkipToContent + Masthead + (optional) Sidebar + main.
 *
 * Owns the sidebar open state locally rather than delegating to Page's
 * `isManagedSidebar` — the managed mode aria-hides the sidebar at narrow
 * widths (PF6's responsive default), which renders the Nav landmark
 * inaccessible to keyboard / screen-reader users on those breakpoints
 * unless the user opens it manually. Local state keeps the nav landmark
 * reachable to assistive tech at every breakpoint.
 *
 * All user-facing strings come from `labels` — no hardcoded English here.
 */
export function Shell({
  labels,
  brandLogo,
  sidebar,
  mastheadActions,
  mastheadDisplay = DEFAULT_MASTHEAD_DISPLAY,
  closeSidebarOnOutsideClick = true,
  children,
}: ShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Off-click close — when the sidebar is open and the user clicks anywhere
  // outside the sidebar AND outside the hamburger toggle, collapse it. This
  // matches the canonical sidenav-drawer pattern (see Components/Drawer →
  // "Sidenav drawer (hamburger toggle)" in the docs).
  useEffect(() => {
    if (!closeSidebarOnOutsideClick || !sidebar || !sidebarOpen) return undefined;
    const handler = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const root = rootRef.current;
      if (!root || !root.contains(target)) return;
      const sidebarEl = root.ownerDocument.getElementById(SIDEBAR_ID);
      const toggleEl = root.ownerDocument.getElementById(TOGGLE_ID);
      if (sidebarEl?.contains(target) || toggleEl?.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("mousedown", handler, true);
    return () => document.removeEventListener("mousedown", handler, true);
  }, [closeSidebarOnOutsideClick, sidebar, sidebarOpen]);

  // Structure per PF6 docs:
  //   <Masthead>
  //     <MastheadMain>
  //       <MastheadToggle>…</MastheadToggle>   ← TOGGLE LIVES HERE, not a sibling
  //       <MastheadBrand>
  //         <MastheadLogo>{brand}</MastheadLogo>
  //       </MastheadBrand>
  //     </MastheadMain>
  //     <MastheadContent>{actions}</MastheadContent>
  //   </Masthead>
  //
  // display={{ default: "stack", lg: "inline" }}:
  //   - stack  — brand spans row 1, toggle + content land on row 2 (mobile + tablet)
  //   - inline — everything on one row (lg / desktop, where the sidebar is a
  //              permanent rail and the masthead has horizontal room).
  //
  // PageToggleButton with `isHamburgerButton` renders PF6's built-in hamburger
  // glyph — no manual BarsIcon child needed.
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
              isSidebarOpen={sidebarOpen}
              onSidebarToggle={() => setSidebarOpen((v) => !v)}
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

  const sidebarEl = sidebar ? (
    <PageSidebar
      isSidebarOpen={sidebarOpen}
      aria-label={labels.sidebarAriaLabel}
      id={SIDEBAR_ID}
    >
      <PageSidebarBody>{sidebar}</PageSidebarBody>
    </PageSidebar>
  ) : undefined;

  return (
    <div id={SHELL_ROOT_ID} ref={rootRef}>
      {/* Sidenav-drawer animation — same easing / duration as the
       *  Components/Drawer "Sidenav drawer (hamburger toggle)" demo so the
       *  shell, its stories, and the Drawer docs all behave identically.
       *  `overflow: hidden` held across BOTH states stops sidebar content
       *  from snapping into view on the open transition. */}
      <style
        dangerouslySetInnerHTML={{
          __html: [
            `#${SHELL_ROOT_ID} .pf-v6-c-page__sidebar {`,
            `  overflow: hidden;`,
            `  transition: width 220ms cubic-bezier(0.4, 0, 0.2, 1);`,
            `}`,
          ].join("\n"),
        }}
      />
      <SkipToContent targetId={MAIN_ID} label={labels.skipToContent} />
      <Page masthead={masthead} sidebar={sidebarEl}>
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
