import tw, { GlobalStyles } from "twin.macro";
import { Global } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Auth0Provider } from "@auth0/auth0-react";
import { AppRoutes } from "./Routes";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
    clientId={process.env.REACT_APP_AUTH0_CLIENTID as string}
    redirectUri={window.location.origin}
    audience={process.env.REACT_APP_AUTH0_AUDIENCE}>
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <Global styles={{ body: tw`antialiased font-sans` }} />
          <AppRoutes />
        </QueryClientProvider>
      </div>
    </Auth0Provider>
  );
}

export default App;
