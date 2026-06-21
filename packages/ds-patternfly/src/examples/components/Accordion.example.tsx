/**
 * Accordion — vertically stacked, expandable sections. The exported
 * AccordionPanel owns the expand/collapse state, the toggle logic
 * (single- or multiple-open), and the item wiring; you pass an `items` array.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { AccordionPanel, type AccordionPanelItem } from "@golden-passport/ds-patternfly";

// #region SingleExpand
export function SingleExpand() {
  const items: AccordionPanelItem[] = [
    { id: "single-1", title: "What is a workflow?", content: <p>A workflow is a sequence of steps run on a trigger.</p> },
    { id: "single-2", title: "How are steps retried?", content: <p>Failed steps retry with exponential back-off up to the configured limit.</p> },
    { id: "single-3", title: "Can I pause a run?", content: <p>Yes — pause from the run detail screen, resume any time.</p> },
  ];
  return <AccordionPanel items={items} defaultExpanded="single-2" />;
}
// #endregion

// #region MultipleExpand
export function MultipleExpand() {
  const items: AccordionPanelItem[] = [
    { id: "multi-1", title: "Connection settings", content: <p>Host, port, credentials, TLS.</p> },
    { id: "multi-2", title: "Retry policy", content: <p>Max attempts, back-off strategy, jitter.</p> },
    { id: "multi-3", title: "Notifications", content: <p>Channels and per-event triggers.</p> },
  ];
  return <AccordionPanel items={items} multiple defaultExpanded={["multi-2"]} />;
}
// #endregion

// #region Bordered
export function Bordered() {
  const items: AccordionPanelItem[] = [
    { id: "b-1", title: "Item one", content: <p>Bordered card-style accordion.</p> },
    { id: "b-2", title: "Item two", content: <p>Each item gets its own outline.</p> },
    { id: "b-3", title: "Item three", content: <p>Useful when the accordion is standalone.</p> },
  ];
  return <AccordionPanel items={items} isBordered defaultExpanded="b-1" />;
}
// #endregion

// #region DefinitionList
export function DefinitionList() {
  const items: AccordionPanelItem[] = [
    { id: "d-1", title: "Workflow", content: <p>A sequence of steps that runs on a trigger.</p> },
    { id: "d-2", title: "Step", content: <p>A single unit of work in a workflow.</p> },
    { id: "d-3", title: "Trigger", content: <p>An event that starts a workflow run.</p> },
  ];
  return <AccordionPanel items={items} asDefinitionList defaultExpanded="d-1" />;
}
// #endregion

export default function AccordionExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <SingleExpand />
      <MultipleExpand />
      <Bordered />
      <DefinitionList />
    </div>
  );
}
