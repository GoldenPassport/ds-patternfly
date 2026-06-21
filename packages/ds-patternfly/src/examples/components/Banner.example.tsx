/**
 * StatusBanner — a page- or app-level status strip flush with the top of the
 * viewport. The exported StatusBanner lego block maps a `status` to its accent
 * colour, leading icon, and screen-reader text; you pass the message. Omit
 * `status` for a plain neutral banner.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { StatusBanner } from "@golden-passport/ds-patternfly";

// #region StatusVariants
export function StatusVariants() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <StatusBanner status="success">Deployment completed — all checks passing.</StatusBanner>
      <StatusBanner status="warning">Maintenance window scheduled for 23:00 UTC.</StatusBanner>
      <StatusBanner status="danger">API region us-east-1 is degraded — some requests may fail.</StatusBanner>
      <StatusBanner status="info">You&rsquo;re viewing the staging environment.</StatusBanner>
    </div>
  );
}
// #endregion

// #region PlainBanner
export function PlainBanner() {
  return <StatusBanner>Default banner — neutral surface, no status accent.</StatusBanner>;
}
// #endregion

export default function BannerExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <StatusVariants />
      <PlainBanner />
    </div>
  );
}
