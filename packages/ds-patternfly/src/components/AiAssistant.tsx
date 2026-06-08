import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

/**
 * AiAssistant — a brandable AI prompt bar plus the surfaces it grows into:
 * a transient "recent chat" popover, and a repositionable, resizable,
 * searchable full-conversation panel (a modal on narrow viewports).
 *
 * It renders the bar *inline* (so it can be dropped into any slot — a demo
 * stage, a page footer, …) and PORTALS its overlays into `overlayContainer`,
 * a `position: relative` element they anchor to. One component, one source of
 * state, two placements (the bar and the overlays can live in different parts
 * of the DOM). All copy is prop-driven via `labels`; the full-chat corner via
 * `placement`; optional layout persistence (localStorage) via `persist`.
 */

// How long the transient recent-chat popover lingers after the last activity
// before auto-dismissing. Reset on every new send.
const RECENT_CHAT_AUTOCLOSE_MS = 6000;

const AI_REPLY =
  "Got it — here's a quick reply. Open History for the whole conversation.";

// A message carries its full timestamp (with seconds) so turns sort
// deterministically and the latest can be surfaced on open; the display label
// omits seconds.
export type ChatMsg = { role: "user" | "ai"; text: string; at: Date };

// Date + wall-clock label (e.g. "Jun 8, 9:41 AM"), runtime-locale formatted.
const stampOf = (d: Date) =>
  d.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

// All user-facing copy is prop-driven so the component can be localised /
// re-worded without forking it.
export type ChatLabels = {
  placeholder: string;
  recentTitle: string;
  chatLink: string;
  chatHeader: string;
  send: string;
  expand: string;
  close: string;
  thinking: string;
  optionsLabel: string;
  reset: string;
  deleteHistory: string;
  searchPlaceholder: string;
};

export const DEFAULT_CHAT_LABELS: ChatLabels = {
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
export type ChatPlacement =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

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

// Fail-safe localStorage helpers (no-op if storage is unavailable, e.g. SSR /
// private mode). Used only when persistence is enabled.
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

// Snap a scroll container to its bottom. The panel mounts hidden and then
// slides + widens open, so its content starts at zero height and grows (text
// rewrapping) across the transition — a single pin lands on a stale height.
// Re-pinning every frame for the transition's duration snaps to the latest
// bottom each frame. Safe to call with a null node (no-op).
function pinToBottom(el: HTMLElement | null) {
  if (!el) return;
  let frame = 0;
  const tick = () => {
    el.scrollTop = el.scrollHeight;
    if (frame++ < 40) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export type AiAssistantProps = {
  /**
   * Positioned (`position: relative`) element the overlays portal into and
   * anchor to. When omitted the overlays render inline next to the bar.
   */
  overlayContainer?: HTMLElement | null;
  /** Default corner the full-chat panel anchors to on desktop. */
  placement?: ChatPlacement;
  /** Override any user-facing copy (placeholder, headers, aria labels…). */
  labels?: Partial<ChatLabels>;
  /**
   * Remember the chosen corner + panel size across reloads (localStorage).
   * Off by default — when off, the panel always opens at the defaults.
   */
  persist?: boolean;
  /** localStorage key prefix used when `persist` is on. */
  persistKey?: string;
};

export function AiAssistant({
  overlayContainer,
  placement: placementProp = "bottom-right",
  labels: labelOverrides,
  persist = false,
  persistKey = "gp-ai-assistance",
}: AiAssistantProps) {
  const labels = { ...DEFAULT_CHAT_LABELS, ...labelOverrides };
  const isMobile = useIsMobile();

  const placeKey = `${persistKey}:placement`;
  const sizeKey = `${persistKey}:size`;

  // Placement + size are adjustable at runtime (move menu + drag-to-resize).
  // When `persist` is on they're seeded from localStorage and written back;
  // when off they reset to the defaults on every reload.
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

  // The panel / modal only mounts its transcript when the chat opens, so this
  // ref callback fires exactly then — the reliable moment to snap to newest.
  const setHistoryBody = useCallback((node: HTMLDivElement | null) => {
    historyBodyRef.current = node;
    pinToBottom(node);
  }, []);

  useEffect(() => {
    if (isHistoryOpen) pinToBottom(historyBodyRef.current);
  }, [isHistoryOpen, messages, historyThinking]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    clearTimeout(closeRef.current);
    clearTimeout(thinkRef.current);
    setMessages((m) => [...m, { role: "user", text, at: new Date() }]);
    setDraft("");
    setIsMultiline(false);
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
    clearTimeout(closeRef.current);
    clearTimeout(thinkRef.current);
    setIsThinking(false);
    setIsRecentOpen(false);
    setIsHistoryOpen(true);
  };

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

  // Drag-to-resize from the panel's inner corner (opposite its anchor).
  const onResizeStart = (e: React.PointerEvent) => {
    e.preventDefault();
    const panel = panelRef.current;
    if (!panel) return;
    const start = panel.getBoundingClientRect();
    const frame = (panel.parentElement as HTMLElement).getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const growsFromLeft = placement.endsWith("right");
    const growsFromTop = placement.startsWith("bottom");
    const onMove = (ev: PointerEvent) => {
      const w =
        start.width + (growsFromLeft ? startX - ev.clientX : ev.clientX - startX);
      const h =
        start.height + (growsFromTop ? startY - ev.clientY : ev.clientY - startY);
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

  // A couple of seeded older turns (yesterday). In state so "Delete history"
  // can clear them along with the live messages.
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
  const fullHistory = [...seeded, ...messages].sort(
    (a, b) => a.at.getTime() - b.at.getTime(),
  );

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

  // The inline message bar — placed wherever <AiAssistant> is rendered.
  const bar = (
    <div
      ref={barRef}
      className={`gp-ai-borderbar gp-ai-borderbar--grow${
        isHistoryOpen ? " is-disabled" : ""
      }${isMultiline ? " is-multiline" : ""}${isThinking ? " is-thinking" : ""}`}
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
          setIsMultiline(!!barRef.current && barRef.current.offsetHeight > 56);
        }}
        onKeyDown={(e) => {
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
  );

  // The overlays — recent popover + full chat (panel on desktop, modal on
  // mobile). Portaled into `overlayContainer` so they anchor to it.
  const overlays = (
    <>
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

      {isHistoryOpen && !isMobile && (
        <div
          ref={panelRef}
          className={`gp-ai-fullchat gp-ai-fullchat--${placement}`}
          role="dialog"
          aria-label={labels.chatHeader}
          style={size ? { inlineSize: size.w, blockSize: size.h } : undefined}
        >
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
                    <DropdownItem key="delete" isDanger onClick={clearHistory}>
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
    </>
  );

  return (
    <>
      {bar}
      {overlayContainer ? createPortal(overlays, overlayContainer) : overlays}
    </>
  );
}

// All component styles (everything except the demo-only stage). Inject once
// per page (e.g. <style>{aiAssistantCss}</style>). The recent popover's
// vertical offset above the bar is the `--gp-ai-bar-offset` custom property
// (default 5.25rem) — override it on the overlay container to match the host
// layout (e.g. a page footer's height).
export const aiAssistantCss = `
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
    block-size: var(--pf-t--global--spacer--2xl, 3rem);
    inline-size: 100%;
    transition: box-shadow 150ms ease;
  }
  /* Handed off to the full chat: the controls carry the disabled attribute,
     and the vibrant AI border tones down to pale, surface-mixed theme colours
     rather than the bar just fading out. */
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
  /* A soft, misty halo in the focus-ring colour (the AI gradient border stays
     its resting 3px) — a diffuse glow rather than a hard outline. */
  .gp-ai-borderbar:focus-within {
    outline: none;
    box-shadow:
      0 0 8px 0 color-mix(in srgb, var(--gp-color-focus-ring, currentColor) 38%, transparent),
      0 0 18px 3px color-mix(in srgb, var(--gp-color-focus-ring, currentColor) 22%, transparent);
  }
  @media (prefers-reduced-motion: reduce) {
    .gp-ai-borderbar.is-thinking::before { animation: none; }
  }

  /* Auto-expanding bar: a textarea that grows with content, then caps + scrolls. */
  .gp-ai-borderbar--grow {
    block-size: auto;
    min-block-size: var(--pf-t--global--spacer--2xl, 3rem);
  }
  /* Multi-line: soften a *pill* corner to a rounded rectangle (min() clamps a
     pill to the card radius; an already-hard brand radius stays as-is). */
  .gp-ai-borderbar--grow.is-multiline {
    border-radius: min(
      var(--gp-radius-button, 9999px),
      var(--gp-radius-card, 0.75rem)
    );
  }
  .gp-ai-borderbar__textarea {
    block-size: auto;
    field-sizing: content;
    resize: none;
    max-block-size: 6rem;
    overflow-y: auto;
    line-height: 1.4;
    padding-block: 0.1rem;
  }

  /* ── Full-chat window (transcript + docked bar), shared by panel + modal ── */
  .gp-ai-chatwindow {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    min-block-size: 0;
  }
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
    flex: 1 1 auto;
    min-block-size: 0;
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
  .gp-ai-msg__time {
    display: block;
    margin-block-start: 0.25rem;
    font-size: 0.6875rem;
    line-height: 1;
    opacity: 0.65;
    text-align: end;
  }
  .gp-ai-chatwindow__empty {
    margin: 0;
    padding-block: 0.5rem;
    text-align: center;
    color: var(--gp-color-text-subtle, currentColor);
    font-size: 0.8125rem;
  }

  /* ── Transient recent-chat popover (slides up above the bar) ── */
  .gp-ai-recent {
    position: absolute;
    inset-block-end: var(--gp-ai-bar-offset, 5.25rem);
    left: 50%;
    inline-size: calc(100% - 3rem);
    max-inline-size: 34rem;
    max-block-size: 14rem;
    z-index: 5;
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
  /* Drive the History link from the brand link token. */
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

  /* ── Glass: route surfaces through the canonical glass tokens ── */
  .pf-v6-theme-glass .gp-ai-borderbar {
    background: var(--gp-glass-surface-fill);
    backdrop-filter: var(--gp-glass-surface-blur) saturate(140%);
    -webkit-backdrop-filter: var(--gp-glass-surface-blur) saturate(140%);
  }
  .pf-v6-theme-glass .gp-ai-recent,
  .pf-v6-theme-glass .gp-ai-fullchat,
  .pf-v6-theme-glass .gp-ai-chatmodal.pf-v6-c-modal-box,
  .pf-v6-theme-glass .gp-ai-chatmodal .pf-v6-c-modal-box {
    --gp-glass-border-color: color-mix(in srgb, currentColor 16%, transparent);
    background: var(--gp-glass-surface-fill);
    border-color: var(--gp-glass-border-color);
    backdrop-filter: var(--gp-glass-surface-blur, blur(16px)) saturate(140%);
    -webkit-backdrop-filter: var(--gp-glass-surface-blur, blur(16px)) saturate(140%);
  }
  .pf-v6-theme-glass .gp-ai-fullchat__head,
  .pf-v6-theme-glass .gp-ai-recent__head {
    border-block-end-color: color-mix(in srgb, currentColor 14%, transparent);
  }
  .pf-v6-theme-glass .gp-ai-fullchat__search .pf-v6-c-text-input-group,
  .pf-v6-theme-glass .gp-ai-fullchat__search .pf-v6-c-text-input-group__main {
    background: transparent;
  }

  /* ── Full chat: floating panel (desktop), anchored to a corner ── */
  .gp-ai-fullchat {
    position: absolute;
    z-index: 6;
    display: flex;
    flex-direction: column;
    inline-size: min(22rem, calc(100% - 2rem));
    block-size: min(48rem, calc(100% - 2rem));
    border-radius: var(--gp-radius-popover, 12px);
    background: var(--pf-t--global--background--color--primary--default);
    border: 1px solid var(--gp-color-border-default, rgba(0, 0, 0, 0.15));
    box-shadow: var(--gp-shadow-popover, 0 6px 16px rgba(0, 0, 0, 0.18));
    overflow: hidden;
    animation: gp-ai-fullchat-in 200ms ease;
  }
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
  .gp-ai-fullchat__search {
    inline-size: 100%;
  }
  .gp-ai-modalbody {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  /* Drag-to-resize grip on the corner opposite the anchor (the inner corner). */
  .gp-ai-fullchat__resize {
    position: absolute;
    inline-size: 16px;
    block-size: 16px;
    z-index: 7;
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
