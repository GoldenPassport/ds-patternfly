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
  /**
   * Produce the assistant's reply to a sent message — wire your backend
   * here. Return the reply text (or a promise of it); the thinking
   * indicator shows until it resolves. When omitted, a canned demo reply
   * answers after a short delay.
   */
  onSend?: (text: string) => Promise<string> | string;
  /** Seed the conversation (e.g. restored history). Defaults to empty. */
  initialMessages?: ChatMsg[];
};

export function AiAssistant({
  overlayContainer,
  placement: placementProp = "bottom-right",
  labels: labelOverrides,
  persist = false,
  persistKey = "gp-ai-assistance",
  onSend,
  initialMessages,
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

  // Resolve a reply via `onSend` (app-provided, possibly async) or the canned
  // demo timeout. Pending replies are dropped when superseded or cancelled
  // (`cancelReply`) — promises can't be aborted, so a sequence guard ignores
  // stale resolutions.
  const replySeqRef = useRef(0);
  const requestReply = (
    text: string,
    deliver: (reply: string) => void,
    onError: () => void,
  ) => {
    const seq = ++replySeqRef.current;
    const fresh = (fn: () => void) => {
      if (replySeqRef.current === seq) fn();
    };
    if (onSend) {
      Promise.resolve()
        .then(() => onSend(text))
        .then(
          (reply) => fresh(() => deliver(reply)),
          () => fresh(onError),
        );
    } else {
      thinkRef.current = setTimeout(() => deliver(AI_REPLY), 1300);
    }
  };
  const cancelReply = () => {
    replySeqRef.current++;
    clearTimeout(thinkRef.current);
  };

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    clearTimeout(closeRef.current);
    cancelReply();
    setMessages((m) => [...m, { role: "user", text, at: new Date() }]);
    setDraft("");
    setIsMultiline(false);
    setIsRecentOpen(true);
    setIsThinking(true);
    requestReply(
      text,
      (reply) => {
        setIsThinking(false);
        setMessages((m) => [...m, { role: "ai", text: reply, at: new Date() }]);
        closeRef.current = setTimeout(
          () => setIsRecentOpen(false),
          RECENT_CHAT_AUTOCLOSE_MS,
        );
      },
      () => setIsThinking(false),
    );
  };

  const openHistory = () => {
    clearTimeout(closeRef.current);
    cancelReply();
    setIsThinking(false);
    setIsRecentOpen(false);
    setIsHistoryOpen(true);
  };

  const sendInHistory = () => {
    const text = historyDraft.trim();
    if (!text) return;
    cancelReply();
    setMessages((m) => [...m, { role: "user", text, at: new Date() }]);
    setHistoryDraft("");
    setHistoryThinking(true);
    requestReply(
      text,
      (reply) => {
        setHistoryThinking(false);
        setMessages((m) => [...m, { role: "ai", text: reply, at: new Date() }]);
      },
      () => setHistoryThinking(false),
    );
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

  // Seeded older turns from `initialMessages` (e.g. restored history). In
  // state so "Delete history" can clear them along with the live messages.
  const [seeded, setSeeded] = useState<ChatMsg[]>(() => initialMessages ?? []);
  const fullHistory = [...seeded, ...messages].sort(
    (a, b) => a.at.getTime() - b.at.getTime(),
  );

  const clearHistory = () => {
    cancelReply();
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

