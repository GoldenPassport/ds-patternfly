import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card } from "../_storyKit.js";

const meta: Meta = {
  // Title is exactly "Patterns" (no sub-segment) so this becomes the
  // group-root entry — Storybook renders it directly under the
  // Patterns folder with "Overview" as the story name (export below
  // is `Overview`). Same pattern as Components/Forms (FormControl) and
  // Component groups (About).
  title: "Patterns",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="About patterns"
      intro={
        <>
          <strong>Patterns</strong> are recipes — proven compositions of PF6
          primitives that solve a recurring UX problem (bulk select, card
          view, primary-detail, password strength). They&rsquo;re not packages
          and they&rsquo;re not components. Each page documents the shape, the
          accessibility considerations, and ships a working demo you can
          copy.
        </>
      }
    >
      <Section title="When to reach for a pattern">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>The problem is well-known.</strong> &ldquo;Show a list of N things the user can bulk-select&rdquo; — solved 100 times across products. The pattern is the consensus shape.</li>
            <li><strong>You want the chrome consistent.</strong> Two products that both implement Filters from scratch end up with subtly different toolbars; the pattern keeps them aligned.</li>
            <li><strong>You need a starting point, not a black box.</strong> Patterns are copy-paste recipes — adapt freely. If your design diverges from the pattern, fork it.</li>
          </ul>
        </Card>
      </Section>

      <Section title="When to deviate">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Your UX has explicit, intentional differences.</strong> A &ldquo;list of items with bulk actions&rdquo; in a chat app may look nothing like one in an admin console — the pattern is a starting point, not a contract.</li>
            <li><strong>Constraints differ.</strong> Mobile-first surfaces, deeply-nested data, low-bandwidth screens — patterns assume a desktop admin context by default.</li>
            <li><strong>You&rsquo;ve verified the pattern with users</strong> and it doesn&rsquo;t land. Trust the test, not the canon.</li>
          </ul>
        </Card>
      </Section>

      <Section title="What&rsquo;s in this section">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Actions</strong> — primary / secondary / danger button hierarchies and overflow rules.</li>
            <li><strong>Bulk selection</strong> — toolbar + select-all + per-row checkbox triplet.</li>
            <li><strong>Card view</strong> — gallery of selectable / linkable cards as an alternative to a table.</li>
            <li><strong>Dashboard</strong> — KPI tiles + chart placeholders in a responsive grid.</li>
            <li><strong>Filters</strong> — toolbar with text + faceted filters and removable filter chips.</li>
            <li><strong>Password generator</strong> — input + generate + copy + show / hide buttons.</li>
            <li><strong>Password strength</strong> — live strength meter with criteria checklist.</li>
            <li><strong>Primary-detail</strong> — list + content pane, responsive collapse to single-column.</li>
            <li><strong>Right-to-left</strong> — building RTL-correct UIs with PF6 + logical CSS properties.</li>
            <li><strong>Status and severity</strong> — combining Label, Status, Severity for triage screens.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
