import type { ReactNode } from "react";
import {
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadLogo,
  MastheadMain,
  MastheadToggle,
  Button,
} from "../base/index.js";
import BarsIcon from "@patternfly/react-icons/dist/esm/icons/bars-icon";
import { type AppHeaderLabels, appHeaderEnLabels } from "./labels.js";

export type { AppHeaderLabels } from "./labels.js";
export { appHeaderEnLabels } from "./labels.js";

/**
 * AppHeader — the branded application masthead: an optional sidebar-toggle, a
 * brand/logo slot, and a right-aligned actions slot (search, help, user
 * menu). Composes the base Masthead family; brand styling flows from the
 * dials. For the full page frame (masthead + sidebar + content), use `Shell`.
 */
export interface AppHeaderProps {
  /** Required. Provide via `appHeaderEnLabels` or your translations. */
  labels?: AppHeaderLabels;
  /** Brand mark / logo node. */
  brandLogo?: ReactNode;
  /** Right-aligned content — toolbar, user menu, notifications. */
  actions?: ReactNode;
  /** Show the hamburger sidebar toggle and fire this on click. */
  onToggleNav?: () => void;
}

export function AppHeader({
  labels = appHeaderEnLabels,
  brandLogo,
  actions,
  onToggleNav,
}: AppHeaderProps) {
  return (
    <Masthead>
      {onToggleNav ? (
        <MastheadToggle>
          <Button
            variant="plain"
            aria-label={labels.toggleNav}
            onClick={onToggleNav}
            icon={<BarsIcon />}
          />
        </MastheadToggle>
      ) : null}
      <MastheadMain>
        <MastheadBrand>
          {brandLogo ? <MastheadLogo>{brandLogo}</MastheadLogo> : null}
        </MastheadBrand>
      </MastheadMain>
      {actions ? <MastheadContent>{actions}</MastheadContent> : null}
    </Masthead>
  );
}
