/**
 * Port of PF6's `PrimaryDetailCardView` demo from
 * `@patternfly/react-core/src/demos/examples/PrimaryDetail/PrimaryDetailCardView`
 * (https://www.patternfly.org/patterns/primary-detail/react-demos/primary-detail-card-view/).
 *
 * Differences from the upstream demo:
 *  - 10 product icons are generated as inline SVG data URIs instead of being
 *    imported from `./assets/*.png|svg` — keeps the demo self-contained, no
 *    new binary assets in the lib.
 *  - The product data is inlined (upstream imports it from `CardViewData.jsx`).
 *  - Typing tightened for TS strict + `exactOptionalPropertyTypes`:
 *    `any` removed from event handlers and the `state` map.
 */

import {
  Fragment,
  useEffect,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Content,
  Divider,
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelBody,
  DrawerPanelContent,
  Dropdown,
  DropdownItem,
  DropdownList,
  Flex,
  FlexItem,
  Gallery,
  MenuToggle,
  MenuToggleCheckbox,
  type MenuToggleElement,
  PageSection,
  Pagination,
  Progress,
  Select,
  SelectList,
  SelectOption,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarFilter,
  ToolbarItem,
} from "@patternfly/react-core";
import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";
import TrashIcon from "@patternfly/react-icons/dist/esm/icons/trash-icon";
import FilterIcon from "@patternfly/react-icons/dist/esm/icons/filter-icon";
// ESM build (see note in PrimaryDetailDemo.stories.tsx) so the custom masthead
// and DashboardWrapper's <Page> share the same PageContext — keeps the managed
// sidebar hamburger working.
import { DashboardWrapper } from "@patternfly/react-core/dist/esm/demos/DashboardWrapper";
import { AcmeDashboardMasthead } from "../_kit/AcmeMasthead.js";

// 10 generated inline-SVG product icons. The upstream demo imports 10
// separate PNG/SVG files from `./assets`; we generate them on the fly to
// avoid shipping binary assets just for this demo.
function makeIcon(label: string, hue: number) {
  return (
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <rect width="100" height="100" rx="14" fill="hsl(${hue}, 65%, 90%)"/>
        <text x="50" y="60" text-anchor="middle" fill="hsl(${hue}, 65%, 30%)"
              font-family="Arial, sans-serif" font-size="38" font-weight="700">${label}</text>
      </svg>`,
    )
  );
}

interface ProductType {
  id: number;
  name: string;
  description: string;
  icon: string;
  selected?: boolean;
}

const data: ProductType[] = [
  {
    id: 0,
    name: "PatternFly",
    description:
      "PatternFly is a community project that promotes design commonality and improves user experience.",
    icon: "PF",
  },
  {
    id: 1,
    name: "ActiveMQ",
    description:
      "The ActiveMQ component allows messages to be sent to a JMS Queue or Topic; or messages to be consumed from a JMS Queue or Topic using Apache ActiveMQ.",
    icon: "AM",
  },
  {
    id: 2,
    name: "Apache Spark",
    description:
      "This documentation page covers the Apache Spark component for the Apache Camel.",
    icon: "AS",
  },
  {
    id: 3,
    name: "Avro",
    description:
      "This component provides a dataformat for avro, which allows serialization and deserialization of messages using Apache Avro's binary dataformat.",
    icon: "AV",
  },
  {
    id: 4,
    name: "Azure Services",
    description:
      "The Camel Components for Windows Azure Services provide connectivity to Azure services from Camel.",
    icon: "AZ",
  },
  {
    id: 5,
    name: "Crypto",
    description:
      "For providing flexible endpoints to sign and verify exchanges using the Signature Service of the Java Cryptographic Extension.",
    icon: "CR",
  },
  {
    id: 6,
    name: "DropBox",
    description:
      "The dropbox component allows you to treat Dropbox remote folders as a producer or consumer of messages.",
    icon: "DB",
  },
  {
    id: 7,
    name: "JBoss Data Grid",
    description:
      "Read or write to a fully-supported distributed cache and data grid for faster integration services.",
    icon: "JD",
  },
  {
    id: 8,
    name: "REST",
    description:
      "The rest component allows to define REST endpoints (consumer) using the Rest DSL and plugin to other Camel components as the REST transport.",
    icon: "RE",
  },
  {
    id: 9,
    name: "SWAGGER",
    description: "Expose REST services and their APIs using Swagger specification.",
    icon: "SW",
  },
];

const HUES = [210, 30, 280, 130, 200, 260, 110, 340, 50, 170];
const iconSrc = data.map((d, i) => makeIcon(d.icon, HUES[i] ?? 200));

export function PrimaryDetailCardView() {
  const [totalItemCount, setTotalItemCount] = useState(10);
  const [cardData, setCardData] = useState(data);
  const [isChecked, setIsChecked] = useState(false);
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [areAllSelected, setAreAllSelected] = useState(false);
  const [splitButtonDropdownIsOpen, setSplitButtonDropdownIsOpen] = useState(false);
  const [isLowerToolbarDropdownOpen, setIsLowerToolbarDropdownOpen] = useState(false);
  const [isLowerToolbarKebabDropdownOpen, setIsLowerToolbarKebabDropdownOpen] =
    useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  // Use `products` as a concrete field so `noUncheckedIndexedAccess` doesn't
  // widen each access to `string[] | undefined` — the upstream demo treats
  // it as always-present.
  const [filters, setFilters] = useState<{ products: string[] }>({ products: [] });
  const [cardKebabState, setCardKebabState] = useState<Record<string, boolean>>({});
  const [activeCard, setActiveCard] = useState(-1);
  // Below `md` the primary actions (Create instance / Action) collapse into
  // the toolbar kebab.
  const [isNarrow, setIsNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767.98px)");
    const apply = () => setIsNarrow(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const onToolbarDropdownToggle = () => {
    setIsLowerToolbarDropdownOpen((v) => !v);
  };

  const onToolbarKebabDropdownToggle = () => {
    setIsLowerToolbarKebabDropdownOpen((v) => !v);
  };

  const onToolbarKebabDropdownSelect = () => {
    setIsLowerToolbarKebabDropdownOpen((v) => !v);
  };

  const onCardKebabDropdownToggle = (key: string) => {
    setCardKebabState({ [key]: !cardKebabState[key] });
  };

  const checkAllSelected = (selected: number, total: number) =>
    !selected || selected >= total;

  const onNameSelect = (
    event: React.MouseEvent<Element> | undefined,
    selection: string | number | undefined,
  ) => {
    if (!event || selection === undefined) return;
    const checked = (event.target as HTMLInputElement).checked;
    const value = String(selection);
    const prev = filters.products;
    setFilters({
      ...filters,
      products: checked ? [...prev, value] : prev.filter((v) => v !== value),
    });
  };

  const onDelete = (type?: string | unknown) => {
    if (type) setFilters(filters);
    else setFilters({ products: [] });
  };

  const deleteItem = (item: ProductType) => {
    setCardData((rows) => rows.filter((r) => r.id !== item.id));
    setSelectedItems((s) => s.filter((id) => id !== item.id));
    setTotalItemCount((n) => n - 1);
    setIsDrawerExpanded(false);
    setActiveCard(-1);
  };

  const onSetPage = (_e: unknown, pageNumber: number) => setPage(pageNumber);
  const onPerPageSelect = (_e: unknown, p: number) => {
    setPerPage(p);
    setPage(1);
  };

  const onSplitButtonToggle = () => setSplitButtonDropdownIsOpen((v) => !v);
  const onSplitButtonSelect = () => {
    setSplitButtonDropdownIsOpen(false);
    setIsDrawerExpanded(false);
    setActiveCard(-1);
  };

  const onCloseDrawerClick = () => {
    setActiveCard(-1);
    setIsDrawerExpanded(false);
  };

  // Card checkbox toggle — pulled from upstream onChange handler.
  const onChange = (event: FormEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const productId = Number(name.charAt(name.length - 1));
    if (selectedItems.includes(productId)) {
      const next = selectedItems.filter((id) => id !== productId);
      setSelectedItems(next);
      setAreAllSelected(checkAllSelected(next.length, totalItemCount));
    } else {
      const next = [...selectedItems, productId];
      setSelectedItems(next);
      setAreAllSelected(checkAllSelected(next.length, totalItemCount));
    }
  };

  const onCardClick = (productId: number) => {
    if (productId === activeCard) {
      setIsDrawerExpanded((v) => !v);
      setActiveCard(-1);
    } else {
      setActiveCard(productId);
      setIsDrawerExpanded(true);
    }
  };

  const updateSelectedFlag = (collection: number[]) => {
    setCardData((rows) =>
      rows.map((row) => ({ ...row, selected: collection.includes(row.id) })),
    );
  };

  const selectPage = () => {
    const ids = cardData.map((c) => c.id);
    setSelectedItems(ids);
    setIsChecked(true);
    setAreAllSelected(totalItemCount === perPage);
    updateSelectedFlag(ids);
  };

  const selectAll = () => {
    const ids = Array.from({ length: 10 }, (_, i) => i);
    setSelectedItems(ids);
    setIsChecked(true);
    setAreAllSelected(true);
    updateSelectedFlag(ids);
  };

  const selectNone = () => {
    setSelectedItems([]);
    setIsChecked(false);
    setAreAllSelected(false);
    setIsDrawerExpanded(false);
    setActiveCard(-1);
    updateSelectedFlag([]);
  };

  const splitCheckboxSelectAll = (e: MouseEvent<HTMLInputElement>) => {
    const checked = (e.target as HTMLInputElement).checked;
    const ids = checked ? Array.from({ length: 10 }, (_, i) => i) : [];
    setSelectedItems(ids);
    setIsChecked(isChecked);
    setAreAllSelected(checked);
    setIsDrawerExpanded(false);
    setActiveCard(-1);
    updateSelectedFlag(ids);
  };

  const renderPagination = (variant: "top" | "bottom") => (
    <Pagination
      itemCount={totalItemCount}
      page={page}
      perPage={perPage}
      perPageOptions={[
        { title: "1", value: 1 },
        { title: "5", value: 5 },
        { title: "10", value: 10 },
      ]}
      onSetPage={onSetPage}
      onPerPageSelect={onPerPageSelect}
      variant={variant}
      isCompact={variant === "top"}
    />
  );

  const buildSelectDropdown = () => {
    const numSelected = selectedItems.length;
    const anySelected = numSelected > 0;
    return (
      <Dropdown
        onSelect={onSplitButtonSelect}
        isOpen={splitButtonDropdownIsOpen}
        onOpenChange={(isOpen) => setSplitButtonDropdownIsOpen(isOpen)}
        toggle={(toggleRef) => (
          <MenuToggle
            ref={toggleRef}
            isExpanded={splitButtonDropdownIsOpen}
            onClick={onSplitButtonToggle}
            aria-label="Select cards"
            splitButtonItems={[
              <MenuToggleCheckbox
                id="split-dropdown-checkbox"
                key="split-dropdown-checkbox"
                aria-label={anySelected ? "Deselect all cards" : "Select all cards"}
                isChecked={areAllSelected}
                onClick={splitCheckboxSelectAll}
              >
                {numSelected !== 0 && `${numSelected} selected`}
              </MenuToggleCheckbox>,
            ]}
          />
        )}
      >
        <DropdownList>
          <DropdownItem key="item-1" onClick={selectNone}>
            Select none (0 items)
          </DropdownItem>
          <DropdownItem key="item-2" onClick={selectPage}>
            Select page ({perPage} items)
          </DropdownItem>
          <DropdownItem key="item-3" onClick={selectAll}>
            Select all ({totalItemCount} items)
          </DropdownItem>
        </DropdownList>
      </Dropdown>
    );
  };

  const buildFilterDropdown = () => (
    <ToolbarFilter
      categoryName="Products"
      labels={filters.products}
      deleteLabel={(type) => onDelete(type)}
    >
      <Select
        aria-label="Products"
        role="menu"
        toggle={(toggleRef) =>
          isNarrow ? (
            // On mobile the labelled filter toggle is collapsed to a plain
            // filter icon to save horizontal space; the active-count badge
            // moves into the icon's badge slot so selections stay visible.
            <MenuToggle
              ref={toggleRef}
              variant="plain"
              aria-label="Filter by creator name"
              onClick={onToolbarDropdownToggle}
              isExpanded={isLowerToolbarDropdownOpen}
              badge={
                filters.products.length > 0 ? (
                  <Badge isRead>{filters.products.length}</Badge>
                ) : undefined
              }
              icon={<FilterIcon />}
            />
          ) : (
            <MenuToggle
              ref={toggleRef}
              onClick={onToolbarDropdownToggle}
              isExpanded={isLowerToolbarDropdownOpen}
            >
              Filter by creator name
              {filters.products.length > 0 && (
                <Badge isRead>{filters.products.length}</Badge>
              )}
            </MenuToggle>
          )
        }
        onSelect={onNameSelect}
        onOpenChange={(isOpen) => setIsLowerToolbarDropdownOpen(isOpen)}
        selected={filters.products}
        isOpen={isLowerToolbarDropdownOpen}
      >
        <SelectList>
          {data.map((product) => (
            <SelectOption
              hasCheckbox
              key={product.name}
              value={product.name}
              isSelected={filters.products.includes(product.name)}
            >
              {product.name}
            </SelectOption>
          ))}
        </SelectList>
      </Select>
    </ToolbarFilter>
  );

  const toolbarKebabDropdownItems = (
    <>
      <DropdownItem value={0} key="action">
        Action
      </DropdownItem>
      <DropdownItem
        value={1}
        key="link"
        to="#default-link2"
        onClick={(ev) => ev.preventDefault()}
      >
        Link
      </DropdownItem>
      <DropdownItem value={2} isDisabled key="disabled action">
        Disabled Action
      </DropdownItem>
      <DropdownItem value={3} isDisabled key="disabled link" to="#default-link4">
        Disabled Link
      </DropdownItem>
      <Divider component="li" key="separator" />
      <DropdownItem value={4} key="separated action">
        Separated Action
      </DropdownItem>
      <DropdownItem
        value={5}
        key="separated link"
        to="#default-link6"
        onClick={(ev) => ev.preventDefault()}
      >
        Separated Link
      </DropdownItem>
    </>
  );

  const toolbarItems = (
    <Fragment>
      <ToolbarItem>{buildSelectDropdown()}</ToolbarItem>
      <ToolbarItem>{buildFilterDropdown()}</ToolbarItem>
      {/* On wider screens the primary actions sit inline; below md they
          collapse into the toolbar kebab (see the dropdown items below). */}
      {!isNarrow && (
        <Fragment>
          <ToolbarItem>
            <Button variant="primary">Create instance</Button>
          </ToolbarItem>
          <ToolbarItem>
            <Button variant="secondary">Action</Button>
          </ToolbarItem>
        </Fragment>
      )}
      <ToolbarItem>
        <Dropdown
          onSelect={onToolbarKebabDropdownSelect}
          isOpen={isLowerToolbarKebabDropdownOpen}
          onOpenChange={(isOpen) => setIsLowerToolbarKebabDropdownOpen(isOpen)}
          toggle={(toggleRef) => (
            <MenuToggle
              ref={toggleRef}
              isExpanded={isLowerToolbarKebabDropdownOpen}
              variant="plain"
              onClick={onToolbarKebabDropdownToggle}
              aria-label="Toolbar actions"
              icon={<EllipsisVIcon />}
            />
          )}
        >
          <DropdownList>
            {isNarrow && (
              <Fragment>
                <DropdownItem key="create-instance">Create instance</DropdownItem>
                <DropdownItem key="action-primary">Action</DropdownItem>
                <Divider component="li" key="primary-actions-sep" />
              </Fragment>
            )}
            {toolbarKebabDropdownItems}
          </DropdownList>
        </Dropdown>
      </ToolbarItem>
    </Fragment>
  );

  const filtered =
    filters.products.length > 0
      ? data.filter((card) => filters.products.includes(card.name))
      : cardData.slice(
          (page - 1) * perPage,
          perPage === 1 ? page * perPage : page * perPage - 1,
        );

  const drawerContent = (
    <Gallery hasGutter role="region" aria-label="Selectable card container">
      {filtered.map((product, key) => (
        <Card
          key={product.name}
          id={`card-view-${key}`}
          isGlass
          isClickable
          isSelectable
          isSelected={activeCard === product.id}
        >
          <CardHeader
            actions={{
              actions: (
                <Dropdown
                  isOpen={!!cardKebabState[key]}
                  onOpenChange={(isOpen) =>
                    setCardKebabState({ [key]: isOpen })
                  }
                  popperProps={{ position: "right" }}
                  toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                    <MenuToggle
                      ref={toggleRef}
                      aria-label={`${product.name} actions`}
                      variant="plain"
                      onClick={() => onCardKebabDropdownToggle(key.toString())}
                      isExpanded={!!cardKebabState[key]}
                      icon={<EllipsisVIcon />}
                    />
                  )}
                >
                  <DropdownList>
                    <DropdownItem key="trash" onClick={() => deleteItem(product)}>
                      <TrashIcon /> Delete
                    </DropdownItem>
                  </DropdownList>
                </Dropdown>
              ),
            }}
            selectableActions={{
              isChecked: selectedItems.includes(product.id),
              selectableActionId: `selectable-actions-item-${product.id}`,
              selectableActionAriaLabelledby: `card-view-${key}`,
              name: `check-${product.id}`,
              onChange,
            }}
          >
            <img
              src={iconSrc[product.id]}
              alt={`${product.name} icon`}
              style={{ height: "50px" }}
            />
          </CardHeader>
          <CardTitle>
            <Flex
              direction={{ default: "column" }}
              spaceItems={{ default: "spaceItemsNone" }}
            >
              <FlexItem>
                <Button
                  variant="link"
                  isInline
                  onClick={() => onCardClick(product.id)}
                  aria-expanded={activeCard === product.id}
                >
                  {product.name}
                </Button>
              </FlexItem>
              <FlexItem>
                <Content>
                  <small className="pf-v6-u-color-200 pf-v6-u-font-family-text">
                    Provided by Red Hat
                  </small>
                </Content>
              </FlexItem>
            </Flex>
          </CardTitle>
          <CardBody>{product.description}</CardBody>
        </Card>
      ))}
    </Gallery>
  );

  const panelContent = (
    <DrawerPanelContent>
      <DrawerHead>
        <Title headingLevel="h2" size="xl">
          node-{activeCard}
        </Title>
        <DrawerActions>
          <DrawerCloseButton onClick={onCloseDrawerClick} />
        </DrawerActions>
      </DrawerHead>
      <DrawerPanelBody>
        <Flex spaceItems={{ default: "spaceItemsLg" }} direction={{ default: "column" }}>
          <FlexItem>
            <p>
              The content of the drawer really is up to you. It could have form fields,
              definition lists, text lists, labels, charts, progress bars, etc. Spacing
              recommendation is 24px margins. You can put tabs in here, and can also make
              the drawer scrollable.
            </p>
          </FlexItem>
          <FlexItem>
            <Progress value={activeCard * 10} title="Title" />
          </FlexItem>
          <FlexItem>
            <Progress value={activeCard * 5} title="Title" />
          </FlexItem>
        </Flex>
      </DrawerPanelBody>
    </DrawerPanelContent>
  );

  return (
    <DashboardWrapper
      masthead={<AcmeDashboardMasthead />}
      mainContainerId="main-content-card-view-default-nav"
    >
      <PageSection aria-labelledby="projects">
        <Content>
          <h1 id="projects">Projects</h1>
          <p>This is a demo that showcases PatternFly cards.</p>
        </Content>
      </PageSection>
      <PageSection isFilled padding={{ md: "padding" }} aria-label="Card filtering toolbar">
        <Toolbar
          id="card-view-data-toolbar-group-types"
          clearAllFilters={() => onDelete()}
        >
          <ToolbarContent>{toolbarItems}</ToolbarContent>
        </Toolbar>
        <Divider component="div" />
      </PageSection>
      <PageSection
        isFilled
        padding={{ default: "noPadding" }}
        aria-label="Card content area"
      >
        <Drawer isExpanded={isDrawerExpanded} className="pf-m-inline-on-2xl">
          <DrawerContent panelContent={panelContent}>
            <DrawerContentBody hasPadding>{drawerContent}</DrawerContentBody>
          </DrawerContent>
        </Drawer>
      </PageSection>
      <PageSection
        isFilled={false}
        stickyOnBreakpoint={{ default: "bottom" }}
        padding={{ default: "noPadding" }}
        aria-label="Pagination controls"
      >
        {renderPagination("bottom")}
      </PageSection>
    </DashboardWrapper>
  );
}
