import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card as DocCard, Example } from "../_kit/StoryKit.js";
import { SearchableGallery } from "../../examples/patterns/CardView.example.js";
import cardViewExampleSrc from "../../examples/patterns/CardView.example.tsx?raw";

const meta: Meta = {
  title: "Patterns/Card view/Demo",
  parameters: {
    layout: "padded",
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

export const Demo: StoryObj = {
  render: () => (
    <FoundationPage
      title="Card view"
      intro={
        <>
          A responsive Gallery of Cards — the standard alternative to a
          Table when each row is more visual than tabular (catalog
          entries, dashboard tiles, image collections). Pair with a
          Toolbar for search + filters, and a Pagination below for
          large datasets.
        </>
      }
    >
      <Section
        title="Searchable gallery"
        description="Gallery handles responsive column count automatically (minWidths). Filter the source array and re-render — no special chrome needed."
      >
        <DocCard>
          <Example
            source={cardViewExampleSrc}
            region="SearchableGallery"
            fileName="CardView.example.tsx"
          >
            <SearchableGallery />
          </Example>
        </DocCard>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <DocCard>
          <Example source={cardViewExampleSrc} fileName="CardView.example.tsx" />
        </DocCard>
      </Section>

      <Section title="Patterns">
        <DocCard>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Pick Card view over Table when each row has &gt; ~2 visual elements.</strong> Icons, images, body copy, status pills all read better in a card than in a cell.</li>
            <li><strong>Pair with Gallery&rsquo;s <code>minWidths</code></strong> instead of fixed columns — the grid reflows naturally on narrow viewports.</li>
            <li><strong>Use <code>Card.isClickable</code> + <code>isSelectable</code></strong> when cards are picker items rather than read-only summaries.</li>
            <li><strong>Cap at a few hundred</strong>. For larger collections, switch to Table or paginate the Gallery; rendering 10k cards is bad UX and bad layout.</li>
          </ul>
        </DocCard>
      </Section>

      <Section title="Accessibility">
        <DocCard>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Each Card needs a heading</strong> (<code>CardTitle</code> renders an h-element). Without it, screen readers announce &ldquo;article&rdquo; with no name.</li>
            <li><strong>Action affordances inside cards</strong> need accessible names — &ldquo;Edit&rdquo; is fine in context, but Tab-only users hear it without the row title. Combine via <code>aria-label=&quot;Edit Quarterly review&quot;</code>.</li>
            <li><strong>Empty state.</strong> When the filter yields zero results, render an EmptyState — don&rsquo;t leave the gallery silently blank.</li>
          </ul>
        </DocCard>
      </Section>
    </FoundationPage>
  ),
};
