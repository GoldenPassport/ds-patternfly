import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
  NotificationDrawer,
  NotificationDrawerBody,
  NotificationDrawerHeader,
  NotificationDrawerList,
  NotificationDrawerListItem,
  NotificationDrawerListItemBody,
  NotificationDrawerListItemHeader,
} from "@patternfly/react-core";
import { SearchIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Components/NotificationDrawer",
  parameters: {
    layout: "padded",
    a11y: {
      config: {
        // The doc page renders multiple drawers + an EmptyState (h3) + per-
        // notification headings (h2 by default) inside our section <h2>s.
        // In real apps the drawer hosts one consistent heading hierarchy;
        // the doc-page mix triggers heading-order without indicating a
        // real bug.
        rules: [{ id: "heading-order", enabled: false }],
      },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="NotificationDrawer"
      intro={
        <>
          The slide-in panel that hosts notifications — paired with{" "}
          <code>NotificationBadge</code> in the masthead, and surfaced
          via the <code>Page.notificationDrawer</code> slot. Use for
          system events, async job results, mentions, and any
          asynchronous status the user should be able to review at any
          time.
        </>
      }
    >
      <Section
        title="Basic"
        description="NotificationDrawer → Header (count + close + actions menu) → Body → List → ListItem(s). Each item carries a variant (info / success / warning / danger / custom) that drives the icon + accent."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame height={420}>
              <div style={{ height: "100%", maxWidth: 380, marginInline: "auto" }}>
                <NotificationDrawer>
                  <NotificationDrawerHeader count={3} onClose={() => {}} />
                  <NotificationDrawerBody>
                    <NotificationDrawerList aria-label="Notifications">
                      <NotificationDrawerListItem variant="info">
                        <NotificationDrawerListItemHeader
                          variant="info"
                          title="Workflow run #1284 completed"
                          srTitle="Info notification:"
                        />
                        <NotificationDrawerListItemBody timestamp="2 min ago">
                          onboarding-flow finished in 2m 14s.
                        </NotificationDrawerListItemBody>
                      </NotificationDrawerListItem>
                      <NotificationDrawerListItem variant="success">
                        <NotificationDrawerListItemHeader
                          variant="success"
                          title="Deployment succeeded"
                          srTitle="Success notification:"
                        />
                        <NotificationDrawerListItemBody timestamp="1 hour ago">
                          Released v2.4 to production.
                        </NotificationDrawerListItemBody>
                      </NotificationDrawerListItem>
                      <NotificationDrawerListItem variant="warning">
                        <NotificationDrawerListItemHeader
                          variant="warning"
                          title="Quota at 90%"
                          srTitle="Warning notification:"
                        />
                        <NotificationDrawerListItemBody timestamp="3 hours ago">
                          API request quota approaching limit for this month.
                        </NotificationDrawerListItemBody>
                      </NotificationDrawerListItem>
                      <NotificationDrawerListItem
                        variant="danger"
                        isRead
                      >
                        <NotificationDrawerListItemHeader
                          variant="danger"
                          title="Pipeline failed"
                          srTitle="Danger notification:"
                        />
                        <NotificationDrawerListItemBody timestamp="Yesterday">
                          build-pipeline #1283 failed at the test step.
                        </NotificationDrawerListItemBody>
                      </NotificationDrawerListItem>
                    </NotificationDrawerList>
                  </NotificationDrawerBody>
                </NotificationDrawer>
              </div>
            </DemoFrame>
            <CodeBlock>{`<NotificationDrawer>
  <NotificationDrawerHeader count={3} onClose={closeDrawer}>
    {/* optional Dropdown for "Mark all as read", "Clear all", etc. */}
  </NotificationDrawerHeader>
  <NotificationDrawerBody>
    <NotificationDrawerList aria-label="Notifications">
      <NotificationDrawerListItem variant="info">
        <NotificationDrawerListItemHeader
          variant="info"
          title="Workflow run completed"
          srTitle="Info notification:"
        />
        <NotificationDrawerListItemBody timestamp="2 min ago">
          onboarding-flow finished in 2m 14s.
        </NotificationDrawerListItemBody>
      </NotificationDrawerListItem>
      {/* ...more items... */}
    </NotificationDrawerList>
  </NotificationDrawerBody>
</NotificationDrawer>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Empty state"
        description="When there are no notifications, render an EmptyState inside the body — keep the drawer chrome but show 'You're all caught up' instead of a blank list."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame height={360}>
              <div style={{ height: "100%", maxWidth: 380, marginInline: "auto" }}>
                <NotificationDrawer>
                  <NotificationDrawerHeader title="Notifications" onClose={() => {}} />
                  <NotificationDrawerBody>
                    <EmptyState
                      titleText="No notifications"
                      headingLevel="h3"
                      icon={SearchIcon}
                      variant="sm"
                    >
                      <EmptyStateBody>
                        You&rsquo;re all caught up. New events will appear here.
                      </EmptyStateBody>
                      <EmptyStateFooter>
                        <EmptyStateActions>
                          <Button variant="link">Notification settings</Button>
                        </EmptyStateActions>
                      </EmptyStateFooter>
                    </EmptyState>
                  </NotificationDrawerBody>
                </NotificationDrawer>
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Pairing with Page + NotificationBadge"
        description="In a real app, NotificationDrawer is rendered via the Page.notificationDrawer slot, with state controlled by isNotificationDrawerExpanded; the NotificationBadge in the masthead toggles that state."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <CodeBlock>{`const [isOpen, setIsOpen] = useState(false);
const unread = useUnreadCount();

<Page
  masthead={
    <Masthead>
      <MastheadMain>...</MastheadMain>
      <MastheadContent>
        <Toolbar>
          <ToolbarContent>
            <ToolbarItem align={{ default: "alignEnd" }}>
              <NotificationBadge
                variant={unread > 0 ? "unread" : "read"}
                count={unread}
                isExpanded={isOpen}
                onClick={() => setIsOpen(o => !o)}
                aria-label={\`Notifications (\${unread} unread)\`}
              />
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      </MastheadContent>
    </Masthead>
  }
  notificationDrawer={
    <NotificationDrawer>
      <NotificationDrawerHeader count={unread} onClose={() => setIsOpen(false)} />
      <NotificationDrawerBody>
        <NotificationDrawerList aria-label="Notifications">
          {notifications.map(n => (
            <NotificationDrawerListItem key={n.id} variant={n.severity} isRead={n.read}>
              <NotificationDrawerListItemHeader
                variant={n.severity}
                title={n.title}
                srTitle={\`\${n.severity} notification:\`}
              />
              <NotificationDrawerListItemBody timestamp={n.timestamp}>
                {n.body}
              </NotificationDrawerListItemBody>
            </NotificationDrawerListItem>
          ))}
        </NotificationDrawerList>
      </NotificationDrawerBody>
    </NotificationDrawer>
  }
  isNotificationDrawerExpanded={isOpen}
  onNotificationDrawerExpand={focusFirstNotification}
>
  {/* page content */}
</Page>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Composition">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "NotificationDrawer", type: "container", description: "Outer wrapper. Renders the drawer panel chrome." },
                { name: "NotificationDrawerHeader", type: "child", description: "Top section — title / count + close button + slot for actions Dropdown (mark all as read, clear all, settings)." },
                { name: "NotificationDrawerBody", type: "child", description: "Scrolling content area — holds the list or an empty state." },
                { name: "NotificationDrawerList", type: "child", description: "The notifications list — aria-label required." },
                { name: "NotificationDrawerListItem", type: "child", description: "Single notification. variant drives the colour accent + screen-reader prefix; isRead greys it out." },
                { name: "NotificationDrawerListItemHeader", type: "child", description: "Per-item header — title + variant icon + slot for per-item actions Dropdown. srTitle is the screen-reader-only severity prefix." },
                { name: "NotificationDrawerListItemBody", type: "child", description: "Per-item body — timestamp + descriptive content." },
                { name: "NotificationDrawerGroup", type: "child", description: "Optional grouping for categorised feeds (Today / This week / Older)." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "NotificationDrawerHeader.count", type: "number", description: "Unread count shown in the header. Drives the visible badge." },
                { name: "NotificationDrawerHeader.title", type: "string", description: "Override the default 'Notifications' heading." },
                { name: "NotificationDrawerHeader.onClose", type: "(event) => void", description: "Close-button handler — pair with Page.isNotificationDrawerExpanded state." },
                { name: "NotificationDrawerListItem.variant", type: '"info" | "success" | "warning" | "danger" | "custom"', description: "Severity — drives icon + accent." },
                { name: "NotificationDrawerListItem.isRead", type: "boolean", description: "Mark the item as read (greys it out, drops the unread emphasis)." },
                { name: "NotificationDrawerListItem.isHoverable", type: "boolean", description: "Add a hover affordance — useful when the whole row is clickable." },
                { name: "NotificationDrawerListItemHeader.srTitle", type: "string", description: "Screen-reader-only prefix announcing the severity ('Danger notification:' before the title)." },
                { name: "NotificationDrawerListItemBody.timestamp", type: "ReactNode", description: "Timestamp shown beside the body. Use the lib's Timestamp component for tooltip + locale formatting." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="When to use">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>System / async event feeds</strong> — &ldquo;Workflow finished&rdquo;, &ldquo;Deployment failed&rdquo;, &ldquo;Quota at 90%&rdquo;, &ldquo;You were mentioned&rdquo;.</li>
            <li><strong>Always-available history</strong> — unlike toasts, the drawer is a permanent home for notifications the user can revisit.</li>
            <li><strong>For transient pop-up notifications</strong> — use AlertGroup with isToast.</li>
            <li><strong>For inline status</strong> — use Alert.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>aria-label on the list</strong> — names the region for screen readers.</li>
            <li><strong>Always set srTitle on the item header</strong> — screen-reader-only prefix that conveys the severity (&ldquo;Danger notification:&rdquo;) before the title.</li>
            <li><strong>isRead changes the announcement context</strong> — combined with the visual de-emphasis, screen readers communicate the read/unread distinction.</li>
            <li><strong>Pair with Page.onNotificationDrawerExpand</strong> to focus the first notification when the drawer opens — keyboard users land in the right place.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
