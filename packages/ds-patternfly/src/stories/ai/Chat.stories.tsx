import { useCallback, useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  Modal,
  ModalBody,
  ModalHeader,
  SearchInput,
} from "@patternfly/react-core";
import type { MenuToggleElement } from "@patternfly/react-core";
import PaperPlaneIcon from "@patternfly/react-icons/dist/esm/icons/paper-plane-icon";
import ExpandIcon from "@patternfly/react-icons/dist/esm/icons/expand-icon";
import HistoryIcon from "@patternfly/react-icons/dist/esm/icons/history-icon";
import TimesIcon from "@patternfly/react-icons/dist/esm/icons/times-icon";
import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";
import {
  FoundationPage,
  Section,
  Card,
  CodeBlock,
  ThemingPointer,
} from "../../components/StoryKit.js";
import { PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "AI/Chat",
  parameters: { layout: "padded" },
};
export default meta;

/**
 * The chat / prompt message bar — a pill-shaped input with a send button on
 * the right. Lifted from the Compass "Example" demo, where it sits in the
 * CompassMessageBar (footer) slot as the page's AI prompt entry.
 *
 * On send (the send button, or Enter without Shift) it flips a "thinking"
 * state that wraps the pill in a soft, pulsating brand-coloured glow until the
 * mock response settles (~4s). A polite live region announces the state to
 * assistive tech, and the pulse honours `prefers-reduced-motion`.
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
          // Enter (without modifier) sends; Shift+Enter is left free for a
          // future multi-line affordance.
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
      {/* Live-region announcement so AT users hear the thinking state. */}
      <div className="pf-v6-screen-reader" aria-live="polite">
        {isThinking ? "AI is thinking…" : ""}
      </div>
    </div>
  );
}

// Scoped styles for the chat message bar. The base background reads from the
// same PF6 global token the Compass rails/body resolve to, so it cascades
// correctly across light / dark / glass. The thinking glow lives on a ::before
// pseudo-element (separate from the pill) so it can fade in/out smoothly while
// the keyframe animation breathes underneath.
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
    block-size: var(--pf-t--global--spacer--2xl, 3rem); /* 48px, all breakpoints */
    inline-size: 100%; /* full width on mobile */
  }
  /* md and up: a bit wider (capped + centred). Height stays 48px (3rem) to
     match the Compass message bar. */
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
  /* Suppress the bare input's own focus outline — the wrapper shows focus
     instead so the ring spans the whole pill (input + send + padding). */
  .gp-ai-chatbar__input:focus,
  .gp-ai-chatbar__input:focus-visible {
    outline: none;
  }
  /* Focus ring on the pill, honouring the ThemeProvider focusRing setting. */
  .gp-ai-chatbar:focus-within {
    outline: 2px solid var(--gp-color-focus-ring, currentColor);
    border-radius: var(--gp-radius-button, 9999px);
  }
  .gp-focus-ring-inner .gp-ai-chatbar:focus-within { outline-offset: -4px; }
  .gp-focus-ring-outer .gp-ai-chatbar:focus-within { outline-offset: 2px; }
  /* "Thinking" state — soft pulsating brand-coloured cloud around the pill
     while the AI generates. Glow on ::before so it fades in/out independently
     of the breathing keyframe. */
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
 * Variant of the chat bar wrapped in a thick, colourful AI-focused gradient
 * border (PatternFly's AI-indicator palette: coral #f56e6e → purple #876fd4 →
 * deep purple #5e40be). On send, instead of the blur pulse, the gradient
 * itself sweeps around the box.
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

// The AI gradient border. The ring is painted by a ::before using PF6's
// AI-indicator mask technique (gradient on the border-box + a transparent
// thick border + a mask that excludes the padding box, so only the border
// shows). PF6's indicator uses a static linear gradient; here it's a CONIC
// gradient anchored to a custom --gp-ai-angle property, so sending can animate
// that angle 0 → 360deg and sweep the colours all the way around the box.
// Symmetric stops (coral → purple → deep → purple → coral) make the loop
// seamless. Honours prefers-reduced-motion (no rotation).
const aiBorderCss = `
  @property --gp-ai-angle {
    syntax: "<angle>";
    inherits: false;
    initial-value: 0deg;
  }
  .gp-ai-borderbar {
    position: relative;
    display: flex;
    align-items: center;
    border-radius: var(--gp-radius-button, 9999px);
    background: var(--pf-t--global--background--color--primary--default);
    padding-inline-start: 1rem;
    padding-inline-end: 0.5rem;
    block-size: var(--pf-t--global--spacer--2xl, 3rem); /* 48px, all breakpoints */
    inline-size: 100%; /* full width on mobile */
    transition: box-shadow 150ms ease;
  }
  /* Handed off to the full chat: the controls carry the disabled attribute (so
     they grey themselves), and the vibrant AI border tones down to pale,
     surface-mixed theme colours rather than the bar just fading out. */
  .gp-ai-borderbar.is-disabled::before {
    background: conic-gradient(
      from var(--gp-ai-angle),
      color-mix(in srgb, #f56e6e 35%, var(--pf-t--global--background--color--primary--default)),
      color-mix(in srgb, #876fd4 35%, var(--pf-t--global--background--color--primary--default)),
      color-mix(in srgb, #5e40be 35%, var(--pf-t--global--background--color--primary--default)),
      color-mix(in srgb, #876fd4 35%, var(--pf-t--global--background--color--primary--default)),
      color-mix(in srgb, #f56e6e 35%, var(--pf-t--global--background--color--primary--default))
    ) border-box;
  }
  .gp-ai-borderbar.is-disabled .gp-ai-borderbar__input {
    color: var(--gp-color-text-subtle, currentColor);
  }
  /* md and up: a bit wider (capped + centred); height stays 48px. */
  @media (min-width: 48rem) {
    .gp-ai-borderbar { max-inline-size: 34rem; }
  }
  .gp-ai-borderbar::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
    background: conic-gradient(
      from var(--gp-ai-angle),
      #f56e6e, #876fd4, #5e40be, #876fd4, #f56e6e
    ) border-box;
    border: 3px solid transparent;
    mask: linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
    -webkit-mask: linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
  }
  /* On send, sweep the colours around the box (no blur pulse here). */
  .gp-ai-borderbar.is-thinking::before {
    animation: gp-ai-borderbar-spin 2.4s linear infinite;
  }
  @keyframes gp-ai-borderbar-spin {
    to { --gp-ai-angle: 360deg; }
  }
  .gp-ai-borderbar__input {
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
  .gp-ai-borderbar__input::placeholder {
    color: var(--gp-color-text-subtle, currentColor);
  }
  .gp-ai-borderbar__send {
    color: var(--gp-color-text-link, currentColor);
    flex: 0 0 auto;
  }
  .gp-ai-borderbar__input:focus,
  .gp-ai-borderbar__input:focus-visible { outline: none; }
  /* No crisp focus ring on this variant — a soft, misty halo in the focus-ring
     colour instead (the AI gradient border stays its resting 3px). Blurred,
     spreadless layers read as a diffuse glow rather than a hard outline. */
  .gp-ai-borderbar:focus-within {
    outline: none;
    box-shadow:
      0 0 8px 0 color-mix(in srgb, var(--gp-color-focus-ring, currentColor) 38%, transparent),
      0 0 18px 3px color-mix(in srgb, var(--gp-color-focus-ring, currentColor) 22%, transparent);
  }
  @media (prefers-reduced-motion: reduce) {
    .gp-ai-borderbar.is-thinking::before { animation: none; }
  }
`;

// Chat-window (full-chat overlay) layout — a scrollable transcript above the
// docked message bar, with simple sender-aligned bubbles. Shared by the
// floating panel (desktop) and the modal (mobile).
const chatWindowCss = `
  .gp-ai-chatwindow {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    min-block-size: 0; /* allow the inner transcript to shrink + scroll */
  }
  /* Inside the floating panel the window fills the remaining height below the
     header; inside the modal it takes a capped viewport height. */
  .gp-ai-fullchat .gp-ai-chatwindow {
    flex: 1 1 auto;
    padding: 0.75rem;
  }
  .gp-ai-chatwindow--modal {
    block-size: min(65vh, 30rem);
  }
  .gp-ai-chatwindow__transcript {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex: 1 1 auto;       /* grow to fill, pushing the docked bar down */
    min-block-size: 0;    /* allow the flex child to shrink + scroll */
    overflow-y: auto;
    padding-block-end: 0.25rem;
  }
  .gp-ai-msg {
    max-inline-size: 80%;
    padding: 0.5rem 0.875rem;
    border-radius: var(--gp-radius-card, 12px);
    line-height: 1.5;
  }
  .gp-ai-msg--bot {
    align-self: flex-start;
    background: var(--gp-color-bg-secondary-default);
    color: var(--gp-color-text-regular);
    border-end-start-radius: 4px;
  }
  .gp-ai-msg--user {
    align-self: flex-end;
    background: var(--gp-color-brand-default);
    color: var(--gp-color-brand-on, #fff);
    border-end-end-radius: 4px;
  }
  /* Per-message timestamp — small, muted, inherits the bubble's text colour. */
  .gp-ai-msg__time {
    display: block;
    margin-block-start: 0.25rem;
    font-size: 0.6875rem;
    line-height: 1;
    opacity: 0.65;
    text-align: end;
  }
`;

// Central token: how long the transient "recent chat" popover lingers after
// the last activity before auto-dismissing. Reset on every new send.
const RECENT_CHAT_AUTOCLOSE_MS = 6000;

const AI_REPLY =
  "Got it — here's a quick reply. Open History for the whole conversation.";

// A message carries its full timestamp (with seconds) so turns sort
// deterministically and we can reliably surface the latest on open; the display
// label omits seconds.
type ChatMsg = { role: "user" | "ai"; text: string; at: Date };

// Date + wall-clock label for a message (e.g. "Jun 8, 9:41 AM"). Formatted via
// the runtime locale; seeded turns format the same way so the thread is
// consistent regardless of where it renders. Seconds are kept on the Date (for
// ordering) but intentionally not shown.
const stampOf = (d: Date) =>
  d.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

// All user-facing copy is prop-driven so the component can be localised /
// re-worded without forking it. The story passes overrides; these are the
// fallbacks.
type ChatLabels = {
  /** Message-bar placeholder (and its accessible label). */
  placeholder: string;
  /** Title of the transient recent-chat popover. */
  recentTitle: string;
  /** Label of the link that opens the full chat. */
  chatLink: string;
  /** Heading of the full-chat panel / modal. */
  chatHeader: string;
  /** Accessible label for the send button. */
  send: string;
  /** Accessible label for the expand button. */
  expand: string;
  /** Accessible label for the full-chat close button. */
  close: string;
  /** Accessible label / live-region text for the typing indicator. */
  thinking: string;
  /** Accessible label for the reposition (move) menu toggle. */
  optionsLabel: string;
  /** Label of the destructive "reset layout" menu item. */
  reset: string;
  /** Label of the destructive "delete history" menu item. */
  deleteHistory: string;
  /** Placeholder (and accessible label) for the in-chat search box. */
  searchPlaceholder: string;
};

const DEFAULT_CHAT_LABELS: ChatLabels = {
  placeholder: "Ask the assistant…",
  recentTitle: "Recent chat",
  chatLink: "History",
  chatHeader: "AI Assistance",
  send: "Send",
  expand: "Open AI Assistance",
  close: "Close AI Assistance",
  thinking: "AI is thinking",
  optionsLabel: "Move AI Assistance",
  reset: "Reset size & position",
  deleteHistory: "Delete history",
  searchPlaceholder: "Search the conversation",
};

// Corner the full-chat panel anchors to (always inset from the edges, never
// flush in the corner). On narrow viewports the panel is replaced by a modal.
type ChatPlacement = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const PLACEMENTS: ChatPlacement[] = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];
const PLACEMENT_LABELS: Record<ChatPlacement, string> = {
  "top-left": "Top left",
  "top-right": "Top right",
  "bottom-left": "Bottom left",
  "bottom-right": "Bottom right",
};
// Smallest the panel can be dragged to (keeps the header + bar usable).
const MIN_CHAT_W = 260;
const MIN_CHAT_H = 220;

// Tiny, fail-safe localStorage helpers (no-op if storage is unavailable, e.g.
// SSR / private mode). Used only when persistence is enabled.
function readStored<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}
function writeStored(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}
function removeStored(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

// Below this width the full chat opens as a modal instead of the floating
// panel (PatternFly's `sm` breakpoint = 36rem).
const CHAT_MODAL_BELOW = "(max-width: 35.99rem)";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(CHAT_MODAL_BELOW);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

// Snap a scroll container to its bottom. The drawer panel mounts hidden and
// then slides + widens open, so its content starts at zero height and grows
// (text rewrapping) across the transition — a single pin lands on a stale
// height. Re-pinning every frame for the duration of the transition snaps to
// the latest bottom each frame, ending on the most recent message once layout
// settles. Safe to call with a null node (no-op).
function pinToBottom(el: HTMLElement | null) {
  if (!el) return;
  let frame = 0;
  const tick = () => {
    el.scrollTop = el.scrollHeight;
    if (frame++ < 40) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

type RecentChatBarProps = {
  /** Corner the full-chat panel anchors to on desktop. */
  placement?: ChatPlacement;
  /** Override any user-facing copy (placeholder, headers, aria labels…). */
  labels?: Partial<ChatLabels>;
  /**
   * Remember the user's chosen corner + panel size across reloads
   * (localStorage). Off by default — when off, the panel always opens at the
   * `placement` default and its default size.
   */
  persist?: boolean;
  /** localStorage key prefix used when `persist` is on. */
  persistKey?: string;
};

/**
 * Sends drop into a transient "recent chat" popover that slides up just above
 * the bar: you see the message you just sent (the bar clears), an animated
 * typing indicator, then the reply. It auto-dismisses after
 * RECENT_CHAT_AUTOCLOSE_MS (reset on each new send, so rapid messages stack in
 * the short-term thread); the History link (or the bar's expand icon) hands off
 * to the full conversation — a floating panel anchored to `placement` on
 * desktop, or a modal on narrow viewports.
 *
 * All copy is prop-driven via `labels`; the full-chat corner via `placement`.
 */
function RecentChatBar({
  placement: placementProp = "bottom-right",
  labels: labelOverrides,
  persist = false,
  persistKey = "gp-ai-assistance",
}: RecentChatBarProps = {}) {
  const labels = { ...DEFAULT_CHAT_LABELS, ...labelOverrides };
  const isMobile = useIsMobile();

  const placeKey = `${persistKey}:placement`;
  const sizeKey = `${persistKey}:size`;

  // Placement + size are adjustable at runtime (move menu + drag-to-resize).
  // When `persist` is on they're seeded from localStorage and written back;
  // when off (the default) they reset to the prop defaults on every reload.
  const [placement, setPlacement] = useState<ChatPlacement>(
    () => (persist && readStored<ChatPlacement>(placeKey)) || placementProp,
  );
  const [size, setSize] = useState<{ w: number; h: number } | null>(() =>
    persist ? readStored<{ w: number; h: number }>(sizeKey) : null,
  );
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (persist) writeStored(placeKey, placement);
  }, [persist, placeKey, placement]);
  useEffect(() => {
    if (persist && size) writeStored(sizeKey, size);
  }, [persist, sizeKey, size]);

  // Reset to the default corner + size (and clear any persisted layout).
  const resetLayout = () => {
    setPlacement(placementProp);
    setSize(null);
    if (persist) {
      removeStored(placeKey);
      removeStored(sizeKey);
    }
  };

  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [isRecentOpen, setIsRecentOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isMultiline, setIsMultiline] = useState(false);
  // Compose state for the bar docked inside the full chat.
  const [historyDraft, setHistoryDraft] = useState("");
  const [historyThinking, setHistoryThinking] = useState(false);
  const closeRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const thinkRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const recentBodyRef = useRef<HTMLDivElement | null>(null);
  const historyBodyRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(
    () => () => {
      clearTimeout(closeRef.current);
      clearTimeout(thinkRef.current);
    },
    [],
  );

  // Auto-scroll the recent-chat thread to the newest message / typing dots.
  useEffect(() => {
    recentBodyRef.current?.scrollTo({
      top: recentBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isThinking, isRecentOpen]);

  // Ref callback for the full-chat transcript. The panel / modal only mounts
  // its content when the chat opens, so this fires exactly when the chat opens
  // — the reliable moment to snap to the most recent message.
  const setHistoryBody = useCallback((node: HTMLDivElement | null) => {
    historyBodyRef.current = node;
    pinToBottom(node);
  }, []);

  // Keep the open chat pinned to the newest message as turns are sent into it.
  useEffect(() => {
    if (isHistoryOpen) pinToBottom(historyBodyRef.current);
  }, [isHistoryOpen, messages, historyThinking]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    // New activity → reset both timers.
    clearTimeout(closeRef.current);
    clearTimeout(thinkRef.current);
    setMessages((m) => [...m, { role: "user", text, at: new Date() }]);
    setDraft("");
    setIsMultiline(false); // bar shrinks back to one line on clear
    setIsRecentOpen(true);
    setIsThinking(true);
    thinkRef.current = setTimeout(() => {
      setIsThinking(false);
      setMessages((m) => [...m, { role: "ai", text: AI_REPLY, at: new Date() }]);
      closeRef.current = setTimeout(
        () => setIsRecentOpen(false),
        RECENT_CHAT_AUTOCLOSE_MS,
      );
    }, 1300);
  };

  const openHistory = () => {
    // Hand control to the full chat: smoothly close the recent popover (the
    // inline bar disables itself while the full chat is open).
    clearTimeout(closeRef.current);
    clearTimeout(thinkRef.current);
    setIsThinking(false);
    setIsRecentOpen(false);
    setIsHistoryOpen(true);
  };

  // Send from the bar docked inside the full chat: append to the same thread
  // (so it shows in the transcript) with a brief typing indicator.
  const sendInHistory = () => {
    const text = historyDraft.trim();
    if (!text) return;
    clearTimeout(thinkRef.current);
    setMessages((m) => [...m, { role: "user", text, at: new Date() }]);
    setHistoryDraft("");
    setHistoryThinking(true);
    thinkRef.current = setTimeout(() => {
      setHistoryThinking(false);
      setMessages((m) => [...m, { role: "ai", text: AI_REPLY, at: new Date() }]);
    }, 1300);
  };

  // Drag-to-resize from the panel's inner corner (the one opposite its anchor).
  // Which way a drag grows the panel depends on which edges are pinned.
  const onResizeStart = (e: React.PointerEvent) => {
    e.preventDefault();
    const panel = panelRef.current;
    if (!panel) return;
    const start = panel.getBoundingClientRect();
    const frame = (panel.parentElement as HTMLElement).getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const growsFromLeft = placement.endsWith("right"); // handle on the left edge
    const growsFromTop = placement.startsWith("bottom"); // handle on the top edge
    const onMove = (ev: PointerEvent) => {
      const w = start.width + (growsFromLeft ? startX - ev.clientX : ev.clientX - startX);
      const h = start.height + (growsFromTop ? startY - ev.clientY : ev.clientY - startY);
      setSize({
        w: Math.max(MIN_CHAT_W, Math.min(w, frame.width - 32)),
        h: Math.max(MIN_CHAT_H, Math.min(h, frame.height - 32)),
      });
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  // A couple of seeded older turns (yesterday). Built from real Dates with
  // seconds so they sort deterministically alongside the live messages. In
  // state so "Delete history" can clear them along with the live messages.
  const [seeded, setSeeded] = useState<ChatMsg[]>(() => [
    {
      role: "ai",
      text: "Welcome back! Here's where we left off.",
      at: new Date(2026, 5, 7, 9, 41, 8),
    },
    {
      role: "user",
      text: "Remind me how theming works.",
      at: new Date(2026, 5, 7, 9, 42, 2),
    },
    {
      role: "ai",
      text: "Brands are token objects you pass to ThemeProvider.",
      at: new Date(2026, 5, 7, 9, 42, 40),
    },
  ]);
  // Sort by full timestamp so the newest is always last (and surfaced on open).
  const fullHistory = [...seeded, ...messages].sort(
    (a, b) => a.at.getTime() - b.at.getTime(),
  );

  // Wipe the whole conversation (seeded + live), leaving an empty transcript.
  const clearHistory = () => {
    clearTimeout(thinkRef.current);
    setHistoryThinking(false);
    setSeeded([]);
    setMessages([]);
  };

  const renderMsg = (m: ChatMsg, i: number) => (
    <div
      key={i}
      className={`gp-ai-msg gp-ai-msg--${m.role === "user" ? "user" : "bot"}`}
    >
      {m.text}
      <time className="gp-ai-msg__time" dateTime={m.at.toISOString()}>
        {stampOf(m.at)}
      </time>
    </div>
  );

  const typingDots = (
    <div className="gp-ai-msg gp-ai-msg--bot">
      <span className="gp-ai-dots" aria-label={labels.thinking}>
        <span />
        <span />
        <span />
      </span>
    </div>
  );

  // Header search box — filters the transcript to matching turns. Shared by
  // the floating panel header and the modal.
  const searchBox = (
    <SearchInput
      className="gp-ai-fullchat__search"
      placeholder={labels.searchPlaceholder}
      aria-label={labels.searchPlaceholder}
      value={searchQuery}
      onChange={(_e, value) => setSearchQuery(value)}
      onClear={() => setSearchQuery("")}
    />
  );

  // The full-chat window — transcript + docked bar — shared by the floating
  // panel (desktop) and the modal (mobile).
  const chatWindow = (modal: boolean) => {
    const q = searchQuery.trim().toLowerCase();
    const shown = q
      ? fullHistory.filter((m) => m.text.toLowerCase().includes(q))
      : fullHistory;
    return (
      <div
        className={`gp-ai-chatwindow${modal ? " gp-ai-chatwindow--modal" : ""}`}
      >
        <div className="gp-ai-chatwindow__transcript" ref={setHistoryBody}>
          {shown.map(renderMsg)}
          {!q && historyThinking && typingDots}
          {shown.length === 0 && !(!q && historyThinking) && (
            <p className="gp-ai-chatwindow__empty">
              {q ? "No matching messages." : "No messages yet."}
            </p>
          )}
        </div>
        <div
          className={`gp-ai-borderbar gp-ai-borderbar--grow${
            historyThinking ? " is-thinking" : ""
          }`}
        >
          <textarea
            rows={1}
            placeholder={labels.placeholder}
            aria-label={labels.placeholder}
            className="gp-ai-borderbar__input gp-ai-borderbar__textarea"
            value={historyDraft}
            onChange={(e) => setHistoryDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendInHistory();
              }
            }}
          />
          <Button
            variant="plain"
            aria-label={labels.send}
            icon={<PaperPlaneIcon />}
            className="gp-ai-borderbar__send"
            onClick={sendInHistory}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="gp-ai-stage">
      {/* Transient short-term chat, anchored just above the bar. */}
      <div
        className={`gp-ai-recent${isRecentOpen ? " is-open" : ""}`}
        aria-live="polite"
      >
        <div className="gp-ai-recent__head">
          <span className="gp-ai-recent__title">{labels.recentTitle}</span>
          <Button
            variant="link"
            isInline
            icon={<HistoryIcon />}
            onClick={openHistory}
          >
            {labels.chatLink}
          </Button>
        </div>
        <div className="gp-ai-recent__body" ref={recentBodyRef}>
          {messages.map(renderMsg)}
          {isThinking && typingDots}
        </div>
      </div>

      {/* The bar; disabled + greyed only while the full chat has taken over.
          A textarea (not input) so it auto-grows with long messages, then
          caps + scrolls. */}
      <div
        ref={barRef}
        className={`gp-ai-borderbar gp-ai-borderbar--grow${
          isHistoryOpen ? " is-disabled" : ""
        }${isMultiline ? " is-multiline" : ""}${
          isThinking ? " is-thinking" : ""
        }`}
      >
        <textarea
          rows={1}
          placeholder={labels.placeholder}
          aria-label={labels.placeholder}
          className="gp-ai-borderbar__input gp-ai-borderbar__textarea"
          value={draft}
          disabled={isHistoryOpen}
          onChange={(e) => {
            setDraft(e.target.value);
            // The textarea has already auto-sized (field-sizing); if the
            // bar grew past a single line, soften the corners.
            setIsMultiline(!!barRef.current && barRef.current.offsetHeight > 56);
          }}
          onKeyDown={(e) => {
            // Enter sends; Shift+Enter inserts a newline (the textarea grows).
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
        />
        <Button
          variant="plain"
          aria-label={labels.send}
          icon={<PaperPlaneIcon />}
          className="gp-ai-borderbar__send"
          isDisabled={isHistoryOpen}
          onClick={send}
        />
        <Button
          variant="plain"
          aria-label={labels.expand}
          icon={<ExpandIcon />}
          className="gp-ai-borderbar__send"
          isDisabled={isHistoryOpen}
          onClick={openHistory}
        />
      </div>

      {/* Full chat — floating panel on desktop, anchored to `placement`,
          repositionable (move menu) and resizable (inner-corner drag). */}
      {isHistoryOpen && !isMobile && (
        <div
          ref={panelRef}
          className={`gp-ai-fullchat gp-ai-fullchat--${placement}`}
          role="dialog"
          aria-label={labels.chatHeader}
          style={size ? { inlineSize: size.w, blockSize: size.h } : undefined}
        >
          {/* Drag handle on the corner opposite the anchor. */}
          <div
            className="gp-ai-fullchat__resize"
            aria-hidden="true"
            onPointerDown={onResizeStart}
          />
          <div className="gp-ai-fullchat__head">
            <div className="gp-ai-fullchat__headrow">
              <span className="gp-ai-fullchat__title">{labels.chatHeader}</span>
              <div className="gp-ai-fullchat__actions">
                <Dropdown
                  isOpen={optionsOpen}
                  onOpenChange={(open: boolean) => setOptionsOpen(open)}
                  onSelect={() => setOptionsOpen(false)}
                  popperProps={{ position: "right" }}
                  toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                    // Icon via the `icon` prop (not children) so it has no
                    // __text wrapper and the DS renders this plain kebab as a
                    // circle via --gp-radius-button.
                    <MenuToggle
                      ref={toggleRef}
                      variant="plain"
                      aria-label={labels.optionsLabel}
                      isExpanded={optionsOpen}
                      onClick={() => setOptionsOpen((o) => !o)}
                      icon={<EllipsisVIcon />}
                    />
                  )}
                >
                  <DropdownList>
                    {PLACEMENTS.map((p) => (
                      <DropdownItem
                        key={p}
                        isSelected={p === placement}
                        onClick={() => setPlacement(p)}
                      >
                        {PLACEMENT_LABELS[p]}
                      </DropdownItem>
                    ))}
                    <Divider component="li" />
                    <DropdownItem
                      key="delete"
                      isDanger
                      onClick={clearHistory}
                    >
                      {labels.deleteHistory}
                    </DropdownItem>
                    <DropdownItem key="reset" isDanger onClick={resetLayout}>
                      {labels.reset}
                    </DropdownItem>
                  </DropdownList>
                </Dropdown>
                <Button
                  variant="plain"
                  aria-label={labels.close}
                  icon={<TimesIcon />}
                  onClick={() => setIsHistoryOpen(false)}
                />
              </div>
            </div>
            {searchBox}
          </div>
          {chatWindow(false)}
        </div>
      )}

      {/* Full chat — modal on narrow viewports (content mounts only when open). */}
      {isMobile && (
        <Modal
          variant="small"
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          className="gp-ai-chatmodal"
        >
          <ModalHeader title={labels.chatHeader} />
          <ModalBody>
            <div className="gp-ai-modalbody">
              {searchBox}
              {chatWindow(true)}
            </div>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
}

// Stage + transient "recent chat" popover (slides up above the bar) + the
// animated typing dots, plus the full-chat floating panel.
const recentChatCss = `
  .gp-ai-stage {
    position: relative;
    /* Tall enough to show the (now much taller) full-chat panel floating with
       comfortable margins; represents the app canvas the assistant sits over. */
    block-size: 44rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 1.5rem;
  }
  .gp-ai-recent {
    position: absolute;
    /* sits just above the bar: stage pad (1.5rem) + bar (3rem) + gap (0.75rem) */
    inset-block-end: 5.25rem;
    left: 50%;
    inline-size: calc(100% - 3rem);
    max-inline-size: 34rem;
    max-block-size: 14rem;
    display: flex;
    flex-direction: column;
    border-radius: var(--gp-radius-popover, 12px);
    background: var(--pf-t--global--background--color--primary--default);
    border: 1px solid var(--gp-color-border-default, rgba(0, 0, 0, 0.15));
    box-shadow: var(--gp-shadow-popover, 0 6px 16px rgba(0, 0, 0, 0.18));
    overflow: hidden;
    transform: translateX(-50%) translateY(10px);
    opacity: 0;
    pointer-events: none;
    transition: transform 220ms ease, opacity 220ms ease;
  }
  .gp-ai-recent.is-open {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
  .gp-ai-recent__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.4rem 0.5rem 0.4rem 0.75rem;
    border-block-end: 1px solid var(--gp-color-border-default, rgba(0, 0, 0, 0.12));
  }
  .gp-ai-recent__title {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--gp-color-text-subtle, currentColor);
  }
  /* Drive the History link from the brand link token (PF6's link variant
     otherwise uses its own default blue, which doesn't follow the brand). */
  .gp-ai-recent__head .pf-v6-c-button.pf-m-link {
    color: var(--gp-color-text-link, currentColor);
  }
  .gp-ai-recent__body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem;
    overflow-y: auto;
  }
  .gp-ai-dots {
    display: inline-flex;
    gap: 4px;
    align-items: center;
  }
  .gp-ai-dots > span {
    inline-size: 6px;
    block-size: 6px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.35;
    animation: gp-ai-dot 1.2s infinite ease-in-out;
  }
  .gp-ai-dots > span:nth-child(2) { animation-delay: 0.18s; }
  .gp-ai-dots > span:nth-child(3) { animation-delay: 0.36s; }
  @keyframes gp-ai-dot {
    0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
    30% { opacity: 1; transform: translateY(-3px); }
  }
  @media (prefers-reduced-motion: reduce) {
    .gp-ai-dots > span { animation: none; opacity: 0.6; }
    .gp-ai-recent { transition: opacity 220ms ease; }
  }

  /* Auto-expanding bar: a textarea that grows with content (field-sizing),
     then caps and scrolls. The wrapper switches from a fixed height to a
     min-height so it grows with the textarea. */
  .gp-ai-borderbar--grow {
    block-size: auto;
    min-block-size: var(--pf-t--global--spacer--2xl, 3rem);
  }
  /* When the bar grows to multiple lines, soften a *pill* corner to a rounded
     rectangle (a stadium shape reads oddly tall). min() with the card radius
     means a pill (huge radius) clamps to the card radius, while an already-
     hard/rectangular brand radius stays as-is. Reverts when the bar clears. */
  .gp-ai-borderbar--grow.is-multiline {
    border-radius: min(
      var(--gp-radius-button, 9999px),
      var(--gp-radius-card, 0.75rem)
    );
  }
  .gp-ai-borderbar__textarea {
    block-size: auto;
    field-sizing: content;     /* auto-grow to content height */
    resize: none;
    max-block-size: 6rem;      /* then cap + scroll */
    overflow-y: auto;
    line-height: 1.4;
    padding-block: 0.1rem;
  }

  /* ── Glass support ─────────────────────────────────────────────────
     Frost the message bars (chrome fill via the glass surface token). The
     recent popover, full-chat panel and modal get the glass fill + a faint
     glass edge in the rule below. */
  .pf-v6-theme-glass .gp-ai-chatbar,
  .pf-v6-theme-glass .gp-ai-borderbar {
    background: var(--gp-glass-surface-fill);
    backdrop-filter: var(--gp-glass-surface-blur) saturate(140%);
    -webkit-backdrop-filter: var(--gp-glass-surface-blur) saturate(140%);
  }
  /* Glass: route surfaces through the canonical glass tokens so the fill,
     blur AND border all read as glass (not an opaque primary mix). */
  .pf-v6-theme-glass .gp-ai-recent,
  .pf-v6-theme-glass .gp-ai-fullchat,
  .pf-v6-theme-glass .gp-ai-chatmodal.pf-v6-c-modal-box,
  .pf-v6-theme-glass .gp-ai-chatmodal .pf-v6-c-modal-box {
    /* Surface fill via the canonical glass token (not an opaque primary mix);
       a faint, theme-adaptive edge so the pane reads as frosted glass. The DS
       glass border token defaults to transparent, so set a light highlight. */
    --gp-glass-border-color: color-mix(in srgb, currentColor 16%, transparent);
    background: var(--gp-glass-surface-fill);
    border-color: var(--gp-glass-border-color);
    backdrop-filter: var(--gp-glass-surface-blur, blur(16px)) saturate(140%);
    -webkit-backdrop-filter: var(--gp-glass-surface-blur, blur(16px)) saturate(140%);
  }
  /* Internal dividers + the search field track the glass border / fill too. */
  .pf-v6-theme-glass .gp-ai-fullchat__head,
  .pf-v6-theme-glass .gp-ai-recent__head {
    border-block-end-color: color-mix(in srgb, currentColor 14%, transparent);
  }
  .pf-v6-theme-glass .gp-ai-fullchat__search .pf-v6-c-text-input-group,
  .pf-v6-theme-glass .gp-ai-fullchat__search .pf-v6-c-text-input-group__main {
    background: transparent;
  }

  /* ── Full chat: floating panel (desktop) ───────────────────────────
     Anchored to a corner of the app frame, always inset so it never sits
     flush in the corner. On narrow viewports the panel is swapped for a
     modal (see the component). */
  .gp-ai-fullchat {
    position: absolute;
    z-index: 5;
    display: flex;
    flex-direction: column;
    inline-size: min(22rem, calc(100% - 2rem));
    /* The full conversation gets a tall default — roughly double the prior
       height and well beyond the transient recent-chat popover (max 14rem).
       Clamped to the frame so it never overflows on small canvases. */
    block-size: min(48rem, calc(100% - 2rem));
    border-radius: var(--gp-radius-popover, 12px);
    background: var(--pf-t--global--background--color--primary--default);
    border: 1px solid var(--gp-color-border-default, rgba(0, 0, 0, 0.15));
    box-shadow: var(--gp-shadow-popover, 0 6px 16px rgba(0, 0, 0, 0.18));
    overflow: hidden;
    animation: gp-ai-fullchat-in 200ms ease;
  }
  /* Placement — 1rem inset from the chosen edges (never in the corner). */
  .gp-ai-fullchat--top-left { inset-block-start: 1rem; inset-inline-start: 1rem; }
  .gp-ai-fullchat--top-right { inset-block-start: 1rem; inset-inline-end: 1rem; }
  .gp-ai-fullchat--bottom-left { inset-block-end: 1rem; inset-inline-start: 1rem; }
  .gp-ai-fullchat--bottom-right { inset-block-end: 1rem; inset-inline-end: 1rem; }
  .gp-ai-fullchat__head {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.25rem 0.5rem 0.5rem 0.875rem;
    border-block-end: 1px solid var(--gp-color-border-default, rgba(0, 0, 0, 0.12));
  }
  .gp-ai-fullchat__headrow {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .gp-ai-fullchat__title {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--gp-color-text-regular, currentColor);
  }
  .gp-ai-fullchat__actions {
    display: flex;
    align-items: center;
    gap: 0.125rem;
  }
  /* Search box sits in the header (and at the top of the modal body). */
  .gp-ai-fullchat__search {
    inline-size: 100%;
  }
  .gp-ai-modalbody {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .gp-ai-chatwindow__empty {
    margin: 0;
    padding-block: 0.5rem;
    text-align: center;
    color: var(--gp-color-text-subtle, currentColor);
    font-size: 0.8125rem;
  }
  /* Drag-to-resize grip on the corner opposite the anchor (the inner corner).
     An L-shaped bracket hints the direction; the cursor reinforces it. */
  .gp-ai-fullchat__resize {
    position: absolute;
    inline-size: 16px;
    block-size: 16px;
    z-index: 6;
    touch-action: none;
  }
  .gp-ai-fullchat__resize::after {
    content: "";
    position: absolute;
    inset: 3px;
    opacity: 0.4;
    color: var(--gp-color-text-subtle, currentColor);
  }
  .gp-ai-fullchat--bottom-right .gp-ai-fullchat__resize {
    inset-block-start: 2px; inset-inline-start: 2px; cursor: nwse-resize;
  }
  .gp-ai-fullchat--bottom-right .gp-ai-fullchat__resize::after {
    border-block-start: 2px solid currentColor; border-inline-start: 2px solid currentColor;
  }
  .gp-ai-fullchat--top-left .gp-ai-fullchat__resize {
    inset-block-end: 2px; inset-inline-end: 2px; cursor: nwse-resize;
  }
  .gp-ai-fullchat--top-left .gp-ai-fullchat__resize::after {
    border-block-end: 2px solid currentColor; border-inline-end: 2px solid currentColor;
  }
  .gp-ai-fullchat--bottom-left .gp-ai-fullchat__resize {
    inset-block-start: 2px; inset-inline-end: 2px; cursor: nesw-resize;
  }
  .gp-ai-fullchat--bottom-left .gp-ai-fullchat__resize::after {
    border-block-start: 2px solid currentColor; border-inline-end: 2px solid currentColor;
  }
  .gp-ai-fullchat--top-right .gp-ai-fullchat__resize {
    inset-block-end: 2px; inset-inline-start: 2px; cursor: nesw-resize;
  }
  .gp-ai-fullchat--top-right .gp-ai-fullchat__resize::after {
    border-block-end: 2px solid currentColor; border-inline-start: 2px solid currentColor;
  }
  @keyframes gp-ai-fullchat-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    .gp-ai-fullchat { animation: none; }
  }
`;

export const Chat: StoryObj = {
  render: () => (
    <>
      <style>{chatBarCss}</style>
      <style>{aiBorderCss}</style>
      <style>{chatWindowCss}</style>
      <style>{recentChatCss}</style>
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
            <strong>Example 3</strong> builds it into a full{" "}
            <strong>AI&nbsp;Assistance</strong> experience — a transient
            recent-chat popover plus a repositionable, resizable, searchable
            full-conversation panel (a modal on small screens). Brand tokens
            drive every colour, so all of it reflows per brand and across light
            / dark / glass. Type a message and press <strong>Enter</strong> or
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
          title="Example 3 — recent chat + full chat"
          description="Sending drops the message into a transient “recent chat” popover that slides up just above the bar (the bar clears): you see your message, animated typing dots, then the reply, with the thread auto-scrolling to the newest line. The bar is a textarea that auto-grows for long messages, then caps and scrolls. The popover auto-dismisses after a shared timer (RECENT_CHAT_AUTOCLOSE_MS); send again before then and the message stacks into the same short-term thread (resetting the timer). The History link (or the bar's expand icon) hands off to the full conversation — a floating panel anchored to a configurable corner (here bottom-right, always inset from the corner), opened to the most recent message and with its own docked message bar. The panel header has a search box that filters the conversation. The panel is repositionable (the ⋮ menu moves it between corners, with a red Reset at the bottom) and resizable (drag the inner corner). On narrow viewports it is replaced by a modal. Position + size live in component state, so they persist while open but reset to the defaults on reload — in an app you'd persist them to localStorage (see Usage). Every label is prop-driven; messages carry second-precision timestamps so they sequence deterministically. All surfaces frost under the glass theme."
        >
          {/* App-frame: the floating chat panel is positioned within this
              bordered box; overflow:hidden clips it to the rounded corners. */}
          <div
            className="gp-ai-frame"
            style={{
              borderRadius: "var(--gp-radius-card, 16px)",
              background: "var(--gp-color-bg-secondary-default)",
              border: "1px solid var(--gp-color-border-default)",
              overflow: "hidden",
            }}
          >
            <RecentChatBar placement="bottom-right" persist={false} />
          </div>
        </Section>

        <Section
          title="Usage"
          description="The bar is a flat div + input + button (kept minimal so the input stays straightforwardly interactive); the two send-state treatments differ only in CSS — a box-shadow glow pulse (Example 1) vs. a rotating conic-gradient border (Example 2). Example 3 wraps the bar in a small stateful component whose copy, full-chat placement and layout persistence are all prop-driven."
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
            <CodeBlock>{`// Example 3 — every label is prop-driven (localise / re-word without
// forking), and the full chat's corner is configurable. Below the
// "sm" breakpoint it opens as a modal instead of the floating panel.
<RecentChatBar
  placement="bottom-right"          // | top-left | top-right | bottom-left
  labels={{
    placeholder: "Ask the assistant…",
    recentTitle: "Recent chat",
    chatLink: "History",
    chatHeader: "AI Assistance",
    send: "Send",
    expand: "Open AI Assistance",
    close: "Close AI Assistance",
    thinking: "AI is thinking",
    optionsLabel: "Move AI Assistance",
    reset: "Reset size & position",
    searchPlaceholder: "Search the conversation",
  }}
/>

// Messages keep a full Date (with seconds) for deterministic ordering;
// the label omits seconds:
type ChatMsg = { role: "user" | "ai"; text: string; at: Date };`}</CodeBlock>
          </Card>
          <Card>
            <CodeBlock>{`// Remembering the user's chosen corner + panel size is opt-in via the
// 'persist' prop. It's OFF in this story, so the panel always opens at
// the default placement + size (and the ⋮ menu's "Reset" clears any
// runtime changes back to those defaults).

// Off (this story) — resets on every reload:
<RecentChatBar persist={false} />

// On — writes corner + size to localStorage under persistKey, so they
// survive reloads:
<RecentChatBar persist persistKey="ai-assistance:layout" />`}</CodeBlock>
          </Card>
          </div>
        </Section>

        <Section
          title="RecentChatBar props"
          description="Example 3's component. Behaviour is fixed; copy, placement and persistence are configurable."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
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
                      "Remember the chosen corner + panel size across reloads (localStorage). Default: false (always opens at the defaults).",
                  },
                  {
                    name: "persistKey",
                    type: "string",
                    description:
                      "localStorage key prefix used when persist is on. Default: \"gp-ai-assistance\".",
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
                The recent-chat popover is an <code>aria-live=&quot;polite&quot;</code>{" "}
                region, so new turns are announced as they stream in.
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
