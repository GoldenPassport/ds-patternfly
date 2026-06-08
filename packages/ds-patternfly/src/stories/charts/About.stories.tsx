import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card } from "../../components/StoryKit.js";

const meta: Meta = {
  title: "Charts",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="About charts"
      intro={
        <>
          PatternFly Charts is a thin wrapper around{" "}
          <a href="https://commerce.nearform.com/open-source/victory/" target="_blank" rel="noopener noreferrer">
            Victory
          </a>{" "}
          (Formidable&rsquo;s composable React chart library) — same API,
          PF6 theming, sensible defaults, and accessibility hooks baked
          in. From <code>@patternfly/react-charts</code>. Use it for
          dashboards, monitoring screens, and any product visualisation.
        </>
      }
    >
      <Section title="What ships in this section">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Chart types</strong> — Area, Bar, Box plot, Bullet, Donut, Donut utilization, Line, Pie, Sankey, Scatter, Sparkline, Stack, Threshold.</li>
            <li><strong>Cross-cutting concerns</strong> — Colors, Legends, Patterns, Resize observer, Skeletons, Themes, Tooltips.</li>
            <li><strong>Build on top of these</strong>. Each chart accepts standard Victory props plus PF6-themed defaults; drop in whatever the underlying Victory component expects.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Picking a chart type">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Trends over time</strong> — Line, Area (filled line). Use Line for multiple series, Area when emphasis is the cumulative total.</li>
            <li><strong>Compare categories</strong> — Bar (vertical or horizontal). Use horizontal when labels are long.</li>
            <li><strong>Parts of a whole</strong> — Donut (with centre label) or Pie. Cap at ~6 slices — donuts with 12 wedges read as noise.</li>
            <li><strong>Single-metric utilisation</strong> — Donut utilization (one threshold-coloured arc + centre count).</li>
            <li><strong>One number with context</strong> — Bullet chart — actual value + target + qualitative bands.</li>
            <li><strong>Distribution</strong> — Box plot for quartiles; Scatter for individual points.</li>
            <li><strong>Stacked categories</strong> — Stack chart (bar or area variant).</li>
            <li><strong>Spark / mini-chart in a row</strong> — Sparkline (compact Line without axes).</li>
            <li><strong>Flow between buckets</strong> — Sankey (beta).</li>
          </ul>
        </Card>
      </Section>

      <Section title="Performance">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Lazy-load charts.</strong> The Victory tree is heavy — gate behind <code>React.lazy</code> so non-dashboard pages don&rsquo;t pay the cost.</li>
            <li><strong>Cap data points.</strong> &gt; 1,000 points per series will degrade. Bucket / downsample at the data layer.</li>
            <li><strong>Reuse Theme objects.</strong> Build the theme once at module scope; passing a new object each render reflows.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Every chart needs <code>ariaTitle</code> + <code>ariaDesc</code>.</strong> Title names what the chart shows; desc summarises the trend.</li>
            <li><strong>Provide a data table view.</strong> Behind a toggle, render the underlying numbers as a Table — screen-reader users and screenshot consumers both benefit.</li>
            <li><strong>Don&rsquo;t rely on colour alone.</strong> Use patterns / shapes for the second-best signal, especially for danger / threshold variants.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
