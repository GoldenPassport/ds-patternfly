/**
 * ActionList — a spacing/layout primitive for groups of action buttons.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import {
  ActionList,
  ActionListGroup,
  ActionListItem,
  Button,
  ButtonVariant,
  Tooltip,
} from "../_lib.js";
import OutlinedCopyIcon from "@patternfly/react-icons/dist/esm/icons/outlined-copy-icon";
import OutlinedPlusSquareIcon from "@patternfly/react-icons/dist/esm/icons/outlined-plus-square-icon";
import OutlinedQuestionCircleIcon from "@patternfly/react-icons/dist/esm/icons/outlined-question-circle-icon";
import PlayIcon from "@patternfly/react-icons/dist/esm/icons/play-icon";

// #region Basic
export function Basic() {
  return (
    <ActionList>
      <ActionListItem>
        <Button variant={ButtonVariant.primary}>Save</Button>
      </ActionListItem>
      <ActionListItem>
        <Button variant={ButtonVariant.secondary}>Cancel</Button>
      </ActionListItem>
    </ActionList>
  );
}
// #endregion

// #region Grouped
export function Grouped() {
  return (
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
  );
}
// #endregion

// #region VerticalIconList
export function VerticalIconList() {
  return (
    <div
      style={{
        display: "inline-block",
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
  );
}
// #endregion

export default function ActionListExample() {
  return (
    <div style={{ display: "grid", gap: 24, justifyItems: "start" }}>
      <Basic />
      <Grouped />
      <VerticalIconList />
    </div>
  );
}
