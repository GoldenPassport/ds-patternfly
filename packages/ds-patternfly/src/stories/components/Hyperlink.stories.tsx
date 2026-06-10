import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
  ThemingPointer,
} from "../_kit/StoryKit.js";
import {
  InlineLinks,
  ExternalLinks,
  Variants,
} from "../../examples/components/Hyperlink.example.js";
import hyperlinkExampleSrc from "../../examples/components/Hyperlink.example.tsx?raw";
import hyperlinkComponentSrc from "../../components/Hyperlink.tsx?raw";

const meta: Meta = {
  title: "Components/Hyperlink",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Hyperlink"
      intro={
        <>
          A real <code>&lt;a&gt;</code> styled with the brand&apos;s blue
          link tokens. Use it for navigation — changing URL, jumping between
          views, opening external sites. For actions that don&apos;t change
          URL (open dialog, save, delete), use <code>Button</code> with{" "}
          <code>variant=&quot;link&quot;</code>.
        </>
      }
    >
      <Section title="Inline links">
        <Card>
          <Example
            source={hyperlinkExampleSrc}
            region="InlineLinks"
            fileName="Hyperlink.example.tsx"
          >
            <InlineLinks />
          </Example>
        </Card>
      </Section>

      <Section
        title="External links"
        description='target="_blank" auto-adds rel="noopener noreferrer", an external-link icon, and a screen reader "(opens in a new tab)" announcement.'
      >
        <Card>
          <Example
            source={hyperlinkExampleSrc}
            region="ExternalLinks"
            fileName="Hyperlink.example.tsx"
          >
            <ExternalLinks />
          </Example>
        </Card>
      </Section>

      <Section
        title="Variants"
        description="default underlines on hover/focus; underline always shows the underline."
      >
        <Card>
          <Example
            source={hyperlinkExampleSrc}
            region="Variants"
            fileName="Hyperlink.example.tsx"
          >
            <Variants />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={hyperlinkExampleSrc} fileName="Hyperlink.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Hyperlink } from "@golden-passport/ds-patternfly";'}
        componentSource={hyperlinkComponentSrc}
        componentFileName="Hyperlink.tsx"
        description={
          <>
            How to import the component and every prop it accepts. All other
            native <code>&lt;a&gt;</code> attributes pass through (e.g.{" "}
            <code>onClick</code>, <code>aria-*</code>, <code>data-*</code>).
          </>
        }
        rows={[
          {
            name: "href",
            type: "string",
            description: "Required. Destination URL.",
          },
          {
            name: "children",
            type: "ReactNode",
            description: "Required. The link text — provides the accessible name.",
          },
          {
            name: "target",
            type: '"_blank" | "_self" | "_parent" | "_top" | string',
            description: 'When "_blank", auto-adds rel security defaults, an external-link icon, and an AT announcement.',
          },
          {
            name: "rel",
            type: "string",
            description: 'Custom rel — merged with "noopener noreferrer" when target="_blank". Pass them yourself if you want full control.',
          },
          {
            name: "variant",
            type: '"default" | "underline"',
            description: "default underlines on hover/focus only; underline is always underlined.",
          },
          {
            name: "hideExternalIcon",
            type: "boolean",
            description: 'Suppress the new-tab icon even when target="_blank". The screen reader announcement still fires.',
          },
          {
            name: "newTabLabel",
            type: "string",
            description: 'Translated string read by AT for new-tab links. Default "(opens in a new tab)".',
          },
        ]}
      />

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li>
              <strong>It&apos;s a real <code>&lt;a&gt;</code>.</strong> Right-click,
              middle-click, copy-link-address, "open in new tab" — all the things
              users expect from a link work because nothing&apos;s being intercepted.
            </li>
            <li>
              <strong>Don&apos;t use Hyperlink for actions.</strong> If clicking the
              link doesn&apos;t change URL, it should be a Button with{" "}
              <code>variant=&quot;link&quot;</code>. Sighted users can&apos;t tell the
              difference; AT users definitely can — links and buttons are
              different roles.
            </li>
            <li>
              <strong>External links are flagged twice.</strong> The icon is for
              sighted users, the screen reader text is for AT — both communicate
              the same "this opens elsewhere" signal so neither audience is
              surprised by a new tab.
            </li>
            <li>
              <strong>Colour isn&apos;t the only signal.</strong> Default variant
              underlines on hover/focus; for inline links in prose,
              <code>variant=&quot;underline&quot;</code> shows the underline at rest
              so colour-blind readers see the link without depending on hue.
            </li>
            <li>
              <strong>WCAG-AA contrast is enforced by the brand.</strong> The
              link colour resolves to the brand info palette (~7.75:1 against
              the page in light mode, well past AA). Validated by the brand
              contrast test suite.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="When to use it"
        description="The action-vs-navigation distinction governs the choice."
      >
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Use Hyperlink for…</strong> internal navigation, external sites, deep links to a specific record.</li>
            <li><strong>Use Button variant=&quot;link&quot; for…</strong> "Reset password", "Cancel", "Show details" — actions styled like links.</li>
            <li><strong>Use Button variant=&quot;primary/secondary&quot; for…</strong> the primary action of a region. Even if it triggers navigation, primary actions read better as buttons.</li>
          </ul>
        </Card>
      </Section>
      <ThemingPointer
        dials={[
          ["--gp-anchor-color", "Link text colour (light + dark pair)."],
          ["--gp-anchor-decoration-hover", "Hover decoration (default underline)."],
          ["--gp-font-body", "Font family — inherits from the body font dial."],
          ["--gp-focus-ring", "Focus-ring colour."],
        ]}
      />
    </FoundationPage>
  ),
};
