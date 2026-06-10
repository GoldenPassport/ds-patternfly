import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  Default as DefaultBrand,
  ResponsiveHeights,
  ResponsiveArtDirection,
  LightDarkVariants,
} from "../../examples/components/Brand.example.js";
import brandExampleSrc from "../../examples/components/Brand.example.tsx?raw";
import brandComponentSrc from "../../components/Brand.tsx?raw";

const meta: Meta = {
  title: "Components/Brand",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Brand"
      intro={
        <>
          A logo image with PatternFly&apos;s sizing conventions and built-in
          responsive width support. Typically rendered inside a Masthead;
          the Shell shipped by this lib accepts it via the{" "}
          <code>brandLogo</code> prop. For multi-resolution / art-directed
          logos — where you want a different image (e.g. the icon-only
          mark) at narrow widths — pass{" "}
          <code>&lt;source media=&quot;…&quot; srcSet=&quot;…&quot; /&gt;</code>{" "}
          children. Brand renders a <code>&lt;picture&gt;</code> internally
          and the browser picks the first matching source.
        </>
      }
    >
      <Section title="Default">
        <Card>
          <Example
            source={brandExampleSrc}
            region="Default"
            fileName="Brand.example.tsx"
          >
            <DefaultBrand />
          </Example>
        </Card>
      </Section>

      <Section
        title="Responsive heights"
        description="Smaller on mobile, larger on desktop. Width is computed from the SVG's aspect ratio."
      >
        <Card>
          <Example
            source={brandExampleSrc}
            region="ResponsiveHeights"
            fileName="Brand.example.tsx"
          >
            <ResponsiveHeights />
          </Example>
        </Card>
      </Section>

      <Section
        title="Responsive with art-direction"
        description="The PF6 canonical pattern: pass <source> children with media queries to swap the image at different breakpoints — full logo on wide screens, icon-only mark on narrow ones. `widths` drives the rendered size per breakpoint."
      >
        <Card>
          <Example
            source={brandExampleSrc}
            region="ResponsiveArtDirection"
            fileName="Brand.example.tsx"
          >
            <ResponsiveArtDirection />
          </Example>
        </Card>
      </Section>

      <Section
        title="Light / dark variants"
        description="Render both variants and let CSS show the right one for the active theme. Pair with this design system's ThemeProvider mode prop (light / dark) or any prefers-color-scheme media query."
      >
        <Card>
          <Example
            source={brandExampleSrc}
            region="LightDarkVariants"
            fileName="Brand.example.tsx"
          >
            <LightDarkVariants />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={brandExampleSrc} fileName="Brand.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Brand } from "@golden-passport/ds-patternfly";'}
        componentSource={brandComponentSrc}
        componentFileName="Brand.tsx"
        rows={[
          {
            name: "src",
            type: "string",
            description: "Logo image URL. SVG strongly preferred for resolution independence. Used as the <img> fallback inside the <picture> Brand renders.",
          },
          {
            name: "alt",
            type: "string",
            description: 'Required. The brand name (e.g. "Acme"). Empty only when the brand is decorative — rare.',
          },
          {
            name: "widths",
            type: "{ default?: string, sm?: string, md?: string, lg?: string, xl?: string, '2xl'?: string }",
            description: "Per-breakpoint rendered width. Use when the logo is taller than wide or you want to drive sizing by width (the PF6 canonical responsive pattern).",
          },
          {
            name: "heights",
            type: "Same shape as widths",
            description: "Per-breakpoint rendered height. Width is computed from aspect ratio. Use for horizontal logos where height is the controlling dimension.",
          },
          {
            name: "children",
            type: "<source media=… srcSet=… /> elements",
            description: "Optional. Forwarded into a <picture> element — the browser picks the first <source> whose media query matches. Use for art-direction (icon vs full logo per breakpoint).",
          },
        ]}
      />

      <Section
        title="Accessibility (per PF6)"
        description="The single attribute PF6 documents on the brand element."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                {
                  name: "alt",
                  type: ".pf-v6-c-brand",
                  description: "Alternate text for the image when it can't be displayed. Required.",
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section
        title="CSS class / custom-property API"
        description="The class hooks and CSS custom properties PF6 documents for Brand. Useful when you need to drive the size from outside React (e.g. theme overrides)."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                {
                  name: ".pf-v6-c-brand",
                  type: "<img>, <picture>",
                  description: "Initiates a brand image. Required on every Brand element.",
                },
                {
                  name: ".pf-m-picture",
                  type: ".pf-v6-c-brand",
                  description: "Modifies a brand image to render as a <picture>. PF6 adds this automatically when Brand receives <source> children.",
                },
                {
                  name: "--pf-v6-c-brand--Width{-on-[breakpoint]}: {width}",
                  type: ".pf-v6-c-brand",
                  description: "Per-breakpoint rendered width. Set via the `widths` prop in React — PF6 emits the equivalent custom properties. Override in CSS for theme-level sizing.",
                },
                {
                  name: "--pf-v6-c-brand--Height{-on-[breakpoint]}: {height}",
                  type: ".pf-v6-c-brand",
                  description: "Per-breakpoint rendered height. Set via the `heights` prop in React.",
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section
        title="Accessibility guidance"
        description="A logo is content, not decoration."
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
            <li>
              <strong>alt is the brand name.</strong> Not &quot;Acme logo&quot; — just{" "}
              <code>alt=&quot;Acme&quot;</code>. The role is implied.
            </li>
            <li>
              <strong>Make it a link to home.</strong> Wrap with an anchor going
              to <code>/</code>. Convention users rely on.
            </li>
            <li>
              <strong>Don&apos;t use Brand for arbitrary images.</strong> It encodes
              logo-specific sizing conventions — use a plain <code>&lt;img&gt;</code>{" "}
              for product imagery.
            </li>
            <li>
              <strong>One alt across light / dark.</strong> When you render both
              theme variants and toggle via CSS, give them the same alt — the
              user shouldn&rsquo;t hear &ldquo;Acme&rdquo; twice in a row in
              screen-reader output.
            </li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
