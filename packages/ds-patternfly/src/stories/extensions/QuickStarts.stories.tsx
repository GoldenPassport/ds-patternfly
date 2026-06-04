import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Extensions/Quick starts",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Quick starts"
      intro={
        <>
          Guided product tours rendered from declarative YAML / JSON. The
          package ships a catalog page (a grid of available tours), a
          drawer that walks the user through each step with markdown +
          screenshots, and a controller that persists progress to
          localStorage. From <code>@patternfly/quickstarts</code>.
          <br /><br />
          Quick starts wraps the entire app shell in a Drawer + Context
          provider, so it&rsquo;s documented here as a code-only recipe —
          live preview belongs in the playground, not in a Storybook
          isolation frame.
        </>
      }
    >
      <Section
        title="App-level wiring"
        description="QuickStartContainer wraps your app's routes. The container manages the active tour, completed steps, and the drawer that holds the step UI."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <CodeBlock>{`import { useState } from "react";
import {
  QuickStartContainer,
  type AllQuickStartStates,
} from "@patternfly/quickstarts";
import "@patternfly/quickstarts/dist/quickstarts.css";

import { quickStarts } from "./quickstarts-data";

export function App({ children }) {
  const [activeQuickStartID, setActiveQuickStartID] = useState("");
  const [allQuickStartStates, setAllQuickStartStates] = useState<AllQuickStartStates>({});

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
}`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Catalog page"
        description="QuickStartCatalogPage renders the full catalog grid (search, filter, tile, status). Mount it on a route — typically /learn or /quick-starts."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <CodeBlock>{`import { QuickStartCatalogPage } from "@patternfly/quickstarts";

export default function QuickStartsRoute() {
  return (
    <QuickStartCatalogPage
      title="Quick starts"
      hint="Learn how to use the workflow engine in 5 minutes."
    />
  );
}`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Defining a quick start"
        description="Each quick start is a JSON / YAML object with metadata + an array of tasks. Tasks have markdown instructions and an optional 'check your work' verification."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <CodeBlock>{`// quickstarts-data.ts
import type { QuickStart } from "@patternfly/quickstarts";

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
          description: "From the sidebar, click \\"Workflows\\" then \\"New\\".",
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
];`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Most-used QuickStartContainer props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "quickStarts", type: "QuickStart[]", description: "Required — the available tours." },
                { name: "activeQuickStartID", type: "string", description: "Controlled — which tour is currently open in the drawer. Empty string = none." },
                { name: "setActiveQuickStartID", type: "Dispatch<SetStateAction<string>>", description: "State setter — wired up to the container's open / close actions." },
                { name: "allQuickStartStates", type: "AllQuickStartStates", description: "Object keyed by quick-start ID with per-step progress. Persist to localStorage / your backend." },
                { name: "setAllQuickStartStates", type: "Dispatch<SetStateAction<AllQuickStartStates>>", description: "State setter for the progress object." },
                { name: "isManagedDrawer", type: "boolean", description: "Let the container own the Drawer chrome. Set false if you supply a custom Drawer + DrawerContent." },
                { name: "useQueryParams", type: "boolean", description: "Sync activeQuickStartID to ?quickstart=ID — enables shareable links." },
                { name: "fullWidth", type: "boolean", description: "Drawer takes the full viewport width when open." },
                { name: "language / resourceBundle", type: "string / object", description: "Localize the built-in strings. Pass your own resource bundle for non-English copy." },
                { name: "alwaysShowTaskReview", type: "boolean", description: "Show the 'Check your work' UI even when the step has no review block." },
                { name: "loading", type: "boolean", description: "Show a spinner on the catalog page while you fetch the tour data." },
                { name: "appendTo", type: "HTMLElement | () => HTMLElement", description: "Where to mount the drawer panel. Default document.body." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Patterns">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Persist progress.</strong> Use the <code>useLocalStorage</code> helper exported from the package, or wire <code>allQuickStartStates</code> to your user-prefs API.</li>
            <li><strong>Lazy-load.</strong> Quick starts pulls in a markdown engine + drawer; gate it behind <code>React.lazy</code> if it&rsquo;s not on every page.</li>
            <li><strong>Author tours in YAML.</strong> Easier for content authors to edit than nested JSON — the package accepts both.</li>
            <li><strong>Wire UI to the tour.</strong> The container exposes a context — components in your app can highlight elements when the matching task is active.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>The drawer traps focus.</strong> Don&rsquo;t override <code>disableFocusTrap</code> — the tour relies on it.</li>
            <li><strong>Markdown content needs heading order.</strong> Authors should keep h-levels consistent across tasks; otherwise screen-reader users get jagged jumps.</li>
            <li><strong>Confirmation dialogs are translatable.</strong> Pass a <code>resourceBundle</code> so the close-confirmation strings come through in the user&rsquo;s locale.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
