import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TourSelection } from "./find-all-selections.options";

export const useUpdateSelection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      selectionData,
      id,
    }: {
      selectionData: Partial<TourSelection>;
      id: TourSelection["_id"];
    }) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        selectionData: {
          _id: id,
          ...selectionData,
        },
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
