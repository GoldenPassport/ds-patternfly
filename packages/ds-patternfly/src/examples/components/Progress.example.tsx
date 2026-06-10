/**
 * Progress — a determinate progress bar with optional title, percentage, and status variant.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import {
  HelperText,
  HelperTextItem,
  Progress,
  ProgressMeasureLocation,
  ProgressSize,
  ProgressVariant,
} from "../_lib.js";

// #region Basic
export function Basic() {
  return <Progress value={33} title="Upload" />;
}
// #endregion

// #region StatusVariants
export function StatusVariants() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Progress value={100} title="Deployment" variant={ProgressVariant.success} />
      <Progress value={66} title="Sync" variant={ProgressVariant.warning} />
      <Progress value={42} title="Backup" variant={ProgressVariant.danger} />
    </div>
  );
}
// #endregion

// #region Sizes
export function Sizes() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Progress value={33} title="Small" size={ProgressSize.sm} />
      <Progress value={33} title="Medium (default)" />
      <Progress value={33} title="Large" size={ProgressSize.lg} />
    </div>
  );
}
// #endregion

// #region MeasureLocation
export function MeasureLocation() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Progress value={33} title="Top (default)" />
      <Progress value={33} title="Outside" measureLocation={ProgressMeasureLocation.outside} />
      <Progress value={33} title="Inside" size={ProgressSize.lg} measureLocation={ProgressMeasureLocation.inside} />
      <Progress value={33} title="None" measureLocation={ProgressMeasureLocation.none} />
    </div>
  );
}
// #endregion

// #region CustomRange
export function CustomRange() {
  return (
    <Progress
      value={2}
      min={0}
      max={5}
      title="Onboarding steps"
      measureLocation={ProgressMeasureLocation.top}
      label="2 of 5"
      valueText="2 of 5"
    />
  );
}
// #endregion

// #region SingleLine
export function SingleLine() {
  return (
    <Progress
      value={33}
      measureLocation={ProgressMeasureLocation.outside}
      aria-label="Project completion"
    />
  );
}
// #endregion

// #region WithHelperText
export function WithHelperText() {
  return (
    <Progress
      value={66}
      title="Database migration"
      variant={ProgressVariant.warning}
      helperText={
        <HelperText>
          <HelperTextItem variant="warning">
            Slower than expected — running 12s behind ETA.
          </HelperTextItem>
        </HelperText>
      }
    />
  );
}
// #endregion

export default function ProgressExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <StatusVariants />
      <Sizes />
      <MeasureLocation />
      <CustomRange />
      <SingleLine />
      <WithHelperText />
    </div>
  );
}
