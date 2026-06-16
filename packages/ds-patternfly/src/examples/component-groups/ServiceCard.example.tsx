/**
 * ServiceCard (@patternfly/react-component-groups) — a standardized tile for
 * a service / capability: icon, title, description, optional helper text and
 * footer. Pair with Gallery for the responsive grid.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import ServiceCard from "@patternfly/react-component-groups/dist/dynamic/ServiceCard";
import { CogIcon, KeyIcon, ShieldAltIcon } from "@patternfly/react-icons";
import { Button, Gallery, GalleryItem } from "@golden-passport/ds-patternfly";

// #region Basic
export function Basic() {
  return (
    /* isFullHeight on every card so a row of mixed-length cards (Settings
       is short, Access carries a subtitle + helper text) lines up at the
       same height. PF6's Gallery only stretches cells when its children
       opt in via isFullHeight. */
    <Gallery hasGutter minWidths={{ default: "240px" }}>
      <GalleryItem>
        <ServiceCard
          icon={<CogIcon />}
          title="Settings"
          description="Configure preferences, notifications, and integrations."
          isFullHeight
          footer={<Button variant="link" isInline>Open</Button>}
        />
      </GalleryItem>
      <GalleryItem>
        <ServiceCard
          icon={<KeyIcon />}
          title="Access"
          subtitle="Identity & roles"
          description="Manage users, groups, and API keys for your workspace."
          helperText="3 pending invitations"
          isFullHeight
          footer={<Button variant="link" isInline>Open</Button>}
        />
      </GalleryItem>
      <GalleryItem>
        <ServiceCard
          icon={<ShieldAltIcon />}
          title="Security"
          description="Audit logs, vulnerabilities, and compliance posture."
          isFullHeight
          isStacked
          footer={<Button variant="link" isInline>Open</Button>}
        />
      </GalleryItem>
    </Gallery>
  );
}
// #endregion

export default function ServiceCardExample() {
  return <Basic />;
}
