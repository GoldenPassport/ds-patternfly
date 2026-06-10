/**
 * AiAssistant inside the app Shell — an end-to-end page: branded masthead +
 * sidebar nav, content area, and the AI prompt bar docked at the bottom of
 * the content. The assistant's overlays (recent-chat popover + full chat
 * panel) portal into the content area and anchor to its corners.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *
 *   import { ThemeProvider } from "@golden-passport/ds-patternfly";
 *   import { goldenPassport } from "@golden-passport/ds-patternfly";
 *
 *   <ThemeProvider brand={goldenPassport} mode="light" focusRing="outer">
 *     <App />
 *   </ThemeProvider>
 */
import { useState } from "react";
import { Nav, NavItem, NavList } from "@patternfly/react-core";
import {
  AiAssistant,
  Shell,
  shellEnLabels,
} from "../_lib.js";

// Replace with your backend call — the thinking indicator shows until the
// returned promise resolves.
async function askAssistant(text: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 900));
  return `You asked: “${text}”. Wire \`onSend\` to your AI backend to answer for real.`;
}

export default function AssistantInShell() {
  // The positioned element the assistant's overlays portal into. Using the
  // content stage (not document.body) keeps the chat panel anchored to the
  // page content, clear of the masthead and sidebar.
  const [stage, setStage] = useState<HTMLDivElement | null>(null);

  return (
    <Shell
      labels={shellEnLabels}
      brandLogo={<strong style={{ fontSize: "1.125rem" }}>Acme Cloud</strong>}
      sidebar={
        <Nav aria-label="Main">
          <NavList>
            <NavItem itemId="overview" isActive>
              Overview
            </NavItem>
            <NavItem itemId="integrations">Integrations</NavItem>
            <NavItem itemId="settings">Settings</NavItem>
          </NavList>
        </Nav>
      }
    >
      <div
        ref={setStage}
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          minHeight: "70vh",
          padding: "1.5rem",
          gap: "1rem",
        }}
      >
        <h1 style={{ margin: 0 }}>Overview</h1>
        <p style={{ maxWidth: 640 }}>
          Page content lives here. The AI prompt bar is docked below; sending
          a message opens the transient recent-chat popover above it, and the
          History action expands into the full, resizable chat panel anchored
          to this content area.
        </p>
        <div style={{ flex: 1 }} />
        <AiAssistant
          overlayContainer={stage}
          placement="bottom-right"
          persist
          persistKey="acme:ai-assistance"
          onSend={askAssistant}
        />
      </div>
    </Shell>
  );
}
