import type { Meta, StoryObj } from "@storybook/react-vite";
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
} from "@patternfly/react-core";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@patternfly/react-icons";
import {
  FoundationPage,
  Section,
  Card as DocCard,
  CodeBlock,
} from "../_kit/StoryKit.js";
import { DemoFrame } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Patterns/Dashboard",
  parameters: {
    layout: "padded",
    // Demo content uses placeholder bg gradients with sub-AA contrast
    // on labels — disable the rule so the surrounding chrome a11y
    // results stay actionable.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

// ──────────────────────────────────────────────────────────────────
// Shared dashboard building blocks
// ──────────────────────────────────────────────────────────────────

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

/** The dashboard body — used by both Basic and AppShell stories. */
function DashboardContent() {
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

// ──────────────────────────────────────────────────────────────────
// Story: Basic
// ──────────────────────────────────────────────────────────────────

export const Basic: StoryObj = {
  render: () => (
    <FoundationPage
      title="Dashboard — Basic"
      intro={
        <>
          The standard ops dashboard — KPI strip across the top, a wider
          chart card, a sidebar of status cards. Built from{" "}
          <code>Gallery</code> + <code>Grid</code> + <code>Card</code>;
          no special dashboard component required. For the full
          app-shell version with masthead + nav, see{" "}
          <strong>AppShell</strong>.
        </>
      }
    >
      <Section
        title="KPI strip + main content + sidebar"
        description="Gallery for the KPI tiles (responsive column count), Grid for the chart + sidebar split below. Stacks vertically below the md breakpoint."
      >
        <DocCard>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <DashboardContent />
            </DemoFrame>
            <CodeBlock>{`<Gallery hasGutter minWidths={{ default: "180px" }}>
  <GalleryItem><KPI label="Active workflows" value="142" delta="+12 (8%)" trend="up" /></GalleryItem>
  {/* … */}
</Gallery>
<Grid hasGutter>
  <GridItem md={8}><Card>{/* chart */}</Card></GridItem>
  <GridItem md={4}><Card>{/* health sidebar */}</Card></GridItem>
</Grid>`}</CodeBlock>
          </div>
        </DocCard>
      </Section>

      <Section title="Patterns">
        <DocCard>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <strong>KPI strip first.</strong> The 4–6 numbers a user
              opens the page to check. Keep them above the fold.
            </li>
            <li>
              <strong>Main + sidebar split.</strong> Grid{" "}
              <code>md=8/4</code> — chart left, status/activity right.
              Stack vertically below md.
            </li>
            <li>
              <strong>
                Charts go behind <code>React.lazy</code>
              </strong>{" "}
              — react-charts pulls in Victory; gate it so dashboards
              don&rsquo;t bloat unrelated pages.
            </li>
            <li>
              <strong>Refresh frequency.</strong> Auto-refresh every
              30–60s with a paused state on tab blur — don&rsquo;t
              hammer the API while no one&rsquo;s looking.
            </li>
            <li>
              <strong>Empty state for new accounts.</strong> A
              dashboard with all zeros is bleak — render a &ldquo;Get
              started&rdquo; EmptyState until the first run.
            </li>
          </ul>
        </DocCard>
      </Section>

      <Section title="Accessibility">
        <DocCard>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <strong>KPIs need labels.</strong> The big number is
              meaningless without &ldquo;Active workflows&rdquo; — pair
              them with proper heading semantics.
            </li>
            <li>
              <strong>Trend icons need text.</strong> Up arrow + green
              colour is meaningless to screen readers and colour-blind
              users — render the percentage alongside.
            </li>
            <li>
              <strong>Charts need accessible alternatives.</strong>{" "}
              Provide a data-table view behind a toggle, or expose the
              underlying numbers in a tooltip / aria-label.
            </li>
          </ul>
        </DocCard>
      </Section>
    </FoundationPage>
  ),
};

