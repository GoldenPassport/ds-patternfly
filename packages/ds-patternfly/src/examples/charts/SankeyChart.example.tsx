/**
 * Sankey chart — flow visualization; values moving from one bucket to another.
 *
 * Requires @patternfly/react-charts (ECharts wrapper, beta) and echarts.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId } from "react";
import { Charts } from "@patternfly/react-charts/echarts";
import * as echarts from "echarts/core";
import { SankeyChart } from "echarts/charts";
import { TitleComponent, TooltipComponent } from "echarts/components";
import { SVGRenderer } from "echarts/renderers";
import { useTheme } from "@golden-passport/ds-patternfly";

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

// #region Basic
export function Basic() {
  const id = useId();
  const { mode } = useTheme();
  const labelColor = mode === "dark" ? "#f5f5f5" : "#151515";
  return (
    <Charts
      id={`${id}-sankey-basic`}
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
  );
}
// #endregion

export default function SankeyChartExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
    </div>
  );
}
