# @golden-passport/ds-patternfly

A brandable React design system built on **PatternFly 6**, designed to accelerate front-end work for BPM/automation projects (e.g. KIE).

## Layout

Single package — flat repo. `src/` is the library; `.storybook/` is the dev surface.

## Quickstart

```sh
pnpm install
pnpm storybook          # run Storybook (interactive — primary dev surface)
pnpm build              # build the lib (outputs ./dist)
pnpm typecheck
pnpm test               # all tests (Node unit + browser-mode story tests)
pnpm test:storybook     # story-level axe scan only (CI-friendly subset)
```

### Storybook a11y in CI

`pnpm test:storybook` runs `vitest run --project=storybook`, which uses
`@storybook/addon-vitest` to render every story in headless Chromium and
scan each with axe-core (via `@storybook/addon-a11y`'s vitest integration).
Any WCAG 2.0/2.1/2.2 AA violation fails the run; results show up identically
in the Storybook GUI Tests pane during development.

First-time setup needs Playwright's Chromium:

```sh
npx playwright install chromium
```

## Using the lib (in a consuming app)

```sh
pnpm add @golden-passport/ds-patternfly @patternfly/react-core @patternfly/react-icons
```

```tsx
import "@patternfly/react-core/dist/styles/base.css";
import "@golden-passport/ds-patternfly/styles";

import {
  ThemeProvider,
  AppShell,
  PrimaryDetailLayout,
  goldenPassport,
  primaryDetailLayoutEnLabels,
  appShellEnLabels,
} from "@golden-passport/ds-patternfly";

export default function App() {
  return (
    <ThemeProvider brand={goldenPassport}>
      <AppShell labels={appShellEnLabels} brandLogo={<img src="/logo.svg" alt="" />}>
        <PrimaryDetailLayout
          items={items}
          selectedId={selectedId}
          onSelect={setSelectedId}
          renderListItem={(i) => i.name}
          renderDetail={(i) => <div>{i.description}</div>}
          labels={primaryDetailLayoutEnLabels}
        />
      </AppShell>
    </ThemeProvider>
  );
}
```

## Design principles

- **Brandable**: every brand is a `BrandTokens` object that overrides PatternFly 6 CSS variables. Switch by changing the `brand` prop.
- **Accessible by design**: WCAG 2.2 AA target. ARIA props are required where semantically necessary; brand color contrast is validated by tests.
- **i18n-ready, not bundled**: every user-facing string is a prop. English defaults are exported as opt-in objects (e.g. `primaryDetailLayoutEnLabels`).
- **Strict TypeScript**: full `.d.ts` shipped with both ESM and CJS builds.
- **No Tailwind**: PatternFly 6 only.

## License

Apache License 2.0 — chosen to align with PatternFly, KIE, and the broader Red Hat ecosystem this lib targets. See [`LICENSE`](LICENSE) and [`NOTICE`](NOTICE).
