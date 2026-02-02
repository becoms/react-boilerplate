import { useMutation, useQueryClient } from "@tanstack/react-query";
import { parseServerSentEvents, type ServerSentEvent } from "parse-sse";
import { useApi } from "../useApi";
import keys from "./keys";

export interface ImportResponse {
  total: number;
  current?: number;
  created: number;
  ignored: number;
  errors: number;
  errorDetails: Array<{ row: number; error: string }>;
}

export interface ImportOptions {
  csvContent: string;
  onProgress?: (progress: ImportResponse) => void;
}

export const useImport = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      options: ImportOptions
    ): Promise<void> => {
      const { csvContent, onProgress } = options;

      const response = await api.post(`${import.meta.env.VITE_API_URL}/tires/import`, {
        json: { content: csvContent },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("Response body is null");
      }

      //@ts-expect-error parseServerSentEvents is not typed
      for await (const event of parseServerSentEvents(response)) {
        const serverSentEvent = event as ServerSentEvent;
        const eventBody = JSON.parse(serverSentEvent.data) as ImportResponse;
        if (serverSentEvent.type === "message" && onProgress) {
          onProgress(eventBody);
        }
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: keys.all()
      });
    },
  });
};

