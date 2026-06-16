/**
 * JumpLinks — in-page anchors that scroll to specific sections, a table
 * of contents for long pages, with scroll-spy active tracking.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId } from "react";
import { JumpLinks, JumpLinksItem, JumpLinksList } from "@golden-passport/ds-patternfly";

// #region HorizontalBasic
export function HorizontalBasic() {
  return (
    <JumpLinks aria-label="Jump to section">
      <JumpLinksItem href="#a">Overview</JumpLinksItem>
      <JumpLinksItem href="#b" isActive>
        Specs
      </JumpLinksItem>
      <JumpLinksItem href="#c">Reviews</JumpLinksItem>
      <JumpLinksItem href="#d">FAQ</JumpLinksItem>
    </JumpLinks>
  );
}
// #endregion

// #region VerticalScrollSpy
export function VerticalScrollSpy() {
  const id = useId();
  const scrollId = `${id}-scroll`;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        gap: 16,
        height: "100%",
      }}
    >
      <JumpLinks
        isVertical
        label="Sections"
        // attribute selector — useId values contain ":" which breaks #id
        // selectors, but [id="…"] matches them fine
        scrollableSelector={`[id="${scrollId}"]`}
      >
        <JumpLinksItem href={`#${id}-sec-1`}>General</JumpLinksItem>
        <JumpLinksItem href={`#${id}-sec-2`}>Notifications</JumpLinksItem>
        <JumpLinksItem href={`#${id}-sec-3`}>Integrations</JumpLinksItem>
        <JumpLinksItem href={`#${id}-sec-4`}>Billing</JumpLinksItem>
      </JumpLinks>
      <div
        id={scrollId}
        style={{
          overflowY: "auto",
          padding: 16,
          color: "var(--gp-color-text-regular)",
        }}
      >
        {[
          { id: `${id}-sec-1`, title: "General" },
          { id: `${id}-sec-2`, title: "Notifications" },
          { id: `${id}-sec-3`, title: "Integrations" },
          { id: `${id}-sec-4`, title: "Billing" },
        ].map((s) => (
          <section key={s.id} id={s.id} style={{ marginBottom: 24 }}>
            <h3 style={{ marginTop: 0 }}>{s.title}</h3>
            <p style={{ color: "var(--gp-color-text-subtle)" }}>
              Section content — scroll to update the active jump link on the
              left.
            </p>
            <div style={{ height: 120 }} />
          </section>
        ))}
      </div>
    </div>
  );
}
// #endregion

// #region VerticalSubSections
export function VerticalSubSections() {
  return (
    <JumpLinks
      isVertical
      label="With subsections"
      expandable={{ default: "expandable", md: "nonExpandable" }}
    >
      <JumpLinksItem href="#x1">Inactive section</JumpLinksItem>
      <JumpLinksItem href="#x2">
        Section with active sub-section
        <JumpLinksList aria-label="Sub-sections">
          <JumpLinksItem href="#x2a" isActive>
            Active sub-section
          </JumpLinksItem>
          <JumpLinksItem href="#x2b">Sub-section</JumpLinksItem>
          <JumpLinksItem href="#x2c">Sub-section</JumpLinksItem>
        </JumpLinksList>
      </JumpLinksItem>
      <JumpLinksItem href="#x3">Inactive section</JumpLinksItem>
    </JumpLinks>
  );
}
// #endregion

// #region Centered
export function Centered() {
  return (
    <JumpLinks isCentered aria-label="Jump to centred section">
      <JumpLinksItem href="#c1">Inactive</JumpLinksItem>
      <JumpLinksItem href="#c2" isActive>
        Active
      </JumpLinksItem>
      <JumpLinksItem href="#c3">Inactive</JumpLinksItem>
    </JumpLinks>
  );
}
// #endregion

export default function JumpLinksExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <HorizontalBasic />
      <div style={{ height: 320 }}>
        <VerticalScrollSpy />
      </div>
      <VerticalSubSections />
      <Centered />
    </div>
  );
}
