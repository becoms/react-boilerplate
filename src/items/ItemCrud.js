// import { useCallback } from "react/cjs/react.production.min";
import { TrashIcon } from "@heroicons/react/solid";
import { CrudList } from "../shared/crud/CrudList";
import { MenuItemButton } from "../shared/Menu";
import { Filter } from "../shared/QueryHelpers";
import { Td } from "../shared/Table";
import {
  useDeleteMutation,
  useSearchQuery,
  useUpsertManyMutation,
} from "./useItemQueries";

export const ITEM_ROOT_ROUTE = "/item";
export const ITEM_CREATION_ROUTE = `${ITEM_ROOT_ROUTE}/new`;
export const ITEM_DETAILS_PATH_PARAM = "itemId";
export const ITEM_DETAILS_ROUTE = `${ITEM_ROOT_ROUTE}/:${ITEM_DETAILS_PATH_PARAM}`;
const detailsRoute = (item) => {
  const result = ITEM_DETAILS_ROUTE.replace(`:${ITEM_DETAILS_PATH_PARAM}`, item._id);
  return result;
};

export const ItemCrud = () => {
  return (
    <CrudList
      pageTitle="CRUD Showcase"
      fieldLabels={["Nom", "Couleur", "Statut"]}
      mongooseSearchFilter={debouncedSearch => ({ name: Filter.regex(debouncedSearch) }) }
      useSearchQuery={useSearchQuery}
      useUpsertManyMutation={useUpsertManyMutation}
      creationRoute={ITEM_CREATION_ROUTE}
      detailsRoute={detailsRoute}
      massActions={(selectedItems) => <MassActions selectedItems={selectedItems} />}
      crudListCells={(item) => <CrudListCells item={item} />}
      importExportFields={["name", "color", "status"]}
      importEnabled={true}
      exportEnabled={true}
    />
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
  const { mutateAsync: upsertManyItem } = useUpsertManyMutation();
  return (
    <MenuItemButton
      onClick={() => {
        upsertManyItem(
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

const DeleteMenuItem = ({ items, ...props }) => {
  const { mutateAsync: deleteManyItem } = useDeleteMutation();
  return (
    <MenuItemButton onClick={() => deleteManyItem(items)} {...props} />
  );
};

const MassActions = ({ selectedItems }) => (
  <>
    <UpdateCrudStatusMenuItem status="archived" items={selectedItems}>
      <CrudStatusIcon tw="text-green-500!" />
      Archiver
    </UpdateCrudStatusMenuItem>
    <UpdateCrudStatusMenuItem status="active" items={selectedItems}>
      <CrudStatusIcon tw="text-gray-500!" />
      Activer
    </UpdateCrudStatusMenuItem>
    <DeleteMenuItem items={selectedItems}>
      <TrashIcon tw="text-gray-500!" />
      Supprimer
    </DeleteMenuItem>
  </>
);

export const CrudListCells = ({ item }) => {
  return (
    <>
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
    </>
  );
};
