/**
 * Scatter chart — points on an X/Y plane for distributions and outliers.
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
  ChartScatter,
  ChartVoronoiContainer,
} from "@patternfly/react-charts/victory";

const data = Array.from({ length: 24 }).map((_, i) => ({
  x: 1 + (i % 8) + Math.random() * 0.6,
  y: 1 + Math.floor(i / 8) * 2 + Math.random() * 2,
  size: 3 + (i % 4),
}));

// #region BasicWithSizeDimension
export function BasicWithSizeDimension() {
  return (
    <Chart
      ariaTitle="Latency vs payload size"
      ariaDesc="Each point is a request; size encodes retry count."
      height={260}
      padding={{ left: 60, right: 20, top: 20, bottom: 60 }}
      containerComponent={
        <ChartVoronoiContainer
          labels={({ datum }: { datum: { x: number; y: number; size: number } }) =>
            `payload ${datum.x.toFixed(1)} KB, latency ${datum.y.toFixed(1)} ms, retries ${datum.size - 3}`
          }
          constrainToVisibleArea
        />
      }
    >
      <ChartAxis label="Payload (KB)" />
      <ChartAxis dependentAxis label="Latency (ms)" showGrid />
      <ChartScatter data={data} />
    </Chart>
  );
}
// #endregion

export default function ScatterChartExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <BasicWithSizeDimension />
    </div>
  );
}
