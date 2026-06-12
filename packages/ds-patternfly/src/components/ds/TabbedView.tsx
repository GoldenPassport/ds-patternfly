import { useId, useState, type ReactNode } from "react";
import {
  Tab,
  TabContent,
  TabContentBody,
  TabTitleText,
  Tabs,
} from "../base/index.js";

/** One tab: a key, its title, and the panel content. */
export interface TabDef {
  /** Stable key — also the value passed to onSelect. */
  key: string;
  /** Tab label. */
  title: ReactNode;
  /** Panel content shown when this tab is active. */
  content: ReactNode;
  /** Disable this tab. */
  isDisabled?: boolean;
  /** Optional leading icon in the tab title. */
  icon?: ReactNode;
}

/**
 * TabbedView — a declarative tabbed container over a `tabs` array: each entry
 * is { key, title, content }. Renders the base Tabs strip + the active
 * panel, and manages the active tab itself (uncontrolled via
 * `defaultActiveKey`) or hands control to you (`activeKey` + `onSelect`).
 */
export interface TabbedViewProps {
  /** The tabs to render. */
  tabs: TabDef[];
  /** Controlled active key. Omit to let TabbedView manage it. */
  activeKey?: string;
  /** Initial active key when uncontrolled. Defaults to the first tab. */
  defaultActiveKey?: string;
  /** Fired with the next key when a tab is selected. */
  onSelect?: (key: string) => void;
  /** Box (card-like) tab styling. */
  isBox?: boolean;
  /** Vertical tab orientation. */
  isVertical?: boolean;
  /** Accessible name for the tablist. */
  ariaLabel?: string;
}

export function TabbedView({
  tabs,
  activeKey,
  defaultActiveKey,
  onSelect,
  isBox,
  isVertical,
  ariaLabel,
}: TabbedViewProps) {
  const uid = useId();
  const [internalKey, setInternalKey] = useState(
    defaultActiveKey ?? tabs[0]?.key ?? "",
  );
  const active = activeKey ?? internalKey;

  const select = (key: string) => {
    if (activeKey === undefined) setInternalKey(key);
    onSelect?.(key);
  };

  return (
    <>
      <Tabs
        activeKey={active}
        onSelect={(_e, key) => select(String(key))}
        {...(isBox ? { isBox: true } : {})}
        {...(isVertical ? { isVertical: true } : {})}
        {...(ariaLabel
          ? // Render as <nav> so aria-label is valid (PF Tabs' default <div>
            // is roleless and rejects aria-label — axe aria-prohibited-attr).
            { component: "nav", "aria-label": ariaLabel }
          : {})}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            eventKey={tab.key}
            title={
              <TabTitleText>
                {tab.icon ? (
                  <span style={{ marginInlineEnd: 6 }}>{tab.icon}</span>
                ) : null}
                {tab.title}
              </TabTitleText>
            }
            isDisabled={!!tab.isDisabled}
            tabContentId={`${uid}-${tab.key}`}
          />
        ))}
      </Tabs>
      {tabs.map((tab) => (
        <TabContent
          key={tab.key}
          eventKey={tab.key}
          id={`${uid}-${tab.key}`}
          activeKey={active}
          hidden={tab.key !== active}
        >
          <TabContentBody>{tab.content}</TabContentBody>
        </TabContent>
      ))}
    </>
  );
}
