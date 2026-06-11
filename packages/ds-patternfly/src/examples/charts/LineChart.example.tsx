/**
 * Line chart — the classic trend visualization, values over time.
 * Requires @patternfly/react-charts (Victory-based).
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
  ChartVoronoiContainer,
} from "@patternfly/react-charts/victory";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const series = (n: number) =>
  days.map((x, i) => ({ x, y: n + (i % 4) * 1.5 + (i % 2 === 0 ? 1 : 0) }));

// #region TwoSeriesWithTooltip
export function TwoSeriesWithTooltip() {
  return (
    <Chart
      ariaTitle="Latency by env"
      ariaDesc="Prod vs staging latency over the past week."
      themeColor="multi"
      height={260}
      padding={{ left: 60, right: 20, top: 20, bottom: 60 }}
      legendData={[{ name: "Prod" }, { name: "Staging" }]}
      legendPosition="bottom"
      containerComponent={
        <ChartVoronoiContainer
          labels={({ datum }: { datum: { x: string; y: number; childName?: string } }) =>
            `${datum.childName ?? "series"} ${datum.x}: ${datum.y.toFixed(1)}`
          }
          constrainToVisibleArea
        />
      }
    >
      <ChartAxis />
      <ChartAxis dependentAxis showGrid />
      <ChartGroup>
        <ChartLine data={series(2)} name="Prod" interpolation="monotoneX" />
        <ChartLine data={series(4)} name="Staging" interpolation="monotoneX" />
      </ChartGroup>
    </Chart>
  );
}
// #endregion

export default function LineChartExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <TwoSeriesWithTooltip />
    </div>
  );
}
