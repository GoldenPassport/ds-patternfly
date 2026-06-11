/**
 * Box plot chart — five-number distribution summaries per category.
 * Requires @patternfly/react-charts and victory (PF6 ships no dedicated
 * ChartBoxPlot wrapper, so Victory's VictoryBoxPlot is composed directly
 * inside a PF6-themed Chart).
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Chart, ChartAxis } from "@patternfly/react-charts/victory";
import { VictoryBoxPlot } from "victory";

const data = [
  { x: "p50", min: 1, q1: 2, median: 3, q3: 4, max: 5 },
  { x: "p95", min: 2, q1: 3, median: 5, q3: 7, max: 9 },
  { x: "p99", min: 3, q1: 5, median: 8, q3: 12, max: 18 },
];

// #region Recipe
export function Recipe() {
  return (
    <Chart
      ariaTitle="API latency"
      ariaDesc="p50/p95/p99 latency distributions across last hour."
      height={240}
      domainPadding={{ x: [40, 40] }}
      padding={{ left: 60, right: 20, top: 20, bottom: 50 }}
    >
      <ChartAxis />
      <ChartAxis dependentAxis showGrid />
      <VictoryBoxPlot
        boxWidth={20}
        data={data}
        style={{
          min: { stroke: "var(--pf-t--global--icon--color--regular)" },
          max: { stroke: "var(--pf-t--global--icon--color--regular)" },
          q1: { fill: "var(--pf-t--chart--color--blue--400)" },
          q3: { fill: "var(--pf-t--chart--color--blue--400)" },
          median: { stroke: "var(--pf-t--global--text--color--regular)" },
        }}
      />
    </Chart>
  );
}
// #endregion

export default function BoxPlotChartExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Recipe />
    </div>
  );
}
