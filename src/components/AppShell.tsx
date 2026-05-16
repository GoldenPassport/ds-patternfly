import {
  Page,
  Masthead,
  MastheadMain,
  MastheadBrand,
  MastheadLogo,
  MastheadToggle,
  PageSidebar,
  PageSidebarBody,
  PageToggleButton,
} from "@patternfly/react-core";
import { BarsIcon } from "@patternfly/react-icons";
import { useState, type ReactNode } from "react";
import { SkipToContent } from "../a11y/SkipToContent.js";
import type { AppShellLabels } from "./labels.js";

export interface AppShellProps {
  /** Required. Provide via `appShellEnLabels` or your own translated object. */
  labels: AppShellLabels;
  /** Brand mark / logo node rendered in the masthead. */
  brandLogo?: ReactNode;
  /** Sidebar navigation content (typically a PatternFly `<Nav>`). */
  sidebar?: ReactNode;
  /** Optional masthead toolbar content (search, user menu, etc.). */
  mastheadActions?: ReactNode;
  /** Page body. Wrapped in the `<main>` landmark targeted by SkipToContent. */
  children: ReactNode;
}

const MAIN_ID = "gp-main-content";

/**
 * Top-level application shell: SkipToContent + Masthead + (optional) Sidebar + main.
 * All user-facing strings come from `labels` — no hardcoded English here.
 */
export function AppShell({
  labels,
  brandLogo,
  sidebar,
  mastheadActions,
  children,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const masthead = (
    <Masthead aria-label={labels.mastheadAriaLabel}>
      {sidebar ? (
        <MastheadToggle>
          <PageToggleButton
            variant="plain"
            aria-label={labels.toggleSidebar}
            isSidebarOpen={sidebarOpen}
            onSidebarToggle={() => setSidebarOpen((v) => !v)}
            id="gp-sidebar-toggle"
          >
            <BarsIcon />
          </PageToggleButton>
        </MastheadToggle>
      ) : null}
      <MastheadMain>
        <MastheadBrand>
          {brandLogo ? <MastheadLogo>{brandLogo}</MastheadLogo> : null}
        </MastheadBrand>
      </MastheadMain>
      {mastheadActions}
    </Masthead>
  );

  const sidebarEl = sidebar ? (
    <PageSidebar isSidebarOpen={sidebarOpen} aria-label={labels.sidebarAriaLabel}>
      <PageSidebarBody>{sidebar}</PageSidebarBody>
    </PageSidebar>
  ) : undefined;

  return (
    <>
      <SkipToContent targetId={MAIN_ID} label={labels.skipToContent} />
      <Page masthead={masthead} sidebar={sidebarEl}>
        {/* PF6 <Page> already renders the <main> landmark. Wrap children in
         *  a focusable div so SkipToContent has a target without creating a
         *  duplicate main landmark. */}
        <div id={MAIN_ID} className="gp-main" tabIndex={-1}>
          {children}
        </div>
      </Page>
    </>
  );
}
