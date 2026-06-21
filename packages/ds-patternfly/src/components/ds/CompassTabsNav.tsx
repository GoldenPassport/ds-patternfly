import { useId, useRef, useState } from "react";
import {
  Button,
  CompassNavContent,
  CompassNavHome,
  CompassNavMain,
  CompassNavSearch,
  Flex,
  Nav,
  NavExpandable,
  NavItem,
  NavList,
  Panel,
  PanelMain,
  PanelMainBody,
  Tab,
  TabContent,
  Tabs,
  TabsComponent,
  TabTitleText,
} from "../base/index.js";
import TimesIcon from "@patternfly/react-icons/dist/esm/icons/times-icon";
import { type CompassTabsNavLabels, compassTabsNavEnLabels } from "./labels.js";
import type { CompassNavTab } from "./compassModels.js";

export type { CompassNavTab, CompassNavSubtab } from "./compassModels.js";
export type { CompassTabsNavLabels } from "./labels.js";
export { compassTabsNavEnLabels } from "./labels.js";

const disabledItemProps = {
  "aria-disabled": true,
  style: { opacity: 0.5, pointerEvents: "none" as const },
};

export interface CompassTabsNavProps {
  /** Localised chrome strings. Defaults to `compassTabsNavEnLabels`. */
  labels?: CompassTabsNavLabels;
  /** The two-level nav model. */
  tabs: CompassNavTab[];
  /**
   * Which surface to render. `"desktop"` is the inline tabs + subtabs strip
   * (the header nav slot); `"mobile"` is the slide-in `Nav` drawer body.
   * Drive the choice from `useCompassResponsive()`.
   */
  variant: "desktop" | "mobile";
  /** Controlled active top-level tab id. Pair with `onTabChange`. */
  activeTab?: string;
  /** Uncontrolled initial active tab id. Default: first non-disabled tab. */
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
  /** Controlled active subtab id. Pair with `onSubtabChange`. */
  activeSubtab?: string;
  /** Uncontrolled initial active subtab id. */
  defaultActiveSubtab?: string;
  onSubtabChange?: (subtabId: string) => void;
  /** Desktop home button handler (omit to hide). */
  onHome?: () => void;
  /** Desktop search button handler (omit to hide). */
  onSearch?: () => void;
  /** Mobile: called when an item is chosen or the drawer is closed. */
  onNavigate?: () => void;
}

export function CompassTabsNav({
  labels = compassTabsNavEnLabels,
  tabs,
  variant,
  activeTab,
  defaultActiveTab,
  activeSubtab,
  defaultActiveSubtab,
  onTabChange,
  onSubtabChange,
  onHome,
  onSearch,
  onNavigate,
}: CompassTabsNavProps) {
  const id = useId();
  const subTabsRef = useRef<HTMLDivElement>(null);

  const firstEnabled = tabs.find((t) => !t.isDisabled)?.id ?? tabs[0]?.id ?? "";
  const [internalTab, setInternalTab] = useState(defaultActiveTab ?? firstEnabled);
  const [internalSubtab, setInternalSubtab] = useState(defaultActiveSubtab ?? "");

  const curTab = activeTab ?? internalTab;
  const curSubtab = activeSubtab ?? internalSubtab;

  const selectTab = (tabId: string) => {
    if (activeTab === undefined) setInternalTab(tabId);
    onTabChange?.(tabId);
  };
  const selectSubtab = (subtabId: string) => {
    if (activeSubtab === undefined) setInternalSubtab(subtabId);
    onSubtabChange?.(subtabId);
  };

  const activeTabModel = tabs.find((t) => t.id === curTab);

  // ── desktop: two-level tabs strip ────────────────────────────────────
  if (variant === "desktop") {
    const hasSubtabs = !!activeTabModel?.subtabs?.length;
    return (
      <>
        <Panel isPill isGlass>
          <PanelMain>
            <PanelMainBody>
              <CompassNavContent>
                {onHome ? <CompassNavHome onClick={onHome} /> : null}
                <CompassNavMain>
                  <Tabs
                    activeKey={curTab}
                    isNav
                    onSelect={(_e, key) => selectTab(key as string)}
                    component={TabsComponent.nav}
                    aria-label={labels.tabsAriaLabel}
                  >
                    {tabs.map((tab) => (
                      <Tab
                        key={tab.id}
                        eventKey={tab.id}
                        title={<TabTitleText>{tab.label}</TabTitleText>}
                        {...(tab.isDisabled ? { isDisabled: true } : {})}
                        {...(tab.id === curTab && hasSubtabs
                          ? { tabContentId: `${id}-subtabs`, tabContentRef: subTabsRef }
                          : {})}
                      />
                    ))}
                  </Tabs>
                </CompassNavMain>
                {onSearch ? <CompassNavSearch onClick={onSearch} /> : null}
              </CompassNavContent>
            </PanelMainBody>
          </PanelMain>
        </Panel>
        {hasSubtabs ? (
          <Panel isPill isGlass>
            <PanelMain>
              <PanelMainBody style={{ padding: 0 }}>
                <TabContent id={`${id}-subtabs`} ref={subTabsRef}>
                  <CompassNavContent>
                    <CompassNavMain>
                      <Tabs
                        activeKey={curSubtab}
                        isSubtab
                        isNav
                        onSelect={(_e, key) => selectSubtab(key as string)}
                        aria-label={labels.subtabsAriaLabel}
                      >
                        {activeTabModel!.subtabs!.map((sub) => {
                          // Point each subtab's aria-controls at a real element
                          // (the label span) so the reference resolves — these
                          // are nav tabs with no separate content panel.
                          const contentId = `${id}-${sub.id}-content`;
                          return (
                            <Tab
                              key={sub.id}
                              eventKey={sub.id}
                              tabContentId={contentId}
                              title={
                                <TabTitleText>
                                  <span id={contentId}>{sub.label}</span>
                                </TabTitleText>
                              }
                              {...(sub.isDisabled ? { isDisabled: true } : {})}
                            />
                          );
                        })}
                      </Tabs>
                    </CompassNavMain>
                  </CompassNavContent>
                </TabContent>
              </PanelMainBody>
            </PanelMain>
          </Panel>
        ) : null}
      </>
    );
  }

  // ── mobile: slide-in Nav drawer body ─────────────────────────────────
  return (
    <Panel isGlass>
      <PanelMain>
        <PanelMainBody style={{ paddingInline: "var(--pf-t--global--spacer--sm)" }}>
          <Flex
            alignItems={{ default: "alignItemsCenter" }}
            justifyContent={{ default: "justifyContentSpaceBetween" }}
            style={{
              paddingBlock: "var(--pf-t--global--spacer--sm)",
              paddingInline: "var(--pf-t--global--spacer--sm)",
            }}
          >
            <strong>{labels.mobileNavTitle}</strong>
            <Button
              isCircle
              variant="plain"
              aria-label={labels.closeMobileNav}
              icon={<TimesIcon />}
              onClick={() => onNavigate?.()}
            />
          </Flex>
          <Nav aria-label={labels.mobileNavAriaLabel}>
            <NavList>
              {tabs.map((tab) => {
                if (tab.isDisabled) {
                  return (
                    <NavItem key={tab.id} preventDefault to="#" {...disabledItemProps}>
                      {tab.label}
                    </NavItem>
                  );
                }
                if (tab.subtabs?.length) {
                  return (
                    <NavExpandable
                      key={tab.id}
                      title={typeof tab.label === "string" ? tab.label : tab.id}
                      groupId={tab.id}
                      isExpanded
                      isActive={curTab === tab.id}
                    >
                      {tab.subtabs.map((sub) =>
                        sub.isDisabled ? (
                          <NavItem key={sub.id} preventDefault to="#" {...disabledItemProps}>
                            {sub.label}
                          </NavItem>
                        ) : (
                          <NavItem
                            key={sub.id}
                            preventDefault
                            groupId={tab.id}
                            itemId={sub.id}
                            to={`#${sub.id}`}
                            isActive={curTab === tab.id && curSubtab === sub.id}
                            onClick={() => {
                              selectTab(tab.id);
                              selectSubtab(sub.id);
                              onNavigate?.();
                            }}
                          >
                            {sub.label}
                          </NavItem>
                        ),
                      )}
                    </NavExpandable>
                  );
                }
                return (
                  <NavItem
                    key={tab.id}
                    preventDefault
                    itemId={tab.id}
                    to={`#${tab.id}`}
                    isActive={curTab === tab.id}
                    onClick={() => {
                      selectTab(tab.id);
                      onNavigate?.();
                    }}
                  >
                    {tab.label}
                  </NavItem>
                );
              })}
            </NavList>
          </Nav>
        </PanelMainBody>
      </PanelMain>
    </Panel>
  );
}
