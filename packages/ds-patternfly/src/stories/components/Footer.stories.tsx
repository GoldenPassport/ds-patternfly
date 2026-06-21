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
import appFooterComponentSrc from "../../components/ds/AppFooter.tsx?raw";

const meta: Meta = {
  title: "Components/Footer",
  parameters: { layout: "padded" },
};
export default meta;

/**
 * PF6 doesn't ship a dedicated `<PageFooter>` component, so the lib exports
 * `AppFooter`. All three demos below are the same component, configured for
 * three common shapes:
 *
 *   1. **Compact** — copyright + inline links only (no link groups). Suits
 *      dense app shells.
 *   2. **Multi-column** — logo + tagline + sitemap `linkGroups`. Use on
 *      public / docs pages; columns wrap on narrow viewports.
 *   3. **Build info** — a build-status node in the `copyright` slot + ops
 *      links in `legalLinks`. Useful for internal tools.
 *
 * Accessibility notes:
 *
 *   - AppFooter renders a real `<footer>` element and labels each link
 *     column as a `<nav aria-label={group.title}>` for you.
 *   - Decorative dots and separators in caller-supplied `copyright` nodes
 *     should carry `aria-hidden` so the line reads as one phrase.
 */
export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Footer"
      intro={
        <>
          PatternFly 6 doesn&rsquo;t ship a dedicated <code>PageFooter</code>{" "}
          component, so the lib exports <code>AppFooter</code> — it renders a{" "}
          real <code>&lt;footer&gt;</code> landmark and owns the layout (logo +
          tagline, link-group columns, bottom bar) plus the brand dials. You
          pass content; each region appears only when its prop is set. The three
          shapes below are all the same component, configured differently.
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
        importStatement={'import { AppFooter, type FooterLinkGroup } from "@golden-passport/ds-patternfly";'}
        componentSource={appFooterComponentSrc}
        componentFileName="AppFooter.tsx"
        description="AppFooter owns the footer layout (logo + tagline, link-group columns, and the bottom bar with copyright + inline legal links) and the brand dials. You supply content; every section renders only when its prop is given."
        rows={[
          {
            name: "logo",
            type: "ReactNode",
            description:
              "Brand mark / logo node, shown top-left above the tagline.",
          },
          {
            name: "tagline",
            type: "ReactNode",
            description: "Short line under the logo.",
          },
          {
            name: "linkGroups",
            type: "FooterLinkGroup[]",
            description:
              "Sitemap-style columns. Each group is { title, links: { label, href, isExternal? }[] } and renders as a labelled <nav>.",
          },
          {
            name: "copyright",
            type: "ReactNode",
            description:
              "Bottom-bar copyright / status line. Takes any node — pass a build-status row for internal tools.",
          },
          {
            name: "legalLinks",
            type: "{ label: string; href: string }[]",
            description:
              "Inline links in the bottom bar (Privacy, Terms, support links, …).",
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
              <strong>AppFooter renders a real <code>&lt;footer&gt;</code>.</strong>{" "}
              As a direct child of the page body it carries the implicit{" "}
              <code>contentinfo</code> landmark for assistive tech — you don&rsquo;t
              add a role or label yourself.
            </li>
            <li>
              <strong>Link columns are auto-named.</strong> Each{" "}
              <code>linkGroups</code> entry renders as{" "}
              <code>&lt;nav aria-label=&#123;group.title&#125;&gt;</code>, so
              screen readers can list and jump between them.
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
