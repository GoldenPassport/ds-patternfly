import { Fragment, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination, PaginationVariant } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Components/Pagination",
  parameters: {
    layout: "padded",
    a11y: {
      config: {
        // The page intentionally renders multiple Pagination landmarks
        // side-by-side for documentation purposes; in real apps a single
        // page hosts at most two (top + bottom) with distinct widgetIds.
        rules: [{ id: "landmark-unique", enabled: false }],
      },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [page2, setPage2] = useState(1);
    const [perPage2, setPerPage2] = useState(10);
    const [page3, setPage3] = useState(1);
    const [perPage3, setPerPage3] = useState(20);
    const [page4, setPage4] = useState(1);
    const [perPage4, setPerPage4] = useState(20);
    return (
      <FoundationPage
        title="Pagination"
        intro={
          <>
            Page-through controls for long collections — tables, lists, search
            results. Combines per-page sizing, prev/next, jump-to-page, and a
            &ldquo;showing X–Y of Z&rdquo; summary. Use the same component
            above and below a table for symmetric controls.
          </>
        }
      >
        <Section
          title="Top variant"
          description="Compact set used above tables — prev/next + jump-to-page + per-page menu."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Pagination
                  itemCount={523}
                  page={page}
                  perPage={perPage}
                  onSetPage={(_e, p) => setPage(p)}
                  onPerPageSelect={(_e, pp, p) => {
                    setPerPage(pp);
                    setPage(p);
                  }}
                  widgetId="ds-pagination-top"
                  ouiaId="PaginationTop"
                />
              </DemoFrame>
              <CodeBlock>{`<Pagination
  itemCount={523}
  page={page}
  perPage={perPage}
  onSetPage={(_e, page) => setPage(page)}
  onPerPageSelect={(_e, perPage, page) => { setPerPage(perPage); setPage(page); }}
  widgetId="ds-pagination-top"
  ouiaId="PaginationTop"
/>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Bottom variant"
          description="Same controls plus first / last buttons; per-page menu pinned right. Use below tables for symmetric paging UX."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Pagination
                  itemCount={87}
                  page={page2}
                  perPage={perPage2}
                  onSetPage={(_e, p) => setPage2(p)}
                  onPerPageSelect={(_e, pp, p) => {
                    setPerPage2(pp);
                    setPage2(p);
                  }}
                  variant={PaginationVariant.bottom}
                  widgetId="ds-pagination-bottom"
                  ouiaId="PaginationBottom"
                />
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Compact"
          description="No per-page selector, no jump-to-page input — just prev/next + summary. Use in tight spaces (toolbars, drawers)."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Pagination
                  itemCount={42}
                  page={page3}
                  perPage={perPage3}
                  onSetPage={(_e, p) => setPage3(p)}
                  onPerPageSelect={(_e, pp, p) => {
                    setPerPage3(pp);
                    setPage3(p);
                  }}
                  isCompact
                  widgetId="ds-pagination-compact"
                />
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Indeterminate"
          description="When the total isn't known, override the summary with toggleTemplate to render firstIndex / lastIndex / 'many'."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Pagination
                  page={page4}
                  perPage={perPage4}
                  onSetPage={(_e, p) => setPage4(p)}
                  onPerPageSelect={(_e, pp, p) => {
                    setPerPage4(pp);
                    setPage4(p);
                  }}
                  toggleTemplate={({ firstIndex, lastIndex }) => (
                    <Fragment>
                      <b>
                        {firstIndex} - {lastIndex}
                      </b>{" "}
                      of <b>many</b>
                    </Fragment>
                  )}
                  widgetId="ds-pagination-indeterminate"
                />
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Disabled"
          description="isDisabled greys out the entire control — useful while the underlying data is loading or while a bulk action is in flight."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Pagination
                  itemCount={523}
                  page={1}
                  perPage={20}
                  isDisabled
                  widgetId="ds-pagination-disabled"
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
                  { name: "itemCount", type: "number", description: "Total items across all pages. Drives the 'X–Y of Z' label and last-page boundary. Omit for indeterminate paging." },
                  { name: "page", type: "number", description: "Current page (1-indexed). Controlled." },
                  { name: "perPage", type: "number", description: "Items per page. Pair with onPerPageSelect; the callback's third arg is the page to jump to (typically reset to 1)." },
                  { name: "onSetPage", type: "(event, page) => void", description: "Called when the user changes page via nav buttons or jump-to-page input." },
                  { name: "onPerPageSelect", type: "(event, perPage, page) => void", description: "Called when the user changes the per-page count. The third arg is the page to land on." },
                  { name: "variant", type: '"top" | "bottom"', description: "top is compact (no first/last buttons); bottom shows the full nav set." },
                  { name: "isCompact", type: "boolean", description: "Hides per-page selector and jump-to-page input." },
                  { name: "isDisabled", type: "boolean", description: "Disables every control in the pagination region." },
                  { name: "perPageOptions", type: "{ title, value }[]", description: "Override the default 10 / 20 / 50 / 100 options." },
                  { name: "widgetId", type: "string", description: "Unique id for the pagination widget — used for aria-controls and DOM targeting. Required on every instance, must be unique on the page." },
                  { name: "toggleTemplate", type: "({ firstIndex, lastIndex, itemCount, itemsTitle, ofWord }) => ReactNode", description: "Render-prop override for the summary label. Use for indeterminate paging or custom phrasing." },
                  { name: "titles", type: "{ paginationAriaLabel?: string, ... }", description: "Per-string overrides — translate the built-in labels (page, of, items per page, etc.) by passing your own." },
                  { name: "ouiaId", type: "string", description: "Stable test selector. Sets data-ouia-component-id on the pagination region." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>widgetId is required and must be unique.</strong> If you render Pagination above and below the same table, give them distinct ids (e.g. <code>tasks-pagination-top</code> / <code>tasks-pagination-bottom</code>).</li>
              <li><strong>Reset to page 1 on perPage change.</strong> Otherwise users land on a non-existent page — the third arg of <code>onPerPageSelect</code> is the page to jump to, use it.</li>
              <li><strong>Translate <code>titles</code> in non-English locales.</strong> The built-in &ldquo;of&rdquo;, &ldquo;page&rdquo;, &ldquo;items per page&rdquo; labels need your locale&rsquo;s strings.</li>
              <li><strong>Don&rsquo;t hide both top and bottom on long tables.</strong> Users scrolling 50+ rows shouldn&rsquo;t have to scroll back to the top to page-through.</li>
              <li><strong>Keep page state in the URL</strong> for shareable / back-button-friendly behaviour. The component is just the controls.</li>
            </ul>
          </Card>
        </Section>
        <ThemingPointer
          dials={[
            ["--gp-control-pad-y", "Page-size select + page-jump input heights."],
            ["--gp-radius-control", "Control corner radius."],
            ["--gp-text-subtle", "Result-summary text colour."],
          ]}
        />
      </FoundationPage>
    );
  },
};
