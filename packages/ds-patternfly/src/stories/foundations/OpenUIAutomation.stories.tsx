import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@patternfly/react-core";
import { FoundationPage, Section, Card as DocCard, CodeBlock } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Foundations/Open UI Automation",
  parameters: {
    layout: "padded",
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Open UI Automation"
      intro={
        <>
          <strong>OUIA</strong> (Open UI Automation) is a small,
          cross-framework spec for stable test selectors. PatternFly 6
          implements it: every OUIA-compliant component emits three
          attributes on its root —{" "}
          <code>data-ouia-component-type</code>,{" "}
          <code>data-ouia-component-id</code>,{" "}
          <code>data-ouia-safe</code>. Test runners locate elements by{" "}
          <code>data-ouia-component-id</code> without coupling to CSS
          class names, ARIA labels, or DOM structure.
        </>
      }
    >
      <Section
        title="What appears in the DOM"
        description="Inspect any OUIA-compliant PF6 component and you'll find these three attributes on its root element."
      >
        <DocCard>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ display: "flex", gap: 12 }}>
                <Button variant="primary" ouiaId="save-workflow">
                  Save
                </Button>
                <Button variant="secondary" ouiaId="discard-workflow">
                  Discard
                </Button>
              </div>
            </DemoFrame>
            <CodeBlock>{`<Button variant="primary" ouiaId="save-workflow">Save</Button>
<Button variant="secondary" ouiaId="discard-workflow">Discard</Button>

// renders →

<button data-ouia-component-type="PF6/Button"
        data-ouia-component-id="save-workflow"
        data-ouia-safe="true">Save</button>`}</CodeBlock>
          </div>
        </DocCard>
      </Section>

      <Section title="The three attributes">
        <DocCard>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "data-ouia-component-type", type: 'string e.g. "PF6/Button"', description: "Framework + component identifier. Set by PF6, never by you. Tells a test runner what kind of component this is." },
                { name: "data-ouia-component-id", type: "string | number", description: "Stable, app-supplied id. Pass via the ouiaId prop. If you omit it, PF6 auto-generates a stable id per component instance — but auto-ids change as your tree changes; supply explicit ouiaId for anything tests rely on." },
                { name: "data-ouia-safe", type: '"true" | "false"', description: "True when the component is in a stable state — no animations / loading / fetch in flight. Test runners wait for this to flip true before asserting. PF6 manages this automatically per component." },
              ]}
            />
          </div>
        </DocCard>
      </Section>

      <Section
        title="Locating elements in a test"
        description="Cross-runner pattern: query by data-ouia-component-id (or pair component-type + component-id for disambiguation)."
      >
        <DocCard>
          <div style={{ padding: 24 }}>
            <CodeBlock>{`// Playwright
await page.locator('[data-ouia-component-id="save-workflow"]').click();

// Cypress
cy.get('[data-ouia-component-id="save-workflow"]').click();

// React Testing Library (when DOM is exposed)
screen.getByTestId('save-workflow'); // if you alias data-testid <-> ouia-id

// Disambiguate when multiple components share an id (rare, only if you slipped):
await page
  .locator('[data-ouia-component-type="PF6/Button"][data-ouia-component-id="save-workflow"]')
  .click();`}</CodeBlock>
          </div>
        </DocCard>
      </Section>

      <Section
        title="Naming conventions"
        description="Treat ouiaId like a test contract — stable, descriptive, scoped."
      >
        <DocCard>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Kebab-case verb-noun</strong>. <code>save-workflow</code>, <code>open-filter-menu</code>, <code>row-delete-action</code>. Reads well in test output, greppable in source.</li>
            <li><strong>Scope per-row.</strong> For repeated components (each row in a Table, each tile in a Gallery), bake the row id in: <code>workflow-row-wf-1234</code>. Otherwise a single id matches N elements.</li>
            <li><strong>Same id across products / versions.</strong> If two products share the same screen, share the same ids — tests written against one work against the other.</li>
            <li><strong>Don&rsquo;t rename casually.</strong> A renamed ouiaId is a broken test. Treat changes the same as breaking-changing a public API.</li>
            <li><strong>Don&rsquo;t leak it to users.</strong> ouiaId is a test attribute. Don&rsquo;t style on it, don&rsquo;t expose it in screen-reader text.</li>
          </ul>
        </DocCard>
      </Section>

      <Section
        title="data-ouia-safe and animations"
        description="The safe flag is the signal a test runner uses to know when to assert."
      >
        <DocCard>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <CodeBlock>{`// While a Modal is animating in:
<div data-ouia-component-type="PF6/Modal"
     data-ouia-component-id="confirm-delete"
     data-ouia-safe="false"> ... </div>

// Once stable:
<div data-ouia-component-type="PF6/Modal"
     data-ouia-component-id="confirm-delete"
     data-ouia-safe="true"> ... </div>`}</CodeBlock>
            <p style={{ margin: 0, color: "var(--gp-color-text-subtle)" }}>
              Test runners poll <code>data-ouia-safe=&quot;true&quot;</code> as
              their wait condition instead of arbitrary <code>sleep(N)</code>{" "}
              calls. PF6 manages the safe flag for animated components
              (Modal, Drawer, Popover, Tooltip); for your own composed
              components that animate, pass <code>ouiaSafe={"{false}"}</code>{" "}
              while in-flight, then <code>ouiaSafe={"{true}"}</code> when
              settled.
            </p>
          </div>
        </DocCard>
      </Section>

      <Section
        title="In this design system"
        description="ouiaId is wired through on every PF6 component the lib re-exposes. The component-prop tables list it explicitly. Default behaviour: opt-in — supply ouiaId where tests need it, omit it everywhere else (PF6 auto-generates a fallback)."
      >
        <DocCard>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Set ouiaId on action buttons</strong> tests will click — primary CTAs, destructive confirms, kebab triggers.</li>
            <li><strong>Set ouiaId on regions</strong> tests will scope into — modals, drawers, toolbars.</li>
            <li><strong>Don&rsquo;t set ouiaId on every decorative element.</strong> If a test wouldn&rsquo;t target it, leave it auto-generated.</li>
            <li><strong>Use scoped ouiaIds in lists</strong> — <code>workflow-row-{`{id}`}</code> beats <code>workflow-row</code> when there are 50 rows.</li>
          </ul>
        </DocCard>
      </Section>

      <Section
        title="OUIA vs other approaches"
      >
        <DocCard>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "OUIA", type: "spec", description: "Cross-framework spec; PF6 implements it. Three attributes, type-safe via ouiaId prop, safe-flag for animation waits. The PF-native choice." },
                { name: "data-testid", type: "convention", description: "React-community convention (testing-library). Single attribute, no type, no safe-flag. Works fine; less metadata. If your stack uses it elsewhere, alias ouiaId via a wrapper." },
                { name: "ARIA labels / roles", type: "accessibility primitive", description: "Test selectors should NOT couple to ARIA — ARIA changes as a11y improves, breaking tests. Use ARIA for users; OUIA for tests." },
                { name: "CSS class names", type: "anti-pattern", description: "Style changes break tests. PF6 internals are not a public contract — don't depend on .pf-v6-c-button." },
                { name: "Text content", type: "fragile", description: "Translations break English-only tests. Use only when the text IS the assertion (e.g. error message body)." },
              ]}
            />
          </div>
        </DocCard>
      </Section>

      <Section title="Reference">
        <DocCard>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Spec:</strong> <a href="https://ouia.readthedocs.io" target="_blank" rel="noopener noreferrer">ouia.readthedocs.io</a></li>
            <li><strong>PF docs:</strong> <a href="https://www.patternfly.org/developer-resources/open-ui-automation" target="_blank" rel="noopener noreferrer">patternfly.org/developer-resources/open-ui-automation</a></li>
            <li><strong>Spec scope.</strong> OUIA covers components only — pages, regions, and routes are out of scope. For page-level test selectors, use a separate convention (e.g. <code>data-test-page</code>).</li>
          </ul>
        </DocCard>
      </Section>
    </FoundationPage>
  ),
};
