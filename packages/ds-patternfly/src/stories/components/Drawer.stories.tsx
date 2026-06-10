import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  Example,
  ThemingPointer,
} from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  Basic,
  Inline,
  Resizable,
  FocusTrap,
  BottomAnchored,
} from "../../examples/components/Drawer.example.js";
import drawerExampleSrc from "../../examples/components/Drawer.example.tsx?raw";

const meta: Meta = {
  title: "Components/Drawer",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Drawer"
      intro={
        <>
          A side panel that slides in to reveal contextual content — detail
          views, edit forms, activity logs. Pushes the main content rather
          than overlaying it (use <code>Modal</code> for true overlays).
          Detail-on-list patterns and primary-detail layouts use this.
        </>
      }
    >
      <Section title="Basic (right-anchored)">
        <Card>
          <Example
            source={drawerExampleSrc}
            region="Basic"
            fileName="Drawer.example.tsx"
            height={260}
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section
        title="Inline"
        description="Inline drawers participate in document flow rather than overlaying — good for in-page side panels that can sit alongside other layout."
      >
        <Card>
          <Example
            source={drawerExampleSrc}
            region="Inline"
            fileName="Drawer.example.tsx"
            height={260}
          >
            <Inline />
          </Example>
        </Card>
      </Section>

      <Section
        title="Resizable"
        description="DrawerPanelContent.isResizable adds a drag handle on the panel edge. Bound the range with defaultSize / minSize."
      >
        <Card>
          <Example
            source={drawerExampleSrc}
            region="Resizable"
            fileName="Drawer.example.tsx"
            height={280}
          >
            <Resizable />
          </Example>
        </Card>
      </Section>

      <Section
        title="With focus trap"
        description="Trap focus inside the panel when it contains a form. Wire onKeyDown on the Drawer to close on Escape."
      >
        <Card>
          <Example
            source={drawerExampleSrc}
            region="FocusTrap"
            fileName="Drawer.example.tsx"
            height={260}
          >
            <FocusTrap />
          </Example>
        </Card>
      </Section>

      <Section
        title="Bottom-anchored"
        description="Useful for activity feeds, build logs, console views — anything horizontally wide and shallow."
      >
        <Card>
          <Example
            source={drawerExampleSrc}
            region="BottomAnchored"
            fileName="Drawer.example.tsx"
            height={300}
          >
            <BottomAnchored />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={drawerExampleSrc} fileName="Drawer.example.tsx" />
        </Card>
      </Section>

      <Section title="Composition">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "Drawer", type: "container", description: "Outer wrapper. Owns expanded / position / inline behaviour. Pass onKeyDown to handle Escape when using focus trap." },
                { name: "DrawerContent", type: "child", description: "The main + panel layout. Pass the panel via panelContent." },
                { name: "DrawerContentBody", type: "child", description: "The main content area. Stays interactive when the drawer opens." },
                { name: "DrawerPanelContent", type: "child", description: "The slide-in panel. isResizable + defaultSize + minSize enable drag-to-resize. focusTrap={{ enabled: true }} traps focus." },
                { name: "DrawerHead", type: "child", description: "Panel header — typically a focus target span + DrawerActions cluster." },
                { name: "DrawerPanelDescription", type: "child", description: "Optional secondary text under the head — sits above the body." },
                { name: "DrawerActions", type: "child", description: "Trailing-edge action slot inside DrawerHead. Holds DrawerCloseButton." },
                { name: "DrawerCloseButton", type: "child", description: "The X button that closes the panel." },
                { name: "DrawerPanelBody", type: "child", description: "Scrolling body of the panel." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Most-used Drawer props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "isExpanded", type: "boolean", description: "Open/closed state. Controlled." },
                { name: "position", type: '"start" | "end" | "bottom"', description: "Which edge the panel slides from. Default 'end' (right in LTR)." },
                { name: "isInline", type: "boolean", description: "Render inline within layout flow rather than absolutely positioned. Use for in-page side panels." },
                { name: "isStatic", type: "boolean", description: "Removes the slide animation — panel snaps open/closed." },
                { name: "onExpand", type: "() => void", description: "Fired after expansion — wire to focus a span inside DrawerHead so screen-reader/keyboard users land in the panel." },
                { name: "onKeyDown", type: "(event) => void", description: "Required when using focus trap — handle Escape to close, since trapped focus prevents Esc bubbling to the page." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Drawer vs Modal vs Sidebar">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Drawer</strong> — pushes content, doesn&rsquo;t block. Main area stays interactive. Great for detail views beside a list.</li>
            <li><strong>Modal</strong> — overlays content, blocks interaction. For confirmations, focused tasks, errors that demand attention.</li>
            <li><strong>Sidebar</strong> — always-visible two-column layout. For filter rails, TOCs, settings menus that don&rsquo;t need to be dismissed.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Focus the panel head on open.</strong> Wire <code>onExpand</code> to focus a span with <code>tabIndex</code> bound to <code>isExpanded</code> — that&rsquo;s the canonical PF pattern.</li>
            <li><strong>Set <code>aria-expanded</code> on the trigger.</strong> Screen readers announce the toggle state.</li>
            <li><strong>Escape closes.</strong> Without focus trap, Esc bubbles naturally; with focus trap, wire <code>onKeyDown</code> on Drawer to handle it.</li>
            <li><strong>Use focus trap when the panel is form-heavy.</strong> Otherwise leave it off so users can Tab back to the page.</li>
          </ul>
        </Card>
      </Section>
      <ThemingPointer
        dials={[
          ["--gp-surface-card", "Drawer panel background."],
          ["--gp-pad-card", "Panel padding."],
          ["--gp-border-subtle", "Edge divider colour."],
          ["--gp-shadow-popover", "Edge shadow when the drawer overlays content."],
          ["--gp-motion-duration", "Slide-in/out duration."],
        ]}
      />
    </FoundationPage>
  ),
};
