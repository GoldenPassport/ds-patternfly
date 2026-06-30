import { createRef, useId, useState, type ReactNode } from "react";
import {
  Popover,
  Tab,
  TabAction,
  TabContent,
  TabContentBody,
  TabTitleIcon,
  TabTitleText,
  Tabs,
} from "../base/index.js";
import HelpIcon from "@patternfly/react-icons/dist/esm/icons/help-icon";

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
  /** Accessible name for the tab button (defaults to the title text). */
  tabAriaLabel?: string;
  /** A help popover anchored to a per-tab action button. */
  help?: {
    /** Popover header. */
    header?: ReactNode;
    /** Popover body. */
    body: ReactNode;
    /** Accessible name for the help trigger (default "Help"). */
    ariaLabel?: string;
    /** Trigger icon (default a help/question glyph). */
    icon?: ReactNode;
  };
  /** Closable mode: disable just this tab's close button (e.g. the last one). */
  isCloseDisabled?: boolean;
}

/**
 * TabbedView — a declarative tabbed container over a `tabs` array: each entry
 * is { key, title, content, … }. Renders the base Tabs strip + the active
 * panel, and manages the active tab itself (uncontrolled via
 * `defaultActiveKey`) or hands control to you (`activeKey` + `onSelect`).
 *
 * Beyond the basics it owns the common tab patterns so they stay out of your
 * app: leading icons, per-tab help popovers (`tab.help` — the trigger ref +
 * Popover wiring is handled for you), and closable / dynamic tabs (`onClose` /
 * `onAdd`, including moving focus to a neighbouring tab when the active one is
 * closed).
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
  /** Stretch tabs to fill the available width. */
  isFilled?: boolean;
  /** Vertical tab orientation. */
  isVertical?: boolean;
  /** Accessible name for the tablist. */
  ariaLabel?: string;
  /**
   * Make tabs closable. Fired with the key to remove; TabbedView moves the
   * active tab to a neighbour when the closed tab was active.
   */
  onClose?: (key: string) => void;
  /** Show an add-tab button. Fired when it's clicked. */
  onAdd?: () => void;
  /** Accessible name for the add button. */
  addAriaLabel?: string;
}

export function TabbedView({
  tabs,
  activeKey,
  defaultActiveKey,
  onSelect,
  isBox,
  isFilled,
  isVertical,
  ariaLabel,
  onClose,
  onAdd,
  addAriaLabel,
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

  const handleClose = (key: string) => {
    // Closing the active tab: shift focus to the tab that takes its place
    // (the next one, else the previous, else the first remaining).
    if (key === active) {
      const idx = tabs.findIndex((t) => t.key === key);
      const remaining = tabs.filter((t) => t.key !== key);
      const next = remaining[idx] ?? remaining[idx - 1] ?? remaining[0];
      if (next) select(next.key);
    }
    onClose?.(key);
  };

  return (
    <>
      <Tabs
        activeKey={active}
        onSelect={(_e, key) => select(String(key))}
        {...(isBox ? { isBox: true } : {})}
        {...(isFilled ? { isFilled: true } : {})}
        {...(isVertical ? { isVertical: true } : {})}
        {...(onClose ? { onClose: (_e, key) => handleClose(String(key)) } : {})}
        {...(onAdd ? { onAdd } : {})}
        {...(onAdd && addAriaLabel ? { addButtonAriaLabel: addAriaLabel } : {})}
        {...(ariaLabel
          ? // Render as <nav> so aria-label is valid (PF Tabs' default <div>
            // is roleless and rejects aria-label — axe aria-prohibited-attr).
            { component: "nav", "aria-label": ariaLabel }
          : {})}
      >
        {tabs.map((tab) => {
          const helpRef = tab.help ? createRef<HTMLElement>() : null;
          return (
            <Tab
              key={tab.key}
              eventKey={tab.key}
              title={
                <>
                  {tab.icon ? <TabTitleIcon>{tab.icon}</TabTitleIcon> : null}
                  <TabTitleText>{tab.title}</TabTitleText>
                </>
              }
              isDisabled={!!tab.isDisabled}
              tabContentId={`${uid}-${tab.key}`}
              {...(tab.tabAriaLabel ? { "aria-label": tab.tabAriaLabel } : {})}
              {...(onClose
                ? {
                    closeButtonAriaLabel: `Close ${tab.tabAriaLabel ?? tab.key}`,
                    isCloseDisabled: !!tab.isCloseDisabled,
                  }
                : {})}
              {...(tab.help && helpRef
                ? {
                    actions: (
                      <>
                        <TabAction
                          aria-label={tab.help.ariaLabel ?? "Help"}
                          ref={helpRef}
                        >
                          {tab.help.icon ?? <HelpIcon />}
                        </TabAction>
                        <Popover
                          triggerRef={helpRef}
                          {...(tab.help.header
                            ? { headerContent: <div>{tab.help.header}</div> }
                            : {})}
                          bodyContent={<div>{tab.help.body}</div>}
                        />
                      </>
                    ),
                  }
                : {})}
            />
          );
        })}
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
