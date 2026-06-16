import type { ReactNode } from "react";
import {
  Card,
  CardBody,
  Content,
  Gallery,
  GalleryItem,
} from "@patternfly/react-core";
import ArrowUpIcon from "@patternfly/react-icons/dist/esm/icons/arrow-up-icon";
import ArrowDownIcon from "@patternfly/react-icons/dist/esm/icons/arrow-down-icon";

/**
 * DashboardShell — the page scaffold for an ops dashboard: a titled header
 * band (title + optional description + right-aligned actions/toolbar), an
 * optional built-in KPI strip, then a padded content region you fill with
 * charts and status cards.
 *
 * Layout + rhythm + the KPI tiles are owned here; the dashboard body is your
 * `children`, so chart libraries (`@patternfly/react-charts`, ECharts, …) stay
 * in your app and never leak into the design system. No `labels` prop:
 * title/description are caller-provided content.
 */
export interface DashboardKpi {
  /** Sub-label above the value, e.g. "Active workflows". */
  label: ReactNode;
  /** The headline metric, e.g. "142" or "42s". */
  value: ReactNode;
  /** Optional change indicator, e.g. "+12 (8%)". */
  delta?: ReactNode;
  /**
   * Direction the delta represents. `up` is coloured success, `down` danger,
   * `flat` (or omitted) stays neutral. Set this from whether the change is
   * good, not from its sign — a falling error count is still `up`.
   */
  trend?: "up" | "down" | "flat";
}

export interface DashboardShellProps {
  /** Dashboard title. Rendered as an `<h1>`. */
  title: ReactNode;
  /** Supporting line under the title. */
  description?: ReactNode;
  /** Right-aligned header slot — a date-range picker, refresh button, etc. */
  actions?: ReactNode;
  /**
   * Optional KPI strip rendered above the body. DashboardShell owns the tile
   * chrome (big number, subtle label, trend arrow + colour); you pass data.
   */
  kpis?: DashboardKpi[];
  /** Minimum KPI tile width passed to the responsive Gallery. */
  kpiMinWidth?: string;
  /** The dashboard body (chart grid, status cards). */
  children?: ReactNode;
}

const TREND_COLOR = {
  up: "var(--pf-t--global--icon--color--status--success--default, #3e8635)",
  down: "var(--pf-t--global--icon--color--status--danger--default, #c9190b)",
  flat: "var(--gp-color-text-subtle)",
} as const;

function KpiTile({ label, value, delta, trend = "flat" }: DashboardKpi) {
  return (
    <Card isCompact>
      <CardBody>
        <div style={{ color: "var(--gp-color-text-subtle)", fontSize: 13 }}>
          {label}
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "var(--gp-color-text-regular)",
          }}
        >
          {value}
        </div>
        {delta != null ? (
          <div
            style={{
              marginTop: 4,
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              color: TREND_COLOR[trend],
              fontSize: 13,
            }}
          >
            {trend === "up" ? (
              <ArrowUpIcon />
            ) : trend === "down" ? (
              <ArrowDownIcon />
            ) : null}
            {delta}
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
}

export function DashboardShell({
  title,
  description,
  actions,
  kpis,
  kpiMinWidth = "180px",
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
      {kpis && kpis.length > 0 ? (
        <Gallery hasGutter minWidths={{ default: kpiMinWidth }}>
          {kpis.map((kpi, i) => (
            <GalleryItem key={i}>
              <KpiTile {...kpi} />
            </GalleryItem>
          ))}
        </Gallery>
      ) : null}
      {children ? <div>{children}</div> : null}
    </div>
  );
}
