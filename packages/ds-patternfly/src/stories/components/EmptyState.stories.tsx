import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
  Spinner,
} from "@patternfly/react-core";
import {
  CubesIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  SearchIcon,
} from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/EmptyState",
  parameters: {
    layout: "padded",
    a11y: {
      config: {
        // Each EmptyState renders its title as the headingLevel passed
        // (default h2 here). The doc page renders many empty states inside
        // section <h2>s for illustration, which skips levels — flagged by
        // heading-order. Real-app usage (one empty state per view, with
        // headingLevel matching the page outline) doesn't hit this.
        rules: [{ id: "heading-order", enabled: false }],
      },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="EmptyState"
      intro={
        <>
          The placeholder a list / table / view shows when it has no content
          yet. Three jobs: orient the user (icon + title), explain the state
          (body), and offer a way out (action). Use it for empty
          collections, no-results-after-filter, error states, and
          loading states.
        </>
      }
    >
      <Section
        title="Basic"
        description="Icon + title + body + a primary action that lets the user populate the list. Use this shape when the collection has never had anything in it (first-run / empty workspace)."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <EmptyState
                titleText="No projects yet"
                headingLevel="h2"
                icon={CubesIcon}
              >
                <EmptyStateBody>
                  Projects collect related workflows and resources.
                  Create your first one to get started.
                </EmptyStateBody>
                <EmptyStateFooter>
                  <EmptyStateActions>
                    <Button variant="primary">Create project</Button>
                  </EmptyStateActions>
                  <EmptyStateActions>
                    <Button variant="link">Import from template</Button>
                    <Button variant="link">View documentation</Button>
                  </EmptyStateActions>
                </EmptyStateFooter>
              </EmptyState>
            </DemoFrame>
            <CodeBlock>{`<EmptyState titleText="No projects yet" headingLevel="h2" icon={CubesIcon}>
  <EmptyStateBody>
    Projects collect related workflows and resources. Create your first one
    to get started.
  </EmptyStateBody>
  <EmptyStateFooter>
    <EmptyStateActions>
      <Button variant="primary">Create project</Button>
    </EmptyStateActions>
    <EmptyStateActions>
      <Button variant="link">Import from template</Button>
      <Button variant="link">View documentation</Button>
    </EmptyStateActions>
  </EmptyStateFooter>
</EmptyState>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="No results found (filter empty state)"
        description="Different shape from the first-run empty state — the user already had data and filtered it away. Surface a clear escape ('Clear filters') as the primary action; the icon is a search/filter glyph, not the collection's identity icon."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <EmptyState
                titleText="No matching tasks"
                headingLevel="h2"
                icon={SearchIcon}
              >
                <EmptyStateBody>
                  No tasks match the current filters. Try clearing some
                  filters or broadening the search.
                </EmptyStateBody>
                <EmptyStateFooter>
                  <EmptyStateActions>
                    <Button variant="link">Clear all filters</Button>
                  </EmptyStateActions>
                </EmptyStateFooter>
              </EmptyState>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Loading"
        description="Pass a Spinner as the icon for an in-flight loader empty state. Use when the surrounding view doesn't already show a different loading affordance and the wait is long enough to need orientation."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <EmptyState
                titleText="Loading"
                headingLevel="h2"
                icon={Spinner}
              />
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="With status"
        description="status drives a tinted icon background for success / warning / danger / info / custom. Use for end-state confirmations or error states where the colour cue helps."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <EmptyState
                status="danger"
                titleText="Couldn't load tasks"
                headingLevel="h2"
                icon={ExclamationCircleIcon}
              >
                <EmptyStateBody>
                  The server returned an error. Retry the request, or check
                  the run logs for details.
                </EmptyStateBody>
                <EmptyStateFooter>
                  <EmptyStateActions>
                    <Button variant="primary">Retry</Button>
                    <Button variant="link">View logs</Button>
                  </EmptyStateActions>
                </EmptyStateFooter>
              </EmptyState>
            </DemoFrame>
            <DemoFrame>
              <EmptyState
                status="warning"
                titleText="Partial results"
                headingLevel="h2"
                icon={ExclamationTriangleIcon}
              >
                <EmptyStateBody>
                  Some sources returned no data. Showing what loaded
                  successfully.
                </EmptyStateBody>
              </EmptyState>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Sizes"
        description="variant controls the overall scale (xs / sm / lg / xl). Default works for full-page placeholders; use sm inside Drawer / Popover / Card; xs for inline empty rows."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <DemoFrame>
              <EmptyState
                variant="xs"
                titleText="Inline empty"
                headingLevel="h4"
              >
                <EmptyStateBody>For empty rows in a list.</EmptyStateBody>
              </EmptyState>
            </DemoFrame>
            <DemoFrame>
              <EmptyState
                variant="sm"
                titleText="Compact empty"
                headingLevel="h4"
                icon={CubesIcon}
              >
                <EmptyStateBody>
                  For empty Drawers / Cards / Popovers.
                </EmptyStateBody>
              </EmptyState>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Composition">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "EmptyState", type: "container", description: "The wrapper. Owns titleText, headingLevel, icon, status, variant." },
                { name: "EmptyStateBody", type: "child", description: "Descriptive prose under the title. Keep to 1–2 sentences." },
                { name: "EmptyStateFooter", type: "child", description: "Slot for action clusters." },
                { name: "EmptyStateActions", type: "child", description: "Group of action buttons. Use multiple EmptyStateActions to separate primary action from secondary links." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "titleText", type: "string", description: "The headline. Required." },
                { name: "headingLevel", type: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6"', description: "HTML heading element. Match your page outline (full-page empty state → h1 or h2)." },
                { name: "icon", type: "ComponentType | ReactElement", description: "Icon component (CubesIcon, SearchIcon) or React element (Spinner) — anchors the visual identity of the empty state." },
                { name: "status", type: '"success" | "warning" | "danger" | "info" | "custom"', description: "Tints the icon background with the brand status palette. Omit for neutral empty states." },
                { name: "variant", type: '"xs" | "sm" | "lg" | "xl"', description: "Overall scale. Default works for full-page placeholders." },
                { name: "isFullHeight", type: "boolean", description: "Stretch to fill the parent — useful when the empty state replaces a long table / list." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Empty state shapes">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>First-run / never had data</strong> — collection icon + onboarding action (&ldquo;Create your first…&rdquo;).</li>
            <li><strong>No-results-after-filter</strong> — search/filter icon + escape action (&ldquo;Clear filters&rdquo;).</li>
            <li><strong>Permission denied</strong> — lock icon + contact-admin escape, status=&ldquo;warning&rdquo;.</li>
            <li><strong>Error / failure</strong> — error icon + retry, status=&ldquo;danger&rdquo;.</li>
            <li><strong>Loading</strong> — Spinner as icon, no actions.</li>
            <li><strong>Success terminal state</strong> — checkmark icon + next step (&ldquo;Job complete · view results&rdquo;), status=&ldquo;success&rdquo;.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>headingLevel must match the page outline.</strong> An empty state replacing a section&rsquo;s table should use the same level the table heading would have used.</li>
            <li><strong>Title is the announcement.</strong> Lead with the state (&ldquo;No projects yet&rdquo;) — body and actions don&rsquo;t get announced when the page lands on the empty state.</li>
            <li><strong>Always offer a way out.</strong> Even error states should have a retry / contact-support link — not just a wall of text.</li>
          </ul>
        </Card>
      </Section>
      <ThemingPointer
        dials={[
          ["--gp-text-default", "Title colour."],
          ["--gp-text-subtle", "Body copy colour."],
          ["--gp-pad-section", "Vertical padding around the centred block."],
          ["--gp-gap-paragraph", "Gap between title, body, and actions."],
        ]}
      />
    </FoundationPage>
  ),
};
