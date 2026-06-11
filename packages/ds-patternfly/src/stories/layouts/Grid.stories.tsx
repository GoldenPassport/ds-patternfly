import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  EqualColumns,
  MixedSpans,
  ResponsiveSpans,
} from "../../examples/layouts/Grid.example.js";
import gridExampleSrc from "../../examples/layouts/Grid.example.tsx?raw";
import gridComponentSrc from "../../components/Grid.tsx?raw";

const meta: Meta = {
  title: "Layouts/Grid",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Grid"
      intro={
        <>
          A 12-column grid with per-breakpoint span controls. Use it when
          items have distinct widths (a wide chart next to a narrow stat,
          a form with two columns of fields), and you want to express the
          layout in column units rather than pixels or percentages.
        </>
      }
    >
      <Section
        title="Equal columns"
        description="Set a default span on the Grid and every item gets it."
      >
        <Card>
          <Example
            source={gridExampleSrc}
            region="EqualColumns"
            fileName="Grid.example.tsx"
          >
            <EqualColumns />
          </Example>
        </Card>
      </Section>

      <Section
        title="Mixed spans"
        description="Set span at the item level for asymmetric layouts."
      >
        <Card>
          <Example
            source={gridExampleSrc}
            region="MixedSpans"
            fileName="Grid.example.tsx"
          >
            <MixedSpans />
          </Example>
        </Card>
      </Section>

      <Section
        title="Responsive spans"
        description="Single column on mobile, two at md, three at lg."
      >
        <Card>
          <Example
            source={gridExampleSrc}
            region="ResponsiveSpans"
            fileName="Grid.example.tsx"
          >
            <ResponsiveSpans />
          </Example>
          <p
            style={{
              margin: "0 16px 16px",
              color: "var(--gp-color-text-subtle)",
              fontSize: 14,
            }}
          >
            Resize the canvas to see the column count step from 1 → 2 → 3.
          </p>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={gridExampleSrc} fileName="Grid.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Grid, GridItem } from "@golden-passport/ds-patternfly";'}
        componentSource={gridComponentSrc}
        componentFileName="Grid.tsx"
        description={
          <>
            How to import the component and every prop it accepts. GridItem
            accepts the same span props for per-item control.
          </>
        }
        rows={[
          { name: "hasGutter", type: "boolean", description: "Adds the standard gutter between cells." },
          { name: "span", type: "1–12", description: "Default column span for every GridItem child." },
          { name: "sm / md / lg / xl / xl2", type: "1–12", description: "Per-breakpoint default span." },
          { name: "order", type: "{ default?, md?, ... }", description: "Override visual order of items per breakpoint." },
          { name: "component", type: "ElementType", description: <>Override the rendered tag (defaults to <code>div</code>).</> },
        ]}
      />
    </FoundationPage>
  ),
};
