/**
 * Right-to-left pattern — the same view rendered in LTR and RTL via
 * dir-scoped containers. PF6 ships logical CSS properties, so the whole
 * tree mirrors correctly; the lib's ThemeProvider takes a `dir` prop to
 * flip an entire app.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…} dir="rtl">.
 */
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardTitle,
  Flex,
  FlexItem,
  Label,
} from "../_lib.js";
import { ChevronRightIcon, BellIcon } from "@patternfly/react-icons";

function PreviewBlock() {
  return (
    <Card>
      <CardBody>
        <Breadcrumb>
          <BreadcrumbItem to="#">Workflows</BreadcrumbItem>
          <BreadcrumbItem to="#" isActive>
            Quarterly review
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex
          style={{ marginTop: 12 }}
          alignItems={{ default: "alignItemsCenter" }}
          spaceItems={{ default: "spaceItemsSm" }}
        >
          <FlexItem>
            <CardTitle>Quarterly review</CardTitle>
          </FlexItem>
          <FlexItem>
            <Label color="green" isCompact>Active</Label>
          </FlexItem>
          <FlexItem align={{ default: "alignRight" }}>
            <Button variant="primary">
              Run <ChevronRightIcon />
            </Button>
          </FlexItem>
        </Flex>
        <p style={{ marginTop: 12, color: "var(--gp-color-text-subtle)" }}>
          Triggered hourly · 4 steps · last run 12 minutes ago
        </p>
        <Flex spaceItems={{ default: "spaceItemsSm" }} style={{ marginTop: 8 }}>
          <FlexItem><BellIcon /></FlexItem>
          <FlexItem>3 pending notifications</FlexItem>
        </Flex>
      </CardBody>
    </Card>
  );
}

// #region LtrVsRtl
export function LtrVsRtl() {
  return (
    <Flex direction={{ default: "column" }} spaceItems={{ default: "spaceItemsLg" }}>
      <FlexItem>
        <div style={{ marginBottom: 8, color: "var(--gp-color-text-subtle)", fontSize: 13 }}>
          LTR
        </div>
        <div dir="ltr">
          <PreviewBlock />
        </div>
      </FlexItem>
      <FlexItem>
        <div style={{ marginBottom: 8, color: "var(--gp-color-text-subtle)", fontSize: 13 }}>
          RTL
        </div>
        <div dir="rtl">
          <PreviewBlock />
        </div>
      </FlexItem>
    </Flex>
  );
}
// #endregion

export default function RightToLeftExample() {
  return <LtrVsRtl />;
}
