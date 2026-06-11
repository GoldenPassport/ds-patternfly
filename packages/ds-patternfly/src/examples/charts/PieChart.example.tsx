/**
 * Pie chart — composition of a whole; slices that sum to 100%.
 *
 * Requires @patternfly/react-charts (Victory wrapper).
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { ChartContainer, ChartPie } from "@patternfly/react-charts/victory";

const data = [
  { x: "Pro",        y: 60 },
  { x: "Enterprise", y: 25 },
  { x: "Free",       y: 15 },
];

// #region Basic
export function Basic() {
  return (
    /* responsive={false} renders the chart at its fixed width×height
       instead of scaling to fill the container — otherwise the SVG
       stretches to the container width and its height balloons. */
    <ChartPie
      ariaTitle="Plan distribution"
      ariaDesc="60% Pro, 25% Enterprise, 15% Free."
      data={data}
      labels={({ datum }: { datum: { x: string; y: number } }) =>
        `${datum.x}: ${datum.y}%`
      }
      themeColor="multi"
      height={260}
      width={440}
      legendData={data.map((d) => ({ name: `${d.x} (${d.y}%)` }))}
      legendPosition="right"
      padding={{ top: 10, bottom: 10, left: 10, right: 160 }}
      containerComponent={<ChartContainer responsive={false} />}
    />
  );
}
// #endregion

export default function PieChartExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
    </div>
  );
}
