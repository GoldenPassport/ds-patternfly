import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Divider,
  MenuToggle,
  type MenuToggleElement,
  Select,
  SelectGroup,
  SelectList,
  SelectOption,
} from "@patternfly/react-core";
import { CogIcon, FilterIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../../../components/StoryKit.js";
import { DemoFrame } from "../../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/Menu/Options menu",
  parameters: { layout: "padded" },
};
export default meta;

export const Demo: StoryObj = {
  render: () => {
    // Multi-select filter menu (the most common Options menu shape)
    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState<string[]>(["status: open"]);
    const toggleFilter = (v: string) =>
      setFilters((prev) =>
        prev.includes(v) ? prev.filter((p) => p !== v) : [...prev, v],
      );

    // Settings cluster (single-select sub-options)
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [density, setDensity] = useState<string>("comfortable");

    return (
      <FoundationPage
        title="Options menu"
        intro={
          <>
            A toggleable menu of toggleable settings — used for filter
            sets, display preferences, and any cluster of options the
            user keeps tweaking. Built on <code>Select</code> with
            <code>hasCheckbox</code> options for multi-select shapes;
            grouped sections for settings clusters.
          </>
        }
      >
        <Section
          title="Multi-select filter set"
          description="The canonical 'Filter (3)' button in toolbars — click to open a checkbox menu of conditions; the trigger label reflects the active count."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Select
                  id="filter-options-menu"
                  role="menu"
                  isOpen={filterOpen}
                  selected={filters}
                  onSelect={(_e, v) => toggleFilter(String(v))}
                  onOpenChange={setFilterOpen}
                  toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                    <MenuToggle
                      ref={toggleRef}
                      onClick={() => setFilterOpen((o) => !o)}
                      isExpanded={filterOpen}
                      icon={<FilterIcon />}
                      badge={filters.length > 0 ? filters.length : undefined}
                    >
                      Filter
                    </MenuToggle>
                  )}
                >
                  <SelectGroup label="Status">
                    <SelectList>
                      {["status: open", "status: in-progress", "status: closed"].map(
                        (v) => (
                          <SelectOption
                            key={v}
                            hasCheckbox
                            value={v}
                            isSelected={filters.includes(v)}
                          >
                            {v.replace("status: ", "")}
                          </SelectOption>
                        ),
                      )}
                    </SelectList>
                  </SelectGroup>
                  <Divider />
                  <SelectGroup label="Owner">
                    <SelectList>
                      {["owner: me", "owner: my-team", "owner: anyone"].map((v) => (
                        <SelectOption
                          key={v}
                          hasCheckbox
                          value={v}
                          isSelected={filters.includes(v)}
                        >
                          {v.replace("owner: ", "")}
                        </SelectOption>
                      ))}
                    </SelectList>
                  </SelectGroup>
                  <Divider />
                  <SelectGroup label="Priority">
                    <SelectList>
                      {["priority: p1", "priority: p2", "priority: p3"].map((v) => (
                        <SelectOption
                          key={v}
                          hasCheckbox
                          value={v}
                          isSelected={filters.includes(v)}
                        >
                          {v.replace("priority: ", "")}
                        </SelectOption>
                      ))}
                    </SelectList>
                  </SelectGroup>
                </Select>
              </DemoFrame>
              <CodeBlock>{`const [open, setOpen] = useState(false);
const [filters, setFilters] = useState([]);
const toggle = (v) => setFilters(prev =>
  prev.includes(v) ? prev.filter(p => p !== v) : [...prev, v]
);

<Select
  role="menu"
  isOpen={open}
  selected={filters}
  onSelect={(_, v) => toggle(v)}
  onOpenChange={setOpen}
  toggle={(toggleRef) => (
    <MenuToggle
      ref={toggleRef}
      onClick={() => setOpen(o => !o)}
      isExpanded={open}
      icon={<FilterIcon />}
      badge={filters.length > 0 ? filters.length : undefined}
    >
      Filter
    </MenuToggle>
  )}
>
  <SelectGroup label="Status">
    <SelectList>
      <SelectOption hasCheckbox value="status: open" isSelected={filters.includes("status: open")}>
        open
      </SelectOption>
      {/* ...more options... */}
    </SelectList>
  </SelectGroup>
</Select>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Settings cluster (single-select)"
          description="A gear-icon trigger that opens a Select with single-select sub-options per group. Use for compact display preferences (density, sort, theme)."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Select
                  id="settings-options-menu"
                  isOpen={settingsOpen}
                  selected={density}
                  onSelect={(_e, v) => {
                    setDensity(String(v));
                    setSettingsOpen(false);
                  }}
                  onOpenChange={setSettingsOpen}
                  toggle={(toggleRef) => (
                    <MenuToggle
                      ref={toggleRef}
                      aria-label="Display options"
                      variant="plain"
                      onClick={() => setSettingsOpen((o) => !o)}
                      isExpanded={settingsOpen}
                      icon={<CogIcon />}
                    />
                  )}
                >
                  <SelectGroup label="Density">
                    <SelectList>
                      {["compact", "comfortable", "spacious"].map((v) => (
                        <SelectOption
                          key={v}
                          value={v}
                          isSelected={density === v}
                        >
                          {v[0]?.toUpperCase()}{v.slice(1)}
                        </SelectOption>
                      ))}
                    </SelectList>
                  </SelectGroup>
                </Select>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section title="Pattern">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Trigger reflects state</strong>. Multi-select: a count badge (&ldquo;Filter (3)&rdquo;). Single-select: the chosen value.</li>
              <li><strong>Group related options</strong> with <code>SelectGroup</code> — the menu becomes a settings panel.</li>
              <li><strong>Multi-select keeps the menu open</strong>. Don&rsquo;t close on every checkbox toggle — users want to pick several. Close on outside click / Escape / a primary action button if needed.</li>
              <li><strong>Pair with toolbar chips</strong>. Active filters surface as ToolbarFilter chips below the toolbar so users see what&rsquo;s applied at a glance.</li>
            </ul>
          </Card>
        </Section>

        <Section title="When to use">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Filter sets in toolbars</strong> — multi-select Select with a Filter trigger.</li>
              <li><strong>Display preferences</strong> — density / sort / theme settings inside a kebab or gear menu.</li>
              <li><strong>Per-row settings</strong> — a kebab menu on each row holding per-record preferences.</li>
              <li><strong>For action menus (do something)</strong> — use <code>Dropdown</code>.</li>
              <li><strong>For a single value picker</strong> — use plain <code>Select</code>.</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
