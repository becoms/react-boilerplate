import ky from "ky";
import { useMemo } from "react";
import { useAuth } from "react-oidc-context";

export const useApi = () => {
  const { isAuthenticated } = useAutoSignin();
  const { signinRedirect, user } = useAuth();

  return useMemo(() => {
    return ky.extend({
      retry: 0, // Retry is handled by react-query
      timeout: false,

      hooks: {
        beforeRequest: [
          async (request) => {
            if (isAuthenticated) {
              request.headers.set(
                "Authorization",
                `Bearer ${user?.access_token}`,
              );
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
