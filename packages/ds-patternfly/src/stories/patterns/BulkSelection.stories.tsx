import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { FullPattern } from "../../examples/patterns/BulkSelection.example.js";
import bulkSelectionExampleSrc from "../../examples/patterns/BulkSelection.example.tsx?raw";

const meta: Meta = {
  title: "Patterns/Bulk selection",
  parameters: {
    layout: "padded",
    a11y: {
      // BulkSelect renders a MenuToggle that confuses contrast resolver.
      config: { rules: [{ id: "color-contrast", enabled: false }] },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Bulk selection"
      intro={
        <>
          The standard toolbar + checkbox triplet for &ldquo;select many,
          act on many&rdquo;. One BulkSelect dropdown for select-all /
          select-page / clear; per-row checkboxes for granular pick;
          bulk-action buttons in the toolbar that only appear when
          selection is non-empty.
        </>
      }
    >
      <Section
        title="Full pattern"
        description="BulkSelect drives header state; rows expose per-row checkboxes; toolbar renders bulk actions when count > 0."
      >
        <Card>
          <Example
            source={bulkSelectionExampleSrc}
            region="FullPattern"
            fileName="BulkSelection.example.tsx"
          >
            <FullPattern />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={bulkSelectionExampleSrc}
            fileName="BulkSelection.example.tsx"
          />
        </Card>
      </Section>

      <Section title="Rules">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "selection state", type: "Set<id>", description: "Track selected IDs at the page level so they survive pagination / refetch." },
                { name: "bulk actions visibility", type: "conditional", description: "Render bulk-action buttons only when count > 0. Hidden actions reduce visual noise when nothing's selected." },
                { name: "destructive bulks", type: "WarningModal", description: "Bulk delete / bulk disable goes through a confirmation. The count appears in the body ('Delete 12 workflows?') so users can sanity-check before committing." },
                { name: "selection across pages", type: "explicit", description: "When selectedCount > pageCount, surface a 'X selected across N pages' banner with a 'Clear selection' link." },
                { name: "stable IDs", type: "stable", description: "Sort / filter must not mutate row IDs — otherwise selection breaks across pagination." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Announce count changes</strong> in a polite live region — &ldquo;3 rows selected&rdquo;. Without it, blind users don&rsquo;t know bulk-select worked.</li>
            <li><strong>The per-row checkbox needs context.</strong> Th.select for the all-row header + Td.select for each row — PF6 wires the aria-labels automatically.</li>
            <li><strong>Destructive bulk actions</strong> need typed-confirm for catastrophic counts (e.g. &ldquo;Delete 1,000 workflows&rdquo;). Use WarningModal&rsquo;s <code>confirmationText</code>.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
