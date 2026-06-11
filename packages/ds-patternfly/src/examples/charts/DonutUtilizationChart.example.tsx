/**
 * Donut utilization chart — single-metric percentage arc with thresholds.
 * Requires @patternfly/react-charts (Victory-based).
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { ChartDonutUtilization } from "@patternfly/react-charts/victory";

// #region ThreeUtilizations
export function ThreeUtilizations() {
  return (
    <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(3, 1fr)" }}>
      <ChartDonutUtilization
        ariaTitle="CPU utilization"
        ariaDesc="35% of CPU capacity used."
        data={{ x: "CPU", y: 35 }}
        title="35%"
        subTitle="CPU"
        thresholds={[{ value: 60 }, { value: 90 }]}
        height={240}
        width={240}
      />
      <ChartDonutUtilization
        ariaTitle="Memory utilization"
        ariaDesc="72% of memory used — past the warning threshold."
        data={{ x: "Memory", y: 72 }}
        title="72%"
        subTitle="Memory"
        thresholds={[{ value: 60 }, { value: 90 }]}
        height={240}
        width={240}
      />
      <ChartDonutUtilization
        ariaTitle="Disk utilization"
        ariaDesc="92% of disk used — past the danger threshold."
        data={{ x: "Disk", y: 92 }}
        title="92%"
        subTitle="Disk"
        thresholds={[{ value: 60 }, { value: 90 }]}
        height={240}
        width={240}
      />
    </div>
  );
}
// #endregion

export default function DonutUtilizationChartExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <ThreeUtilizations />
    </div>
  );
}
