/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { DocumentDownloadIcon, XIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import "twin.macro";
import { CrudExport } from "./CrudExport";
import { CrudImport } from "./CrudImport";
import { SearchBar } from "../search/SearchBar";
import { useDebounce } from "../shared/useDebounce";
import { ROUTE_PATH, OBJECTS_NAME } from "./constants";
import { PrimaryButton } from "../shared/Buttons";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIllustration,
  EmptyStateTitle,
} from "../shared/EmptyState";
import {
  List,
  ListCheckbox,
  ListHeaderCheckbox,
  ListItem,
  ListItemContent,
  ListItemRow,
  ListPagination,
} from "../shared/List";
import {
  Menu,
  MenuButton,
  MenuButtonDropdownIcon,
  MenuItemButton,
  MenuItems,
  MenuSection,
} from "../shared/Menu";
import { Page, PageContent, PageHeader, PageTitle } from "../shared/Page";
import { Panel } from "../shared/Panel";
import { Skeleton } from "../shared/Skeleton";
import { useDisclosure } from "../shared/useDisclosure";
import { useItemSelection } from "../shared/useItemSelection";
import { useUpsertManyMutation, useSearchQuery } from "./CrudQueries";

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

/** @type {React.FC<{ tire: import("./ItemQueries").Item }>} */
export const CrudListItem = ({ item, leading }) => {
  return (
    <ListItem>
      {leading && <div tw="hidden absolute sm:(block -left-6 top-10)">{leading}</div>}
      <ListItemContent>
        <ListItemRow>
          <div tw="flex items-center space-x-2 truncate">
            <PrimaryButton as={Link} to={`${ROUTE_PATH}/${item._id}`} tw="truncate">
              {item.name}
            </PrimaryButton>
          </div>
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
        </ListItemRow>
      </ListItemContent>
    </ListItem>
  );
};

const CrudListItemSkeleton = () => {
  return (
    <ListItem>
      <ListItemContent>
        <ListItemRow>
          <Skeleton />
        </ListItemRow>
        <ListItemRow>
          <Skeleton />
        </ListItemRow>
      </ListItemContent>
    </ListItem>
  );
};

export const CrudList = () => {
  const [search, setSearch] = useState(undefined);
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);
  const pageSize = 10;
  const { status, data, error } = useSearchQuery({
    skip: (Number(page) - 1) * pageSize,
    limit: pageSize,
  });

  const { selectedItems, isSelected, onClearSelection, onToggle, onToggleMany } =
    useItemSelection();

  const {
    isOpen: isExportModalOpen,
    onOpen: onExportModalOpen,
    onClose: onExportModalClose,
  } = useDisclosure(false);

  return (
    <>
      {status === "error" && <div>{error}</div>}
      {status !== "error" && (
        <>
          <Page>
            <PageHeader
              title={<PageTitle>{OBJECTS_NAME}</PageTitle>}
              actions={
                <>
                  <SearchBar value={search} onChange={setSearch} />
                  <Menu>
                    <MenuButton>
                      Voir plus
                      <MenuButtonDropdownIcon />
                    </MenuButton>
                    <MenuItems>
                      <MenuSection>
                        <CrudImport />
                      </MenuSection>

                      <MenuSection>
                        <MenuItemButton onClick={onExportModalOpen}>
                          <DocumentDownloadIcon />
                          Exporter
                        </MenuItemButton>
                      </MenuSection>
                      {selectedItems.length !== 0 && (
                        <>
                          <MenuSection>
                            <UpdateCrudStatusMenuItem status="active" items={selectedItems}>
                              <CrudStatusIcon tw="text-green-500!" />
                              Archiver
                            </UpdateCrudStatusMenuItem>
                            <UpdateCrudStatusMenuItem status="archived" items={selectedItems}>
                              <CrudStatusIcon tw="text-gray-500!" />
                              Activer
                            </UpdateCrudStatusMenuItem>
                          </MenuSection>
                          <MenuSection>
                            <MenuItemButton onClick={onClearSelection}>
                              <XIcon />
                              Tout désélectionner
                            </MenuItemButton>
                          </MenuSection>
                        </>
                      )}
                    </MenuItems>
                  </Menu>
                  <PrimaryButton as={Link} to={`${ROUTE_PATH}/new`}>
                    Créer
                  </PrimaryButton>
                  <CrudExport
                    isOpen={isExportModalOpen}
                    onDismiss={onExportModalClose}
                  />
                </>
              }
            />
            <PageContent>
              {status === "loading" && (
                <>
                  <Skeleton tw="bg-gray-200 mt-8" />
                  <Panel tw="mt-2">
                    <List>
                      {Array.from({ length: 5 }, (_, index) => (
                        <CrudListItemSkeleton key={index} />
                      ))}
                    </List>
                  </Panel>
                </>
              )}
              {status === "success" && data.totalCount === 0 && (
                <EmptyState>
                  <EmptyStateIllustration />
                  {debouncedSearch
                    ? (
                    <>
                      <EmptyStateTitle as="h3">
                        Aucun élément ne correspond à la recherche
                      </EmptyStateTitle>
                      <EmptyStateDescription>
                        Essayer de modifier le texte recherché ou les filtres de recherche
                      </EmptyStateDescription>
                      <PrimaryButton as={Link} to={`${ROUTE_PATH}`} tw="mt-8">
                        Supprimer tous les filtres
                      </PrimaryButton>
                    </>
                      )
                    : (
                    <>
                      <EmptyStateTitle as="h3">Aucun élément à afficher</EmptyStateTitle>
                      <EmptyStateDescription>
                        Vous pouvez créer des éléments avec le bouton suivant :
                      </EmptyStateDescription>
                      <PrimaryButton as={Link} to={`${ROUTE_PATH}/new`} tw="mt-8">
                        Créer
                      </PrimaryButton>
                    </>
                      )}
                </EmptyState>
              )}
              {status === "success" && data.totalCount !== 0 && (
                <>
                  <h3 tw="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-8">
                    <ListHeaderCheckbox
                      checked={data.list.some((item) => isSelected(item))}
                      indeterminate={data.list.some((item) => !isSelected(item))}
                      onChange={onToggleMany(data.list)}
                    />
                    <span tw="pl-4 sm:pl-6 xl:pl-4">Select all</span>
                  </h3>
                  <Panel tw="mt-2">
                    <List>
                      {data.list.map((item) => (
                        <CrudListItem
                          key={item._id}
                          item={item}
                          leading={
                            <ListCheckbox checked={isSelected(item)} onChange={onToggle(item)} />
                          }
                        />
                      ))}
                    </List>
                  </Panel>

                  <ListPagination
                    page={Number(page)}
                    setPage={setPage}
                    pageSize={pageSize}
                    totalCount={data.totalCount}
                  />
                </>
              )}
            </PageContent>
          </Page>
        </>
      )}
    </>
  );
};
