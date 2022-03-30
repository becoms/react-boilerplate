import { useMutation, useQuery, useQueryClient } from "react-query";
import { useApi } from "./shared/useApi";
import qs from "qs";

export const useGetQuery = (searchParams = {}) => {
  const api = useApi();
  return useQuery([`v1/test`, searchParams], async () => {
    const { limit = 10, skip = 0, sort = "-createdAt", ...query } = searchParams;

    const response = await api.get(`v1/test`, {
      searchParams: qs.stringify({
        limit,
        skip,
        sort,
        ...query,
      }),
    });
    const totalCount = Number(response.headers.get("X-Total-Count"));
    let list = await response.json();
    return {
      totalCount,
      list,
    };
  });
};

export const usePostMutation = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (json = {}) => {
      return api
        .post("v1/test", {
          json,
        })
        .json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("v1/test");
    },
  });
};

export const usePatchMutation = (uuid) => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (json = {}) => {
      return api
        .patch(`v1/test/${uuid}`, {
          json,
        })
        .json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(`v1/otherCollection/${uuid}`);
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
      queryClient.invalidateQueries("v1/test");
    },
  });
};
