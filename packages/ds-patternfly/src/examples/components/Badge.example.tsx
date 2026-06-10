/**
 * Badge — counts and unread indicators attached to another element.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import type { CSSProperties } from "react";
import { Badge } from "../_lib.js";

// Badge tones — apply via inline CSS variable overrides so the badge
// inherits the right text contrast for each background. PF6 ships
// read/unread/disabled modifiers but no semantic-status variants, so we set
// the component's own CSS vars (typed loosely so React accepts the custom
// property names).
type BadgeStyle = CSSProperties & {
  "--pf-v6-c-badge--BackgroundColor"?: string;
  "--pf-v6-c-badge--Color"?: string;
};

const tones: Record<"nonstatus" | "warning" | "danger", BadgeStyle> = {
  nonstatus: {
    "--pf-v6-c-badge--BackgroundColor": "var(--pf-t--global--color--nonstatus--gray--default)",
    "--pf-v6-c-badge--Color": "var(--pf-t--global--text--color--nonstatus--on-gray--default)",
  },
  warning: {
    "--pf-v6-c-badge--BackgroundColor": "var(--pf-t--global--color--status--warning--default)",
    "--pf-v6-c-badge--Color": "var(--pf-t--global--text--color--status--on-warning--default)",
  },
  danger: {
    "--pf-v6-c-badge--BackgroundColor": "var(--pf-t--global--color--status--danger--default)",
    "--pf-v6-c-badge--Color": "var(--pf-t--global--text--color--status--on-danger--default)",
  },
};

// #region Tone
export function Tone() {
  return (
    <div
      style={{
        display: "flex",
        gap: 24,
        alignItems: "center",
        flexWrap: "wrap",
        color: "var(--gp-color-text-regular)",
      }}
    >
      <span>
        Drafts <Badge style={tones.nonstatus}>4</Badge>
      </span>
      <span>
        Pending review <Badge style={tones.warning}>7</Badge>
      </span>
      <span>
        Failed builds <Badge style={tones.danger}>3</Badge>
      </span>
    </div>
  );
}
// #endregion

// #region ReadVsUnread
export function ReadVsUnread() {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        alignItems: "center",
        color: "var(--gp-color-text-regular)",
      }}
    >
      <span>
        Inbox <Badge isRead>12</Badge>
      </span>
      <span>
        Notifications <Badge>3</Badge>
      </span>
    </div>
  );
}
// #endregion

// #region TruncatedCounts
export function TruncatedCounts() {
  return (
    <div style={{ display: "flex", gap: 16, color: "var(--gp-color-text-regular)" }}>
      <Badge>99+</Badge>
      <Badge>1k</Badge>
    </div>
  );
}
// #endregion

export default function BadgeExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Tone />
      <ReadVsUnread />
      <TruncatedCounts />
    </div>
  );
}
