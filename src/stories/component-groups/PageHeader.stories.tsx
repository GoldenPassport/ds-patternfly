import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownList,
  Label,
  MenuToggle,
  type MenuToggleElement,
} from "@patternfly/react-core";
import { CubesIcon, EllipsisVIcon } from "@patternfly/react-icons";
import PageHeader from "@patternfly/react-component-groups/dist/dynamic/PageHeader";
import { useState } from "react";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Component groups/Content containers/Page header",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <FoundationPage
        title="Page header"
        intro={
          <>
            A standard top-of-page header — title, subtitle, optional
            breadcrumbs, an action menu, an icon, and a status label slot.
            Use it as the first child of every PageSection so titles
            render consistently across the app. For app-shell chrome
            (logo, nav), use <code>Masthead</code> instead.
          </>
        }
      >
        <Section title="Basic">
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <PageHeader
                  title="Workflows"
                  subtitle="Manage triggers, runs, and history."
                />
              </DemoFrame>
              <CodeBlock>{`<PageHeader title="Workflows" subtitle="Manage triggers, runs, and history." />`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Full chrome"
          description="Breadcrumbs, icon, status label, and an action menu — the standard 'detail page' header."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <PageHeader
                  breadcrumbs={
                    <Breadcrumb>
                      <BreadcrumbItem to="#">Workflows</BreadcrumbItem>
                      <BreadcrumbItem to="#" isActive>
                        Quarterly review
                      </BreadcrumbItem>
                    </Breadcrumb>
                  }
                  icon={<CubesIcon />}
                  title="Quarterly review"
                  label={<Label color="green">Active</Label>}
                  subtitle="Triggered hourly · 4 steps · last run 12 minutes ago"
                  linkProps={{
                    label: "View workflow docs",
                    isExternal: true,
                    component: "a",
                    href: "#",
                  }}
                  actionMenu={
                    <Dropdown
                      isOpen={open}
                      onSelect={() => setOpen(false)}
                      onOpenChange={setOpen}
                      toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                        <MenuToggle
                          ref={toggleRef}
                          aria-label="Workflow actions"
                          variant="plain"
                          onClick={() => setOpen((o) => !o)}
                        >
                          <EllipsisVIcon />
                        </MenuToggle>
                      )}
                    >
                      <DropdownList>
                        <DropdownItem>Run now</DropdownItem>
                        <DropdownItem>Edit</DropdownItem>
                        <DropdownItem>Disable</DropdownItem>
                      </DropdownList>
                    </Dropdown>
                  }
                />
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "title", type: "ReactNode", description: "The h1 of the page. Renders inside an `<h1>` by default." },
                  { name: "subtitle", type: "ReactNode", description: "One-line context under the title — what the page is for." },
                  { name: "breadcrumbs", type: "ReactNode", description: "Slot for a Breadcrumb component above the title." },
                  { name: "icon", type: "ReactNode", description: "Decorative icon next to the title with a visual divider." },
                  { name: "label", type: "ReactNode", description: "Status / state label rendered next to the title (e.g. <Label>Active</Label>)." },
                  { name: "actionMenu", type: "ReactNode", description: "Trailing menu / button — typically a kebab Dropdown or a primary action Button." },
                  { name: "linkProps", type: "{ label, isExternal?, ...ButtonProps }", description: "Optional link below the subtitle (docs, runbook). Pass `component='a'` + `href` for a real anchor." },
                  { name: "headingClassname", type: "string", description: "Custom class on the inner `<h1>` — useful for app-specific typography overrides." },
                  { name: "ouiaId", type: "string | number", description: "Stable test selector." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>One <code>title</code> per page.</strong> PageHeader renders an h1 — don&rsquo;t render another in the same view.</li>
              <li><strong>Action menus need an aria-label.</strong> Pass it through to the `MenuToggle` inside <code>actionMenu</code> so screen readers announce what the kebab opens.</li>
              <li><strong>Decorative icons are aria-hidden.</strong> Don&rsquo;t rely on the <code>icon</code> slot for meaning — use a <code>label</code> if you need to communicate state.</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
