import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardTitle,
  Flex,
  FlexItem,
  Label,
} from "@patternfly/react-core";
import { ChevronRightIcon, BellIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card as DocCard, CodeBlock } from "../_storyKit.js";
import { DemoFrame } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Patterns/Right-to-left/Demo",
  parameters: {
    layout: "padded",
    a11y: {
      // Two side-by-side Breadcrumbs (LTR + RTL) intentionally render
      // duplicate landmarks for the doc comparison.
      config: {
        rules: [
          { id: "color-contrast", enabled: false },
          { id: "landmark-unique", enabled: false },
        ],
      },
    },
  },
};
export default meta;

export const Demo: StoryObj = {
  render: () => (
    <FoundationPage
      title="Right-to-left"
      intro={
        <>
          PF6 ships RTL support via <code>dir=&quot;rtl&quot;</code> + logical
          CSS properties (<code>margin-inline-*</code>,{" "}
          <code>padding-inline-*</code>, <code>inset-inline-*</code>). The
          lib&rsquo;s <code>ThemeProvider</code> takes a <code>dir</code> prop
          that flips the entire tree. Use the toolbar Direction
          control in this Storybook to flip the whole preview.
        </>
      }
    >
      <Section
        title="The same view in LTR vs RTL"
        description="Render two copies inside dir-scoped containers. Notice icons stay in their semantic positions (back arrow always points to history)."
      >
        <DocCard>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Flex direction={{ default: "column" }} spaceItems={{ default: "spaceItemsLg" }}>
                <FlexItem>
                  <div style={{ marginBottom: 8, color: "var(--gp-color-text-subtle)", fontSize: 13 }}>
                    LTR
                  </div>
                  <div dir="ltr">
                    <PreviewBlock />
                  </div>
                </FlexItem>
                <FlexItem>
                  <div style={{ marginBottom: 8, color: "var(--gp-color-text-subtle)", fontSize: 13 }}>
                    RTL
                  </div>
                  <div dir="rtl">
                    <PreviewBlock />
                  </div>
                </FlexItem>
              </Flex>
            </DemoFrame>
            <CodeBlock>{`<ThemeProvider brand={brand} dir="rtl">
  <App />
</ThemeProvider>`}</CodeBlock>
          </div>
        </DocCard>
      </Section>

      <Section title="Rules">
        <DocCard>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Logical CSS properties.</strong> Use <code>margin-inline-start</code> / <code>padding-inline-end</code> instead of <code>margin-left</code> / <code>padding-right</code>. PF6 ships with logical properties; your custom CSS should follow suit.</li>
            <li><strong>PF6 icons handle directionality</strong> automatically for navigation chevrons. A &ldquo;next&rdquo; arrow points right in LTR, left in RTL — don&rsquo;t flip it manually.</li>
            <li><strong>Don&rsquo;t mirror &ldquo;real-world&rdquo; icons.</strong> Play, pause, gear, search — these stay in their canonical orientation regardless of dir.</li>
            <li><strong>Strings, not just chrome.</strong> Hardcoded English labels stay LTR-looking inside an RTL document — use the lib&rsquo;s <code>*Labels</code> types + a real i18n library.</li>
            <li><strong>Tables flip.</strong> Header cells, sort glyphs, scrollbars — all mirror correctly when the table&rsquo;s ancestor sets <code>dir=&quot;rtl&quot;</code>. No PF6 overrides needed.</li>
          </ul>
        </DocCard>
      </Section>

      <Section title="Testing RTL">
        <DocCard>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Toolbar toggle.</strong> The Direction globalType in this Storybook flips every story — useful for visual regression.</li>
            <li><strong>Run with a real RTL locale</strong> (ar / he / fa) — bidi-aware screen readers behave differently with real RTL strings than with English in <code>dir=&quot;rtl&quot;</code>.</li>
            <li><strong>Snapshot both directions in CI.</strong> A LTR-clean component can still leak <code>left:</code> / <code>right:</code> styles that break RTL — the only way to catch it is to render both.</li>
            <li><strong>Grep for <code>left:</code> and <code>right:</code></strong> in your custom styles. Replace with <code>inset-inline-start</code> / <code>inset-inline-end</code>.</li>
          </ul>
        </DocCard>
      </Section>

      <Section title="Accessibility">
        <DocCard>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>dir on a real element.</strong> Don&rsquo;t fake RTL with CSS-only transforms — assistive tech reads <code>dir</code> from the DOM. The lib&rsquo;s ThemeProvider sets it on its wrapping element.</li>
            <li><strong>Bidi text isolation.</strong> When mixing scripts (English code inside Arabic body copy), wrap the foreign-direction span in <code>&lt;bdi&gt;</code> so the bidi algorithm doesn&rsquo;t reorder neighbouring punctuation.</li>
            <li><strong>Don&rsquo;t hardcode the &ldquo;back&rdquo; affordance.</strong> Use a chevron that&rsquo;s reflected by <code>dir</code>, or pair both directions with text (&ldquo;Back&rdquo; / &ldquo;العودة&rdquo;).</li>
          </ul>
        </DocCard>
      </Section>
    </FoundationPage>
  ),
};

function PreviewBlock() {
  return (
    <Card>
      <CardBody>
        <Breadcrumb>
          <BreadcrumbItem to="#">Workflows</BreadcrumbItem>
          <BreadcrumbItem to="#" isActive>
            Quarterly review
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex
          style={{ marginTop: 12 }}
          alignItems={{ default: "alignItemsCenter" }}
          spaceItems={{ default: "spaceItemsSm" }}
        >
          <FlexItem>
            <CardTitle>Quarterly review</CardTitle>
          </FlexItem>
          <FlexItem>
            <Label color="green" isCompact>Active</Label>
          </FlexItem>
          <FlexItem align={{ default: "alignRight" }}>
            <Button variant="primary">
              Run <ChevronRightIcon />
            </Button>
          </FlexItem>
        </Flex>
        <p style={{ marginTop: 12, color: "var(--gp-color-text-subtle)" }}>
          Triggered hourly · 4 steps · last run 12 minutes ago
        </p>
        <Flex spaceItems={{ default: "spaceItemsSm" }} style={{ marginTop: 8 }}>
          <FlexItem><BellIcon /></FlexItem>
          <FlexItem>3 pending notifications</FlexItem>
        </Flex>
      </CardBody>
    </Card>
  );
}
