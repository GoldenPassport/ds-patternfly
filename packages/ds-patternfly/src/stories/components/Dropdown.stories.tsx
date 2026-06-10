import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Divider,
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownList,
  MenuToggle,
  type MenuToggleElement,
} from "@golden-passport/ds-patternfly";
import { EllipsisVIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Components/Menu/Dropdown",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [basic, setBasic] = useState(false);
    const [kebab, setKebab] = useState(false);
    const [groups, setGroups] = useState(false);
    const [desc, setDesc] = useState(false);

    return (
      <FoundationPage
        title="Dropdown"
        intro={
          <>
            A menu of actions opened by a trigger. Use for action menus
            (kebab in toolbars / cards), command lists (&ldquo;Run&rdquo;,
            &ldquo;Duplicate&rdquo;, &ldquo;Delete&rdquo;), and any
            click-to-open list of <em>things to do</em>. For value
            selection, use <code>Select</code> instead.
          </>
        }
      >
        <Section
          title="Basic"
          description="Wrap a Dropdown around a MenuToggle (the trigger) + a DropdownList (the menu). Track the open state yourself; PF6 wires aria-expanded, focus on open, Escape to close, and shouldFocusToggleOnSelect to return focus to the trigger after a selection."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Dropdown
                  isOpen={basic}
                  onSelect={() => setBasic(false)}
                  onOpenChange={setBasic}
                  ouiaId="BasicDropdown"
                  shouldFocusToggleOnSelect
                  toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                    <MenuToggle
                      ref={toggleRef}
                      onClick={() => setBasic((o) => !o)}
                      isExpanded={basic}
                    >
                      Actions
                    </MenuToggle>
                  )}
                >
                  <DropdownList>
                    <DropdownItem value="run">Run</DropdownItem>
                    <DropdownItem value="duplicate">Duplicate</DropdownItem>
                    <DropdownItem value="archive" isDisabled>Archive</DropdownItem>
                    <Divider component="li" key="sep" />
                    <DropdownItem value="delete">Delete</DropdownItem>
                  </DropdownList>
                </Dropdown>
              </DemoFrame>
              <CodeBlock>{`const [isOpen, setIsOpen] = useState(false);

<Dropdown
  isOpen={isOpen}
  onSelect={() => setIsOpen(false)}
  onOpenChange={setIsOpen}
  shouldFocusToggleOnSelect
  toggle={(toggleRef) => (
    <MenuToggle
      ref={toggleRef}
      onClick={() => setIsOpen(o => !o)}
      isExpanded={isOpen}
    >
      Actions
    </MenuToggle>
  )}
>
  <DropdownList>
    <DropdownItem value="run">Run</DropdownItem>
    <DropdownItem value="duplicate">Duplicate</DropdownItem>
    <Divider component="li" />
    <DropdownItem value="delete">Delete</DropdownItem>
  </DropdownList>
</Dropdown>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Kebab toggle"
          description="The icon-only kebab pattern — used in toolbars and per-row actions. variant='plain' on the MenuToggle + an icon makes the trigger compact and unobtrusive."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Dropdown
                  isOpen={kebab}
                  onSelect={() => setKebab(false)}
                  onOpenChange={setKebab}
                  shouldFocusToggleOnSelect
                  toggle={(toggleRef) => (
                    <MenuToggle
                      ref={toggleRef}
                      aria-label="Row actions"
                      variant="plain"
                      onClick={() => setKebab((o) => !o)}
                      isExpanded={kebab}
                      icon={<EllipsisVIcon />}
                    />
                  )}
                >
                  <DropdownList>
                    <DropdownItem>Edit</DropdownItem>
                    <DropdownItem>Duplicate</DropdownItem>
                    <Divider component="li" />
                    <DropdownItem>Delete</DropdownItem>
                  </DropdownList>
                </Dropdown>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Grouped"
          description="DropdownGroup with label wraps a titled cluster. Use for menus with categorically distinct sections (recent / favourites / all)."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Dropdown
                  isOpen={groups}
                  onSelect={() => setGroups(false)}
                  onOpenChange={setGroups}
                  shouldFocusToggleOnSelect
                  toggle={(toggleRef) => (
                    <MenuToggle
                      ref={toggleRef}
                      onClick={() => setGroups((o) => !o)}
                      isExpanded={groups}
                    >
                      Quick switch
                    </MenuToggle>
                  )}
                >
                  <DropdownGroup label="Workspaces">
                    <DropdownList>
                      <DropdownItem>Acme</DropdownItem>
                      <DropdownItem>Beta Lab</DropdownItem>
                    </DropdownList>
                  </DropdownGroup>
                  <Divider />
                  <DropdownGroup label="Recent runs">
                    <DropdownList>
                      <DropdownItem>onboarding-flow #1284</DropdownItem>
                      <DropdownItem>build-pipeline #1283</DropdownItem>
                    </DropdownList>
                  </DropdownGroup>
                </Dropdown>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="With descriptions"
          description="DropdownItem.description adds a quieter sub-label — useful when the action name alone doesn't fully describe what it does."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Dropdown
                  isOpen={desc}
                  onSelect={() => setDesc(false)}
                  onOpenChange={setDesc}
                  toggle={(toggleRef) => (
                    <MenuToggle
                      ref={toggleRef}
                      onClick={() => setDesc((o) => !o)}
                      isExpanded={desc}
                    >
                      Run options
                    </MenuToggle>
                  )}
                >
                  <DropdownList>
                    <DropdownItem description="Use the latest commit on main">
                      Run now
                    </DropdownItem>
                    <DropdownItem description="Trigger after the current run completes">
                      Queue run
                    </DropdownItem>
                    <DropdownItem
                      description="Pin to a specific commit"
                      isAriaDisabled
                      tooltipProps={{ content: "Available on the Pro plan" }}
                    >
                      Run pinned
                    </DropdownItem>
                  </DropdownList>
                </Dropdown>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Split-button (action + chevron)"
          description="Pass splitButtonItems on the MenuToggle — the primary action is always one click away; the chevron opens the menu of related actions. Code-only here because the wiring needs the parent to manage both the action click AND the dropdown open state."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <CodeBlock>{`<Dropdown
  isOpen={isOpen}
  onSelect={() => setIsOpen(false)}
  onOpenChange={setIsOpen}
  toggle={(toggleRef) => (
    <MenuToggle
      ref={toggleRef}
      variant="primary"
      isExpanded={isOpen}
      onClick={() => setIsOpen(o => !o)}
      splitButtonItems={[
        <MenuToggleAction
          id="deploy-action"
          key="deploy"
          aria-label="Deploy"
          onClick={runDeploy}
        >
          Deploy
        </MenuToggleAction>
      ]}
      aria-label="Deploy with options"
    />
  )}
>
  <DropdownList>
    <DropdownItem>Deploy with rollback</DropdownItem>
    <DropdownItem>Deploy as canary</DropdownItem>
    <DropdownItem>Deploy and notify</DropdownItem>
  </DropdownList>
</Dropdown>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="Composition">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "Dropdown", type: "container", description: "The wrapper. Owns isOpen, onSelect, onOpenChange, popperProps." },
                  { name: "DropdownList", type: "child", description: "The actual menu list. Holds DropdownItem and Divider children." },
                  { name: "DropdownItem", type: "child", description: "A single action. value identifies it; description for sub-label; tooltipProps + isAriaDisabled for inline disable explanations; to / href for link items." },
                  { name: "DropdownGroup", type: "child", description: "Titled section for grouped items." },
                  { name: "MenuToggle (passed to toggle prop)", type: "child", description: "The trigger. See Components/MenuToggle for variants and split-button options." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Most-used Dropdown props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "isOpen", type: "boolean", description: "Open/closed state. Controlled." },
                  { name: "onOpenChange", type: "(isOpen) => void", description: "Fires when the menu opens or closes (Escape, outside click, item selection). Update your isOpen state here." },
                  { name: "onSelect", type: "(event, value) => void", description: "Fires when an item is activated. Typical pattern: setIsOpen(false) + handle the action." },
                  { name: "shouldFocusToggleOnSelect", type: "boolean", description: "Return focus to the trigger after selection. Recommended for action menus so keyboard users land back where they started." },
                  { name: "toggle", type: "(toggleRef) => ReactNode", description: "Render-prop for the trigger. Accepts a ref that PF6 wires for focus management." },
                  { name: "popperProps", type: "PopperProps", description: "Override placement / appendTo / etc. Default opens below-start; pass position='right' for kebab menus near the right edge." },
                  { name: "ouiaId", type: "string", description: "Stable test selector." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Dropdown vs Select">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Dropdown</strong> — a menu of <em>actions</em>. Each item does something. The trigger label is an action category (&ldquo;Actions&rdquo;, &ldquo;Run&rdquo;).</li>
              <li><strong>Select</strong> — a menu of <em>values</em>. Each item is a choice; the trigger label updates to the selected value (&ldquo;us-east-1&rdquo;, &ldquo;Workflow A&rdquo;).</li>
              <li><strong>OverflowMenu</strong> — toolbar items that collapse into a kebab Dropdown below a breakpoint.</li>
            </ul>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Always wire onOpenChange</strong> — without it, Escape and outside-click won&rsquo;t update your state.</li>
              <li><strong>shouldFocusToggleOnSelect for action menus.</strong> Returning focus to the trigger after the action is the keyboard-friendly behaviour.</li>
              <li><strong>Use isAriaDisabled + tooltipProps</strong> for items that are unavailable for an explainable reason — the screen reader user discovers them and hears why.</li>
              <li><strong>Kebab triggers need aria-label.</strong> A bare ⋮ icon doesn&rsquo;t announce.</li>
            </ul>
          </Card>
        </Section>
        <ThemingPointer
          dials={[
            ["--gp-radius-control", "Toggle + popup corner radius."],
            ["--gp-surface-elevated", "Open menu background."],
            ["--gp-shadow-popover", "Menu drop shadow."],
            ["--gp-focus-ring", "Focus-ring colour."],
          ]}
        />
      </FoundationPage>
    );
  },
};
