/**
 * Icon — sizing and semantic color for SVG icons.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Icon } from "../_lib.js";
import {
  CheckCircleIcon,
  InfoCircleIcon,
  ExclamationTriangleIcon,
  TimesCircleIcon,
} from "@patternfly/react-icons";

const SIZES = ["sm", "md", "lg", "xl"] as const;
const STATUSES = [
  { status: "info" as const, IconC: InfoCircleIcon, label: "Info" },
  { status: "success" as const, IconC: CheckCircleIcon, label: "Success" },
  { status: "warning" as const, IconC: ExclamationTriangleIcon, label: "Warning" },
  { status: "danger" as const, IconC: TimesCircleIcon, label: "Danger" },
];

// #region Sizes
export function Sizes() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      {SIZES.map((s) => (
        <div key={s} style={{ textAlign: "center", color: "var(--gp-color-text-regular)" }}>
          <Icon size={s}>
            <CheckCircleIcon />
          </Icon>
          <div style={{ fontSize: 12, marginTop: 8 }}>{s}</div>
        </div>
      ))}
    </div>
  );
}
// #endregion

// #region StatusColors
export function StatusColors() {
  return (
    <div style={{ display: "flex", gap: 24 }}>
      {STATUSES.map(({ status, IconC, label }) => (
        <div key={status} style={{ textAlign: "center", color: "var(--gp-color-text-regular)" }}>
          <Icon status={status} size="lg">
            <IconC />
          </Icon>
          <div style={{ fontSize: 12, marginTop: 8 }}>{label}</div>
        </div>
      ))}
    </div>
  );
}
// #endregion

export default function IconExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Sizes />
      <StatusColors />
    </div>
  );
}
