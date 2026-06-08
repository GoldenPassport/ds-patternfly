import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "@patternfly/react-core";
import { Charts } from "@patternfly/react-charts/echarts";
import * as echarts from "echarts/core";
import { SankeyChart } from "echarts/charts";
import { TitleComponent, TooltipComponent } from "echarts/components";
import { SVGRenderer } from "echarts/renderers";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";
import { chartA11yParams } from "./_chartKit.js";
import { useTheme } from "../../theme/ThemeProvider.js";

// Register only the ECharts pieces the Sankey needs (tree-shakeable).
echarts.use([SankeyChart, SVGRenderer, TitleComponent, TooltipComponent]);

// A realistic SaaS funnel: free trial → activated → paid plans / churn.
const sankeyNodes = [
  { name: "Free trial" },
  { name: "Activated" },
  { name: "Pro" },
  { name: "Enterprise" },
  { name: "Churned" },
];
const sankeyLinks = [
  { source: "Free trial", target: "Activated", value: 480 },
  { source: "Free trial", target: "Churned", value: 220 },
  { source: "Activated", target: "Pro", value: 320 },
  { source: "Activated", target: "Enterprise", value: 90 },
  { source: "Activated", target: "Churned", value: 70 },
];

const meta: Meta = {
  title: "Charts/Sankey chart",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const { mode } = useTheme();
    const labelColor = mode === "dark" ? "#f5f5f5" : "#151515";
    return (
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
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame height={420}>
              <Charts
                id="sankey-basic"
                nodeSelector="html"
                height={360}
                width={760}
                option={{
                  aria: {
                    enabled: true,
                    label: {
                      description:
                        "User funnel: free trial through activation to paid plans and churn.",
                    },
                  },
                  series: [
                    {
                      type: "sankey",
                      data: sankeyNodes,
                      links: sankeyLinks,
                      label: { color: labelColor },
                      lineStyle: { color: "gradient", opacity: 0.4 },
                    },
                  ],
                  tooltip: {
                    sourceLabel: "From",
                    destinationLabel: "To",
                    valueFormatter: (value: unknown) => `${value as number} users`,
                  },
                }}
              />
            </DemoFrame>
            <CodeBlock>{`import { Charts } from "@patternfly/react-charts/echarts";
import * as echarts from "echarts/core";
import { SankeyChart } from "echarts/charts";
import { TitleComponent, TooltipComponent } from "echarts/components";
import { SVGRenderer } from "echarts/renderers";

echarts.use([SankeyChart, SVGRenderer, TitleComponent, TooltipComponent]);

const data = [
  { name: "Free trial" }, { name: "Activated" }, { name: "Pro" },
  { name: "Enterprise" }, { name: "Churned" },
];
const links = [
  { source: "Free trial", target: "Activated",  value: 480 },
  { source: "Free trial", target: "Churned",    value: 220 },
  { source: "Activated",  target: "Pro",         value: 320 },
  { source: "Activated",  target: "Enterprise",  value: 90  },
  { source: "Activated",  target: "Churned",     value: 70  },
];

<Charts
  id="sankey-basic"
  height={360}
  width={760}
  option={{
    series: [{ type: "sankey", data, links }],
    tooltip: {
      sourceLabel: "From",
      destinationLabel: "To",
      valueFormatter: (value) => \`\${value} users\`,
    },
  }}
/>`}</CodeBlock>
          </div>
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
    );
  },
};
