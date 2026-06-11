import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, CodeBlock, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { SelectableTable } from "../../examples/extensions/DataViewTable.example.js";
import dataViewTableExampleSrc from "../../examples/extensions/DataViewTable.example.tsx?raw";

const meta: Meta = {
  title: "Extensions/Data view/Table",
  parameters: {
    layout: "padded",
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Data view table"
      intro={
        <>
          The table renderer for Data view — accepts <code>columns</code> +{" "}
          <code>rows</code> arrays, handles selection wiring, and dispatches
          head / body content for loading / empty / error states.
        </>
      }
    >
      <Section
        title="Selectable table"
        description="Pass a selection from useDataViewSelection on the parent DataView. The table wires checkboxes automatically."
      >
        <Card>
          <Example
            source={dataViewTableExampleSrc}
            region="SelectableTable"
            fileName="DataViewTable.example.tsx"
          >
            <SelectableTable />
          </Example>
        </Card>
      </Section>

      <Section
        title="Loading / empty / error states"
        description="Pass head/body state nodes via headStates / bodyStates and toggle DataView.activeState to switch the table chrome."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <CodeBlock>{`<DataView activeState={isLoading ? "loading" : data.length === 0 ? "empty" : undefined}>
  <DataViewTable
    aria-label="Workflows"
    columns={columns}
    rows={rows}
    bodyStates={{
      loading: <SkeletonTableBody rowsCount={5} columnsCount={3} />,
      empty:   <ErrorState titleText="No workflows yet" status="info" customFooter={<Button>Create one</Button>} />,
      error:   <ErrorState titleText="Couldn't load workflows" customFooter={<Button onClick={retry}>Retry</Button>} />,
    }}
  />
</DataView>`}</CodeBlock>
        </div>
      </Card>
    </Section>

    <Section
      title="Full example"
      description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
    >
      <Card>
        <Example
          source={dataViewTableExampleSrc}
          fileName="DataViewTable.example.tsx"
        />
      </Card>
    </Section>

    <Section title="Most-used DataViewTable props">
      <Card>
        <div style={{ padding: 24 }}>
          <PropsTable
            rows={[
              { name: "columns", type: "DataViewTh[]", description: "Required — array of header cells. Each entry is either a ReactNode or { cell, props?: ThProps, resizableProps? }." },
              { name: "rows", type: "DataViewTr[]", description: "Required — array of rows. Each row is either ReactNode[] or { id, row, props?: TrProps }. Pass id when rows can change order, so React keys stay stable." },
              { name: "headStates", type: "Partial<Record<DataViewState | string, ReactNode>>", description: "Per-state replacement for the entire <thead>. Useful for skeleton head + 'loading' state." },
              { name: "bodyStates", type: "Partial<Record<DataViewState | string, ReactNode>>", description: "Per-state replacement for the <tbody> — empty / loading / error renderers." },
              { name: "isResizable", type: "boolean", description: "Allow the user to drag column borders to resize." },
              { name: "ouiaId", type: "string | number", description: "Stable test selector." },
            ]}
          />
          <p style={{ marginTop: 16, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
            Inherits the rest of <code>TableProps</code> from{" "}
            <code>@patternfly/react-table</code>.
          </p>
        </div>
      </Card>
    </Section>

    <Section title="Tree variant">
      <Card>
        <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
          <li><strong>Pass <code>isTreeTable</code></strong> to switch DataViewTable into <code>DataViewTableTree</code> mode — rows have a <code>children</code> array and render a tree.</li>
          <li><strong>Each row needs a stable <code>id</code></strong> in tree mode — used to track expand/collapse state.</li>
          <li><strong>Pair with the Tree expand handlers</strong> from the tree-specific hooks (see the package&rsquo;s docs for the helper that owns expanded-state).</li>
        </ul>
      </Card>
    </Section>

    <Section title="Accessibility">
      <Card>
        <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
          <li><strong><code>aria-label</code> is required.</strong> The underlying Table inherits it — naming the table is non-negotiable.</li>
          <li><strong>Body / head state nodes should announce.</strong> Wrap loading state in <code>aria-busy=&quot;true&quot;</code>, error state in <code>aria-live=&quot;polite&quot;</code>, empty state in a clear semantic heading.</li>
          <li><strong>Use stable <code>id</code> per row.</strong> Selection breaks if React keys change between renders.</li>
        </ul>
      </Card>
    </Section>
    </FoundationPage>
  ),
};
