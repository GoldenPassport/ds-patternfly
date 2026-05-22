import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card } from "../_storyKit.js";

const meta: Meta = {
  title: "Foundations",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="About design foundations"
      intro={
        <>
          Design foundations are the building blocks of the design system —
          the things every component is made of. They are intentionally
          opinionated so that any UI assembled from them looks cohesive,
          performs well, and stays accessible. This system layers on top of{" "}
          <strong>PatternFly 6</strong> and is brandable via swappable token
          sets (e.g. <code>Golden Passport</code>).
        </>
      }
    >
      <Section
        title="What's in this section"
        description="Each topic below is documented as its own story page in the navigation tree."
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
              <strong>Colors</strong> — semantic roles (brand, background, text,
              status, nonstatus) plus the raw 50–900 palette families. Every
              role has a light and dark value.
            </li>
            <li>
              <strong>Icons</strong> — sizing, semantic coloring, and a sample
              of common PatternFly icons.
            </li>
            <li>
              <strong>Motion</strong> — duration and easing tokens, with live
              examples.
            </li>
            <li>
              <strong>Spacers</strong> — the spatial scale used for padding,
              gaps, and inset.
            </li>
            <li>
              <strong>Theming</strong> — how brands and color modes are wired
              up; how to author a new brand.
            </li>
            <li>
              <strong>Typography</strong> — font stacks, sizes, and reference
              type styles.
            </li>
            <li>
              <strong>Usage and behavior</strong> — interactive states (focus,
              hover, disabled), keyboard, and a11y guarantees.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Design principles"
        description="The non-negotiables that shape every decision in this system."
      >
        <Card>
          <div
            style={{
              padding: 24,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
              color: "var(--gp-color-text-regular)",
            }}
          >
            <Principle
              title="Accessible by design"
              body="WCAG 2.2 AA is a contract, not a goal. Color contrast is validated by tests on every brand and mode."
            />
            <Principle
              title="i18n-ready, not bundled"
              body="Components own zero hardcoded strings. Every label is a prop with a typed shape — translation library choice belongs to the consuming app."
            />
            <Principle
              title="Brandable"
              body="A brand is a typed token object. Switch brands or modes by changing a prop; no component changes needed."
            />
            <Principle
              title="Strict TypeScript end-to-end"
              body="Every export is fully typed. .d.ts ships in the package. Required ARIA props are required at the type level."
            />
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};

function Principle({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3
        style={{
          fontFamily: "var(--gp-font-family-heading)",
          fontSize: 16,
          margin: "0 0 4px",
          color: "var(--gp-color-text-regular)",
        }}
      >
        {title}
      </h3>
      <p style={{ margin: 0, color: "var(--gp-color-text-subtle)" }}>{body}</p>
    </div>
  );
}
