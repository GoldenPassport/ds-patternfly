import type { ReactNode } from "react";
import { Content, Split, SplitItem } from "@patternfly/react-core";

/**
 * PageHeader — the standard top-of-page header: a title row (optional icon +
 * status label + right-aligned actions), an optional subtitle, an optional
 * breadcrumb above, and an optional tabs strip below.
 *
 * A composition of branded react-core primitives — every slot is a
 * `ReactNode` you fill, so it stays fully configurable without a fixed prop
 * surface. Layout uses the brand dials; the slotted content brings its own
 * brand styling. No `labels` prop: the header owns no localizable chrome
 * text (title/subtitle/breadcrumb/tabs are all caller-provided).
 */
export interface PageHeaderProps {
  /** The page title. Rendered as an `<h1>`. */
  title: ReactNode;
  /** Supporting line under the title. */
  subtitle?: ReactNode;
  /** Leading glyph beside the title (e.g. a 36×36 icon). */
  icon?: ReactNode;
  /** Status slot rendered inline after the title (e.g. a `<Label>`). */
  status?: ReactNode;
  /** Breadcrumb slot rendered above the title (e.g. a `<Breadcrumb>`). */
  breadcrumb?: ReactNode;
  /** Right-aligned actions (buttons, a kebab `<Dropdown>`, …). */
  actions?: ReactNode;
  /** Tabs strip rendered below the header (e.g. a `<Tabs>`). */
  tabs?: ReactNode;
  /** Content rendered below the tabs strip. */
  children?: ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  icon,
  status,
  breadcrumb,
  actions,
  tabs,
  children,
}: PageHeaderProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {breadcrumb ? (
        <div style={{ marginBlockEnd: "0.75rem" }}>{breadcrumb}</div>
      ) : null}
      <Split hasGutter style={{ alignItems: "flex-start" }}>
        {icon ? (
          <SplitItem>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                blockSize: 36,
              }}
            >
              {icon}
            </span>
          </SplitItem>
        ) : null}
        <SplitItem isFilled>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <Content component="h1" style={{ margin: 0 }}>
              {title}
            </Content>
            {status}
          </div>
          {subtitle ? (
            <Content
              component="p"
              style={{ margin: "0.25rem 0 0", color: "var(--gp-color-text-subtle)" }}
            >
              {subtitle}
            </Content>
          ) : null}
        </SplitItem>
        {actions ? <SplitItem>{actions}</SplitItem> : null}
      </Split>
      {tabs ? <div style={{ marginBlockStart: "1rem" }}>{tabs}</div> : null}
      {children ? (
        <div style={{ marginBlockStart: "var(--gp-pad-section, 2rem)" }}>{children}</div>
      ) : null}
    </div>
  );
}
