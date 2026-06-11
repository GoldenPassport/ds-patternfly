/**
 * TagCount (@patternfly/react-component-groups) — a small clickable tag
 * indicator with a count ("3 tags") for table rows where rendering all tags
 * inline would clutter the row. Click opens a popover / drawer with the
 * full list.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import TagCount from "@patternfly/react-component-groups/dist/dynamic/TagCount";

// #region Default
export function Default() {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <TagCount count={3} onClick={() => alert("show 3 tags")} />
      <TagCount count={12} onClick={() => alert("show 12 tags")} />
      <TagCount count={0} isAriaDisabled />
    </div>
  );
}
// #endregion

export default function TagCountExample() {
  return <Default />;
}
