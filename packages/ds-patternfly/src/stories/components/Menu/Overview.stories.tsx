import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ThemingPointer,
} from "../../_kit/StoryKit.js";

const meta: Meta = {
  title: "Components/Menu",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="About menus"
      intro={
        <>
          The Menu section collects every &ldquo;open a floating list from a
          trigger&rdquo; control — action menus, value selectors, and their
          specialised variants. They all share one foundation: a{" "}
          <strong>MenuToggle</strong> trigger, a floating{" "}
          <strong>Menu</strong> surface (PF6 positions it with Popper), and a{" "}
          controlled <code>isOpen</code> state. Picking the right one is about
          what the menu <em>does</em> — run an action, choose a value, or switch
          context — not how it looks.
        </>
      }
    >
      <Section
        title="The controls"
        description="Each builds on the Menu + MenuToggle foundation; reach for the one whose job matches."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.9,
            }}
          >
            <li><strong>Menu</strong> — the raw floating list primitive: items, groups, dividers, selection, descriptions. The building block the rest compose.</li>
            <li><strong>Menu toggle</strong> — the trigger button. Text, plain (icon-only / kebab), split, or typeahead variants; carries the open/expanded state.</li>
            <li><strong>Dropdown</strong> — a menu of <em>actions</em> opened from a trigger (Run, Duplicate, Delete). Not for picking a persisted value.</li>
            <li><strong>Select</strong> — choose a <em>value</em> (single or multi) with optional typeahead. The JS-powered alternative to FormSelect for long / searchable / custom-rendered lists.</li>
            <li><strong>Options menu</strong> — a Dropdown whose items are toggle state (checkmarks / sort direction), not one-shot actions.</li>
            <li><strong>Context selector</strong> — a searchable Select for switching the active workspace / project / account.</li>
            <li><strong>Application launcher</strong> — a grid-style menu of app/product shortcuts behind a single trigger.</li>
            <li><strong>Custom menus</strong> — escape-hatch compositions (favourites, footers, mixed content) when the named patterns don&apos;t fit.</li>
          </ul>
        </Card>
      </Section>

      <Section
        title="When to use which"
        description="One-line decision tree by job-to-be-done."
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
            <li><strong>Run a one-shot action</strong> → Dropdown.</li>
            <li><strong>Row / card actions (no label)</strong> → Dropdown with a kebab MenuToggle.</li>
            <li><strong>Pick a value from a short known list, no search</strong> → FormSelect (native — see Components/Forms/FormSelect).</li>
            <li><strong>Pick a value from a long / searchable / custom list</strong> → Select.</li>
            <li><strong>Pick several values</strong> → Select (multi).</li>
            <li><strong>Toggle view state (sort, density, columns)</strong> → Options menu.</li>
            <li><strong>Switch workspace / project</strong> → Context selector.</li>
            <li><strong>Jump between apps</strong> → Application launcher.</li>
          </ul>
        </Card>
      </Section>

      <Section
        title="What stays consistent"
        description="The behaviour you get for free across the family."
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
            <li><strong>Controlled open state</strong> — <code>isOpen</code> + <code>onOpenChange</code>; close-on-select and close-on-outside-click are wired by PF6.</li>
            <li><strong>Keyboard</strong> — Enter / Space / ↓ open; arrow keys move; Esc closes and returns focus to the toggle.</li>
            <li><strong>Positioning</strong> — Popper-driven, viewport-aware (auto-flip); append to <code>document.body</code> to escape overflow-clipped containers.</li>
            <li><strong>Brand chrome</strong> — toggle height, radius, focus ring, and menu surface all flow from the same dials as form controls.</li>
          </ul>
        </Card>
      </Section>

      <ThemingPointer
        dials={[
          ["--gp-control-pad-y", "Toggle height — matches form-control fields."],
          ["--gp-radius-control", "Toggle corner radius."],
          ["--gp-radius-card", "Menu surface corner radius."],
          ["--gp-focus-ring", "Focus-ring colour on the toggle."],
        ]}
      />
    </FoundationPage>
  ),
};
