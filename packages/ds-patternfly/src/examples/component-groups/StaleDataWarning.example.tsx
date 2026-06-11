/**
 * StaleDataWarning (@patternfly/react-component-groups) — a tooltip-icon for
 * objects nearing or past a freshness threshold (old check-in data,
 * abandoned workflows, unupdated host inventory).
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import StaleDataWarning from "@patternfly/react-component-groups/dist/dynamic/StaleDataWarning";

const now = new Date("2026-05-10T09:00:00Z");
const staleWarning = new Date("2026-05-09T00:00:00Z"); // 1 day before warning
const stale         = new Date("2026-05-08T00:00:00Z"); // marked stale 2 days ago
const culled        = new Date("2026-05-15T00:00:00Z"); // will be deleted in 5 days

// #region Default
export function Default() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        color: "var(--gp-color-text-regular)",
      }}
    >
      <span><strong>worker-23</strong></span>
      <StaleDataWarning
        stale={stale}
        staleWarning={staleWarning}
        culled={culled}
        currDate={now}
      />
      <span style={{ color: "var(--gp-color-text-subtle)" }}>
        · last check-in 2 days ago
      </span>
    </div>
  );
}
// #endregion

export default function StaleDataWarningExample() {
  return <Default />;
}
