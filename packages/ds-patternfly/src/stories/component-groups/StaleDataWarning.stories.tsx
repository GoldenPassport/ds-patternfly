import type { Meta, StoryObj } from "@storybook/react-vite";
import StaleDataWarning from "@patternfly/react-component-groups/dist/dynamic/StaleDataWarning";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Component groups/Status and state indicators/Stale data warning",
  parameters: { layout: "padded" },
};
export default meta;

const now = new Date("2026-05-10T09:00:00Z");
const staleWarning = new Date("2026-05-09T00:00:00Z"); // 1 day before warning
const stale         = new Date("2026-05-08T00:00:00Z"); // marked stale 2 days ago
const culled        = new Date("2026-05-15T00:00:00Z"); // will be deleted in 5 days

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Stale data warning"
      intro={
        <>
          A tooltip-icon for objects that are nearing or past a freshness
          threshold — old check-in data, abandoned workflows,
          unupdated host inventory. Use it next to row titles in
          inventory tables so users see freshness at a glance.
        </>
      }
    >
      <Section
        title="Default"
        description="Pass the four dates: when the object was last touched (`stale`), the warning threshold, the cull (deletion) date, and `currDate`. The component picks the right state and message."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--gp-color-text-regular)",
                }}
              >
                <span><strong>worker-23</strong></span>
                <StaleDataWarning
                  stale={stale}
                  staleWarning={staleWarning}
                  culled={culled}
                  currDate={now}
                />
                <span style={{ color: "var(--gp-color-text-subtle)" }}>
                  · last check-in 2 days ago
                </span>
              </div>
            </DemoFrame>
            <CodeBlock>{`<StaleDataWarning
  stale={lastCheckIn}
  staleWarning={warningThreshold}
  culled={cullDate}
  currDate={new Date()}
/>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "stale", type: "Date | string | number", description: "When the data was last considered fresh — typically the object's last update timestamp." },
                { name: "staleWarning", type: "Date | string | number", description: "Threshold past which the object is 'about to go stale' — drives the warning state." },
                { name: "culled", type: "Date | string | number", description: "When the object will be deleted / archived." },
                { name: "currDate", type: "Date | string | number", description: "Current time — pass `new Date()` from the consumer so the component can render at the right state." },
                { name: "message", type: "string", description: "Override the default tooltip message." },
                { name: "render", type: "({ msg }) => ReactElement | null", description: "Render-prop for full custom rendering — return your own icon + tooltip composition." },
                { name: "aria-label", type: "string", description: "Accessible name for the icon." },
              ]}
            />
            <p style={{ marginTop: 16, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
              Inherits the rest of <code>TooltipProps</code> for positioning,
              entry / exit delay, etc.
            </p>
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Set <code>aria-label</code></strong> — &ldquo;Stale data: last updated 5 days ago&rdquo; — so screen-reader users get the same warning as sighted users.</li>
            <li><strong>Don&rsquo;t rely on the icon alone.</strong> In a row of 200 hosts, an icon-only signal is hard to scan; pair with a date column showing the freshness.</li>
            <li><strong>Keep <code>currDate</code> stable per render.</strong> Re-creating a Date inside <code>render</code> every frame causes flicker — memoize it at the page level.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
