import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Gallery,
  GalleryItem,
  Label,
  SearchInput,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@golden-passport/ds-patternfly";
import { CubeIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card as DocCard, CodeBlock } from "../_kit/StoryKit.js";
import { DemoFrame } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Patterns/Card view/Demo",
  parameters: {
    layout: "padded",
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

type Item = { id: string; name: string; desc: string; status: "Active" | "Paused" };
const ITEMS: Item[] = [
  { id: "wf-1", name: "Quarterly review",   desc: "Hourly · 4 steps",        status: "Active" },
  { id: "wf-2", name: "Nightly build",      desc: "On push · 6 steps",       status: "Active" },
  { id: "wf-3", name: "Backup pipeline",    desc: "Daily · 3 steps",         status: "Paused" },
  { id: "wf-4", name: "Audit export",       desc: "Weekly · 2 steps",        status: "Active" },
  { id: "wf-5", name: "Index rebuilder",    desc: "Every 2h · 4 steps",      status: "Active" },
  { id: "wf-6", name: "Notify on incident", desc: "Webhook · 1 step",        status: "Paused" },
];

export const Demo: StoryObj = {
  render: () => {
    const [q, setQ] = useState("");
    const filtered = ITEMS.filter((it) =>
      it.name.toLowerCase().includes(q.toLowerCase()),
    );

    return (
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
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Toolbar id="cards-toolbar">
                  <ToolbarContent>
                    <ToolbarItem>
                      <SearchInput
                        placeholder="Filter by name"
                        value={q}
                        onChange={(_e, v) => setQ(v)}
                        onClear={() => setQ("")}
                        aria-label="Filter cards"
                      />
                    </ToolbarItem>
                    <ToolbarItem align={{ default: "alignEnd" }}>
                      <span style={{ color: "var(--gp-color-text-subtle)" }}>
                        {filtered.length} of {ITEMS.length}
                      </span>
                    </ToolbarItem>
                  </ToolbarContent>
                </Toolbar>
                <Gallery hasGutter minWidths={{ default: "260px" }}>
                  {filtered.map((it) => (
                    <GalleryItem key={it.id}>
                      <Card isCompact>
                        <CardHeader>
                          <CubeIcon />
                          <CardTitle>{it.name}</CardTitle>
                        </CardHeader>
                        <CardBody>
                          <p style={{ margin: 0, color: "var(--gp-color-text-subtle)" }}>
                            {it.desc}
                          </p>
                          <p style={{ margin: "12px 0 0" }}>
                            <Label color={it.status === "Active" ? "green" : "grey"} isCompact>
                              {it.status}
                            </Label>
                          </p>
                        </CardBody>
                      </Card>
                    </GalleryItem>
                  ))}
                </Gallery>
              </DemoFrame>
              <CodeBlock>{`<Toolbar>
  <ToolbarContent>
    <ToolbarItem>
      <SearchInput value={q} onChange={(_e, v) => setQ(v)} onClear={() => setQ("")} />
    </ToolbarItem>
  </ToolbarContent>
</Toolbar>
<Gallery hasGutter minWidths={{ default: "260px" }}>
  {filtered.map(it => (
    <GalleryItem key={it.id}>
      <Card isCompact>
        <CardHeader><CubeIcon /><CardTitle>{it.name}</CardTitle></CardHeader>
        <CardBody>{it.desc}</CardBody>
      </Card>
    </GalleryItem>
  ))}
</Gallery>`}</CodeBlock>
            </div>
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
    );
  },
};
