/**
 * Bullet chart — single-metric performance vs target with qualitative bands.
 * Requires @patternfly/react-charts (Victory-based).
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { ChartBullet } from "@patternfly/react-charts/victory";

// #region Basic
export function Basic() {
  return (
    <ChartBullet
      ariaTitle="SLA: API latency"
      ariaDesc="P99 latency vs 250ms SLA target."
      title="API latency"
      subTitle="p99 (ms)"
      primarySegmentedMeasureData={[{ name: "Actual", y: 180 }]}
      comparativeWarningMeasureData={[{ name: "Warning", y: 200 }]}
      comparativeErrorMeasureData={[{ name: "SLA", y: 250 }]}
      qualitativeRangeData={[
        { name: "Range", y: 150 },
        { name: "Range", y: 220 },
        { name: "Range", y: 300 },
      ]}
      maxDomain={{ y: 300 }}
      height={200}
      width={500}
      padding={{ left: 100, right: 50, top: 60, bottom: 60 }}
    />
  );
}
// #endregion

export default function BulletChartExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
    </div>
  );
}
