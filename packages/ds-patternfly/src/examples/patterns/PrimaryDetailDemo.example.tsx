/**
 * Primary-detail demo — a full-page two-pane pattern: a filterable DataList
 * of repositories (the primary) that opens a right-side detail Drawer on row
 * selection, inside a PF6 app shell (masthead + sidebar + breadcrumb).
 * Below the `md` breakpoint the Status/Risk filters collapse behind a filter
 * icon that opens them in a modal.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Fragment, useEffect, useId, useState } from "react";
import {
  Bullseye,
  Button,
  ButtonVariant,
  Content,
  DataList,
  DataListAction,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  Divider,
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelBody,
  DrawerPanelContent,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
  Flex,
  FlexItem,
  Masthead,
  MastheadBrand,
  MastheadLogo,
  MastheadMain,
  MastheadToggle,
  MenuToggle,
  Modal,
  ModalBody,
  ModalHeader,
  PageSection,
  PageToggleButton,
  Progress,
  SearchInput,
  Select,
  SelectOption,
  type SelectOptionProps,
  Stack,
  StackItem,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from "../_lib.js";
// Import the ESM build (not dist/js / CJS): the bare `@patternfly/react-core`
// imports in the masthead below resolve to ESM under Vite, so the masthead's
// PageToggleButton and DashboardWrapper's <Page> must share the SAME ESM
// PageContext module — otherwise the managed-sidebar toggle reads a different
// context instance and the hamburger does nothing.
import { DashboardWrapper } from "@patternfly/react-core/dist/esm/demos/DashboardWrapper";
import CodeBranchIcon from "@patternfly/react-icons/dist/esm/icons/code-branch-icon";
import CodeIcon from "@patternfly/react-icons/dist/esm/icons/code-icon";
import CubeIcon from "@patternfly/react-icons/dist/esm/icons/cube-icon";
import CheckCircleIcon from "@patternfly/react-icons/dist/esm/icons/check-circle-icon";
import ExclamationTriangleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-triangle-icon";
import FilterIcon from "@patternfly/react-icons/dist/esm/icons/filter-icon";
import SearchIcon from "@patternfly/react-icons/dist/esm/icons/search-icon";
import TimesCircleIcon from "@patternfly/react-icons/dist/esm/icons/times-circle-icon";

interface SelectOptionType extends Omit<SelectOptionProps, "children"> {
  label: string;
}

const statusOptions: SelectOptionType[] = [
  { value: "New", label: "New" },
  { value: "Pending", label: "Pending" },
  { value: "Running", label: "Running" },
  { value: "Cancelled", label: "Cancelled" },
];

const riskOptions: SelectOptionType[] = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

/** Minimal app masthead — hamburger toggle + brand. Swap in your own. */
function DemoMasthead() {
  return (
    <Masthead>
      <MastheadMain>
        <MastheadToggle>
          <PageToggleButton isHamburgerButton aria-label="Global navigation" />
        </MastheadToggle>
        <MastheadBrand>
          <MastheadLogo component="a" href="#">
            <strong style={{ fontSize: "1.125rem" }}>Acme Cloud</strong>
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
    </Masthead>
  );
}

export default function PrimaryDetailDemoExample() {
  // All DOM ids derive from useId so multiple instances can coexist.
  const idPrefix = useId();
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(false);
  const [drawerPanelBodyContent, setDrawerPanelBodyContent] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [statusIsOpen, setStatusIsOpen] = useState(false);
  const [statusSelected, setStatusSelected] = useState<string | number | undefined>("Status");
  const [riskIsOpen, setRiskIsOpen] = useState(false);
  const [riskSelected, setRiskSelected] = useState<string | number | undefined>("Risk");
  // Below `md` the search box stays in the toolbar but the Status/Risk
  // filters collapse behind a filter icon that opens them in a modal.
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767.98px)");
    const apply = () => setIsNarrow(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  const [selectedDataListItemId, setSelectedDataListItemId] = useState("");

  const onStatusSelect = (
    _event: React.MouseEvent<Element> | undefined,
    value: string | number | undefined,
  ) => {
    setStatusSelected(value);
    setStatusIsOpen(false);
  };

  const onRiskSelect = (
    _event: React.MouseEvent<Element> | undefined,
    value: string | number | undefined,
  ) => {
    setRiskSelected(value);
    setRiskIsOpen(false);
  };

  const onSelectDataListItem = (
    _event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
    id: string,
  ) => {
    setSelectedDataListItemId(id);
    setIsDrawerExpanded(true);
    setDrawerPanelBodyContent(id.charAt(id.length - 1));
  };

  const onCloseDrawerClick = () => {
    setIsDrawerExpanded(false);
    setSelectedDataListItemId("");
  };

  const searchInput = (
    <SearchInput
      placeholder="Filter by name"
      aria-label="Filter by repository name"
      value={inputValue}
      onChange={(_event, value) => setInputValue(value)}
      onClear={() => setInputValue("")}
    />
  );

  const statusSelect = (
    <Select
      aria-label="Status select"
      selected={statusSelected}
      isOpen={statusIsOpen}
      toggle={(toggleRef) => (
        <MenuToggle
          ref={toggleRef}
          onClick={() => setStatusIsOpen((prev) => !prev)}
          isExpanded={statusIsOpen}
        >
          {statusSelected}
        </MenuToggle>
      )}
      onOpenChange={(isOpen: boolean) => setStatusIsOpen(isOpen)}
      onSelect={onStatusSelect}
    >
      {statusOptions.map(({ label, value }) => (
        <SelectOption key={label} value={value}>
          {label}
        </SelectOption>
      ))}
    </Select>
  );

  const riskSelect = (
    <Select
      aria-label="Risk select"
      selected={riskSelected}
      isOpen={riskIsOpen}
      toggle={(toggleRef) => (
        <MenuToggle
          ref={toggleRef}
          onClick={() => setRiskIsOpen((prev) => !prev)}
          isExpanded={riskIsOpen}
        >
          {riskSelected}
        </MenuToggle>
      )}
      onOpenChange={(isOpen: boolean) => setRiskIsOpen(isOpen)}
      onSelect={onRiskSelect}
    >
      {riskOptions.map(({ label, value }) => (
        <SelectOption key={label} value={value}>
          {label}
        </SelectOption>
      ))}
    </Select>
  );

  // Search is always shown. The Status/Risk filters render inline on wider
  // screens; below `md` they collapse behind a filter icon that opens them
  // in a modal (see filterModal below).
  const toolbarItems = (
    <Flex
      alignItems={{ default: "alignItemsCenter" }}
      spaceItems={{ default: "spaceItemsSm" }}
    >
      <ToolbarItem>{searchInput}</ToolbarItem>
      {isNarrow ? (
        <ToolbarItem>
          <Button
            variant="plain"
            aria-label="Show filters"
            icon={<FilterIcon />}
            onClick={() => setIsFilterModalOpen(true)}
          />
        </ToolbarItem>
      ) : (
        <ToolbarGroup variant="filter-group">
          <ToolbarItem>{statusSelect}</ToolbarItem>
          <ToolbarItem>{riskSelect}</ToolbarItem>
        </ToolbarGroup>
      )}
    </Flex>
  );

  const filterModal = isNarrow ? (
    <Modal
      variant="small"
      isOpen={isFilterModalOpen}
      onClose={() => setIsFilterModalOpen(false)}
      aria-labelledby={`${idPrefix}-filter-modal-title`}
    >
      <ModalHeader title="Filters" labelId={`${idPrefix}-filter-modal-title`} />
      <ModalBody>
        <Stack hasGutter>
          <StackItem>{statusSelect}</StackItem>
          <StackItem>{riskSelect}</StackItem>
        </Stack>
      </ModalBody>
    </Modal>
  ) : null;

  const panelContent = (
    <DrawerPanelContent>
      <DrawerHead>
        <Title headingLevel="h2" size="xl">
          node-{drawerPanelBodyContent}
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
            <Progress value={parseInt(drawerPanelBodyContent, 10) * 10} title="Title" />
          </FlexItem>
          <FlexItem>
            <Progress value={parseInt(drawerPanelBodyContent, 10) * 5} title="Title" />
          </FlexItem>
        </Flex>
      </DrawerPanelBody>
    </DrawerPanelContent>
  );

  // Four sample repo rows. Two share a slim shape (no status icons), the
  // other two carry the extended footer — keeps the layout interesting
  // without conjuring a real dataset.
  const repos: Array<{
    id: string;
    name: string;
    description: React.ReactNode;
    extended: boolean;
  }> = [
    {
      id: `${idPrefix}-item1`,
      name: "patternfly",
      description: (
        <small>
          Working repo for PatternFly 5{" "}
          <a href="https://pf5.patternfly.org/">https://pf5.patternfly.org/</a>
        </small>
      ),
      extended: false,
    },
    {
      id: `${idPrefix}-item2`,
      name: "patternfly-elements",
      description: <small>PatternFly elements</small>,
      extended: true,
    },
    {
      id: `${idPrefix}-item3`,
      name: "patternfly",
      description: (
        <small>
          Working repo for PatternFly 5{" "}
          <a href="https://pf5.patternfly.org/">https://pf5.patternfly.org/</a>
        </small>
      ),
      extended: false,
    },
    {
      id: `${idPrefix}-item4`,
      name: "patternfly-elements",
      description: <small>PatternFly elements</small>,
      extended: true,
    },
  ];

  // Client-side filter on the search box (matches the PF6 SearchInput
  // pattern): name contains the query, case-insensitive, regex-tolerant.
  const filteredRepos = repos.filter((repo) => {
    if (inputValue === "") {
      return true;
    }
    let rx: RegExp;
    try {
      rx = new RegExp(inputValue, "i");
    } catch {
      rx = new RegExp(inputValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    }
    return repo.name.search(rx) >= 0;
  });

  const clearAllFilters = () => {
    setInputValue("");
    setStatusSelected("Status");
    setRiskSelected("Risk");
  };

  const drawerContent = (
    <Fragment>
      {/* The drawer body sits in a noPadding PageSection (so the data-list
          rows span full width); give the filter toolbar its own inset + top
          padding so it lines up with the page header above it. */}
      <Toolbar
        id={`${idPrefix}-data-toolbar`}
        inset={{ default: "insetLg" }}
        style={{ paddingBlockStart: "var(--pf-t--global--spacer--lg, 1.5rem)" }}
        clearAllFilters={clearAllFilters}
      >
        <ToolbarContent>{toolbarItems}</ToolbarContent>
      </Toolbar>
      {filterModal}
      {filteredRepos.length === 0 ? (
        <Bullseye style={{ paddingBlock: "var(--pf-t--global--spacer--2xl, 3rem)" }}>
          <EmptyState
            headingLevel="h4"
            titleText="No results found"
            icon={SearchIcon}
          >
            <EmptyStateBody>
              No results match the filter criteria. Clear the filter and try
              again.
            </EmptyStateBody>
            <EmptyStateFooter>
              <EmptyStateActions>
                <Button variant={ButtonVariant.link} onClick={clearAllFilters}>
                  Clear all filters
                </Button>
              </EmptyStateActions>
            </EmptyStateFooter>
          </EmptyState>
        </Bullseye>
      ) : (
      <DataList
        aria-label="data list"
        selectedDataListItemId={selectedDataListItemId}
        onSelectDataListItem={onSelectDataListItem}
      >
        {filteredRepos.map((repo, idx) => {
          const actionId = `${idPrefix}-action${idx + 1}`;
          return (
            <DataListItem key={repo.id} id={repo.id}>
              <DataListItemRow>
                <DataListItemCells
                  dataListCells={[
                    <DataListCell key="primary-content">
                      <Flex
                        spaceItems={{ default: "spaceItemsMd" }}
                        direction={{ default: "column" }}
                      >
                        <FlexItem>
                          <p>{repo.name}</p>
                          {repo.description}
                        </FlexItem>
                        <Flex spaceItems={{ default: "spaceItemsMd" }}>
                          <FlexItem>
                            <CodeBranchIcon /> 10
                          </FlexItem>
                          <FlexItem>
                            <CodeIcon /> 4
                          </FlexItem>
                          <FlexItem>
                            <CubeIcon /> 5
                          </FlexItem>
                          {repo.extended && (
                            <>
                              <FlexItem>
                                <CheckCircleIcon /> 7
                              </FlexItem>
                              <FlexItem>
                                <ExclamationTriangleIcon /> 5
                              </FlexItem>
                              <FlexItem>
                                <TimesCircleIcon /> 5
                              </FlexItem>
                            </>
                          )}
                          <FlexItem>Updated 2 days ago</FlexItem>
                        </Flex>
                      </Flex>
                    </DataListCell>,
                    <DataListAction
                      key="actions"
                      aria-labelledby={`${repo.id} ${actionId}`}
                      id={actionId}
                      aria-label="Actions"
                    >
                      <Stack>
                        <StackItem>
                          <Button variant={ButtonVariant.secondary}>Secondary</Button>
                        </StackItem>
                        <StackItem>
                          <Button variant={ButtonVariant.link}>Link Button</Button>
                        </StackItem>
                      </Stack>
                    </DataListAction>,
                  ]}
                />
              </DataListItemRow>
            </DataListItem>
          );
        })}
      </DataList>
      )}
    </Fragment>
  );

  return (
    <DashboardWrapper
      masthead={<DemoMasthead />}
      mainContainerId={`${idPrefix}-main-container`}
    >
      <PageSection aria-labelledby={`${idPrefix}-main-title`}>
        <Content>
          <h1 id={`${idPrefix}-main-title`}>Main title</h1>
          <p>
            Body text should be Red Hat Text at 1rem(16px). It should have leading of
            1.5rem(24px) because <br />
            of it&rsquo;s relative line height of 1.5.
          </p>
        </Content>
      </PageSection>
      <Divider component="div" />
      <PageSection padding={{ default: "noPadding" }} aria-label="Drawer content section">
        <Drawer isExpanded={isDrawerExpanded}>
          <DrawerContent panelContent={panelContent}>
            <DrawerContentBody>{drawerContent}</DrawerContentBody>
          </DrawerContent>
        </Drawer>
      </PageSection>
    </DashboardWrapper>
  );
}
