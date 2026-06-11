import type { ReactNode } from "react";
import { Content } from "@patternfly/react-core";

/**
 * DashboardShell — the page scaffold for an ops dashboard: a titled header
 * band (title + optional description + right-aligned actions/toolbar) over a
 * padded content region you fill with a KPI strip, charts, and status cards
 * (a `Gallery` + `Grid` of `Card`s).
 *
 * Layout + rhythm only — the dashboard body is your `children`, so chart
 * libraries (`@patternfly/react-charts`, ECharts, …) stay in your app and
 * never leak into the design system. No `labels` prop: title/description are
 * caller-provided content.
 */
export interface DashboardShellProps {
  /** Dashboard title. Rendered as an `<h1>`. */
  title: ReactNode;
  /** Supporting line under the title. */
  description?: ReactNode;
  /** Right-aligned header slot — a date-range picker, refresh button, etc. */
  actions?: ReactNode;
  /** The dashboard body (KPI gallery, chart grid, status cards). */
  children: ReactNode;
}

export function DashboardShell({
  title,
  description,
  actions,
  children,
}: DashboardShellProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--gp-pad-section, 1.5rem)" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <Content component="h1" style={{ margin: 0 }}>
            {title}
          </Content>
          {description ? (
            <Content
              component="p"
              style={{ margin: "0.25rem 0 0", color: "var(--gp-color-text-subtle)" }}
            >
              {description}
            </Content>
          ) : null}
        </div>
        {actions ? <div>{actions}</div> : null}
      </div>
      <div>{children}</div>
    </div>
  );
}
