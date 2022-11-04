import { useMutation, useQuery, useQueryClient } from "react-query";
import { useApi } from "./shared/useApi";
import qs from "qs";

const BASE_URL = "v1/item";

export const useGetQuery = (searchParams = {limit: 10, skip: 0, sort: "-createdAt"}) => {
  const api = useApi();
  return useQuery([BASE_URL, searchParams], async () => {
    const { limit, skip, sort, ...query } = searchParams;

    const response = await api.get(BASE_URL, {
      searchParams: qs.stringify({
        limit,
        skip,
        sort,
        ...query,
      }),
    });
    const totalCount = Number(response.headers.get("X-Total-Count"));
    const list = await response.json();
    return {
      totalCount,
      list,
    };
  });
};

export const usePostMutation = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<any, any, any>({
    mutationFn: async (json = {}) => {
      return api
        .post(BASE_URL, {
          json,
        })
        .json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(BASE_URL);
    },
  });
};

export const usePatchMutation = (uuid: string) => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<any, any, any>({
    mutationFn: async (json = {}) => {
      return api
        .patch(`v1/test/${uuid}`, {
          json,
        })
        .json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(BASE_URL);
    },
  });
};

export const useDelete = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (uuid) => {
      await api.delete(`v1/test/${uuid}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(BASE_URL);
    },
  });
};

export const useByIdQuery = (uuid: string) => {
  const api = useApi();
  return useQuery({
    queryKey: `v1/test/${uuid}`,
    queryFn: async () => api.get(`v1/test/${uuid}`).json(),
  });
};
