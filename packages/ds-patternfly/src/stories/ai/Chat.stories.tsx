import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@patternfly/react-core";
import PaperPlaneIcon from "@patternfly/react-icons/dist/esm/icons/paper-plane-icon";
import {
  FoundationPage,
  Section,
  Card,
  CodeBlock,
  ThemingPointer,
} from "../../components/StoryKit.js";
import { PropsTable } from "../../components/DemoKit.js";
import { AiAssistant, aiAssistantCss } from "../../components/AiAssistant.js";

const meta: Meta = {
  title: "AI/Chat",
  parameters: { layout: "padded" },
};
export default meta;

/**
 * Example 1 — the bare prompt pill. On send (button or Enter) it flips a
 * "thinking" state that wraps the pill in a soft, pulsating brand glow until
 * the mock response settles (~4s). A polite live region announces the state.
 *
 * Built as a flat div + input + button (not PF6's TextInputGroup, whose nested
 * grid/flex chain fights the pill shape and made the input non-typable).
 */
function ChatBar() {
  const [isThinking, setIsThinking] = useState(false);
  const handleSend = () => {
    setIsThinking(true);
    setTimeout(() => setIsThinking(false), 4000);
  };
  return (
    <div className={`gp-ai-chatbar${isThinking ? " is-thinking" : ""}`}>
      <input
        type="text"
        placeholder="Send a message…"
        aria-label="Send a message"
        className="gp-ai-chatbar__input"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <Button
        variant="plain"
        aria-label="Send"
        icon={<PaperPlaneIcon />}
        className="gp-ai-chatbar__send"
        onClick={handleSend}
      />
      <div className="pf-v6-screen-reader" aria-live="polite">
        {isThinking ? "AI is thinking…" : ""}
      </div>
    </div>
  );
}

// Scoped styles for Example 1's chat pill. The thinking glow lives on a
// ::before pseudo-element so it can fade in/out smoothly while the keyframe
// animation breathes underneath.
const chatBarCss = `
  .gp-ai-chatbar {
    position: relative;
    display: flex;
    align-items: center;
    border-radius: var(--gp-radius-button, 9999px);
    background: var(--pf-t--global--background--color--primary--default);
    border: 1px solid var(--gp-color-border-default, rgba(0, 0, 0, 0.15));
    padding-inline-start: 1rem;
    padding-inline-end: 0.5rem;
    block-size: var(--pf-t--global--spacer--2xl, 3rem);
    inline-size: 100%;
  }
  @media (min-width: 48rem) {
    .gp-ai-chatbar { max-inline-size: 34rem; }
  }
  .gp-ai-chatbar__input {
    flex: 1;
    min-inline-size: 0;
    block-size: 100%;
    padding: 0;
    margin: 0;
    background: transparent;
    border: 0;
    outline: none;
    color: var(--gp-color-text-regular, currentColor);
    font: inherit;
    line-height: normal;
  }
  .gp-ai-chatbar__input::placeholder {
    color: var(--gp-color-text-subtle, currentColor);
  }
  .gp-ai-chatbar__send {
    color: var(--gp-color-text-link, currentColor);
    flex: 0 0 auto;
  }
  .gp-ai-chatbar__input:focus,
  .gp-ai-chatbar__input:focus-visible {
    outline: none;
  }
  .gp-ai-chatbar:focus-within {
    outline: 2px solid var(--gp-color-focus-ring, currentColor);
    border-radius: var(--gp-radius-button, 9999px);
  }
  .gp-focus-ring-inner .gp-ai-chatbar:focus-within { outline-offset: -4px; }
  .gp-focus-ring-outer .gp-ai-chatbar:focus-within { outline-offset: 2px; }
  .gp-ai-chatbar::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    opacity: 0;
    transition: opacity 400ms ease;
  }
  .gp-ai-chatbar.is-thinking::before {
    opacity: 1;
    animation: gp-ai-chatbar-pulse 2.4s ease-in-out infinite;
  }
  .gp-ai-chatbar.is-thinking {
    border-color: color-mix(in srgb, var(--gp-color-brand-default) 50%, transparent);
    transition: border-color 400ms ease;
  }
  @keyframes gp-ai-chatbar-pulse {
    0%, 100% {
      box-shadow:
        0 0 12px 0 color-mix(in srgb, var(--gp-color-brand-default) 40%, transparent),
        0 0 24px 0 color-mix(in srgb, var(--gp-color-brand-default) 30%, transparent),
        0 0 40px 0 color-mix(in srgb, var(--gp-color-brand-hover, var(--gp-color-brand-default)) 25%, transparent),
        0 0 60px 0 color-mix(in srgb, var(--gp-color-brand-default) 15%, transparent);
    }
    50% {
      box-shadow:
        0 0 20px 0 color-mix(in srgb, var(--gp-color-brand-default) 55%, transparent),
        0 0 40px 0 color-mix(in srgb, var(--gp-color-brand-default) 40%, transparent),
        0 0 64px 0 color-mix(in srgb, var(--gp-color-brand-hover, var(--gp-color-brand-default)) 35%, transparent),
        0 0 96px 0 color-mix(in srgb, var(--gp-color-brand-default) 22%, transparent);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .gp-ai-chatbar.is-thinking::before {
      animation: none;
      box-shadow:
        0 0 24px 0 color-mix(in srgb, var(--gp-color-brand-default) 45%, transparent),
        0 0 60px 0 color-mix(in srgb, var(--gp-color-brand-default) 20%, transparent);
    }
  }
`;

/**
 * Example 2 — the bar wrapped in the animated AI-indicator border (the same
 * `.gp-ai-borderbar` chrome the AiAssistant uses). On send, the conic gradient
 * sweeps around the box instead of the glow pulse.
 */
function AiBorderBar() {
  const [isThinking, setIsThinking] = useState(false);
  const handleSend = () => {
    setIsThinking(true);
    setTimeout(() => setIsThinking(false), 4000);
  };
  return (
    <div className={`gp-ai-borderbar${isThinking ? " is-thinking" : ""}`}>
      <input
        type="text"
        placeholder="Ask the assistant…"
        aria-label="Ask the assistant"
        className="gp-ai-borderbar__input"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <Button
        variant="plain"
        aria-label="Send"
        icon={<PaperPlaneIcon />}
        className="gp-ai-borderbar__send"
        onClick={handleSend}
      />
      <div className="pf-v6-screen-reader" aria-live="polite">
        {isThinking ? "AI is thinking…" : ""}
      </div>
    </div>
  );
}

// The demo stage for Example 3 — a tall canvas with the bar docked at the
// bottom; the AiAssistant overlays portal into it and anchor to its corners.
const stageCss = `
  .gp-ai-stage {
    position: relative;
    block-size: 44rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 1.5rem;
  }
`;

// Example 3 — the full AiAssistant. The stage is the positioned container the
// overlays portal into; the bar renders inline (docked at the stage bottom).
function Example3Demo() {
  const [stage, setStage] = useState<HTMLDivElement | null>(null);
  return (
    <div
      className="gp-ai-frame"
      style={{
        borderRadius: "var(--gp-radius-card, 16px)",
        background: "var(--gp-color-bg-secondary-default)",
        border: "1px solid var(--gp-color-border-default)",
        overflow: "hidden",
      }}
    >
      <div className="gp-ai-stage" ref={setStage}>
        <AiAssistant
          overlayContainer={stage}
          placement="bottom-right"
          persist={false}
        />
      </div>
    </div>
  );
}

export const Chat: StoryObj = {
  render: () => (
    <>
      <style>{chatBarCss}</style>
      <style>{aiAssistantCss}</style>
      <style>{stageCss}</style>
      <FoundationPage
        title="Chat"
        intro={
          <>
            The AI prompt bar — where users type to talk to an assistant — and
            the surfaces it grows into. <strong>Example 1</strong> is the bare
            pill (the same bar the Compass <code>Example</code> demo docks in
            its <code>CompassMessageBar</code> footer slot), with a soft{" "}
            <strong>pulsating glow</strong> on send.{" "}
            <strong>Example 2</strong> wraps it in a colourful{" "}
            <strong>AI-indicator border</strong> that sweeps around the box.{" "}
            <strong>Example 3</strong> is the full{" "}
            <strong>AI&nbsp;Assistance</strong> experience — a transient
            recent-chat popover plus a repositionable, resizable, searchable
            full-conversation panel (a modal on small screens), packaged as the
            reusable <code>AiAssistant</code> component. Brand tokens drive
            every colour, so all of it reflows per brand and across light /
            dark / glass. Type a message and press <strong>Enter</strong> or
            the send button to try each.
          </>
        }
      >
        <Section
          title="Example 1 — pulsing glow"
          description="A pill-shaped prompt input with a send button. Send (button or Enter) triggers a brand-coloured thinking pulse and a polite live-region announcement; the pulse honours prefers-reduced-motion. Brand tokens drive the colour, so it reflows per brand and across light / dark / glass."
        >
          {/* Plain surface (not the doc Card, which clips overflow) with
              generous vertical room so the thinking glow — a soft box-shadow
              that bleeds well past the pill — isn't clipped. */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "64px 24px",
              borderRadius: "var(--gp-radius-card, 16px)",
              background: "var(--gp-color-bg-secondary-default)",
              border: "1px solid var(--gp-color-border-default)",
            }}
          >
            <ChatBar />
          </div>
        </Section>

        <Section
          title="Example 2 — animated AI border"
          description="The same bar wrapped in a thick AI-indicator gradient border (coral #f56e6e → purple #876fd4 → deep purple #5e40be). Instead of the glow pulse, sending sweeps the gradient around the box — a conic gradient anchored to an animated @property angle. Honours prefers-reduced-motion."
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "48px 24px",
              borderRadius: "var(--gp-radius-card, 16px)",
              background: "var(--gp-color-bg-secondary-default)",
              border: "1px solid var(--gp-color-border-default)",
            }}
          >
            <AiBorderBar />
          </div>
        </Section>

        <Section
          title="Example 3 — AI Assistance"
          description="Sending drops the message into a transient “recent chat” popover that slides up just above the bar (the bar clears): you see your message, animated typing dots, then the reply, with the thread auto-scrolling to the newest line. The bar is a textarea that auto-grows for long messages, then caps and scrolls. The popover auto-dismisses after a shared timer; send again before then and the message stacks into the same short-term thread (resetting the timer). The History link (or the bar's expand icon) hands off to the full conversation — a floating panel anchored to a configurable corner (here bottom-right, always inset from the corner), opened to the most recent message and with its own docked message bar. The panel header has a search box that filters the conversation. The panel is repositionable (the ⋮ menu moves it between corners, deletes history, or resets — destructive items in red) and resizable (drag the inner corner). On narrow viewports it is replaced by a modal. Position + size live in component state by default (reset on reload), or opt into localStorage with the persist prop. Every label is prop-driven; messages carry second-precision timestamps so they sequence deterministically. All surfaces frost under the glass theme."
        >
          <Example3Demo />
        </Section>

        <Section
          title="Usage"
          description="The bar is a flat div + input + button (kept minimal so the input stays straightforwardly interactive); the two send-state treatments differ only in CSS — a box-shadow glow pulse (Example 1) vs. a rotating conic-gradient border (Example 2). Example 3 is the reusable AiAssistant component: it renders the bar inline and portals its overlays (recent popover + full chat) into a positioned container, so the bar and overlays can live in different parts of the page (e.g. a footer bar with the chat overlaying the content)."
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Card>
              <CodeBlock>{`function ChatBar() {
  const [isThinking, setIsThinking] = useState(false);
  const handleSend = () => {
    setIsThinking(true);
    setTimeout(() => setIsThinking(false), 4000); // mock response
  };
  return (
    <div className={\`gp-ai-chatbar\${isThinking ? " is-thinking" : ""}\`}>
      <input
        type="text"
        placeholder="Send a message…"
        aria-label="Send a message"
        className="gp-ai-chatbar__input"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <Button variant="plain" aria-label="Send" icon={<PaperPlaneIcon />}
        className="gp-ai-chatbar__send" onClick={handleSend} />
      <div className="pf-v6-screen-reader" aria-live="polite">
        {isThinking ? "AI is thinking…" : ""}
      </div>
    </div>
  );
}`}</CodeBlock>
            </Card>
            <Card>
              <CodeBlock>{`/* Example 2's thinking state — a rotating AI-indicator border.
   Animatable angle so the conic gradient can spin. */
@property --gp-ai-angle { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
.chatbar::before {
  content: ""; position: absolute; inset: 0;
  border-radius: inherit; pointer-events: none;
  background: conic-gradient(
    from var(--gp-ai-angle), #f56e6e, #876fd4, #5e40be, #876fd4, #f56e6e
  ) border-box;
  border: 3px solid transparent;          /* thick AI border */
  mask: linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0);
  mask-composite: exclude;                /* show only the border ring */
}
.chatbar.is-thinking::before {
  animation: spin 2.4s linear infinite;   /* sweep colours around on send */
}
@keyframes spin { to { --gp-ai-angle: 360deg; } }`}</CodeBlock>
            </Card>
            <Card>
              <CodeBlock>{`// Example 3 — the reusable AiAssistant. Inject its styles once, give it a
// positioned container for the overlays, and place the component where the
// bar should live. Every label is prop-driven (localise / re-word without
// forking). Below the "sm" breakpoint the full chat opens as a modal.
import { AiAssistant, aiAssistantCss } from "@golden-passport/ds-patternfly";

function Demo() {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  return (
    <>
      <style>{aiAssistantCss}</style>
      <div ref={setContainer} style={{ position: "relative" }}>
        {/* page content … */}
        <AiAssistant
          overlayContainer={container}
          placement="bottom-right"   // | top-left | top-right | bottom-left
          labels={{ chatHeader: "AI Assistance", chatLink: "History" }}
        />
      </div>
    </>
  );
}`}</CodeBlock>
            </Card>
            <Card>
              <CodeBlock>{`// Remembering the user's chosen corner + panel size is opt-in via the
// 'persist' prop. Off by default, so the panel always opens at the default
// placement + size (and the ⋮ menu's "Reset" clears any runtime changes).

// Off (default) — resets on every reload:
<AiAssistant overlayContainer={container} persist={false} />

// On — writes corner + size to localStorage under persistKey:
<AiAssistant overlayContainer={container} persist persistKey="ai-assistance:layout" />`}</CodeBlock>
            </Card>
          </div>
        </Section>

        <Section
          title="AiAssistant props"
          description="Example 3's reusable component. Behaviour is fixed; copy, placement and persistence are configurable."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  {
                    name: "overlayContainer",
                    type: "HTMLElement | null",
                    description:
                      "A position:relative element the overlays (recent popover + full chat) portal into and anchor to. When omitted they render inline next to the bar.",
                  },
                  {
                    name: "placement",
                    type: '"top-left" | "top-right" | "bottom-left" | "bottom-right"',
                    description:
                      "Default corner the full-chat panel anchors to on desktop (always inset from the corner). Default: bottom-right.",
                  },
                  {
                    name: "labels",
                    type: "Partial<ChatLabels>",
                    description:
                      "Override any user-facing copy — placeholder, headers, link text, and every aria label. Merged over the defaults.",
                  },
                  {
                    name: "persist",
                    type: "boolean",
                    description:
                      "Remember the chosen corner + panel size across reloads (localStorage). Default: false.",
                  },
                  {
                    name: "persistKey",
                    type: "string",
                    description:
                      'localStorage key prefix used when persist is on. Default: "gp-ai-assistance".',
                  },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul
              style={{
                margin: 0,
                padding: "16px 24px 16px 40px",
                color: "var(--gp-color-text-regular)",
                lineHeight: 1.8,
              }}
            >
              <li>
                Every input and icon-only button (send, expand, move, close,
                search-clear) carries an <code>aria-label</code>; the thinking
                state is announced through a polite <code>aria-live</code>{" "}
                region.
              </li>
              <li>
                The recent-chat popover is an{" "}
                <code>aria-live=&quot;polite&quot;</code> region, so new turns
                are announced as they stream in.
              </li>
              <li>
                The full chat is a <code>role=&quot;dialog&quot;</code> floating
                panel (named by its heading); below the <code>sm</code>{" "}
                breakpoint it becomes a focus-trapped <code>Modal</code>.
              </li>
              <li>
                Every animation — the glow pulse, the AI-border sweep, the
                typing dots, and the panel entrance — is disabled under{" "}
                <code>prefers-reduced-motion</code>.
              </li>
            </ul>
          </Card>
        </Section>

        <ThemingPointer
          dials={[
            ["--gp-radius-button", "Bar + icon-button shape (pill / circle)."],
            ["--gp-color-brand-default", "User-bubble fill + the thinking glow."],
            ["--gp-color-text-link", "Send icon + History link colour."],
            ["--gp-glass-surface-fill", "Frosted surface fill under the glass theme."],
          ]}
        />
      </FoundationPage>
    </>
  ),
};
