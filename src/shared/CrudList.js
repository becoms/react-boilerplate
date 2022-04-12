/** @jsxImportSource @emotion/react */
import { useState, useMemo } from "react";
import {
  DocumentDownloadIcon,
  DotsVerticalIcon,
  PencilIcon,
  PlusIcon,
  XIcon,
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import "twin.macro";
import { exportToExcel } from "./export";
import { CrudImport } from "./CrudImport";
import { useDebounce } from "../shared/useDebounce";
import { Button, PrimaryButton } from "../shared/Buttons";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIllustration,
  EmptyStateTitle,
} from "../shared/EmptyState";
import { ListPagination } from "../shared/List";
import {
  Menu,
  MenuButton,
  MenuItemButton,
  MenuItems,
} from "../shared/Menu";
import { Page, PageContent, PageHeader, PageTitle } from "../shared/Page";
import { useItemSelection } from "../shared/useItemSelection";
import { Filter } from "../shared/QueryHelpers";
import { CheckBox } from "../shared/Form";
import { SkeletonTable, Table, Td, Th } from "../shared/Table";
import { SearchSolidIcon } from "./Icons";

export const CrudList = ({
  pageTitle,
  massActions,
  fieldLabels,
  fieldNames,
  mongooseSearchFilter,
  crudListCells,
  creationRoute,
  detailsRoute,
  useSearchQuery,
  useUpsertMutation,
  importEnabled,
  exportEnabled,
}) => {
  const [search, setSearch] = useState(undefined);
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);
  const pageSize = 10;
  const { status, data, error } = useSearchQuery({
    ...Filter.from(
      debouncedSearch && mongooseSearchFilter(debouncedSearch)
    ),
    skip: (Number(page) - 1) * pageSize,
    limit: pageSize,
  });
  const { mutateAsync: upsertItem } = useUpsertMutation();

  const {
    selectedItems,
    isSelected,
    onClearSelection,
    onToggle,
    onToggleMany,
  } = useItemSelection();

  const headerCheckboxRef = (el) => {
    if (el) {
      el.indeterminate =
        el.checked && data.list.some((item) => !isSelected(item));
    }
  };

  const thead = useMemo(() => (
    <tr>
      <Th tw="relative w-12 px-6 sm:w-16 sm:px-8">
        <CheckBox
          type="checkbox"
          tw="absolute left-4 top-1/2 -mt-2 sm:left-6"
          ref={headerCheckboxRef}
          checked={data?.list?.some((item) => isSelected(item))}
          onChange={onToggleMany(data?.list)}
        />
      </Th>
      { fieldLabels &&
        fieldLabels.map((columnHeader) => (
          <Th key={columnHeader} scope="col">{columnHeader}</Th>
        ))
      }
      <Th scope="col"></Th>
    </tr>
  ), [fieldLabels, data, isSelected, headerCheckboxRef, onToggleMany]);

  const tfoot = useMemo(() => (
    <tr>
      <td colSpan={fieldLabels.length + 2}>
        <ListPagination
          page={Number(page)}
          setPage={setPage}
          pageSize={pageSize}
          totalCount={data?.totalCount}
        />
      </td>
    </tr>
  ), [page, setPage, pageSize, data]);

  return (
    <>
      {status === "error" && <div>{error}</div>}
      {status !== "error" && (
        <>
          <Page>
            <PageHeader title={<PageTitle>{pageTitle}</PageTitle>}>
              <HeaderBar
                search={search}
                setSearch={setSearch}
                selectedItems={selectedItems}
                onClearSelection={onClearSelection}
                massActions={massActions}
                creationRoute={creationRoute}
              >
                {importEnabled && (
                  <CrudImport
                    fieldNames={fieldNames}
                    fieldsProcessors={[null, (arr) => arr.split("-")]}
                    upsertItem={upsertItem}
                  />
                )}
                {exportEnabled && (
                  <Button onClick={() => exportToExcel(data.list, fieldLabels, fieldNames)}>
                    <DocumentDownloadIcon tw="h-5 w-5" />
                    Exporter
                  </Button>
                )}
              </HeaderBar>
            </PageHeader>
            <PageContent>
              {status === "success" && data.totalCount !== 0 && (
                <Table thead={thead} tfoot={tfoot}>
                  {data.list.map((item) => (
                    <tr key={item._id}>
                      <Td tw="relative w-12 px-6 sm:w-16 sm:px-8">
                        <CheckBox type="checkbox" checked={isSelected(item)} onChange={onToggle(item)} tw="absolute left-4 top-1/2 -mt-2 sm:left-6" />
                      </Td>
                      { crudListCells && crudListCells(item) }
                      <Td tw="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <PrimaryButton
                          as={Link}
                          to={detailsRoute(item)}
                          tw="truncate"
                        >
                          <PencilIcon tw="h-5 w-5" />
                        </PrimaryButton>
                      </Td>
                    </tr>
                  ))}
                </Table>
              )}
              {status === "loading" && <SkeletonTable />}
              {status === "success" && data.totalCount === 0 && (
                <EmptyStatePage debouncedSearch={debouncedSearch} creationRoute={creationRoute} />
              )}
            </PageContent>
          </Page>
        </>
      )}
    </>
  );
};

/**
 * children = top menu options
 * massActions = "see more" menu options
 */
const HeaderBar = ({
  search,
  setSearch,
  selectedItems,
  children,
  massActions,
  onClearSelection,
  creationRoute,
}) => (
  <>
    <SearchBar tw="mt-1" value={search} onChange={setSearch} />
    {children}
    {selectedItems.length !== 0 && (
      <Menu>
        <MenuButton>
          <DotsVerticalIcon tw="h-5 w-5" />
        </MenuButton>
        <MenuItems>
          { massActions && massActions(selectedItems) }
          <MenuItemButton onClick={onClearSelection}>
            <XIcon />
            Tout désélectionner
          </MenuItemButton>
        </MenuItems>
      </Menu>
    )}
    <PrimaryButton as={Link} to={creationRoute}>
      <PlusIcon tw="h-5 w-5" />
    </PrimaryButton>
  </>
);

const SearchBar = ({ value, onChange, ...props }) => {
  return (
    <div tw="relative rounded-md shadow-sm" {...props}>
      <div tw="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchSolidIcon tw="h-5 w-5 text-gray-400" />
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="search"
        tw="focus:ring-indigo-500 focus:border-indigo-500 block w-full h-full rounded-md pl-10 border-gray-300 text-sm"
        placeholder="Search"
        aria-label="Search"
      />
    </div>
  );
};

const EmptyStatePage = ({ creationRoute, debouncedSearch }) => (
  <EmptyState>
    <EmptyStateIllustration />
    <EmptyStateTitle as="h3">Aucun élément à afficher</EmptyStateTitle>
    <EmptyStateDescription>
      {debouncedSearch
        ? "Essayer de modifier le texte recherché"
        : "Vous pouvez créer des éléments avec le bouton suivant :"}
    </EmptyStateDescription>
    {debouncedSearch && (
      <PrimaryButton as={Link} to={creationRoute} tw="mt-8">
        <PlusIcon tw="h-5 w-5" />
      </PrimaryButton>
    )}
  </EmptyState>
);
