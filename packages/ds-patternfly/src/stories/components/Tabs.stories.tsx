import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  CodeBlock,
  ConfigurationSection,
  Example,
  ThemingPointer,
} from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  Default,
  BoxWithIcons,
  Filled,
  Vertical,
  WithHelpAction,
  Dynamic,
} from "../../examples/components/Tabs.example.js";
import tabsExampleSrc from "../../examples/components/Tabs.example.tsx?raw";
import tabbedViewComponentSrc from "../../components/ds/TabbedView.tsx?raw";

const meta: Meta = {
  title: "Components/Tabs",
  parameters: {
    layout: "padded",
    a11y: {
      config: {
        // PF6's Tabs internals trigger several axe rules that don't reflect
        // real a11y bugs in our usage:
        //  - aria-valid-attr-value: the "Filled" variant has no content
        //    bodies, so PF still emits aria-controls pointing at absent ids.
        //  - aria-required-children: tabs with TabAction (help icon) or
        //    closeButton render extra structure inside the tablist that axe
        //    flags as non-tab children, but PF's keyboard nav handles them.
        rules: [
          { id: "aria-valid-attr-value", enabled: false },
          { id: "aria-required-children", enabled: false },
        ],
      },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Tabs"
      intro={
        <>
          Switch between sibling views without leaving the page. Use for
          related content that shares a heading — settings panels, detail
          views, dashboard subsections. For navigation between pages, use{" "}
          <code>Nav</code> instead.
        </>
      }
    >
      <Section title="Default">
        <Card>
          <Example
            source={tabsExampleSrc}
            region="Default"
            fileName="Tabs.example.tsx"
          >
            <Default />
          </Example>
        </Card>
      </Section>

      <Section title="Box variant with icons">
        <Card>
          <Example
            source={tabsExampleSrc}
            region="BoxWithIcons"
            fileName="Tabs.example.tsx"
          >
            <BoxWithIcons />
          </Example>
        </Card>
      </Section>

      <Section
        title="Filled (equal-width)"
        description="Each tab takes equal share of the row. Good for short labels or when you want the strip to fill its container."
      >
        <Card>
          <Example
            source={tabsExampleSrc}
            region="Filled"
            fileName="Tabs.example.tsx"
          >
            <Filled />
          </Example>
        </Card>
      </Section>

      <Section title="Vertical">
        <Card>
          <Example
            source={tabsExampleSrc}
            region="Vertical"
            fileName="Tabs.example.tsx"
            height={220}
          >
            <Vertical />
          </Example>
        </Card>
      </Section>

      <Section
        title="With help action"
        description="Pass tab.help and TabbedView renders a per-tab help icon-button wired to a Popover — the trigger ref + Popover plumbing is handled for you."
      >
        <Card>
          <Example
            source={tabsExampleSrc}
            region="WithHelpAction"
            fileName="Tabs.example.tsx"
          >
            <WithHelpAction />
          </Example>
        </Card>
      </Section>

      <Section
        title="Dynamic (addable / closeable)"
        description="onAdd / onClose turn the strip into a terminal-style dynamic tab set. You own the tab array; TabbedView moves the active tab to a neighbour when the active one is closed."
      >
        <Card>
          <Example
            source={tabsExampleSrc}
            region="Dynamic"
            fileName="Tabs.example.tsx"
          >
            <Dynamic />
          </Example>
        </Card>
      </Section>

      <Section
        title="Detached panels"
        description="When the tab strip and its panel content are separated by other layout (e.g. sticky header), use TabContent and link by id."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <CodeBlock>{`const ref0 = useRef<HTMLElement>(null);
const ref1 = useRef<HTMLElement>(null);

<Tabs activeKey={active} onSelect={(_, k) => setActive(k)} role="region">
  <Tab eventKey={0} title={<TabTitleText>One</TabTitleText>} tabContentId="t0" tabContentRef={ref0} />
  <Tab eventKey={1} title={<TabTitleText>Two</TabTitleText>} tabContentId="t1" tabContentRef={ref1} />
</Tabs>

{/* ...elsewhere on the page... */}
<TabContent eventKey={0} id="t0" ref={ref0}>One panel</TabContent>
<TabContent eventKey={1} id="t1" ref={ref1} hidden>Two panel</TabContent>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={tabsExampleSrc} fileName="Tabs.example.tsx" />
        </Card>
      </Section>

      <Section
        title="Underlying primitives"
        description="TabbedView composes these base PF6 parts. Reach for them directly only when you need a layout TabbedView doesn't cover (e.g. detached panels above)."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "Tabs", type: "container", description: "The tab strip + panel host. Owns activeKey and selection." },
                { name: "Tab", type: "child", description: "A single tab. eventKey identifies it; title is a node (use TabTitleText / TabTitleIcon); aria-label names the panel content." },
                { name: "TabTitleText", type: "child", description: "Wraps the visible label inside a Tab title." },
                { name: "TabTitleIcon", type: "child", description: "Wraps a leading icon inside a Tab title." },
                { name: "TabAction", type: "child", description: "Trailing icon-button on a tab — pair with Popover/Tooltip for help or settings glyphs." },
                { name: "TabContent", type: "child", description: "Detached panel — used when panels live outside the Tabs subtree. Link via tabContentId + tabContentRef." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { TabbedView, type TabDef } from "@golden-passport/ds-patternfly";'}
        componentSource={tabbedViewComponentSrc}
        componentFileName="TabbedView.tsx"
        description="TabbedView owns the active-tab state and the Tabs/Tab/TabContent wiring. Pass a tabs array; opt into icons, help popovers, and dynamic add/close declaratively."
        rows={[
          { name: "tabs", type: "TabDef[]", description: "The tabs: { key, title, content, icon?, isDisabled?, tabAriaLabel?, help?, isCloseDisabled? }." },
          { name: "activeKey / defaultActiveKey", type: "string", description: "Controlled active key (with onSelect), or the initial key when uncontrolled (defaults to the first tab)." },
          { name: "onSelect", type: "(key: string) => void", description: "Fired with the next key when a tab is selected." },
          { name: "ariaLabel", type: "string", description: "Names the tablist; rendered as a <nav> so the label is valid." },
          { name: "isBox / isFilled / isVertical", type: "boolean", description: "Box (card-edge) styling, equal-width fill, or vertical orientation." },
          { name: "tab.help", type: "{ header?, body, ariaLabel?, icon? }", description: "Renders a per-tab help icon-button wired to a Popover — trigger ref + Popover handled for you." },
          { name: "onAdd / addAriaLabel", type: "() => void / string", description: "Show an add-tab (+) button. You append to your tab array in the handler." },
          { name: "onClose", type: "(key: string) => void", description: "Make tabs closable. Remove the key from your array; TabbedView re-focuses a neighbour if the active tab closed." },
        ]}
      />

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>aria-label is required</strong> when there&rsquo;s no visible heading naming the tablist. Multiple tab regions on a page need distinct names.</li>
            <li><strong>Use <code>role=&quot;region&quot;</code> on Tabs</strong> per the WAI-ARIA tabs pattern — makes the tab panel a landmark with the same accessible name as the strip.</li>
            <li><strong>Set <code>aria-label</code> on each Tab</strong> to give the panel content a name distinct from the tab title (useful when titles are short or icon-only).</li>
            <li><strong>Prefer <code>isAriaDisabled</code> over <code>isDisabled</code></strong> — aria-disabled tabs stay focusable, so screen-reader users discover them and tooltip-based explanations work.</li>
            <li><strong>Keyboard:</strong> Arrow keys move between tabs (left/right horizontal, up/down vertical), Home/End jump to ends, Enter/Space activates.</li>
            <li><strong>Don&rsquo;t nest more than two levels.</strong> Use <code>variant=&quot;secondary&quot;</code> for the inner level if you must, but consider an alternative pattern first.</li>
            <li><strong>Use <code>Nav</code> for navigation,</strong> not Tabs. Tabs imply same-page view switching; clicking shouldn&rsquo;t change the URL meaningfully.</li>
          </ul>
        </Card>
      </Section>
      <ThemingPointer
        dials={[
          ["--gp-border-default", "Tab strip underline colour."],
          ["--gp-text-default", "Active tab text."],
          ["--gp-text-subtle", "Inactive tab text."],
          ["--gp-focus-ring", "Tab focus-ring colour."],
          ["--gp-motion-duration", "Tab-switch transition."],
        ]}
      />
    </FoundationPage>
  ),
};
