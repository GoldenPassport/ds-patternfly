/**
 * Page — the top-level layout shell. Composes Masthead, PageSidebar, and
 * PageSection into the standard app skeleton.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadLogo,
  MastheadMain,
  Page,
  PageSection,
  Title,
} from "../_lib.js";

// Minimal brand masthead shared by the demos — swap the wordmark for your
// product's logo component.
function BrandMasthead() {
  return (
    <Masthead display={{ default: "inline" }}>
      <MastheadMain>
        <MastheadBrand>
          <MastheadLogo href="#" component="a">
            <span style={{ fontWeight: 700, letterSpacing: 0.5 }}>Acme</span>
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <span style={{ color: "var(--gp-color-text-subtle)" }}>
          Header content
        </span>
      </MastheadContent>
    </Masthead>
  );
}

// #region SlotProps
export function SlotProps() {
  const id = useId();
  return (
    <Page
      masthead={<BrandMasthead />}
      banner={
        <div
          style={{
            padding: "8px 16px",
            background: "var(--gp-color-status-info-bg)",
            color: "var(--gp-color-status-info-text)",
          }}
        >
          Banner content — global notice / status strip
        </div>
      }
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbItem to="#">Workspaces</BreadcrumbItem>
          <BreadcrumbItem to="#">Acme</BreadcrumbItem>
          <BreadcrumbItem isActive>Onboarding</BreadcrumbItem>
        </Breadcrumb>
      }
      isContentFilled
    >
      <PageSection aria-labelledby={`${id}-slots-h1`} isFilled>
        <Title headingLevel="h1" id={`${id}-slots-h1`}>
          Onboarding
        </Title>
      </PageSection>
    </Page>
  );
}
// #endregion

// #region CenteredWidthLimited
export function CenteredWidthLimited() {
  return (
    <Page masthead={<BrandMasthead />}>
      <PageSection
        isWidthLimited
        isCenterAligned
        aria-label="Centered content"
      >
        <Card>
          <CardBody>
            When the main area is wider than the section&rsquo;s
            max-width, <code>isCenterAligned</code> centres the
            content. The card here just makes the boundary
            visible — it isn&rsquo;t required.
          </CardBody>
        </Card>
      </PageSection>
    </Page>
  );
}
// #endregion

export default function PageExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <div style={{ height: 300 }}>
        <SlotProps />
      </div>
      <div style={{ height: 260 }}>
        <CenteredWidthLimited />
      </div>
    </div>
  );
}
