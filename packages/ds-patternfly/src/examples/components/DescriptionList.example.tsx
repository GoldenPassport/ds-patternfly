/**
 * DescriptionList — term / definition pairs, the canonical "key facts"
 * renderer for detail screens and settings panels.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import {
  Button,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Popover,
} from "@golden-passport/ds-patternfly";
import { OutlinedQuestionCircleIcon, ServerIcon } from "@patternfly/react-icons";

// Shared set of term/description pairs the layout demos reuse.
const Facts = () => (
  <>
    <DescriptionListGroup>
      <DescriptionListTerm>Name</DescriptionListTerm>
      <DescriptionListDescription>onboarding-flow</DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTerm>Workspace</DescriptionListTerm>
      <DescriptionListDescription>
        <a href="#">acme-platform</a>
      </DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTerm>Status</DescriptionListTerm>
      <DescriptionListDescription>Idle · last run 2h ago</DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTerm>Owner</DescriptionListTerm>
      <DescriptionListDescription>
        <Button variant="link" isInline>mary@acme.dev</Button>
      </DescriptionListDescription>
    </DescriptionListGroup>
  </>
);

// #region DefaultVertical
export function DefaultVertical() {
  return (
    <DescriptionList aria-label="Vertical default">
      <Facts />
    </DescriptionList>
  );
}
// #endregion

// #region Horizontal
export function Horizontal() {
  return (
    <DescriptionList isHorizontal aria-label="Horizontal">
      <Facts />
    </DescriptionList>
  );
}
// #endregion

// #region TwoColumn
export function TwoColumn() {
  return (
    <DescriptionList
      isHorizontal
      columnModifier={{ default: "1Col", lg: "2Col" }}
      aria-label="Two-column horizontal"
    >
      <Facts />
      <Facts />
    </DescriptionList>
  );
}
// #endregion

// #region Compact
export function Compact() {
  return (
    <DescriptionList isHorizontal isCompact aria-label="Compact horizontal">
      <Facts />
    </DescriptionList>
  );
}
// #endregion

// #region TermHelpPopover
export function TermHelpPopover() {
  return (
    <DescriptionList isHorizontal aria-label="With help">
      <DescriptionListGroup>
        <DescriptionListTerm>
          <Popover
            headerContent={<div>What is a workspace?</div>}
            bodyContent={
              <div>
                A workspace groups related projects and shares
                credentials, secrets, and team members.
              </div>
            }
          >
            <Button
              variant="plain"
              aria-label="More info on workspace"
              style={{ padding: 0, marginInlineEnd: 4 }}
              icon={<OutlinedQuestionCircleIcon />}
            />
          </Popover>
          Workspace
        </DescriptionListTerm>
        <DescriptionListDescription>acme-platform</DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>Region</DescriptionListTerm>
        <DescriptionListDescription>us-east-1</DescriptionListDescription>
      </DescriptionListGroup>
    </DescriptionList>
  );
}
// #endregion

// #region IconsOnTerms
export function IconsOnTerms() {
  return (
    <DescriptionList isHorizontal aria-label="With icons">
      <DescriptionListGroup>
        <DescriptionListTerm icon={<ServerIcon />}>Cluster</DescriptionListTerm>
        <DescriptionListDescription>prod-east-1</DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm icon={<ServerIcon />}>Region</DescriptionListTerm>
        <DescriptionListDescription>us-east-1</DescriptionListDescription>
      </DescriptionListGroup>
    </DescriptionList>
  );
}
// #endregion

export default function DescriptionListExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <DefaultVertical />
      <Horizontal />
      <TwoColumn />
      <Compact />
      <TermHelpPopover />
      <IconsOnTerms />
    </div>
  );
}
