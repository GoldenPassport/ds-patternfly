import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card } from "../_storyKit.js";

const meta: Meta = {
  title: "Accessibility/PatternFly's accessibility",
  parameters: { layout: "padded" },
};
export default meta;

export const Inheritance: StoryObj = {
  render: () => (
    <FoundationPage
      title="PatternFly's accessibility"
      intro={
        <>
          This system is built on <strong>PatternFly 6</strong>, which has its
          own multi-year a11y program. Most components used in this lib are
          either thin wrappers around PF components or compositions of them —
          so what PF guarantees, we inherit. This page is an honest map of
          what comes from where.
        </>
      }
    >
      <Section
        title="What PatternFly guarantees out of the box"
        description="Properties baked into every supported PF6 component."
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
              <strong>Semantic HTML &amp; ARIA roles</strong> for every
              component (Button, Form controls, Nav, Page, Drawer, Modal,
              Toolbar, etc.).
            </li>
            <li>
              <strong>Keyboard interaction</strong> follows WAI-ARIA Authoring
              Practices: arrow-key navigation in lists/menus, Escape to
              dismiss, Tab order honored.
            </li>
            <li>
              <strong>Focus management</strong> — focus is trapped in dialogs
              and drawers, restored on close.
            </li>
            <li>
              <strong>Visible focus styles</strong> on all focusable
              components.
            </li>
            <li>
              <strong>RTL support</strong> via <code>dir=&quot;rtl&quot;</code>{" "}
              on a parent element.
            </li>
            <li>
              <strong>Color tokens</strong> with documented contrast
              characteristics, used by every PF component.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="What we add on top"
        description="Things this lib enforces beyond PF defaults."
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
              <strong>Required <code>labels</code> props</strong> on
              composite layouts. PF often defaults to English; we don&apos;t.
            </li>
            <li>
              <strong>Brand contrast tests</strong>. PF guarantees its own
              tokens; we guarantee that any new brand we ship still meets AA
              in both modes.
            </li>
            <li>
              <strong>Logical-property CSS</strong> in our custom styles. PF
              handles RTL inside its own components; the new CSS we add must
              also work both ways.
            </li>
            <li>
              <strong>Skip-to-content built into AppShell.</strong>
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="What we never weaken"
        description="Hard rules for wrapping or composing PF components."
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
              We don&apos;t spread <code>...rest</code> in a way that lets
              consumers strip ARIA attributes the PF component sets.
            </li>
            <li>
              We don&apos;t override PF&apos;s focus styles to be invisible —
              brand styling builds on top of, not in place of, the focus ring.
            </li>
            <li>
              We don&apos;t replace native <code>&lt;button&gt;</code>/
              <code>&lt;a&gt;</code> with divs.
            </li>
            <li>
              We don&apos;t hide content with <code>display: none</code>{" "}
              when we mean &quot;visually hidden but still announced&quot; —
              we use clip-path / sr-only patterns instead (see{" "}
              <code>SkipToContent</code>).
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Reference"
        description="PF's own accessibility documentation is the authoritative source for component-level behavior."
      >
        <Card>
          <div
            style={{
              padding: 16,
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.7,
            }}
          >
            <p>
              See <strong>patternfly.org → Accessibility</strong> for PF6&apos;s
              full a11y handbook, scorecards, and per-component notes.
            </p>
            <p style={{ color: "var(--gp-color-text-subtle)", margin: 0 }}>
              When PF docs and this lib&apos;s docs disagree about a PF
              component&apos;s behavior, PF&apos;s docs win — file an issue
              against this lib so we can correct ours.
            </p>
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
