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
  TitleBodyFooter,
  ExternalDocsLink,
  InlineLink,
  BodyOnly,
} from "../../examples/components/Hint.example.js";
import hintExampleSrc from "../../examples/components/Hint.example.tsx?raw";
import hintComponentSrc from "../../components/base/Hint.tsx?raw";

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
          <Example
            source={hintExampleSrc}
            region="TitleBodyFooter"
            fileName="Hint.example.tsx"
          >
            <TitleBodyFooter />
          </Example>
        </Card>
      </Section>

      <Section
        title="External docs link"
        description='target="_blank" — Hyperlink auto-adds rel="noopener noreferrer", a small external-link icon, and a screen-reader "(opens in a new tab)" announcement. Same component, four security/a11y defaults consumers reliably forget on raw <a>.'
      >
        <Card>
          <Example
            source={hintExampleSrc}
            region="ExternalDocsLink"
            fileName="Hint.example.tsx"
          >
            <ExternalDocsLink />
          </Example>
        </Card>
      </Section>

      <Section title="Inline link in the body" description="Hyperlink works inline inside HintBody prose.">
        <Card>
          <Example
            source={hintExampleSrc}
            region="InlineLink"
            fileName="Hint.example.tsx"
          >
            <InlineLink />
          </Example>
        </Card>
      </Section>

      <Section title="Body only" description="Drop the title and footer for a one-line nudge.">
        <Card>
          <Example
            source={hintExampleSrc}
            region="BodyOnly"
            fileName="Hint.example.tsx"
          >
            <BodyOnly />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={hintExampleSrc} fileName="Hint.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Hint, HintTitle, HintBody, HintFooter, Hyperlink } from "@golden-passport/ds-patternfly";'}
        componentSource={hintComponentSrc}
        componentFileName="Hint.tsx"
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
