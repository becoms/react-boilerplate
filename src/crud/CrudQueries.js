// @ts-check
import qs from "qs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useApi } from "../shared/useApi";
import { API_PATH } from "./constants";

/** @typedef {("used" | "unused" | "usedByForceAndMoment" | "destroyed")} ItemStatus */
export const itemStatus = [
  { value: "active", label: "Active" },
  { value: "archived", label: "Archived" },
];

/**
 * @typedef ItemProps
 * @property {string} [_id]
 * @property {string} [oid]
 * @property {ItemStatus} status
 */

/** @typedef {ItemProps} Item */

/** @type {(searchParams?: import("../shared/QueryHelpers").SearchParams<Item>) => import("react-query").UseQueryResult<import("../shared/QueryHelpers").Page<Item>>} */
export const useSearchQuery = (searchParams = {}) => {
  const api = useApi();
  return useQuery([API_PATH, searchParams], async () => {
    const { limit = 0, skip = 0, ...query } = searchParams;
    const response = await api.get(API_PATH, {
      searchParams: qs.stringify({ limit, skip, ...query }),
    });
    const totalCount = Number(response.headers.get("X-Total-Count"));
    const list = await response.json();
    return {
      totalCount,
      list,
    };
  });
};

/** @type {() => (searchParams?: import("../shared/QueryHelpers").SearchParams<Item>) => Promise<Item[]>} */
export const useFetchItems = () => {
  const api = useApi();
  return async (searchParams) => {
    return api.get(API_PATH, { searchParams: qs.stringify(searchParams) }).json();
  };
};

/** @type {(itemId: string) => import("react-query").UseQueryResult<Item>} */
export const useFindByIdQuery = (itemId) => {
  const api = useApi();
  return useQuery([API_PATH, itemId], async () => {
    return api.get(`${API_PATH}/${itemId}`).json();
  });
};

/** @type {() => import("react-query").UseMutationResult<Item[], unknown, Item[]>} */
export const useUpsertManyMutation = () => {
  const { mutateAsync: upsertItem } = useUpsertMutation();
  return useMutation(async (items) => {
    return Promise.all(items.map((item) => upsertItem(item)));
  });
};

/** @type {() => import("react-query").UseMutationResult<Item, unknown, Item>} */
export const useUpsertMutation = () => {
  const queryClient = useQueryClient();
  const api = useApi();
  return useMutation(
    async (item) => {
      if (item._id) {
        return api.patch(`${API_PATH}/${item._id}`, { json: item }).json();
      }
      return api.post(API_PATH, { json: item }).json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(API_PATH);
      },
    }
  );
};
