/**
 * SearchInput — a text input pre-styled for queries with built-in search icon,
 * clear button, and submit handling.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import { SearchInput } from "@golden-passport/ds-patternfly";

// #region Basic
export function Basic() {
  const [q, setQ] = useState("");

  return (
    <SearchInput
      placeholder="Search projects"
      value={q}
      onChange={(_, value) => setQ(value)}
      onClear={() => setQ("")}
      aria-label="Search projects"
    />
  );
}
// #endregion

// #region ResultsCount
export function ResultsCount() {
  const [q, setQ] = useState("");

  // resultsCount must be a string|number, never undefined,
  // when present — so conditionally include the prop.
  return q ? (
    <SearchInput
      placeholder="Search"
      value={q}
      onChange={(_, value) => setQ(value)}
      onClear={() => setQ("")}
      resultsCount="1 / 12 results"
      aria-label="Search with results"
    />
  ) : (
    <SearchInput
      placeholder="Search"
      value={q}
      onChange={(_, value) => setQ(value)}
      onClear={() => setQ("")}
      aria-label="Search with results"
    />
  );
}
// #endregion

export default function SearchInputExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <ResultsCount />
    </div>
  );
}
