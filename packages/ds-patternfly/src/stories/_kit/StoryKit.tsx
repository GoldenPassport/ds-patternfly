import type { ReactNode } from "react";
import { contrastRatio } from "../../a11y/contrast.js";
import { DemoFrame, PropsTable } from "./DemoKit.js";
import type { PropRow } from "./DemoKit.js";

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
    // gp-doc-page: under .pf-v6-theme-glass this bg goes transparent (see
    // the glass layer in src/styles/index.css) so the decorator's gradient
    // canvas shows through and the frosted doc surfaces have variation to
    // blur — otherwise an opaque page bg hides the gradient and the glass
    // effect collapses.
    <div
      className="gp-doc-page"
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

/**
 * Theming pointer — drop-in `<Section>` for component stories that lists
 * the brand-root dials this component reads from and links back to
 * `Foundations / Theming / Overview`. Avoids copy-pasting the same
 * section across ~25 component pages.
 *
 *   <ThemingPointer dials={[
 *     ["--gp-control-pad-y", "Vertical padding (drives field height)."],
 *     ["--gp-radius-control", "Corner radius for the input + buttons."],
 *   ]} />
 *
 * Renders inside a `<FoundationPage>` like any other Section.
 */
export function ThemingPointer({
  dials,
  intro,
}: {
  dials: ReadonlyArray<readonly [string, string]>;
  intro?: ReactNode;
}) {
  return (
    <Section
      title="Theming"
      description={
        intro ??
        "Sizing, colour, radius, and elevation on this component are driven by brand-root dials. Edit a dial once, every instance updates."
      }
    >
      <Card>
        <ul
          style={{
            margin: 0,
            padding: "16px 24px 16px 40px",
            color: "var(--gp-color-text-regular)",
            lineHeight: 1.8,
          }}
        >
          {dials.map(([name, purpose]) => (
            <li key={name}>
              <strong>
                <code>{name}</code>
              </strong>{" "}
              — {purpose}
            </li>
          ))}
          <li>
            See <strong>Foundations / Theming / Overview</strong> for the full
            35-dial catalogue and copy-paste root block.
          </li>
        </ul>
      </Card>
    </Section>
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
      // gp-doc-codeblock: the glass layer (src/styles/index.css) frosts
      // this surface when the .pf-v6-theme-glass theme is active.
      className="gp-doc-codeblock"
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

/**
 * Prepare example-file source for display / download. Mirrors the MCP
 * generator's embedding rewrite (build-catalog.mjs readExample) — keep the
 * two in sync so the story, the download, and the MCP payload are
 * byte-identical.
 *
 * - `region` given → return only the `// #region <name>` … `// #endregion`
 *   span (markers stripped).
 * - no region → the whole file with all region markers stripped.
 * - The examples/_lib shim specifier is rewritten to the package name, so
 *   readers see real consumer imports.
 */
export function presentExampleSource(source: string, region?: string): string {
  let s = source;
  if (region) {
    const open = s.indexOf(`// #region ${region}`);
    const close = open === -1 ? -1 : s.indexOf("// #endregion", open);
    if (open !== -1 && close !== -1) {
      s = s.slice(s.indexOf("\n", open) + 1, close);
    }
  } else {
    s = s.replace(/^[ \t]*\/\/ #(?:region|endregion).*\r?\n?/gm, "");
  }
  return s
    .replace(/["'](?:\.{1,2}\/)+_lib\.js["']/g, '"@golden-passport/ds-patternfly"')
    .trimEnd();
}

/** Client-side "save this text as a file" — used by the example/component
 * download buttons. */
function downloadText(fileName: string, text: string) {
  const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

export function DownloadButton({
  fileName,
  text,
  label,
}: {
  fileName: string;
  text: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => downloadText(fileName, text)}
      style={{
        font: "inherit",
        fontSize: 13,
        padding: "4px 12px",
        borderRadius: "var(--gp-radius-control, 6px)",
        border: "1px solid var(--gp-color-border-default)",
        background: "var(--gp-color-bg-primary-default)",
        color: "var(--gp-color-text-link)",
        cursor: "pointer",
      }}
    >
      {label ?? `Download ${fileName}`}
    </button>
  );
}

/**
 * A story demo backed by a real example file: the live render, the exact
 * source region it came from, and a download of the whole file. `source`
 * is the file's raw text (Vite `?raw` import); `children` is the SAME
 * named export the region shows — so what you see, read, download, and
 * what MCP serves are one artifact.
 */
export function Example({
  source,
  region,
  fileName,
  height,
  children,
}: {
  /** `import src from ".../X.example.tsx?raw"` */
  source: string;
  /** `// #region` name to display; omit to show the whole file. */
  region?: string;
  /** Download name, e.g. "Badge.example.tsx". */
  fileName: string;
  /** Forwarded to DemoFrame. */
  height?: number | string;
  children: ReactNode;
}) {
  return (
    <div style={{ padding: 16, display: "grid", gap: 12 }}>
      <DemoFrame {...(height !== undefined ? { height } : {})}>{children}</DemoFrame>
      <CodeBlock>{presentExampleSource(source, region)}</CodeBlock>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <DownloadButton
          fileName={fileName}
          text={presentExampleSource(source)}
        />
      </div>
    </div>
  );
}

/**
 * The standard "Configuration" section every exported component's story
 * carries: how to import it, then the full props reference. The same
 * `rows` data (a colocated *.props.json) feeds the MCP catalog, so the
 * story and the docs the bots see can't drift apart. Pass the component
 * file's `?raw` source to offer it as a download.
 */
export function ConfigurationSection({
  importStatement,
  rows,
  description,
  componentSource,
  componentFileName,
}: {
  importStatement: string;
  rows: PropRow[];
  description?: ReactNode;
  /** `import src from ".../components/X.tsx?raw"` */
  componentSource?: string;
  /** Download name, e.g. "Button.tsx". */
  componentFileName?: string;
}) {
  return (
    <Section
      title="Configuration"
      description={
        description ??
        "How to import the component and every prop it accepts. Required props are marked with *."
      }
    >
      <div style={{ display: "grid", gap: 16 }}>
        <Card>
          <CodeBlock label="Import">{importStatement}</CodeBlock>
          {componentSource && componentFileName ? (
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 16px 12px" }}>
              <DownloadButton
                fileName={componentFileName}
                text={componentSource}
                label={`Download ${componentFileName} (DS component source)`}
              />
            </div>
          ) : null}
        </Card>
        <Card>
          <div style={{ padding: 16 }}>
            <PropsTable rows={rows} />
          </div>
        </Card>
      </div>
    </Section>
  );
}

export function Card({ children }: { children: ReactNode }) {
  return (
    <div
      // gp-doc-card: glass-frosted under .pf-v6-theme-glass (see the
      // glass layer in src/styles/index.css).
      className="gp-doc-card"
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
