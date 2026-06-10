import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FilterSidePanel,
  FilterSidePanelCategory,
  FilterSidePanelCategoryItem,
} from "@patternfly/react-catalog-view-extension";
import "@patternfly/react-catalog-view-extension/dist/css/react-catalog-view-extension.css";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Extensions/Catalog view/Filter side panel",
  parameters: {
    layout: "padded",
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [vendors, setVendors] = useState<Set<string>>(new Set(["acme"]));
    const [types, setTypes] = useState<Set<string>>(new Set());
    const toggle = (set: Set<string>, key: string, setter: (s: Set<string>) => void) => {
      const next = new Set(set);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      setter(next);
    };

    return (
      <FoundationPage
        title="Filter side panel"
        intro={
          <>
            The left rail of facet checkboxes for a catalog page — vendor,
            type, status, region. Pair <code>FilterSidePanel</code> with one
            or more <code>FilterSidePanelCategory</code> blocks; each
            category has a Show-X-more affordance baked in.
          </>
        }
      >
        <Section
          title="Two categories"
          description="Each category groups related facet checkboxes. State is owned by the parent — the items are controlled."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
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
              </DemoFrame>
              <CodeBlock>{`<FilterSidePanel>
  <FilterSidePanelCategory title="Vendor">
    {vendors.map(v => (
      <FilterSidePanelCategoryItem
        key={v.key}
        checked={selected.has(v.key)}
        onClick={() => toggleVendor(v.key)}
        count={v.count}
      >
        {v.label}
      </FilterSidePanelCategoryItem>
    ))}
  </FilterSidePanelCategory>

  <FilterSidePanelCategory title="Type" maxShowCount={3} leeway={1}>
    {/* … */}
  </FilterSidePanelCategory>
</FilterSidePanel>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="Most-used FilterSidePanelCategory props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "title", type: "string | ReactNode", description: "Category heading." },
                  { name: "maxShowCount", type: "number", description: "Render only the first N items; the rest collapse behind a 'Show X more' link." },
                  { name: "leeway", type: "number", description: "Minimum N for the 'Show X more' link to appear (so a 4-with-cap-of-3 stays expanded)." },
                  { name: "showAll", type: "boolean", description: "Controlled override — true to force expanded state." },
                  { name: "onShowAllToggle", type: "(event) => void", description: "Fired when the user toggles Show more / Show less." },
                  { name: "showText / hideText", type: "string", description: "Localize the Show / Hide labels." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Most-used FilterSidePanelCategoryItem props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "checked", type: "boolean", description: "Controlled checkbox state." },
                  { name: "onClick", type: "(event) => void", description: "Toggle handler." },
                  { name: "count", type: "number", description: "Optional count of matching items, rendered as a trailing chip." },
                  { name: "icon", type: "ReactNode", description: "Optional leading icon (e.g. provider logo)." },
                  { name: "children", type: "ReactNode", description: "Item label." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Wrap the panel in a labelled landmark</strong> (<code>&lt;aside aria-label=&quot;Filters&quot;&gt;</code>) so screen-reader users can jump to it directly.</li>
              <li><strong>Update the result count live.</strong> When a checkbox toggles, announce &ldquo;Showing 23 results&rdquo; in a polite live region — without it, blind users don&rsquo;t know the filter applied.</li>
              <li><strong>Localize Show-more strings.</strong> <code>showText</code> defaults to English (&ldquo;Show 3 more&rdquo;); pass your locale&rsquo;s strings.</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
