/** @jsx jsx */
import { Global, jsx } from "@emotion/core";
import { StrictMode } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { I18nextProvider } from "react-i18next";
import tw from "twin.macro";
import i18n from "./i18n";
import { Routes } from "./Routes";

const App = () => {
  return (
    <StrictMode>
      <Global styles={{ body: tw`antialiased font-sans` }} />
      <I18nextProvider i18n={i18n}>
        <HelmetProvider>
          <Helmet titleTemplate="%s | React App" />
          <Routes />
        </HelmetProvider>
      </I18nextProvider>
    </StrictMode>
  );
};

export default App;
