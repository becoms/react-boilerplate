import { useAuth } from "react-oidc-context";
import ky from "ky";
import { useMemo } from "react";

export const useApi = () => {
  const { signinSilent } = useAuth();

  return useMemo(() => {
    return ky.extend({
      retry: 0, // Retry is handled by react-query
      timeout: false,
      hooks: {
        beforeRequest: [
          async (request) => {
            const user = await signinSilent();
            request.headers.set("Authorization", `Bearer ${user?.access_token}`);
          },
        ],
      },
    });
  }, []);
};
