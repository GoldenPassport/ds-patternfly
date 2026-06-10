import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ActionList,
  ActionListGroup,
  ActionListItem,
  Button,
  ButtonVariant,
  Tooltip,
} from "@golden-passport/ds-patternfly";
import OutlinedCopyIcon from "@patternfly/react-icons/dist/esm/icons/outlined-copy-icon";
import OutlinedPlusSquareIcon from "@patternfly/react-icons/dist/esm/icons/outlined-plus-square-icon";
import OutlinedQuestionCircleIcon from "@patternfly/react-icons/dist/esm/icons/outlined-question-circle-icon";
import PlayIcon from "@patternfly/react-icons/dist/esm/icons/play-icon";
import {
  FoundationPage,
  Section,
  Card,
  CodeBlock,
} from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Components/ActionList",
  parameters: { layout: "padded" },
};
export default meta;

// ──────────────────────────────────────────────────────────────────
// Story: Basic — horizontal action row (form footers, modal footers)
// ──────────────────────────────────────────────────────────────────

export const Basic: StoryObj = {
  render: () => (
    <FoundationPage
      title="ActionList"
      intro={
        <>
          A spacing/layout primitive for groups of action buttons.{" "}
          <code>ActionList</code> handles the gap; you supply{" "}
          <code>ActionListItem</code>s containing real{" "}
          <code>Button</code>s. Use <code>ActionListGroup</code> to
          cluster related actions with extra space between groups.
          Most-used flags: <code>isVertical</code> (stack
          top-to-bottom — used inside Compass sidebars),{" "}
          <code>isIconList</code> (tighter spacing for icon-only
          buttons).
        </>
      }
    >
      <Section
        title="Basic horizontal action row"
        description="The default — a horizontal flex of items. Drop into a modal/form footer."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <ActionList>
              <ActionListItem>
                <Button variant={ButtonVariant.primary}>Save</Button>
              </ActionListItem>
              <ActionListItem>
                <Button variant={ButtonVariant.secondary}>Cancel</Button>
              </ActionListItem>
            </ActionList>
            <CodeBlock>{`<ActionList>
  <ActionListItem>
    <Button variant="primary">Save</Button>
  </ActionListItem>
  <ActionListItem>
    <Button variant="secondary">Cancel</Button>
  </ActionListItem>
</ActionList>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Grouped — primary + secondary clusters"
        description="ActionListGroup adds a wider gap between groups, signalling that the actions belong to different tasks."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <ActionList>
              <ActionListGroup>
                <ActionListItem>
                  <Button variant={ButtonVariant.primary}>Upgrade today</Button>
                </ActionListItem>
                <ActionListItem>
                  <Button variant={ButtonVariant.secondary}>
                    Talk to a specialist
                  </Button>
                </ActionListItem>
              </ActionListGroup>
              <ActionListGroup>
                <ActionListItem>
                  <Button variant={ButtonVariant.link}>Learn more</Button>
                </ActionListItem>
              </ActionListGroup>
            </ActionList>
            <CodeBlock>{`<ActionList>
  <ActionListGroup>
    <ActionListItem><Button variant="primary">Upgrade today</Button></ActionListItem>
    <ActionListItem><Button variant="secondary">Talk to a specialist</Button></ActionListItem>
  </ActionListGroup>
  <ActionListGroup>
    <ActionListItem><Button variant="link">Learn more</Button></ActionListItem>
  </ActionListGroup>
</ActionList>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Vertical icon list — Compass sidebar shape"
        description="isVertical stacks the items top-to-bottom; isIconList tightens spacing and centres icon-only Buttons. This is the exact shape used in the Compass pattern's sidebars."
      >
        <Card>
          <div
            style={{
              padding: 24,
              display: "grid",
              gap: 16,
              gridTemplateColumns: "auto 1fr",
              alignItems: "start",
            }}
          >
            <div
              style={{
                background: "var(--gp-color-bg-secondary-default)",
                padding: 12,
                borderRadius: 8,
              }}
            >
              <ActionList isIconList isVertical>
                <ActionListGroup>
                  <ActionListItem>
                    <Tooltip content="Run">
                      <Button
                        variant="plain"
                        icon={<PlayIcon />}
                        aria-label="Run"
                        isCircle
                      />
                    </Tooltip>
                  </ActionListItem>
                  <ActionListItem>
                    <Tooltip content="Add">
                      <Button
                        variant="plain"
                        icon={<OutlinedPlusSquareIcon />}
                        aria-label="Add"
                        isCircle
                      />
                    </Tooltip>
                  </ActionListItem>
                </ActionListGroup>
                <ActionListGroup>
                  <ActionListItem>
                    <Tooltip content="Help">
                      <Button
                        variant="plain"
                        icon={<OutlinedQuestionCircleIcon />}
                        aria-label="Help"
                        isCircle
                      />
                    </Tooltip>
                  </ActionListItem>
                  <ActionListItem>
                    <Tooltip content="Copy">
                      <Button
                        variant="plain"
                        icon={<OutlinedCopyIcon />}
                        aria-label="Copy"
                        isCircle
                      />
                    </Tooltip>
                  </ActionListItem>
                </ActionListGroup>
              </ActionList>
            </div>
            <CodeBlock>{`<ActionList isIconList isVertical>
  <ActionListGroup>
    <ActionListItem>
      <Tooltip content="Run">
        <Button variant="plain" icon={<PlayIcon />} aria-label="Run" isCircle />
      </Tooltip>
    </ActionListItem>
    {/* …more primary actions… */}
  </ActionListGroup>
  <ActionListGroup>
    <ActionListItem>
      <Tooltip content="Help">
        <Button variant="plain" icon={<OutlinedQuestionCircleIcon />}
                aria-label="Help" isCircle />
      </Tooltip>
    </ActionListItem>
    {/* …more utility actions… */}
  </ActionListGroup>
</ActionList>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                {
                  name: "isVertical",
                  type: "boolean",
                  description:
                    "Stack items top-to-bottom. Used for icon rails inside Compass sidebars.",
                },
                {
                  name: "isIconList",
                  type: "boolean",
                  description:
                    "Tighter gap and centred items, intended for icon-only Buttons.",
                },
                {
                  name: "children",
                  type: "ActionListItem | ActionListGroup",
                  description:
                    "Wrap each child Button in ActionListItem. Cluster related items in ActionListGroup for extra inter-group gap.",
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="When to use ActionList vs Toolbar vs Flex">
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
              <strong>ActionList</strong> — small clusters of buttons
              with a clear single task: form footer, modal footer,
              sidebar rail. PF6 owns the gap token.
            </li>
            <li>
              <strong>Toolbar</strong> — page chrome with filters,
              search, pagination. Has slots for groups, item
              alignment, and overflow.
            </li>
            <li>
              <strong>Flex</strong> — bespoke arrangements that don&apos;t
              fit either pattern. You own the spacing.
            </li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
