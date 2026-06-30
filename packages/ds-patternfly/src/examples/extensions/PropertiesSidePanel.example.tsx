/**
 * PropertiesSidePanel (@patternfly/react-catalog-view-extension) — the right
 * rail of metadata on a catalog detail page: version, maintainer, support
 * level, expires-on. Pair PropertiesSidePanel with one or more PropertyItem
 * children, and stack actions (Install, Subscribe) at the bottom.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import {
  PropertiesSidePanel,
  PropertyItem,
} from "@patternfly/react-catalog-view-extension";
import "@patternfly/react-catalog-view-extension/dist/css/react-catalog-view-extension.css";
import { Button } from "@golden-passport/ds-patternfly";

// #region StandardLayout
export function StandardLayout() {
  return (
    <div style={{ maxWidth: 280 }}>
      <PropertiesSidePanel>
        <PropertyItem label="Version"        value="6.4.0" />
        <PropertyItem label="Maintainer"     value="Acme" />
        <PropertyItem label="Support level"  value="Community" />
        <PropertyItem label="Last updated"   value="2026-04-29" />
        <PropertyItem
          label="Documentation"
          value={<a href="#docs">Read the docs ›</a>}
        />
        {/* Give the action room to breathe — separate it from the property
            list above and keep it off the panel's bottom edge. */}
        <div style={{ marginBlockStart: "1.5rem", marginBlockEnd: "0.5rem" }}>
          <Button variant="primary" isBlock>
            Install
          </Button>
        </div>
      </PropertiesSidePanel>
    </div>
  );
}
// #endregion

export default function PropertiesSidePanelExample() {
  return <StandardLayout />;
}
