import { useMutation, useQueryClient } from "@tanstack/react-query";
import keys from "./keys";
import { Tire } from "./type";
import { useApi } from "../useApi";

export const useCreateTire = () => {
  const queryClient = useQueryClient();
  const api = useApi();

  return useMutation({
    mutationFn: async (tireData: Partial<Tire>) => {
      const response = await api
        .post(`${import.meta.env.VITE_API_URL}/tires`, {
          json: tireData,
        })
        .json<Tire>();

      return response;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: keys.lists(),
      });
    },
  });
};

export const useUpdateTire = (id: Tire["_id"]) => {
  const queryClient = useQueryClient();
  const api = useApi();

  return useMutation({
    mutationFn: async ({ tireData }: { tireData: Partial<Tire> }) => {
      const response = await api
        .put(`${import.meta.env.VITE_API_URL}/tires/${id}`, {
          json: { _id: id, ...tireData },
        })
        .json<Tire>();

      return response;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: keys.one(id),
      });
    },
  });
};

export const useDeleteTire = () => {
  const queryClient = useQueryClient();
  const api = useApi();

  return useMutation({
    mutationFn: async ({ id }: { id: Tire["_id"] }) => {
      const response = await api
        .delete(`${import.meta.env.VITE_API_URL}/tires/${id}`)
        .json<Tire>();

      return response;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: keys.lists(),
      });
    },
  });
};
