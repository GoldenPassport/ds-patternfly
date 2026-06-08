import type { Meta, StoryObj } from "@storybook/react-vite";
import { Hint, HintBody, HintFooter, HintTitle } from "@patternfly/react-core";
import { Hyperlink } from "../../components/Hyperlink.js";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/Hint",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Hint"
      intro={
        <>
          A small contextual callout — typically introducing a new feature,
          explaining a workflow, or pointing users to documentation. Less
          urgent than an Alert; more substantial than HelperText.
        </>
      }
    >
      <Section
        title="Title + body + footer"
        description='HintFooter links use the Hyperlink component (lib-shipped) — universal blue, always-underlined, target="_blank" auto-adds rel security defaults + an external-link icon + an AT "(opens in a new tab)" announcement. Use Hyperlink for navigation; reserve Button variant="link" for actions that don&apos;t change URL.'
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Hint>
                <HintTitle>New: bulk task assignment</HintTitle>
                <HintBody>
                  Select multiple tasks in the list and use the toolbar to
                  assign them all at once.
                </HintBody>
                <HintFooter>
                  <Hyperlink href="/docs/bulk-assignment">
                    Read the docs
                  </Hyperlink>
                </HintFooter>
              </Hint>
            </DemoFrame>
            <CodeBlock>{`import { Hyperlink } from "@golden-passport/ds-patternfly";

<Hint>
  <HintTitle>New: bulk task assignment</HintTitle>
  <HintBody>
    Select multiple tasks in the list and use the toolbar to
    assign them all at once.
  </HintBody>
  <HintFooter>
    <Hyperlink href="/docs/bulk-assignment">Read the docs</Hyperlink>
  </HintFooter>
</Hint>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="External docs link"
        description='target="_blank" — Hyperlink auto-adds rel="noopener noreferrer", a small external-link icon, and a screen-reader "(opens in a new tab)" announcement. Same component, four security/a11y defaults consumers reliably forget on raw <a>.'
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Hint>
                <HintTitle>Tip — keyboard shortcuts</HintTitle>
                <HintBody>
                  Press <kbd>?</kbd> anywhere to open the full shortcut
                  reference.
                </HintBody>
                <HintFooter>
                  <Hyperlink
                    href="https://www.patternfly.org/components/hint"
                    target="_blank"
                  >
                    Hint component reference
                  </Hyperlink>
                </HintFooter>
              </Hint>
            </DemoFrame>
            <CodeBlock>{`<Hint>
  <HintTitle>Tip — keyboard shortcuts</HintTitle>
  <HintBody>Press <kbd>?</kbd> anywhere to open the full shortcut reference.</HintBody>
  <HintFooter>
    <Hyperlink href="https://www.patternfly.org/components/hint" target="_blank">
      Hint component reference
    </Hyperlink>
  </HintFooter>
</Hint>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Inline link in the body" description="Hyperlink works inline inside HintBody prose.">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Hint>
                <HintBody>
                  Tip: hold Shift to select a range of tasks. See the{" "}
                  <Hyperlink href="/docs/selection">
                    selection model
                  </Hyperlink>{" "}
                  for the full keyboard reference.
                </HintBody>
              </Hint>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Body only" description="Drop the title and footer for a one-line nudge.">
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <Hint>
                <HintBody>Tip: hold Shift to select a range of tasks.</HintBody>
              </Hint>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Composition">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                {
                  name: "Hint",
                  type: "container",
                  description: "Wraps the hint surface. Pass actions prop to add a top-right action button (e.g. dismiss).",
                },
                {
                  name: "HintTitle",
                  type: "child",
                  description: "Optional emphasized headline at the top of the hint.",
                },
                {
                  name: "HintBody",
                  type: "child",
                  description: "Required. The hint's main message.",
                },
                {
                  name: "HintFooter",
                  type: "child",
                  description: "Optional bottom row. For navigation links use the lib's Hyperlink component (handles rel security, external icon, and AT announcements). For actions that don't change URL, use Button variant=\"link\".",
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section
        title="Accessibility"
        description="Hints sit between informational and decorative — pick the right semantic."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <strong>HintTitle is not a heading by default.</strong> If the hint
              is large enough to need a heading-level entry in the page
              outline, render the title as a Title component instead.
            </li>
            <li>
              <strong>Dismiss button needs a label.</strong> If you pass
              <code>actions</code> with a close button, set its{" "}
              <code>aria-label</code> (e.g. &quot;Dismiss tip&quot;).
            </li>
            <li>
              <strong>Don&apos;t use Hint for errors or warnings.</strong> Those
              have their own semantics — Alert (or Banner for page-level).
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="When to use it"
        description="Hint is for soft, optional guidance."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li><strong>Use Hint for…</strong> &quot;new feature&quot; introductions, contextual tips, quick pointers to docs.</li>
            <li><strong>Don&apos;t use Hint for…</strong> validation messages (HelperText), errors (Alert), critical system status (Banner), or required reading.</li>
            <li><strong>Make them dismissible.</strong> Repeat exposure to the same tip is friction — let users hide it once they&apos;ve seen it.</li>
          </ul>
        </Card>
      </Section>
      <ThemingPointer
        dials={[
          ["--gp-surface-card", "Hint background (PF Hint is a Card variant under the hood)."],
          ["--gp-pad-card", "Inside padding."],
          ["--gp-radius-card", "Corner radius."],
          ["--gp-border-subtle", "Edge border."],
        ]}
      />
    </FoundationPage>
  ),
};
