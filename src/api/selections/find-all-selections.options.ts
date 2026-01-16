import { queryOptions } from "@tanstack/react-query";
import { BaseType } from "@/types/base.type";

export type FindAllSelectionsResponse = {
  data: TourSelection[];
  meta: {
    totalElementsCount: number;
  };
};

export type TourSelection = BaseType & {
  name: string;
  kitchenId: string;
};

const generateMockSelections = (count: number): TourSelection[] => {
  return Array.from({ length: count }, (_, i) => ({
    _id: `selection-${i}`,
    name: `Selection ${i}`,
    description: `Description ${i}`,
    kitchenId: `kitchen-${i}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
};

export const findAllSelectionsOptions = () => {
  return queryOptions({
    queryKey: ["selections"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      const mockStatuses = generateMockSelections(12);
      const totalCount = mockStatuses.length;
      const list = mockStatuses;

      return { totalCount, list };
    },
  });
};
