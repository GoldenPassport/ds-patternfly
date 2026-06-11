/**
 * Dashboard — the standard ops dashboard: KPI strip across the top, a wider
 * chart card, a sidebar of status cards. Built from Gallery + Grid + Card;
 * no special dashboard component required.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Flex,
  FlexItem,
  Gallery,
  GalleryItem,
  Grid,
  GridItem,
  Label,
  Progress,
} from "../_lib.js";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@patternfly/react-icons";

/** KPI tile — big number + sub-label + delta with trend arrow. */
function KPI({
  label,
  value,
  delta,
  trend,
}: {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
}) {
  return (
    <Card isCompact>
      <CardBody>
        <div style={{ color: "var(--gp-color-text-subtle)", fontSize: 13 }}>
          {label}
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "var(--gp-color-text-regular)",
          }}
        >
          {value}
        </div>
        <div
          style={{
            marginTop: 4,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            color:
              trend === "up"
                ? "var(--pf-t--global--icon--color--status--success--default, #3e8635)"
                : "var(--pf-t--global--icon--color--status--danger--default, #c9190b)",
            fontSize: 13,
          }}
        >
          {trend === "up" ? <ArrowUpIcon /> : <ArrowDownIcon />}
          {delta}
        </div>
      </CardBody>
    </Card>
  );
}

/** Placeholder chart panel — drop in @patternfly/react-charts when real. */
function ChartPlaceholder({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardBody>
        <div
          style={{
            height: 140,
            background:
              "linear-gradient(180deg, rgba(0,102,204,0.10), rgba(0,102,204,0.02))",
            border: "1px dashed var(--gp-color-border-subtle)",
            borderRadius: 8,
            display: "grid",
            placeItems: "center",
            color: "var(--gp-color-text-subtle)",
            fontStyle: "italic",
          }}
        >
          chart placeholder — drop in @patternfly/react-charts
        </div>
      </CardBody>
    </Card>
  );
}

/** Sidebar status card — icon + label + status chip + a progress bar. */
function StatusCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System health</CardTitle>
      </CardHeader>
      <CardBody>
        <Flex
          direction={{ default: "column" }}
          spaceItems={{ default: "spaceItemsMd" }}
        >
          <FlexItem>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <CheckCircleIcon
                style={{
                  color:
                    "var(--pf-t--global--icon--color--status--success--default, #3e8635)",
                }}
              />
              <strong>API</strong>
              <Label color="green" isCompact>
                Healthy
              </Label>
            </div>
          </FlexItem>
          <FlexItem>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <ExclamationTriangleIcon
                style={{
                  color:
                    "var(--pf-t--global--icon--color--status--warning--default, #f0ab00)",
                }}
              />
              <strong>Queue</strong>
              <Label color="yellow" isCompact>
                Degraded
              </Label>
            </div>
          </FlexItem>
          <FlexItem>
            <Progress value={62} title="Disk usage" />
          </FlexItem>
        </Flex>
      </CardBody>
    </Card>
  );
}

// #region DashboardContent
/** The dashboard body — KPI strip (Gallery), then chart + sidebar (Grid). */
export function DashboardContent() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Gallery hasGutter minWidths={{ default: "180px" }}>
        <GalleryItem>
          <KPI
            label="Active workflows"
            value="142"
            delta="+12 (8%)"
            trend="up"
          />
        </GalleryItem>
        <GalleryItem>
          <KPI
            label="Failed runs (24h)"
            value="3"
            delta="-2 (-40%)"
            trend="down"
          />
        </GalleryItem>
        <GalleryItem>
          <KPI label="Avg runtime" value="42s" delta="+3s" trend="down" />
        </GalleryItem>
        <GalleryItem>
          <KPI
            label="Pending approvals"
            value="7"
            delta="+1"
            trend="up"
          />
        </GalleryItem>
      </Gallery>
      <Grid hasGutter>
        <GridItem md={8}>
          <ChartPlaceholder title="Run volume — last 24h" />
        </GridItem>
        <GridItem md={4}>
          <StatusCard />
        </GridItem>
      </Grid>
    </div>
  );
}
// #endregion

export default function DashboardExample() {
  return (
    <div style={{ padding: 24 }}>
      <DashboardContent />
    </div>
  );
}
