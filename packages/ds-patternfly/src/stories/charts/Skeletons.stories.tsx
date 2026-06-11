import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import {
  LineAreaSilhouette,
  BarSilhouette,
  DonutSilhouette,
} from "../../examples/charts/Skeletons.example.js";
import skeletonsExampleSrc from "../../examples/charts/Skeletons.example.tsx?raw";

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
          <Example
            source={skeletonsExampleSrc}
            region="LineAreaSilhouette"
            fileName="Skeletons.example.tsx"
            height={260}
          >
            <LineAreaSilhouette />
          </Example>
        </Card>
      </Section>

      <Section title="Bar silhouette">
        <Card>
          <Example
            source={skeletonsExampleSrc}
            region="BarSilhouette"
            fileName="Skeletons.example.tsx"
            height={260}
          >
            <BarSilhouette />
          </Example>
        </Card>
      </Section>

      <Section title="Donut silhouette">
        <Card>
          <Example
            source={skeletonsExampleSrc}
            region="DonutSilhouette"
            fileName="Skeletons.example.tsx"
            height={260}
          >
            <DonutSilhouette />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={skeletonsExampleSrc} fileName="Skeletons.example.tsx" />
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
