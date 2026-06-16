/**
 * NotificationDrawer — the slide-in panel that hosts notifications, paired
 * with NotificationBadge in the masthead via the Page.notificationDrawer
 * slot.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
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
} from "@golden-passport/ds-patternfly";
import { SearchIcon } from "@patternfly/react-icons";

// #region Basic
export function Basic() {
  return (
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
            <NotificationDrawerListItem variant="danger" isRead>
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
  );
}
// #endregion

// #region EmptyDrawer
export function EmptyDrawer() {
  return (
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
  );
}
// #endregion

export default function NotificationDrawerExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <div style={{ height: 420 }}>
        <Basic />
      </div>
      <div style={{ height: 360 }}>
        <EmptyDrawer />
      </div>
    </div>
  );
}
