/**
 * Banner — a page- or app-level status strip flush with the top of the viewport.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Banner, Flex, FlexItem } from "../_lib.js";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InfoCircleIcon,
} from "@patternfly/react-icons";

// #region StatusVariants
export function StatusVariants() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Banner screenReaderText="Success banner" status="success">
        <Flex spaceItems={{ default: "spaceItemsSm" }}>
          <FlexItem><CheckCircleIcon /></FlexItem>
          <FlexItem>Deployment completed — all checks passing.</FlexItem>
        </Flex>
      </Banner>
      <Banner screenReaderText="Warning banner" status="warning">
        <Flex spaceItems={{ default: "spaceItemsSm" }}>
          <FlexItem><ExclamationTriangleIcon /></FlexItem>
          <FlexItem>Maintenance window scheduled for 23:00 UTC.</FlexItem>
        </Flex>
      </Banner>
      <Banner screenReaderText="Danger banner" status="danger">
        <Flex spaceItems={{ default: "spaceItemsSm" }}>
          <FlexItem><ExclamationCircleIcon /></FlexItem>
          <FlexItem>API region us-east-1 is degraded — some requests may fail.</FlexItem>
        </Flex>
      </Banner>
      <Banner screenReaderText="Info banner" status="info">
        <Flex spaceItems={{ default: "spaceItemsSm" }}>
          <FlexItem><InfoCircleIcon /></FlexItem>
          <FlexItem>You&rsquo;re viewing the staging environment.</FlexItem>
        </Flex>
      </Banner>
    </div>
  );
}
// #endregion

// #region PlainBanner
export function PlainBanner() {
  return <Banner>Default banner — neutral surface, no status accent.</Banner>;
}
// #endregion

export default function BannerExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <StatusVariants />
      <PlainBanner />
    </div>
  );
}
