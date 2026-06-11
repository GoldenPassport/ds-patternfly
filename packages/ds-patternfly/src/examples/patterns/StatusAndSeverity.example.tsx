/**
 * Status and severity pattern — combining Severity (how bad?), Status
 * (where in the workflow?), and Label (freeform context) in one triage row.
 *
 * Severity and Status come from @patternfly/react-component-groups
 * (installed alongside the lib).
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import {
  Label,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "../_lib.js";
import { Severity } from "@patternfly/react-component-groups/dist/dynamic/Severity";
import { Status } from "@patternfly/react-component-groups/dist/dynamic/Status";

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

// #region TriageRow
export function TriageRow() {
  return (
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
  );
}
// #endregion

export default function StatusAndSeverityExample() {
  return <TriageRow />;
}
