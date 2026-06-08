import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Breadcrumb,
  BreadcrumbHeading,
  BreadcrumbItem,
} from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/Breadcrumb",
  parameters: {
    layout: "padded",
    a11y: {
      config: {
        // The page intentionally renders multiple Breadcrumb landmarks
        // side-by-side for documentation purposes; in real apps you only
        // ever render one.
        rules: [{ id: "landmark-unique", enabled: false }],
      },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Breadcrumb"
      intro={
        <>
          A trail of links showing the user&rsquo;s place in the hierarchy.
          Renders as <code>&lt;nav aria-label=&quot;breadcrumb&quot;&gt;</code>;
          the last item is the current page and is not a link. Use it on
          pages nested three or more levels deep — shallower trees don&rsquo;t
          need it.
        </>
      }
    >
      <Section
        title="Default"
        description="The last BreadcrumbItem gets isActive — it renders as static text with aria-current='page' instead of a link."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Breadcrumb ouiaId="DefaultBreadcrumb">
                <BreadcrumbItem to="#">Workspaces</BreadcrumbItem>
                <BreadcrumbItem to="#">Acme</BreadcrumbItem>
                <BreadcrumbItem to="#">Projects</BreadcrumbItem>
                <BreadcrumbItem to="#" isActive>
                  Onboarding flow
                </BreadcrumbItem>
              </Breadcrumb>
            </DemoFrame>
            <CodeBlock>{`<Breadcrumb ouiaId="DefaultBreadcrumb">
  <BreadcrumbItem to="/workspaces">Workspaces</BreadcrumbItem>
  <BreadcrumbItem to="/workspaces/acme">Acme</BreadcrumbItem>
  <BreadcrumbItem to="/workspaces/acme/projects">Projects</BreadcrumbItem>
  <BreadcrumbItem to="#" isActive>Onboarding flow</BreadcrumbItem>
</Breadcrumb>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="With heading"
        description="BreadcrumbHeading swaps the last item for an h1, doubling the trail as the page heading. Use one or the other — not both."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <Breadcrumb>
                <BreadcrumbItem to="#">Settings</BreadcrumbItem>
                <BreadcrumbItem to="#">Team</BreadcrumbItem>
                <BreadcrumbHeading>Permissions</BreadcrumbHeading>
              </Breadcrumb>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Without home link"
        description="Omit to/href on the first BreadcrumbItem to render the section root as plain text — useful when the section lives at a parent route that isn't a meaningful destination."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <Breadcrumb>
                <BreadcrumbItem>Section home</BreadcrumbItem>
                <BreadcrumbItem to="#">Section title</BreadcrumbItem>
                <BreadcrumbItem to="#" isActive>
                  Section landing
                </BreadcrumbItem>
              </Breadcrumb>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="With a router Link"
        description="Pass component to render the crumb as a custom element — use this to wire Breadcrumb into your app's router."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <CodeBlock>{`import { Link } from "react-router-dom";

<Breadcrumb>
  <BreadcrumbItem
    render={(props) => <Link {...props} to="/workspaces" />}
  >
    Workspaces
  </BreadcrumbItem>
  <BreadcrumbItem
    render={(props) => <Link {...props} to="/workspaces/acme" />}
  >
    Acme
  </BreadcrumbItem>
  <BreadcrumbItem isActive>Projects</BreadcrumbItem>
</Breadcrumb>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Composition">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "Breadcrumb", type: "container", description: "The nav landmark. Renders <nav aria-label='breadcrumb'> + <ol>." },
                { name: "BreadcrumbItem", type: "child", description: "A single crumb. to / href makes it a link; isActive marks the current page; component / render swaps the rendered element (e.g. router Link)." },
                { name: "BreadcrumbHeading", type: "child", description: "Use as the last item to render the current page as an h1 heading." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "BreadcrumbItem.to / href", type: "string", description: "Renders as <a>. Use href for plain links; replace with router Link via render prop in apps." },
                { name: "BreadcrumbItem.isActive", type: "boolean", description: "Marks the current page — gets aria-current='page' and is not rendered as a link." },
                { name: "BreadcrumbItem.component", type: 'ElementType | "button" | "a"', description: "Render as a custom element (e.g. 'button' for click-only crumbs)." },
                { name: "BreadcrumbItem.render", type: "(props) => ReactNode", description: "Render-prop alternative — best for router Links that need their own props." },
                { name: "BreadcrumbItem.isDropdown", type: "boolean", description: "Treat the item as a dropdown trigger (typically wrapping a Dropdown for collapsed-segment patterns)." },
                { name: "Breadcrumb.ouiaId", type: "string", description: "Stable test selector. Sets data-ouia-component-id on the breadcrumb." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Last item is not a link.</strong> Use <code>isActive</code> on the final item — it gets <code>aria-current=&apos;page&apos;</code>.</li>
            <li><strong>Don&rsquo;t pad with the site name.</strong> The first crumb should be a meaningful section root (e.g. &ldquo;Workspaces&rdquo;), not &ldquo;Home&rdquo;.</li>
            <li><strong>Truncate intelligently.</strong> Long crumbs wrap; consider abbreviating middle segments (or use <code>isDropdown</code>) rather than letting one crumb push the trail to two lines.</li>
          </ul>
        </Card>
      </Section>
      <ThemingPointer
        dials={[
          ["--gp-anchor-color", "Crumb link colour."],
          ["--gp-text-subtle", "Separator + current-page text colour."],
          ["--gp-font-body", "Font family."],
        ]}
      />
    </FoundationPage>
  ),
};
