/**
 * Content — prose-style content with PatternFly's typographic defaults.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Content } from "../_lib.js";

// #region CommonElements
export function CommonElements() {
  return (
    <Content>
      <p>
        This is a paragraph inside <code>Content</code>. Long-form
        prose gets the right line-height, paragraph spacing, and
        link color automatically.
      </p>
      <ul>
        <li>List items get consistent bullet styling…</li>
        <li>…and consistent spacing.</li>
      </ul>
      <blockquote>Blockquotes get an accent edge.</blockquote>
    </Content>
  );
}
// #endregion

// #region SingleElementForm
export function SingleElementForm() {
  return <Content component="p">A standalone styled paragraph.</Content>;
}
// #endregion

export default function ContentExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <CommonElements />
      <SingleElementForm />
    </div>
  );
}
