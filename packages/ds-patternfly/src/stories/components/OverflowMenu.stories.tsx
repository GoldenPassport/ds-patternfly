import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  BreakpointCollapse,
  GroupedPersistent,
} from "../../examples/components/OverflowMenu.example.js";
import overflowMenuExampleSrc from "../../examples/components/OverflowMenu.example.tsx?raw";
import overflowMenuComponentSrc from "../../components/OverflowMenu.tsx?raw";

const meta: Meta = {
  title: "Components/OverflowMenu",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="OverflowMenu"
      intro={
        <>
          A toolbar wrapper that collapses items into a kebab menu below
          a chosen breakpoint. Use it inside <code>Toolbar</code> /{" "}
          <code>CardHeader</code> when the row carries more actions than
          fit on narrow viewports — desktop sees the buttons, mobile sees
          the kebab + an overlay menu.
        </>
      }
    >
      <Section
        title="Breakpoint collapse"
        description="OverflowMenu.breakpoint sets the threshold — items in OverflowMenuContent stay visible at or above; below, they collapse into the OverflowMenuControl's kebab. Items marked isShared appear in BOTH the visible row and the dropdown."
      >
        <Card>
          <Example
            source={overflowMenuExampleSrc}
            region="BreakpointCollapse"
            fileName="OverflowMenu.example.tsx"
          >
            <BreakpointCollapse />
          </Example>
        </Card>
      </Section>

      <Section
        title="Grouped + persistent"
        description="OverflowMenuGroup clusters related items with consistent spacing. OverflowMenuControl.hasAdditionalOptions=false marks the kebab as a non-overflow control (always visible regardless of breakpoint) — useful when the kebab carries actions that don't appear in the inline row."
      >
        <Card>
          <Example
            source={overflowMenuExampleSrc}
            region="GroupedPersistent"
            fileName="OverflowMenu.example.tsx"
          >
            <GroupedPersistent />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={overflowMenuExampleSrc} fileName="OverflowMenu.example.tsx" />
        </Card>
      </Section>

      <Section title="Composition">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "OverflowMenu", type: "container", description: "Outer wrapper. breakpoint sets the collapse threshold; isPersistent forces the kebab to always render." },
                { name: "OverflowMenuContent", type: "child", description: "The visible items area — collapses below the breakpoint." },
                { name: "OverflowMenuItem", type: "child", description: "Single visible item. isPersistent keeps it visible even when others collapse." },
                { name: "OverflowMenuGroup", type: "child", description: "Cluster with consistent spacing. groupType='button' / 'icon' tunes the gap." },
                { name: "OverflowMenuControl", type: "child", description: "The kebab trigger area. hasAdditionalOptions makes the kebab always render (regardless of breakpoint) so non-overflow actions get a permanent home." },
                { name: "OverflowMenuDropdownItem", type: "child", description: "Item inside the kebab Dropdown. isShared marks an item that ALSO has a visible button — render it in both places so the dropdown doesn't go stale on narrow viewports." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { OverflowMenu, OverflowMenuContent, OverflowMenuControl, OverflowMenuGroup, OverflowMenuItem, OverflowMenuDropdownItem } from "@golden-passport/ds-patternfly";'}
        componentSource={overflowMenuComponentSrc}
        componentFileName="OverflowMenu.tsx"
        rows={[
          { name: "OverflowMenu.breakpoint", type: '"sm" | "md" | "lg" | "xl" | "2xl"', description: "Below this width the OverflowMenuContent collapses into the kebab." },
          { name: "OverflowMenu.breakpointReference", type: '"container" | "viewport"', description: "Whether breakpoint is measured against the container width (responsive layouts) or the viewport." },
          { name: "OverflowMenuItem.isPersistent", type: "boolean", description: "Keep this item visible regardless of breakpoint — for actions that must always be one click away." },
          { name: "OverflowMenuControl.hasAdditionalOptions", type: "boolean", description: "Show the kebab even at wide breakpoints — the dropdown holds non-overflow actions like 'Audit log', 'Settings'." },
          { name: "OverflowMenuDropdownItem.isShared", type: "boolean", description: "Mark a dropdown item that ALSO has a visible-row counterpart. Use when you want the dropdown to always show the full action set on narrow viewports." },
        ]}
      />

      <Section title="When to use">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Toolbar action rows</strong> — pattern: 2–3 primary actions visible, the rest behind a kebab on narrow viewports.</li>
            <li><strong>Card header actions</strong> — when the card hosts more actions than fit on a narrow card width.</li>
            <li><strong>Per-row actions in DataList</strong> — pair with DataListAction so each row collapses to a kebab on mobile.</li>
            <li><strong>For just a kebab menu</strong> — use Dropdown directly with a plain MenuToggle. OverflowMenu is for the visible-row + kebab pair.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Kebab MenuToggle needs aria-label</strong> — &ldquo;More actions&rdquo; is the canonical wording.</li>
            <li><strong>isShared keeps the dropdown&apos;s full action set</strong> on narrow viewports — without it, screen-reader users on mobile lose the &ldquo;Edit / Duplicate / Share&rdquo; entries.</li>
            <li><strong>Don&rsquo;t put hidden-but-not-collapsed actions only in the dropdown.</strong> If an action matters, it should be reachable both ways.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
