/**
 * Spinner — loading indicator for short, indeterminate operations.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Spinner } from "@golden-passport/ds-patternfly";

const SIZES = ["sm", "md", "lg", "xl"] as const;

// #region Sizes
export function Sizes() {
  return (
    <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
      {SIZES.map((s) => (
        <div key={s} style={{ textAlign: "center", color: "var(--gp-color-text-regular)" }}>
          <Spinner size={s} aria-label={`Loading (${s})`} />
          <div style={{ fontSize: 12, marginTop: 8 }}>{s}</div>
        </div>
      ))}
    </div>
  );
}
// #endregion

export default function SpinnerExample() {
  return <Sizes />;
}
