import type { Meta, StoryObj } from "@storybook/react-vite";
import SkeletonTable from "@patternfly/react-component-groups/dist/dynamic/SkeletonTable";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Component groups/Status and state indicators/Skeleton table",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Skeleton table"
      intro={
        <>
          A pre-built skeleton placeholder for tables — same structure as
          your real <code>Table</code>, with shimmering bars instead of
          data. Use it during initial load so the layout doesn&rsquo;t
          shift when rows arrive.
        </>
      }
    >
      <Section title="Default">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <SkeletonTable
                rowsCount={6}
                columns={["Name", "Status", "Owner", "Last run"]}
              />
            </DemoFrame>
            <CodeBlock>{`<SkeletonTable
  rowsCount={loading ? 6 : 0}
  columns={["Name", "Status", "Owner", "Last run"]}
/>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="With selectable + expandable affordances"
        description="Match the chrome of the real table — checkbox column for select, caret column for expand — so the skeleton occupies the same width."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <SkeletonTable
                rowsCount={4}
                isSelectable
                isExpandable
                columns={["Name", "Status", "Owner", "Last run"]}
              />
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "rowsCount", type: "number", description: "How many skeleton rows to render. Pick a number close to the typical first-page count to avoid layout shift." },
                { name: "columns", type: "(ReactNode | { cell: ReactNode; props?: ThProps })[]", description: "Column headers. Pass strings, or `{ cell, props }` to set widths / alignment per column." },
                { name: "columnsCount", type: "number", description: "When `columns` isn't provided, render this many empty header cells." },
                { name: "isSelectable", type: "boolean", description: "Reserve space for the per-row select checkbox." },
                { name: "isExpandable", type: "boolean", description: "Reserve space for the per-row expand caret." },
                { name: "selectVariant", type: "RowSelectVariant", description: "`radio` or `checkbox` — match your real table." },
                { name: "variant", type: "TableVariant", description: "`compact` for dense tables — match your real table." },
                { name: "borders", type: "boolean", description: "Toggle the row borders. Default true." },
                { name: "caption", type: "ReactNode", description: "Optional caption — useful for screen readers ('Loading workflows...')." },
                { name: "ouiaId", type: "string | number", description: "Stable test selector." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Pair with <code>aria-busy=&quot;true&quot;</code></strong> on the table&rsquo;s wrapper — it tells assistive tech the content is loading rather than empty.</li>
            <li><strong>Caption the loading state.</strong> A short caption (&ldquo;Loading workflows…&rdquo;) gives screen readers context they can&rsquo;t infer from the visual shimmer.</li>
            <li><strong>Match the real chrome exactly.</strong> Same column widths, same selectable / expandable affordances — otherwise the page jumps when data arrives.</li>
            <li><strong>Don&rsquo;t leave it on forever.</strong> If the load is taking &gt; 30s, swap to an ErrorState — a perpetual skeleton looks broken.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
