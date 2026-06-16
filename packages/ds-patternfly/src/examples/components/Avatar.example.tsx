/**
 * Avatar — a user's photo or initials in masthead, comments, member lists.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Avatar } from "@golden-passport/ds-patternfly";

const SIZES = ["sm", "md", "lg", "xl"] as const;

// Inline SVG so the demo doesn't depend on an external image.
const placeholderSrc =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#0066cc"/><text x="32" y="32" text-anchor="middle" dominant-baseline="central" fill="white" font-family="Arial" font-size="24" font-weight="bold">JD</text></svg>`,
  );

// #region Sizes
export function Sizes() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      {SIZES.map((s) => (
        <div key={s} style={{ textAlign: "center", color: "var(--gp-color-text-regular)" }}>
          <Avatar src={placeholderSrc} alt="Jane Doe" size={s} />
          <div style={{ fontSize: 12, marginTop: 8 }}>{s}</div>
        </div>
      ))}
    </div>
  );
}
// #endregion

// #region Bordered
export function Bordered() {
  return <Avatar src={placeholderSrc} alt="Jane Doe" size="lg" isBordered />;
}
// #endregion

export default function AvatarExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Sizes />
      <Bordered />
    </div>
  );
}
