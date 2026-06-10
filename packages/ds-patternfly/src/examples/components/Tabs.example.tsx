/**
 * Tabs — switch between sibling views without leaving the page.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { createRef, useState } from "react";
import {
  Popover,
  Tab,
  TabAction,
  TabTitleIcon,
  TabTitleText,
  Tabs,
} from "../_lib.js";
import {
  CogIcon,
  HelpIcon,
  InfoCircleIcon,
  UsersIcon,
} from "@patternfly/react-icons";

// #region Default
export function Default() {
  const [active, setActive] = useState<string | number>(0);

  return (
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
  );
}
// #endregion

// #region BoxWithIcons
export function BoxWithIcons() {
  const [active, setActive] = useState<string | number>(0);

  return (
    <Tabs
      activeKey={active}
      onSelect={(_, k) => setActive(k)}
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
  );
}
// #endregion

// #region Filled
export function Filled() {
  const [active, setActive] = useState<string | number>(0);

  return (
    <Tabs
      activeKey={active}
      onSelect={(_, k) => setActive(k)}
      aria-label="Range tabs"
      role="region"
      isFilled
    >
      <Tab eventKey={0} title={<TabTitleText>Today</TabTitleText>} aria-label="Today" />
      <Tab eventKey={1} title={<TabTitleText>Week</TabTitleText>} aria-label="Week" />
      <Tab eventKey={2} title={<TabTitleText>Month</TabTitleText>} aria-label="Month" />
      <Tab eventKey={3} title={<TabTitleText>Year</TabTitleText>} aria-label="Year" />
    </Tabs>
  );
}
// #endregion

// #region Vertical
export function Vertical() {
  const [active, setActive] = useState<string | number>(0);

  return (
    <Tabs
      activeKey={active}
      onSelect={(_, k) => setActive(k)}
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
  );
}
// #endregion

// #region WithHelpAction
export function WithHelpAction() {
  const [active, setActive] = useState<string | number>(0);

  return (
    <Tabs
      activeKey={active}
      onSelect={(_, k) => setActive(k)}
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
  );
}
// #endregion

// #region Dynamic
export function Dynamic() {
  const [active, setActive] = useState<number>(0);
  const [tabs, setTabs] = useState<string[]>([
    "Terminal 1",
    "Terminal 2",
    "Terminal 3",
  ]);
  const [nextNum, setNextNum] = useState<number>(4);
  const onAdd = () => {
    setTabs([...tabs, `Terminal ${nextNum}`]);
    setActive(tabs.length);
    setNextNum(nextNum + 1);
  };
  const onClose = (_e: unknown, idx: string | number) => {
    const i = idx as number;
    let nextIdx = active;
    if (i < active) nextIdx = Math.max(active - 1, 0);
    else if (active === tabs.length - 1)
      nextIdx = Math.max(tabs.length - 2, 0);
    setActive(nextIdx);
    setTabs(tabs.filter((_, j) => j !== i));
  };

  return (
    <Tabs
      activeKey={active}
      onSelect={(_, k) => setActive(k as number)}
      onClose={onClose}
      onAdd={onAdd}
      aria-label="Dynamic tabs"
      role="region"
      addButtonAriaLabel="Add new tab"
    >
      {tabs.map((t, i) => (
        <Tab
          key={i}
          eventKey={i}
          title={<TabTitleText>{t}</TabTitleText>}
          aria-label={t}
          closeButtonAriaLabel={`Close ${t}`}
          isCloseDisabled={tabs.length === 1}
        >
          <div style={{ padding: "16px 0", color: "var(--gp-color-text-subtle)" }}>
            {t} content
          </div>
        </Tab>
      ))}
    </Tabs>
  );
}
// #endregion

export default function TabsExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Default />
      <BoxWithIcons />
      <Filled />
      <Vertical />
      <WithHelpAction />
      <Dynamic />
    </div>
  );
}
