import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "@golden-passport/ds-patternfly";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Components/Skeleton",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Skeleton"
      intro={
        <>
          A placeholder shape that mimics the layout of content while it
          loads. Better than a spinner for first-page loads — gives users
          a sense of structure before data arrives, reduces perceived wait
          time.
        </>
      }
    >
      <Section title="Common shapes">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ display: "grid", gap: 12 }}>
                <Skeleton width="40%" screenreaderText="Loading title" />
                <Skeleton width="100%" />
                <Skeleton width="100%" />
                <Skeleton width="80%" />
              </div>
            </DemoFrame>
            <CodeBlock>{`<Skeleton width="40%" screenreaderText="Loading title" />
<Skeleton width="100%" />`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Card placeholder" description="A skeleton that mirrors the shape of the loaded UI.">
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <div
                style={{
                  border: "1px solid var(--gp-color-border-subtle)",
                  borderRadius: "var(--gp-radius-md)",
                  padding: 16,
                  display: "grid",
                  gap: 12,
                  background: "var(--gp-color-bg-primary-default)",
                }}
              >
                <Skeleton shape="circle" width="48px" height="48px" screenreaderText="Loading avatar" />
                <Skeleton width="60%" />
                <Skeleton width="100%" />
                <Skeleton width="100%" />
                <Skeleton width="40%" />
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                {
                  name: "width",
                  type: "string",
                  description: 'Width as a CSS value ("100%", "200px", "40%").',
                },
                {
                  name: "height",
                  type: "string",
                  description: 'Height. Defaults to text line-height — set explicitly for non-text shapes.',
                },
                {
                  name: "shape",
                  type: '"square" | "circle"',
                  description: "Default is a rounded rectangle. Use circle for avatar placeholders.",
                },
                {
                  name: "fontSize",
                  type: '"sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"',
                  description: "Match the height of a known text size — Skeleton sizes accordingly.",
                },
                {
                  name: "screenreaderText",
                  type: "string",
                  description: 'Optional AT-only label. Use sparingly — see accessibility notes.',
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section
        title="Accessibility"
        description="Skeletons are visual hints — let live regions do the announcing."
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
              <strong>Don&apos;t flood AT with skeleton labels.</strong> Ten
              skeletons in a list don&apos;t need ten &quot;loading…&quot; reads.
              Set <code>screenreaderText</code> on the first one and leave
              the rest silent.
            </li>
            <li>
              <strong>Wrap the loading region in an aria-live region</strong> so AT users
              hear when content arrives — a single &quot;Loaded 12 tasks&quot;
              announcement is better than a hundred individual skeleton
              labels.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="When to use it"
        description="Skeletons vs spinners vs nothing."
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
            <li><strong>First-time data load &gt; 500ms</strong> → Skeleton.</li>
            <li><strong>Brief, indeterminate background work</strong> → Spinner.</li>
            <li><strong>Subsequent reloads where layout is already on screen</strong> → leave the existing UI, show a small inline spinner.</li>
            <li><strong>Match the shape of the loaded UI.</strong> A skeleton that doesn&apos;t resemble the final layout is worse than no skeleton — it teaches users the wrong shape.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
