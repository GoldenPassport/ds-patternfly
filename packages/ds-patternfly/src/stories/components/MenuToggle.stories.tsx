import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  MenuToggle,
  MenuToggleAction,
  MenuToggleCheckbox,
} from "@patternfly/react-core";
import { CogIcon, EllipsisVIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/Menu/Menu toggle",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="MenuToggle"
      intro={
        <>
          The trigger element for menus — used by <code>Dropdown</code>,{" "}
          <code>Select</code>, and any custom menu pattern. Comes in
          variants (default / primary / secondary / plain), sizes, split-button
          shapes (action + checkbox), and stateful styling. Use it directly
          when you need a menu trigger that doesn&rsquo;t fit one of the
          higher-level wrappers.
        </>
      }
    >
      <Section
        title="Variants"
        description="default / primary / secondary / plain. Plain drops the chrome — use for icon-only kebab triggers in toolbars and card headers."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                <MenuToggle>Default</MenuToggle>
                <MenuToggle variant="primary">Primary</MenuToggle>
                <MenuToggle variant="secondary">Secondary</MenuToggle>
                <MenuToggle variant="plain" aria-label="Kebab" icon={<EllipsisVIcon />} />
              </div>
            </DemoFrame>
            <CodeBlock>{`<MenuToggle>Default</MenuToggle>
<MenuToggle variant="primary">Primary</MenuToggle>
<MenuToggle variant="secondary">Secondary</MenuToggle>
<MenuToggle variant="plain" aria-label="Kebab" icon={<EllipsisVIcon />} />`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="States"
        description="isExpanded mirrors the open state of the menu it controls; isDisabled greys it out. PF6 sets aria-expanded automatically."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                <MenuToggle>Idle</MenuToggle>
                <MenuToggle isExpanded>Expanded</MenuToggle>
                <MenuToggle isDisabled>Disabled</MenuToggle>
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Sizes + full-width"
        description="size='sm' for dense toolbars; isFullWidth stretches the toggle to fill its container — useful for Select inside a form field."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 12 }}>
            <DemoFrame>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                <MenuToggle size="sm">Small</MenuToggle>
                <MenuToggle>Default</MenuToggle>
              </div>
            </DemoFrame>
            <DemoFrame>
              <MenuToggle isFullWidth>Full width</MenuToggle>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="With icon"
        description="icon prepends a glyph; pair with a label for context, or pass icon + variant='plain' for an icon-only trigger."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <MenuToggle icon={<CogIcon />}>Settings</MenuToggle>
                <MenuToggle variant="plain" aria-label="Settings" icon={<CogIcon />} />
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Split-button — action"
        description="splitButtonItems creates a two-part toggle: a primary action button on the left + a chevron toggle on the right. Use when one action is overwhelmingly common but a menu of related actions is useful too."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <MenuToggle
                  splitButtonItems={[
                    <MenuToggleAction id="split-action-default" key="action" aria-label="Run">
                      Run
                    </MenuToggleAction>,
                  ]}
                  aria-label="Run with options"
                />
                <MenuToggle
                  variant="primary"
                  splitButtonItems={[
                    <MenuToggleAction id="split-action-primary" key="action" aria-label="Deploy">
                      Deploy
                    </MenuToggleAction>,
                  ]}
                  aria-label="Deploy with options"
                />
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Split-button — checkbox"
        description="splitButtonItems can also hold a MenuToggleCheckbox — the canonical 'select all' header for tables / grids. The chevron then opens a sub-menu (deselect-all, select-page, etc)."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <MenuToggle
                splitButtonItems={[
                  <MenuToggleCheckbox
                    id="split-checkbox-id"
                    key="split-checkbox"
                    aria-label="Select all"
                  />,
                ]}
                aria-label="Selection menu"
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
                { name: "variant", type: '"default" | "primary" | "secondary" | "plain" | "plainText" | "typeahead"', description: "Visual treatment. plain = icon-only / kebab triggers; typeahead = dropdown with a text input inside." },
                { name: "isExpanded", type: "boolean", description: "Mirror the menu's open state. Drives aria-expanded automatically." },
                { name: "isDisabled", type: "boolean", description: "Disables the toggle." },
                { name: "isFullWidth", type: "boolean", description: "Stretch the toggle to its container — typical for Select inside a form field." },
                { name: "size", type: '"default" | "sm"', description: "Compact size for dense toolbars." },
                { name: "icon", type: "ReactNode", description: "Leading glyph. With variant='plain' creates an icon-only trigger; pair with aria-label." },
                { name: "badge", type: "ReactNode | BadgeProps", description: "Trailing badge — useful for filter counts ('Filter (3)')." },
                { name: "status", type: '"success" | "warning" | "danger"', description: "Status accent — coloured edge / icon for status-aware menus (e.g. environment picker)." },
                { name: "splitButtonItems", type: "ReactNode[]", description: "Render as a split button. Pass MenuToggleAction (action), MenuToggleCheckbox (select-all), or MenuToggleStatusIcon." },
                { name: "aria-label", type: "string", description: "Required when the toggle is icon-only or holds only a checkbox." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Use it inside">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Dropdown</strong> — the standard menu pattern.</li>
            <li><strong>Select</strong> — single / multi / typeahead value pickers.</li>
            <li><strong>OverflowMenu</strong> — the &ldquo;more actions&rdquo; trigger when toolbar items collapse.</li>
            <li><strong>Custom menu</strong> — wrap any of the lib&rsquo;s Menu primitives with your own state and a MenuToggle for full control.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>aria-label is required for icon-only or checkbox-only toggles</strong> — without a visible label the screen reader has nothing to announce.</li>
            <li><strong>isExpanded drives aria-expanded</strong> automatically — keep it in sync with the menu&rsquo;s open state.</li>
            <li><strong>Don&rsquo;t hand-build menu triggers with a Button</strong> when MenuToggle covers the case — focus management, type-ahead support, and disclosure semantics come for free.</li>
          </ul>
        </Card>
      </Section>
      <ThemingPointer
        dials={[
          ["--gp-control-pad-y", "Vertical padding — drives toggle height in lockstep with form-control."],
          ["--gp-radius-control", "Corner radius."],
          ["--gp-focus-ring", "Focus-ring colour."],
        ]}
      />
    </FoundationPage>
  ),
};
