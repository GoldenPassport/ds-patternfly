/**
 * VerticalTabs (@patternfly/react-catalog-view-extension) — a left-rail tab
 * list, common as the secondary nav inside a catalog item detail page
 * (Overview / Configuration / Permissions / Logs). Less heavyweight than
 * PageSidebar, cleaner than horizontal Tabs when you have ≥ 4 entries.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import {
  VerticalTabs,
  VerticalTabsTab,
} from "@patternfly/react-catalog-view-extension";
import "@patternfly/react-catalog-view-extension/dist/css/react-catalog-view-extension.css";

const tabs = ["Overview", "Configuration", "Permissions", "Logs", "Activity"];

// #region Default
export function Default() {
  const [active, setActive] = useState("Overview");
  return (
    <div style={{ display: "flex", gap: 24 }}>
      <div style={{ minWidth: 180 }}>
        <VerticalTabs>
          {tabs.map((t) => (
            <VerticalTabsTab
              key={t}
              title={t}
              href={`#${t.toLowerCase()}`}
              active={active === t}
              onActivate={() => setActive(t)}
            />
          ))}
        </VerticalTabs>
      </div>
      <div style={{ flex: 1, color: "var(--gp-color-text-regular)" }}>
        <strong>{active}</strong>
        <p style={{ marginTop: 8, color: "var(--gp-color-text-subtle)" }}>
          Render the active tab&rsquo;s panel here.
        </p>
      </div>
    </div>
  );
}
// #endregion

// #region Nested
export function Nested() {
  return (
    <div style={{ minWidth: 200 }}>
      {/* The extension renders each VerticalTabsTab as <li>;
          nested VerticalTabsTab children must be wrapped in a
          sub-VerticalTabs (<ul>) so the markup stays valid
          (<li> can't appear directly inside <li>). */}
      <VerticalTabs restrictTabs activeTab>
        <VerticalTabsTab title="Overview" active />
        <VerticalTabsTab title="Configuration" hasActiveDescendant>
          <VerticalTabs>
            <VerticalTabsTab title="General" active />
            <VerticalTabsTab title="Networking" />
            <VerticalTabsTab title="Storage" />
          </VerticalTabs>
        </VerticalTabsTab>
        <VerticalTabsTab title="Permissions" />
      </VerticalTabs>
    </div>
  );
}
// #endregion

export default function VerticalTabsExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Default />
      <Nested />
    </div>
  );
}
