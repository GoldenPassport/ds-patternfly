import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card as DocCard,
  Example,
} from "../_kit/StoryKit.js";
import { DashboardContent } from "../../examples/patterns/Dashboard.example.js";
import dashboardExampleSrc from "../../examples/patterns/Dashboard.example.tsx?raw";

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
          <Example
            source={dashboardExampleSrc}
            region="DashboardContent"
            fileName="Dashboard.example.tsx"
          >
            <DashboardContent />
          </Example>
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

      <Section
        title="Full example"
        description="The complete example file behind the demo above — ready to drop into an app, and shipped verbatim in the MCP docs catalog."
      >
        <DocCard>
          <Example
            source={dashboardExampleSrc}
            fileName="Dashboard.example.tsx"
          />
        </DocCard>
      </Section>
    </FoundationPage>
  ),
};
