/**
 * Menu — the base menu primitive: static menus, selection behaviours,
 * per-item actions, favourites, load-on-demand.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Fragment, useState } from "react";
import {
  Divider,
  Menu,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuItemAction,
  MenuList,
  Spinner,
} from "../_lib.js";
import {
  CodeBranchIcon,
  CubeIcon,
  LayerGroupIcon,
  RocketIcon,
} from "@patternfly/react-icons";

// #region Basic
export function Basic() {
  const [active, setActive] = useState<number | string>(0);

  return (
    <Menu activeItemId={active} onSelect={(_e, id) => setActive(id ?? 0)}>
      <MenuContent>
        <MenuList>
          <MenuItem itemId={0}>Action</MenuItem>
          <MenuItem itemId={1} to="#">Link</MenuItem>
          <MenuItem isDisabled>Disabled action</MenuItem>
          <MenuItem
            isAriaDisabled
            tooltipProps={{ content: "Insufficient permissions", position: "top" }}
          >
            Aria-disabled action
          </MenuItem>
        </MenuList>
      </MenuContent>
    </Menu>
  );
}
// #endregion

// #region WithIcons
export function WithIcons() {
  const [iconActive, setIconActive] = useState<number | string>(0);

  return (
    <Menu activeItemId={iconActive} onSelect={(_e, id) => setIconActive(id ?? 0)}>
      <MenuContent>
        <MenuList>
          <MenuItem icon={<CodeBranchIcon />} itemId={0}>From git</MenuItem>
          <MenuItem icon={<LayerGroupIcon />} itemId={1}>Container image</MenuItem>
          <MenuItem icon={<CubeIcon />} itemId={2}>Docker file</MenuItem>
        </MenuList>
      </MenuContent>
    </Menu>
  );
}
// #endregion

// #region WithDescriptions
export function WithDescriptions() {
  return (
    <Menu>
      <MenuContent>
        <MenuGroup label="Recent">
          <MenuList>
            <MenuItem description="Triggered hourly" itemId={0}>onboarding-flow</MenuItem>
            <MenuItem description="Triggered on push" itemId={1}>build-pipeline</MenuItem>
          </MenuList>
        </MenuGroup>
        <Divider />
        <MenuGroup label="All">
          <MenuList>
            <MenuItem description="Created 3d ago" itemId={2}>data-export</MenuItem>
            <MenuItem description="Created 1w ago" itemId={3}>cleanup-task</MenuItem>
          </MenuList>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}
// #endregion

// #region SingleSelect
export function SingleSelect() {
  const [singleSel, setSingleSel] = useState<number | string>(0);

  return (
    <Menu>
      <MenuContent>
        <MenuList>
          {(["small", "medium", "large"] as const).map((id, i) => (
            <MenuItem
              key={id}
              itemId={i}
              isSelected={singleSel === i}
              onClick={() => setSingleSel(i)}
            >
              {id[0]?.toUpperCase()}{id.slice(1)}
            </MenuItem>
          ))}
        </MenuList>
      </MenuContent>
    </Menu>
  );
}
// #endregion

// #region MultiSelect
export function MultiSelect() {
  const [multiSel, setMultiSel] = useState<(number | string)[]>([0]);
  const onMulti = (id: number | string) =>
    setMultiSel((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );

  return (
    <Menu>
      <MenuContent>
        <MenuList>
          {["status: open", "owner: me", "label: bug"].map((label, i) => (
            <MenuItem
              key={i}
              hasCheckbox
              itemId={i}
              isSelected={multiSel.includes(i)}
              onClick={() => onMulti(i)}
            >
              {label}
            </MenuItem>
          ))}
        </MenuList>
      </MenuContent>
    </Menu>
  );
}
// #endregion

// #region WithActions
export function WithActions() {
  const [actionsActive, setActionsActive] = useState<number | string>(0);

  return (
    <Menu
      onSelect={(_e, id) => setActionsActive(id ?? 0)}
      onActionClick={() => {}}
      activeItemId={actionsActive}
    >
      <MenuContent>
        <MenuList>
          <MenuItem
            itemId={0}
            description="Triggered hourly"
            actions={
              <MenuItemAction
                actionId="copy"
                icon={<CodeBranchIcon />}
                aria-label="Copy id"
              />
            }
          >
            onboarding-flow
          </MenuItem>
          <MenuItem
            itemId={1}
            description="Triggered on push"
            actions={
              <MenuItemAction
                actionId="copy"
                icon={<CodeBranchIcon />}
                aria-label="Copy id"
              />
            }
          >
            build-pipeline
          </MenuItem>
          <MenuItem
            itemId={2}
            description="Created 3d ago"
            isDisabled
            actions={
              <MenuItemAction
                actionId="copy"
                icon={<CodeBranchIcon />}
                aria-label="Copy id"
              />
            }
          >
            data-export
          </MenuItem>
        </MenuList>
      </MenuContent>
    </Menu>
  );
}
// #endregion

const favItems = [
  { itemId: "fav-a", text: "Workflow A", description: "Triggered hourly" },
  { itemId: "fav-b", text: "Workflow B", description: "Triggered on push" },
  { itemId: "fav-c", text: "Workflow C", description: "Triggered manually" },
];

// #region Favourites
export function Favourites() {
  const [favs, setFavs] = useState<string[]>([]);
  const onFav = (_event: unknown, itemId: unknown, actionId: unknown) => {
    if (actionId !== "fav") return;
    const id = String(itemId);
    setFavs((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  return (
    <Menu onActionClick={onFav}>
      <MenuContent>
        {favs.length > 0 && (
          <Fragment>
            <MenuGroup label="Favourites">
              <MenuList>
                {favItems
                  .filter((it) => favs.includes(it.itemId))
                  .map((it) => (
                    <MenuItem
                      key={`fav-${it.itemId}`}
                      itemId={it.itemId}
                      description={it.description}
                      isFavorited
                      actions={
                        <MenuItemAction
                          actionId="fav"
                          aria-label={`Unfavorite ${it.text}`}
                        />
                      }
                    >
                      {it.text}
                    </MenuItem>
                  ))}
              </MenuList>
            </MenuGroup>
            <Divider />
          </Fragment>
        )}
        <MenuGroup label="All">
          <MenuList>
            {favItems.map((it) => (
              <MenuItem
                key={it.itemId}
                itemId={it.itemId}
                description={it.description}
                isFavorited={favs.includes(it.itemId)}
                actions={
                  <MenuItemAction
                    actionId="fav"
                    aria-label={
                      favs.includes(it.itemId)
                        ? `Unfavorite ${it.text}`
                        : `Favorite ${it.text}`
                    }
                  />
                }
              >
                {it.text}
              </MenuItem>
            ))}
          </MenuList>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}
// #endregion

// #region DangerItem
export function DangerItem() {
  return (
    <Menu>
      <MenuContent>
        <MenuList>
          <MenuItem itemId={0}>Edit</MenuItem>
          <MenuItem itemId={1}>Duplicate</MenuItem>
          <Divider component="li" />
          <MenuItem itemId={2} isDanger>
            Delete workflow
          </MenuItem>
        </MenuList>
      </MenuContent>
    </Menu>
  );
}
// #endregion

// #region ExternalLinks
export function ExternalLinks() {
  return (
    <Menu>
      <MenuContent>
        <MenuList>
          <MenuItem itemId={0}>Documentation</MenuItem>
          <MenuItem itemId={1} to="https://patternfly.org" isExternalLink>
            PatternFly docs
          </MenuItem>
          <MenuItem itemId={2} to="https://github.com" isExternalLink>
            GitHub repository
          </MenuItem>
        </MenuList>
      </MenuContent>
    </Menu>
  );
}
// #endregion

const allViewMoreItems = [
  "Run", "Run as draft", "Schedule run", "Validate", "Edit", "Duplicate",
  "Archive", "Export YAML", "Delete",
];

// #region ViewMore
export function ViewMore() {
  const [viewMoreCount, setViewMoreCount] = useState(3);
  const [loadingMore, setLoadingMore] = useState(false);
  const onLoadMore = () => {
    setLoadingMore(true);
    // Simulated fetch — replace with your real pagination call.
    setTimeout(() => {
      setViewMoreCount((n) => Math.min(n + 3, allViewMoreItems.length));
      setLoadingMore(false);
    }, 600);
  };

  return (
    <Menu>
      <MenuContent>
        <MenuList>
          {allViewMoreItems.slice(0, viewMoreCount).map((label, i) => (
            <MenuItem key={i} itemId={i}>
              {label}
            </MenuItem>
          ))}
          {viewMoreCount < allViewMoreItems.length && (
            <MenuItem
              itemId="view-more"
              isLoadButton={!loadingMore}
              isLoading={loadingMore}
              onClick={onLoadMore}
            >
              {loadingMore ? <Spinner size="lg" /> : "View more"}
            </MenuItem>
          )}
        </MenuList>
      </MenuContent>
    </Menu>
  );
}
// #endregion

// #region Plain
export function Plain() {
  return (
    <Menu isPlain>
      <MenuContent>
        <MenuList>
          <MenuItem icon={<RocketIcon />}>Launch</MenuItem>
          <MenuItem>Configure</MenuItem>
          <MenuItem>Tear down</MenuItem>
        </MenuList>
      </MenuContent>
    </Menu>
  );
}
// #endregion

export default function MenuExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <WithIcons />
      <WithDescriptions />
      <SingleSelect />
      <MultiSelect />
      <WithActions />
      <Favourites />
      <DangerItem />
      <ExternalLinks />
      <ViewMore />
      <Plain />
    </div>
  );
}
