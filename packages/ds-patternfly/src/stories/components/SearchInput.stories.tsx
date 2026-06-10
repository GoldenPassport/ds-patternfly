import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
  ThemingPointer,
} from "../_kit/StoryKit.js";
import {
  Basic,
  ResultsCount,
} from "../../examples/components/SearchInput.example.js";
import searchInputExampleSrc from "../../examples/components/SearchInput.example.tsx?raw";
import searchInputComponentSrc from "../../components/SearchInput.tsx?raw";

const meta: Meta = {
  title: "Components/Forms/SearchInput",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
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
          <Example
            source={searchInputExampleSrc}
            region="Basic"
            fileName="SearchInput.example.tsx"
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section title="Results count">
        <Card>
          <Example
            source={searchInputExampleSrc}
            region="ResultsCount"
            fileName="SearchInput.example.tsx"
          >
            <ResultsCount />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={searchInputExampleSrc} fileName="SearchInput.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { SearchInput } from "@golden-passport/ds-patternfly";'}
        componentSource={searchInputComponentSrc}
        componentFileName="SearchInput.tsx"
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
  ),
};
