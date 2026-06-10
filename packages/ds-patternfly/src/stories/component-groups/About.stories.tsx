import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card } from "../_kit/StoryKit.js";

const meta: Meta = {
  title: "Component groups",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="About component groups"
      intro={
        <>
          <strong>Component groups</strong> are pre-built compositions of
          PatternFly primitives that solve a specific UI problem out of the
          box — error pages, bulk-select dropdowns, page headers, skeleton
          tables. They sit one level above the core component library: less
          flexible than primitives, but faster to ship when you need a
          standard pattern.
        </>
      }
    >
      <Section title="When to reach for a component group">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Recurring patterns.</strong> If three teams have already built the same screen (404, 403, scheduled-maintenance, server-error), use the matching group.</li>
            <li><strong>Empty / error / loading states.</strong> <code>ErrorState</code>, <code>SkeletonTable</code>, <code>UnavailableContent</code> ship with sensible copy and visuals — drop them in instead of hand-rolling.</li>
            <li><strong>Boilerplate-heavy controls.</strong> <code>BulkSelect</code>, <code>ResponsiveActions</code>, <code>ColumnManagementModal</code> wrap multiple primitives with state — the group saves you 100+ lines.</li>
            <li><strong>You need fast and consistent</strong> — when shipping a new feature, pick a group; when designing a unique flow, compose primitives directly.</li>
          </ul>
        </Card>
      </Section>

      <Section title="When NOT to use a component group">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Bespoke layouts.</strong> If the design diverges from the group&rsquo;s template, fork the group&rsquo;s source code or compose primitives — don&rsquo;t fight the prop surface.</li>
            <li><strong>Heavy customisation needed.</strong> Some groups (PageHeader, ServiceCard) have rigid slots. If you need a different rhythm, drop down to the underlying components.</li>
            <li><strong>Bundle-size sensitive.</strong> Groups pull in transitive deps (e.g. SkeletonTable pulls react-table). For one-off use, the cost may not be worth it.</li>
          </ul>
        </Card>
      </Section>

      <Section title="What&rsquo;s in this section">
        <Card>
          <div style={{ padding: 16, color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <p style={{ marginTop: 0 }}>
              All component groups documented here are from{" "}
              <code>@patternfly/react-component-groups</code> v6.4. Browse
              the navigation on the left for individual recipes:
            </p>
            <ul style={{ margin: 0, paddingLeft: 24 }}>
              <li><strong>Content containers</strong> — Multi-content card, Page header, Service card</li>
              <li><strong>Controls</strong> — Bulk select, Close button, External link button, Responsive actions</li>
              <li><strong>Error communication</strong> — Error boundary, Error state, Maintenance, Missing page, Unauthorized access, Unavailable content, Warning modal</li>
              <li><strong>Helpers</strong> — Column management modal, Field Builder, List manager, Log snippet, Shortcut grid</li>
              <li><strong>Status & state indicators</strong> — Severity, Skeleton table, Stale data warning, Status, Beta, Tag count</li>
            </ul>
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
