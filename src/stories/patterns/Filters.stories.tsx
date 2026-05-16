import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Label,
  LabelGroup,
  MenuToggle,
  type MenuToggleElement,
  Select,
  SelectList,
  SelectOption,
  SearchInput,
  Toolbar,
  ToolbarContent,
  ToolbarFilter,
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
} from "@patternfly/react-core";
import { FilterIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame } from "../_demoKit.js";

const meta: Meta = {
  title: "Patterns/Filters/Demo",
  parameters: {
    layout: "padded",
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

const STATUSES = ["Active", "Paused", "Failed"];
const OWNERS = ["ada", "grace", "linus"];

export const Demo: StoryObj = {
  render: () => {
    const [q, setQ] = useState("");
    const [status, setStatus] = useState<Set<string>>(new Set());
    const [owner, setOwner] = useState<Set<string>>(new Set());
    const [statusOpen, setStatusOpen] = useState(false);
    const [ownerOpen, setOwnerOpen] = useState(false);

    const toggle = (set: Set<string>, v: string, setter: (s: Set<string>) => void) => {
      const next = new Set(set);
      if (next.has(v)) next.delete(v);
      else next.add(v);
      setter(next);
    };

    return (
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
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Toolbar
                  id="filters-toolbar"
                  clearAllFilters={() => {
                    setStatus(new Set());
                    setOwner(new Set());
                    setQ("");
                  }}
                >
                  <ToolbarContent>
                    <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="md">
                      <ToolbarItem>
                        <SearchInput
                          value={q}
                          onChange={(_e, v) => setQ(v)}
                          onClear={() => setQ("")}
                          placeholder="Filter by name"
                          aria-label="Filter by name"
                        />
                      </ToolbarItem>
                      <ToolbarGroup variant="filter-group">
                        <ToolbarFilter
                          labels={Array.from(status)}
                          deleteLabel={(_c, v) => toggle(status, v as string, setStatus)}
                          deleteLabelGroup={() => setStatus(new Set())}
                          categoryName="Status"
                        >
                          <Select
                            isOpen={statusOpen}
                            onOpenChange={setStatusOpen}
                            onSelect={(_e, v) => toggle(status, v as string, setStatus)}
                            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                              <MenuToggle
                                ref={toggleRef}
                                onClick={() => setStatusOpen((o) => !o)}
                              >
                                Status {status.size > 0 && <Label isCompact>{status.size}</Label>}
                              </MenuToggle>
                            )}
                          >
                            <SelectList>
                              {STATUSES.map((s) => (
                                <SelectOption key={s} value={s} hasCheckbox isSelected={status.has(s)}>
                                  {s}
                                </SelectOption>
                              ))}
                            </SelectList>
                          </Select>
                        </ToolbarFilter>
                        <ToolbarFilter
                          labels={Array.from(owner)}
                          deleteLabel={(_c, v) => toggle(owner, v as string, setOwner)}
                          deleteLabelGroup={() => setOwner(new Set())}
                          categoryName="Owner"
                        >
                          <Select
                            isOpen={ownerOpen}
                            onOpenChange={setOwnerOpen}
                            onSelect={(_e, v) => toggle(owner, v as string, setOwner)}
                            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                              <MenuToggle
                                ref={toggleRef}
                                onClick={() => setOwnerOpen((o) => !o)}
                              >
                                Owner {owner.size > 0 && <Label isCompact>{owner.size}</Label>}
                              </MenuToggle>
                            )}
                          >
                            <SelectList>
                              {OWNERS.map((o) => (
                                <SelectOption key={o} value={o} hasCheckbox isSelected={owner.has(o)}>
                                  {o}
                                </SelectOption>
                              ))}
                            </SelectList>
                          </Select>
                        </ToolbarFilter>
                      </ToolbarGroup>
                    </ToolbarToggleGroup>
                    <ToolbarItem align={{ default: "alignEnd" }}>
                      <Button variant="primary">Create</Button>
                    </ToolbarItem>
                  </ToolbarContent>
                </Toolbar>
                <div style={{ padding: 12, color: "var(--gp-color-text-subtle)", fontSize: 13 }}>
                  Active: search=<strong>{q || "—"}</strong>
                  {" · "}status=<strong>{Array.from(status).join(",") || "any"}</strong>
                  {" · "}owner=<strong>{Array.from(owner).join(",") || "any"}</strong>
                </div>
              </DemoFrame>
              <CodeBlock>{`<Toolbar clearAllFilters={resetAll}>
  <ToolbarContent>
    <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="md">
      <ToolbarItem>
        <SearchInput value={q} onChange={...} onClear={...} />
      </ToolbarItem>
      <ToolbarGroup variant="filter-group">
        <ToolbarFilter
          labels={Array.from(status)}
          deleteLabel={(_c, v) => toggleStatus(v)}
          deleteLabelGroup={clearStatus}
          categoryName="Status"
        >
          <Select isOpen={open} onSelect={...} toggle={...}>
            {STATUSES.map(s => <SelectOption hasCheckbox value={s} isSelected={status.has(s)}>{s}</SelectOption>)}
          </Select>
        </ToolbarFilter>
      </ToolbarGroup>
    </ToolbarToggleGroup>
  </ToolbarContent>
</Toolbar>`}</CodeBlock>
              {(status.size > 0 || owner.size > 0) && (
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ color: "var(--gp-color-text-subtle)", fontSize: 13 }}>
                    Selected:
                  </span>
                  <LabelGroup isClosable={false}>
                    {Array.from(status).map((s) => (
                      <Label key={`s-${s}`} color="blue" isCompact>{`Status: ${s}`}</Label>
                    ))}
                    {Array.from(owner).map((o) => (
                      <Label key={`o-${o}`} color="purple" isCompact>{`Owner: ${o}`}</Label>
                    ))}
                  </LabelGroup>
                </div>
              )}
            </div>
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
    );
  },
};
