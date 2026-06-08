import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "@patternfly/react-core";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@patternfly/react-table";
import { Severity } from "@patternfly/react-component-groups/dist/dynamic/Severity";
import { Status } from "@patternfly/react-component-groups/dist/dynamic/Status";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Patterns/Status and severity",
  parameters: {
    layout: "padded",
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

type Vuln = {
  id: string;
  cve: string;
  severity: "critical" | "important" | "moderate" | "minor" | "none";
  status: "danger" | "warning" | "success" | "info";
  statusLabel: string;
  cluster: string;
};

const ROWS: Vuln[] = [
  { id: "1", cve: "CVE-2026-0019", severity: "critical",  status: "danger",  statusLabel: "Unpatched",      cluster: "prod-east-1" },
  { id: "2", cve: "CVE-2026-0017", severity: "important", status: "warning", statusLabel: "Patch pending",  cluster: "prod-east-1" },
  { id: "3", cve: "CVE-2026-0012", severity: "moderate",  status: "success", statusLabel: "Patched",        cluster: "stage-eu-2" },
  { id: "4", cve: "CVE-2026-0008", severity: "minor",     status: "info",    statusLabel: "Accepted risk", cluster: "stage-eu-2" },
];

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Status and severity"
      intro={
        <>
          When a screen shows both <em>severity</em> (how bad?) and{" "}
          <em>status</em> (where are we in the workflow?), they&rsquo;re
          different signals and should look different.{" "}
          <code>Severity</code> uses a fixed ordinal scale (critical →
          minor); <code>Status</code> uses a fixed health scale (healthy
          → failed); <code>Label</code> handles everything else (tags,
          versions, products).
        </>
      }
    >
      <Section
        title="Triage row"
        description="Severity glyph + Status icon + descriptive Label, all in one row. Severity sorts ordinally; Status colours the health; Label carries the freeform context."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Table aria-label="Vulnerabilities" variant="compact">
                <Thead>
                  <Tr>
                    <Th>Severity</Th>
                    <Th>CVE</Th>
                    <Th>Status</Th>
                    <Th>Cluster</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {ROWS.map((r) => (
                    <Tr key={r.id}>
                      <Td dataLabel="Severity">
                        <Severity severity={r.severity} label={r.severity[0]!.toUpperCase() + r.severity.slice(1)} />
                      </Td>
                      <Td dataLabel="CVE"><strong>{r.cve}</strong></Td>
                      <Td dataLabel="Status">
                        <Status status={r.status} label={r.statusLabel} />
                      </Td>
                      <Td dataLabel="Cluster">
                        <Label isCompact>{r.cluster}</Label>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </DemoFrame>
            <CodeBlock>{`<Severity severity="critical" label="Critical" />
<Status   status="danger"    label="Unpatched" />
<Label isCompact>prod-east-1</Label>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="When to use each">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Severity</strong> — ordinal &ldquo;how bad&rdquo; scale. Critical / Important / Moderate / Minor / None / Undefined. Pre-defined set; sortable. Use for vulnerability triage, alert priority, incident grading.</li>
            <li><strong>Status</strong> — categorical &ldquo;health / state&rdquo; signal. Healthy / Degraded / Failed / Provisioning. Maps to <code>success / warning / danger / info / custom</code>. Use for object state in inventory tables, build / run pipelines, system health.</li>
            <li><strong>Label</strong> — freeform tag / version / category. Tags, env names, product tiers. Carries no semantic level — just colour-coded grouping. Use when neither severity nor status fits.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Rules">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>One severity per row.</strong> Don&rsquo;t stack severities — pick the highest and surface it; the others go in the detail view.</li>
            <li><strong>Sort by severity descending</strong> by default. Critical first; users open the page to find the worst thing.</li>
            <li><strong>Status text matters more than colour.</strong> &ldquo;Degraded&rdquo; is unambiguous; an orange icon alone isn&rsquo;t.</li>
            <li><strong>Don&rsquo;t paint Labels with status colours.</strong> A red Label means &ldquo;this is a red-flagged tag&rdquo;, not &ldquo;this thing is broken&rdquo; — use Status for state.</li>
            <li><strong>Keep the trio aligned across products.</strong> Same severity term, same colour, same icon — users moving between products shouldn&rsquo;t re-learn the language.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Colour + label, always.</strong> Severity and Status both ship label-required APIs — use them. Colour alone fails WCAG 1.4.1.</li>
            <li><strong>Icon-only variants need <code>iconTitle</code> / <code>labelHidden</code>+<code>label</code>.</strong> Don&rsquo;t leave the accessible name to chance.</li>
            <li><strong>Sort the column by ordinal severity</strong>, not alphabetical. &ldquo;Critical&rdquo; sorts before &ldquo;Important&rdquo;, not after.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
