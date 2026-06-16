/**
 * MultiContentCard (@patternfly/react-component-groups) — a card that hosts
 * multiple equally-weighted Card children in a row, optionally separated by
 * dividers and toggled via an expandable footer.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState, type Ref, type ReactNode } from "react";
import MultiContentCard from "@patternfly/react-component-groups/dist/dynamic/MultiContentCard";
import {
  ArrowRightIcon,
  BellIcon,
  CogIcon,
  EllipsisVIcon,
  LockIcon,
} from "@patternfly/react-icons";
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
} from "@golden-passport/ds-patternfly";

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

// #region Basic
export function Basic() {
  return (
    <MultiContentCard
      cards={[
        tile("Active", "12 in flight"),
        tile("Queued", "4 waiting"),
        tile("Failed", "1 needs review"),
      ]}
    />
  );
}
// #endregion

// #region WithDividers
export function WithDividers() {
  return (
    <MultiContentCard
      isExpandable
      withDividers
      toggleText="Card with dividers toggle text"
      cards={dividerCards}
    />
  );
}
// #endregion

// #region WithActions
export function WithActions() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
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
  );
}
// #endregion

// #region Expandable
export function Expandable() {
  return (
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
  );
}
// #endregion

export default function MultiContentCardExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <WithDividers />
      <WithActions />
      <Expandable />
    </div>
  );
}
