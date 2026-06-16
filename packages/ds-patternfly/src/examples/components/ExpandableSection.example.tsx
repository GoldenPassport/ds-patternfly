/**
 * ExpandableSection — a single "Show more" block: a collapsible region
 * with a labelled toggle for progressive disclosure.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import {
  ExpandableSection,
  ExpandableSectionToggle,
  ExpandableSectionVariant,
} from "@golden-passport/ds-patternfly";

// #region Basic
export function Basic() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <ExpandableSection
      toggleText={isExpanded ? "Show less" : "Show more"}
      isExpanded={isExpanded}
      onToggle={(_e, expanded) => setIsExpanded(expanded)}
    >
      Hidden content reveals when expanded. Use for advanced
      options, optional context, or extra detail that doesn&rsquo;t
      need to be visible by default.
    </ExpandableSection>
  );
}
// #endregion

// #region DetachedToggle
export function DetachedToggle() {
  const id = useId();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div style={{ padding: 12, border: "1px solid var(--gp-color-border-subtle)", borderRadius: "var(--gp-radius-sm)" }}>
        <ExpandableSectionToggle
          toggleId={`${id}-detached-toggle`}
          contentId={`${id}-detached-content`}
          isExpanded={isExpanded}
          onToggle={setIsExpanded}
        >
          {isExpanded ? "Hide details" : "Show details"}
        </ExpandableSectionToggle>
      </div>
      <div style={{ marginTop: 8, padding: 12, background: "var(--gp-color-bg-secondary-default)" }}>
        <ExpandableSection
          isDetached
          toggleId={`${id}-detached-toggle`}
          contentId={`${id}-detached-content`}
          isExpanded={isExpanded}
        >
          The content can sit anywhere in the DOM. Pair via
          matching toggleId + contentId so screen readers
          associate them.
        </ExpandableSection>
      </div>
    </>
  );
}
// #endregion

// #region Truncate
export function Truncate() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <ExpandableSection
      variant={ExpandableSectionVariant.truncate}
      isExpanded={isExpanded}
      onToggle={(_e, expanded) => setIsExpanded(expanded)}
      truncateMaxLines={2}
      toggleText={isExpanded ? "Show less" : "Show more"}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit
      esse cillum dolore eu fugiat nulla pariatur.
    </ExpandableSection>
  );
}
// #endregion

export default function ExpandableSectionExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <DetachedToggle />
      <Truncate />
    </div>
  );
}
