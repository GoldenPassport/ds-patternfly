/**
 * Bar chart — discrete categorical comparison, vertical or horizontal.
 * Requires @patternfly/react-charts (Victory-based).
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Chart, ChartAxis, ChartBar, ChartGroup } from "@patternfly/react-charts/victory";

const data1 = [{ x: "Active", y: 142 }, { x: "Paused", y: 18 }, { x: "Failed", y: 3 }];
const data2 = [{ x: "Active", y: 120 }, { x: "Paused", y: 22 }, { x: "Failed", y: 5 }];

// #region GroupedBars
export function GroupedBars() {
  return (
    <Chart
      ariaTitle="Workflow counts"
      ariaDesc="Active, paused, failed across this week and last."
      themeColor="multi"
      height={240}
      domainPadding={{ x: [40, 40] }}
      padding={{ left: 60, right: 20, top: 20, bottom: 50 }}
    >
      <ChartAxis />
      <ChartAxis dependentAxis showGrid />
      <ChartGroup offset={11}>
        <ChartBar data={data1} />
        <ChartBar data={data2} />
      </ChartGroup>
    </Chart>
  );
}
// #endregion

// #region Horizontal
export function Horizontal() {
  return (
    <Chart
      ariaTitle="Status (horizontal)"
      horizontal
      height={240}
      domainPadding={{ y: [40, 40] }}
      padding={{ left: 100, right: 20, top: 20, bottom: 50 }}
    >
      <ChartAxis />
      <ChartAxis dependentAxis showGrid />
      <ChartGroup>
        <ChartBar data={data1} />
      </ChartGroup>
    </Chart>
  );
}
// #endregion

export default function BarChartExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <GroupedBars />
      <Horizontal />
    </div>
  );
}
