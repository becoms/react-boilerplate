import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TourSelection } from "./find-all-selections.options";

export const useCreateSelection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (_: Partial<TourSelection>) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {};
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["selections"],
      });
    },
  });
};
