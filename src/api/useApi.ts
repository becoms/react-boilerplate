import ky from "ky";
import { useMemo } from "react";
import { useAuth } from "react-oidc-context";

export const useApi = () => {
  const { user, signinRedirect } = useAuth();
  const accessToken = user?.access_token;

  return useMemo(() => {
    return ky.extend({
      retry: 0, // Retry is handled by react-query
      timeout: false,

      hooks: {
        beforeRequest: [
          (request) => {
            const offset = new Date().getTimezoneOffset();
            request.headers.set("X-Timezone-Offset", offset.toString());
            if (accessToken) {
              request.headers.set("Authorization", `Bearer ${accessToken}`);
            } else {
              // When token is expired and user keeps his browser tab open, we need to log him again and return to the current page
              signinRedirect({ redirect_uri: window.location.href });
            }
          },
        ],
        beforeError: [
          async (error) => {
            if (error.response.status === 401) {
              // When token is expired and user keeps his browser tab open, we need to log him again and return to the current page
              signinRedirect({ redirect_uri: window.location.href });
            }
            return error;
          },
        ],
      },
    });
  }, []);
};
