import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";

const meta: Meta = {
  title: "Patterns/Primary-detail",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Primary-detail"
      intro={
        <>
          A two-pane layout — a list of items on the leading edge (the
          primary), a content view on the trailing edge (the detail).
          Collapses to a single column with a &ldquo;back to list&rdquo;
          affordance below the <code>md</code> breakpoint. The headline
          pattern for record-browsing UIs: inbox, settings, user lists.
          <br /><br />
          See the live demo under <strong>Patterns / Primary-detail / Demo</strong>{" "}
          for an interactive example built from the lib&rsquo;s{" "}
          <code>PrimaryDetailLayout</code> component.
        </>
      }
    >
      <Section
        title="Shape"
        description="PrimaryDetailLayout takes a generic items array, a renderListItem function, a renderDetail function, and controlled selection."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <CodeBlock>{`<PrimaryDetailLayout
  items={items}
  selectedId={selected}
  onSelect={setSelected}
  renderListItem={(it) => (
    <ListItemContent>
      <strong>{it.name}</strong>
      <span>{it.subtitle}</span>
    </ListItemContent>
  )}
  renderDetail={(it) => (
    <DetailContent>
      <h2>{it.name}</h2>
      <p>{it.body}</p>
    </DetailContent>
  )}
  labels={{
    listAriaLabel: "Process instances",
    detailAriaLabel: "Process instance details",
    backToList: "Back to list",
    emptyDetailTitle: "Select an item",
    emptyDetailBody: "Pick a process instance to see its details.",
  }}
/>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Rules">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Controlled selection.</strong> Track <code>selectedId</code> in the parent — typically synced to <code>?id=…</code> in the URL so direct-link / back-button work.</li>
            <li><strong>List is scrollable independently.</strong> Don&rsquo;t bind it to the page scroll — long detail content shouldn&rsquo;t push the list out of view.</li>
            <li><strong>Empty detail.</strong> When nothing is selected, render an EmptyState with a clear instruction (&ldquo;Select an item to see details&rdquo;) rather than a blank pane.</li>
            <li><strong>Responsive collapse.</strong> Below <code>md</code>, show list OR detail (not both). On detail, the &ldquo;back to list&rdquo; button returns to the list view.</li>
            <li><strong>Sort + filter in the list pane.</strong> The list&rsquo;s toolbar is the right home for filters — the detail pane stays focused on the selected item.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>List + detail are both required regions.</strong> Pass <code>listAriaLabel</code> and <code>detailAriaLabel</code> through the <code>labels</code> prop — they map to ARIA landmarks.</li>
            <li><strong>Selection announces.</strong> The detail pane&rsquo;s heading changes on select; pair with focus management so keyboard users land on the detail without re-Tabbing.</li>
            <li><strong>Back to list button</strong> below <code>md</code> needs to be Tab-reachable on the first focusable position of the detail view.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
