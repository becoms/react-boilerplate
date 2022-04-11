/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { DocumentDownloadIcon, PencilIcon, XIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import "twin.macro";
import { CrudExport } from "./CrudExport";
import { CrudImport } from "./CrudImport";
import { SearchBar } from "../search/SearchBar";
import { useDebounce } from "../shared/useDebounce";
import { ROUTE_PATH, OBJECTS_NAME } from "./constants";
import { Button, PrimaryButton } from "../shared/Buttons";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIllustration,
  EmptyStateTitle,
} from "../shared/EmptyState";
import {
  ListPagination,
} from "../shared/List";
import {
  Menu,
  MenuButton,
  MenuItemButton,
  MenuItems,
  MenuButtonDropdownIcon,
} from "../shared/Menu";
import { Page, PageContent, PageHeader, PageTitle } from "../shared/Page";
import { useDisclosure } from "../shared/useDisclosure";
import { useItemSelection } from "../shared/useItemSelection";
import {
  useUpsertManyMutation,
  useSearchQuery,
  useUpsertMutation,
} from "./CrudQueries";
import { Filter } from "../shared/QueryHelpers";
import { CheckBox } from "../shared/Form";
import { SkeletonTable, Table, Td, Th } from "../shared/Table";

export const CrudList = () => {
  const [search, setSearch] = useState(undefined);
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);
  const pageSize = 10;
  const { status, data, error } = useSearchQuery({
    ...Filter.from(
      debouncedSearch && { name: Filter.regex(`.*${debouncedSearch}.*`) }
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

  const {
    isOpen: isExportModalOpen,
    onOpen: onExportModalOpen,
    onClose: onExportModalClose,
  } = useDisclosure(false);

  const headerCheckboxRef = (el) => {
    if (el) {
      el.indeterminate = el.checked &&
        data.list.some((item) => !isSelected(item));
    }
  };

  const thead = (
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
      <Th scope="col">Nom</Th>
      <Th scope="col">Couleur(s)</Th>
      <Th scope="col">Statut</Th>
      <Th scope="col"></Th>
    </tr>
  );

  const tfoot = (
    <tr>
      <td colSpan={5}>
        <ListPagination
          page={Number(page)}
          setPage={setPage}
          pageSize={pageSize}
          totalCount={data?.totalCount}
        />
      </td>
    </tr>
  );

  return (
    <>
      {status === "error" && <div>{error}</div>}
      {status !== "error" && (
        <>
          <Page>
            <PageHeader title={<PageTitle>{OBJECTS_NAME}</PageTitle>}>
              <HeaderBar
                search={search}
                setSearch={setSearch}
                selectedItems={selectedItems}
                onClearSelection={onClearSelection}>
                <CrudImport
                  fields={["name", "color", "status"]}
                  fieldsProcessors={[null, (arr) => arr.split("-")]}
                  upsertItem={upsertItem}
                />
                <Button onClick={onExportModalOpen}>
                  <DocumentDownloadIcon tw="h-5 w-5" />
                  Exporter
                </Button>
              </HeaderBar>
            </PageHeader>
            <PageContent>
              {status === "success" && data.totalCount !== 0 && (
                <Table
                  thead={thead}
                  tfoot={tfoot}>
                    {data.list.map((item) => (
                      <CrudListItem
                        key={item._id}
                        item={item}
                        isSelected={isSelected}
                        onToggle={onToggle}
                      />
                    ))}
                </Table>
              )}
              {status === "loading" && <SkeletonTable />}
              {status === "success" && data.totalCount === 0 && <EmptyStatePage debouncedSearch={debouncedSearch} />}
              <CrudExport
                isOpen={isExportModalOpen}
                onDismiss={onExportModalClose}
              />
            </PageContent>
          </Page>
        </>
      )}
    </>
  );
};

const CrudStatusIcon = (props) => {
  return (
    <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
      <circle cx="10" cy="10" r="3" />
      <circle cx="10" cy="10" r="6" fillOpacity={0.3} />
    </svg>
  );
};

const UpdateCrudStatusMenuItem = ({ status, items, ...props }) => {
  const { mutateAsync: upsertManyTire } = useUpsertManyMutation();
  return (
    <MenuItemButton
      onClick={() => {
        upsertManyTire(
          items.map((item) => ({
            _id: item._id,
            status,
          }))
        );
      }}
      {...props}
    />
  );
};

const HeaderBar = ({ search, setSearch, selectedItems, children, onClearSelection }) => (
  <>
    <SearchBar tw="mt-2" value={search} onChange={setSearch} />
    { children }
    {selectedItems.length !== 0 && (
      <Menu>
        <MenuButton>
          Voir plus
          <MenuButtonDropdownIcon />
        </MenuButton>
        <MenuItems>
          <UpdateCrudStatusMenuItem
            status="archived"
            items={selectedItems}
          >
            <CrudStatusIcon tw="text-green-500!" />
            Archiver
          </UpdateCrudStatusMenuItem>
          <UpdateCrudStatusMenuItem
            status="active"
            items={selectedItems}
          >
            <CrudStatusIcon tw="text-gray-500!" />
            Activer
          </UpdateCrudStatusMenuItem>
          <MenuItemButton onClick={onClearSelection}>
            <XIcon />
            Tout désélectionner
          </MenuItemButton>
        </MenuItems>
      </Menu>
    )}
    <PrimaryButton as={Link} to={`${ROUTE_PATH}/new`}>
      Créer
    </PrimaryButton>
  </>
);

export const CrudListItem = ({ item, isSelected, onToggle }) => {
  return (
    <tr>
      <Td tw="relative w-12 px-6 sm:w-16 sm:px-8">
        <CheckBox type="checkbox" checked={isSelected(item)} onChange={onToggle(item)} tw="absolute left-4 top-1/2 -mt-2 sm:left-6" />
      </Td>
      <Td tw="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.name}</Td>
      <Td>{item.color.join(", ")}</Td>
      <Td tw="text-white">
        {item.status === "active" && (
          <span tw="px-2 py-0.5 rounded text-xs font-medium bg-green-700">
            Actif
          </span>
        )}
        {item.status === "archived" && (
          <span tw="px-2 py-0.5 rounded text-xs font-medium bg-green-700">
            Archivé
          </span>
        )}
      </Td>
      <Td tw="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <PrimaryButton as={Link} to={`${ROUTE_PATH}/${item._id}`} tw="truncate">
          <PencilIcon tw="h-5 w-5" />
        </PrimaryButton>
      </Td>
    </tr>
  );
};

const EmptyStatePage = ({ debouncedSearch }) => (
  <EmptyState>
    <EmptyStateIllustration />
    <EmptyStateTitle as="h3">
      Aucun élément à afficher
    </EmptyStateTitle>
    <EmptyStateDescription>
      { debouncedSearch ? "Vous pouvez créer des éléments avec le bouton suivant :" : "Essayer de modifier le texte recherché ou les filtres de recherche" }
    </EmptyStateDescription>
    { debouncedSearch &&
      <PrimaryButton
        as={Link}
        to={`${ROUTE_PATH}/new`}
        tw="mt-8"
      >
        Créer
      </PrimaryButton>
    }
  </EmptyState>
);
