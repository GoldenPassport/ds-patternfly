import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  Example,
  ThemingPointer,
} from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  Basic,
  NoResults,
  Loading,
  WithStatus,
  Sizes,
} from "../../examples/components/EmptyState.example.js";
import emptyStateExampleSrc from "../../examples/components/EmptyState.example.tsx?raw";

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
          <Example
            source={emptyStateExampleSrc}
            region="Basic"
            fileName="EmptyState.example.tsx"
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section
        title="No results found (filter empty state)"
        description="Different shape from the first-run empty state — the user already had data and filtered it away. Surface a clear escape ('Clear filters') as the primary action; the icon is a search/filter glyph, not the collection's identity icon."
      >
        <Card>
          <Example
            source={emptyStateExampleSrc}
            region="NoResults"
            fileName="EmptyState.example.tsx"
          >
            <NoResults />
          </Example>
        </Card>
      </Section>

      <Section
        title="Loading"
        description="Pass a Spinner as the icon for an in-flight loader empty state. Use when the surrounding view doesn't already show a different loading affordance and the wait is long enough to need orientation."
      >
        <Card>
          <Example
            source={emptyStateExampleSrc}
            region="Loading"
            fileName="EmptyState.example.tsx"
          >
            <Loading />
          </Example>
        </Card>
      </Section>

      <Section
        title="With status"
        description="status drives a tinted icon background for success / warning / danger / info / custom. Use for end-state confirmations or error states where the colour cue helps."
      >
        <Card>
          <Example
            source={emptyStateExampleSrc}
            region="WithStatus"
            fileName="EmptyState.example.tsx"
          >
            <WithStatus />
          </Example>
        </Card>
      </Section>

      <Section
        title="Sizes"
        description="variant controls the overall scale (xs / sm / lg / xl). Default works for full-page placeholders; use sm inside Drawer / Popover / Card; xs for inline empty rows."
      >
        <Card>
          <Example
            source={emptyStateExampleSrc}
            region="Sizes"
            fileName="EmptyState.example.tsx"
          >
            <Sizes />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={emptyStateExampleSrc} fileName="EmptyState.example.tsx" />
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
