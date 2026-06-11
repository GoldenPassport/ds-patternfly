/**
 * Legends — colour-to-series keys, auto-placed or standalone.
 * Requires @patternfly/react-charts (Victory-based).
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import {
  Chart,
  ChartArea,
  ChartAxis,
  ChartGroup,
  ChartLegend,
} from "@patternfly/react-charts/victory";

const a = [{ x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 3 }, { x: 4, y: 5 }];
const b = a.map((p) => ({ ...p, y: p.y + 1 }));
const c = a.map((p) => ({ ...p, y: p.y + 2 }));

const legendData = [{ name: "API" }, { name: "Worker" }, { name: "Queue" }];

// #region LegendAtTheBottom
export function LegendAtTheBottom() {
  return (
    <Chart
      ariaTitle="Throughput by service"
      ariaDesc="API, Worker, and Queue throughput."
      themeColor="multi"
      height={280}
      padding={{ left: 60, right: 20, top: 20, bottom: 80 }}
      legendData={legendData}
      legendPosition="bottom"
    >
      <ChartAxis />
      <ChartAxis dependentAxis showGrid />
      <ChartGroup>
        <ChartArea data={a} />
        <ChartArea data={b} />
        <ChartArea data={c} />
      </ChartGroup>
    </Chart>
  );
}
// #endregion

// #region StandaloneChartLegend
export function StandaloneChartLegend() {
  return (
    <ChartLegend
      data={legendData}
      orientation="horizontal"
      height={60}
      width={300}
    />
  );
}
// #endregion

export default function LegendsExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <LegendAtTheBottom />
      <StandaloneChartLegend />
    </div>
  );
}
