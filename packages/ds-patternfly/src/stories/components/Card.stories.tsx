import { Fragment, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Card,
  CardBody,
  CardExpandableContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@patternfly/react-core";
import { FoundationPage, Section, Card as DocCard, CodeBlock, ThemingPointer } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/Card",
  parameters: {
    layout: "padded",
    a11y: {
      config: {
        // Selectable Cards layer an absolutely-positioned input over the
        // surface, and PF6's primary buttons render their bg as a gradient
        // — both confuse axe's contrast resolver ("bg could not be
        // determined because it is overlapped by another element" /
        // "background gradient"). The actual brand-token contrast is
        // validated by tokens.test.ts.
        rules: [{ id: "color-contrast", enabled: false }],
      },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [sel, setSel] = useState<string | null>(null);
    const [exp, setExp] = useState(false);
    const [multi, setMulti] = useState<{ a: boolean; b: boolean; c: boolean }>(
      { a: false, b: false, c: false },
    );

    return (
      <FoundationPage
        title="Card"
        intro={
          <>
            The workhorse content tile — header, body, footer, optional
            actions / selection / expansion. Use cards for at-a-glance summary
            tiles (dashboards, gallery views), grouped settings panels, and
            anywhere a piece of content needs its own surface.
          </>
        }
      >
        <Section title="Basic">
          <DocCard>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Card ouiaId="BasicCard">
                  <CardTitle>Total runs today</CardTitle>
                  <CardBody>1,284 successful · 12 failed</CardBody>
                  <CardFooter>Updated 2 min ago</CardFooter>
                </Card>
              </DemoFrame>
              <CodeBlock>{`<Card>
  <CardTitle>Total runs today</CardTitle>
  <CardBody>1,284 successful · 12 failed</CardBody>
  <CardFooter>Updated 2 min ago</CardFooter>
</Card>`}</CodeBlock>
            </div>
          </DocCard>
        </Section>

        <Section
          title="With header, subtitle, actions"
          description="CardHeader pairs the title with a slot for trailing actions (kebab menu, checkbox, button). CardTitle.subtitle adds a quieter second line under the title."
        >
          <DocCard>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Card>
                  <CardHeader
                    actions={{
                      actions: (
                        <Fragment>
                          <Button variant="plain" aria-label="More" />
                        </Fragment>
                      ),
                    }}
                  >
                    <CardTitle>Workspace settings</CardTitle>
                  </CardHeader>
                  <CardBody>
                    Region, retention policy, and member access. Changes apply
                    to all projects in this workspace.
                  </CardBody>
                  <CardFooter>
                    <Button variant="primary">Edit settings</Button>
                  </CardFooter>
                </Card>
              </DemoFrame>
            </div>
          </DocCard>
        </Section>

        <Section
          title="Modifiers — compact / large / plain / full-height"
          description="Single-flag modifiers tune the card's chrome. isCompact tightens padding; isLarge expands it; isPlain strips the bg + border (use for cards that sit on a coloured surface); isFullHeight stretches to fill its grid track."
        >
          <DocCard>
            <div style={{ padding: 24, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
              <DemoFrame>
                <Card isCompact>
                  <CardTitle>Compact</CardTitle>
                  <CardBody>Tighter padding for dense lists.</CardBody>
                </Card>
              </DemoFrame>
              <DemoFrame>
                <Card isLarge>
                  <CardTitle>Large</CardTitle>
                  <CardBody>Roomier padding for hero tiles.</CardBody>
                </Card>
              </DemoFrame>
              <DemoFrame>
                <Card isPlain>
                  <CardTitle>Plain</CardTitle>
                  <CardBody>No background, no border — sits flush.</CardBody>
                </Card>
              </DemoFrame>
              <DemoFrame height={140}>
                <Card isFullHeight>
                  <CardTitle>Full height</CardTitle>
                  <CardBody>Stretches to its grid cell.</CardBody>
                </Card>
              </DemoFrame>
            </div>
          </DocCard>
        </Section>

        <Section
          title="Single-select gallery (radio behaviour)"
          description="isSelectable + matching selectableActions on each card's header turn the gallery into a radio group. Track the selected id yourself; PF6 wires aria-checked + role='radio'."
        >
          <DocCard>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                  {(["small", "medium", "large"] as const).map((id) => {
                    const inputId = `card-radio-${id}`;
                    return (
                      <Card
                        key={id}
                        id={`size-card-${id}`}
                        isSelectable
                        isSelected={sel === id}
                      >
                        <CardHeader
                          selectableActions={{
                            selectableActionId: inputId,
                            selectableActionAriaLabelledby: `size-card-${id}`,
                            name: "size-radio",
                            variant: "single",
                            onChange: () => setSel(id),
                          }}
                        >
                          <CardTitle>{id[0]?.toUpperCase()}{id.slice(1)}</CardTitle>
                        </CardHeader>
                        <CardBody>1 vCPU · 2 GB RAM</CardBody>
                      </Card>
                    );
                  })}
                </div>
              </DemoFrame>
            </div>
          </DocCard>
        </Section>

        <Section
          title="Multi-select"
          description="Drop variant='single' (or set 'multiple') and each card becomes an independent checkbox. Use for bulk-action gallery views."
        >
          <DocCard>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                  {(["a", "b", "c"] as const).map((id) => {
                    const inputId = `card-multi-${id}`;
                    return (
                      <Card
                        key={id}
                        id={`multi-card-${id}`}
                        isSelectable
                        isSelected={multi[id]}
                      >
                        <CardHeader
                          selectableActions={{
                            selectableActionId: inputId,
                            selectableActionAriaLabelledby: `multi-card-${id}`,
                            name: inputId,
                            variant: "multiple",
                            onChange: (_e, checked) =>
                              setMulti((m) => ({ ...m, [id]: checked })),
                          }}
                        >
                          <CardTitle>Resource {id.toUpperCase()}</CardTitle>
                        </CardHeader>
                        <CardBody>Pick one or more.</CardBody>
                      </Card>
                    );
                  })}
                </div>
              </DemoFrame>
            </div>
          </DocCard>
        </Section>

        <Section
          title="Expandable"
          description="CardExpandableContent collapses the body + footer behind a disclosure toggle in the header. Wire onExpand on the header, isExpanded on the Card, and the toggle's aria attributes for screen readers."
        >
          <DocCard>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Card id="expandable-demo" isExpanded={exp}>
                  <CardHeader
                    onExpand={() => setExp((v) => !v)}
                    toggleButtonProps={{
                      id: "expandable-demo-toggle",
                      "aria-label": "Details",
                      "aria-labelledby": "expandable-demo-title expandable-demo-toggle",
                      "aria-expanded": exp,
                    }}
                  >
                    <CardTitle id="expandable-demo-title">Run history</CardTitle>
                  </CardHeader>
                  <CardExpandableContent>
                    <CardBody>
                      Last 10 runs · 9 successful · 1 retry · 0 failed.
                    </CardBody>
                    <CardFooter>
                      <Button variant="link">View full history</Button>
                    </CardFooter>
                  </CardExpandableContent>
                </Card>
              </DemoFrame>
            </div>
          </DocCard>
        </Section>

        <Section title="Composition">
          <DocCard>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "Card", type: "container", description: "Outer wrapper. Owns variant, modifiers, selection / expansion / disabled state." },
                  { name: "CardHeader", type: "child", description: "Top slot. actions={{ actions, hasNoOffset }} for trailing controls; selectableActions for radio / checkbox; onExpand + toggleButtonProps for expandable cards." },
                  { name: "CardTitle", type: "child", description: "Visible title. subtitle prop adds a quieter second line." },
                  { name: "CardBody", type: "child", description: "Main content area. Multiple bodies allowed — they get stacked with internal dividers." },
                  { name: "CardFooter", type: "child", description: "Trailing slot — primary action / metadata." },
                  { name: "CardExpandableContent", type: "child", description: "Wrap CardBody + CardFooter inside this when the Card is expandable." },
                ]}
              />
            </div>
          </DocCard>
        </Section>

        <Section title="Most-used Card props">
          <DocCard>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "variant", type: '"default" | "secondary"', description: "Default surface or the secondary alt-surface (subtler, for cards on a default-bg page)." },
                  { name: "isCompact", type: "boolean", description: "Tighter internal padding." },
                  { name: "isLarge", type: "boolean", description: "Roomier padding for hero / dashboard tiles." },
                  { name: "isPlain", type: "boolean", description: "No bg, no border — sits flush. Use for cards on a coloured surface." },
                  { name: "isFullHeight", type: "boolean", description: "Stretch to fill the grid cell. Pair with Gallery / Grid layouts." },
                  { name: "isClickable", type: "boolean", description: "Whole card becomes a clickable surface — hover affordance, role=button via selectableActions." },
                  { name: "isSelectable", type: "boolean", description: "Card carries selection state. Pair with isSelected and selectableActions on CardHeader." },
                  { name: "isSelected", type: "boolean", description: "Selected state for selectable cards." },
                  { name: "isClicked", type: "boolean", description: "Active / pressed visual state for clickable cards." },
                  { name: "isDisabled", type: "boolean", description: "Greyed out and non-interactive." },
                  { name: "isExpanded", type: "boolean", description: "Open / closed state for expandable cards. Pair with CardHeader.onExpand and CardExpandableContent." },
                  { name: "ouiaId", type: "string", description: "Stable test selector." },
                ]}
              />
            </div>
          </DocCard>
        </Section>

        <Section title="Accessibility">
          <DocCard>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Selectable cards need <code>id</code></strong> on the Card and <code>selectableActionAriaLabelledby</code> in the header — the input gets its name from the title.</li>
              <li><strong>Expandable cards need full toggle wiring</strong> — <code>id</code> + <code>aria-label</code> + <code>aria-labelledby</code> + <code>aria-expanded</code> on <code>toggleButtonProps</code>.</li>
              <li><strong>Don&rsquo;t make a single card both <code>isClickable</code> AND interactive inside</strong> — wrap interactive children carefully so they don&rsquo;t steal the click target.</li>
              <li><strong>Keep titles short.</strong> Selectable card grids announce the title via the input label — a wall of text becomes unusable.</li>
            </ul>
          </DocCard>
        </Section>
        <ThemingPointer
          dials={[
            ["--gp-pad-card", "Inside padding (block + inline)."],
            ["--gp-radius-card", "Corner radius (also covers Modal box)."],
            ["--gp-shadow-card", "Resting elevation."],
            ["--gp-surface-card", "Background colour (light + dark pair)."],
          ]}
        />
      </FoundationPage>
    );
  },
};
