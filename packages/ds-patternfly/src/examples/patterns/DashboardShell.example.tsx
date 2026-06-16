/**
 * DashboardShell pattern — the lib's exported dashboard page scaffold: a
 * titled header band (+ actions slot), a built-in KPI strip (pass `kpis`), then
 * a content region you fill with charts and status cards. Chart libraries stay
 * in your app.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  DashboardShell,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Label,
  Progress,
  type DashboardKpi,
} from "@golden-passport/ds-patternfly";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@patternfly/react-icons";

// The KPI strip is now data — DashboardShell owns the tile chrome (big number,
// trend arrow + colour). `trend` reflects whether the change is good, not its
// sign: a falling failure count is still "up".
const KPIS: DashboardKpi[] = [
  { label: "Active workflows", value: "142", delta: "+12 (8%)", trend: "up" },
  { label: "Failed runs (24h)", value: "3", delta: "-2 (-40%)", trend: "up" },
  { label: "Avg runtime", value: "42s", delta: "+3s", trend: "down" },
  { label: "Pending approvals", value: "7", delta: "+1", trend: "flat" },
];

// #region OpsDashboard
export function OpsDashboard() {
  return (
    <DashboardShell
      title="Operations"
      description="Live workflow and system metrics."
      actions={<Button variant="secondary">Last 24h</Button>}
      kpis={KPIS}
    >
      <Grid hasGutter>
        <GridItem md={8}>
          <Card>
            <CardHeader>
              <CardTitle>Run volume — last 24h</CardTitle>
            </CardHeader>
            <CardBody>
              {/* Drop in @patternfly/react-charts (or your chart lib) here. */}
              <div
                style={{
                  height: 140,
                  display: "grid",
                  placeItems: "center",
                  color: "var(--gp-color-text-subtle)",
                  fontStyle: "italic",
                }}
              >
                chart placeholder
              </div>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem md={4}>
          <Card>
            <CardHeader>
              <CardTitle>System health</CardTitle>
            </CardHeader>
            <CardBody>
              <Flex direction={{ default: "column" }} spaceItems={{ default: "spaceItemsMd" }}>
                <FlexItem>
                  <Flex spaceItems={{ default: "spaceItemsSm" }} alignItems={{ default: "alignItemsCenter" }}>
                    <CheckCircleIcon color="var(--pf-t--global--icon--color--status--success--default, #3e8635)" />
                    <strong>API</strong>
                    <Label color="green" isCompact>Healthy</Label>
                  </Flex>
                </FlexItem>
                <FlexItem>
                  <Flex spaceItems={{ default: "spaceItemsSm" }} alignItems={{ default: "alignItemsCenter" }}>
                    <ExclamationTriangleIcon color="var(--pf-t--global--icon--color--status--warning--default, #f0ab00)" />
                    <strong>Queue</strong>
                    <Label color="yellow" isCompact>Degraded</Label>
                  </Flex>
                </FlexItem>
                <FlexItem>
                  <Progress value={62} title="Disk usage" />
                </FlexItem>
              </Flex>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </DashboardShell>
  );
}
// #endregion

export default function DashboardShellExample() {
  return <OpsDashboard />;
}
