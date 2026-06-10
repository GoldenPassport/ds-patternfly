import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  Compact,
  MultiColumn,
  BuildInfo,
} from "../../examples/components/Footer.example.js";
import footerExampleSrc from "../../examples/components/Footer.example.tsx?raw";
import pageComponentSrc from "../../components/Page.tsx?raw";

const meta: Meta = {
  title: "Components/Footer",
  parameters: { layout: "padded" },
};
export default meta;

/**
 * PF6 doesn't ship a dedicated `<PageFooter>` component — the convention
 * is a final `<PageSection component="footer">` at the bottom of the
 * Page. These demos show three common shapes:
 *
 *   1. **Compact** — single row, copyright + inline links. Suits dense
 *      app shells (the lib's `<Shell>` uses this pattern by default).
 *   2. **Multi-column** — marketing-style 4-column grid with link lists
 *      + brand. Use on public / docs pages.
 *   3. **Build info** — left-side status (version, env, last-deployed),
 *      right-side support links. Useful for internal tools.
 *
 * Accessibility notes:
 *
 *   - The native `<footer>` element only gets an implicit `contentinfo`
 *     role when it's a direct child of `<body>`. When `<PageSection
 *     component="footer">` is nested inside a Page main area it has no
 *     role, so don't add `aria-label` — axe flags label-on-roleless as
 *     `aria-prohibited-attr`. Visible content makes the purpose obvious.
 *   - PageSection injects a `pf-v6-c-page__main-body` div between the
 *     section element and its children, so flex / grid styles need to
 *     live on an inner wrapper, not the section itself.
 */
export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Footer"
      intro={
        <>
          PatternFly 6 doesn&rsquo;t ship a dedicated <code>PageFooter</code>{" "}
          component. The canonical pattern is a final{" "}
          <code>&lt;PageSection component=&quot;footer&quot;&gt;</code> at
          the bottom of the page, rendered as a <code>&lt;footer&gt;</code>{" "}
          landmark for assistive tech.
        </>
      }
    >
      <Section
        title="Compact — copyright + inline links"
        description="Single-row footer with copyright on the left and inline link group on the right. Default for the lib's Shell — see Layouts → Shell."
      >
        <Card>
          <Example
            source={footerExampleSrc}
            region="Compact"
            fileName="Footer.example.tsx"
          >
            <Compact />
          </Example>
        </Card>
      </Section>

      <Section
        title="Multi-column — marketing / docs"
        description="Four-column grid with link lists + brand. Use on public landing pages, docs sites, marketing surfaces. The Gallery is intentionally responsive — columns stack on narrow viewports."
      >
        <Card>
          <Example
            source={footerExampleSrc}
            region="MultiColumn"
            fileName="Footer.example.tsx"
          >
            <MultiColumn />
          </Example>
        </Card>
      </Section>

      <Section
        title="Build info — internal tools"
        description="Left side carries deployment metadata (env, version, last deployed); right side carries support / runbook links. Status dot uses the brand-token surface colours so it follows the active theme."
      >
        <Card>
          <Example
            source={footerExampleSrc}
            region="BuildInfo"
            fileName="Footer.example.tsx"
          >
            <BuildInfo />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={footerExampleSrc} fileName="Footer.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { PageSection } from "@golden-passport/ds-patternfly";'}
        componentSource={pageComponentSrc}
        componentFileName="Page.tsx"
        description="How to import PageSection and the props most used for footers."
        rows={[
          {
            name: 'component="footer"',
            type: "ElementType",
            description:
              "Render the section as a <footer> element. Required for landmark semantics.",
          },
          {
            name: 'variant="secondary"',
            type: '"default" | "secondary"',
            description:
              "Tones the bg to the alt surface so the footer reads as separate from the content above.",
          },
          {
            name: "padding",
            type: "BreakpointObject<'padding' | 'noPadding'>",
            description:
              "Override the section's padding per breakpoint when the footer needs to bleed edge-to-edge.",
          },
          {
            name: "isFilled",
            type: "boolean",
            description:
              "Off by default for footers — you don't want it stretching to fill remaining height.",
          },
        ]}
      />

      <Section title="Accessibility">
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
              <strong>
                Don&rsquo;t add <code>aria-label</code> on a nested footer.
              </strong>{" "}
              <code>&lt;footer&gt;</code> only carries an implicit{" "}
              <code>contentinfo</code> role when it&rsquo;s a direct child
              of <code>&lt;body&gt;</code>. Inside a Page main it has no
              role, so a label would be flagged as{" "}
              <code>aria-prohibited-attr</code>.
            </li>
            <li>
              <strong>Each nav group needs a name.</strong> If the footer
              has multiple link columns, wrap each in{" "}
              <code>&lt;nav aria-label=&quot;Product&quot;&gt;</code> so
              screen readers can list and jump between them. The visible
              heading text is the natural label.
            </li>
            <li>
              <strong>
                Decorative dots, dividers, and separators use{" "}
                <code>aria-hidden</code>.
              </strong>{" "}
              Bullet separators ("·") and status dots aren&rsquo;t content
              — hide them from AT so the label reads as one phrase.
            </li>
            <li>
              <strong>Contrast holds in both themes.</strong> Use the
              brand <code>text.subtle</code> token rather than{" "}
              <code>#888</code> hard-coded — token contrast is verified
              for both light and dark modes in{" "}
              <code>src/tokens/tokens.test.ts</code>.
            </li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
