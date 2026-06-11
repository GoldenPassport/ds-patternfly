# examples/

Self-contained example files for every story in the design system. Each
one is:

- **rendered live in its story** — sections import the example's named
  exports and show the exact `// #region` source slice (Vite `?raw`), so
  the displayed code is byte-identical to what runs;
- **downloadable** — every Example block and Configuration section offers
  the file (and the DS component source) as a download;
- **served by MCP** — `@golden-passport/ds-patternfly-mcp` embeds every
  example verbatim (`getGpExample`) and every DS component file
  (`getGpComponent`), with the `_lib` shim rewritten to the package name.

They are **not** part of the runtime bundle (nothing here is reachable
from `src/index.ts`).

## Layout

Path mirrors the story: `src/stories/<area>/<Name>.stories.tsx` ↔
`src/examples/<area>/<Name>.example.tsx` (subfolders mirror too). The MCP
generator pairs them by this convention — an example that matches no story
is reported as an orphan at `pnpm mcp:gen` time.

Large patterns (Dashboard, Shell, CompassIntegrations, PrimaryDetailDemo)
additionally have a dedicated `<Name>Example.stories.tsx` page rendering
the whole composition full-bleed with its source.

## Contract

See [CONVERTING.md](./CONVERTING.md) for the full recipe. The essentials:

1. **One `// #region <PascalCaseName>` per story section** with a matching
   named export; a zero-props **default export** composes them.
2. **Import the library only via the `_lib.js` shim** (depth-relative).
   PF extension packages (react-charts, react-data-view, …) and
   react-icons are imported directly, with the required package named in
   the header comment. The display/download/MCP pipeline rewrites the shim
   to `@golden-passport/ds-patternfly`.
3. **DOM ids derive from `useId()`** — regions render more than once per
   docs page; hardcoded ids fail axe.
4. **Self-contained**: story-local helpers/data move in; no
   StoryKit/DemoKit imports, no ThemeProvider (the host provides one), no
   fetches; realistic inline data; header comment shows the app-entry
   setup.
5. **Rendered by its story** — Storybook builds and the vitest storybook
   suite compile + axe-check every example, so they cannot rot.

Doc-only stories (token matrices, utility-class galleries, guidance
pages in foundations/, accessibility/, utilities/) deliberately have no
example file.
