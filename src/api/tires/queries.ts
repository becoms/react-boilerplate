import { queryOptions } from "@tanstack/react-query";
import keys from "./keys";
import { Tire } from "./type";
import { useApi } from "../useApi";

export type FindAllTiresResponse = {
  data: Tire[];
  meta: {
    totalElements: number;
  };
};

export const useFindAllTiresOptions = () => {
  const api = useApi();

  return queryOptions({
    queryKey: keys.lists(),
    queryFn: async () => {
      const response = await api
        .get(`${import.meta.env.VITE_API_URL}/tires`)
        .json<FindAllTiresResponse>();

      return { totalCount: response.meta.totalElements, list: response.data };
    },
  });
};

export const useFindOneTireOptions = (id: Tire["_id"]) => {
  const api = useApi();

  return queryOptions({
    queryKey: keys.one(id),
    queryFn: async () => {
      const response = await api
        .get(`${import.meta.env.VITE_API_URL}/tires/${id}`)
        .json<Tire>();

      return response;
    },
  });
};
