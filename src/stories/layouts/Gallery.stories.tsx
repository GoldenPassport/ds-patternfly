import type { Meta, StoryObj } from "@storybook/react-vite";
import { Gallery, GalleryItem } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { Box, DemoFrame, PropsTable } from "./_layoutKit.js";

const meta: Meta = {
  title: "Layouts/Gallery",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Gallery"
      intro={
        <>
          A responsive grid of equal-width tiles. You specify the minimum
          tile width — the column count is computed by the browser at every
          viewport size. Use it for card grids, dashboards, and any
          collection where the items are interchangeable in shape.
        </>
      }
    >
      <Section
        title="Default behavior"
        description="hasGutter adds the standard spacer between tiles."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Gallery hasGutter minWidths={{ default: "180px" }}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <GalleryItem key={i}>
                    <Box label={`tile ${i + 1}`} style={{ padding: 24 }} />
                  </GalleryItem>
                ))}
              </Gallery>
            </DemoFrame>
            <CodeBlock>{`<Gallery hasGutter minWidths={{ default: "180px" }}>
  {items.map(i => <GalleryItem key={i.id}>...</GalleryItem>)}
</Gallery>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Per-breakpoint min widths"
        description="Tighter tiles on small viewports, more generous as space allows."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Gallery
                hasGutter
                minWidths={{
                  default: "140px",
                  md: "200px",
                  lg: "260px",
                }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <GalleryItem key={i}>
                    <Box label={`tile ${i + 1}`} style={{ padding: 24 }} />
                  </GalleryItem>
                ))}
              </Gallery>
            </DemoFrame>
            <CodeBlock>{`<Gallery
  hasGutter
  minWidths={{
    default: "140px",
    md: "200px",
    lg: "260px",
  }}
>
  ...
</Gallery>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                {
                  name: "hasGutter",
                  type: "boolean",
                  description: "Adds the standard spacer between tiles. Default false.",
                },
                {
                  name: "minWidths",
                  type: "{ default?: string, sm?: string, md?: string, lg?: string, xl?: string, '2xl'?: string }",
                  description: "Minimum tile width per breakpoint. The browser fits as many columns as space allows.",
                },
                {
                  name: "maxWidths",
                  type: "Same shape",
                  description: "Cap on tile width — rarely needed; use to prevent over-stretching on wide viewports.",
                },
                {
                  name: "component",
                  type: "ElementType",
                  description: <>Override the rendered tag (defaults to <code>div</code>).</>,
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section
        title="Gallery vs Grid"
        description="A choice that comes up often."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li><strong>Gallery</strong> — every tile is the same shape, you care about minimum tile width and let the column count breathe with the viewport. Card grids, asset libraries, dashboards.</li>
            <li><strong>Grid</strong> — items have meaningfully different widths (a wide chart next to a narrow stat card), and you want explicit per-item span control. Form layouts, dashboards with mixed widget sizes.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
