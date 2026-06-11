/**
 * Chat — AI prompt-bar recipes: a pill-shaped chat bar with a brand-coloured
 * "thinking" glow pulse, and the same bar wrapped in the animated
 * AI-indicator gradient border the AiAssistant component uses.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import PaperPlaneIcon from "@patternfly/react-icons/dist/esm/icons/paper-plane-icon";
import { Button } from "../_lib.js";

// #region ChatBar
// Scoped styles for the chat pill. The thinking glow lives on a ::before
// pseudo-element so it can fade in/out smoothly while the keyframe animation
// breathes underneath. Brand tokens drive every colour, so the bar reflows
// per brand and across light / dark / glass.
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
 * The bare prompt pill. On send (button or Enter) it flips a "thinking"
 * state that wraps the pill in a soft, pulsating brand glow until the mock
 * response settles (~4s). A polite live region announces the state.
 *
 * Built as a flat div + input + button (not PF6's TextInputGroup, whose
 * nested grid/flex chain fights the pill shape and made the input
 * non-typable).
 */
export function ChatBar() {
  const [isThinking, setIsThinking] = useState(false);
  const handleSend = () => {
    setIsThinking(true);
    setTimeout(() => setIsThinking(false), 4000); // mock response
  };
  return (
    <div className={`gp-ai-chatbar${isThinking ? " is-thinking" : ""}`}>
      <style>{chatBarCss}</style>
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
// #endregion

// #region AiBorderBar
/**
 * The bar wrapped in the animated AI-indicator border — the same
 * `.gp-ai-borderbar` chrome the AiAssistant component uses, so its styles
 * ship in the lib stylesheet (no extra CSS needed here). On send, a conic
 * gradient (coral #f56e6e → purple #876fd4 → deep purple #5e40be) anchored
 * to an animated @property angle sweeps around the box instead of the glow
 * pulse; the ring is a masked border so only the edge shows. Honours
 * prefers-reduced-motion.
 */
export function AiBorderBar() {
  const [isThinking, setIsThinking] = useState(false);
  const handleSend = () => {
    setIsThinking(true);
    setTimeout(() => setIsThinking(false), 4000); // mock response
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
// #endregion

export default function ChatExample() {
  // Generous padding so the thinking glow — a soft box-shadow that bleeds
  // well past the pill — has room to breathe.
  return (
    <div style={{ display: "grid", gap: 48, padding: "48px 24px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ChatBar />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <AiBorderBar />
      </div>
    </div>
  );
}
