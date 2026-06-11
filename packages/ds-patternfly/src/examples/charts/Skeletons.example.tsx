/**
 * Chart skeletons — loading placeholders that match a chart's footprint.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Skeleton } from "../_lib.js";

// #region LineAreaSilhouette
export function LineAreaSilhouette() {
  return (
    <div style={{ position: "relative", height: 240, padding: 12 }}>
      <Skeleton height="100%" width="100%" screenreaderText="Loading chart" />
    </div>
  );
}
// #endregion

// #region BarSilhouette
export function BarSilhouette() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 16,
        padding: 12,
        height: 240,
      }}
      role="img"
      aria-busy="true"
      aria-label="Loading chart"
    >
      {[0.4, 0.7, 0.55, 0.8, 0.3, 0.6].map((h, i) => (
        <Skeleton key={i} width="40px" height={`${h * 100}%`} screenreaderText="" />
      ))}
    </div>
  );
}
// #endregion

// #region DonutSilhouette
export function DonutSilhouette() {
  return (
    <div
      style={{ display: "grid", placeItems: "center", height: 240 }}
      role="img"
      aria-busy="true"
      aria-label="Loading donut chart"
    >
      <Skeleton shape="circle" width="180px" height="180px" />
    </div>
  );
}
// #endregion

export default function SkeletonsExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <LineAreaSilhouette />
      <BarSilhouette />
      <DonutSilhouette />
    </div>
  );
}
