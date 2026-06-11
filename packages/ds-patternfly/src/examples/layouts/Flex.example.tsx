/**
 * Flex — general-purpose flex container with a token-aware API: spacing,
 * direction, alignment, and justification are all set per breakpoint.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Flex, FlexItem } from "../_lib.js";

// Shaded placeholder block so the layout regions are visible in the demo.
// In a real app these are your buttons / labels / panels.
function Box({ label }: { label: string }) {
  return (
    <div
      style={{
        background: "var(--gp-color-brand-default)",
        color: "var(--gp-color-brand-on)",
        padding: "12px 16px",
        borderRadius: "var(--gp-radius-sm)",
        fontSize: 14,
        textAlign: "center",
      }}
    >
      {label}
    </div>
  );
}

// #region BasicRow
export function BasicRow() {
  return (
    <Flex spaceItems={{ default: "spaceItemsMd" }}>
      <FlexItem><Box label="A" /></FlexItem>
      <FlexItem><Box label="B" /></FlexItem>
      <FlexItem><Box label="C" /></FlexItem>
    </Flex>
  );
}
// #endregion

// #region PushingItemsApart
export function PushingItemsApart() {
  return (
    <Flex
      justifyContent={{ default: "justifyContentSpaceBetween" }}
      alignItems={{ default: "alignItemsCenter" }}
    >
      <FlexItem><Box label="left" /></FlexItem>
      <FlexItem><Box label="center" /></FlexItem>
      <FlexItem><Box label="right" /></FlexItem>
    </Flex>
  );
}
// #endregion

// #region ColumnDirection
export function ColumnDirection() {
  return (
    <Flex
      direction={{ default: "column" }}
      spaceItems={{ default: "spaceItemsSm" }}
    >
      <FlexItem><Box label="top" /></FlexItem>
      <FlexItem><Box label="middle" /></FlexItem>
      <FlexItem><Box label="bottom" /></FlexItem>
    </Flex>
  );
}
// #endregion

// #region FillingRemainingSpace
export function FillingRemainingSpace() {
  return (
    <Flex spaceItems={{ default: "spaceItemsMd" }}>
      <FlexItem><Box label="fixed" /></FlexItem>
      <FlexItem grow={{ default: "grow" }}>
        <Box label="grows to fill" />
      </FlexItem>
      <FlexItem><Box label="fixed" /></FlexItem>
    </Flex>
  );
}
// #endregion

export default function FlexExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <BasicRow />
      <PushingItemsApart />
      <ColumnDirection />
      <FillingRemainingSpace />
    </div>
  );
}
