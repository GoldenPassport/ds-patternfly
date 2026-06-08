// Layouts pages used to own these helpers. They've moved to the shared
// `src/components/DemoKit.tsx` so the Components section can use them too.
// This file is kept as a re-export to avoid touching every Layouts story —
// new pages should import from `../../components/DemoKit` directly.
export { Box, DemoFrame, PropsTable } from "../../components/DemoKit.js";
