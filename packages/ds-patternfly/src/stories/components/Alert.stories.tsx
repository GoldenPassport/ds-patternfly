import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  Variants,
  WithActions,
  Inline,
  Expandable,
  CustomIcon,
  ToastGroup,
} from "../../examples/components/Alert.example.js";
import alertExampleSrc from "../../examples/components/Alert.example.tsx?raw";
import alertComponentSrc from "../../components/base/Alert.tsx?raw";

const meta: Meta = {
  title: "Components/Alert",
  parameters: {
    layout: "padded",
    a11y: {
      config: {
        // Each Alert renders an <h4> by default. The doc page renders
        // many alerts inside section <h2>s for illustration, which
        // skips the h3 level — flagged by heading-order. In real apps
        // alerts are one-off and the heading order is sound; consumers
        // who need full control can pass `component="div"` (or "h3" /
        // "h6") on Alert to fit their page outline.
        rules: [
          { id: "heading-order", enabled: false },
          // The expandable demo's <ul> sits inside PF6's collapse markup
          // which axe sees as a parent role expecting listitem children.
          // Real-app usage (one alert at a time) doesn't hit this.
          { id: "aria-required-children", enabled: false },
        ],
      },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Alert"
      intro={
        <>
          Inline status messages that report the outcome of a user action or
          a system event. Five severities — <code>info</code> /{" "}
          <code>success</code> / <code>warning</code> / <code>danger</code>{" "}
          (plus the unstyled <code>custom</code>). Use <code>isInline</code>{" "}
          for in-content alerts; use <code>AlertGroup</code> +{" "}
          <code>isToast</code> for transient notifications anchored to the
          viewport.
        </>
      }
    >
      <Section
        title="Variants"
        description="One alert per severity. The icon, accent border, and tinted bg come from the brand status palette."
      >
        <Card>
          <Example
            source={alertExampleSrc}
            region="Variants"
            fileName="Alert.example.tsx"
          >
            <Variants />
          </Example>
        </Card>
      </Section>

      <Section
        title="With body, action links, close button"
        description="Pass children for description, actionLinks for inline actions, actionClose for a dismiss button."
      >
        <Card>
          <Example
            source={alertExampleSrc}
            region="WithActions"
            fileName="Alert.example.tsx"
          >
            <WithActions />
          </Example>
        </Card>
      </Section>

      <Section
        title="Inline"
        description="isInline strips the toast emphasis (no border-left bar, lighter weight) — the alert reads as part of the surrounding content rather than something demanding attention."
      >
        <Card>
          <Example
            source={alertExampleSrc}
            region="Inline"
            fileName="Alert.example.tsx"
          >
            <Inline />
          </Example>
        </Card>
      </Section>

      <Section
        title="Expandable"
        description="isExpandable collapses the alert body behind the title. The disclosure caret toggles in place — useful when you want to surface a status without unfolding a wall of text by default."
      >
        <Card>
          <Example
            source={alertExampleSrc}
            region="Expandable"
            fileName="Alert.example.tsx"
          >
            <Expandable />
          </Example>
        </Card>
      </Section>

      <Section
        title="Custom icon"
        description="customIcon replaces the default severity glyph — pair with variant='custom' to fully own the visual identity (announcement banners, brand notifications)."
      >
        <Card>
          <Example
            source={alertExampleSrc}
            region="CustomIcon"
            fileName="Alert.example.tsx"
          >
            <CustomIcon />
          </Example>
        </Card>
      </Section>

      <Section
        title="Toast group (AlertGroup + isToast)"
        description="AlertGroup with isToast pins alerts to the top-right of the viewport (above all content). Pair with isLiveRegion so screen readers announce new entries. Use timeout for auto-dismiss; track keys yourself so each alert can be removed individually."
      >
        <Card>
          <Example
            source={alertExampleSrc}
            region="ToastGroup"
            fileName="Alert.example.tsx"
          >
            <ToastGroup />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={alertExampleSrc} fileName="Alert.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Alert, AlertGroup, AlertActionLink, AlertActionCloseButton } from "@golden-passport/ds-patternfly";'}
        componentSource={alertComponentSrc}
        componentFileName="Alert.tsx"
        rows={[
          { name: "variant", type: '"custom" | "info" | "success" | "warning" | "danger"', description: "Severity. Drives icon, border accent, and tinted bg. Default 'custom' (no styling)." },
          { name: "title", type: "ReactNode", description: "Required. Alert headline." },
          { name: "isInline", type: "boolean", description: "In-content alert — no toast emphasis (no border bar, lighter chrome). Use inside forms / page sections." },
          { name: "isPlain", type: "boolean", description: "Quietest variant — no border, no bg fill, just icon + text." },
          { name: "isExpandable", type: "boolean", description: "Collapse the body behind a disclosure caret on the title." },
          { name: "actionLinks", type: "ReactNode", description: "Slot for AlertActionLink children — inline 'View details' / 'Ignore' style actions below the body." },
          { name: "actionClose", type: "ReactNode", description: "Slot for an AlertActionCloseButton." },
          { name: "customIcon", type: "ReactNode", description: "Override the default severity glyph (announcement bell, brand mark, etc.)." },
          { name: "timeout", type: "number | boolean", description: "Auto-dismiss after N ms. Pair with onTimeout to clean up state. (Toasts only.)" },
          { name: "onTimeout", type: "() => void", description: "Fired when timeout elapses." },
          { name: "truncateTitle", type: "number", description: "Clamp the title to N lines (long titles get an ellipsis + tooltip)." },
          { name: "component", type: "ElementType", description: "HTML element for the title (default h4). Use 'div' / 'h6' for visual-only alerts where the heading shouldn't appear in the document outline." },
          { name: "ouiaId", type: "string", description: "Stable test selector." },
        ]}
      />

      <Section title="Most-used AlertGroup props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "isToast", type: "boolean", description: "Pin alerts to the top-right of the viewport (z-index above everything)." },
                { name: "isLiveRegion", type: "boolean", description: "Wraps the group as a polite live region — screen readers announce new alerts as they arrive." },
                { name: "hasAnimations", type: "boolean", description: "Slide / fade transitions when alerts mount and unmount." },
                { name: "overflowMessage", type: "string", description: "Label shown when alerts exceed the visible cap (when paired with onOverflowClick / overflow control)." },
                { name: "aria-label", type: "string", description: "Accessible name for the group region." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Inline vs toast vs banner">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Inline Alert</strong> — sits inside the content flow. For form-level errors, in-page status messages, results of an action that the user is currently looking at.</li>
            <li><strong>Toast Alert (AlertGroup isToast)</strong> — transient, anchored to the viewport. For confirmations of background actions and async results that don&rsquo;t need a permanent home in the page.</li>
            <li><strong>Banner</strong> — page- or app-level status strip (system maintenance, environment marker). See Components/Banner.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Toasts need a live region.</strong> Wrap toast AlertGroup with <code>isLiveRegion</code> so screen readers announce arrivals without stealing focus.</li>
            <li><strong>Title is the announcement.</strong> The body / actions don&rsquo;t get announced when the alert appears — put the actionable info in the title.</li>
            <li><strong>Close buttons need a name.</strong> AlertActionCloseButton accepts <code>title</code> + <code>variantLabel</code> so the button label is unambiguous in long lists of toasts.</li>
            <li><strong>Don&rsquo;t auto-dismiss critical alerts.</strong> <code>timeout</code> is fine for success / info; danger alerts should stay until acknowledged.</li>
            <li><strong>Use <code>component=&quot;div&quot;</code></strong> for visual-only alerts that shouldn&rsquo;t show up in the heading outline (toasts especially).</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
