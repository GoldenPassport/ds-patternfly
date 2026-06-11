import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  DefaultBehavior,
  PerBreakpointMinWidths,
} from "../../examples/layouts/Gallery.example.js";
import galleryExampleSrc from "../../examples/layouts/Gallery.example.tsx?raw";
import galleryComponentSrc from "../../components/Gallery.tsx?raw";

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
          <Example
            source={galleryExampleSrc}
            region="DefaultBehavior"
            fileName="Gallery.example.tsx"
          >
            <DefaultBehavior />
          </Example>
        </Card>
      </Section>

      <Section
        title="Per-breakpoint min widths"
        description="Tighter tiles on small viewports, more generous as space allows."
      >
        <Card>
          <Example
            source={galleryExampleSrc}
            region="PerBreakpointMinWidths"
            fileName="Gallery.example.tsx"
          >
            <PerBreakpointMinWidths />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={galleryExampleSrc} fileName="Gallery.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Gallery, GalleryItem } from "@golden-passport/ds-patternfly";'}
        componentSource={galleryComponentSrc}
        componentFileName="Gallery.tsx"
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
