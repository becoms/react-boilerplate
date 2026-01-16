import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TourSelection } from "./find-all-selections.options";

export const useDeleteSelection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: TourSelection["_id"] }) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        id
      };
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["selections"],
      });
    },
  });
};
