import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";

const meta: Meta = {
  title: "Utility classes",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="About utility classes"
      intro={
        <>
          PatternFly 6 ships a set of single-purpose CSS classes for the most
          common one-off styling needs — alignment, spacing, display,
          background color, and so on. The lib bundles them into its main
          stylesheet so you can use them directly in any consumer app without
          extra installs.
        </>
      }
    >
      <Section title="What they are" description="The shape of a utility class.">
        <Card>
          <div style={{ padding: 24, color: "var(--gp-color-text-regular)" }}>
            <p style={{ marginTop: 0 }}>
              Each utility class sets one CSS property to one value. They are
              named <code>pf-v6-u-</code><em>property</em>-<em>value</em> and
              are designed to be composed: stack several on the same element
              to get the combined effect.
            </p>
            <CodeBlock label="Example: a centered, bold heading with a top margin">{`<h2 className="pf-v6-u-text-align-center pf-v6-u-font-weight-bold pf-v6-u-mt-lg">
  Welcome
</h2>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="When to reach for them"
        description="The system has opinions about this — utilities are a tool, not a default."
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
              <strong>Yes for one-off layout adjustments.</strong> A single
              extra <code>pf-v6-u-mb-md</code> on one heading is fine; it
              avoids a custom class for a one-line tweak.
            </li>
            <li>
              <strong>Yes for responsive show/hide.</strong>{" "}
              <code>pf-v6-u-hidden-on-md</code> and friends are the cleanest
              way to swap UI by breakpoint without media-query scaffolding.
            </li>
            <li>
              <strong>No for repeated patterns.</strong> If you find yourself
              putting the same five utilities on every card, that's a
              component, not a stack of utilities.
            </li>
            <li>
              <strong>No for theme-sensitive properties.</strong> Brand color,
              spacing scale, and radii live in <code>--gp-*</code> CSS variables
              that adapt across brands and modes — utility classes are static.
              Use the variables when the value should respond to brand/theme
              changes.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Responsive variants"
        description="Every utility supports the same breakpoint suffix pattern."
      >
        <Card>
          <div style={{ padding: 24, color: "var(--gp-color-text-regular)" }}>
            <p style={{ marginTop: 0 }}>
              Append <code>-on-sm</code>, <code>-on-md</code>,{" "}
              <code>-on-lg</code>, <code>-on-xl</code>, or{" "}
              <code>-on-2xl</code> to apply a class only at and above that
              breakpoint. Compose them mobile-first: the bare class is the
              base, suffix variants override it as the viewport grows.
            </p>
            <CodeBlock label="Example: hide on mobile, show inline at md+">{`<aside className="pf-v6-u-hidden pf-v6-u-display-block-on-md">
  Sidebar nav
</aside>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Categories"
        description="Each category has its own page in this section."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.9,
            }}
          >
            <li><strong>Accessibility</strong> — visible/hidden helpers for screen readers and visual UI.</li>
            <li><strong>Alignment</strong> — text alignment.</li>
            <li><strong>Background color</strong> — semantic surface tones.</li>
            <li><strong>Box shadow</strong> — elevation and edge shadows.</li>
            <li><strong>Display</strong> — block, inline, flex, grid, none, and responsive switches.</li>
            <li><strong>Flex</strong> — direction, wrap, grow/shrink, align/justify for flex containers and items.</li>
            <li><strong>Float</strong> — logical-property floats (rarely needed in modern layouts).</li>
            <li><strong>Sizing</strong> — width, height, max/min in percentages and viewport units.</li>
            <li><strong>Spacing</strong> — margin and padding on the spacer scale, all sides and directions.</li>
            <li><strong>Text</strong> — font family, size, weight, color, decoration, wrapping.</li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Where they come from"
        description="Provenance and version pinning."
      >
        <Card>
          <div style={{ padding: 24, color: "var(--gp-color-text-regular)" }}>
            <p style={{ marginTop: 0 }}>
              The utilities are PatternFly 6&apos;s own — sourced from the{" "}
              <code>@patternfly/patternfly</code> package (the{" "}
              <code>utilities/_index.css</code> entrypoint) and concatenated
              into <code>dist/styles/index.css</code> at build time. Importing
              the lib&apos;s stylesheet brings them in automatically.
            </p>
            <CodeBlock label="In a consumer app">{`import "@patternfly/react-core/dist/styles/base.css";
import "@golden-passport/ds-patternfly/styles"; // ← utilities included`}</CodeBlock>
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
