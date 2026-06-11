/**
 * Chart tooltips — voronoi hover-anywhere and cursor + legend tooltips.
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
  ChartLegendTooltip,
  createContainer,
  ChartVoronoiContainer,
} from "@patternfly/react-charts/victory";

const x = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const a = x.map((d, i) => ({ x: d, y: 2 + i }));
const b = x.map((d, i) => ({ x: d, y: 5 - (i % 3) }));

// Cursor + voronoi combination for hover-anywhere + crosshair.
const CursorVoronoiContainer = createContainer("voronoi", "cursor");

// #region VoronoiTooltip
export function VoronoiTooltip() {
  return (
    <Chart
      ariaTitle="Throughput with tooltips"
      ariaDesc="Hover anywhere — the nearest point's series + value appears."
      themeColor="multi"
      height={260}
      padding={{ left: 60, right: 20, top: 20, bottom: 60 }}
      legendData={[{ name: "API" }, { name: "Worker" }]}
      legendPosition="bottom"
      containerComponent={
        <ChartVoronoiContainer
          labels={({ datum }: { datum: { x: string; y: number; childName?: string } }) =>
            `${datum.childName ?? ""} ${datum.x}: ${datum.y}`
          }
          constrainToVisibleArea
        />
      }
    >
      <ChartAxis />
      <ChartAxis dependentAxis showGrid />
      <ChartGroup>
        <ChartArea data={a} name="API" interpolation="monotoneX" />
        <ChartArea data={b} name="Worker" interpolation="monotoneX" />
      </ChartGroup>
    </Chart>
  );
}
// #endregion

// #region CursorLegendTooltip
export function CursorLegendTooltip() {
  return (
    <Chart
      ariaTitle="Throughput with cursor tooltip"
      ariaDesc="Crosshair tracks the x-position; tooltip shows all series at that x."
      themeColor="multi"
      height={260}
      padding={{ left: 60, right: 20, top: 20, bottom: 60 }}
      legendData={[{ name: "API" }, { name: "Worker" }]}
      legendPosition="bottom"
      containerComponent={
        <CursorVoronoiContainer
          cursorDimension="x"
          labels={({ datum }: { datum: { x: string; y: number } }) =>
            `${datum.y}`
          }
          labelComponent={
            <ChartLegendTooltip
              legendData={[{ name: "API" }, { name: "Worker" }]}
              title={(datum: { x?: string | number }) => String(datum.x ?? "")}
            />
          }
          mouseFollowTooltips
          voronoiDimension="x"
        />
      }
    >
      <ChartAxis />
      <ChartAxis dependentAxis showGrid />
      <ChartGroup>
        <ChartArea data={a} name="API" interpolation="monotoneX" />
        <ChartArea data={b} name="Worker" interpolation="monotoneX" />
      </ChartGroup>
    </Chart>
  );
}
// #endregion

export default function TooltipsExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <VoronoiTooltip />
      <CursorLegendTooltip />
    </div>
  );
}
