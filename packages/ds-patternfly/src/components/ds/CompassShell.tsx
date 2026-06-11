import { useId, type ReactNode } from "react";
import { Compass } from "../base/index.js";
import { SkipToContent } from "../../a11y/SkipToContent.js";
import { type CompassShellLabels, compassShellEnLabels } from "./labels.js";

export type { CompassShellLabels } from "./labels.js";
export { compassShellEnLabels } from "./labels.js";

/**
 * CompassShell — the full-viewport PatternFly Compass page frame: a header
 * band, an optional left nav rail (`sidebarStart`) and right rail
 * (`sidebarEnd`), the main content, and a docked footer (the
 * `CompassMessageBar` slot — e.g. an `AiAssistant` bar). Wraps PF6's Compass
 * with a SkipToContent link and a focusable main-content target wired up for
 * you, plus controlled mobile-nav drawer plumbing.
 *
 * Every region is a `ReactNode` slot you fill — compose the base
 * `CompassHeader` / `CompassNavMain` / `CompassMessageBar` (and a Masthead)
 * into them. For a simpler masthead + sidebar + content layout, use `Shell`.
 */
export interface CompassShellProps {
  /** Required. Provide via `compassShellEnLabels` or your translations. */
  labels?: CompassShellLabels;
  /** Top header band — typically a `CompassHeader` wrapping a `Masthead`. */
  header: ReactNode;
  /** Left navigation rail. */
  sidebarStart?: ReactNode;
  /** Right (secondary) rail — filters, context, help. */
  sidebarEnd?: ReactNode;
  /** Main content. Wrapped in the focusable SkipToContent target. */
  children: ReactNode;
  /** Docked footer — the `CompassMessageBar` slot (search / AI prompt bar). */
  footer?: ReactNode;
  /** Mobile-nav drawer panel; when set, Compass renders the slide-in drawer. */
  drawer?: ReactNode;
  /** Controlled open state for the mobile-nav drawer. */
  isDrawerOpen?: boolean;
  /** Fired when the drawer requests opening (the masthead hamburger). */
  onDrawerOpenChange?: (open: boolean) => void;
  /** Id for the main-content region (SkipToContent target). */
  mainContentId?: string;
}

export function CompassShell({
  labels = compassShellEnLabels,
  header,
  sidebarStart,
  sidebarEnd,
  children,
  footer,
  drawer,
  isDrawerOpen,
  onDrawerOpenChange,
  mainContentId,
}: CompassShellProps) {
  const generatedId = useId();
  const mainId = mainContentId ?? `${generatedId}-main`;

  return (
    <>
      <SkipToContent targetId={mainId} label={labels.skipToContent} />
      <Compass
        header={header}
        main={
          <div id={mainId} tabIndex={-1}>
            {children}
          </div>
        }
        {...(sidebarStart
          ? { sidebarStart, isSidebarStartExpanded: true }
          : {})}
        {...(sidebarEnd ? { sidebarEnd, isSidebarEndExpanded: true } : {})}
        {...(footer ? { footer } : {})}
        {...(drawer
          ? {
              drawerContent: drawer,
              drawerProps: {
                isExpanded: !!isDrawerOpen,
                position: "start",
                onExpand: () => onDrawerOpenChange?.(true),
              },
            }
          : {})}
      />
    </>
  );
}
