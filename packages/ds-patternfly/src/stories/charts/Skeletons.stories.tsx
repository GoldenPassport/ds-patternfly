import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "@golden-passport/ds-patternfly";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { DemoFrame } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Charts/Skeletons",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Skeletons"
      intro={
        <>
          The loading state for a chart — a placeholder that occupies the
          same footprint as the real chart so the page doesn&rsquo;t
          jump when data arrives. PF6 doesn&rsquo;t ship a chart-specific
          skeleton; compose with <code>Skeleton</code> shapes that
          mimic the eventual chart silhouette.
        </>
      }
    >
      <Section title="Line / area silhouette">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame height={260}>
              <div style={{ position: "relative", height: 240, padding: 12 }}>
                <Skeleton height="100%" width="100%" screenreaderText="Loading chart" />
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Bar silhouette">
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame height={260}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 16,
                  padding: 12,
                  height: 240,
                }}
                role="img"
                aria-busy="true"
                aria-label="Loading chart"
              >
                {[0.4, 0.7, 0.55, 0.8, 0.3, 0.6].map((h, i) => (
                  <Skeleton key={i} width="40px" height={`${h * 100}%`} screenreaderText="" />
                ))}
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Donut silhouette">
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame height={260}>
              <div
                style={{ display: "grid", placeItems: "center", height: 240 }}
                role="img"
                aria-busy="true"
                aria-label="Loading donut chart"
              >
                <Skeleton shape="circle" width="180px" height="180px" />
              </div>
            </DemoFrame>
            <CodeBlock>{`<div aria-busy="true" aria-label="Loading donut chart">
  <Skeleton shape="circle" width="180px" height="180px" />
</div>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Rules">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Match the final size.</strong> The skeleton box should be the same dimensions as the chart that replaces it — otherwise the page reflows on data arrival.</li>
            <li><strong>Set <code>aria-busy=&quot;true&quot;</code></strong> on the wrapping container so screen readers don&rsquo;t announce skeleton bars as content.</li>
            <li><strong>Don&rsquo;t leave it on forever.</strong> If load &gt; 30s, swap to an ErrorState — a perpetual skeleton signals dead UI.</li>
            <li><strong>Don&rsquo;t shimmer everywhere.</strong> If the page has 8 charts, the cumulative shimmer is distracting. Render one skeleton per chart, not one per bar.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
