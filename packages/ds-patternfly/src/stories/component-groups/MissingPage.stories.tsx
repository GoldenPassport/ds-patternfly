import type { Meta, StoryObj } from "@storybook/react-vite";
import { MissingPage } from "@patternfly/react-component-groups/dist/dynamic/MissingPage";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Component groups/Error communication/Missing page",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Missing page"
      intro={
        <>
          A standard 404 page — title, body, and a link back home. Wire
          this up as the catch-all route in your router.
        </>
      }
    >
      <Section title="Default">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <MissingPage
                titleText="Page not found"
                bodyText="The page you're looking for doesn't exist or has moved."
                toHomePageUrl="/"
                toHomePageText="Go home"
              />
            </DemoFrame>
            <CodeBlock>{`<Route path="*" element={
  <MissingPage
    toHomePageUrl="/"
    toHomePageText="Go home"
  />
} />`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "titleText", type: "ReactNode", description: "Headline (default 'This page is lost in space')." },
                { name: "bodyText", type: "ReactNode", description: "Description below the title." },
                { name: "toHomePageUrl", type: "string", description: "Destination of the home link. Default `/`." },
                { name: "toHomePageText", type: "ReactNode", description: "Label of the home link." },
                { name: "ouiaId", type: "string | number", description: "Stable test selector." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Set the HTTP 404 status</strong> on the server when this page renders so search engines and screen-reader users&rsquo; tooling can identify it as a real not-found.</li>
            <li><strong>Provide one clear next step.</strong> Going home is the safe default — don&rsquo;t bury the link in a wall of suggestions.</li>
            <li><strong>Render inside your normal app shell</strong> (Masthead + Nav). Stripping chrome makes 404s feel disorienting and can hide site-wide navigation.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
