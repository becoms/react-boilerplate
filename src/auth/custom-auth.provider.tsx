import { ReactNode } from "react";
import {
  AuthProviderProps,
  AuthProvider as ReactOIDCAuthProvider,
} from "react-oidc-context";
import { useNavigate } from "react-router-dom";

const oidcConfiguration: AuthProviderProps = {
  authority: import.meta.env.VITE_AUTH_URL,
  client_id: import.meta.env.VITE_AUTH_CLIENTID,
  redirect_uri: `${window.location.origin}${
    import.meta.env.BASE_URL
  }oauth/callback/signin`,
  scope: "openid profile email",
  extraQueryParams: {
    kc_idp_hint: import.meta.env.VITE_AUTH_IDP_HINT,
  },
  post_logout_redirect_uri: `${window.location.origin}${
    import.meta.env.BASE_URL
  }oauth/callback/signout`,
  automaticSilentRenew: true,
};
console.log("🚀 ~ oidcConfiguration:", oidcConfiguration)

const CustomAuthProvider = (props: { children?: ReactNode }) => {
  const navigate = useNavigate();

  return (
    <ReactOIDCAuthProvider
      {...oidcConfiguration}
      onSigninCallback={(user) => {
        console.log("🚀 ~ AuthProvider ~ onSigninCallback:")
        const state = user?.state as { returnTo?: string } | undefined;
        void navigate(state?.returnTo || "/", { replace: true });
      }}
      matchSignoutCallback={(args) =>
        args.post_logout_redirect_uri !== undefined &&
        window.location.href.startsWith(args.post_logout_redirect_uri)
      }
      onSignoutCallback={(response) => {
        const state = response?.userState as { returnTo?: string } | undefined;
        void navigate(state?.returnTo || "/", { replace: true });
      }}
      {...props}
    />
  );
};

export default CustomAuthProvider;
