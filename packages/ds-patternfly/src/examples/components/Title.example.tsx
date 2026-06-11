/**
 * Title — a heading with PatternFly type-scale styling.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Title } from "../_lib.js";

const SIZES = ["4xl", "3xl", "2xl", "xl", "lg", "md"] as const;

// #region Sizes
export function Sizes() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {SIZES.map((s) => (
        <Title key={s} headingLevel="h2" size={s}>
          {s} — The quick brown fox
        </Title>
      ))}
    </div>
  );
}
// #endregion

export default function TitleExample() {
  return <Sizes />;
}
