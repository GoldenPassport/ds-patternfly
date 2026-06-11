/**
 * Donut chart — parts-of-a-whole with a centred topline number.
 * Requires @patternfly/react-charts (Victory-based).
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { ChartDonut } from "@patternfly/react-charts/victory";

const data = [
  { x: "Active", y: 142 },
  { x: "Paused", y: 18 },
  { x: "Failed", y: 3 },
];

// #region CentredTotal
export function CentredTotal() {
  return (
    <ChartDonut
      ariaTitle="Workflows by status"
      ariaDesc="142 active, 18 paused, 3 failed of 163 total."
      data={data}
      labels={({ datum }: { datum: { x: string; y: number } }) =>
        `${datum.x}: ${datum.y}`
      }
      title="163"
      subTitle="Workflows"
      themeColor="multi"
      height={260}
      width={260}
    />
  );
}
// #endregion

export default function DonutChartExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <CentredTotal />
    </div>
  );
}
