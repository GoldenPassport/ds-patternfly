# @golden-passport/ds-patternfly

[![npm version](https://img.shields.io/npm/v/@golden-passport/ds-patternfly.svg)](https://www.npmjs.com/package/@golden-passport/ds-patternfly)

A brandable React design system built on **PatternFly 6**, designed to accelerate front-end work for BPM/automation projects (e.g. KIE).

![Default theme — dark mode with glass surfaces](https://raw.githubusercontent.com/GoldenPassport/ds-patternfly/main/packages/ds-patternfly/assets/default-dark-glass.jpg)

![Golden Passport brand — light mode](https://raw.githubusercontent.com/GoldenPassport/ds-patternfly/main/packages/ds-patternfly/assets/gp-light-noglass.jpg)

## Install

```sh
pnpm add @golden-passport/ds-patternfly @patternfly/react-core @patternfly/react-icons
```

`@patternfly/react-core` and `@patternfly/react-icons` are peer dependencies.

## Usage

```tsx
import "@patternfly/react-core/dist/styles/base.css"; // PF6 base first
import "@golden-passport/ds-patternfly/styles";       // lib styles last

import {
  ThemeProvider,
  Shell,
  PrimaryDetailLayout,
  goldenPassport,
  primaryDetailLayoutEnLabels,
  shellEnLabels,
} from "@golden-passport/ds-patternfly";

export default function App() {
  return (
    <ThemeProvider brand={goldenPassport}>
      <Shell labels={shellEnLabels} brandLogo={<img src="/logo.svg" alt="" />}>
        <PrimaryDetailLayout
          items={items}
          selectedId={selectedId}
          onSelect={setSelectedId}
          renderListItem={(i) => i.name}
          renderDetail={(i) => <div>{i.description}</div>}
          labels={primaryDetailLayoutEnLabels}
        />
      </Shell>
    </ThemeProvider>
  );
}
```

## Design principles

- **Brandable**: every brand is a `BrandTokens` object that overrides PatternFly 6 CSS variables. Switch by changing the `brand` prop on `ThemeProvider`.
- **Accessible by design**: WCAG 2.2 AA target. ARIA props are required where semantically necessary; brand color contrast is validated by tests.
- **i18n-ready, not bundled**: every user-facing string is a prop. English defaults are exported as opt-in objects (e.g. `primaryDetailLayoutEnLabels`, `shellEnLabels`).
- **Strict TypeScript**: full `.d.ts` shipped with both ESM and CJS builds.
- **No Tailwind**: PatternFly 6 only.

## Development

This package lives in the [`GoldenPassport/ds-patternfly`](https://github.com/GoldenPassport/ds-patternfly) monorepo under `packages/ds-patternfly`. Storybook is the primary dev surface:

```sh
pnpm install
pnpm storybook          # interactive component workshop
pnpm build              # build the lib (outputs ./dist)
pnpm typecheck
pnpm test               # Node unit + browser-mode story tests
pnpm test:storybook     # story-level axe a11y scan (CI-friendly subset)
```

## License

Apache License 2.0 — chosen to align with PatternFly, KIE, and the broader Red Hat ecosystem this lib targets. See [`LICENSE`](https://github.com/GoldenPassport/ds-patternfly/blob/main/LICENSE) and [`NOTICE`](https://github.com/GoldenPassport/ds-patternfly/blob/main/NOTICE).
