/**
 * Gallery — responsive grid of equal-width tiles. You specify the minimum
 * tile width; the browser computes the column count at every viewport size.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Gallery, GalleryItem } from "../_lib.js";

// Shaded placeholder tile so the gallery cells are visible in the demo.
// In a real app these are your cards / dashboard widgets.
function Box({ label }: { label: string }) {
  return (
    <div
      style={{
        background: "var(--gp-color-brand-default)",
        color: "var(--gp-color-brand-on)",
        padding: 24,
        borderRadius: "var(--gp-radius-sm)",
        fontSize: 14,
        textAlign: "center",
      }}
    >
      {label}
    </div>
  );
}

// #region DefaultBehavior
export function DefaultBehavior() {
  return (
    <Gallery hasGutter minWidths={{ default: "180px" }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <GalleryItem key={i}>
          <Box label={`tile ${i + 1}`} />
        </GalleryItem>
      ))}
    </Gallery>
  );
}
// #endregion

// #region PerBreakpointMinWidths
export function PerBreakpointMinWidths() {
  return (
    <Gallery
      hasGutter
      minWidths={{
        default: "140px",
        md: "200px",
        lg: "260px",
      }}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <GalleryItem key={i}>
          <Box label={`tile ${i + 1}`} />
        </GalleryItem>
      ))}
    </Gallery>
  );
}
// #endregion

export default function GalleryExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <DefaultBehavior />
      <PerBreakpointMinWidths />
    </div>
  );
}
