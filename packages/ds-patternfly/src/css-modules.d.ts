// Ambient declarations for side-effect-only stylesheet imports.
//
// Story files pull in third-party CSS purely for its side effects — e.g.
// PatternFly base styles and
// `@patternfly/react-catalog-view-extension/dist/css/react-catalog-view-extension.css`.
// Under `moduleResolution: "Bundler"` the TypeScript language server reports
// TS2882 ("Cannot find module or type declarations for side-effect import")
// for these, because a `.css` file ships no type declarations. Declaring the
// wildcard module tells TS the import is a valid side-effect module with no
// shape, silencing the error without affecting the emitted bundle (the lib's
// own CSS is produced by build-css.mjs, not by these imports).
declare module "*.css";
