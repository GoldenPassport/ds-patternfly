import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchInput } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Components/SearchInput",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [q, setQ] = useState("");
    return (
      <FoundationPage
        title="SearchInput"
        intro={
          <>
            A text input pre-styled for queries — built-in search icon, clear
            button, and submit handling. Reach for SearchInput whenever the
            user is filtering or searching a list, not just typing free-form
            text.
          </>
        }
      >
        <Section title="Basic">
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <SearchInput
                  placeholder="Search projects"
                  value={q}
                  onChange={(_, value) => setQ(value)}
                  onClear={() => setQ("")}
                  aria-label="Search projects"
                />
              </DemoFrame>
              <CodeBlock>{`<SearchInput
  placeholder="Search projects"
  value={query}
  onChange={(_, v) => setQuery(v)}
  onClear={() => setQuery("")}
  aria-label="Search projects"
/>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="Results count">
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                {/* resultsCount must be a string|number, never undefined,
                    when present — so conditionally include the prop. */}
                {q ? (
                  <SearchInput
                    placeholder="Search"
                    value={q}
                    onChange={(_, value) => setQ(value)}
                    onClear={() => setQ("")}
                    resultsCount="1 / 12 results"
                    aria-label="Search with results"
                  />
                ) : (
                  <SearchInput
                    placeholder="Search"
                    value={q}
                    onChange={(_, value) => setQ(value)}
                    onClear={() => setQ("")}
                    aria-label="Search with results"
                  />
                )}
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "value", type: "string", description: "Controlled value." },
                  { name: "onChange", type: "(event, value: string) => void", description: "Fires on every keystroke. Debounce in the consumer if it triggers a network call." },
                  { name: "onClear", type: "(event) => void", description: "Required for the clear button to appear. Reset state to empty string here." },
                  { name: "onSearch", type: "(value, event, attrValueMap) => void", description: "Fires on Enter or when the search button is clicked." },
                  { name: "placeholder", type: "string", description: "Hint text. Doesn't replace aria-label." },
                  { name: "aria-label", type: "string", description: "Required. The visible PF search icon isn't an accessible name." },
                  { name: "resultsCount", type: "ReactNode", description: 'Display the result count next to the input ("12 results" or "1 / 12 results").' },
                  { name: "isAdvancedSearchOpen / advancedSearchOptions", type: "various", description: "Opt-in to PF6's advanced search panel — multi-attribute, expandable. See PF docs for the full surface." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Always provide aria-label.</strong> SearchInput has an icon, no visible label by default — without aria-label it&apos;s nameless to AT.</li>
              <li><strong>Announce result counts via aria-live.</strong> The visible <code>resultsCount</code> isn&apos;t in a live region by default. Wrap it (or render the count in a separate live region) so AT users hear &quot;12 results&quot; when filtering changes.</li>
              <li><strong>Debounce expensive searches.</strong> onChange fires on every keystroke. For server-side queries, debounce 200–300ms to avoid hammering the API.</li>
            </ul>
          </Card>
        </Section>

        <ThemingPointer
          dials={[
            ["--gp-control-pad-y", "Vertical padding — drives field height."],
            ["--gp-radius-control", "Corner radius."],
            ["--gp-border-default", "Resting border colour."],
            ["--gp-focus-ring", "Focus-ring colour."],
          ]}
        />

      </FoundationPage>
    );
  },
};
