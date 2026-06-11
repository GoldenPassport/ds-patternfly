/**
 * Skeleton — placeholder shapes that mimic the layout of loading content.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Skeleton } from "../_lib.js";

// #region CommonShapes
export function CommonShapes() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Skeleton width="40%" screenreaderText="Loading title" />
      <Skeleton width="100%" />
      <Skeleton width="100%" />
      <Skeleton width="80%" />
    </div>
  );
}
// #endregion

// #region CardPlaceholder
export function CardPlaceholder() {
  return (
    <div
      style={{
        border: "1px solid var(--gp-color-border-subtle)",
        borderRadius: "var(--gp-radius-md)",
        padding: 16,
        display: "grid",
        gap: 12,
        background: "var(--gp-color-bg-primary-default)",
      }}
    >
      <Skeleton shape="circle" width="48px" height="48px" screenreaderText="Loading avatar" />
      <Skeleton width="60%" />
      <Skeleton width="100%" />
      <Skeleton width="100%" />
      <Skeleton width="40%" />
    </div>
  );
}
// #endregion

export default function SkeletonExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <CommonShapes />
      <CardPlaceholder />
    </div>
  );
}
