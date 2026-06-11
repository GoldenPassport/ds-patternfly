/**
 * Threshold chart — a line chart with warning / danger threshold overlays.
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
  ChartAxis,
  ChartGroup,
  ChartLine,
  ChartThreshold,
} from "@patternfly/react-charts/victory";

const series = [
  { x: "Mon", y: 80 },  { x: "Tue", y: 120 }, { x: "Wed", y: 210 },
  { x: "Thu", y: 180 }, { x: "Fri", y: 280 }, { x: "Sat", y: 240 }, { x: "Sun", y: 170 },
];
const warningLine = series.map((p) => ({ x: p.x, y: 200 }));
const dangerLine = series.map((p) => ({ x: p.x, y: 260 }));

// #region MetricWithThresholds
export function MetricWithThresholds() {
  return (
    <Chart
      ariaTitle="P99 latency vs thresholds"
      ariaDesc="P99 latency over the week with warning threshold at 200ms and danger threshold at 260ms."
      themeColor="multi"
      height={260}
      padding={{ left: 60, right: 20, top: 20, bottom: 60 }}
      legendData={[{ name: "p99 (ms)" }, { name: "Warning" }, { name: "Danger" }]}
      legendPosition="bottom"
    >
      <ChartAxis />
      <ChartAxis dependentAxis showGrid />
      <ChartGroup>
        <ChartLine data={series} name="p99 (ms)" interpolation="monotoneX" />
        <ChartThreshold
          data={warningLine}
          name="Warning"
          style={{ data: { stroke: "var(--pf-t--chart--color--gold--400, #f0ab00)" } }}
        />
        <ChartThreshold
          data={dangerLine}
          name="Danger"
          style={{ data: { stroke: "var(--pf-t--chart--color--red--400, #c9190b)" } }}
        />
      </ChartGroup>
    </Chart>
  );
}
// #endregion

export default function ThresholdChartExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <MetricWithThresholds />
    </div>
  );
}
