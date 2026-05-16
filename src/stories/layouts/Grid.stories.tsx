import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid, GridItem } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { Box, DemoFrame, PropsTable } from "./_layoutKit.js";

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
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Grid hasGutter span={4}>
                <GridItem><Box label="span 4" /></GridItem>
                <GridItem><Box label="span 4" /></GridItem>
                <GridItem><Box label="span 4" /></GridItem>
              </Grid>
            </DemoFrame>
            <CodeBlock>{`<Grid hasGutter span={4}>
  <GridItem>...</GridItem>
  <GridItem>...</GridItem>
  <GridItem>...</GridItem>
</Grid>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Mixed spans"
        description="Set span at the item level for asymmetric layouts."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Grid hasGutter>
                <GridItem span={8}><Box label="span 8 — wide chart" /></GridItem>
                <GridItem span={4}><Box label="span 4 — stat" /></GridItem>
                <GridItem span={3}><Box label="3" /></GridItem>
                <GridItem span={3}><Box label="3" /></GridItem>
                <GridItem span={3}><Box label="3" /></GridItem>
                <GridItem span={3}><Box label="3" /></GridItem>
              </Grid>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Responsive spans"
        description="Single column on mobile, two at md, three at lg."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Grid hasGutter>
                {Array.from({ length: 6 }).map((_, i) => (
                  <GridItem key={i} span={12} md={6} lg={4}>
                    <Box label={`item ${i + 1}`} />
                  </GridItem>
                ))}
              </Grid>
            </DemoFrame>
            <CodeBlock>{`<Grid hasGutter>
  {items.map(i => (
    <GridItem key={i.id} span={12} md={6} lg={4}>
      ...
    </GridItem>
  ))}
</Grid>`}</CodeBlock>
            <p style={{ margin: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
              Resize the canvas to see the column count step from 1 → 2 → 3.
            </p>
          </div>
        </Card>
      </Section>

      <Section title="Props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "hasGutter", type: "boolean", description: "Adds the standard gutter between cells." },
                { name: "span", type: "1–12", description: "Default column span for every GridItem child." },
                { name: "sm / md / lg / xl / xl2", type: "1–12", description: "Per-breakpoint default span." },
                { name: "order", type: "{ default?, md?, ... }", description: "Override visual order of items per breakpoint." },
                { name: "component", type: "ElementType", description: <>Override the rendered tag (defaults to <code>div</code>).</> },
              ]}
            />
            <p style={{ marginTop: 16, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
              GridItem accepts the same span props for per-item control.
            </p>
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
