# examples/

Self-contained, end-to-end example apps for the library's exported
components. Each example is shipped verbatim (source embedded) in the
`@golden-passport/ds-patternfly-mcp` docs catalog so AI assistants can see
how a complete page comes together — imports, setup, composition, and
styling. They are **not** part of the runtime bundle (nothing here is
reachable from `src/index.ts`).

## Contract

Every `*.example.tsx` file must:

1. **Default-export a single zero-props component** — it must render
   standalone.
2. **Import the library only through `./_lib.js`** (or `../_lib.js`), never
   deep paths. The shim re-exports the public API; the MCP generator
   rewrites the specifier to `@golden-passport/ds-patternfly` when
   embedding, so consumers see real package imports.
3. **Open with a comment block showing the app-entry setup** (style imports
   + `ThemeProvider`). The component itself must NOT render `ThemeProvider`
   — the Storybook host provides one, and a nested provider would fight the
   brand/mode toolbar.
4. **Carry realistic inline demo data** — no fetches, no story-kit imports
   (`StoryKit`/`DemoKit` are docs chrome, not part of an app).
5. **Be rendered by a story** (a `FullExample` story in the component's
   stories file). Storybook builds and smoke tests compile every example,
   so they cannot rot.

## Naming

`src/examples/<ComponentName>/<ExampleName>.example.tsx`, e.g.
`src/examples/AiAssistant/AssistantInShell.example.tsx`.
