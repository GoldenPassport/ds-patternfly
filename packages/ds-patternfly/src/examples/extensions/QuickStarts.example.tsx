/**
 * Quick starts (@patternfly/quickstarts) — guided product tours rendered
 * from declarative YAML / JSON. QuickStartContainer wraps your app's
 * routes and manages the active tour, completed steps, and the drawer
 * that holds the step UI; QuickStartCatalogPage renders the catalog grid.
 *
 * Quick starts wraps the entire app shell in a Drawer + Context provider —
 * these are code-only recipes; preview them in a real app shell.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState, type ReactNode } from "react";
import {
  QuickStartContainer,
  QuickStartCatalogPage,
  type AllQuickStartStates,
  type QuickStart,
} from "@patternfly/quickstarts";
import "@patternfly/quickstarts/dist/quickstarts.css";

// #region QuickStartData
// quickstarts-data.ts — each quick start is a JSON / YAML object with
// metadata + an array of tasks.
export const quickStarts: QuickStart[] = [
  {
    apiVersion: "console.openshift.io/v1",
    kind: "QuickStarts",
    metadata: { name: "create-workflow" },
    spec: {
      version: 1.0,
      displayName: "Create your first workflow",
      durationMinutes: 5,
      icon: "data:image/png;base64,...",
      description: "Build a 4-step workflow and run it.",
      introduction: "Welcome! This tour walks through the basics.",
      tasks: [
        {
          title: "Open the workflow editor",
          description: 'From the sidebar, click "Workflows" then "New".',
          review: {
            instructions: "Did the editor open?",
            failedTaskHelp: "Try refreshing and clicking again.",
          },
        },
        {
          title: "Add a step",
          description: "Drag a Trigger block from the palette.",
        },
      ],
      conclusion: "You're done! Run the workflow from the toolbar.",
    },
  },
];
// #endregion

// #region AppLevelWiring
export function App({ children }: { children?: ReactNode }) {
  const [activeQuickStartID, setActiveQuickStartID] = useState("");
  const [allQuickStartStates, setAllQuickStartStates] =
    useState<AllQuickStartStates>({});

  return (
    <QuickStartContainer
      quickStarts={quickStarts}
      activeQuickStartID={activeQuickStartID}
      setActiveQuickStartID={setActiveQuickStartID}
      allQuickStartStates={allQuickStartStates}
      setAllQuickStartStates={setAllQuickStartStates}
      isManagedDrawer
      useQueryParams
    >
      {children}
    </QuickStartContainer>
  );
}
// #endregion

// #region CatalogPage
export function QuickStartsRoute() {
  return (
    <QuickStartCatalogPage
      title="Quick starts"
      hint="Learn how to use the workflow engine in 5 minutes."
    />
  );
}
// #endregion

export default function QuickStartsExample() {
  return (
    <App>
      <QuickStartsRoute />
    </App>
  );
}
