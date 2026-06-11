import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { SearchFacetsChips } from "../../examples/patterns/Filters.example.js";
import filtersExampleSrc from "../../examples/patterns/Filters.example.tsx?raw";

const meta: Meta = {
  title: "Patterns/Filters/Demo",
  parameters: {
    layout: "padded",
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

export const Demo: StoryObj = {
  render: () => (
    <FoundationPage
      title="Filters"
      intro={
        <>
          The standard filter toolbar — search input, one or more facet
          selects, removable filter chips that summarize the current
          state. Wire onClear on each chip so users can lift filters one
          at a time without re-opening the dropdown.
        </>
      }
    >
      <Section
        title="Search + facets + chips"
        description="ToolbarFilter wraps each facet — pass chips + deleteChip to render the active filter labels below the toolbar."
      >
        <Card>
          <Example
            source={filtersExampleSrc}
            region="SearchFacetsChips"
            fileName="Filters.example.tsx"
          >
            <SearchFacetsChips />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={filtersExampleSrc} fileName="Filters.example.tsx" />
        </Card>
      </Section>

      <Section title="Patterns">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Search left, facets centre, primary action right.</strong> Same shape across every product list.</li>
            <li><strong>Filter chips below the toolbar</strong> — Toolbar renders them automatically when ToolbarFilter has <code>labels</code>.</li>
            <li><strong>One-click clear-all.</strong> Always wire <code>clearAllFilters</code> — users who got into a weird state need a reset button.</li>
            <li><strong>URL-sync filters.</strong> Persist filter state in <code>?q=…&amp;status=…</code> so back-button and shareable links work.</li>
            <li><strong>Show match counts</strong> on facets when cheap (&ldquo;Active (42)&rdquo;) — saves users a click to see which filter has results.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Filter chips are focusable</strong> — keyboard users Tab through chips, Enter / Backspace removes one. PF6 wires this correctly when you pass <code>deleteLabel</code>.</li>
            <li><strong>Announce result-count changes</strong> in a polite live region — &ldquo;Showing 12 of 142&rdquo;.</li>
            <li><strong>Search input needs an aria-label</strong>, even if the placeholder seems descriptive.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
