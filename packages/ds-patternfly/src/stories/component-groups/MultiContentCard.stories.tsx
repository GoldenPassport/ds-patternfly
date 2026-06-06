import { useState, type Ref, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Content,
  ContentVariants,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownList,
  Icon,
  Label,
  List,
  ListItem,
  MenuToggle,
  type MenuToggleElement,
} from "@patternfly/react-core";
import MultiContentCard from "@patternfly/react-component-groups/dist/dynamic/MultiContentCard";
import {
  ArrowRightIcon,
  BellIcon,
  CogIcon,
  EllipsisVIcon,
  LockIcon,
} from "@patternfly/react-icons";
import { FoundationPage, Section, Card as DocCard, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Component groups/Content containers/Multi-content card",
  parameters: { layout: "padded" },
};
export default meta;

const tile = (title: string, body: string) => (
  <Card isPlain>
    <CardTitle>{title}</CardTitle>
    <CardBody>{body}</CardBody>
  </Card>
);

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

// ── "With dividers" cards: heading + brand action label (icon + text) +
//    body + footer. Card 2's header is kept but hidden so all three
//    bodies align on the same baseline. ──
const actionLabelStyle: React.CSSProperties = {
  color: "var(--pf-t--global--text--color--brand--default)",
  fontSize: "var(--pf-t--global--font--size--sm)",
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  marginBlockEnd: "var(--pf-t--global--spacer--sm)",
};

const learnMore = (
  <Content>
    <Button
      icon={
        <Icon className="pf-v6-u-ml-sm" isInline>
          <ArrowRightIcon />
        </Icon>
      }
      variant="link"
      isInline
    >
      Learn more
    </Button>
  </Content>
);

const linksFooter = (
  <List
    className="pf-v6-u-font-size-sm pf-v6-u-ml-0"
    style={{ color: "var(--pf-t--global--color--brand--default)" }}
  >
    <ListItem>
      <Button variant="link" isInline>First link</Button>
    </ListItem>
    <ListItem>
      <Button variant="link" isInline>Second link</Button>
    </ListItem>
    <ListItem>
      <Button variant="link" isInline>Another link</Button>
    </ListItem>
  </List>
);

/** Card with an icon + bold brand action line above the body. */
const richCard = (
  key: string,
  heading: ReactNode,
  icon: ReactNode,
  action: string,
  body: string,
  footer: ReactNode,
) => (
  <Card isFullHeight isPlain key={key}>
    <CardHeader className="pf-v6-u-pt-0" style={heading ? undefined : { visibility: "hidden" }}>
      {heading ?? "-"}
    </CardHeader>
    <CardBody>
      <Content style={actionLabelStyle}>
        <Icon size="md" className="pf-v6-u-pr-md">
          <span style={{ color: "var(--pf-t--global--icon--color--regular)" }}>{icon}</span>
        </Icon>
        {action}
      </Content>
      <Content className="pf-v6-u-font-size-sm">{body}</Content>
    </CardBody>
    <CardFooter>{footer}</CardFooter>
  </Card>
);

const dividerCards = [
  richCard(
    "card-1",
    <Content component={ContentVariants.h4}>Getting started</Content>,
    <CogIcon />,
    "Configure application",
    LOREM,
    linksFooter,
  ),
  richCard("card-2", null, <LockIcon />, "Configure access", `${LOREM} Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`, learnMore),
  richCard(
    "card-3",
    <Content component={ContentVariants.h4}>Next steps</Content>,
    <BellIcon />,
    "Configure notifications",
    LOREM,
    learnMore,
  ),
];

/** Card whose action line is a status Label (used by the "With actions"
 *  example). */
const labelCard = (
  key: string,
  heading: ReactNode,
  label: ReactNode,
  body: string,
  footer: ReactNode,
) => (
  <Card isFullHeight isPlain key={key}>
    <CardHeader className="pf-v6-u-pt-0" style={heading ? undefined : { visibility: "hidden" }}>
      {heading ?? "-"}
    </CardHeader>
    <CardBody>
      <div className="pf-v6-u-mb-sm">{label}</div>
      <Content className="pf-v6-u-font-size-sm">{body}</Content>
    </CardBody>
    <CardFooter>{footer}</CardFooter>
  </Card>
);

const actionCards = [
  labelCard(
    "a-1",
    <Content component={ContentVariants.h4}>Getting started</Content>,
    <Label icon={<CogIcon />} color="blue">Configure application</Label>,
    LOREM,
    linksFooter,
  ),
  labelCard("a-2", null, <Label icon={<LockIcon />} color="green">Configure access</Label>, `${LOREM} Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`, learnMore),
  labelCard(
    "a-3",
    <Content component={ContentVariants.h4}>Next steps</Content>,
    <Label icon={<BellIcon />} color="orange">Configure notifications</Label>,
    LOREM,
    learnMore,
  ),
];

export const Overview: StoryObj = {
  render: () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    return (
      <FoundationPage
        title="Multi-content card"
        intro={
          <>
            A card that hosts multiple equally-weighted Card children in a row,
            optionally separated by dividers and toggled via an expandable
            footer. Use it for dashboard summary tiles where 2–4 sub-cards
            belong together (e.g. status / counts / health) without
            introducing a separate Grid.
          </>
        }
      >
        <Section
          title="Basic"
          description="Pass an array of Card elements via the `cards` prop. Each card sits in its own column with consistent gutters."
        >
          <DocCard>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <MultiContentCard
                  cards={[
                    tile("Active", "12 in flight"),
                    tile("Queued", "4 waiting"),
                    tile("Failed", "1 needs review"),
                  ]}
                />
              </DemoFrame>
              <CodeBlock>{`<MultiContentCard
  cards={[
    <Card><CardTitle>Active</CardTitle><CardBody>12 in flight</CardBody></Card>,
    <Card><CardTitle>Queued</CardTitle><CardBody>4 waiting</CardBody></Card>,
    <Card><CardTitle>Failed</CardTitle><CardBody>1 needs review</CardBody></Card>,
  ]}
/>`}</CodeBlock>
            </div>
          </DocCard>
        </Section>

        <Section
          title="With dividers"
          description="A richer composition — each child Card uses a header, an icon + brand action line, body copy, and a footer (links or a 'Learn more' action). `withDividers` separates them with a vertical rule; `isExpandable` wraps the row in a titled toggle."
        >
          <DocCard>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <MultiContentCard
                  isExpandable
                  withDividers
                  toggleText="Card with dividers toggle text"
                  cards={dividerCards}
                />
              </DemoFrame>
              <CodeBlock>{`const cards = [
  <Card isFullHeight isPlain>
    <CardHeader><Content component={ContentVariants.h4}>Getting started</Content></CardHeader>
    <CardBody>
      <Content className="action"><Icon><CogIcon /></Icon> Configure application</Content>
      <Content className="pf-v6-u-font-size-sm">Lorem ipsum…</Content>
    </CardBody>
    <CardFooter>
      <List><ListItem><Button variant="link" isInline>First link</Button></ListItem>…</List>
    </CardFooter>
  </Card>,
  /* …two more cards… */
];

<MultiContentCard
  isExpandable
  withDividers
  toggleText="Card with dividers toggle text"
  cards={cards}
/>`}</CodeBlock>
            </div>
          </DocCard>
        </Section>

        <Section
          title="With actions"
          description="Pass an `actions` slot (a kebab Dropdown) rendered next to the toggle, and use status `Label`s for each card's action line. Use when the grouped card needs its own overflow menu (edit, refresh, remove)."
        >
          <DocCard>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <MultiContentCard
                  isExpandable
                  toggleText="Card with actions toggle text"
                  cards={actionCards}
                  actions={
                    <Dropdown
                      isOpen={isMenuOpen}
                      onSelect={() => setMenuOpen(false)}
                      onOpenChange={(open: boolean) => setMenuOpen(open)}
                      popperProps={{ position: "right" }}
                      toggle={(toggleRef: Ref<MenuToggleElement>) => (
                        <MenuToggle
                          ref={toggleRef}
                          aria-label="Card actions"
                          variant="plain"
                          onClick={() => setMenuOpen((o) => !o)}
                          isExpanded={isMenuOpen}
                          icon={<EllipsisVIcon />}
                        />
                      )}
                      shouldFocusToggleOnSelect
                    >
                      <DropdownList>
                        <DropdownItem value={0} key="action">Action</DropdownItem>
                        <DropdownItem value={1} isDisabled key="disabled">
                          Disabled action
                        </DropdownItem>
                        <Divider component="li" key="sep" />
                        <DropdownItem value={2} key="separated">Separated action</DropdownItem>
                      </DropdownList>
                    </Dropdown>
                  }
                />
              </DemoFrame>
              <CodeBlock>{`<MultiContentCard
  isExpandable
  toggleText="Card with actions toggle text"
  cards={cards}
  actions={
    <Dropdown
      isOpen={isMenuOpen}
      onOpenChange={setMenuOpen}
      toggle={(ref) => (
        <MenuToggle ref={ref} aria-label="Card actions" variant="plain"
          onClick={() => setMenuOpen(o => !o)} isExpanded={isMenuOpen} icon={<EllipsisVIcon />} />
      )}
    >
      <DropdownList>
        <DropdownItem>Action</DropdownItem>
        <DropdownItem isDisabled>Disabled action</DropdownItem>
        <Divider component="li" />
        <DropdownItem>Separated action</DropdownItem>
      </DropdownList>
    </Dropdown>
  }
/>`}</CodeBlock>
            </div>
          </DocCard>
        </Section>

        <Section
          title="Expandable"
          description="`isExpandable` adds a toggle that reveals the `toggleContent` slot. Use it to keep secondary detail collapsed by default."
        >
          <DocCard>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <MultiContentCard
                  isExpandable
                  toggleText="Show details"
                  toggleContent={
                    <div style={{ padding: 16, color: "var(--gp-color-text-subtle)" }}>
                      Detailed breakdown lives here. Replace with a chart, a
                      table, or whatever the user opens to see.
                    </div>
                  }
                  cards={[
                    tile("CPU", "62%"),
                    tile("Memory", "41%"),
                    tile("Disk", "78%"),
                  ]}
                />
              </DemoFrame>
            </div>
          </DocCard>
        </Section>

        <Section title="Most-used props">
          <DocCard>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "cards", type: "(ReactElement | { content: ReactElement; dividerVariant?: 'left' | 'right' })[]", description: "The child cards. Wrap an entry in `{ content, dividerVariant }` to add a single-side divider." },
                  { name: "withDividers", type: "boolean", description: "Add a vertical rule between every child card." },
                  { name: "isExpandable", type: "boolean", description: "Render an expand toggle that reveals the `toggleContent` slot." },
                  { name: "defaultExpanded", type: "boolean", description: "Open the expandable section by default." },
                  { name: "toggleText", type: "ReactNode", description: "Label for the expand toggle." },
                  { name: "toggleContent", type: "ReactElement", description: "Content rendered inside the expandable section." },
                  { name: "actions", type: "ReactElement", description: "Actions row rendered alongside the toggle (kebab menu, primary button)." },
                  { name: "isToggleRightAligned", type: "boolean", description: "Pin the toggle to the trailing edge instead of the leading edge." },
                  { name: "ouiaId", type: "string | number", description: "Stable test selector." },
                ]}
              />
            </div>
          </DocCard>
        </Section>
      </FoundationPage>
    );
  },
};
