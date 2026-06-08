import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  NotificationBadge,
  NotificationBadgeVariant,
} from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/NotificationBadge",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [readOpen, setReadOpen] = useState(false);
    const [unreadOpen, setUnreadOpen] = useState(false);
    const [attentionOpen, setAttentionOpen] = useState(false);
    const [countOpen, setCountOpen] = useState(false);
    return (
      <FoundationPage
        title="NotificationBadge"
        intro={
          <>
            A bell-icon trigger that surfaces unread / attention status —
            commonly placed in the masthead to open a NotificationDrawer.
            Three semantic variants (<code>read</code> / <code>unread</code>{" "}
            / <code>attention</code>) plus an optional unread count.
          </>
        }
      >
        <Section
          title="Variants"
          description="read = no notifications; unread = pending notifications (subtle dot); attention = priority signal (filled accent). isExpanded reflects the open/closed state of the drawer the badge controls."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <div style={{ display: "flex", gap: 8 }}>
                  <NotificationBadge
                    variant={NotificationBadgeVariant.read}
                    onClick={() => setReadOpen((v) => !v)}
                    isExpanded={readOpen}
                    aria-label="Notifications (read)"
                  />
                  <NotificationBadge
                    variant={NotificationBadgeVariant.unread}
                    onClick={() => setUnreadOpen((v) => !v)}
                    isExpanded={unreadOpen}
                    aria-label="Notifications (unread)"
                  />
                  <NotificationBadge
                    variant={NotificationBadgeVariant.attention}
                    onClick={() => setAttentionOpen((v) => !v)}
                    isExpanded={attentionOpen}
                    aria-label="Notifications (attention)"
                  />
                </div>
              </DemoFrame>
              <CodeBlock>{`<NotificationBadge
  variant={NotificationBadgeVariant.unread}
  onClick={openDrawer}
  isExpanded={isDrawerOpen}
  aria-label="Notifications"
/>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="With count"
          description="Pass count to overlay the unread total on the bell. Combine with attention variant for high-priority queues."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <NotificationBadge
                  variant={NotificationBadgeVariant.attention}
                  count={12}
                  onClick={() => setCountOpen((v) => !v)}
                  isExpanded={countOpen}
                  aria-label="Notifications (12 unread)"
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
                  { name: "variant", type: '"read" | "unread" | "attention"', description: "Visual state. read = no notifications; unread = pending; attention = priority signal." },
                  { name: "count", type: "number", description: "Unread count overlay. Omit when the variant alone is enough." },
                  { name: "isExpanded", type: "boolean", description: "Reflects the open state of the drawer / panel the badge controls. Drives aria-expanded." },
                  { name: "onClick", type: "(event) => void", description: "Open / close the associated drawer." },
                  { name: "aria-label", type: "string", description: "Required. Accessible name — include the count for screen readers (e.g. 'Notifications (12 unread)')." },
                  { name: "shouldNotify", type: "boolean", description: "Trigger an attention animation on the bell — useful when a new high-priority alert arrives." },
                  { name: "attentionScreenReaderText / unreadScreenReaderText", type: "string", description: "Per-variant SR-only suffix to the aria-label (defaults to 'attention notification' / 'unread notification')." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Pairing with NotificationDrawer">
          <Card>
            <div style={{ padding: 24 }}>
              <CodeBlock>{`const [isDrawerOpen, setDrawerOpen] = useState(false);
const unreadCount = useUnreadCount();
const variant =
  unreadCount === 0 ? "read" :
  hasPriority    ? "attention" :
                   "unread";

<Masthead>
  <MastheadMain>...</MastheadMain>
  <MastheadContent>
    <Toolbar>
      <ToolbarContent>
        <ToolbarItem align={{ default: "alignEnd" }}>
          <NotificationBadge
            variant={variant}
            count={unreadCount}
            isExpanded={isDrawerOpen}
            onClick={() => setDrawerOpen(o => !o)}
            aria-label={\`Notifications (\${unreadCount} unread)\`}
          />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  </MastheadContent>
</Masthead>

<Page
  notificationDrawer={<NotificationDrawer>...</NotificationDrawer>}
  isNotificationDrawerExpanded={isDrawerOpen}
  onNotificationDrawerExpand={focusFirstItem}
  ...
/>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>aria-label is required.</strong> Include the count if present — &ldquo;Notifications (12 unread)&rdquo; reads better than just &ldquo;Notifications&rdquo;.</li>
              <li><strong>Pair with isExpanded</strong> when controlling a drawer — the badge gets <code>aria-expanded</code> automatically and screen-reader users hear the toggle state.</li>
              <li><strong>Don&rsquo;t rely on colour alone</strong> for the variant difference — the count and aria-label carry the meaning when colour is unavailable.</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
