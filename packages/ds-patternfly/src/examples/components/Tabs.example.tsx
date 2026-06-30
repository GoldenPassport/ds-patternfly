/**
 * Tabs — switch between sibling views without leaving the page. The exported
 * TabbedView lego block owns the active-tab state, the Tabs/Tab/TabContent
 * wiring, leading icons, per-tab help popovers, and closable / dynamic tabs;
 * you pass a `tabs` array of { key, title, content }.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import { TabbedView, type TabDef } from "@golden-passport/ds-patternfly";
import { CogIcon, InfoCircleIcon, UsersIcon } from "@patternfly/react-icons";

const panel = (text: string) => (
  <div style={{ padding: "16px 0", color: "var(--gp-color-text-subtle)" }}>{text}</div>
);

// #region Default
export function Default() {
  return (
    <TabbedView
      ariaLabel="Project tabs"
      tabs={[
        { key: "overview", title: "Overview", content: panel("Overview panel content.") },
        { key: "members", title: "Members", content: panel("Members panel content.") },
        { key: "settings", title: "Settings", content: panel("Settings panel content.") },
        { key: "archived", title: "Archived", content: panel("Archived."), isDisabled: true },
      ]}
    />
  );
}
// #endregion

// #region BoxWithIcons
export function BoxWithIcons() {
  return (
    <TabbedView
      isBox
      ariaLabel="Resource tabs"
      tabs={[
        { key: "details", title: "Details", icon: <InfoCircleIcon />, content: panel("Resource details.") },
        { key: "access", title: "Access", icon: <UsersIcon />, content: panel("Access policies.") },
        { key: "config", title: "Config", icon: <CogIcon />, content: panel("Configuration.") },
      ]}
    />
  );
}
// #endregion

// #region Filled
export function Filled() {
  return (
    <TabbedView
      isFilled
      ariaLabel="Range tabs"
      tabs={[
        { key: "today", title: "Today", content: panel("Today.") },
        { key: "week", title: "Week", content: panel("This week.") },
        { key: "month", title: "Month", content: panel("This month.") },
        { key: "year", title: "Year", content: panel("This year.") },
      ]}
    />
  );
}
// #endregion

// #region Vertical
export function Vertical() {
  return (
    <TabbedView
      isVertical
      ariaLabel="Settings tabs"
      tabs={[
        { key: "general", title: "General", content: panel("General settings.") },
        { key: "notifications", title: "Notifications", content: panel("Notification preferences.") },
        { key: "integrations", title: "Integrations", content: panel("Integration credentials.") },
      ]}
    />
  );
}
// #endregion

// #region WithHelpAction
export function WithHelpAction() {
  return (
    <TabbedView
      ariaLabel="Help tabs"
      tabs={(["Users", "Containers", "Database"] as const).map((t) => ({
        key: t.toLowerCase(),
        title: t,
        content: panel(`${t} panel content.`),
        help: {
          header: t,
          body: `Help content for the ${t.toLowerCase()} tab.`,
          ariaLabel: `Help for ${t}`,
        },
      }))}
    />
  );
}
// #endregion

// #region Dynamic
export function Dynamic() {
  const [tabs, setTabs] = useState<string[]>(["Terminal 1", "Terminal 2", "Terminal 3"]);
  const [active, setActive] = useState("terminal-1");
  const [nextNum, setNextNum] = useState(4);

  const items: TabDef[] = tabs.map((t) => ({
    key: t.toLowerCase().replace(/\s+/g, "-"),
    title: t,
    tabAriaLabel: t,
    content: panel(`${t} content`),
    isCloseDisabled: tabs.length === 1,
  }));

  return (
    <TabbedView
      ariaLabel="Dynamic tabs"
      tabs={items}
      activeKey={active}
      onSelect={setActive}
      addAriaLabel="Add new tab"
      onAdd={() => {
        const label = `Terminal ${nextNum}`;
        setTabs([...tabs, label]);
        setActive(label.toLowerCase().replace(/\s+/g, "-"));
        setNextNum(nextNum + 1);
      }}
      onClose={(key) =>
        setTabs(tabs.filter((t) => t.toLowerCase().replace(/\s+/g, "-") !== key))
      }
    />
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
