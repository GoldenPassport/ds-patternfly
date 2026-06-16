/**
 * Label — a small inline tag for status, category, or metadata.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Label } from "@golden-passport/ds-patternfly";

const COLORS = ["blue", "teal", "green", "orange", "purple", "red", "orangered", "grey", "yellow"] as const;

// #region GenericInfoLabels
export function GenericInfoLabels() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Label status="info">Beta</Label>
      <Label status="info">Draft</Label>
      <Label status="info">New</Label>
      <Label status="info">Preview</Label>
    </div>
  );
}
// #endregion

// #region StatusVariants
export function StatusVariants() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Label status="info">Info</Label>
      <Label status="success">Success</Label>
      <Label status="warning">Warning</Label>
      <Label status="danger">Danger</Label>
    </div>
  );
}
// #endregion

// #region ColorPalette
export function ColorPalette() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {COLORS.map((c) => (
        <Label key={c} color={c}>
          {c}
        </Label>
      ))}
    </div>
  );
}
// #endregion

// #region Variants
export function Variants() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Label variant="outline">Outline</Label>
      <Label variant="filled" color="blue">Filled</Label>
    </div>
  );
}
// #endregion

// #region OutlinedLabels
export function OutlinedLabels() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Label variant="outline" status="info">Info</Label>
        <Label variant="outline" status="success">Success</Label>
        <Label variant="outline" status="warning">Warning</Label>
        <Label variant="outline" status="danger">Danger</Label>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {COLORS.map((c) => (
          <Label key={c} variant="outline" color={c}>
            {c}
          </Label>
        ))}
      </div>
    </div>
  );
}
// #endregion

// #region CompactLabels
export function CompactLabels() {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Label isCompact status="info">Info</Label>
      <Label isCompact status="success">Success</Label>
      <Label isCompact color="blue">Blue</Label>
      <Label isCompact variant="outline" color="blue">Outline</Label>
      <Label
        isCompact
        color="grey"
        onClose={() => {}}
        closeBtnAriaLabel="Remove tag"
      >
        Removable
      </Label>
    </div>
  );
}
// #endregion

// #region Removable
export function Removable() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Label color="blue" onClose={() => {}} closeBtnAriaLabel="Remove engineering filter">
        Engineering
      </Label>
      <Label color="blue" onClose={() => {}} closeBtnAriaLabel="Remove design filter">
        Design
      </Label>
    </div>
  );
}
// #endregion

export default function LabelExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <GenericInfoLabels />
      <StatusVariants />
      <ColorPalette />
      <Variants />
      <OutlinedLabels />
      <CompactLabels />
      <Removable />
    </div>
  );
}
