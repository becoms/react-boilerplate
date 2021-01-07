import { Global } from "@emotion/react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { I18nextProvider } from "react-i18next";
import { QueryClient, QueryClientProvider } from "react-query";
import tw, { GlobalStyles } from "twin.macro";
import i18n from "./i18n";
import { Routes } from "./Routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <Global styles={{ body: tw`antialiased font-sans` }} />
      <I18nextProvider i18n={i18n}>
        <HelmetProvider>
          <Helmet titleTemplate="%s | React App" />
          <Routes />
        </HelmetProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
};

export default App;
