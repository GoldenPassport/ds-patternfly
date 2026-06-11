/**
 * Resize observer — a fluid chart that fills its container's width.
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
  ChartGroup,
} from "@patternfly/react-charts/victory";

const data = [
  { x: 1, y: 1 }, { x: 2, y: 3 }, { x: 3, y: 2 }, { x: 4, y: 5 }, { x: 5, y: 4 },
];

// #region ContainerDrivenWidth
export function ContainerDrivenWidth() {
  return (
    <div style={{ width: "100%", height: 240 }}>
      <Chart
        ariaTitle="Resizable area"
        ariaDesc="A chart that fills the width of its container."
        height={240}
        padding={{ left: 60, right: 20, top: 20, bottom: 50 }}
        // Omit `width` — Victory's default container reads from layout.
      >
        <ChartAxis />
        <ChartAxis dependentAxis showGrid />
        <ChartGroup>
          <ChartArea data={data} interpolation="monotoneX" />
        </ChartGroup>
      </Chart>
    </div>
  );
}
// #endregion

export default function ResizeObserverExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <ContainerDrivenWidth />
    </div>
  );
}
