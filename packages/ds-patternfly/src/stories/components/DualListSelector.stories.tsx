import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DualListSelector,
  DualListSelectorControl,
  DualListSelectorControlsWrapper,
  DualListSelectorList,
  DualListSelectorListItem,
  DualListSelectorPane,
} from "@patternfly/react-core";
import {
  AngleDoubleLeftIcon,
  AngleDoubleRightIcon,
  AngleLeftIcon,
  AngleRightIcon,
} from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/DualListSelector",
  parameters: { layout: "padded" },
};
export default meta;

type Item = { text: string; selected: boolean };

export const Overview: StoryObj = {
  render: () => {
    const [available, setAvailable] = useState<Item[]>([
      { text: "Read tasks", selected: false },
      { text: "Write tasks", selected: false },
      { text: "Delete tasks", selected: false },
      { text: "Manage members", selected: false },
      { text: "Manage billing", selected: false },
    ]);
    const [chosen, setChosen] = useState<Item[]>([
      { text: "Read workflows", selected: false },
    ]);

    const moveSelected = (fromAvailable: boolean) => {
      const src = fromAvailable ? [...available] : [...chosen];
      const dst = fromAvailable ? [...chosen] : [...available];
      const moved = src.filter((it) => it.selected).map((it) => ({ ...it, selected: false }));
      const remaining = src.filter((it) => !it.selected);
      if (fromAvailable) {
        setAvailable(remaining);
        setChosen([...dst, ...moved]);
      } else {
        setChosen(remaining);
        setAvailable([...dst, ...moved]);
      }
    };

    const moveAll = (fromAvailable: boolean) => {
      if (fromAvailable) {
        setChosen([...chosen, ...available.map((it) => ({ ...it, selected: false }))]);
        setAvailable([]);
      } else {
        setAvailable([...available, ...chosen.map((it) => ({ ...it, selected: false }))]);
        setChosen([]);
      }
    };

    const onOptionSelect = (
      _e: unknown,
      idx: number,
      isAvailable: boolean,
    ) => {
      const set = isAvailable ? setAvailable : setChosen;
      const list = isAvailable ? [...available] : [...chosen];
      const item = list[idx];
      if (!item) return;
      list[idx] = { ...item, selected: !item.selected };
      set(list);
    };

    return (
      <FoundationPage
        title="DualListSelector"
        intro={
          <>
            Two side-by-side lists with controls for moving items between
            them — Available on the left, Chosen on the right (or whatever
            roles you assign). Use for permission pickers, role assignment,
            membership management — anywhere the user needs to curate a
            set from a larger pool.
          </>
        }
      >
        <Section
          title="Basic"
          description="Standard layout: two DualListSelectorPanes (Available + Chosen) with a DualListSelectorControlsWrapper between them. You manage the state and define what 'move selected' / 'move all' mean — PF6 wires the keyboard nav."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame height={320}>
                <DualListSelector>
                  <DualListSelectorPane
                    title="Available permissions"
                    status={`${available.filter((i) => i.selected).length} of ${available.length} selected`}
                  >
                    <DualListSelectorList>
                      {available.map((it, i) => (
                        <DualListSelectorListItem
                          key={it.text}
                          isSelected={it.selected}
                          onOptionSelect={(e) => onOptionSelect(e, i, true)}
                        >
                          {it.text}
                        </DualListSelectorListItem>
                      ))}
                    </DualListSelectorList>
                  </DualListSelectorPane>

                  <DualListSelectorControlsWrapper>
                    <DualListSelectorControl
                      isDisabled={!available.some((i) => i.selected)}
                      onClick={() => moveSelected(true)}
                      aria-label="Add selected"
                      icon={<AngleRightIcon />}
                    />
                    <DualListSelectorControl
                      isDisabled={available.length === 0}
                      onClick={() => moveAll(true)}
                      aria-label="Add all"
                      icon={<AngleDoubleRightIcon />}
                    />
                    <DualListSelectorControl
                      isDisabled={chosen.length === 0}
                      onClick={() => moveAll(false)}
                      aria-label="Remove all"
                      icon={<AngleDoubleLeftIcon />}
                    />
                    <DualListSelectorControl
                      isDisabled={!chosen.some((i) => i.selected)}
                      onClick={() => moveSelected(false)}
                      aria-label="Remove selected"
                      icon={<AngleLeftIcon />}
                    />
                  </DualListSelectorControlsWrapper>

                  <DualListSelectorPane
                    title="Chosen permissions"
                    status={`${chosen.filter((i) => i.selected).length} of ${chosen.length} selected`}
                    isChosen
                  >
                    <DualListSelectorList>
                      {chosen.map((it, i) => (
                        <DualListSelectorListItem
                          key={it.text}
                          isSelected={it.selected}
                          onOptionSelect={(e) => onOptionSelect(e, i, false)}
                        >
                          {it.text}
                        </DualListSelectorListItem>
                      ))}
                    </DualListSelectorList>
                  </DualListSelectorPane>
                </DualListSelector>
              </DemoFrame>
              <CodeBlock>{`// State: available + chosen lists, each item { text, selected }
// Controls between the panes call moveSelected / moveAll handlers.

<DualListSelector>
  <DualListSelectorPane title="Available" status={...}>
    <DualListSelectorList>
      {available.map((it, i) => (
        <DualListSelectorListItem
          key={it.text}
          isSelected={it.selected}
          onOptionSelect={(e) => onOptionSelect(e, i, true)}
        >
          {it.text}
        </DualListSelectorListItem>
      ))}
    </DualListSelectorList>
  </DualListSelectorPane>

  <DualListSelectorControlsWrapper>
    <DualListSelectorControl onClick={() => moveSelected(true)} aria-label="Add" icon={<AngleRightIcon />} />
    <DualListSelectorControl onClick={() => moveAll(true)}   aria-label="Add all" icon={<AngleDoubleRightIcon />} />
    <DualListSelectorControl onClick={() => moveAll(false)}  aria-label="Remove all" icon={<AngleDoubleLeftIcon />} />
    <DualListSelectorControl onClick={() => moveSelected(false)} aria-label="Remove" icon={<AngleLeftIcon />} />
  </DualListSelectorControlsWrapper>

  <DualListSelectorPane title="Chosen" status={...} isChosen>
    {/* same shape with chosen list */}
  </DualListSelectorPane>
</DualListSelector>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="With search"
          description="DualListSelectorPane.searchInputProps wires a search input above each pane — filter the displayed items yourself based on the search value. Code-only here because the filter wiring is verbose."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <CodeBlock>{`<DualListSelectorPane
  title="Available"
  status={status}
  searchInputProps={{
    value: searchAvailable,
    onChange: (_e, v) => setSearchAvailable(v),
    onClear: () => setSearchAvailable(""),
    "aria-label": "Filter available options",
  }}
>
  <DualListSelectorList>
    {available
      .filter(it => it.text.toLowerCase().includes(searchAvailable.toLowerCase()))
      .map(it => (
        <DualListSelectorListItem ...>{it.text}</DualListSelectorListItem>
      ))}
  </DualListSelectorList>
</DualListSelectorPane>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Tree variant"
          description="DualListSelectorTree renders a hierarchical list inside each pane (folders / nested permissions). Pass options as TreeViewDataItem-shaped data; selection cascades through children."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <CodeBlock>{`<DualListSelector>
  <DualListSelectorPane title="Available">
    <DualListSelectorTree
      data={availableTree}
      onOptionCheck={(_e, isChecked, treeItem) => /* update selection */}
    />
  </DualListSelectorPane>
  <DualListSelectorControlsWrapper>{/* ... */}</DualListSelectorControlsWrapper>
  <DualListSelectorPane title="Chosen" isChosen>
    <DualListSelectorTree data={chosenTree} onOptionCheck={...} />
  </DualListSelectorPane>
</DualListSelector>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="Composition">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "DualListSelector", type: "container", description: "Outer wrapper. Holds the two panes + the controls between them." },
                  { name: "DualListSelectorPane", type: "child", description: "One side. title + status (count summary); isChosen marks the right-side pane; searchInputProps adds a filter input." },
                  { name: "DualListSelectorList", type: "child", description: "The list inside a pane. Holds DualListSelectorListItem children." },
                  { name: "DualListSelectorListItem", type: "child", description: "A single option. isSelected drives the row highlight; onOptionSelect fires on click / Enter / Space." },
                  { name: "DualListSelectorControlsWrapper", type: "child", description: "The middle column. Holds the four DualListSelectorControl buttons (move-selected / move-all in both directions)." },
                  { name: "DualListSelectorControl", type: "child", description: "A single control button. icon + aria-label + onClick + isDisabled." },
                  { name: "DualListSelectorTree", type: "child", description: "Hierarchical alternative to DualListSelectorList. Use for nested permission / role pickers." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="When to use">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Permission / role pickers</strong> — &ldquo;Available&rdquo; pool of permissions, &ldquo;Granted&rdquo; on the right.</li>
              <li><strong>Membership editors</strong> — assign users to a group, channel members to a workspace.</li>
              <li><strong>Tag / label assignment</strong> — pick from a master taxonomy, apply to the current resource.</li>
              <li><strong>For simple multi-select</strong> — use Select with hasCheckbox; DualListSelector is heavy.</li>
            </ul>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Each pane needs a clear title</strong> — &ldquo;Available permissions&rdquo; / &ldquo;Granted permissions&rdquo;. Don&rsquo;t leave the user guessing which side is which.</li>
              <li><strong>Each control button needs aria-label</strong> — describe the action AND the direction (&ldquo;Add selected&rdquo;, &ldquo;Remove all&rdquo;).</li>
              <li><strong>Disable controls when their action is invalid</strong> — &ldquo;Add selected&rdquo; should be disabled when no items are selected on the available side.</li>
              <li><strong>Status text matters</strong> — surface &ldquo;3 of 12 selected&rdquo; per pane so users know the scope of their action.</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
