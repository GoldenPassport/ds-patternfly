import { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Divider,
  MenuToggle,
  type MenuToggleElement,
  SearchInput,
  Select,
  SelectGroup,
  SelectList,
  SelectOption,
} from "@patternfly/react-core";
import { CheckIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../../_storyKit.js";
import { DemoFrame } from "../../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/Menu/Context selector",
  parameters: { layout: "padded" },
};
export default meta;

type Workspace = { id: string; name: string; section: "Recent" | "All" };

const allWorkspaces: Workspace[] = [
  { id: "ws-acme", name: "Acme", section: "Recent" },
  { id: "ws-beta", name: "Beta Lab", section: "Recent" },
  { id: "ws-globex", name: "Globex", section: "All" },
  { id: "ws-initech", name: "Initech", section: "All" },
  { id: "ws-massive", name: "Massive Dynamic", section: "All" },
  { id: "ws-soylent", name: "Soylent", section: "All" },
];

export const Demo: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<Workspace>(allWorkspaces[0]!);
    const [filter, setFilter] = useState("");

    const filtered = useMemo(() => {
      const q = filter.toLowerCase();
      return allWorkspaces.filter((w) => w.name.toLowerCase().includes(q));
    }, [filter]);

    const recent = filtered.filter((w) => w.section === "Recent");
    const all = filtered.filter((w) => w.section === "All");

    return (
      <FoundationPage
        title="Context selector"
        intro={
          <>
            A scoped switcher — change the active workspace / project /
            organisation without leaving the current view. Built on{" "}
            <code>Select</code> + a search input above the list, with the
            current selection reflected in the trigger label.
          </>
        }
      >
        <Section
          title="Demo"
          description="Active context shown in the trigger; click to open a Select with grouped 'Recent' + 'All' sections, optional inline search."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Select
                  id="context-selector"
                  isOpen={open}
                  selected={active.id}
                  onSelect={(_e, value) => {
                    const next = allWorkspaces.find((w) => w.id === value);
                    if (next) setActive(next);
                    setOpen(false);
                  }}
                  onOpenChange={setOpen}
                  toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                    <MenuToggle
                      ref={toggleRef}
                      onClick={() => setOpen((o) => !o)}
                      isExpanded={open}
                      style={{ width: 280 } as React.CSSProperties}
                    >
                      <strong style={{ marginInlineEnd: 8 }}>Workspace:</strong>
                      {active.name}
                    </MenuToggle>
                  )}
                >
                  <div style={{ padding: 8 }}>
                    <SearchInput
                      placeholder="Filter workspaces…"
                      value={filter}
                      onChange={(_e, v) => setFilter(v)}
                      onClear={() => setFilter("")}
                      aria-label="Filter workspaces"
                    />
                  </div>
                  <Divider />
                  {recent.length > 0 && (
                    <SelectGroup label="Recent">
                      <SelectList>
                        {recent.map((w) => (
                          <SelectOption
                            key={w.id}
                            value={w.id}
                            isSelected={w.id === active.id}
                          >
                            {w.id === active.id ? (
                              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                                <CheckIcon /> {w.name}
                              </span>
                            ) : (
                              w.name
                            )}
                          </SelectOption>
                        ))}
                      </SelectList>
                    </SelectGroup>
                  )}
                  {all.length > 0 && (
                    <SelectGroup label="All workspaces">
                      <SelectList>
                        {all.map((w) => (
                          <SelectOption
                            key={w.id}
                            value={w.id}
                            isSelected={w.id === active.id}
                          >
                            {w.name}
                          </SelectOption>
                        ))}
                      </SelectList>
                    </SelectGroup>
                  )}
                  {filtered.length === 0 && (
                    <SelectList>
                      <SelectOption isAriaDisabled value="">
                        No matches for &ldquo;{filter}&rdquo;
                      </SelectOption>
                    </SelectList>
                  )}
                </Select>
              </DemoFrame>
              <CodeBlock>{`const [open, setOpen] = useState(false);
const [active, setActive] = useState(workspaces[0]);
const [filter, setFilter] = useState("");
const filtered = workspaces.filter(w => w.name.toLowerCase().includes(filter.toLowerCase()));

<Select
  isOpen={open}
  selected={active.id}
  onSelect={(_, id) => { setActive(byId(id)); setOpen(false); }}
  onOpenChange={setOpen}
  toggle={(toggleRef) => (
    <MenuToggle
      ref={toggleRef}
      onClick={() => setOpen(o => !o)}
      isExpanded={open}
      style={{ width: 280 }}
    >
      <strong>Workspace:</strong> {active.name}
    </MenuToggle>
  )}
>
  <div style={{ padding: 8 }}>
    <SearchInput value={filter} onChange={(_, v) => setFilter(v)} onClear={() => setFilter("")} />
  </div>
  <Divider />
  <SelectGroup label="Recent">
    <SelectList>
      {recent.map(w => (
        <SelectOption key={w.id} value={w.id} isSelected={w.id === active.id}>
          {w.name}
        </SelectOption>
      ))}
    </SelectList>
  </SelectGroup>
  <SelectGroup label="All">{/* ... */}</SelectGroup>
</Select>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="Pattern">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Trigger label = current context</strong>. Prefix with a category word so it&rsquo;s obvious what the user is switching (&ldquo;Workspace: Acme&rdquo;).</li>
              <li><strong>Recent + All sections</strong>. Surface the user&rsquo;s last few contexts at the top; the full list below for completeness.</li>
              <li><strong>Inline search</strong>. Once the list grows past ~10 items, an inline filter beats scrolling.</li>
              <li><strong>Show the current selection</strong> — a checkmark / bold treatment on the active item so the user can verify what they&rsquo;re on.</li>
            </ul>
          </Card>
        </Section>

        <Section title="When to use">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Workspace / project switchers</strong>. The active resource scope changes frequently and you want it always visible in the masthead.</li>
              <li><strong>Account / organisation switching</strong>. Same pattern, different label prefix.</li>
              <li><strong>Environment switching</strong>. Optionally pair with the Banner component to surface non-production environments.</li>
              <li><strong>For navigation between sibling apps</strong> — use Application launcher (previous page).</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
