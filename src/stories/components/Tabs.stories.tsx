import { createRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Popover,
  Tab,
  TabAction,
  TabContent,
  TabTitleIcon,
  TabTitleText,
  Tabs,
} from "@patternfly/react-core";
import {
  CogIcon,
  HelpIcon,
  InfoCircleIcon,
  UsersIcon,
} from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

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
  render: () => {
    const [active, setActive] = useState<string | number>(0);
    const [boxActive, setBoxActive] = useState<string | number>(0);
    const [filledActive, setFilledActive] = useState<string | number>(0);
    const [vertActive, setVertActive] = useState<string | number>(0);
    const [helpActive, setHelpActive] = useState<string | number>(0);
    const [dynActive, setDynActive] = useState<number>(0);
    const [dynTabs, setDynTabs] = useState<string[]>([
      "Terminal 1",
      "Terminal 2",
      "Terminal 3",
    ]);
    const [nextNum, setNextNum] = useState<number>(4);
    const onAdd = () => {
      setDynTabs([...dynTabs, `Terminal ${nextNum}`]);
      setDynActive(dynTabs.length);
      setNextNum(nextNum + 1);
    };
    const onClose = (_e: unknown, idx: string | number) => {
      const i = idx as number;
      let nextIdx = dynActive;
      if (i < dynActive) nextIdx = Math.max(dynActive - 1, 0);
      else if (dynActive === dynTabs.length - 1)
        nextIdx = Math.max(dynTabs.length - 2, 0);
      setDynActive(nextIdx);
      setDynTabs(dynTabs.filter((_, j) => j !== i));
    };
    return (
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
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Tabs
                  activeKey={active}
                  onSelect={(_, k) => setActive(k)}
                  aria-label="Project tabs"
                  role="region"
                  ouiaId="ProjectTabs"
                >
                  <Tab
                    eventKey={0}
                    title={<TabTitleText>Overview</TabTitleText>}
                    aria-label="Overview content"
                  >
                    <div style={{ padding: "16px 0", color: "var(--gp-color-text-subtle)" }}>
                      Overview panel content.
                    </div>
                  </Tab>
                  <Tab
                    eventKey={1}
                    title={<TabTitleText>Members</TabTitleText>}
                    aria-label="Members content"
                  >
                    <div style={{ padding: "16px 0", color: "var(--gp-color-text-subtle)" }}>
                      Members panel content.
                    </div>
                  </Tab>
                  <Tab
                    eventKey={2}
                    title={<TabTitleText>Settings</TabTitleText>}
                    aria-label="Settings content"
                  >
                    <div style={{ padding: "16px 0", color: "var(--gp-color-text-subtle)" }}>
                      Settings panel content.
                    </div>
                  </Tab>
                  <Tab
                    eventKey={3}
                    title={<TabTitleText>Archived</TabTitleText>}
                    isAriaDisabled
                  >
                    Archived
                  </Tab>
                </Tabs>
              </DemoFrame>
              <CodeBlock>{`<Tabs
  activeKey={active}
  onSelect={(_, k) => setActive(k)}
  aria-label="Project tabs"
  role="region"
  ouiaId="ProjectTabs"
>
  <Tab eventKey={0} title={<TabTitleText>Overview</TabTitleText>} aria-label="Overview content">
    ...
  </Tab>
  <Tab eventKey={1} title={<TabTitleText>Members</TabTitleText>} aria-label="Members content">
    ...
  </Tab>
  <Tab eventKey={3} title={<TabTitleText>Archived</TabTitleText>} isAriaDisabled>
    Archived
  </Tab>
</Tabs>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="Box variant with icons">
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Tabs
                  activeKey={boxActive}
                  onSelect={(_, k) => setBoxActive(k)}
                  aria-label="Resource tabs"
                  role="region"
                  isBox
                >
                  <Tab
                    eventKey={0}
                    aria-label="Details content"
                    title={
                      <>
                        <TabTitleIcon><InfoCircleIcon /></TabTitleIcon>
                        <TabTitleText>Details</TabTitleText>
                      </>
                    }
                  >
                    <div style={{ padding: "16px 0", color: "var(--gp-color-text-subtle)" }}>
                      Resource details.
                    </div>
                  </Tab>
                  <Tab
                    eventKey={1}
                    aria-label="Access content"
                    title={
                      <>
                        <TabTitleIcon><UsersIcon /></TabTitleIcon>
                        <TabTitleText>Access</TabTitleText>
                      </>
                    }
                  >
                    <div style={{ padding: "16px 0", color: "var(--gp-color-text-subtle)" }}>
                      Access policies.
                    </div>
                  </Tab>
                  <Tab
                    eventKey={2}
                    aria-label="Config content"
                    title={
                      <>
                        <TabTitleIcon><CogIcon /></TabTitleIcon>
                        <TabTitleText>Config</TabTitleText>
                      </>
                    }
                  >
                    <div style={{ padding: "16px 0", color: "var(--gp-color-text-subtle)" }}>
                      Configuration.
                    </div>
                  </Tab>
                </Tabs>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Filled (equal-width)"
          description="Each tab takes equal share of the row. Good for short labels or when you want the strip to fill its container."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Tabs
                  activeKey={filledActive}
                  onSelect={(_, k) => setFilledActive(k)}
                  aria-label="Range tabs"
                  role="region"
                  isFilled
                >
                  <Tab eventKey={0} title={<TabTitleText>Today</TabTitleText>} aria-label="Today" />
                  <Tab eventKey={1} title={<TabTitleText>Week</TabTitleText>} aria-label="Week" />
                  <Tab eventKey={2} title={<TabTitleText>Month</TabTitleText>} aria-label="Month" />
                  <Tab eventKey={3} title={<TabTitleText>Year</TabTitleText>} aria-label="Year" />
                </Tabs>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section title="Vertical">
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame height={220}>
                <Tabs
                  activeKey={vertActive}
                  onSelect={(_, k) => setVertActive(k)}
                  aria-label="Settings tabs"
                  role="region"
                  isVertical
                >
                  <Tab eventKey={0} title={<TabTitleText>General</TabTitleText>} aria-label="General">
                    <div style={{ padding: 16, color: "var(--gp-color-text-subtle)" }}>
                      General settings.
                    </div>
                  </Tab>
                  <Tab eventKey={1} title={<TabTitleText>Notifications</TabTitleText>} aria-label="Notifications">
                    <div style={{ padding: 16, color: "var(--gp-color-text-subtle)" }}>
                      Notification preferences.
                    </div>
                  </Tab>
                  <Tab eventKey={2} title={<TabTitleText>Integrations</TabTitleText>} aria-label="Integrations">
                    <div style={{ padding: 16, color: "var(--gp-color-text-subtle)" }}>
                      Integration credentials.
                    </div>
                  </Tab>
                </Tabs>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="With help action"
          description="TabAction renders a trailing icon-button per tab — pair with Popover for inline contextual help."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Tabs
                  activeKey={helpActive}
                  onSelect={(_, k) => setHelpActive(k)}
                  aria-label="Help tabs"
                  role="region"
                >
                  {(["Users", "Containers", "Database"] as const).map((t, i) => {
                    const ref = createRef<HTMLElement>();
                    return (
                      <Tab
                        key={i}
                        eventKey={i}
                        title={<TabTitleText>{t}</TabTitleText>}
                        aria-label={`${t} content`}
                        actions={
                          <>
                            <TabAction aria-label={`Help for ${t}`} ref={ref}>
                              <HelpIcon />
                            </TabAction>
                            <Popover
                              triggerRef={ref}
                              headerContent={<div>{t}</div>}
                              bodyContent={
                                <div>
                                  Help content for the {t.toLowerCase()} tab.
                                </div>
                              }
                            />
                          </>
                        }
                      >
                        <div style={{ padding: "16px 0", color: "var(--gp-color-text-subtle)" }}>
                          {t} panel content.
                        </div>
                      </Tab>
                    );
                  })}
                </Tabs>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Dynamic (addable / closeable)"
          description="onClose + onAdd handlers turn Tabs into a terminal-style dynamic strip. Manage the tab array yourself; the component just emits intents."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Tabs
                  activeKey={dynActive}
                  onSelect={(_, k) => setDynActive(k as number)}
                  onClose={onClose}
                  onAdd={onAdd}
                  aria-label="Dynamic tabs"
                  role="region"
                  addButtonAriaLabel="Add new tab"
                >
                  {dynTabs.map((t, i) => (
                    <Tab
                      key={i}
                      eventKey={i}
                      title={<TabTitleText>{t}</TabTitleText>}
                      aria-label={t}
                      closeButtonAriaLabel={`Close ${t}`}
                      isCloseDisabled={dynTabs.length === 1}
                    >
                      <div style={{ padding: "16px 0", color: "var(--gp-color-text-subtle)" }}>
                        {t} content
                      </div>
                    </Tab>
                  ))}
                </Tabs>
              </DemoFrame>
            </div>
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

        <Section title="Most-used Tabs props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
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
            </div>
          </Card>
        </Section>

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
      </FoundationPage>
    );
  },
};
