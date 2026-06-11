import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import reactConsoleExampleSrc from "../../examples/extensions/ReactConsole.example.tsx?raw";

const meta: Meta = {
  title: "Extensions/React console",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="React console"
      intro={
        <>
          A toolkit of remote-console viewers — Serial (xterm.js wrapper),
          VNC (noVNC), and Desktop (RDP-style placeholder). Used in
          OpenShift-style admin UIs where the user needs an in-browser
          terminal or graphical session into a VM. From{" "}
          <code>@patternfly/react-console</code>.
          <br /><br />
          These components depend on heavy runtime libraries and a live
          backend connection — documented here as code-only recipes.
        </>
      }
    >
      <Section
        title="AccessConsoles wrapper"
        description="The picker that lets the user switch between Serial / VNC / Desktop. Wrap one or more console children inside it."
      >
        <Card>
          <Example
            source={reactConsoleExampleSrc}
            region="AccessConsolesWrapper"
            fileName="ReactConsole.example.tsx"
          />
        </Card>
      </Section>

      <Section
        title="Serial console"
        description="Wraps xterm.js. The consumer manages the connection — the component just renders the terminal and forwards user input via onData."
      >
        <Card>
          <Example
            source={reactConsoleExampleSrc}
            region="SerialConsoleRecipe"
            fileName="ReactConsole.example.tsx"
          />
        </Card>
      </Section>

      <Section
        title="VNC console"
        description="Wraps noVNC. Pass host / port / path; the component opens the WebSocket and renders the framebuffer in a canvas."
      >
        <Card>
          <Example
            source={reactConsoleExampleSrc}
            region="VncConsoleRecipe"
            fileName="ReactConsole.example.tsx"
          />
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the recipes above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={reactConsoleExampleSrc}
            fileName="ReactConsole.example.tsx"
          />
        </Card>
      </Section>

      <Section title="Most-used AccessConsoles props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "children", type: "ReactNode", description: "One or more console children — SerialConsole, VncConsole, DesktopViewer, or anything with a `type` prop." },
                { name: "preselectedType", type: "string", description: "Initial selection in the console picker (defaults to first child)." },
                { name: "textSelectConsoleType", type: "string", description: "Localize the picker label." },
                { name: "textSerialConsole / textVncConsole / textDesktopViewerConsole", type: "string", description: "Per-type labels in the picker." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Most-used SerialConsole props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "onConnect", type: "() => void", description: "Required — fired when the user clicks Connect. Open your WebSocket here." },
                { name: "onDisconnect", type: "() => void", description: "Required — fired on Disconnect. Close your transport." },
                { name: "onData", type: "(input: string) => void", description: "Required — fired on every keypress / paste. Forward to your transport." },
                { name: "status", type: '"connected" | "disconnected" | "loading"', description: "Drives the visible state (connect button vs disconnect button vs spinner)." },
                { name: "cols / rows", type: "number", description: "Initial terminal dimensions." },
                { name: "fontFamily / fontSize", type: "string / number", description: "Terminal font." },
                { name: "textConnect / textDisconnect / textReset / textDisconnected / textLoading", type: "string", description: "Localize button + status labels." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Patterns">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Lazy-load.</strong> xterm + noVNC are heavy; wrap in <code>React.lazy</code> so they only ship to users who open a console.</li>
            <li><strong>Reconnect on focus.</strong> WebSockets drop on tab idle — listen for <code>visibilitychange</code> and re-call <code>onConnect</code>.</li>
            <li><strong>Buffer outbound data.</strong> If the user types while disconnected, queue input client-side and flush once <code>status</code> goes back to <code>connected</code>.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Terminals are inherently visual.</strong> Provide a downloadable session log so screen-reader users can read output asynchronously.</li>
            <li><strong>Localize all <code>text*</code> props.</strong> Connect / Disconnect / Loading messages need translation in non-English locales.</li>
            <li><strong>VNC pass-through traps keyboard input.</strong> Make the &ldquo;send shortcuts&rdquo; menu prominent so keyboard users have an escape hatch (Esc, Ctrl + Alt + Del).</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
