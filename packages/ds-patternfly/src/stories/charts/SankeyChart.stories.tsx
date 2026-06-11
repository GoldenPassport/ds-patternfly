import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "@golden-passport/ds-patternfly";
import { FoundationPage, Section, Card, CodeBlock, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { Basic } from "../../examples/charts/SankeyChart.example.js";
import sankeyChartExampleSrc from "../../examples/charts/SankeyChart.example.tsx?raw";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Sankey chart",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Sankey chart"
      intro={
        <>
          <Label color="yellow" isCompact>Beta</Label>
          {" "}
          Flow visualization — values moving from one bucket to another.
          Use for funnel analysis (signups → active → paying), traffic
          routing (region → service → endpoint), and budget allocation.
          PF6 ships a beta Sankey via the ECharts wrapper
          (<code>@patternfly/react-charts/echarts</code>); a hand-rolled{" "}
          <code>d3-sankey</code> recipe is shown below as an alternative.
        </>
      }
    >
      <Section title="Basic (ECharts wrapper)">
        <Card>
          <Example
            source={sankeyChartExampleSrc}
            region="Basic"
            fileName="SankeyChart.example.tsx"
            height={420}
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={sankeyChartExampleSrc} fileName="SankeyChart.example.tsx" />
        </Card>
      </Section>

      <Section title="Recipe (d3-sankey + PF6 theme tokens)">
        <Card>
          <div style={{ padding: 24 }}>
            <CodeBlock>{`import { sankey, sankeyLinkHorizontal } from "d3-sankey";

const nodes = [
  { name: "Free trial" },
  { name: "Activated" },
  { name: "Pro" },
  { name: "Enterprise" },
  { name: "Churned" },
];
const links = [
  { source: 0, target: 1, value: 480 },
  { source: 0, target: 4, value: 220 },
  { source: 1, target: 2, value: 320 },
  { source: 1, target: 3, value: 90 },
  { source: 1, target: 4, value: 70 },
];

function SankeyChart({ width = 600, height = 320 }) {
  const layout = sankey()
    .nodeWidth(15)
    .nodePadding(10)
    .extent([[1, 1], [width - 1, height - 6]]);
  const graph = layout({
    nodes: nodes.map(d => ({ ...d })),
    links: links.map(d => ({ ...d })),
  });

  return (
    <svg width={width} height={height} role="img" aria-label="User funnel">
      <title>User funnel</title>
      <desc>Flow from free trial through activation to paid plans and churn.</desc>
      {graph.links.map((l, i) => (
        <path
          key={i}
          d={sankeyLinkHorizontal()(l)}
          fill="none"
          stroke="var(--pf-t--chart--color--blue--300, #06c)"
          strokeOpacity={0.4}
          strokeWidth={Math.max(1, l.width)}
        />
      ))}
      {graph.nodes.map((n, i) => (
        <g key={i}>
          <rect
            x={n.x0}
            y={n.y0}
            width={(n.x1 ?? 0) - (n.x0 ?? 0)}
            height={(n.y1 ?? 0) - (n.y0 ?? 0)}
            fill="var(--pf-t--global--icon--color--regular, #151515)"
          />
          <text
            x={(n.x0 ?? 0) < width / 2 ? (n.x1 ?? 0) + 6 : (n.x0 ?? 0) - 6}
            y={((n.y0 ?? 0) + (n.y1 ?? 0)) / 2}
            dy="0.35em"
            textAnchor={(n.x0 ?? 0) < width / 2 ? "start" : "end"}
            fontSize={12}
            fill="var(--gp-color-text-regular)"
          >{n.name}</text>
        </g>
      ))}
    </svg>
  );
}`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Data shape">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "nodes", type: "{ name: string }[]", description: "The buckets. Order matters — d3-sankey lays them out left-to-right by index." },
                { name: "links", type: "{ source, target, value }[]", description: "Source / target reference node indices. Value drives the band thickness." },
                { name: "no cycles", type: "—", description: "Sankey requires a DAG. Loops crash the layout — pre-validate your data." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Rules">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Cap node count at ~12.</strong> Beyond that, bands cross and the chart becomes unreadable.</li>
            <li><strong>Sort nodes by stage</strong> so flow reads left-to-right. Don&rsquo;t mix dimensions per column.</li>
            <li><strong>Annotate the dominant flow.</strong> A label on the biggest band saves users from squinting at thicknesses.</li>
            <li><strong>Accessible alternative.</strong> Pair the chart with a Table of (source, target, value) — Sankey reads poorly to screen readers no matter what you try.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
