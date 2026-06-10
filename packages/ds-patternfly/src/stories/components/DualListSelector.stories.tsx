import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  CodeBlock,
  Example,
} from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { Basic } from "../../examples/components/DualListSelector.example.js";
import dualListSelectorExampleSrc from "../../examples/components/DualListSelector.example.tsx?raw";

const meta: Meta = {
  title: "Components/DualListSelector",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
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
          <Example
            source={dualListSelectorExampleSrc}
            region="Basic"
            fileName="DualListSelector.example.tsx"
            height={320}
          >
            <Basic />
          </Example>
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

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={dualListSelectorExampleSrc}
            fileName="DualListSelector.example.tsx"
          />
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
  ),
};
