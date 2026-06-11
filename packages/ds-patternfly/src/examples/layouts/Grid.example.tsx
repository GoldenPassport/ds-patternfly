/**
 * Grid — 12-column grid with per-breakpoint span controls. Use it when items
 * have distinct widths and you want the layout expressed in column units.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Grid, GridItem } from "../_lib.js";

// Shaded placeholder block so the grid cells are visible in the demo.
// In a real app these are your charts / stats / form fields.
function Box({ label }: { label: string }) {
  return (
    <div
      style={{
        background: "var(--gp-color-brand-default)",
        color: "var(--gp-color-brand-on)",
        padding: "12px 16px",
        borderRadius: "var(--gp-radius-sm)",
        fontSize: 14,
        textAlign: "center",
      }}
    >
      {label}
    </div>
  );
}

// #region EqualColumns
export function EqualColumns() {
  return (
    <Grid hasGutter span={4}>
      <GridItem><Box label="span 4" /></GridItem>
      <GridItem><Box label="span 4" /></GridItem>
      <GridItem><Box label="span 4" /></GridItem>
    </Grid>
  );
}
// #endregion

// #region MixedSpans
export function MixedSpans() {
  return (
    <Grid hasGutter>
      <GridItem span={8}><Box label="span 8 — wide chart" /></GridItem>
      <GridItem span={4}><Box label="span 4 — stat" /></GridItem>
      <GridItem span={3}><Box label="3" /></GridItem>
      <GridItem span={3}><Box label="3" /></GridItem>
      <GridItem span={3}><Box label="3" /></GridItem>
      <GridItem span={3}><Box label="3" /></GridItem>
    </Grid>
  );
}
// #endregion

// #region ResponsiveSpans
export function ResponsiveSpans() {
  return (
    <Grid hasGutter>
      {Array.from({ length: 6 }).map((_, i) => (
        <GridItem key={i} span={12} md={6} lg={4}>
          <Box label={`item ${i + 1}`} />
        </GridItem>
      ))}
    </Grid>
  );
}
// #endregion

export default function GridExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <EqualColumns />
      <MixedSpans />
      <ResponsiveSpans />
    </div>
  );
}
