/**
 * NotificationBadge — a bell-icon trigger that surfaces unread / attention
 * status, commonly placed in the masthead to open a NotificationDrawer.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import { NotificationBadge, NotificationBadgeVariant } from "../_lib.js";

// #region Variants
export function Variants() {
  const [readOpen, setReadOpen] = useState(false);
  const [unreadOpen, setUnreadOpen] = useState(false);
  const [attentionOpen, setAttentionOpen] = useState(false);

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <NotificationBadge
        variant={NotificationBadgeVariant.read}
        onClick={() => setReadOpen((v) => !v)}
        isExpanded={readOpen}
        aria-label="Notifications (read)"
      />
      <NotificationBadge
        variant={NotificationBadgeVariant.unread}
        onClick={() => setUnreadOpen((v) => !v)}
        isExpanded={unreadOpen}
        aria-label="Notifications (unread)"
      />
      <NotificationBadge
        variant={NotificationBadgeVariant.attention}
        onClick={() => setAttentionOpen((v) => !v)}
        isExpanded={attentionOpen}
        aria-label="Notifications (attention)"
      />
    </div>
  );
}
// #endregion

// #region WithCount
export function WithCount() {
  const [countOpen, setCountOpen] = useState(false);

  return (
    <NotificationBadge
      variant={NotificationBadgeVariant.attention}
      count={12}
      onClick={() => setCountOpen((v) => !v)}
      isExpanded={countOpen}
      aria-label="Notifications (12 unread)"
    />
  );
}
// #endregion

export default function NotificationBadgeExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Variants />
      <WithCount />
    </div>
  );
}
