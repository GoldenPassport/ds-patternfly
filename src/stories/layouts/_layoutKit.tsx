// Layouts pages used to own these helpers. They've moved to the shared
// `src/stories/_demoKit.tsx` so the Components section can use them too.
// This file is kept as a re-export to avoid touching every Layouts story —
// new pages should import from `../_demoKit` directly.
export { Box, DemoFrame, PropsTable } from "../_demoKit.js";
