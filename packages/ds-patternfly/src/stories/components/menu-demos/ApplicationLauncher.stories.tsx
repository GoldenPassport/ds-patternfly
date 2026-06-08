import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownList,
  Divider,
  MenuToggle,
} from "@patternfly/react-core";
import {
  ChartBarIcon,
  CodeBranchIcon,
  CogIcon,
  CubesIcon,
  RocketIcon,
  ServerIcon,
  TableIcon,
  ThIcon,
  UsersIcon,
} from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../../../components/StoryKit.js";
import { DemoFrame } from "../../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/Menu/Application launcher",
  parameters: { layout: "padded" },
};
export default meta;

export const Demo: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <FoundationPage
        title="Application launcher"
        intro={
          <>
            A grid-style menu of applications — the typical &ldquo;9-dot&rdquo;
            launcher in a masthead. PF6 ships this as a Dropdown composition:
            a kebab/dot trigger + a DropdownGroup of icon items. Use to give
            users a quick switcher between sibling apps in a suite.
          </>
        }
      >
        <Section
          title="Demo"
          description="Built on Dropdown + DropdownGroup + DropdownItem with leading icons. Layout: two columns of icon-and-label apps, optionally split into a 'core' group + a 'tools' group."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Dropdown
                  isOpen={open}
                  onSelect={() => setOpen(false)}
                  onOpenChange={setOpen}
                  popperProps={{ position: "right" }}
                  toggle={(toggleRef) => (
                    <MenuToggle
                      ref={toggleRef}
                      aria-label="Application launcher"
                      variant="plain"
                      onClick={() => setOpen((o) => !o)}
                      isExpanded={open}
                      icon={<ThIcon />}
                    />
                  )}
                >
                  <DropdownGroup label="Core">
                    <DropdownList>
                      <DropdownItem icon={<RocketIcon />}>Workflows</DropdownItem>
                      <DropdownItem icon={<CodeBranchIcon />}>Pipelines</DropdownItem>
                      <DropdownItem icon={<TableIcon />}>Datasets</DropdownItem>
                      <DropdownItem icon={<ChartBarIcon />}>Insights</DropdownItem>
                    </DropdownList>
                  </DropdownGroup>
                  <Divider />
                  <DropdownGroup label="Admin">
                    <DropdownList>
                      <DropdownItem icon={<ServerIcon />}>Environments</DropdownItem>
                      <DropdownItem icon={<UsersIcon />}>Members</DropdownItem>
                      <DropdownItem icon={<CubesIcon />}>Resources</DropdownItem>
                      <DropdownItem icon={<CogIcon />}>Settings</DropdownItem>
                    </DropdownList>
                  </DropdownGroup>
                </Dropdown>
              </DemoFrame>
              <CodeBlock>{`<Dropdown
  isOpen={open}
  onSelect={() => setOpen(false)}
  onOpenChange={setOpen}
  popperProps={{ position: "right" }}
  toggle={(toggleRef) => (
    <MenuToggle
      ref={toggleRef}
      aria-label="Application launcher"
      variant="plain"
      onClick={() => setOpen(o => !o)}
      isExpanded={open}
      icon={<ThIcon />}
    />
  )}
>
  <DropdownGroup label="Core">
    <DropdownList>
      <DropdownItem icon={<RocketIcon />}>Workflows</DropdownItem>
      <DropdownItem icon={<CodeBranchIcon />}>Pipelines</DropdownItem>
      <DropdownItem icon={<TableIcon />}>Datasets</DropdownItem>
      <DropdownItem icon={<ChartBarIcon />}>Insights</DropdownItem>
    </DropdownList>
  </DropdownGroup>
  <Divider />
  <DropdownGroup label="Admin">
    {/* ...Admin items... */}
  </DropdownGroup>
</Dropdown>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="Pattern">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Trigger</strong> — plain icon-only MenuToggle in the masthead, top-right. <code>ThIcon</code> (9-dot grid) is the canonical icon.</li>
              <li><strong>Layout</strong> — Dropdown menu, opened to the right (popperProps.position=&quot;right&quot;) so it doesn&rsquo;t overflow the masthead.</li>
              <li><strong>Grouping</strong> — Core apps first; admin / settings apps below a divider. Keep groups short (≤ 6 each); promote frequently-used items.</li>
              <li><strong>Each item</strong> — leading product icon + name. Use the same icon family across the suite so users learn them.</li>
              <li><strong>Wiring</strong> — items navigate to other apps in the suite (typically full-page). When using a router, use href + onClick that calls router.push.</li>
            </ul>
          </Card>
        </Section>

        <Section title="When to use">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Suite of related apps</strong> — when the user is likely to switch between sibling apps (Workflows ↔ Pipelines ↔ Insights).</li>
              <li><strong>Single-app shells</strong> — skip it. The launcher is overhead if there&rsquo;s nothing to switch to.</li>
              <li><strong>For workspace switching</strong> — use Context selector (next page).</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
