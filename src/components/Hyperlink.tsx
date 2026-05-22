import {
  forwardRef,
  type AnchorHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from "react";

export interface HyperlinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> {
  /** The link text. Required — anchors must have an accessible name. */
  children: ReactNode;
  /** Destination URL. Required. */
  href: string;
  /**
   * Where to open the link. When set to `"_blank"`, the component automatically
   * adds `rel="noopener noreferrer"` for safety and an icon + screen reader
   * announcement for the new-tab behaviour.
   */
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  /**
   * Custom rel value. Merged with security defaults when `target="_blank"`.
   * Pass `"noopener noreferrer"` yourself if you want to suppress the auto-merge.
   */
  rel?: string;
  /**
   * Visible style. `"default"` underlines on hover; `"underline"` always
   * underlines. Use `"underline"` for inline links inside prose so they stand
   * out from surrounding text without colour alone.
   */
  variant?: "default" | "underline";
  /**
   * Drop the new-tab icon even when `target="_blank"`. Use sparingly — the
   * icon is the visual signal that the link will open elsewhere. The screen
   * reader announcement still fires.
   */
  hideExternalIcon?: boolean;
  /**
   * Translated string read by assistive tech when the link opens in a new
   * tab. Default `"(opens in a new tab)"`. Provided as a prop so consumer
   * apps can localise it.
   */
  newTabLabel?: string;
}

const baseStyle: CSSProperties = {
  // Anchor colour now flows from the theme dial (`--gp-anchor-color`),
  // which the brand root sets to the focus-ring colour by default.
  // Fallback chain keeps any consumer that still defines the legacy
  // `--gp-color-text-link` working.
  color: "var(--gp-anchor-color, var(--gp-color-text-link, #0066cc))",
  // Underline at rest — link colour alone may not provide 3:1 contrast
  // against surrounding text in every brand. WCAG 1.4.1 / axe's
  // link-in-text-block rule passes either via colour contrast OR a
  // non-colour distinguisher (underline). Underline by default works in
  // every brand without per-brand contrast tuning.
  textDecoration: "underline",
  textUnderlineOffset: "0.2em",
  fontFamily: "var(--gp-font-body, var(--gp-font-family, inherit))",
};

const underlineStyle: CSSProperties = {
  textDecoration: "underline",
  textUnderlineOffset: "0.2em",
};

const externalIconStyle: CSSProperties = {
  display: "inline-block",
  marginInlineStart: "0.25em",
  width: "0.85em",
  height: "0.85em",
  verticalAlign: "-0.1em",
  fill: "currentColor",
};

/**
 * Inline-friendly hyperlink wrapping a real `<a>`. Use it for navigation
 * (changing URL, jumping between views, opening external sites). For an
 * action that doesn't change URL (open dialog, save, delete), use `Button`
 * with `variant="link"` instead.
 *
 * Picks up the brand's blue link tokens (`--gp-color-text-link` /
 * `--gp-color-text-link-hover`) so colour matches the rest of the link
 * surface across the app.
 *
 * When `target="_blank"`:
 *  - Appends `rel="noopener noreferrer"` for security (unless explicitly
 *    overridden via `rel`).
 *  - Renders a small external-link icon next to the label (suppress with
 *    `hideExternalIcon`).
 *  - Adds a screen reader-only "(opens in a new tab)" announcement so AT
 *    users hear the navigation behaviour.
 */
export const Hyperlink = forwardRef<HTMLAnchorElement, HyperlinkProps>(
  function Hyperlink(
    {
      children,
      href,
      target,
      rel,
      variant = "default",
      hideExternalIcon = false,
      newTabLabel = "(opens in a new tab)",
      style,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) {
    const isExternal = target === "_blank";
    // Merge security defaults with caller-provided rel; de-dupe tokens.
    const mergedRel = isExternal
      ? Array.from(new Set([...(rel ?? "").split(/\s+/), "noopener", "noreferrer"]))
          .filter(Boolean)
          .join(" ")
      : rel;

    const composedStyle: CSSProperties = {
      ...baseStyle,
      ...(variant === "underline" ? underlineStyle : null),
      ...style,
    };

    // Hover/focus styling without a stylesheet — swap the colour token via
    // inline style. Underline is always on (a11y baseline) so no decoration
    // toggle here — only the colour shifts on interaction.
    const setHoverColor = (el: HTMLAnchorElement) => {
      el.style.color = "var(--gp-color-text-link-hover, #004080)";
    };
    const resetColor = (el: HTMLAnchorElement) => {
      el.style.color = composedStyle.color as string;
    };

    return (
      <a
        ref={ref}
        href={href}
        {...(isExternal ? { target: "_blank" } : target ? { target } : {})}
        {...(mergedRel ? { rel: mergedRel } : {})}
        style={composedStyle}
        onMouseEnter={(e) => {
          setHoverColor(e.currentTarget);
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          resetColor(e.currentTarget);
          onMouseLeave?.(e);
        }}
        onFocus={(e) => {
          setHoverColor(e.currentTarget);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          resetColor(e.currentTarget);
          onBlur?.(e);
        }}
        {...rest}
      >
        {children}
        {isExternal && !hideExternalIcon ? (
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 16 16"
            style={externalIconStyle}
          >
            <path d="M9 2h5v5h-1.5V4.56L7.06 10 6 8.94 11.44 3.5H9V2zM3 4h4v1.5H4.5v6h6V9H12v4H3V4z" />
          </svg>
        ) : null}
        {isExternal ? (
          <span
            // Visually hidden but readable by AT — same technique as PF6's
            // pf-v6-u-screen-reader utility (which we bundle), but inlined
            // here so the component works even if the consumer hasn't
            // imported the lib's stylesheet.
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: "hidden",
              clipPath: "inset(50%)",
              whiteSpace: "nowrap",
              border: 0,
            }}
          >
            {" "}
            {newTabLabel}
          </span>
        ) : null}
      </a>
    );
  },
);
