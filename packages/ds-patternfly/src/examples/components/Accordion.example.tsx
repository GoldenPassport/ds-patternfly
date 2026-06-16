/**
 * Accordion — vertically stacked, expandable sections.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionToggle,
} from "@golden-passport/ds-patternfly";

// #region SingleExpand
export function SingleExpand() {
  const [expanded, setExpanded] = useState<string>("single-2");
  const toggle = (id: string) => setExpanded(id === expanded ? "" : id);

  return (
    <Accordion asDefinitionList={false}>
      {[
        { id: "single-1", title: "What is a workflow?", body: "A workflow is a sequence of steps run on a trigger." },
        { id: "single-2", title: "How are steps retried?", body: "Failed steps retry with exponential back-off up to the configured limit." },
        { id: "single-3", title: "Can I pause a run?", body: "Yes — pause from the run detail screen, resume any time." },
      ].map((it) => (
        <AccordionItem key={it.id} isExpanded={expanded === it.id}>
          <AccordionToggle onClick={() => toggle(it.id)} id={it.id}>
            {it.title}
          </AccordionToggle>
          <AccordionContent id={`${it.id}-content`}>
            <p>{it.body}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
// #endregion

// #region MultipleExpand
export function MultipleExpand() {
  const [expanded, setExpanded] = useState<string[]>(["multi-2"]);
  const toggle = (id: string) =>
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );

  return (
    <Accordion asDefinitionList={false}>
      {[
        { id: "multi-1", title: "Connection settings", body: "Host, port, credentials, TLS." },
        { id: "multi-2", title: "Retry policy", body: "Max attempts, back-off strategy, jitter." },
        { id: "multi-3", title: "Notifications", body: "Channels and per-event triggers." },
      ].map((it) => (
        <AccordionItem key={it.id} isExpanded={expanded.includes(it.id)}>
          <AccordionToggle onClick={() => toggle(it.id)} id={it.id}>
            {it.title}
          </AccordionToggle>
          <AccordionContent id={`${it.id}-content`}>
            <p>{it.body}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
// #endregion

// #region Bordered
export function Bordered() {
  const [expanded, setExpanded] = useState<string>("b-1");
  const toggle = (id: string) => setExpanded(id === expanded ? "" : id);

  return (
    <Accordion asDefinitionList={false} isBordered>
      {[
        { id: "b-1", title: "Item one", body: "Bordered card-style accordion." },
        { id: "b-2", title: "Item two", body: "Each item gets its own outline." },
        { id: "b-3", title: "Item three", body: "Useful when the accordion is standalone." },
      ].map((it) => (
        <AccordionItem key={it.id} isExpanded={expanded === it.id}>
          <AccordionToggle onClick={() => toggle(it.id)} id={it.id}>
            {it.title}
          </AccordionToggle>
          <AccordionContent id={`${it.id}-content`}>
            <p>{it.body}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
// #endregion

// #region DefinitionList
export function DefinitionList() {
  const [expanded, setExpanded] = useState<string>("d-1");
  const toggle = (id: string) => setExpanded(id === expanded ? "" : id);

  return (
    <Accordion asDefinitionList>
      {[
        { id: "d-1", title: "Workflow", body: "A sequence of steps that runs on a trigger." },
        { id: "d-2", title: "Step", body: "A single unit of work in a workflow." },
        { id: "d-3", title: "Trigger", body: "An event that starts a workflow run." },
      ].map((it) => (
        <AccordionItem key={it.id} isExpanded={expanded === it.id}>
          <AccordionToggle onClick={() => toggle(it.id)} id={it.id}>
            {it.title}
          </AccordionToggle>
          <AccordionContent id={`${it.id}-content`}>
            <p>{it.body}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
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
