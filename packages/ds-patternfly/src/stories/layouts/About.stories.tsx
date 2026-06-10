import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";

const meta: Meta = {
  title: "Layouts",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="About layouts"
      intro={
        <>
          Layouts are PatternFly 6&apos;s set of structural primitives — small
          React components that compose into the page-level skeletons every
          BPM/automation app needs. They wrap CSS flexbox and grid with a
          token-aware API so spacing, breakpoints, and brand stay consistent
          across the system.
        </>
      }
    >
      <Section
        title="Where they come from"
        description="Layouts ship with @patternfly/react-core — already a peer dependency of this lib."
      >
        <Card>
          <div style={{ padding: 24, color: "var(--gp-color-text-regular)" }}>
            <p style={{ marginTop: 0 }}>
              You don&apos;t install anything new. Import directly from{" "}
              <code>@patternfly/react-core</code> alongside the lib&apos;s own
              components and theme provider.
            </p>
            <CodeBlock>{`import { Bullseye, Flex, Gallery, Grid, Level, Split, Stack } from "@patternfly/react-core";`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="The seven layouts"
        description="Each has its own page in this section with live demos and prop reference."
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
            <li><strong>Bullseye</strong> — center one element vertically and horizontally inside its parent.</li>
            <li><strong>Flex</strong> — token-aware flexbox container with breakpoint-driven spacing and alignment.</li>
            <li><strong>Gallery</strong> — auto-fit grid for cards / tiles, with min/max width constraints per breakpoint.</li>
            <li><strong>Grid</strong> — 12-column grid with per-breakpoint span/offset controls.</li>
            <li><strong>Level</strong> — single horizontal row that distributes children with space-between.</li>
            <li><strong>Split</strong> — flex row where one item fills remaining space (the rest stay intrinsic).</li>
            <li><strong>Stack</strong> — vertical equivalent of Split; one item fills remaining height.</li>
          </ul>
        </Card>
      </Section>

      <Section
        title="When to reach for which"
        description="A short decision tree."
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
            <li><strong>Centering one thing</strong> → Bullseye.</li>
            <li><strong>Header bar with title left, actions right</strong> → Level (or Split with one filled item).</li>
            <li><strong>Vertical page chrome — header, scrolling body, footer</strong> → Stack with the body item <code>isFilled</code>.</li>
            <li><strong>Sidebar + content row</strong> → Split with the content item <code>isFilled</code>.</li>
            <li><strong>Grid of cards that wraps responsively</strong> → Gallery (you specify the min card width, the column count is derived).</li>
            <li><strong>Form with explicit column-span control per field</strong> → Grid.</li>
            <li><strong>Anything else flex-shaped</strong> → Flex.</li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Layouts vs utility classes vs custom CSS"
        description="The hierarchy the system encourages."
      >
        <Card>
          <div style={{ padding: 24, color: "var(--gp-color-text-regular)" }}>
            <ol
              style={{
                margin: 0,
                paddingInlineStart: 24,
                lineHeight: 1.8,
              }}
            >
              <li><strong>Layout components first.</strong> They&apos;re typed, documented, and respect brand tokens. Most page skeletons can be assembled without writing any CSS.</li>
              <li><strong>Utility classes for one-off tweaks.</strong> A bottom margin on a single heading, hide-on-mobile behavior — see the Utility classes section.</li>
              <li><strong>Custom CSS only when necessary.</strong> Reserved for component-specific patterns that the layout primitives can&apos;t express.</li>
            </ol>
          </div>
        </Card>
      </Section>

      <Section
        title="Brand awareness"
        description="Layouts inherit gap and spacing tokens automatically."
      >
        <Card>
          <div style={{ padding: 24, color: "var(--gp-color-text-regular)" }}>
            <p style={{ margin: 0 }}>
              The <code>spacer</code>, <code>gap</code>, and <code>hasGutter</code>{" "}
              props on these components resolve to PF6 spacing tokens, which
              the lib&apos;s <code>ThemeProvider</code> overrides with
              brand-specific values. A Flex with{" "}
              <code>spaceItems=&#123;{`{`} default: &apos;spaceItemsMd&apos; {`}`}&#125;</code>{" "}
              uses the active brand&apos;s <code>md</code> spacer in every
              brand — no per-brand overrides needed.
            </p>
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
