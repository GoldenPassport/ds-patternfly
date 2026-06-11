/**
 * Sparkline chart — a miniature, axis-less area chart inside a KPI tile.
 *
 * Requires @patternfly/react-charts (Victory wrapper).
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import {
  Chart,
  ChartArea,
  ChartGroup,
  ChartVoronoiContainer,
} from "@patternfly/react-charts/victory";

const data = Array.from({ length: 24 }).map((_, i) => ({
  x: i,
  y: 30 + Math.sin(i / 3) * 12 + (i % 5) * 2,
}));

const Sparkline = ({ data: d, label, value, change }: { data: { x: number; y: number }[]; label: string; value: string; change: string }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 120px",
      alignItems: "center",
      gap: 16,
      padding: 12,
      border: "1px solid var(--gp-color-border-subtle)",
      borderRadius: 8,
    }}
  >
    <div>
      <div style={{ color: "var(--gp-color-text-subtle)", fontSize: 13 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 600, color: "var(--gp-color-text-regular)" }}>{value}</div>
      <div style={{ fontSize: 12, color: "var(--gp-color-text-subtle)" }}>{change}</div>
    </div>
    <Chart
      ariaTitle={label}
      ariaDesc={`${label} sparkline.`}
      height={50}
      width={120}
      padding={2}
      domainPadding={{ y: [2, 2] }}
      containerComponent={
        <ChartVoronoiContainer
          labels={({ datum }: { datum: { x: number; y: number } }) => `${datum.y.toFixed(0)}`}
          constrainToVisibleArea
        />
      }
    >
      <ChartGroup>
        <ChartArea data={d} interpolation="monotoneX" />
      </ChartGroup>
    </Chart>
  </div>
);

// #region KpiTileWithSparkline
export function KpiTileWithSparkline() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 480 }}>
      <Sparkline
        data={data}
        label="API requests"
        value="2.4k"
        change="+12% vs last hour"
      />
      <Sparkline
        data={data.map((p) => ({ ...p, y: 30 - p.y / 2 }))}
        label="Error rate"
        value="0.4%"
        change="-0.2% vs last hour"
      />
    </div>
  );
}
// #endregion

export default function SparklineChartExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <KpiTileWithSparkline />
    </div>
  );
}
