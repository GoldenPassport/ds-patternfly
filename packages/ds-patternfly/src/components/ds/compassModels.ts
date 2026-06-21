import { useEffect, useState } from "react";

/** One top-level tab in a CompassTabsNav; may own a strip of subtabs. */
export interface CompassNavTab {
  /** Stable key — used for active state and React keys. */
  id: string;
  /** Visible label. */
  label: React.ReactNode;
  /** Disable this tab (and, on mobile, its nav row). */
  isDisabled?: boolean;
  /** Subtabs — a second Tabs strip (desktop) / nested NavExpandable (mobile). */
  subtabs?: CompassNavSubtab[];
}

/** A subtab within a CompassNavTab. */
export interface CompassNavSubtab {
  id: string;
  label: React.ReactNode;
  isDisabled?: boolean;
}

/** One icon action in a CompassRail. */
export interface CompassRailAction {
  id: string;
  /** Icon element (e.g. `<PlayIcon />`). */
  icon: React.ReactNode;
  /** Tooltip text + aria-label for the icon button. */
  label: string;
  onClick?: () => void;
  isDisabled?: boolean;
  /**
   * Cluster boundary — actions sharing a `groupId` render inside one
   * ActionListGroup (PF draws dividers between groups). Ungrouped actions each
   * stand alone.
   */
  groupId?: string;
}

/** One item in a CompassProfileMenu dropdown. */
export interface CompassProfileMenuItem {
  id: string;
  label: React.ReactNode;
  onClick?: () => void;
  isDisabled?: boolean;
}

/**
 * Tracks PF6's 62rem Compass breakpoint. SSR-safe — returns `isMobile: false`
 * until mounted, then reflects the live media query.
 */
export function useCompassResponsive(): { isMobile: boolean } {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 61.99rem)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return { isMobile };
}

/**
 * Build the `gp-rail-*` root classes for the `<Compass>` element from each
 * rail's open state — drives the mobile off-canvas slide for CompassRail.
 */
export function compassRailRootClasses(opts: {
  startOpen?: boolean;
  endOpen?: boolean;
}): string {
  return [
    opts.startOpen ? "gp-rail-left-open" : "gp-rail-left-closed",
    opts.endOpen ? "gp-rail-right-open" : "gp-rail-right-closed",
  ].join(" ");
}
