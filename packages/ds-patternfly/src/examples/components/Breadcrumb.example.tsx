/**
 * Breadcrumb — a trail of links showing the user's place in the hierarchy.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Breadcrumb, BreadcrumbHeading, BreadcrumbItem } from "../_lib.js";

// #region Default
export function Default() {
  return (
    <Breadcrumb ouiaId="DefaultBreadcrumb">
      <BreadcrumbItem to="#">Workspaces</BreadcrumbItem>
      <BreadcrumbItem to="#">Acme</BreadcrumbItem>
      <BreadcrumbItem to="#">Projects</BreadcrumbItem>
      <BreadcrumbItem to="#" isActive>
        Onboarding flow
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
// #endregion

// #region WithHeading
export function WithHeading() {
  return (
    <Breadcrumb>
      <BreadcrumbItem to="#">Settings</BreadcrumbItem>
      <BreadcrumbItem to="#">Team</BreadcrumbItem>
      <BreadcrumbHeading>Permissions</BreadcrumbHeading>
    </Breadcrumb>
  );
}
// #endregion

// #region WithoutHomeLink
export function WithoutHomeLink() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>Section home</BreadcrumbItem>
      <BreadcrumbItem to="#">Section title</BreadcrumbItem>
      <BreadcrumbItem to="#" isActive>
        Section landing
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
// #endregion

export default function BreadcrumbExample() {
  // Real apps render ONE breadcrumb per page — the variants are composed
  // here only so the file demonstrates each shape.
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Default />
      <WithHeading />
      <WithoutHomeLink />
    </div>
  );
}
