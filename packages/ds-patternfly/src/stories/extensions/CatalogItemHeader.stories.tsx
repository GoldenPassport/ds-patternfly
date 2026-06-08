import type { Meta, StoryObj } from "@storybook/react-vite";
import { CatalogItemHeader } from "@patternfly/react-catalog-view-extension";
import { CubeIcon } from "@patternfly/react-icons";
import "@patternfly/react-catalog-view-extension/dist/css/react-catalog-view-extension.css";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Extensions/Catalog view/Catalog item header",
  parameters: {
    layout: "padded",
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Catalog item header"
      intro={
        <>
          The page header for a single catalog item — large icon, title,
          vendor line. Render it at the top of the catalog item&rsquo;s
          detail page so users know what they clicked into.
        </>
      }
    >
      <Section title="Default">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <CatalogItemHeader
                title="Workflow engine"
                vendor="Provided by Acme"
                iconClass="fas fa-cube"
              />
            </DemoFrame>
            <CodeBlock>{`<CatalogItemHeader
  title="Workflow engine"
  vendor="Provided by Acme"
  iconClass="fas fa-cube"
/>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="With a custom icon node"
        description="Pass a React node as title / vendor when you need composed content (badges, links, status pills)."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <CatalogItemHeader
                title={
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <CubeIcon /> Workflow engine
                  </span>
                }
                vendor={<a href="#vendor">Acme &rsaquo;</a>}
              />
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "title", type: "string | ReactNode", description: "Required — page title." },
                { name: "vendor", type: "string | ReactNode", description: "Subtitle / provider line." },
                { name: "iconImg", type: "string", description: "URL for an icon image." },
                { name: "iconClass", type: "string", description: "CSS class for a font icon (exclusive with iconImg)." },
                { name: "className", type: "string", description: "Additional class on the wrapper." },
              ]}
            />
            <p style={{ marginTop: 16, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
              CatalogItemHeader does not provide a slot for actions — render
              your install / launch button as a separate sibling next to the
              header.
            </p>
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
