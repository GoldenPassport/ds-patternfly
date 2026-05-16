import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";

const meta: Meta = {
  title: "Accessibility/Develop for accessibility",
  parameters: { layout: "padded" },
};
export default meta;

export const Patterns: StoryObj = {
  render: () => (
    <FoundationPage
      title="Develop for accessibility"
      intro={
        <>
          Code patterns and prop contracts that make a11y the default in apps
          built on this system. Most rules are enforced by TypeScript or
          PatternFly internals — the rest are quick disciplines.
        </>
      }
    >
      <Section
        title="Always pass labels"
        description="Components that own a region or status text require a typed labels prop. There is no silent English fallback."
      >
        <Card>
          <CodeBlock>{`import {
  PrimaryDetailLayout,
  primaryDetailLayoutEnLabels,    // English defaults — opt-in
} from "@golden-passport/ds-patternfly";

// Zero-i18n usage:
<PrimaryDetailLayout
  items={items}
  getItemId={(i) => i.id}
  selectedId={selectedId}
  onSelect={setSelectedId}
  renderListItem={...}
  renderDetail={...}
  labels={primaryDetailLayoutEnLabels}    // required
/>

// With your translation library:
<PrimaryDetailLayout
  /* ... */
  labels={{
    listAriaLabel:    t("pdl.list"),
    detailAriaLabel:  t("pdl.detail"),
    backToList:       t("pdl.back"),
    emptyDetailTitle: t("pdl.empty.title"),
    emptyDetailBody:  t("pdl.empty.body"),
  } satisfies PrimaryDetailLayoutLabels}
/>`}</CodeBlock>
        </Card>
      </Section>

      <Section
        title="Name your icon-only buttons"
        description="Every interactive element needs an accessible name. Icons alone don't have one."
      >
        <Card>
          <CodeBlock>{`// ❌ Accessible name = empty
<Button variant="plain"><TrashIcon /></Button>

// ✅ Accessible name comes from aria-label
<Button variant="plain" aria-label="Delete row">
  <TrashIcon aria-hidden="true" />
</Button>`}</CodeBlock>
        </Card>
      </Section>

      <Section
        title="Use semantic HTML, then ARIA"
        description="ARIA is a patch over missing semantics. If a native element fits, use it."
      >
        <Card>
          <CodeBlock>{`// ❌ Custom div pretending to be a button
<div onClick={onClick} className="btn">Save</div>

// ✅ Real button — keyboard, focus, screen reader, all free
<Button onClick={onClick}>Save</Button>`}</CodeBlock>
        </Card>
      </Section>

      <Section
        title="Manage focus on navigation"
        description="When a route changes or a major panel mounts, focus should move to a sensible new starting point — usually the page heading."
      >
        <Card>
          <CodeBlock>{`function Page({ title }: { title: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, [title]);
  return (
    <h1 ref={ref} tabIndex={-1} className="gp-main">
      {title}
    </h1>
  );
}`}</CodeBlock>
        </Card>
      </Section>

      <Section
        title="Trap focus in modal layers"
        description="Dialogs and drawers must keep tab focus inside until dismissed. PatternFly's <Modal>, <Drawer>, and <Popover> handle this — don't roll your own."
      />

      <Section
        title="Status messages, not console.log"
        description="Use ARIA live regions or PatternFly Alert with the right role so assistive tech announces state changes."
      >
        <Card>
          <CodeBlock>{`<Alert variant="success" title="Profile saved" role="status" />
<Alert variant="danger"  title="Save failed"   role="alert" />`}</CodeBlock>
        </Card>
      </Section>

      <Section
        title="Color tokens, not raw hex"
        description="Use the semantic CSS variables emitted by ThemeProvider. They adapt to brand and color mode automatically."
      >
        <Card>
          <CodeBlock>{`// ❌ Locked to a single brand and mode
<div style={{ color: "#0066cc" }}>...</div>

// ✅ Adapts to brand × mode
<div style={{ color: "var(--gp-color-text-link)" }}>...</div>`}</CodeBlock>
        </Card>
      </Section>

      <Section
        title="Logical CSS properties"
        description='Use inline-/block- properties so layouts mirror correctly under dir="rtl".'
      >
        <Card>
          <CodeBlock>{`// ❌ Breaks RTL
margin-left: 8px;
border-right: 1px solid #ccc;

// ✅ Works in both directions
margin-inline-start: 8px;
border-inline-end: 1px solid var(--gp-color-border-default);`}</CodeBlock>
        </Card>
      </Section>

      <Section
        title="Honor reduced motion"
        description="Add this once at the app root."
      >
        <Card>
          <CodeBlock>{`@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0ms !important;
    transition-duration: 0ms !important;
  }
}`}</CodeBlock>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
