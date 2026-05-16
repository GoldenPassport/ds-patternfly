import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Charts/Sankey chart",
  parameters: { layout: "padded" },
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
          PF6&rsquo;s Sankey API is still beta; current best practice is
          to compose <code>d3-sankey</code> inside a PF6-themed SVG until
          the wrapper stabilises.
        </>
      }
    >
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
