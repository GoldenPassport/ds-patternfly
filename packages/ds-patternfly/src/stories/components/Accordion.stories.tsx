import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionToggle,
} from "@golden-passport/ds-patternfly";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Components/Accordion",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    // Single-expand
    const [single, setSingle] = useState<string>("single-2");
    const onSingle = (id: string) => setSingle(id === single ? "" : id);

    // Multiple-expand
    const [multi, setMulti] = useState<string[]>(["multi-2"]);
    const onMulti = (id: string) =>
      setMulti((prev) =>
        prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
      );

    // Bordered single-expand
    const [bordered, setBordered] = useState<string>("b-1");
    const onBordered = (id: string) =>
      setBordered(id === bordered ? "" : id);

    // Definition list
    const [defl, setDefl] = useState<string>("d-1");
    const onDefl = (id: string) => setDefl(id === defl ? "" : id);

    return (
      <FoundationPage
        title="Accordion"
        intro={
          <>
            Vertically stacked, expandable sections. Use for FAQs, settings
            groups, and any list where each row can carry a body of detail
            the user opens on demand. Pick <strong>single-expand</strong>{" "}
            when sections are mutually exclusive (only one open at a time);
            pick <strong>multiple-expand</strong> when users want to compare
            sections side-by-side.
          </>
        }
      >
        <Section
          title="Single-expand"
          description="Track one expanded id; opening another collapses the previous. The most common shape — keeps the page short and focuses attention."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Accordion asDefinitionList={false}>
                  {[
                    { id: "single-1", title: "What is a workflow?", body: "A workflow is a sequence of steps run on a trigger." },
                    { id: "single-2", title: "How are steps retried?", body: "Failed steps retry with exponential back-off up to the configured limit." },
                    { id: "single-3", title: "Can I pause a run?", body: "Yes — pause from the run detail screen, resume any time." },
                  ].map((it) => (
                    <AccordionItem key={it.id} isExpanded={single === it.id}>
                      <AccordionToggle onClick={() => onSingle(it.id)} id={it.id}>
                        {it.title}
                      </AccordionToggle>
                      <AccordionContent id={`${it.id}-content`}>
                        <p>{it.body}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </DemoFrame>
              <CodeBlock>{`const [expanded, setExpanded] = useState("single-1");
const toggle = (id) => setExpanded(id === expanded ? "" : id);

<Accordion asDefinitionList={false}>
  {items.map(it => (
    <AccordionItem key={it.id} isExpanded={expanded === it.id}>
      <AccordionToggle onClick={() => toggle(it.id)} id={it.id}>
        {it.title}
      </AccordionToggle>
      <AccordionContent id={\`\${it.id}-content\`}>
        <p>{it.body}</p>
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Multiple-expand"
          description="Track an array of expanded ids — toggle adds / removes from the list. Use when users may want to compare sections, or when each section is independent."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Accordion asDefinitionList={false}>
                  {[
                    { id: "multi-1", title: "Connection settings", body: "Host, port, credentials, TLS." },
                    { id: "multi-2", title: "Retry policy", body: "Max attempts, back-off strategy, jitter." },
                    { id: "multi-3", title: "Notifications", body: "Channels and per-event triggers." },
                  ].map((it) => (
                    <AccordionItem key={it.id} isExpanded={multi.includes(it.id)}>
                      <AccordionToggle onClick={() => onMulti(it.id)} id={it.id}>
                        {it.title}
                      </AccordionToggle>
                      <AccordionContent id={`${it.id}-content`}>
                        <p>{it.body}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Bordered (cards-style)"
          description="isBordered draws an outer border and divides each item — looks like a stack of mini-cards. Good when the accordion is the only content on a section and needs its own visual container."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Accordion asDefinitionList={false} isBordered>
                  {[
                    { id: "b-1", title: "Item one", body: "Bordered card-style accordion." },
                    { id: "b-2", title: "Item two", body: "Each item gets its own outline." },
                    { id: "b-3", title: "Item three", body: "Useful when the accordion is standalone." },
                  ].map((it) => (
                    <AccordionItem key={it.id} isExpanded={bordered === it.id}>
                      <AccordionToggle onClick={() => onBordered(it.id)} id={it.id}>
                        {it.title}
                      </AccordionToggle>
                      <AccordionContent id={`${it.id}-content`}>
                        <p>{it.body}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Definition list semantics"
          description="asDefinitionList (default true) renders the accordion as <dl>/<dt>/<dd>. Use this for term/definition content (glossary, FAQ where toggle = term and content = definition). Pass false for general accordions where the toggle is an action label rather than a term."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Accordion asDefinitionList>
                  {[
                    { id: "d-1", title: "Workflow", body: "A sequence of steps that runs on a trigger." },
                    { id: "d-2", title: "Step", body: "A single unit of work in a workflow." },
                    { id: "d-3", title: "Trigger", body: "An event that starts a workflow run." },
                  ].map((it) => (
                    <AccordionItem key={it.id} isExpanded={defl === it.id}>
                      <AccordionToggle onClick={() => onDefl(it.id)} id={it.id}>
                        {it.title}
                      </AccordionToggle>
                      <AccordionContent id={`${it.id}-content`}>
                        <p>{it.body}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section title="Composition">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "Accordion", type: "container", description: "Outer wrapper. Owns asDefinitionList, isBordered, displaySize, headingLevel." },
                  { name: "AccordionItem", type: "child", description: "A single section. isExpanded controls visibility." },
                  { name: "AccordionToggle", type: "child", description: "The clickable header. id is required (paired with the content's aria-labelledby)." },
                  { name: "AccordionContent", type: "child", description: "The collapsible body. id is required for screen-reader association. isFixed locks the body to a max-height with internal scroll." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Most-used Accordion props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "asDefinitionList", type: "boolean", description: "Default true. Renders as <dl>/<dt>/<dd> for term/definition semantics. Set false for general action-style accordions." },
                  { name: "isBordered", type: "boolean", description: "Outer border + per-item dividers — accordion as a card stack." },
                  { name: "displaySize", type: '"default" | "lg"', description: "Toggle text size. lg for hero / settings-page accordions; default for content accordions." },
                  { name: "headingLevel", type: '"h1" | ... | "h6"', description: "HTML heading level for the toggles. Match the page outline." },
                  { name: "togglePosition", type: '"start" | "end"', description: "Caret position. Default 'end' (right of the title); 'start' for tree-style left-caret accordions." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Accordion vs ExpandableSection">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Accordion</strong> — multiple stacked sections that share a single expand/collapse pattern. Use for FAQs, settings groups, lists where each row has a body.</li>
              <li><strong>ExpandableSection</strong> — a single collapsible block. Use for &ldquo;Show more&rdquo;-style progressive disclosure within otherwise-flat content.</li>
              <li><strong>Don&rsquo;t nest accordions.</strong> Two levels of expand/collapse is hard to navigate. Use a TreeView or Drawer instead.</li>
            </ul>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Each toggle needs an id</strong> and the matching content needs an id — PF6 wires aria-labelledby + aria-controls between them.</li>
              <li><strong>Keep toggles short.</strong> Long titles wrap awkwardly and announce as one giant string.</li>
              <li><strong>Don&rsquo;t collapse error-state items by default.</strong> If a section contains an unresolved error, expand it on mount so the user sees the issue.</li>
            </ul>
          </Card>
        </Section>
        <ThemingPointer
          dials={[
            ["--gp-border-subtle", "Row dividers between items."],
            ["--gp-text-default", "Toggle text colour."],
            ["--gp-motion-duration", "Expand / collapse duration."],
            ["--gp-focus-ring", "Toggle focus-ring colour."],
          ]}
        />
      </FoundationPage>
    );
  },
};
