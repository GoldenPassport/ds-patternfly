/**
 * CatalogItemHeader (@patternfly/react-catalog-view-extension) — the page
 * header for a single catalog item: large icon, title, vendor line.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { CatalogItemHeader } from "@patternfly/react-catalog-view-extension";
import { CubeIcon } from "@patternfly/react-icons";
import "@patternfly/react-catalog-view-extension/dist/css/react-catalog-view-extension.css";

// #region Default
export function Default() {
  return (
    <CatalogItemHeader
      title="Workflow engine"
      vendor="Provided by Acme"
      iconClass="fas fa-cube"
    />
  );
}
// #endregion

// #region CustomNodes
export function CustomNodes() {
  return (
    <CatalogItemHeader
      title={
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <CubeIcon /> Workflow engine
        </span>
      }
      vendor={<a href="#vendor">Acme &rsaquo;</a>}
    />
  );
}
// #endregion

export default function CatalogItemHeaderExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Default />
      <CustomNodes />
    </div>
  );
}
