/**
 * TabbedView — a declarative tabbed container over a `tabs` array (key /
 * title / content). Manages the active tab itself, or you control it.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import { Content, TabbedView, type TabDef } from "@golden-passport/ds-patternfly";

const TABS: TabDef[] = [
  {
    key: "details",
    title: "Details",
    content: <Content component="p">Name, status, namespace, and metadata.</Content>,
  },
  {
    key: "yaml",
    title: "YAML",
    content: <Content component="p">The raw resource definition.</Content>,
  },
  {
    key: "events",
    title: "Events",
    content: <Content component="p">Recent lifecycle events for this resource.</Content>,
  },
];

// #region Uncontrolled
export function Uncontrolled() {
  return <TabbedView tabs={TABS} />;
}
// #endregion

// #region Controlled
export function Controlled() {
  const [active, setActive] = useState("yaml");
  return (
    <>
      <TabbedView
        tabs={TABS}
        activeKey={active}
        onSelect={setActive}
      />
      <p style={{ marginBlockStart: 8, color: "var(--gp-color-text-subtle)", fontSize: 13 }}>
        Active tab: <strong>{active}</strong>
      </p>
    </>
  );
}
// #endregion

// #region BoxStyle
export function BoxStyle() {
  return <TabbedView tabs={TABS} isBox defaultActiveKey="events" />;
}
// #endregion

export default function TabbedViewExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Uncontrolled />
      <Controlled />
      <BoxStyle />
    </div>
  );
}
