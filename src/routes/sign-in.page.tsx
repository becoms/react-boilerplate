import { useAuth } from "react-oidc-context";

import { Button } from "@/components/button";

const SignIn = () => {
  const { signinRedirect, isAuthenticated, signoutSilent } = useAuth();

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex-1 w-full flex flex-col py-5 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="flex flex-col items-center">
        <h2 className="text-xl md:text-2xl font-bold text-on-background/80 text-center mt-8">
          Connexion nécessaire
        </h2>
        <p className="max-w-lg text-sm text-on-background/60 text-center mt-2">
          Vous devez vous authentifier pour accéder à l'application.
        </p>
        {!isAuthenticated ? (
          <Button className="mt-3" onClick={() => signinRedirect()}>
            Se connecter
          </Button>
        ) : (
          <Button
            className="mt-3"
            onClick={() =>
              signoutSilent({
                post_logout_redirect_uri: window.location.origin,
              })
            }
          >
            Se déconnecter
          </Button>
        )}
      </div>
    </div>
  );
};

export default SignIn;
