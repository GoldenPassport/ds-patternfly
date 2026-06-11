/**
 * Stack chart — cumulative composition over a categorical or time axis.
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
  ChartAxis,
  ChartBar,
  ChartStack,
} from "@patternfly/react-charts/victory";

const x = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const a = x.map((d, i) => ({ x: d, y: 3 + (i % 3) }));
const b = x.map((d, i) => ({ x: d, y: 2 + (i % 2) }));
const c = x.map((d, i) => ({ x: d, y: 4 + ((i + 1) % 3) }));

// #region StackedBar
export function StackedBar() {
  return (
    <Chart
      ariaTitle="Runs by service"
      ariaDesc="Stacked counts for API, Worker, Queue by day."
      themeColor="multi"
      height={260}
      domainPadding={{ x: [40, 40] }}
      padding={{ left: 60, right: 20, top: 20, bottom: 60 }}
      legendData={[{ name: "API" }, { name: "Worker" }, { name: "Queue" }]}
      legendPosition="bottom"
    >
      <ChartAxis />
      <ChartAxis dependentAxis showGrid />
      <ChartStack>
        <ChartBar data={a} />
        <ChartBar data={b} />
        <ChartBar data={c} />
      </ChartStack>
    </Chart>
  );
}
// #endregion

// #region StackedArea
export function StackedArea() {
  return (
    <Chart
      ariaTitle="Cumulative throughput"
      themeColor="multi"
      height={260}
      padding={{ left: 60, right: 20, top: 20, bottom: 50 }}
    >
      <ChartAxis />
      <ChartAxis dependentAxis showGrid />
      <ChartStack>
        <ChartArea data={a} interpolation="monotoneX" />
        <ChartArea data={b} interpolation="monotoneX" />
        <ChartArea data={c} interpolation="monotoneX" />
      </ChartStack>
    </Chart>
  );
}
// #endregion

export default function StackChartExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <StackedBar />
      <StackedArea />
    </div>
  );
}
