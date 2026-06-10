# Converting a story to the example-file pattern

Goal: every demo in a story is backed by a real example file — rendered
live, source shown byte-identical (no hand-written snippets), downloadable,
and embedded in the MCP catalog. The converted
[Badge story](../stories/components/Badge.stories.tsx) +
[Badge example](components/Badge.example.tsx) are the canonical template.

## 1. Create the example file

Path mirrors the story: `src/stories/<area>/<Name>.stories.tsx` →
`src/examples/<area>/<Name>.example.tsx` (keep subfolders, e.g.
`components/Forms/TextInput.example.tsx`; drop the `.stories` part of the
name).

Shape:

```tsx
/**
 * <Component> — one-line purpose.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Badge } from "../_lib.js"; // ALWAYS via the _lib shim

// shared helpers/data the demos need — moved OUT of the story so the file
// is self-contained (types, const tables, small helper components)

// #region Tone
export function Tone() {
  return (/* the demo JSX, verbatim from the story's DemoFrame */);
}
// #endregion

// #region ReadVsUnread
export function ReadVsUnread() { /* … */ }
// #endregion

export default function BadgeExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Tone />
      <ReadVsUnread />
    </div>
  );
}
```

Rules:
- One `// #region <PascalCaseName>` per story Section that has a demo; the
  region name ≈ the section title. Markers sit OUTSIDE the exported
  function, on their own lines.
- Import the lib ONLY via `../_lib.js` (or `../../_lib.js` from a
  subfolder) — the display/download/MCP pipeline rewrites it to the package
  name. PF extension packages the DS doesn't wrap (react-charts,
  react-data-view, …) and react-icons are imported directly.
- Move story-local helpers (shared const data, types, helper components,
  CSS template strings) into the example file. Stateful demos keep their
  state inside the region's function.
- NO StoryKit/DemoKit imports, NO ThemeProvider, no fetches; realistic
  inline data.
- **DOM ids must derive from `useId()`** (`const id = useId();` then
  `id={`${id}-name`}`, same for `fieldId`, `aria-describedby`, radio
  `name` groups). The story renders each region once AND again inside the
  Full example composition — hardcoded ids fail axe's duplicate-id-aria.
- Default export composes the regions (zero props). For demos that need a
  tall positioned stage or other story-only scaffolding, the default export
  provides a minimal equivalent inside the file.

## 2. Rewrite the story

```tsx
import {
  FoundationPage, Section, Card, ConfigurationSection, Example,
} from "../_kit/StoryKit.js";
import BadgeExample, { Tone, ReadVsUnread } from "../../examples/components/Badge.example.js";
import badgeExampleSrc from "../../examples/components/Badge.example.tsx?raw";
import badgeComponentSrc from "../../components/Badge.tsx?raw";
```

Per demo Section, replace the `Card > div > DemoFrame + CodeBlock` cluster:

```tsx
<Section title="Tone" description="…unchanged…">
  <Card>
    <Example source={badgeExampleSrc} region="Tone" fileName="Badge.example.tsx">
      <Tone />
    </Example>
  </Card>
</Section>
```

- DELETE the hand-written `<CodeBlock>{`…`}</CodeBlock>` snippets the
  Example replaces — the region source is now the displayed code. Prose
  paragraphs inside the Card stay.
- Keep `height` demos working via `<Example height={…}>` (forwards to
  DemoFrame).
- Add ONE "Full example" section after the demo sections (before
  Configuration/Accessibility). It is SOURCE-ONLY — no children — because
  the sections above are already the live render; rendering the whole
  composition a second time duplicates ids/landmarks and fails axe:

```tsx
<Section title="Full example" description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog.">
  <Card>
    <Example source={badgeExampleSrc} fileName="Badge.example.tsx" />
  </Card>
</Section>
```

(Don't import the example's default export in the story at all — only the
named region exports.)

- If the story has a "Props" section with a bare PropsTable, convert it to
  `<ConfigurationSection importStatement={…} componentSource={…}
  componentFileName="Badge.tsx" rows={…unchanged rows…} />`. The import
  statement names the documented component(s) from
  `"@golden-passport/ds-patternfly"`. Only pass componentSource when the
  documented component has a file in `src/components/` (raw-import it).
  Stories documenting PF packages the DS doesn't wrap skip
  componentSource.

## 3. What NOT to convert

- Pure documentation visualizations — token matrices, contrast tables,
  utility-class galleries (common in foundations/, accessibility/,
  utilities/) — stay inline. If a story is ALL doc visualization, skip the
  example file entirely and note it in your report.
- Guidance-only sections (bullet lists, Do/Don't) — untouched.
- Demos that exist only to show story chrome (e.g. ThemingPointer) —
  untouched.

## 4. Large patterns

For the large composed pattern stories the conversion brief lists
explicitly, the end-to-end demo becomes its own story file
(`<Name>Example.stories.tsx`, title `<Area>/<Name>/Full example`,
`parameters: { layout: "fullscreen", fullBleed: true }`) rendering the
example's default export with whole-file `<Example>` underneath. The
original story keeps its narrative sections.

## 5. Verify (MUST pass before reporting done)

```bash
pnpm typecheck
pnpm vitest run --project=storybook src/stories/<area>/<Name>.stories.tsx
```

The vitest run renders the story in Chromium and runs axe — a11y failures
usually mean the demo JSX changed during extraction; diff against the
original.
