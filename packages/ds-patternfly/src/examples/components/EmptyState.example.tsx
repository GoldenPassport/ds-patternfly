/**
 * EmptyState — the placeholder a list / table / view shows when it has
 * no content yet: orient (icon + title), explain (body), offer a way
 * out (action).
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
  EmptyStatePanel,
  Spinner,
} from "@golden-passport/ds-patternfly";
import {
  CubesIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  SearchIcon,
} from "@patternfly/react-icons";

// #region Basic
export function Basic() {
  // EmptyStatePanel — the DS empty-state lego block: icon + title + body +
  // primary CTA + secondary actions, no EmptyStateFooter/Actions plumbing.
  return (
    <EmptyStatePanel
      title="No projects yet"
      icon={CubesIcon}
      primaryAction={<Button variant="primary">Create project</Button>}
      secondaryActions={
        <>
          <Button variant="link">Import from template</Button>
          <Button variant="link">View documentation</Button>
        </>
      }
    >
      Projects collect related workflows and resources. Create your first one
      to get started.
    </EmptyStatePanel>
  );
}
// #endregion

// #region NoResults
export function NoResults() {
  return (
    <EmptyStatePanel
      title="No matching tasks"
      icon={SearchIcon}
      secondaryActions={<Button variant="link">Clear all filters</Button>}
    >
      No tasks match the current filters. Try clearing some filters or
      broadening the search.
    </EmptyStatePanel>
  );
}
// #endregion

// #region Loading
export function Loading() {
  return (
    <EmptyState
      titleText="Loading"
      headingLevel="h2"
      icon={Spinner}
    />
  );
}
// #endregion

// #region WithStatus
export function WithStatus() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <EmptyState
        status="danger"
        titleText="Couldn't load tasks"
        headingLevel="h2"
        icon={ExclamationCircleIcon}
      >
        <EmptyStateBody>
          The server returned an error. Retry the request, or check
          the run logs for details.
        </EmptyStateBody>
        <EmptyStateFooter>
          <EmptyStateActions>
            <Button variant="primary">Retry</Button>
            <Button variant="link">View logs</Button>
          </EmptyStateActions>
        </EmptyStateFooter>
      </EmptyState>
      <EmptyState
        status="warning"
        titleText="Partial results"
        headingLevel="h2"
        icon={ExclamationTriangleIcon}
      >
        <EmptyStateBody>
          Some sources returned no data. Showing what loaded
          successfully.
        </EmptyStateBody>
      </EmptyState>
    </div>
  );
}
// #endregion

// #region Sizes
export function Sizes() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <EmptyState
        variant="xs"
        titleText="Inline empty"
        headingLevel="h4"
      >
        <EmptyStateBody>For empty rows in a list.</EmptyStateBody>
      </EmptyState>
      <EmptyState
        variant="sm"
        titleText="Compact empty"
        headingLevel="h4"
        icon={CubesIcon}
      >
        <EmptyStateBody>
          For empty Drawers / Cards / Popovers.
        </EmptyStateBody>
      </EmptyState>
    </div>
  );
}
// #endregion

export default function EmptyStateExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <NoResults />
      <Loading />
      <WithStatus />
      <Sizes />
    </div>
  );
}
