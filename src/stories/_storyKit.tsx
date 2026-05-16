import type { ReactNode } from "react";
import { contrastRatio } from "../a11y/contrast.js";

/** Pick black or white as foreground for max contrast on a given background. */
export function pickFg(bg: string): string {
  return contrastRatio("#ffffff", bg) >= contrastRatio("#000000", bg)
    ? "#ffffff"
    : "#000000";
}

export function fmtRatio(fg: string, bg: string): string {
  return `${contrastRatio(fg, bg).toFixed(2)}:1`;
}

export function FoundationPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    // Solid background — not just for visual consistency. The Storybook
    // canvas sits behind a `display: contents` ThemeProvider wrapper, so
    // axe sometimes can't trace text bg through the layout discontinuity
    // and reports color-contrast as "needs review" on Section descriptions.
    // Painting a solid bg here gives axe a known surface to compute against.
    <div
      style={{
        maxWidth: 1000,
        background: "var(--gp-color-bg-primary-default)",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--gp-font-family-heading)",
          fontSize: 32,
          margin: "0 0 8px",
          color: "var(--gp-color-text-regular)",
        }}
      >
        {title}
      </h1>
      <div
        style={{
          color: "var(--gp-color-text-subtle)",
          fontFamily: "var(--gp-font-family)",
          fontSize: 15,
          lineHeight: 1.55,
          marginBlockEnd: 32,
          maxWidth: 720,
        }}
      >
        {intro}
      </div>
      {children}
    </div>
  );
}

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section style={{ marginBlockEnd: 40 }}>
      <h2
        style={{
          fontFamily: "var(--gp-font-family-heading)",
          fontSize: 20,
          margin: "0 0 8px",
          color: "var(--gp-color-text-regular)",
        }}
      >
        {title}
      </h2>
      {description ? (
        <p
          style={{
            color: "var(--gp-color-text-subtle)",
            margin: "0 0 16px",
            maxWidth: 720,
          }}
        >
          {description}
        </p>
      ) : null}
      {children}
    </section>
  );
}

/**
 * Code sample block. Scrollable horizontally with `tabIndex={0}` so a
 * keyboard-only user can scroll it (axe rule `scrollable-region-focusable`
 * / WCAG 2.1.1). If a unique `label` is provided it becomes a region
 * landmark; otherwise it's just a focusable scrollable container — no
 * landmark, no `landmark-unique` headache when many CodeBlocks share a page.
 */
export function CodeBlock({
  children,
  label,
}: {
  children: string;
  label?: string;
}) {
  return (
    <pre
      tabIndex={0}
      role={label ? "region" : undefined}
      aria-label={label}
      style={{
        margin: 0,
        padding: 16,
        background: "var(--gp-color-bg-secondary-default)",
        color: "var(--gp-color-text-regular)",
        fontSize: 12,
        lineHeight: 1.55,
        overflowX: "auto",
      }}
    >
      {children}
    </pre>
  );
}

export function Card({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid var(--gp-color-border-default)",
        borderRadius: "var(--gp-radius-md)",
        background: "var(--gp-color-bg-primary-default)",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}
