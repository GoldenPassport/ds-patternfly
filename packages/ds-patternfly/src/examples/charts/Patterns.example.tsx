/**
 * Chart patterns — SVG fill patterns as a second signal alongside colour.
 *
 * Requires @patternfly/react-charts (Victory wrapper).
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId } from "react";
import {
  Chart,
  ChartAxis,
  ChartBar,
  ChartGroup,
} from "@patternfly/react-charts/victory";

const data1 = [
  { x: "Q1", y: 40 }, { x: "Q2", y: 70 }, { x: "Q3", y: 55 }, { x: "Q4", y: 80 },
];
const data2 = data1.map((p) => ({ ...p, y: p.y + 12 }));

// #region PatternFills
export function PatternFills() {
  const id = useId();
  const diagId = `${id}-diag`;
  const dotsId = `${id}-dots`;
  return (
    <>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <pattern id={diagId} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
            <rect width="6" height="6" fill="var(--pf-t--chart--color--blue--400, #06c)" />
            <line x1="0" y1="0" x2="0" y2="6" stroke="white" strokeWidth="2" />
          </pattern>
          <pattern id={dotsId} patternUnits="userSpaceOnUse" width="6" height="6">
            <rect width="6" height="6" fill="var(--pf-t--chart--color--purple--400, #5752d1)" />
            <circle cx="3" cy="3" r="1.2" fill="white" />
          </pattern>
        </defs>
      </svg>
      <Chart
        ariaTitle="Quarterly revenue (patterned)"
        ariaDesc="Two products by quarter, distinguished by diagonal vs dotted fill."
        height={260}
        domainPadding={{ x: [40, 40] }}
        padding={{ left: 60, right: 20, top: 20, bottom: 60 }}
        legendData={[{ name: "Pro" }, { name: "Enterprise" }]}
        legendPosition="bottom"
      >
        <ChartAxis />
        <ChartAxis dependentAxis showGrid />
        <ChartGroup offset={14}>
          <ChartBar data={data1} style={{ data: { fill: `url(#${diagId})` } }} />
          <ChartBar data={data2} style={{ data: { fill: `url(#${dotsId})` } }} />
        </ChartGroup>
      </Chart>
    </>
  );
}
// #endregion

export default function PatternsExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <PatternFills />
    </div>
  );
}
