/**
 * Area chart — filled line emphasising cumulative volume over time.
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
  ChartVoronoiContainer,
} from "@patternfly/react-charts/victory";

const single = [
  { x: "Mon", y: 1 }, { x: "Tue", y: 3 }, { x: "Wed", y: 2 },
  { x: "Thu", y: 4 }, { x: "Fri", y: 7 }, { x: "Sat", y: 5 }, { x: "Sun", y: 6 },
];
const series2 = single.map((p) => ({ ...p, y: p.y + 2 }));

// #region SingleSeries
export function SingleSeries() {
  return (
    <Chart
      ariaTitle="Run volume"
      ariaDesc="Runs per day, Monday through Sunday."
      height={240}
      padding={{ left: 60, right: 20, top: 20, bottom: 50 }}
      containerComponent={
        <ChartVoronoiContainer
          labels={({ datum }: { datum: { x: string; y: number } }) =>
            `${datum.x}: ${datum.y}`
          }
          constrainToVisibleArea
        />
      }
    >
      <ChartAxis />
      <ChartAxis dependentAxis showGrid />
      <ChartGroup>
        <ChartArea data={single} interpolation="monotoneX" />
      </ChartGroup>
    </Chart>
  );
}
// #endregion

// #region MultipleSeries
export function MultipleSeries() {
  return (
    <Chart
      ariaTitle="Run volume by env"
      ariaDesc="Run counts for production and staging."
      themeColor="multi"
      height={240}
      padding={{ left: 60, right: 20, top: 20, bottom: 50 }}
    >
      <ChartAxis />
      <ChartAxis dependentAxis showGrid />
      <ChartGroup>
        <ChartArea data={single} interpolation="monotoneX" />
        <ChartArea data={series2} interpolation="monotoneX" />
      </ChartGroup>
    </Chart>
  );
}
// #endregion

export default function AreaChartExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <SingleSeries />
      <MultipleSeries />
    </div>
  );
}
