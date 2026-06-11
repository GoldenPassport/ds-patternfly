/**
 * FilterSidePanel (@patternfly/react-catalog-view-extension) — the left rail
 * of facet checkboxes for a catalog page: vendor, type, status, region.
 * Pair FilterSidePanel with one or more FilterSidePanelCategory blocks;
 * each category has a Show-X-more affordance baked in.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import {
  FilterSidePanel,
  FilterSidePanelCategory,
  FilterSidePanelCategoryItem,
} from "@patternfly/react-catalog-view-extension";
import "@patternfly/react-catalog-view-extension/dist/css/react-catalog-view-extension.css";

// #region TwoCategories
export function TwoCategories() {
  const [vendors, setVendors] = useState<Set<string>>(new Set(["acme"]));
  const [types, setTypes] = useState<Set<string>>(new Set());
  const toggle = (set: Set<string>, key: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setter(next);
  };

  return (
    <div style={{ maxWidth: 240 }}>
      <FilterSidePanel>
        <FilterSidePanelCategory title="Vendor">
          {[
            { key: "acme",  label: "Acme",     count: 42 },
            { key: "beta",  label: "Beta Co",  count: 17 },
            { key: "gamma", label: "Gamma",    count: 8 },
            { key: "delta", label: "Delta",    count: 3 },
          ].map((v) => (
            <FilterSidePanelCategoryItem
              key={v.key}
              checked={vendors.has(v.key)}
              onClick={() => toggle(vendors, v.key, setVendors)}
              count={v.count}
            >
              {v.label}
            </FilterSidePanelCategoryItem>
          ))}
        </FilterSidePanelCategory>
        <FilterSidePanelCategory
          title="Type"
          maxShowCount={3}
          leeway={1}
        >
          {[
            { key: "service",  label: "Service",  count: 24 },
            { key: "operator", label: "Operator", count: 11 },
            { key: "broker",   label: "Broker",   count: 7 },
            { key: "plugin",   label: "Plugin",   count: 5 },
            { key: "package",  label: "Package",  count: 2 },
          ].map((t) => (
            <FilterSidePanelCategoryItem
              key={t.key}
              checked={types.has(t.key)}
              onClick={() => toggle(types, t.key, setTypes)}
              count={t.count}
            >
              {t.label}
            </FilterSidePanelCategoryItem>
          ))}
        </FilterSidePanelCategory>
      </FilterSidePanel>
    </div>
  );
}
// #endregion

export default function FilterSidePanelExample() {
  return <TwoCategories />;
}
