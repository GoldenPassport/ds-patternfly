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
import tabsComponentSrc from "../../components/base/Tabs.tsx?raw";

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
        description="TabAction renders a trailing icon-button per tab — pair with Popover for inline contextual help."
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
        description="onClose + onAdd handlers turn Tabs into a terminal-style dynamic strip. Manage the tab array yourself; the component just emits intents."
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

      <Section title="Composition">
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
        importStatement={'import { Tabs, Tab, TabAction, TabContent, TabTitleIcon, TabTitleText } from "@golden-passport/ds-patternfly";'}
        componentSource={tabsComponentSrc}
        componentFileName="Tabs.tsx"
        rows={[
          { name: "activeKey", type: "string | number", description: "Currently selected eventKey. Required for controlled use." },
          { name: "onSelect", type: "(event, eventKey) => void", description: "Called when the user picks a tab." },
          { name: "aria-label", type: "string", description: "Required when there's no visible label above the strip — names the tablist for screen readers." },
          { name: 'role="region"', type: "string", description: "Set to 'region' to make the Tabs wrapper a landmark — pairs with aria-label per WAI-ARIA tabs pattern." },
          { name: "isBox", type: "boolean", description: "Boxed style — tabs render as connected card edges. Good when tabs sit above a clearly bounded surface." },
          { name: "isFilled", type: "boolean", description: "Each tab takes equal share of the available width." },
          { name: "isVertical", type: "boolean", description: "Vertical orientation — tab strip on the side, panel to the right." },
          { name: 'variant', type: '"default" | "secondary"', description: "Secondary level styling — for nested tabs under a primary set." },
          { name: "onClose / onAdd", type: "fn", description: "Enable closeable tabs (X button per tab) and an Add (+) button at the end of the strip." },
          { name: "isOverflowHorizontal", type: "boolean | { showTabCount }", description: "When tabs overflow the container, wrap in scroll buttons (and optionally show a count)." },
          { name: "mountOnEnter / unmountOnExit", type: "boolean", description: "Lazy-mount panels on first visit / unmount when hidden. Use for heavy panels." },
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
