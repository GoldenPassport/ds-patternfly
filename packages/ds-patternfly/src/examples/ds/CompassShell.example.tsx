/**
 * CompassShell — the full-viewport Compass page frame: header band, left nav
 * rail, main content, a docked message-bar footer, and a controlled mobile
 * nav drawer. Compose the base CompassHeader / CompassMessageBar / Nav into
 * the slots.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import {
  Button,
  CompassHeader,
  CompassMessageBar,
  Content,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  CompassShell,
  DrawerActions,
  DrawerCloseButton,
  DrawerHead,
  DrawerPanelBody,
  DrawerPanelContent,
  Nav,
  NavItem,
  NavList,
  SearchInput,
} from "../_lib.js";
import BarsIcon from "@patternfly/react-icons/dist/esm/icons/bars-icon";

const NAV = ["Overview", "Integrations", "Pipelines", "Settings"];

// #region AppFrame
export function AppFrame() {
  const uid = useId();
  const [active, setActive] = useState("Overview");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navRail = (
    <Nav aria-label="Primary">
      <NavList>
        {NAV.map((item) => (
          <NavItem
            key={item}
            itemId={item}
            isActive={active === item}
            onClick={() => setActive(item)}
          >
            {item}
          </NavItem>
        ))}
      </NavList>
    </Nav>
  );

  return (
    <CompassShell
      mainContentId={`${uid}-main`}
      header={
        <CompassHeader
          logo={
            <a href="#" aria-label="Acme home">
              <strong style={{ fontSize: "1.125rem" }}>Acme Cloud</strong>
            </a>
          }
          nav={
            <Button
              variant="plain"
              aria-label="Open navigation"
              icon={<BarsIcon />}
              onClick={() => setDrawerOpen(true)}
              className="pf-v6-u-display-none-on-md"
            />
          }
          profile={<span>Aliyah Frazier</span>}
        />
      }
      sidebarStart={navRail}
      footer={
        <CompassMessageBar>
          <SearchInput
            aria-label="Ask or search"
            placeholder="Ask or search…"
          />
        </CompassMessageBar>
      }
      drawer={
        <DrawerPanelContent>
          <DrawerHead>
            <span>Navigation</span>
            <DrawerActions>
              <DrawerCloseButton onClick={() => setDrawerOpen(false)} />
            </DrawerActions>
          </DrawerHead>
          <DrawerPanelBody>{navRail}</DrawerPanelBody>
        </DrawerPanelContent>
      }
      isDrawerOpen={drawerOpen}
      onDrawerOpenChange={setDrawerOpen}
    >
      <div style={{ padding: "1.5rem" }}>
        <Content component="h1" style={{ marginBlockStart: 0 }}>
          {active}
        </Content>
        <Content component="p" style={{ color: "var(--gp-color-text-subtle)" }}>
          The Compass frame fills the viewport: brand + nav in the header, the
          rail on the left, this content area, and the message bar docked
          below. Pick a nav item; on a narrow viewport the hamburger opens the
          drawer.
        </Content>
        <Card>
          <CardHeader>
            <CardTitle>Panel</CardTitle>
          </CardHeader>
          <CardBody>Content for “{active}”.</CardBody>
        </Card>
      </div>
    </CompassShell>
  );
}
// #endregion

export default function CompassShellExample() {
  return <AppFrame />;
}
