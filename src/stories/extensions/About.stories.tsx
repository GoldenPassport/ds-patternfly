import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card } from "../_storyKit.js";

const meta: Meta = {
  title: "Extensions/About extensions",
  parameters: { layout: "padded" },
};
export default meta;

export const About: StoryObj = {
  render: () => (
    <FoundationPage
      title="About extensions"
      intro={
        <>
          <strong>Extensions</strong> are PatternFly packages that live outside
          <code>@patternfly/react-core</code> and ship larger, more opinionated
          building blocks — catalog tiles, data views, log viewers, quick
          starts, consoles, feedback modals. They&rsquo;re published as
          separate npm packages so you only pay for what you import.
        </>
      }
    >
      <Section title="When to reach for an extension">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Recurring product patterns.</strong> Catalog browsing, data tables with toolbars + pagination + filters, log streaming — extensions package these so you don&rsquo;t reinvent them per app.</li>
            <li><strong>Heavy components.</strong> Log Viewer uses virtualised rows; Quick Starts ships a markdown engine + drawer; React Console wraps xterm.js / VNC clients. Building these from primitives is a sub-project.</li>
            <li><strong>Cross-product consistency.</strong> Several Red Hat / OpenShift consoles all use these extensions, so users get a familiar shape across products.</li>
          </ul>
        </Card>
      </Section>

      <Section title="When NOT to use an extension">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>One-off needs.</strong> If you just need a single, small custom UI, dropping in an extension pulls in transitive deps you may not want.</li>
            <li><strong>Bespoke flow.</strong> Extensions are opinionated. If the design diverges, compose primitives from <code>react-core</code> instead.</li>
            <li><strong>Tight bundle budgets.</strong> Log Viewer + Quick Starts in particular pull notable dependency trees — gate them behind code-splitting (<code>React.lazy</code>) when used.</li>
          </ul>
        </Card>
      </Section>

      <Section title="What&rsquo;s in this section">
        <Card>
          <div style={{ padding: 16, color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <p style={{ marginTop: 0 }}>
              Each page documents the public API surface of an extension package,
              with live demos where the component renders in isolation and
              code-only recipes where the component needs a full app shell
              (Quick Starts, React Console, parts of Log Viewer).
            </p>
            <ul style={{ margin: 0, paddingLeft: 24 }}>
              <li><strong>Catalog view</strong> — Catalog item header, Catalog tile, Filter side panel, Properties side panel, Vertical tabs. From <code>@patternfly/react-catalog-view-extension</code>.</li>
              <li><strong>Data view</strong> — Overview, Toolbar, Table. From <code>@patternfly/react-data-view</code>.</li>
              <li><strong>Log viewer</strong> — virtualised log streaming. From <code>@patternfly/react-log-viewer</code>.</li>
              <li><strong>Quick starts</strong> — guided product tours. From <code>@patternfly/quickstarts</code>.</li>
              <li><strong>React console</strong> — serial / VNC / desktop terminals. From <code>@patternfly/react-console</code>.</li>
              <li><strong>User feedback</strong> — feedback / bug-report modal. From <code>@patternfly/react-user-feedback</code>.</li>
            </ul>
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
