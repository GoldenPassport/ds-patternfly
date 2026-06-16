/**
 * Timestamp — locale-aware date / time renderer with tooltip support.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import {
  Timestamp,
  TimestampFormat,
  TimestampTooltipVariant,
} from "@golden-passport/ds-patternfly";

const fixed = new Date("2026-04-21T14:30:25");

// #region Default
export function Default() {
  return (
    <div style={{ display: "grid", gap: 8, color: "var(--gp-color-text-regular)" }}>
      <Timestamp />
      <Timestamp shouldDisplayUTC />
    </div>
  );
}
// #endregion

// #region FormatVariations
export function FormatVariations() {
  return (
    <div style={{ display: "grid", gap: 8, color: "var(--gp-color-text-regular)" }}>
      <Timestamp date={fixed} dateFormat={TimestampFormat.full} timeFormat={TimestampFormat.full} />
      <Timestamp date={fixed} dateFormat={TimestampFormat.full} />
      <Timestamp date={fixed} timeFormat={TimestampFormat.full} />
      <Timestamp date={fixed} dateFormat={TimestampFormat.medium} timeFormat={TimestampFormat.short} />
      <Timestamp date={fixed} dateFormat={TimestampFormat.short} timeFormat={TimestampFormat.short} />
    </div>
  );
}
// #endregion

// #region WithSuffix
export function WithSuffix() {
  return (
    <div style={{ color: "var(--gp-color-text-regular)" }}>
      <Timestamp
        date={fixed}
        dateFormat={TimestampFormat.medium}
        timeFormat={TimestampFormat.short}
        displaySuffix="UTC"
      />
    </div>
  );
}
// #endregion

// #region WithTooltip
export function WithTooltip() {
  return (
    <div style={{ display: "grid", gap: 8, color: "var(--gp-color-text-regular)" }}>
      <Timestamp
        date={fixed}
        tooltip={{ variant: TimestampTooltipVariant.default }}
      />
      <Timestamp
        date={fixed}
        tooltip={{
          variant: TimestampTooltipVariant.default,
          suffix: "Coordinated Universal Time (UTC)",
        }}
      />
    </div>
  );
}
// #endregion

// #region CustomContent
export function CustomContent() {
  return (
    <div style={{ color: "var(--gp-color-text-regular)" }}>
      <Timestamp
        date={fixed}
        tooltip={{ variant: TimestampTooltipVariant.default }}
      >
        2 hours ago
      </Timestamp>
    </div>
  );
}
// #endregion

export default function TimestampExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Default />
      <FormatVariations />
      <WithSuffix />
      <WithTooltip />
      <CustomContent />
    </div>
  );
}
